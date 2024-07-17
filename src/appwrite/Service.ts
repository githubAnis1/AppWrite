

import { Client, Account, ID } from 'react-native-appwrite';
import { Popup } from 'react-native-popup-confirm-toast';


type RegisterUser = {
    email: string,
    password: string,
    name: string,
}

type LoginUser = {
    email: string,
    password: string,
}

let AppWriteClient = new Client();

class appwriteService {

    account :any

    constructor () {
        AppWriteClient
        .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) 
        .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)

        this.account = new Account (AppWriteClient)
        
    }

    login = async ({email, password}: LoginUser) => {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("error from login",error);
        }
    }
    
    //create a new record of user inside appwrite
    createAcount =  async ({ email, password, name}: RegisterUser) => {
        try {
            const userAcount = await this.account.create (
                ID.unique(),
                email,
                password,
                name
            ) 
            if (userAcount) {
                return this.login({email ,password});
            } else {
                return userAcount;
            }
        } catch (error) {
            Popup.show({
                type: 'error',
                title:'Oops !',
                textBody: `${error.message}`,
                buttonText: 'OK',
                callback: () => {Popup.hide()}
            })
        }
    };


    getCurrentUser = async () => {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }

    logout = async () => {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }
}


export default appwriteService