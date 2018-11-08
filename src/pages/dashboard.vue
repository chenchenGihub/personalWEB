<template>
    <ion-app>
        <ion-page class="ion-page">
            <toolbar title="Home" />
            <ion-content class="ion-content" padding>
                <ion-tabs>
                    <ion-tab href="schedule" label="schedule" icon="calendar" name="schedule">
                        <ion-vue-router />
                    </ion-tab>
                    <ion-tab href="speakers" label="speakers" icon="contacts" name="speakers">
                        <ion-vue-router name="speakers" />
                    </ion-tab>
                </ion-tabs>
            </ion-content>
        </ion-page>
        <ion-button size="small" @click="goToDetail">Small Button</ion-button>
    </ion-app>
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
