<template>
  <div>
    <span>{{MyName}}</span>
    <div>所有列表</div>
    <div
      v-for="item of Todos"
      :key="item.id"
    >
      {{item.text}}
    </div>
    <div>完成的列表</div>
    <div
      v-for="a of DoneTodos"
      :key="a.id"
    >
      {{a.text}}
    </div>
    <button v-on:click="tab(1)">increment</button>
    <!-- <el-button @click="startHacking">Start</el-button> -->
    <el-switch
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949">
  </el-switch>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
@Component({
  components: {}
})
export default class Edit extends Vue {
  /**
   *  this.$store.state.count
   */
  @State("count") Count!: number;

  @State(State => State.todos) Todos!: Array<any>;

  /**
   *  state的分支数据
   */
  @Getter("doneTodos") DoneTodos!: Array<any>;
  /**
   * 异步提交
   */
  @Action("TEST_MUTATION") actionFoo!: () => void;
  /**
   * 同步提交
   */
  @Mutation("increment") mutationFoo!: (value:any) => void;
  /**
   *
   */

  public items: Array<number> = [1, 3, 2, 1, 3];

  public a = "哈哈哈哈";

  value2:boolean=true;

  mounted() {
    console.log(this.Count);
    console.log(this.Todos, this.DoneTodos);
  }

  created() {}

  tab(message: number): void {
    this.mutationFoo({type:'increment',value:10});
    console.log(this.Count);
    
  }

  // computed
  get MyName(): number {
    return this.Count;
  }
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




