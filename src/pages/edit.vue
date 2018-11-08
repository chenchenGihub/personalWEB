<template>
    <ion-app class="edit">
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                <ion-card-title>Card Title</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-button @click="alert()">Trigger Alert</ion-button>
                <ion-button @click="loading()">Trigger Loading</ion-button>
                <ion-button @click="menu()">Toggle Menu</ion-button>
                <ion-button @click="modal()">Open Modal</ion-button>
                <ion-button @click="popover()">Open Popover</ion-button>
                <ion-button @click="toast()">Trigger Toast</ion-button>
            </ion-card-content>
        </ion-card>
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                <ion-card-title>Card Title</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-checkbox checked="true" @click="tab($event)">选择</ion-checkbox>
            </ion-card-content>
        </ion-card>
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                <ion-card-title>Card Title</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-button @click="notify($event)">点击</ion-button>
            </ion-card-content>
        </ion-card>
    </ion-app>
</template>

<script lang="ts">
import Vue from "vue";

export default class Edit extends Vue {
  tab() {
    console.log(event);
  }

  notify() {
    this.$ionic.alertController
      .create({
        header: "Notification",
        subHeader: null,
        message: "Hello World",
        buttons: ["Bye"]
      })
      .then((a: any) => a.present())
      .catch(console.error);
  }

  alert() {
    this.$ionic.alertController
      .create({
        header: "Hello!",
        message: "How are you?",
        buttons: ["OK, thanks!"]
      })
      .then((a: any) => a.present());
  }

  loading() {
    this.$ionic.loadingController.create().then((l: any) => {
      l.present();
      setTimeout(function() {
        l.dismiss();
      }, 1000);
    });
  }

  menu() {
    this.$ionic.menuController.toggle();
  }

  modal() {
    this.$ionic.modalController
      .create({
        component: {
          template: `<div>
                                    <ion-content padding>
                                        <h1>Howdy!</h1>
                                    </ion-content>
                                </div>`
        }
      })
      .then((m: any) => m.present());
  }

  popover() {
    this.$ionic.popoverController
      .create({
        component: {
          template: `<ion-list>
                                    <ion-list-header>
                                        <ion-label>Ionic</ion-label>
                                    </ion-list-header>
                                    <ion-item>Learn Ionic</ion-item>
                                    <ion-item>Documentation</ion-item>
                                    <ion-item>Showcase</ion-item>
                                    <ion-item>GitHub Repo</ion-item>
                                </ion-list>`
        },
        translucent: true,
        event
      })
      .then((p: any) => p.present());
  }

  toast() {
    this.$ionic.toastController
      .create({
        message: "Here's to IonicVue!",
        showCloseButton: true,
        position: "top",
        closeButtonText: "Done"
      })
      .then((t: any) => t.present());
  }
}
</script>
<style lang="scss" scoped>
.ion-page {
  justify-content: flex-start;
}

.edit {
}

.alert-button-group.sc-ion-alert-md {
  justify-content: center;
}
</style>

