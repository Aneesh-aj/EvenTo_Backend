import Stripe from "stripe";
require('dotenv').config()


const stripe = new Stripe(process.env.STRIPE || "")

export default stripe