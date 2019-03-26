<template>
  <div class=" container">
    <Row :gutter="24">
      <Col span="12">
      <Row type="flex" justify="start" style="justify-content:space-between">
        <div class="node-select">
          <label for=""> 节点:</label>
          <Select type="date" placeholder="" style="width: 200px" v-model="pickedNodeId">
            <Option v-for="item in nodes" :value="item.id" :key="item.id">{{ item.nodename }}</Option>
          </Select>
        </div>
      </Row>
      <br>
      <Row type="flex" justify="center" align="middle" style="flex-direction: column;">
        <Col span="24">
        <Table stripe :columns="columns1" :data="data" border :loading="loading" @on-row-click="clickTableRow"></Table>
        </Col>
        <Col span="24" style="margin-top:24px;">
        <Page ref="pages" :total="count" show-elevator @on-change="pageChange" :page-size="10"></Page>
        </Col>
      </Row>
      </Col>
      <Col span="12" style="height:100%">
      <Card class="content-card">
        <p slot="title" style="color:#464c5b;">{{pickedFile?pickedFile:"请选择要查看的文件"}}</p>
        <Input v-if="previewYAML" v-model="previewYAML" type="textarea" readonly />
        <Spin size="large" fix v-if="spinShow">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import ConfigService from "../../services/ConfigService";
import host from "../../services/hostconfig";
export default {
  data() {
    return {
      count: 10,
      nodes: [],
      pickedNodeId: null,
      loading: false,
      spinShow: false,
      previewYAML: "",
      pickedFile: null,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "文件名",
          key: "fileName",
          align: "center"
        },
        {
          title: "大小",
          key: "fileSize",
          align: "center"
        },
        {
          title: "操作",
          width: 230,
          align: "center",
          render: (h, params) => {
            function viewService(e) {
              e.stopPropagation();

              window.open(
                `http://218.10.105.196:9005/map/${params.row.fileName.slice(
                  0,
                  -5
                )}/demo/`
              );
            }
            return (
              <div>
                <i-button
                  // to="/configs/mapServices"
                  icon="ios-eye"
                  size="small"
                  style="margin-right:8px"
                  onClick={viewService.bind(this)}
                >
                  查看地图服务
                </i-button>
                <a
                  href={`${host}downloadYAML?yamlName=${params.row.fileName}`}
                  download
                  onClick={event => event.stopPropagation()}
                >
                  <i-button icon="ios-download" size="small">
                    下载
                  </i-button>
                </a>
              </div>
            );
          }
        }
      ],
      data: []
    };
  },
  watch: {
    pickedNodeId: function(val) {
      if (val) {
        this.fetchData();
        this.$refs["pages"].currentPage = 1;
      }
    }
  },
  methods: {
    async getNodes() {
      const result = (await ConfigService.getNodeList({
        pageSize: 10,
        pageNumber: 1,
        sortOrder: "asc"
      })).data.list;
      this.nodes = result ? result : [];
    },
    async fetchData(page) {
      if (!page) {
        page = 1;
      }
      this.loading = true;
      const result = (await ConfigService.getYamlList({
        pageSize: 10,
        pageNum: page,
        nodeId: this.pickedNodeId
      })).data;

      this.loading = false;
      this.data = result.list.length ? result.list : [];
      this.count = result.total ? Number(result.total) : 0;
    },
    async clickTableRow(data) {
      this.spinShow = true;
      this.pickedFile = data.fileName;
      const result = (await ConfigService.getYAML({
        yamlName: data.fileName
      })).data.yamlStr;
      this.previewYAML = result ? result : [];
      this.spinShow = false;
    },
    viewYAML() {},
    pageChange(page) {
      this.fetchData(page);
    }
  },
  async mounted() {
    this.pickedNodeId = this.$route.query.id;
    await this.getNodes();
    if (!this.pickedNodeId) {
      this.pickedNodeId = this.nodes[0].id;
    }
  }
};
</script>
<style lang="less" scoped>
.content-card {
  background: #fff;
  height: 80vh;
  width: 100%;
  border-radius: 5px;
}
.node-select {
  label {
    padding: 0 8px;
    font-weight: bold;
    font-size: 14px;
  }
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.container /deep/ textarea.ivu-input {
  height: 74.6vh;
  width: 100%;
}
.container /deep/ .ivu-card-body {
  padding: 0px;
}
</style>
