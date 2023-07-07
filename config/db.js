

const mongoose = require('mongoose')


exports.connectDatabase =async ()=>{
    const connect =await mongoose.connect(process.env.URL)
    if(connect){
        console.log(`connected to database : host ${connect.connection.host}  name => ${connect.connection.name}`)
    }

}