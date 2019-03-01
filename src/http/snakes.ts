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
      "#4caf50", //green
      "#2196f3", //blue
      "#009688", //teal
      "#f44336", // red
      "#e91e63", //pink
      "#9c27b0 ", //purple
      "#673ab7", //deep purple
      "#3f51b5", //indigo
      "#03a9f4", //light blue
      "#00bcd4", //cyan
      "#8bc34a", //light-green
      "#cddc39", //lime
      "#ffc107", //amber
      "#ff9800", //ornage
      "#ff5722", //deep orange
      "#795548", //brown
      "#9e9e9e", //grey
      "#607d8b" //blue-grey
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
