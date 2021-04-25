const Base=require("../service/base");
module .exports=class extends Base{
    async findAll() {
        return await this.model("book").order("name").select();
    }
}