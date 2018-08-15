import Api from "@/services/Api";

export default {
  getMpLogList(params) {
    return Api().get("getMpLogList", { params: params });
  },
  viewMpLog(params) {
    return Api().get("viewMpLog", { params: params });
  },
  deleteMpLog(params) {
    return Api().post("deleteMpLog", params);
  },
  downloadMpLog(params) {
    return Api().get("downloadMpLog", { params: params });
  }
};
