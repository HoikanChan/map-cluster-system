import axios from "axios";
import host from "./hostconfig";
export default () => {
  return axios.create({
    // baseURL: "http://124.200.40.5:8004/rest/restForOutside/"
    baseURL: host
  });
};
