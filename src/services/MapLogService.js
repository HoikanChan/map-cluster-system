import RestApi from "@/services/RestApi";
import axios from "axios";
import {host} from "./hostconfig";

export default {
  getMpLogList(params) {
    return RestApi().get("getMpLogList", { params: params });
  },
  viewMpLog(params) {
    return RestApi().get("viewMpLog", { params: params });
  },
  deleteMpLog(params) {
    return axios({
      url: host + "deleteMpLog",
      data: params,
      method: "post",
      transformRequest: [
        function(data) {
          var ret = "";
          for (let i in data) {
            ret += encodeURIComponent(i) + "=" + encodeURI(data[i]) + "&";
          }
          return ret;
        }
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },
  downloadMpLog(params) {
    return RestApi().get("downloadMpLog", { params: params });
  }
};
