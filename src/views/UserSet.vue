<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <!-- ここにセグメントの中身を記述する -->
        <h3>登録情報変更</h3>
        <form @submit.prevent="submit" class="ui large form">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="user.userId" required disabled type="text" placeholder="ID"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="user.password" type="text" placeholder="Password"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input v-model="user.nickName" type="text" placeholder='Nickname'/>
            </div>
          </div>
          <div class="grouped fields">   
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
          <button class="ui huge green fluid button" type="submit">
            変更
          </button>
          <p></p>
          <button @click="returnHome" class="ui huge green fluid button" type="submit">
            変更せずに戻る
          </button>
        </form>
      </div>
      <button @click="deleteUser" class="ui huge grey fluid button" type="submit">
        退会
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
  name: 'UserSet',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      user: {
        userId: window.localStorage.getItem('userId'),
        password: null,
        nickName: null,
        charType: null
      },
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
     async submit() {
      // headerを指定する
      const headers = {'Authorization' : 'mtiToken'};
      // リクエストボディを指定する
      const { userId, password, nickName, charType } = this.user;
      const requestBody = {
        userId,
        password,
        nickName,
        charType
      };
      
      try {
        console.log(requestBody);
        const res = await axios.put(baseUrl + '/app-user', requestBody, { headers });
        // 成功時の処理
        console.log('updated user information');
        console.log(res.data);
        this.$router.push({name: "Home"});
      }catch(e){
        // エラー時の処理
        console.log('error in submit');
      }
    },
    returnHome(){
      this.$router.push({name: "Home"});
    },
    async deleteUser(){
      const headers = {'Authorization' : 'mtiToken'};
      const data = {
        userId: this.user.userId,
      };
      
      try{
        await axios.delete(baseUrl + '/app-user', { data, headers});
        this.$router.push({name: "Login"});
      }catch(e){
        console.log('error');
      }
    }
  },
  
  created: async function(){
    const headers = {'Authorization': 'mtiToken'};
    
    try{
      const res = await axios.get(baseUrl + `/app-user?userId=${this.user.userId}`, { headers });
      
      this.user.nickName = res.data.nickName;
      this.user.charType = res.data.charType;
    }catch(e){
      console.log('error in get');
    }
  }
};
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSはここに記載する */
</style>