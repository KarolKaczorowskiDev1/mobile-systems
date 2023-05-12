import { Role } from "src/app/shared/model/enums/role";

export interface User {
    uid: string;
    email: string;
    role: Role;
    id?: string;
    base64Photo?: string;
}