const users = require("../assets/users");
const snakes = require("../assets/snakes");

interface IRequestHeader {
  [key: string]: string;
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

  public post(url: string, body?: any, headers: IRequestHeader = {}) {
    // return ajaxPost(url, body, { ...this.defaultHeaders(), headers });
  }

  public delete(url: string, headers: IRequestHeader = {}) {
    // return ajaxDelete(url, { ...this.defaultHeaders(), headers });
  }

  public put(url: string, body?: any, headers: IRequestHeader = {}) {
    // return ajaxPut(url, body, { ...this.defaultHeaders(), headers });
  }
}

const httpClient = new HttpClient();
export default httpClient;
