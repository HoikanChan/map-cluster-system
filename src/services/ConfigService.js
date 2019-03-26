import RestApi from "@/services/RestApi";

export default {
  // sortOrder	True	String
  // pageSize	True	Int
  // pageNumber	True	Int
  getNodeList(params) {
    return RestApi().get("getMpNodeList", { params: params });
  },
  //   nodeId	int
  // pageSize	Int
  // pageNum	Int
  getYamlList(params) {
    return RestApi().get("getYamlList", { params: params });
  },
  getYAML(params) {
    return RestApi().get("getYAML", { params: params });
  }
};
