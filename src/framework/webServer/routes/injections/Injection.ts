import { UserController } from "../../../../controllers/userController";
import { UserRepository } from "../../../database/mongodb/repository/userRepository/userRepository";
import { UserUseCase } from "../../../../usecases/usecases/userUseCase";
import userModel from "../../../database/mongodb/model/userModel";
import { JWTtoken } from "../../../service/jwt";
import { Encrypt } from "../../../service/hashPassword";
import { OtpGenerate } from "../../../service/otpGenerator";
import { OtpRepository } from "../../../database/mongodb/repository/otpRepository"
import { SentEmail } from "../../../service/sentEmail";
import organizerModel from "../../../database/mongodb/model/organizer";
import addressModel from "../../../database/mongodb/model/address";
import { OrganizerRepository } from "../../../database/mongodb/repository/organizerRepository/organizerRepository";
import { OrganizerController } from "../../../../controllers/organizerController";
import { OrganizerUseCase } from "../../../../usecases/usecases/organizerUseCase";

import { AdminController} from "../../../../controllers/adminController";
import { AdminUsecase } from "../../../../usecases/usecases/adminUseCase";
import { AdminRepository } from "../../../database/mongodb/repository/adminRepository/adminRepository";
import { CategoryRepository } from "../../../database/mongodb/repository/categoryRepository/categoryRepository";
import { EventRepository } from "../../../database/mongodb/repository/eventRepository/eventRepository";
import { EventPostRepository } from "../../../database/mongodb/repository/eventPostRepository/eventPostRepository";
import { Stripe } from "../../../database/mongodb/repository/stripeRepository";
import { BookingRepository } from "../../../database/mongodb/repository/bookingRepository";
import { MessageRepository } from "../../../database/mongodb/repository/messageRepository";
import { ConversationRepository } from "../../../database/mongodb/repository/conversationRepository/conversationRepository";
import { RequestRepository } from "../../../database/mongodb/repository/requestRepository";
import { PostRepository } from "../../../database/mongodb/repository/postRepository";
import { CommentRepository } from "../../../database/mongodb/repository/commentRepository/commentRepository";
import { CommentController } from "../../../../controllers/commentController";
import { CommentUseCase } from "../../../../usecases/usecases/commentUseCase";

const bycryptsurvice =new  Encrypt()
const jwttoken = new JWTtoken()
const otpGenerate = new OtpGenerate()
const otprepository = new OtpRepository()
const sentemail = new SentEmail()
const eventRepository = new EventRepository()
const commentrepository = new CommentRepository()
const stripe = new Stripe()
const bookingrepository = new BookingRepository()
const categoryrepository = new CategoryRepository()
const userrepository = new UserRepository(userModel)
const eventpostrepo = new EventPostRepository()
const messagerepository = new MessageRepository()
const conversationrepository = new ConversationRepository()
const requestrepository = new RequestRepository()
const postrepository = new PostRepository()
const adminrepository = new AdminRepository()

const organizerrepository = new OrganizerRepository(organizerModel)
const userusecase = new UserUseCase(userrepository,jwttoken,otpGenerate,otprepository,sentemail,bycryptsurvice,organizerrepository,eventpostrepo,eventRepository,stripe,bookingrepository,categoryrepository,messagerepository,conversationrepository,requestrepository,postrepository)
const commentUseCase = new CommentUseCase(commentrepository)
const  userController = new UserController(userusecase)
const adminusecase = new AdminUsecase(bycryptsurvice,adminrepository,jwttoken,organizerrepository,userrepository,categoryrepository,requestrepository,eventRepository)
const organizerusecase = new  OrganizerUseCase(organizerrepository,bycryptsurvice,otpGenerate,otprepository,sentemail,jwttoken,categoryrepository,eventRepository,eventpostrepo,bookingrepository,requestrepository,userrepository,conversationrepository,postrepository)
const organizerController = new  OrganizerController(organizerusecase)
const adminController = new AdminController(adminusecase)
const commentController = new CommentController(commentUseCase)

export { userController,organizerController,adminController,commentController}