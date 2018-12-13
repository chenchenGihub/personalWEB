<template>
  <div class="app">
    <router-view></router-view>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {}
</script>

<style>
.app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
