const { default: mongoose } = require("mongoose");

const dbConnect = () => {

    try{
        const conn = mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected Successfully")

    } catch(error){
        console.log("DB eroor")

    }
}


module.exports=dbConnect

