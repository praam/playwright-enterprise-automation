export class BasePage {
    
    constructor( page ){

        this.page = page;

    }

    async navigate(path = '/'){

       await this.page.goto( path );

    }

    async getPageTitle() {

       return this.page.title();

  }

   async getCurrentUrl() {

    return this.page.url();

  }

}