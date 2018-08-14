import axios from "axios";
export default () => {
  return axios.create({
    baseURL: "http://192.168.15.65:8099/"
  });
};
