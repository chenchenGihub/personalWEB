<template>
  <div class="container">
    123
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import * as THREE from "three";
@Component({
  components: {}
})
export default class ThreeDemo extends Vue {
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
  @Mutation("increment") mutationFoo!: (value: any) => void;
  /**
   *
   */
  public items: Array<number> = [1, 3, 2, 1, 3];

  public scene: any;
  public camera: any;
  public mesh: any;
  public renderer: any;

  mounted() {}

  created() {
    const scene = new THREE.Scene();
    console.log(scene);
    this.init();
    this.animate();
  }

  public init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.z = 700;
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }
  public animate() {
    requestAnimationFrame(this.animate);
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
</script>

<style lang="scss" scoped>
.container {
   
    width: 100vw;
    height: 100vh;
}
</style>




