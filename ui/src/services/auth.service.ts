import { IUser } from "../interfaces/user.interface.ts";
import axios from "axios";

const serviceBaseUrl = `http://localhost:3000`;

export class AuthService {
  createAccount(data: IUser) {
    return axios.post(`${serviceBaseUrl}/signUp`, data);
  }

  signIn(data: Partial<IUser>) {
    return axios.post(`${serviceBaseUrl}/signIn`, data);
  }
}
