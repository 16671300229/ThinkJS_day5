module.exports = class extends think.Controller {
  async __before() {
    if (this.isMobile){
      console.log("手机端访问");
    }else{
      console.log("PC访问");
    }
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
