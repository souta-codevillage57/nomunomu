<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <!-- ここにセグメントの中身を記述する -->
        <h3>新規登録</h3>
        <div class="graph" v-if="isPage1">
          <span class="bar" style="width: 50%;"></span>
        </div>
        <div class="graph" v-if="!isPage1">
          <span class="bar" style="width: 100%;"></span>
        </div>
        <p></p>
        <form @submit.prevent="submit" class="ui large form">
          <div class="field" v-if="isPage1">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="user.userId" type="text" placeholder="ID"/>
            </div>
          </div>
          <div class="field" v-if="isPage1">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="user.password" type="password" placeholder="Password"/>
            </div>
          </div>
          <div class="field" v-if="isPage1">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input v-model="user.nickName" type="text" placeholder="Nickname"/>
            </div>
          </div>
          <div class="grouped fields" v-if="!isPage1">   
            <label>どのキャラクターを育てたいですか?</label>
            <div class="field">
              <div class="ui radio checkbox">
                <input v-model="user.charType" type="radio" placeholder="Chartype" value="犬" checked="checked">
                <label>犬</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input v-model="user.charType" type="radio" placeholder="Chartype" value="猫">
                <label>猫</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input v-model="user.charType" type="radio" placeholder="Chartype" value="盆栽">
                <label>盆栽</label>
              </div>
            </div>
          </div>
          <div>
            <button  v-if="!isPage1" @click="lastPage()" class="ui green button" type="submit">
              前へ
            </button>
            <button class="ui green button" type="submit">
              {{ nextText }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

export default {
  name: 'UserReg',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      isPage1: true,
      user: {
        userId: null,
        password: null,
        nickName: null,
        charType: null
      }
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    nextText(){
      return this.isPage1 ? "次へ" : "完了";
    }
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    lastPage(){
      this.isPage1 = !this.isPage1;
    },
    
    async submit(){
      if(!this.isPage1){
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
          nickName: this.user.nickName,
          charType: this.user.charType
        };
      
        try {
          const res = await axios.post(baseUrl + '/app-user', requestBody);
          console.log('signup');
          console.log(res.data);
          this.$router.push({name: 'Login'});
        }catch(e){
          console.log('error')
        }
        return;
      }
      else{
        this.isPage1 = !this.isPage1;
      }
    }
  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSはここに記載する */
.graph {
    position: relative; /* IE is dumb */
    width: 300px;
    border: 1px solid #207870;
    padding: 2px;
}
.graph .bar {
    display: block;
    position: relative;
    background: #409890;
    text-align: center;
    color: #f0ffff;
    height: 2em;
    line-height: 2em;
}
.graph .bar span { position: absolute; left: 1em; }
</style>