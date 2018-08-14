import Api from "@/services/Api";

export default {
  // sortOrder	True	String
  // pageSize	True	Int
  // pageNumber	True	Int
  getNodeList(params) {
    return Api().get("getMpNodeList", { params: params });
  },
  //   nodeId	int
  // pageSize	Int
  // pageNum	Int
  getYamlList(params) {
    return Api().get("getYamlList", { params: params });
  },
  getYAML(params) {
    return Api().get("getYAML", { params: params });
  },
  getMpLogList(params) {
    return Api().get("getMpLogList", { params: params });
  },
  viewMpLog(params) {
    return Api().get("viewMpLog", { params: params });
  },
  deleteMpLog(params) {
    return Api().get("deleteMpLog", { params: params });
  },
  downloadMpLog(params) {
    return Api().get("downloadMpLog", { params: params });
  }
};
