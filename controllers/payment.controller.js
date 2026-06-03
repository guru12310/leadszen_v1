const Razorpay = require("razorpay");
const db = require('../utils/db');
const crypto = require("crypto");

// console.log("----------key---------",process.env.RAZORPAY_KEY_ID)
// console.log("-------------secret------",process.env.RAZORPAY_KEY_SECRET)

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {

    try {

        const { plan } = req.body;

        const plans = {
            BASIC: 199,
            AUTOMATION: 499,
            PREMIUM: 999
        };

        const amount = plans[plan];

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan"
            });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        await db.query(`INSERT INTO lead_payments( client_id, plan_name, amount, razorpay_order_id, status) VALUES($1,$2,$3,$4,$5)`,
            [
                req.user.id,       // from JWT
                plan,
                amount,
                order.id,
                'CREATED'
            ]
        );

        return res.status(200).json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.verifyPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    razorpay_order_id +
                    "|" +
                    razorpay_payment_id
                )
                .digest("hex");

        if (
            generatedSignature !==  
            razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Signature"
            });
        }




        const paymentResult =
            await db.query(
                `
SELECT *
FROM lead_payments
WHERE razorpay_order_id = $1
`,
                [razorpay_order_id]
            );

        const payment =
            paymentResult.rows[0];



        await db.query(
            `
UPDATE lead_payments
SET
 razorpay_payment_id = $1,
 status = 'SUCCESS'
WHERE razorpay_order_id = $2
`,
            [
                razorpay_payment_id,
                razorpay_order_id
            ]
        );


        await db.query(
            `
UPDATE clients
SET
 subscription_status = 'ACTIVE',
 subscription_plan = $1,
 subscription_expiry =
 NOW() + INTERVAL '30 days'
WHERE id = $2
`,
            [
                payment.plan_name,
                payment.client_id
            ]
        );

        return res.json({
            success: true,
            message: "Payment Verified"
        });

    } catch (err) {
        console.log("------err-------", err)

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.getSubscription = async (req, res) => {

    try {

        const clientId = req.user.id;

        const result = await db.query(
            `
   SELECT
     subscription_plan,
     subscription_status,
     subscription_expiry
   FROM clients
   WHERE id = $1
   `,
            [clientId]
        );

        return res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};