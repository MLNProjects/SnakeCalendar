import httpClient from "./client";

class Auth {
  public signUp(body: any) {
    return httpClient.post(`users/${body.username}.json`, body);
  }
  public login(username: string, password: string) {
    return httpClient.get(`/users/${username}.json`).then(response => {
      let userInfo;
      for (const i in response.data) {
        if (response.data.hasOwnProperty(i)) {
          console.log("bajs");
          userInfo = response.data[i];
          break;
        }
      }
      return userInfo.password === password;
    });
  }

  // public logout(username: string, password: string) {
  //   return httpClient.delete(username, password, "logout")
  // }
}

const auth = new Auth();
export default auth;
