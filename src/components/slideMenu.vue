<template>
  <div id="theme-menu" :style="{left: left}" @transitionend="showRight">
    <div id="menu-left">
      <ul>
        <li @click="menuClose()">
          <router-link
              :to="{ name: 'index' }">
              首页</router-link>
        </li>
        <li v-for="theme in themes" @click="menuClose()">
          <router-link
            :to="{ name: 'article',
            params: {id: theme.id, name: theme.name, thumbnail: theme.thumbnail, description: theme.description }}">
            {{theme.name}}
          </router-link>
        </li>
      </ul>
    </div>
    <div id="menu-right"
      @click="menuClose()"
      :style="{opacity:opacity}">
    </div>
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

#theme-menu {
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position:absolute;
  transition: left 0.5s;
  z-index: 50;
  overflow-x: hidden;
}

#menu-left {
  height: inherit;
  width: 70%;
  overflow: auto;
  background-color: $white;

}

#menu-right {
  height: inherit;
  width: 30%;
  opacity: 0;
  background-color: #000;
  transition: opacity 0.5s;
}
ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  li {
    list-style-type: none;
    display: flex;
    width: 90%;
    padding-left: 5%;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    a {
      text-decoration: none;
      color: #000;
      line-height: 50px;
      display: block;
      height: inherit;
      width: inherit;
    }
    &:hover {
      background-color: #f2f2f2;
    }
    active {
            background-color: #f4f4f4;
    }
  }
}
</style>