import { RequestcustomersInterface } from "./IRequestcustomer";
import { StatusesInterface } from "./IStatus";
import { UsersInterface } from "./IUser";

export interface TrackInterface {

    ID: number,

    TimeRecived: Date,
    Labremark: string,

    UserID: number,
    User: UsersInterface,

    StatusID: number,
    Status: StatusesInterface,

    RequestcustomerID: number,
    Requestcustomer: RequestcustomersInterface,

}