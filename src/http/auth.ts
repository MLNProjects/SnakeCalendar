import httpClient from "./client";

class Auth {
  public signUp(email: string, password: string) {
    const baseUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?" +
      "key=AIzaSyCyMmgE2hbIVmSJSjZKMkGCs0jn4tHMRJo";

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    return httpClient.post(baseUrl, authData);
  }
  public login(username: string, password: string) {
    return;
  }

  // public logout(username: string, password: string) {
  //   return httpClient.delete(username, password, "logout")
  // }
}

const auth = new Auth();
export default auth;
