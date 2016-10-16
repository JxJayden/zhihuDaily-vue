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
  import {API_ROOT} form '../../api_config.js'
  export default {
    name: 'slideMenu',
    data: function() {
      return {
        themes: {},
        opacity: '0',
        left: '-100%'
      }
    },
    method: {
      showRight: function() {
        this.$data.opacity = (this.$data.left === '0px')
                             ? '0.4'
                             : '0';
      }
      menuClose: function() {
        this.$data.opacity = '0';
        this.left = '-100%';
      }
      compiled: function() {
        this.$http.get(API_ROOT + '/api/themes').then(function(response) {
          this.$data.themes = response.json();
        },function(response) {
          alert('sorry~出了一个小问题。');
          throw 'get themes wrong';
        })
      }
    }
  }
</script>
<style>

</style>