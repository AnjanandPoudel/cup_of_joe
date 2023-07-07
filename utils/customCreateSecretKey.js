

exports.customCreateSecretKey=()=>{
    try {
        return process.env.SECRETKEY
    } catch (error) {
        console.log(error)
    }
}