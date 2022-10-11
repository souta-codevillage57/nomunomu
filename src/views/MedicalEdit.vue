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
                  <span class="author">{{med.medName}}</span>
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
      <div class="addbtn">
        <button class="ui floated grey mini button" @click="addmed()">
          追加
        </button>
      </div>
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
        userId: '',
        medName: '',
        medQuantity: '',
        medNum: '',
        oncemedfirsttime: '',
        oncemedlasttime: '',
        twicemedfirsttime: '',
        twicemedlasttime: '',
        thircemedfirsttime: '',
        thircemedlasttime: '',
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
      console.log(this.e);
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    
    async getmeds() {
      try{
        //お薬の情報を取得するapi
        const headers = {'Authorization' : 'mtiToken'};
        const userId = 'takashima';
        
        const res = await axios.get(baseUrl + `/app-medicines?userId=` + userId,  { headers });
        this.meds = res.data.userMeds;
        console.log(this.meds);
      }catch(e) {
        //エラー処理
        console.log(this.e);
      }
    }, 
    
    async deletemed(med) {
      const userId = 'takashima';
      const medName = med.medName;
      const data = {
        userId,
        medName
      };
      try {
        //お薬の情報を削除するapi
        const res = await axios.delete(baseUrl + '/app-medicine', { data, headers });
        console.log(res);
        
        //お薬の情報を削除すると一覧に飛ぶ
        if (res) {
          this.$router.push({name: "MedicalEdit"});
        }
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
  
  .addbtn {
    text-align : center;
  }
</style>