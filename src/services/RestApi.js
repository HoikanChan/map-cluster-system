import axios from "axios";
import host from "./hostconfig";
export default () => {
  return axios.create({
    // baseURL: "http://192.168.15.158:8099/rest/restForOutside/"
    baseURL: host+'rest/restForOutside/'
  });
};
