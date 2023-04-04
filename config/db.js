const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

const dbConnect = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_CON_STR)
        if(!conn)
            throw new Error(err)
       console.log(`Db Connection Established on ${conn.connection.host}`)
    }catch (err){
        console.log(err)
    }
}
module.exports = dbConnect