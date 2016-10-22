<template>
  <div id="index">
    <div id="listContent">
      <ul id="list">
        <li id="listItem" v-for="story in stories">
          <router-link :to="{name: 'contents', params: {id: story.id}}">
            <div id="listTitle">
            <span>{{story.title}}</span>
            </div>
            <div id="listImg">
            <img :src="story.images" width="60px" height="60px">
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
        var $id = this.$route.params.id;
        this.$http.get(API_ROOT + '/theme',{
          params: { id: $id }
        }).then(function (response) {
          console.log(response.body.stories);
          response.body.stories.forEach(function (ele) {
            if(ele.images) {
              ele.images = API_ROOT + '/pic?img=' + ele.images;
            } else {
              ele.images = './ac.jpg';
            }
          })
          this.$data.stories = response.body.stories;
          this.$parent.$data.headTitle = this.$route.params.name;
        });
      }
    },
    created () {
    this.fetchData()
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
  #listContent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 20px;
    #listContentTitle {
      display: block;
      width: calc(100% - 40px);
      padding: 20px 0 10px 40px;
      font-size: 18px;
      color: $black-light;
    }
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