const Index=require("../index");
module.exports=class extends Index{
    registAction(){
        if (this.isPost){
            this.rules={
                name:{
                    string:true,
                    required:true,
                    trim:true
                },
                pwd:{
                    string:true,
                    required:true,
                    trim:true
                }
            }
        }
    }

    loginAction(){
        if (this.isPost){
            this.rules={
                name:{
                    string:true,
                    required:true,
                    trim:true
                },
                pwd:{
                    string:true,
                    required:true,
                    trim:true
                }
            }
        }
    }
}