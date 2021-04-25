const Index=require("../Base");
const AdminService=require("../../service/admin")
/**
 * 入口控制器
 * @Controller
 */
module.exports=class extends Index{
    /**
     * 查所有
     * @findAll
     */
    async findAllAction(){
        if(this.isPost){
            this.body=await new AdminService().queryAll();
        }else {
            this.redirect("login");
        }
    }


    /**
     * 删除
     * @delete
     */
    async deleteAction() {
        try {
            let id = this.get("id");
            let loginInfo=await this.cookie("loginInfo");
            let obj=JSON.parse(loginInfo);
            if(obj[0].name==="admin" || obj[0].name==="root" || obj[0].id===id) {
                await new AdminService().deletById(id);
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


    /**
     * 修改功能
     * @edit
     */
    async editAction() {
        try {
            if(this.isGet){
                let get=this.get();
                let user=await new AdminService().queryById(get.id);
                this.assign("user",user);
                await this.display("admin/edit.html");
            }else{
                let loginInfo=await this.cookie("loginInfo");
                let obj=JSON.parse(loginInfo);
                let post=this.post();
                if(obj[0].name==="admin" || obj[0].name==="root" || post.name===obj[0].name){
                    await new AdminService().updateUser(post.id,post.name,post.pwd);
                    this.ctx.cookie("loginInfo",null);
                    this.redirect("index");
                }else{
                    this.assign("error","用户权限不足");
                    await this.display("err.html");
                    //this.fail(10000,"用户权限不足");
                }
            }
        }catch (e){
            this.assign("error",e.toString());
            await this.display("err.html");
            //this.fail(10000,e.toString());
        }
    }


    /**
     * 注册
     * @regist
     */
    async registAction() {
        try {
            if (this.isPost) {
                const post = this.post();
                await new AdminService().add(post.name, post.pwd);
                this.redirect("login");
            }
        else
            {
                await this.display("admin/regist.html");
            }
        }catch (e){
            this.assign("error",e.toString());
            await this.display("err.html");
            //this.fail(10000,e.toString())
        }
    }


    /**
     * 登录
     * @login
     */
    async loginAction() {
        try {
            if (this.isPost) {
                const post=this.post();
                const login=await new AdminService().queryUser(post.name,post.pwd);
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
            this.assign("error",e.toString());
            await this.display("err.html");
        }
    }


    /**
     *访问主页
     * @index
     */
    async indexAction(){
        const loginInfo=await this.ctx.cookie("loginInfo");
        if (loginInfo!==undefined){
            let obj=JSON.parse(loginInfo);
            this.assign("loginInfo",obj[0].name);
            await this.display("admin/index.html")
        }else{
            this.redirect("login");
        }
    }

}