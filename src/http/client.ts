const users = require("../assets/users");
const snakes = require("../assets/snakes");

interface IRequestHeader {
  [key: string]: string;
}

interface ILoginResponseSuccess {
  username: string;
  uid: string;
  token: string;
}

class HttpClient {
  private token = () => localStorage.getItem("sessionToken") || "";
  private defaultHeaders = () => {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token()}`
    };
  }
  public get(url: string, headers: IRequestHeader = {}) {
    // return ajaxGet(url, { ...this.defaultHeaders, headers });
  }

  public post(username: string, password: string, type: string) {
    // return ajaxPost(url, { ...this.defaultHeaders(), headers });
    return new Promise<ILoginResponseSuccess>(function(resolve, reject){
      if(type === "login"){
        for (let user in users){
          if(users[user].username === username && users[user].password === password){
            let loggedInUser = {...users[user]};
            delete loggedInUser.password;
            resolve(loggedInUser);
          }
        }
        reject({error: "No user found"});
      }
    })
  }

  public delete(username: string, password: string, type: string) {
    // return ajaxDelete(url, { ...this.defaultHeaders(), headers });
  }

  public put(url: string, body?: any, headers: IRequestHeader = {}) {
    // return ajaxPut(url, body, { ...this.defaultHeaders(), headers });
  }
}

const httpClient = new HttpClient();
export default httpClient;
