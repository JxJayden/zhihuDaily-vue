<template>
	<div id="containter">
    <!-- github fork me icon -->
    <a href="https://github.com/JxJayden"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>
		<div class="header">
      <a class="menu" @click="showMenu"></a>
      <span class="head-title" v-show="titleShow">{{headTitle}}</span>
		</div>
    <slideMenu></slideMenu>
    <div class="content">
      <router-view></router-view>
    </div>
	</div>

	<router-view></router-view>
</template>

<script>
  import slideMenu from './components/slideMenu.vue';
  export default {
    name: 'app',
    el: function() {
      return '.containter'
    },
    data: function() {
      return {
        headTitle: '首页',
        titleShow: 'true',
        height: 960,
      }
    },
    components: {
      sildeMenu
    },
  };
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>