import httpClient from "./client";

class Snakes {
  private baseURL = "https://snakecalender.firebaseio.com";
  public get(token: string, userId: string) {
    const URL = `${this.baseURL}/users/${userId}/snakes.json?auth=${token}`;
    return httpClient.get(URL);
  }

  public getOneSnake(token: string, userId: string, snakeId: string) {
    const URL = `${
      this.baseURL
    }/users/${userId}/snakes/${snakeId}.json?auth=${token}`;
    return httpClient.get(URL);
  }

  public create(token: string, userId: string, snakeName: string) {
    const URL = `${this.baseURL}/users/${userId}/snakes.json?auth=${token}`;
    const colorArray = [
      "#68A391", //green
      "#7D75AB",
      "#F7E49D",
      "#F7BD9D"
    ];
    let randomNumber = Math.floor(Math.random() * colorArray.length);
    const payload = {
      color: colorArray[randomNumber],
      snakeName,
      created: Date.now() // FUN FACT: ms since 1970
    };
    return httpClient.post(URL, payload);
  }

  public deleteSnake(token: string, userId: string, snakeId: string) {
    const URL = `${
      this.baseURL
    }/users/${userId}/snakes/${snakeId}.json?auth=${token}`;
    return httpClient.delete(URL);
  }

  public logDate(
    token: string,
    userId: string,
    snakeId: string,
    comment: string
  ) {
    const URL = `${
      this.baseURL
    }/users/${userId}/snakes/${snakeId}/dateLog/${Date.now()}.json?auth=${token}`;
    return httpClient.put(URL, { comment });
  }
}

const snakeClient = new Snakes();
export default snakeClient;
