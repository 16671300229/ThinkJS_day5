module.exports = class extends think.Controller {
  async __before() {

  }

  async indexAction() {
    await this.display("index.html");
  }

  __after(){

  }

  async __call() {
    await this.display("404.html");
  }

};
