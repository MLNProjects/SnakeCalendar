import httpClient from "./client";
import store from "../redux/store";
let fs = require("fs");
const users = require("../assets/users");
const snakes = require("../assets/snakes");

class Snakes {
  public get(){
   let user = store.getState().loggedInUser;
   return new Promise<{}[]>(function(resolve, reject){
     for(let i = 0; i < snakes.length; i++){
        if(snakes[i].username === user){
          setTimeout(() => resolve(snakes[i].snakes), 1000);
          break;
        }
        if((snakes.length - 1)  === i){
          reject("No snakes found for user")
        }
     }
   })
  }

  public create(title: string) {
    // return httpClient.post(username, password, "login")
    let user = store.getState().loggedInUser;
    return new Promise<void>(function(resolve, reject){
      for(let i = 0; i < snakes.length; i++){
        if(snakes[i].username === user){
          let newSnake = {
            "id": Math.floor(Math.random() * 10000),
            title,
            "longestLife": 0,
            "currentLength": 0,
            "startDate": Date.now(),
            "history": [
              {
                "id": Math.floor(Math.random() * 10000),
                "startDate": Date.now(),
                "endDatee": ""
              }
            ]
          }
          snakes[i].snakes.push(newSnake);
          fs.writeFile("../assets/snakes.json", JSON.stringify(snakes));
          setTimeout(() => resolve(), 1000);
          break;
         }
         if((snakes.length - 1)  === i){
           reject("Could not find user")
         }
      }
    })
  }

  public delete(title: string) {
    // return httpClient.delete(username, password, "logout")
    let user = store.getState().loggedInUser;
    return new Promise<void>(function(resolve, reject){
      for(let i = 0; i < snakes.length; i++){
        if(snakes[i].username === user){
          for(let j = 0; j < snakes[i].snakes.length; i++){
            if(snakes[i].snakes[j].title === title){
              snakes[i].snakes.splice(j, (j+1));
              break;
            }
          };
          fs.writeFile("../assets/snakes.json", JSON.stringify(snakes));
          setTimeout(() => resolve(), 1000);
          break;
         }
         if((snakes.length - 1)  === i){
           reject("Could not find user")
         }
      }
    })
  }
}

const snakeClient = new Snakes();
export default snakeClient;
