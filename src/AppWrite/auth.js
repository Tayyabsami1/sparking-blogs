import { Client, Account, ID } from "appwrite";
import config from "../Config/config";

class AuthService {

    Client = new Client();
    Account;

    constructor() {
        this.Client.setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectID);

        this.Account = new Account(this.Client);
    }

    createAccount = async ({ email, password, name }) => {
        try {
            const acc = await this.Account.create(ID.unique(), email, password, name);
            if (acc) {
                return this.login({ email, password });
            }
            else {
                return acc;
            }
        }

        catch (err) {
            throw new Error(err);
        }
    }

    login = async ({ email, password }) => {
        try {
            return await this.Account.createEmailPasswordSession(
                email,
                password
            );
        }
        catch (err) {
            throw new Error(err);
        }
    }

    getCurrUser = async () => {
        try {
            const user = await this.Account.get();
            return user; 

        }
        catch (err) {
            throw new Error(err);
        }

    }

    logout = async ()=>{
        try{
            await this.Account.deleteSessions();
        }
        catch(err)
        {
            throw new Error(err);
        }
    }


}

const authService = new AuthService();

export default authService;

