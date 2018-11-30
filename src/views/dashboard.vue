<template>
<div>
 <el-checkbox v-model="checked">备选项</el-checkbox>
     <el-input v-model="input" placeholder="请输入内容"></el-input>
</div>
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
  public list: string[] = [];
  public items = [{ id: 0, name: "Ahmed" }, { id: 1, name: "Naima" }];

  public msg: string = "1232";

  hello() {
    this.list.push("Hello world");
  }

  goToDetail() {
    this.$router.push("edit");
  }
}
</script>
