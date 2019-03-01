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
  public get(url: string) {
    return axios.get(url);
  }

  public post(url: string, body: any) {
    return axios.post(url, body);
  }
  public put(url: string, body: any) {
    return axios.put(url, body);
  }
  public delete(url: string) {
    return axios.delete(url);
  }

  // public put(url: string, body: any) {
  //   return axios.post(`${this.baseUrl}${url}`, body);
  // }
}

const httpClient = new HttpClient();
export default httpClient;
