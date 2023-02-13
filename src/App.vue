<template>
  <div id="app">
    <el-button @click="init">点击请求</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    init() {
      this.$api.getData().then((res) => {
        if (res.code === 0) {
          console.log("====================================");
          console.log(res.result);
          console.log("====================================");
        }
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
