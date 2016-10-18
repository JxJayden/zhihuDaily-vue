<template>
  <div class="theme-menu" :style="{left: left}" @transitionend="showRight">
    <div class="menu-left">
      <ul>
        <li><router-link @click="menuClose" to="/index">首页</router-link></li>
        <li v-for="theme in themes">
          <router-link
            @click="menuClose"
            to="/article?id='+theme.id+'&name='+theme.name+'&thumbnail='+theme.thumbnail+'&thumbnail='+theme.thumbnail+'&description='+theme.description}">
            {{theme.name}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="menu-right" @click="menuClose" :style="{opacity:opacity}"></div>
  </div>
</template>
<script>
  import { API_ROOT } from '../api_config.js'
  export default {
    name: 'slideMenu',
    data: function () {
      return {
        themes: [],
        opacity: '0',
        left: '-100%'
      }
    },
    methods: {
      showRight: function () {
        this.$data.opacity = (this.$data.left === '0px')
                             ? '0.4'
                             : '0';
      },
      menuClose: function () {
        this.$data.opacity = '0';
        this.left = '-100%';
      }
    },
    beforeMount: function () {
        console.log(API_ROOT);
        this.$http.get(API_ROOT + '/themes').then(function (response) {
        console.log(response.body.others);
          this.$data.themes = response.body.others;
        },function (response) {
          alert('sorry~出了一个小问题。');
          throw 'get themes wrong';
        })
      }
  }
</script>

<style lang="scss" scoped>
$blue:#00a2ea;
$white:#fff;

.theme-menu {
  height: inherit;
  width: inherit;
  display: space-between;
  align-items: flex-start;
  position:absolute;
  transtion: left 0.5s;
  z-index: 50;
}

.menu-left {
  height: inherit;
  width: 70%;
  overflow: auto;
  backfround: $white;
}

.menu-right {
  height: inherit;
  width: 30%;
  opacity: 0;
  transtion: opacity 0.5s;
}
</style>