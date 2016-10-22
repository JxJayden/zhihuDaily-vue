<template>
  <div id="index">
    <div id="topContainer">
      <div id="top" :style="{'right':topRight}">
        <router-link id="imgBack" v-for="item in top_stories" :to="{name: 'contents', params: { id: item.id}}">
          <div id="topImg"
            :style="{'background-image':'url('+ API + '/pic?img=' + item.image+ ')'}">
            <h1>{{item.title}}</h1>
          </div>
        </router-link>
      </div>
    </div>
    <div id="listContent">
      <ul id="list">
        <li id="listItem" v-for="story in stories">
          <router-link :to="{name: 'contents', params: {id: story.id}}">
            <div id="listTitle">
            <span>{{story.title}}</span>
            </div>
            <div id="listImg">
            <img :src="API + '/pic?img=' + story.images[0]" width="60px" height="60px">
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { API_ROOT } from '../api_config.js';
  export default {
    name: 'index',
    data () {
      return {
        stories: [],
        top_stories: [],
        topRightBase: 0,
        API: API_ROOT
      }
    },
    computed: {
      topRight: function () {
        return this.$data.topRightBase + '%';
      }
    },
    watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        console.log('fetchData');
        this.$http.get(API_ROOT + '/latest').then(function (response) {
          console.log(response);
          this.$data.top_stories = response.body.top_stories;
          this.$data.stories = response.body.stories;
          this.$parent.$data.headTitle = '热乎乎的今日新闻';
        });
      }
    },
    created () {
    this.fetchData()
    },
    mounted () {
      var self = this;
      setInterval(function() {
        if (self.$data.topRightBase >= 400) {
          self.$data.topRightBase = 0;
        } else {
          self.$data.topRightBase += 100;
        }
      }, 2000);
    }
  }
</script>
<style lang="scss" scoped>
  $grey-light: #f4f4f4;
  $grey-deep: #f2f2f2;
  $black-light: #bdbdbd;
  a {
    text-decoration: none;
    color: #000;
  }
  li {
    list-style-type: none;
  }
  #index {
    background-color: $grey-light;
  }
  #topContainer {
    overflow-x: hidden;
  }
  #top {
    height: 240px;
    width: 500%;
    position: relative;
    overflow: hidden;
    transition: right 0.8s;
  }
  #imgBack {
    display: block;
    height: inherit;
    width: calc(100% / 5);
    float: left;
    background-color: #f6f6f6;
    background-repeat: no-repeat;
    background-position: center;
  }
  #topImg {
    width: 100%;
    height: inherit;
    background-size: 100%;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    h1 {
      color: #fff;
      font-size: 18px;
      width: 90%;
      margin-bottom: 0;
      padding: 40px 5% 10px 5%;
      background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
      letter-spacing: 3px;
    }
  }
  #listContent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 5%;
    #list {
      padding-left: 0;
    }
    #listItem {
      padding: 8px 8px 8px 8px;
      margin: 0 6% 10px 6%;
      background-color: #fff;
      box-shadow: 0px 1px 2px 0px $black-light;
      &:hover {
        background-color:$black-light;
      }
    }
    #listItem a {
      display: flex;
      align-items: center;
      width: 90%;
      height: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
    #listImg {
       width: 60px;
       height: 60px;
    }
    #listTitle {
       font-size: 16px;
    }
  }
</style>