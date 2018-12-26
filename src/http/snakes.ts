import httpClient from "./client";
import store from "../redux/store";
const users = require("../assets/users");
const snakes = require("../assets/snakes");

class Snakes {
  public get(){
   let user = store.getState().loggedInUser;
   return new Promise<{}[]>(function(resolve, reject){
     for(let i = 0; i < snakes.length; i++){
        if(snakes[i].username === user){
          setTimeout(() => resolve(snakes[i].snakes), 2000);
          break;
        }
        if((snakes.length - 1)  === i){
          reject("No snakes found for user")
        }
     }
   })
  }

  public create(username: string, password: string) {
    return httpClient.post(username, password, "login")
  }

  public delete(username: string, password: string) {
    return httpClient.delete(username, password, "logout")
  }
}

const snakeClient = new Snakes();
export default snakeClient;
