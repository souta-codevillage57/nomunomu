<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      
      <!-- 投稿一覧 -->
      <h2 class="ui dividing header">投稿一覧</h2>    
      <div class="ui segment">
        <ul class="ui comments divided">
          <template v-for="(article, index) in articles">
            <li class="comment" :key="index">
              <div class="content">
                <div>
                  <span class="author">{{article.userId}}</span>
                  <div class="metadata">
                    <span class="date">{{ convertToLocaleString(article.timestamp) }}</span>
                  </div>
                  <button v-if="isMyArticle(article.userId)" class="ui right floated grey mini button" @click="deleteArticle(article)">
                    削除
                  </button>
                </div>
                <p class="text">
                  {{article.text}}
                </p>
                <span class="ui green label" v-if="article.category">{{article.category}}</span>
                <div class="ui divider"></div>
              </div>
            </li>
          </template>
        </ul>
      </div>          
      <!-- 投稿一覧終了-->
      
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
//import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

const headers = {'Authorization' : 'mtiToken'};

export default {
  name: 'Home',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return{
      post: {
        text: null,
        category: null,
      },
      search: {
        userId: null,
        category: null,
        start: null,
        end: null,
      },
      articles: [],
      iam: null,
      successMsg: '',
      errorMsg: '',
      isCallingApi: false
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  
  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    try{
      await this.getArticles();
      console.log("GET");
    }catch(e){
      //エラー処理
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    isMyArticle(id) {
      return this.iam === id;
    }, // 自分の記事かどうかを判定する
    
    async getArticles() {
      try{
        const res = await axios.get(baseUrl + '/articles',  { headers });
        this.articles = res.data;
        console.log(this.articles);
      }catch(e) {
        //エラー処理
        console.log(this.e);
      }
    }, 
    
    async deleteArticle(article) {
      const { userId, timestamp } = article;
      const data = {
        userId,
        timestamp,
      };
      try {
        await axios.delete(baseUrl + '/article', { data, headers });
      }catch(e){
        //エラー処理
      }
    }, // 記事を削除する
    
    convertToLocaleString(timestamp) {
      return new Date(timestamp).toLocaleString();
    } // timestampをLocaleDateStringに変換する
  }
}
</script>

<style scoped>
  .author {
    font-size : large;
    font-weight : bold;
    text-decoration : underline;
  } 
</style>