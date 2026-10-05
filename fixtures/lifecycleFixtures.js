export const lifecycleFixtures = {

    lifecycle: [async ({}, use, testInfo) => {

        await use();

        if (testInfo.status !== testInfo.expectedStatus) {

            console.log('\n===== TEST FAILURE LIFECYCLE =====');
            console.log(`Test: ${testInfo.title}`);
            console.log(`Status: ${testInfo.status}`);
            console.log(`Expected: ${testInfo.expectedStatus}`);
            console.log(`Duration: ${testInfo.duration} ms`);

            if (testInfo.error) {
                console.log(`Error: ${testInfo.error.message}`);
            }

            console.log('===================================\n');
        }

    }, { auto: true }]
};
