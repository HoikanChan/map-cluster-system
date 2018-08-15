<template>
  <div class=" container">
    <Row type="flex" justify="center" align="middle" style="flex-direction: column;">
      <Col span="24">
      <Table stripe :columns="columns1" :data="data" border></Table>
      </Col>
      <Col span="24" style="margin-top:24px;">
      <Page :total="alertCount" show-elevator @on-change="pageChange" :page-size="10"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import ConfigService from "../../services/ConfigService";
export default {
  data() {
    return {
      alertCount: 10,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "节点名称",
          key: "nodename",
          align: "center"
        },
        {
          title: "HOST",
          key: "host",
          align: "center"
        },
        {
          title: "用户",
          key: "account",
          align: "center"
        },
        {
          title: "密码",
          key: "password",
          align: "center"
        },
        {
          title: "配置文件路径",
          key: "runlogdir",
          align: "center",
          render: (h, params) => {
            function viewLog() {
              this.$router.push({
                name: "configs",
                query: { id: params.row.id }
              });
            }
            return (
              <div
                style="cursor:pointer;color:#11a0dc;"
                onClick={viewLog.bind(this)}
              >
                {params.row.runlogdir}
              </div>
            );
          }
        },
        {
          title: "日志文件路径",
          key: "yamldir",
          align: "center",
          render: (h, params) => {
            function viewLog() {
              this.$router.push({
                name: "logs",
                query: { id: params.row.id }
              });
            }
            return (
              <div
                style="cursor:pointer;color:#11a0dc;"
                onClick={viewLog.bind(this)}
              >
                {params.row.yamldir}
              </div>
            );
          }
        }
      ],
      data: []
    };
  },
  methods: {
    async fetchData() {
      const result = (await ConfigService.getNodeList({
        pageSize: 10,
        pageNumber: 1,
        sortOrder: "asc"
      })).data.list;
      this.data = result ? result : [];
    },
    pageChange(page) {
      this.fetchData(page);
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style lang="less" scoped>
</style>
