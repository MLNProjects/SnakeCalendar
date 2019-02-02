import httpClient from "./client";

class Auth {
  private API_KEY: string = "AIzaSyCyMmgE2hbIVmSJSjZKMkGCs0jn4tHMRJo";
  public signUp(email: string, password: string) {
    const baseUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?" +
      "key=" +
      this.API_KEY;

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    return httpClient.post(baseUrl, authData);
  }

  public getProfile(idToken: string) {
    const baseUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" +
      this.API_KEY;
    const authData = {
      idToken,
      returnSecureToken: true
    };
    return httpClient.post(baseUrl, authData);
  }

  public updateProfile(idToken: string, displayName: string) {
    const baseUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=" +
      this.API_KEY;
    const authData = {
      idToken,
      displayName,
      photoUrl: "",
      returnSecureToken: true
    };
    return httpClient.post(baseUrl, authData);
  }

  public login(email: string, password: string) {
    const baseUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/" +
      "verifyPassword?key=" +
      this.API_KEY;

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    return httpClient.post(baseUrl, authData);
  }

  // public logout(username: string, password: string) {
  //   return httpClient.delete(username, password, "logout")
  // }
}

const auth = new Auth();
export default auth;
