const Base=require("../service/base");
/**
 *
 * @Service
 */
module.exports=class extends Base{
    //构造方法
    constructor() {
        super();
    }

    //添加用户
    async add(name,pwd){
        return await this.model("user").add({id:think.uuid(),name:name,pwd:pwd});
    }

    //根据id删除
    async deletById(id) {
        await this.model("user").where({id: id}).delete();
    }


    //修改用户信息
    async updateUser(id,name,pwd){
        await this.model("user").where({id:id}).update({name:name,pwd:pwd})
    }

    //查询所有
    async queryAll(){
        return await this.model("user").order("name").select();
    }

    //根据id查询用户
    async queryById(id){
        return await this.model("user").where({id:id}).select();
    }

    //查找指定用户
    async queryUser(name,pwd){
        return await this.model("user").where({name:name,pwd:pwd}).select();
    }
}