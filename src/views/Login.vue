<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <!-- ここにセグメントの中身を記述する -->
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
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input v-model="user.nickname" type="text" placeholder="Nickname"/>
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input v-model.number="user.age" type="text" placeholder="Age"/>
            </div>
          </div>
          <button class="ui huge green fluid button" type="submit">
            {{ submitText }}
          </button>
        </form>
      </div>
      <button @click="toggleMode()" class="ui huge grey fluid button" type="submit">
        {{ toggleText }}
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
        password: null,
        nickname: null,
        age: null
      }
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    submitText(){
      return this.isLogin ? "ログイン" : "新規登録";
    },
    toggleText(){
      return this.isLogin ? "新規登録" : "ログイン";
    }
  },
  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    this.$router.push({name: "MedicalEdit"});
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    toggleMode(){
      this.isLogin = !this.isLogin;
    },
    
    async submit(){
      if(!this.isLogin){
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
          nickname: this.user.nickname,
          age: this.user.age
        };
      
        try {
          const res = await axios.post(baseUrl + '/user/signup', requestBody);
          console.log('signup');
          console.log(res.data);
        }catch(e){
          console.log('error')
        }
        return;
      }
      
      if(this.isLogin){
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
        };
      
        try {
          const res = await axios.post(baseUrl + '/user/login', requestBody);
          console.log('login');
          
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('userId', this.user.userId);
          this.$router.push({name: 'Login'});
        }catch(e){
          console.log('error')
        }
        return;
      }
    }
  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSはここに記載する */
</style>