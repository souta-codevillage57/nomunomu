<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      
      <!-- お薬一覧 -->
      <h2 class="ui dividing header">お薬編集</h2>    
      <div class="ui segment">
        <ul class="ui comments divided">
          <template v-for="(med, index) in meds">
            <li class="comment" :key="index">
              <div class="content">
                <div>
                  <span class="author">{{med.medname}}</span>
                  <button class="ui right floated grey mini button" @click="updatemed()">
                    更新
                  </button>
                  <button class="ui right floated grey mini button" @click="deletemed(med)">
                    削除
                  </button>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>          
      <!-- お薬一覧終了-->
      <button class="ui floated grey mini button" @click="addmed()">
        追加
      </button>
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
  name: 'MedicalEdit',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return{
      // userId: window.localStrage.getItem('userId'),
      meds: {
        medname: '',
      },
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
      //お薬の情報を取得する
      await this.getmeds();
      console.log("GET");
    }catch(e){
      //エラー処理
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    
    async getmeds() {
      try{
        //お薬の情報を取得するapi
        const res = await axios.get(baseUrl + `/med?userId=${this.userId}`,  { headers });
        this.meds = res.data;
        console.log(this.meds);
      }catch(e) {
        //エラー処理
        console.log(this.e);
      }
    }, 
    
    async deletemed(med) {
      const { medname } = med;
      const data = {
        medname
      };
      try {
        //お薬の情報を削除するapi
        await axios.delete(baseUrl + '/med', { data, headers });
      }catch(e){
        //エラー処理
      }
    }, // お薬情報を削除する
    
    async addmed() {
      this.$router.push({name: "MedicalAdd"});
    }, //お薬追加ページに飛ぶ
    
    async updatemed() {
      this.$router.push({name: "MedicalUpdate"});
    }, // お薬更新のページに飛ぶ
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