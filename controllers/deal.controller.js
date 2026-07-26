const dealService = require("../services/deal.service");

exports.createDeal = async (req,res)=>{

    try{
        console.log("---req body-------",req.body)
    const clientId = req.user.id;

        const response = await dealService.createDeal(
            req.user.id,
            req.body
        );

        return res.json(response);

    }catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};


exports.getDeals = async(req,res)=>{

    const response = await dealService.getDeals(req.user.user_id);

    res.json(response);

};


exports.getDealById = async(req,res)=>{

    const response = await dealService.getDealById(

        req.user.user_id,

        req.params.id

    );

    res.json(response);

};


exports.updateDeal = async(req,res)=>{

    const response = await dealService.updateDeal(

        req.user.user_id,

        req.params.id,

        req.body

    );

    res.json(response);

};


exports.deleteDeal = async(req,res)=>{

    const response = await dealService.deleteDeal(

        req.user.user_id,

        req.params.id

    );

    res.json(response);

};