<template>
  <div class="edit" id="edit">
    <div v-for="item in items" :key="item.id">
      {{item}}
    </div>
    <button class="btn" @click="tab()">点击</button>
  </div>

</template>

<script lang="ts">
import Vue from "vue";

export default class Edit extends Vue {
  public items: Array<number> = [1, 3, 2, 1, 3];

  public a = "";

  tab() {}
}
</script>

<style lang="scss" scoped>
.ion-page {
  justify-content: flex-start;
}

.edit {
  background-color: aqua;
}

.alert-button-group.sc-ion-alert-md {
  justify-content: center;
}

.btn {
  background-color: red;
}
</style>




