<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <!-- ここにセグメントの中身を記述する -->
        <h3>ログイン</h3>
        <form @submit.prevent="submit" class="ui large form">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="user.userId" type="text" placeholder="ID"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="user.password" type="password" placeholder="Password"/>
            </div>
          </div>
          <button class="ui huge green fluid button" type="submit">
            ログイン
          </button>
        </form>
      </div>
      <button @click="toRegister()" class="ui huge grey fluid button" type="submit">
        新規登録はこちら
      </button>
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
  name: 'Login',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      isLogin: true,
      user: {
        userId: null,
        password: null
      }
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    toRegister(){
      this.$router.push({name: 'UserReg'});
    },
    async submit(){
      const requestBody = {
        userId: this.user.userId,
        password: this.user.password,
      };
    
      try {
        const res = await axios.post(baseUrl + '/app-user/login', requestBody);
        console.log('login');
        
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('userId', this.user.userId);
        this.$router.push({name: 'Home'});
      }catch(e){
        console.log('error');
      }
      return;
    }
  }
};
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSはここに記載する */
</style>