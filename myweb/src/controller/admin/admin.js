const Index=require("../index");
module.exports=class extends Index{
    //CRUD
    async findAllAction(){
        if(this.isPost){
            this.body=await this.model("user").order("name").select();
        }else {
            this.redirect("login");
        }
    }

    async deleteAction() {
        try {
            let id = this.get("id");
            let loginInfo=await this.cookie("loginInfo");
            let obj=JSON.parse(loginInfo);
            if(obj[0].name==="admin" || obj[0].name==="root" || obj[0].id===id) {
                await this.model("user").where({
                    id: id
                }).delete();
                this.ctx.cookie("loginInfo",null);
                this.redirect("index");
            }else {
                this.assign("error","用户权限不足");
                await this.display("err.html");
                //this.fail(10000,"用户权限不足");
            }
        }catch (e){
            this.fail(10000,e.toString());
        }
    }

    async editAction() {
        try {
            if(this.isGet){
                let id=this.get("id");
                let user=await this.model("user").where({id:id}).select();
                this.assign("user",user);
                await this.display("admin/edit.html");
            }else{
                let loginInfo=await this.cookie("loginInfo");
                let obj=JSON.parse(loginInfo);
                let post=this.post();
                if(obj[0].name==="admin" || obj[0].name==="root" || post.name===obj[0].name){
                    try {
                        await this.model("user").where({id:post.id}).update({name:post.name,pwd:post.pwd});
                        this.ctx.cookie("loginInfo",null);
                        this.redirect("index");
                    }catch (e){
                        this.fail(10000,e.toString());
                    }
                }else{
                    this.assign("error","用户权限不足");
                    await this.display("err.html");
                    //this.fail(10000,"用户权限不足");
                }
            }
        }catch (e){
            this.fail(10000,e.toString());
        }
    }

    async registAction(){
        if (this.isPost){
            const post=this.post();
            try {
                await this.model("user").add({id:think.uuid(),name:post.name,pwd:post.pwd});
                this.redirect("login");
            }catch (e){
                this.assign("error",e.toString());
                await this.display("err.html");
                //this.fail(10000,e.toString())
            }
        }else{
            await this.display("admin/regist.html");
        }
    }

    async loginAction() {
        try {
            if (this.isPost) {
                const post=this.post();
                const login=await this.model("user").where({name:post.name,pwd:post.pwd}).select();
                if (login.length!==0){
                    this.ctx.cookie("loginInfo",JSON.stringify(login));
                    this.redirect("index");
                }else{
                    this.assign("error","用户名或密码不正确");
                    await this.display("err.html");
                    //this.fail(10000,"用户名或密码输入不正确");
                }
            } else {
                await this.display("admin/login.html");
            }
        }catch (e){
            this.fail(10000,e.toString());
        }
    }

    async indexAction(){
        const loginInfo=await this.ctx.cookie("loginInfo");
        if (loginInfo!==undefined){
            await this.display("admin/index.html")
        }else{
            this.redirect("login");
        }
    }

}