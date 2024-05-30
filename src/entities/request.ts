export interface IrequestFormData {

  name: string,
  organizerId: string,
  userId: string,
  eventCategory: {
    _id: string,
    category: string,
    delete: boolean,
    active: boolean
  },
  eventCountry: string,
  eventState: string,
  eventCity: string,
  location: string,
  eventType: string,
  paymentMethod: string,
  paymentAmount?: string,
  email: string,
  country: string,
  state: string,
  city: string,
  phoneNumber: string,
  startingTime: Date,
  endingTime: Date,
  date: Date,
  seatArrangement?: [],
  seatNumber?: number,
  totalAmount: number,
  eventBooking: string

}



export interface Irequest {

  name: string,
  organizerId: string,
  userId: string,
  eventCategory: {
    _id: string,
    category: string,
    delete: boolean,
    active: boolean
  },
  eventCountry: string,
  eventState: string,
  eventCity: string,
  location: string,
  eventType: string,
  paymentMethod: string,
  paymentAmount?: string,
  email: string,
  country: string,
  state: string,
  city: string,
  phoneNumber: string,
  startingTime: string,
  endingTime: string,
  date: string,
  seatArrangement?: [],
  seatNumber?: number,
  totalAmount: number,
  eventBooking: string,
  paymentStatus: boolean,
  status: string
}