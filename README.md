# Playwright Enterprise Automation Framework

<p align="center">

![Playwright](https://img.shields.io/badge/Playwright-1.61.1-2EAD33?logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-Reporting-FF6A00?logo=allure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white)
![POM](https://img.shields.io/badge/Design_Pattern-Page_Object_Model-6C5CE7)
![Fixtures](https://img.shields.io/badge/Architecture-Custom_Fixtures-00A98F)
![JSON](https://img.shields.io/badge/Test_Data-JSON-000000?logo=json&logoColor=white)

</p>

A production-style **Playwright test automation framework** built with JavaScript, designed to demonstrate enterprise QA/SDET engineering practices including Page Object Model, custom fixtures, environment configuration, authentication state management, test data separation, reporting, failure diagnostics, and CI/CD integration.

The framework currently targets the **SauceDemo e-commerce application** and is designed to evolve toward API/UI hybrid testing, database validation, advanced test data management, and additional enterprise automation capabilities.

---

## 📌 Project Overview

The goal of this project is not simply to automate UI test cases.

It is to demonstrate how a maintainable automation framework can be designed around:

* Clean architecture
* Separation of concerns
* Reusable Page Objects
* Dependency injection through Playwright fixtures
* Authentication state management
* Environment-specific configuration
* Externalized test data
* Parallel test execution
* Failure diagnostics
* Allure reporting
* CI/CD integration
* Git-based development workflow

The framework is intentionally built incrementally, with each capability introduced as an independently validated engineering module.

---

# 🏗️ Framework Architecture

```text
                         ┌──────────────────────┐
                         │      Test Cases      │
                         │  Business Scenarios  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Custom Test Layer  │
                         │    base.extend()     │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
          ┌──────────────────┐             ┌──────────────────┐
          │  Page Fixtures   │             │  Auth Fixtures   │
          │                  │             │                  │
          │ LoginPage        │             │ Authenticated    │
          │ InventoryPage    │             │ Page             │
          │ CartPage         │             └──────────────────┘
          │ CheckoutPage     │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │    Page Objects  │
          │                  │
          │    BasePage      │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │    Playwright    │
          │ Browser / Page   │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │    Application   │
          │    SauceDemo     │
          └──────────────────┘


      Configuration ──────► Environment
      Test Data ──────────► Test Scenarios
      Authentication ─────► storageState
      Reporting ──────────► HTML + Allure
      CI/CD ──────────────► GitHub Actions
```

---

# 🧩 Core Design Principles

The framework follows a few important engineering principles.

### Separation of Concerns

Each layer has a clearly defined responsibility:

```text
Tests          → Business intent and assertions
Fixtures       → Dependency creation and lifecycle
Page Objects   → UI interaction and application behaviour
BasePage       → Shared Page Object functionality
Configuration  → Environment settings
Test Data      → Externalized test inputs
Reporting      → Test observability
CI/CD          → Automated execution and validation
```

### Dependency Injection

Tests consume dependencies rather than constructing them manually.

```javascript
test('Login', async ({ loginPage }) => {
    await loginPage.login(username, password);
});
```

The fixture layer is responsible for creating `loginPage`.

---

# 🧱 Page Object Model

The framework follows the **Page Object Model (POM)** pattern.

Current Page Objects include:

```text
pages/
├── BasePage.js
├── LoginPage.js
├── InventoryPage.js
├── CartPage.js
└── CheckoutPage.js
```

### BasePage

`BasePage` contains common functionality shared across Page Objects.

```javascript
export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(path);
    }

    async getPageTitle() {
        return this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}
```

Application-specific Page Objects extend `BasePage`.

```javascript
export class LoginPage extends BasePage {
    // Login-specific behaviour
}
```

This reduces duplication and provides a consistent foundation for UI interactions.

---

# 🧪 Custom Fixtures

The framework uses custom Playwright fixtures to provide reusable dependencies.

## Page Fixtures

```javascript
export const pageFixtures = {

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
};
```

These fixtures allow tests to consume ready-to-use Page Objects.

## Authentication Fixtures

Authentication-related setup is separated into `authFixtures.js`.

The framework also uses Playwright's `storageState` strategy for the main authenticated test execution.

This allows authentication to be performed during setup and reused by dependent tests instead of repeating the login flow unnecessarily.

---

# 🔐 Authentication Architecture

Authentication is handled through a dedicated setup project.

```text
auth.setup.js
      │
      ▼
Login
      │
      ▼
Validate authenticated state
      │
      ▼
Save storageState
      │
      ▼
playwright/.auth/user.json
      │
      ▼
Authenticated test project
```

The Chromium project consumes:

```javascript
storageState: 'playwright/.auth/user.json'
```

This provides a clean separation between:

* Authentication setup
* Authentication state persistence
* Business test execution

The authentication state directory is excluded from version control.

---

# ⚙️ Environment Configuration

Environment configuration is separated from test logic.

```text
config/
├── environment.js
└── environments/
    ├── qa.config.js
    └── dev.config.js
```

The active environment is selected using:

```text
TEST_ENV
```

Example:

```bash
TEST_ENV=qa npx playwright test
```

If no environment is explicitly supplied, the framework defaults to:

```text
qa
```

The configuration layer validates the requested environment and prevents execution against an unknown configuration.

---

# 📊 Test Data Management

Test data is externalized from test logic.

```text
test-data/
├── users/
│   └── users.json
├── products/
│   └── products.json
└── checkout/
    └── checkoutData.json
```

Examples include:

* User credentials
* Product selections
* Checkout customer information

This keeps test scenarios readable and makes test data easier to maintain independently from automation logic.

---

# 🧪 Current Test Coverage

The current suite covers authentication and the end-to-end checkout journey.

| Area      | Coverage                     | Type           |
| --------- | ---------------------------- | -------------- |
| Login     | Standard user authentication | Smoke          |
| Login     | Locked user validation       | Authentication |
| Inventory | Product selection            | Functional     |
| Cart      | Product verification         | Functional     |
| Checkout  | Customer information         | Functional     |
| Checkout  | Order completion             | End-to-End     |
| Checkout  | Confirmation validation      | End-to-End     |

Current test suite:

```text
5 tests
```

The suite includes:

* Authentication setup
* Unauthenticated login validation
* Smoke login scenarios
* End-to-end checkout validation

---

# 🏷️ Test Tags & Metadata

Tests can be selectively executed using Playwright tags.

Examples:

```text
@smoke
@authentication
@checkout
```

Example:

```bash
npx playwright test --grep @smoke
```

Tests also contain metadata annotations where appropriate.

Example:

```javascript
annotation: {
    type: 'feature',
    description: 'End-to-end checkout validation'
}
```

This allows test execution and reporting to carry meaningful business context.

---

# 📈 Reporting & Test Observability

The framework provides multiple reporting layers.

## Playwright HTML Report

The built-in Playwright HTML reporter provides:

* Test execution results
* Test duration
* Errors
* Steps
* Attachments
* Failure evidence

Generate and view the report:

```bash
npx playwright show-report
```

---

# 🔎 Failure Diagnostics

The framework is configured to capture useful failure evidence.

```javascript
trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure'
```

This provides:

### Screenshot

Captured when a test fails.

### Video

Retained for failed tests to help reproduce UI failures.

### Trace

Captured on the first retry and can be opened using Playwright Trace Viewer.

This creates an important observability chain:

```text
Test Failure
     │
     ├── Screenshot
     ├── Video
     ├── Trace
     └── Error Context
```

---

# 📊 Allure Reporting

The framework integrates **Allure** for richer test reporting.

Allure metadata currently includes:

```javascript
await allure.severity('critical');
await allure.epic('E-Commerce Application');
await allure.story('Complete Checkout Flow');
await allure.feature('Checkout');
```

The framework also demonstrates attaching runtime information to reports.

Example:

```javascript
await allure.attachment(
    'Checkout Confirmation Details',
    JSON.stringify(confirmation, null, 2),
    'application/json'
);
```

This allows important runtime information to be associated directly with the test result.

---

# 🐞 Allure Defect Classification

The framework includes custom Allure categories.

```text
Product Defect
Automation Defect
```

This helps distinguish between:

```text
Application failure
       vs
Automation/framework failure
```

For example, assertion-based failures can be classified as product defects, while broken automation can be classified separately.

This provides more useful information than simply reporting:

```text
Test Failed
```

---

# 🔄 CI/CD — GitHub Actions

The framework uses **GitHub Actions** for continuous integration.

Pipeline flow:

```text
Git Push / Pull Request
          │
          ▼
    Checkout Code
          │
          ▼
      Setup Node
          │
          ▼
      npm ci
          │
          ▼
Install Playwright Browsers
          │
          ▼
   Execute Test Suite
          │
          ▼
   Generate Allure Report
          │
          ▼
 Upload Test Artifacts
```

The pipeline publishes:

* Playwright HTML report
* Allure report

as GitHub Actions artifacts.

---

# 🌐 Browser Strategy

The framework currently uses a Chromium-based project.

For local Windows development, the framework can use the locally installed Microsoft Edge browser when required.

CI environments use Playwright-managed browsers.

This separation avoids coupling CI execution to the developer's locally installed browser.

---

# ⚡ Parallel Execution

The framework is configured for parallel execution.

```javascript
fullyParallel: true
```

CI workers are controlled separately:

```javascript
workers: process.env.CI ? 2 : undefined
```

This allows local execution to use the available environment while providing predictable resource usage in CI.

---

# 📁 Project Structure

```text
playwright-enterprise-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   ├── environment.js
│   └── environments/
│       ├── qa.config.js
│       └── dev.config.js
│
├── fixtures/
│   ├── authFixtures.js
│   ├── pageFixtures.js
│   └── test.js
│
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── test-data/
│   ├── users/
│   │   └── users.json
│   ├── products/
│   │   └── products.json
│   └── checkout/
│       └── checkoutData.json
│
├── tests/
│   ├── auth/
│   │   └── login.spec.js
│   ├── smoke/
│   │   ├── login.spec.js
│   │   └── checkout.spec.js
│   └── auth.setup.js
│
├── categories.json
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

---

# 🛠️ Technology Stack

| Layer                  | Technology                      |
| ---------------------- | ------------------------------- |
| Language               | JavaScript                      |
| Test Framework         | Playwright Test                 |
| UI Automation          | Playwright                      |
| Design Pattern         | Page Object Model               |
| Dependency Management  | Playwright Fixtures             |
| Authentication         | Playwright storageState         |
| Test Data              | JSON                            |
| Configuration          | Environment-based configuration |
| Reporting              | Playwright HTML                 |
| Advanced Reporting     | Allure                          |
| CI/CD                  | GitHub Actions                  |
| Source Control         | Git / GitHub                    |
| Runtime                | Node.js                         |
| Application Under Test | SauceDemo                       |

---

# ▶️ Getting Started

## Prerequisites

Install:

* Node.js
* npm
* Git

Verify:

```bash
node --version
npm --version
git --version
```

---

## Clone the Repository

```bash
git clone https://github.com/praam/playwright-enterprise-automation.git
```

Navigate to the project:

```bash
cd playwright-enterprise-automation
```

---

## Install Dependencies

```bash
npm ci
```

---

## Install Playwright Browsers

For environments where Playwright-managed browsers are available:

```bash
npx playwright install
```

For CI:

```bash
npx playwright install --with-deps
```

---

# ▶️ Running Tests

## Run the complete suite

```bash
npx playwright test
```

## Run smoke tests

```bash
npx playwright test --grep @smoke
```

## Run a specific test file

```bash
npx playwright test tests/smoke/login.spec.js
```

## Run with a visible browser

```bash
npx playwright test --headed
```

---

# 📋 Viewing the Playwright Report

After execution:

```bash
npx playwright show-report
```

---

# 📊 Generating the Allure Report

Generate:

```bash
allure generate allure-results --clean -o allure-report
```

Open:

```bash
allure open allure-report
```

---

# 🔧 Environment Execution

QA is the default environment:

```bash
npx playwright test
```

Explicit QA execution:

```bash
TEST_ENV=qa npx playwright test
```

Development environment:

```bash
TEST_ENV=dev npx playwright test
```

---

# 🔀 Git Development Workflow

The framework follows a feature-branch workflow.

```text
main
 │
 ├── feature/<module>
 │       │
 │       ├── Development
 │       ├── Local validation
 │       ├── Commit
 │       └── Push
 │
 └── Pull Request
        │
        ▼
     CI Checks
        │
        ▼
   Code Review
        │
        ▼
   Squash & Merge
        │
        ▼
       main
```

Example:

```bash
git checkout -b feature/new-module

git add .

git commit -m "feat: implement new module"

git push -u origin feature/new-module
```

After CI validation, changes are merged into `main`.

Feature branches are removed after successful integration.

---

# 🧪 Quality Gates

Before changes are merged, the framework validates:

* Test execution
* Playwright configuration
* Test data
* Reporting configuration
* CI pipeline
* Git working tree
* Whitespace errors
* Pull Request checks

Example:

```bash
git diff --check
```

---

# 🔍 Framework Design Decisions

## Why Page Object Model?

To separate application interaction from test scenarios and reduce duplicated selectors and UI logic.

## Why Fixtures?

To provide dependencies through Playwright's dependency injection mechanism and centralize object creation and lifecycle management.

## Why storageState?

To avoid repeating expensive authentication flows for every test while maintaining a dedicated authentication setup.

## Why external test data?

To keep test scenarios readable and separate test inputs from automation logic.

## Why multiple reporting mechanisms?

Playwright HTML provides native execution details and failure evidence, while Allure provides richer metadata, attachments, and defect categorization.

## Why CI artifacts?

Test reports and diagnostics should remain accessible after the CI job finishes, especially when failures occur remotely.

---

# 🚧 Current Limitations

This project is intentionally being developed incrementally.

Current scope focuses primarily on:

* UI automation
* Authentication
* Checkout workflows
* Page Object Model
* Fixtures
* Configuration
* Test data
* Reporting
* CI/CD

The following capabilities are planned rather than represented as completed functionality:

* API/UI hybrid testing
* Database validation
* Advanced API fixtures
* Performance integration
* Containerized execution
* Advanced cross-browser strategy
* Additional security testing
* Advanced test data generation

---

# 🗺️ Roadmap

Planned framework evolution:

```text
✅ Module 1 — Core Playwright Foundation
✅ Module 2 — Page Object Model
✅ Module 3 — Fixtures & Authentication
✅ Module 4 — Test Data & Environment Configuration
✅ Module 5 — Reporting & Test Observability
🚧 Module 6 — Advanced Test Architecture
⬜ API + UI Hybrid Testing
⬜ Advanced Data-Driven Testing
⬜ Database Validation
⬜ Performance Testing Integration
⬜ Containerized Execution
⬜ Advanced Cross-Browser Strategy
⬜ Security & Accessibility Integration
```

The roadmap is intentionally iterative: each capability is added, validated locally, integrated through Git, and verified through CI before moving to the next stage.

---

# 📈 Engineering Focus

The primary objective of this project is to demonstrate **engineering practices around test automation**, not simply UI scripting.

The framework focuses on:

```text
Maintainability
      +
Reusability
      +
Test Isolation
      +
Observability
      +
Scalability
      +
CI/CD Integration
      =
Enterprise Automation Architecture
```

The project is continuously evolving toward a broader quality engineering platform covering UI, API, data, performance, security, and CI/CD validation.

---

# 👨‍💻 Author

**Pramod Ramu**

QA Engineer | SDET | API Testing | ISTQB CTFL

Interested in:

* Software Quality Engineering
* Test Automation
* Playwright
* Selenium
* API Testing
* CI/CD
* Automation Architecture
* Quality Engineering

---

## ⭐ If you find this project useful

Feel free to explore the repository, raise an issue, or share feedback on the framework architecture and implementation.

**Built with the principle:**

> **Automation should not only execute tests — it should provide a maintainable engineering system for delivering quality.**
