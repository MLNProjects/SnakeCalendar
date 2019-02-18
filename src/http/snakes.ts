import httpClient from "./client";

class Snakes {
  private baseURL = "https://snakecalender.firebaseio.com";
  public get(token: string, userId: string) {
    const URL = `${this.baseURL}/users/${userId}/snakes.json?auth=${token}`;
    return httpClient.get(URL);
  }

  public create(token: string, userId: string, snakeName: string) {
    const URL = `${this.baseURL}/users/${userId}/snakes.json?auth=${token}`;
    const colorArray = [
      "yellow",
      "blue",
      "teal",
      "cyan",
      "light-blue",
      "red",
      "pink",
      "purple",
      "green",
      "light-green",
      "deep-purple",
      "indigo",
      "lime",
      "amber",
      "orange",
      "deep-orange",
      "brown",
      "grey",
      "blue-grey",
      "white"
    ];
    let randomNumber = Math.floor(Math.random() * colorArray.length);
    const payload = {
      color: colorArray[randomNumber],
      snakeName,
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
