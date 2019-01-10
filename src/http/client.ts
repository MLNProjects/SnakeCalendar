const users = require("../assets/users");
const snakes = require("../assets/snakes");
import axios from "axios";

interface IRequestHeader {
  [key: string]: string;
}

interface ILoginResponseSuccess {
  username: string;
  uid: string;
  token: string;
}

class HttpClient {

  private baseUrl = "https://snakecalender.firebaseio.com";

  public get(url: string, user: string) {
    return axios.get(`${this.baseUrl}/users/${user}/${url}`);
  }

  public post(url: string, user: string, body: any) {
    return axios.post(`${this.baseUrl}/users/${user}/${url}`, body);
    // return new Promise<ILoginResponseSuccess>(function(resolve, reject){
    //   if(type === "login"){
    //     for (let user in users){
    //       if(users[user].username === username && users[user].password === password){
    //         let loggedInUser = {...users[user]};
    //         delete loggedInUser.password;
    //         resolve(loggedInUser);
    //       }
    //     }
    //     reject({error: "No user found"});
    //   }
    // })
  }

  public delete(url: string) {
    return axios.post(`${this.baseUrl}${url}`);
  }

  public put(url: string, body: any) {
    return axios.post(`${this.baseUrl}${url}`, body);
  }
}

const httpClient = new HttpClient();
export default httpClient;
