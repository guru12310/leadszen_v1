// const db = require("../db");
const db = require('../utils/db');


exports.createDeal = async(userId,data)=>{

    console.log("--------data--------",data)
    const query=`

    INSERT INTO deals(
        user_id,
        customer_name,
        business_name,
        phone,
        email,
        deal_name,
        deal_value,

        currency,

        lead_source,

        stage,

        priority,

        expected_close,

        followup,

        description

    )

    VALUES(

        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14

    )

    RETURNING *;

    `;

    const values=[

        userId,

        data.customer_name,

        data.business_name,

        data.phone,

        data.email,

        data.deal_name,

        data.deal_value,

        data.currency,

        data.lead_source,

        data.stage,

        data.priority,

        data.expected_close,

        data.followup,

        data.description

    ];

    const result=await db.query(query,values);

    return{

        success:true,

        message:"Deal Created Successfully",

        data:result.rows[0]

    };

};



exports.getDeals=async(userId)=>{

    const result=await db.query(

        `

        SELECT *

        FROM deals

        WHERE user_id=$1

        ORDER BY created_at DESC

        `,

        [userId]

    );

    return{

        success:true,

        data:result.rows

    };

};


exports.getDealById=async(userId,id)=>{

    const result=await db.query(

        `

        SELECT *

        FROM deals

        WHERE deal_id=$1

        AND user_id=$2

        `,

        [id,userId]

    );

    return{

        success:true,

        data:result.rows[0]

    };

};


exports.updateDeal=async(userId,id,data)=>{

    const result=await db.query(

        `

        UPDATE deals

        SET

        customer_name=$1,

        business_name=$2,

        phone=$3,

        email=$4,

        deal_name=$5,

        deal_value=$6,

        currency=$7,

        lead_source=$8,

        stage=$9,

        priority=$10,

        expected_close=$11,

        followup=$12,

        description=$13,

        updated_at=NOW()

        WHERE deal_id=$14

        AND user_id=$15

        RETURNING *;

        `,

        [

            data.customer_name,

            data.business_name,

            data.phone,

            data.email,

            data.deal_name,

            data.deal_value,

            data.currency,

            data.lead_source,

            data.stage,

            data.priority,

            data.expected_close,

            data.followup,

            data.description,

            id,

            userId

        ]

    );

    return{

        success:true,

        message:"Deal Updated Successfully",

        data:result.rows[0]

    };

};


exports.deleteDeal=async(userId,id)=>{

    await db.query(

        `

        DELETE FROM deals

        WHERE deal_id=$1

        AND user_id=$2

        `,

        [id,userId]

    );

    return{

        success:true,

        message:"Deal Deleted Successfully"

    };

};