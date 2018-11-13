<template>
    
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
