const Index=require("../Base");
const BookService=require("../../service/book");
const fs = require('fs');
module .exports=class extends Index{
    async indexAction() {
        const loginInfo=this.ctx.cookie("loginInfo");
        if (loginInfo!==undefined){
            const books=await new BookService().findAll();
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

    async downloadAction(){
        const filePath=this.get("path");
        const path=filePath.replace("http://127.0.0.1:8201",think.ROOT_PATH+"/www");
        const fileName=filePath.replace("http://127.0.0.1:8201/static/image/","");
        this.download(path,fileName);
    }

}