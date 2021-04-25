const Index=require("../Base");
const BrandService=require("../../service/book");
module .exports=class extends Index{
    async indexAction() {
        const loginInfo=this.ctx.cookie("loginInfo");
        if (loginInfo!==undefined){
            const books=await new BrandService().findAll();
            this.assign("books",books);
            await this.display("book/index.html");
        }else {
            this.redirect("/admin/admin/login");
        }
    }
}