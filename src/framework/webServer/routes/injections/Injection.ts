import { UserController } from "../../../../controllers/userController";
import { UserRepository } from "../../../database/mongodb/repository/userRepository/userRepository";
import { UserUseCase } from "../../../../usecases/usecases/userUseCase";
import userModel from "../../../database/mongodb/model/userModel";
import { JWTtoken } from "../../../service/jwt";
import { Encrypt } from "../../../service/hashPassword";
import { OtpGenerate } from "../../../service/otpGenerator";
import { OtpRepository } from "../../../database/mongodb/repository/otpRepository"
import { SentEmail } from "../../../service/sentEmail";
import { CloudSession } from "../../../service/cloudSession";
import organizerModel from "../../../database/mongodb/model/organizer";
import addressModel from "../../../database/mongodb/model/address";
import { OrganizerRepository } from "../../../database/mongodb/repository/organizerRepository/organizerRepository";
import { OrganizerController } from "../../../../controllers/organizerController";
import { OrganizerUseCase } from "../../../../usecases/usecases/organizerUseCase";

import { AdminController} from "../../../../controllers/adminController";
import { AdminUsecase } from "../../../../usecases/usecases/adminUseCase";
import { AdminRepository } from "../../../database/mongodb/repository/adminRepository/adminRepository";
import { CategoryRepository } from "../../../database/mongodb/repository/categoryRepository/categoryRepository";


const bycryptsurvice =new  Encrypt()
const cloudsession = new CloudSession()
const jwttoken = new JWTtoken()
const otpGenerate = new OtpGenerate()
const otprepository = new OtpRepository()
const sentemail = new SentEmail()

const categoryrepository = new CategoryRepository()
const userrepository = new UserRepository(userModel)


const adminrepository = new AdminRepository()

const organizerrepository = new OrganizerRepository(organizerModel)
const userusecase = new UserUseCase(userrepository,jwttoken,otpGenerate,otprepository,sentemail,bycryptsurvice,cloudsession,organizerrepository)
const  userController = new UserController(userusecase)
const adminusecase = new AdminUsecase(bycryptsurvice,adminrepository,jwttoken,organizerrepository,userrepository,categoryrepository)
const organizerusecase = new  OrganizerUseCase(organizerrepository,bycryptsurvice,otpGenerate,otprepository,sentemail,jwttoken)
const organizerController = new  OrganizerController(organizerusecase)
const adminController = new AdminController(adminusecase)

export { userController,organizerController,adminController}