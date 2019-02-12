import httpClient from "./client";
import store from "../redux/store";

class Snakes {
  private baseURL = "https://snakecalender.firebaseio.com";
  public get(token: string, userId: string) {
    const URL = `${
      this.baseURL
    }/snakes.json?auth=${token}&orderBy="userId"&equalTo"${userId}"`;

    return httpClient.get(URL);
  }

  public create(token: string, userId: string, snakeName: string) {
    const URL = `${this.baseURL}/snakes.json?auth=${token}`;
    const payload = {
      snakeName,
      userId,
      created: Date.now() // FUN FACT: ms since 1970
    };
    return httpClient.post(URL, payload);
  }

  public delete(title: string) {
    return;
  }
}

const snakeClient = new Snakes();
export default snakeClient;
