<template>
  <div id="app">
  <div id="github-icon">
    <a href="https://github.com/JxJayden">
    <img style="position: absolute; top: 0; right: 0; border: 0;"
      src="./assets/githubicon.png"
      alt="Fork me on GitHub"
      data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">
    </a>
  </div>
    <div id="container" :style="{height: containerHeight}">
      <div id="header" :style="{opacity: opacity, visibility: visibility}">
        <div id="topbar">
          <a id="top" @click="showMenu" v-if="ifIndex">more</a>
          <router-link to='/index' v-if="!ifIndex">返回</router-link>
          <span id="head-title" v-show="titleShow">{{headTitle}}</span>
        </div>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=JxJayden&repo=zhihuDaily-vue&type=star&count=false&size=large"
            frameborder="0"
            scrolling="0"
            width="160px"
            height="30px">
          </iframe>
      </div>
      <slideMenu></slideMenu>
      <div id="content" v-on:scroll="scrollContent($event)">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import slideMenu from './components/slideMenu.vue';
  export default {
    name: 'app',
    data () {
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
        return this.$data.height + 'px';
      },
      contentHeight: function() {
        return (this.$data.height - 60) + 'px';
      }
    },
    components: {
      slideMenu
    },
    methods: {
      showMenu () {
        this.$children[0].$data.left = "0px";
      },
      scrollContent (event) {
        console.log(event);
        var $target = event.target;
        if($target.scrollTop <= 200) {
          this.$data.visibility = 'visible';
          this.$data.opacity = (200 - $target.scrollTop) / 200;
        } else { this.$data.visibility = 'hidden'; }
      },
      titleShow () {
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

#github-icon {
  a {
    cursor: pointer;
  }
}

#container {
  position: relative;
  overflow-x: hidden;
}

#header {
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
  z-index: 10;
}

#topbar {
   justify-content: flex-start;
   margin-left: 30px;
   align-items: center;
}

#content {
  padding-top: 60px;
  overflow: auto;
}

@media screen and (max-width: 640px) {
  #container {
      width: 100%;
  }
  #github-icon {
      display: none;
  }
}

@media screen and (min-width: 640px) {
  #container {
    width: 640px;
    margin: 0px auto;
    box-shadow: 0px 1px 1px #d2d2d2;
  }
  #header {
    width: 640px;
  }
}
</style>