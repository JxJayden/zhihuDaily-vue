<template>
  	<div id="contents">
		<div v-html="body" id="body" v-scoak></div>
	</div>
</template>
<script>
  import { API_ROOT } from '../api_config.js'
  export default {
    name: 'contents',
    data () {
      return {
        body: null
      }
    },
    created () {
      this.fetchContents()
    },
    watch: {
    '$route': 'fetchContents'
    },
    methods: {
      fetchContents () {
        console.log('fetchContents');
        this.$parent.$data.headTitle="文章";
        var $id = this.$route.params.id;
        this.$http.get(API_ROOT + '/news',{params: {id: $id}}).then((res) => {
          var json = res.body;
          var topImg = json.image.replace(/http/, API_ROOT + '/pic?img=http');
          var body = json.body.replace(/src="http/g, 'src="' + API_ROOT + '/pic?img=http');
          var replaceTop = '<div class="headline">\
                              <div class="img-wrap">\
                                <h1 class="headline-title">'+ json.title +'</h1>\
                                <span class="img-source">图片：'+ json.image_source +'</span>\
                                <img src="'+ topImg +'" alt="">\
                                <div class="img-mask"></div>\
                            </div></div>'
          body = body.replace(/<div class="headline">\n{0,100000}<div class="img-place-holder">\n{0,100000}<\/div>\n{0,100000}<\/div>/, replaceTop);
          this.$data.body = body;
        });
      }
    }
  }
</script>
<style>
  [v-scoak] {
    display: none;
  }
  @import url("http://news-at.zhihu.com/css/news_qa.auto.css");
  .img-wrap .headline-title {
    margin: 20px 0;
    z-index: 1;
    position: absolute;
    color: white;
    text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
    top: 80px;
    font-size: 26px;
    padding: 0 20px !important;
  }
  .img-wrap img {
    margin-top: -18%;
    width: 640px;
  }
  .img-wrap .img-source {
    position: absolute;
    top: 140px;
    z-index: 1;
    font-size: 12px;
    color: rgba(255,255,255,.6);
    left: 0;
    padding: 0 20px !important;
    text-shadow: 0px 1px 2px rgba(0,0,0,.3);
  }
</style>