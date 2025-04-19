// import { fetch } from "react-native-ssl-pinning";
import axios from "@app/libs/axios";
import { Platform } from "react-native";

export default class BaseService {
  constructor(instanceAxios = axios) {
    this.instanceAxios = instanceAxios;
  }

  get(...args) {
    return this.execute("get", ...args);
  }

  post(...args) {
    return this.execute("post", ...args);
  }

  put(...args) {
    return this.execute("put", ...args);
  }

  delete(...args) {
    return this.execute("delete", ...args);
  }

  async execute(method, ...args) {
    try {
      const response = await this.instanceAxios[method](...args);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log('error fetch: ', error);
      return Promise.reject(error);
    }
  }
}
