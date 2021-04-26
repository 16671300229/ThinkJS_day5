const Index=require("../Base");
const BrandService=require("../../service/book");
//require("think-payload");
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);
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

    async uploadAction(){
        if (this.isPost){
            const file=this.file("file");
            if(file) {
                const data=fs.readFileSync(file.path,"binary");
                fs.writeFile(think.ROOT_PATH+"/www/static/upload/"+file.name,data,"binary",err => {
                    if (err){
                        console.log(err.toString());
                    }
                })
            }
        }else{
            await this.display("book/upload.html");
        }
    }

}