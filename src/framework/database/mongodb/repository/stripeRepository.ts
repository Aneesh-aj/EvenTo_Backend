import { Istripe } from "../../../../usecases/interface/repositoryInterface/stripeRepository";
import stripe from "../../../service/stripe";
import { Req } from "../../../types/serverPackageTypes";


export class Stripe implements Istripe{

    async  payment(eventId: string, userId: string, seats: [], amount: string): Promise<any> {
        try{

          console.log(" amoputn",amount)
           const payAmount = Number(amount)
            console.log(" the payment amount--------------------------------------------------------",payAmount)
            console.log(" totla amoutn=-----------------------------",payAmount*seats.length)

            const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price_data: {
                      currency: 'inr',
                      product_data: {
                        name: "Event",
                      },
                      unit_amount: payAmount*seats.length*100,
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: 'http://localhost:5173/user/success',
                cancel_url: 'http://localhost:5173/cancel',
                billing_address_collection: 'required'
              });

            //   const date:Date = new Date(consultingDate)
            // await this.bookingRepository.createBookingRepo(amount,email,doctorId,treatmentId,subTreatmentId,date)
            console.log('stripe result---',session);
            return session.url;

        }catch(error){
            throw error
        }
    }

    async  paymentStatus(req: Req): Promise<boolean | null> {
        try{
          const payload = req.body;
          const paymentIntentId = payload?.data?.object?.payment_intent
          const payloadString = JSON.stringify(payload, null, 2);
          const sig = req.headers["stripe-signature"];
          if (typeof sig !== "string") {
            return false;
          }
          
          const endpointSecret =
            "whsec_1b4490e8af840f6909efd2ae0e3490178fbbfe095675d93285678c0100590b96";
          const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret: endpointSecret,
          });
      
          let event;
      
          event = stripe.webhooks.constructEvent(
            payloadString,
            header,
            endpointSecret
          );
          if (paymentIntentId) {
            const paymentIntentResponse = await stripe.paymentIntents.retrieve(paymentIntentId);
            const paymentIntent = paymentIntentResponse
            if (paymentIntentResponse.latest_charge) {
              const chargeId = paymentIntentResponse.latest_charge;
              req.app.locals.chargeId = chargeId;
            } else {
           
              console.log('No latest charge found for this PaymentIntent.');
              return null;
            }
          }
              console.log(" event type",event.type)
          if (event.type == "checkout.session.completed") {
            return true;
          } else {
            return false;
          }
        }catch(error){
           throw error
        }
    }

}