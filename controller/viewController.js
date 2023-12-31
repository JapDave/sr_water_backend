const View = require("../model/viewModel")

exports.addIp=async(req,res)=>{
    let {ip,name}=req.body
    try {
        let exist=await View.findOne({ip,name})
        if(exist){
            res.status(200).send({
                msg:"Ip Already Added ",
                
            })
        }else{

            let data=await View(req.body)
                await data.save()
                res.status(200).send({
                    msg:"Ip Added successfully",
                    data
                })
        }
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

