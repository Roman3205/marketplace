<script>
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
  created() {
    // vue-cookies
    // console.log(this.$cookies.set('test', 'testvalue', "1d"));
    // console.log(this.$cookies.get('test'));
    // console.log(this.$cookies.isKey('test'));
    // console.log(this.$cookies.keys('test'));
  },
};
</script>

<template>
  <div class="app">
    <router-view #default="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div style="width: 100%" :key="route.fullPath">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "FreeMono", monospace;
  overflow-x: hidden;
}

.header,
.footer {
  background-color: #a6ba95;
}

html::-webkit-scrollbar,
.create::-webkit-scrollbar {
  background: #a6ba95;
  border-radius: 35px;
  width: 10px;
}

html {
  background-color: #a6ba95;
}

html::-webkit-scrollbar-thumb,
.create::-webkit-scrollbar-thumb {
  background: #623f55;
  border-radius: 35px;

  width: 10px;
  height: 35%;
}

.notification {
  position: fixed;
  top: 50px;
  right: 50px;
  animation-name: notification;
  animation-duration: 8s;
  transform: translateX(50px);
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  z-index: 999;
}

@keyframes notification {
  0% {
    opacity: 0;
    visibility: hidden;
  }

  40% {
    transform: translateX(-50px);
    transition: opacity 0.2s ease, visibility 0.2s ease;
    opacity: 1;
    visibility: visible;
  }

  60% {
    transform: translateX(200px);
    transition: opacity 0.2s ease, visibility 1s ease;
    opacity: 0;
    visibility: hidden;
  }
}

.content-app {
  min-height: calc(100vh - 735px);
}

.changemenu-opacity {
  opacity: 0.85;
  z-index: 900;
  /* position: fixed; */
  filter: blur(0.7px);
}

textarea {
  outline: none;
}

.app {
  background-color: #a6ba95;
  display: flex;
  justify-content: center;
}

.seller {
  display: flex;
  background-color: #efefef;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.sidebar-seller {
  width: 25%;
}

.router-seller {
  width: 100%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 900px) {
  .seller {
    flex-direction: column;
    justify-content: start;
  }

  .sidebar-seller {
    width: 100%;
    overflow: hidden;
    min-height: 120.5px !important;
  }

  .opener-sell {
    position: absolute;
    top: 370px;
  }

  .router-seller {
    overflow: hidden;
  }

  .notification {
    transform: translateX(100px);
    animation-duration: 7.2s;
  }

  @keyframes notification {
    40% {
      transform: translateX(25px);
      transition: opacity 0.2s ease, visibility 0.2s ease;
      opacity: 1;
      visibility: visible;
    }
  }
}

@media screen and (max-width: 1300px) {
  .header {
    min-height: 150px;
  }

  .footer {
    height: 80px;
  }
}
</style>
