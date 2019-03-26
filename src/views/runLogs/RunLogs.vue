<template>
  <div class=" container">
    <Row :gutter="24">
      <Col span="12">
      <Row>
        <Col span="24" style="text-align: right;">
        <Button icon="ios-trash" @click="deleteModalShow=true">一键删除历史文件</Button>
        </Col>
      </Row>
      <br>
      <Row type="flex" justify="start">
        <Col span="24">
        <Row type="flex" justify="start" align="middle" style="justify-content:space-between">
          <div class="node-select">
            <label for=""> 节点:</label>
            <Select type="date" placeholder="" style="width: 200px" v-model="pickedNodeId">
              <Option v-for="item in nodes" :value="item.id" :key="item.id">{{ item.nodename }}</Option>
            </Select>
          </div>
          <div>
            <DatePicker type="date" placeholder="起始日期" style="width: 150px" v-model="startTime" format="yyyy/MM/dd"></DatePicker>
            &nbsp;
            <DatePicker type="date" placeholder="结束日期" style="width: 150px" v-model="endTime" format="yyyy/MM/dd"></DatePicker>
          </div>
        </Row>
        </Col>
        <br>
      </Row>
      <br>

      <Row type="flex" justify="center" align="middle" style="flex-direction: column;">
        <Col span="24">
        <Table stripe :columns="columns" :data="data" border :loading="loading" @on-row-click="clickTableRow"></Table>
        </Col>
        <Col span="24" style="margin-top:24px;">
        <Page ref="pages" show-total :total="count" show-elevator @on-change="pageChange" :page-size="10"></Page>
        </Col>
      </Row>
      </Col>
      <Col span="12" style="height:100%">
      <Card class="content-card">
        <p slot="title" style="color:#464c5b;">{{pickedFile?pickedFile:"请选择要查看的文件"}}</p>
        <Input v-if="previewFileContent" v-model="previewFileContent" type="textarea" readonly />
        <Spin size="large" fix v-if="spinShow">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </Card>
      </Col>
    </Row>
    <Modal v-model="deleteModalShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除所有日志</span>
      </p>
      <div style="text-align:center">
        <p>请确认您要删除所有日志吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="deleteAll()">删除</Button>
      </div>
    </Modal>
  </div>

</template>
<script>
import ConfigService from "../../services/ConfigService";
import MapLogService from "../../services/MapLogService";
import host from "../../services/hostconfig";

export default {
  data() {
    return {
      count: 0,
      nodes: [],
      pickedNodeId: null,
      loading: false,
      modal_loading: false,
      spinShow: false,
      startTime: "",
      endTime: "",
      pickedFile: "",
      previewFileContent: null,
      deleteModalShow: false,
      columns: [
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
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.fileName.slice(-4) === ".log") {
              return (
                <a
                  href={`${host}downloadMpLog?fileName=${
                    params.row.fileName
                  }&nodeId=${this.pickedNodeId}`}
                  download
                  onClick={event => event.stopPropagation()}
                >
                  <i-button icon="ios-download" size="small">
                    下载
                  </i-button>
                </a>
              );
            } else {
              return (
                <div>
                  <a
                    href={`${host}downloadMpLog?fileName=${
                      params.row.fileName
                    }&nodeId=${this.pickedNodeId}`}
                    download
                    onClick={event => event.stopPropagation()}
                    style="margin-right:4px"
                  >
                    <i-button icon="ios-download" size="small">
                      下载
                    </i-button>
                  </a>
                  <i-button
                    icon="ios-trash"
                    size="small"
                    onClick={event => this.deleteFile(event, params.row)}
                  >
                    删除
                  </i-button>
                </div>
              );
            }
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
    },
    startTime: function() {
      this.fetchData();
    },
    endTime: function() {
      this.fetchData();
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
    async clickTableRow(data) {
      this.spinShow = true;
      this.pickedFile = data.fileName;
      const result = (await MapLogService.viewMpLog({
        fileName: data.fileName,
        nodeId: this.pickedNodeId
      })).data.content;
      this.previewFileContent = result ? result : "";
      this.spinShow = false;
    },
    async fetchData(page) {
      if (!page) {
        page = 1;
      }
      this.loading = true;
      const result = (await MapLogService.getMpLogList({
        pageSize: 10,
        pageNum: page,
        nodeId: this.pickedNodeId,
        startTime: this.startTime ? new Date(this.startTime).getTime() : "",
        endTime: this.endTime ? new Date(this.endTime).getTime() : ""
      })).data;

      this.loading = false;
      this.data = result.list.length ? result.list : [];
      this.count = result.total ? Number(result.total) : 0;
    },
    async deleteFile(event, row) {
      event.stopPropagation();
      this.loading = true;
      const result = (await MapLogService.deleteMpLog({
        fileName: row.fileName,
        type: 1,
        nodeId: this.pickedNodeId
      })).data;
      if (result.code === "1") {
        this.$Notice.success({
          title: "成功",
          desc: `删除成功`,
          duration: 3
        });
        this.fetchData();
      } else {
        this.loading = false;
        this.$Notice.error({
          title: "失败",
          desc: `删除失败`,
          duration: 3
        });
      }
    },
    async deleteAll() {
      this.modal_loading = true;
      const result = (await MapLogService.deleteMpLog({
        type: 2,
        nodeId: this.pickedNodeId
      })).data;
      if (result.code === "1") {
        this.$Notice.success({
          title: "成功",
          desc: `删除成功`,
          duration: 3
        });
        this.fetchData();
      } else {
        this.loading = false;
        this.$Notice.error({
          title: "失败",
          desc: `删除失败`,
          duration: 3
        });
      }
      this.modal_loading = false;
      this.deleteModalShow = false;
    },
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
