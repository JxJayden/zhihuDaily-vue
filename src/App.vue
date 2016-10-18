<template>
  <div id="app">
  <div class="github-icon">
    <a href="https://github.com/JxJayden">
    <img style="position: absolute; top: 0; right: 0; border: 0;"
        src="./assets/githubicon.png"
        alt="Fork me on GitHub"
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">
    </a>
  </div>
    <div class="container" :style="{height: containerHeight}">
      <div class="header" :style="{opacity: opacity, visibility: visibility}">
        <div class="topbar">
          <a class="top" @click="showMenu" v-if="ifIndex">more</a>
          <router-link to='/index' v-if="!ifIndex">返回</router-link>
          <span class="head-title" v-show="titleShow">{{headTitle}}</span>
        </div>

      </div>
      <slideMenu></slideMenu>
      <div class="content" @scroll="srcollContent($event)">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import slideMenu from './components/slideMenu.vue';
  export default {
    name: 'app',
    data: function() {
      return {
        headTitle: '首页',
        titleShow: true,
        ifIndex: true,
        height: 960,
        opacity: 1,
        visibility: 'visible'
      }
    },
    computed: {
      containerHeight: function() {
        return this.height + 'px';
      },
      contentHeight: function() {
        return (this.height - 60) + 'px';
      }
    },
    components: {
      slideMenu
    },
    methods: {
      showMenu: function() {
        this.$children[0].$data.left = "0px";
      },
      scrollContent: function(event) {
        var $target = event?event.target:window.event.target;
        if($target.scrollTop <= 200) {
          this.$data.visibility = 'visible';
          this.$data.opacity = (200 - scrollTop) / 200;
        } else { this.$data.visibility = 'hidden'; }
      },
      titleShow: function() {
        if(!this.$data.ifIndex) {
          return false;
        } else { return true; }
      }
    },
    beforeMount: function() {
      this.$data.height = window.innerHeight;
    }
  };
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.github-icon {
  a {
    cursor: pointer;
  }
}

.container {
  position: relative;
  overflow-x: hidden;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #00a2ea;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar {
   justify-content: flex-start;
   margin-left: 30px;
   align-items: center;
}

.content {
  padding-top: 60px;
  overflow: auto;
}

@media screen and (max-width: 640px) {
  .container {
      width: 100%;
  }
  .github-icon {
      display: none;
  }
}

@media screen and (min-width: 640px) {
  .container {
    width: 640px;
    margin: 0px auto;
  }
  .header {
    width: 640px;
  }
}
</style>