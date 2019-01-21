import axios from "axios";

interface IRequestHeader {
  [key: string]: string;
}

interface ILoginResponseSuccess {
  username: string;
  uid: string;
  token: string;
}

class HttpClient {
  private baseUrl = "https://snakecalender.firebaseio.com";

  public get(url: string) {
    return axios.get(`${this.baseUrl}/${url}`);
  }

  public post(url: string, body: any) {
    return axios.post(`${this.baseUrl}/${url}`, body);
  }

  // public delete(url: string) {
  //   return axios.post(`${this.baseUrl}${url}`);
  // }

  // public put(url: string, body: any) {
  //   return axios.post(`${this.baseUrl}${url}`, body);
  // }
}

const httpClient = new HttpClient();
export default httpClient;
