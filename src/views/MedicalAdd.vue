<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <!--h2 class="ui dividing header">お薬追加</h2-->
      
      <div class="ui segment">
        <!-- ここにセグメントの中身を記述する -->
        <form @submit.prevent="submit" class="ui large form">
          
          <div class="field">
            <div class="ui left input">
              <div class="text">
                薬の名前は何？
              </div>
              <input v-model="med.medName" required type="text" placeholder="薬の名前"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left input">
              <div class="text">
                何錠飲むの？
              </div>
              <input v-model="med.medQuantity" required type="number" placeholder="何錠"/>
            </div>
          </div>
          <div class="field">
            <div class="ui left input">
              <div class="text">
                1日に何回飲むの？
              </div>
              <select v-model="selectedItem">
                <option v-for="item in selectItems" :value="item.id" :key="item.id">
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>
          
          <div v-if="isOnce" class="field timetext right">
            <div class="ui left input">
              <input v-model="medtime.oncemedfirsttime" required type="number" placeholder="時間を入力してね"/>
              時から
              <input v-model="medtime.oncemedlasttime" required type="number" placeholder="時間を入力してね"/>
              時の間
            </div>
          </div>
          
          <div v-if="isTwice" class="field">
            <div class="ui left input">
              <input v-model="medtime.oncemedfirsttime" required type="number" placeholder="時間を入力してね"/>
              時から
              <input v-model="medtime.oncemedlasttime" required type="number" placeholder="時間を入力してね"/>
              時の間
            </div>
            <div class="ui left input">
              <input v-model="medtime.twicemedfirsttime" required type="number" placeholder="時間を入力してね"/>
              時から
              <input v-model="medtime.twicemedlasttime" required type="number" placeholder="時間を入力してね"/>
              時の間
            </div>
          </div>
          
          <div v-if="isThirce" class="field">
            <div class="ui left input">
              <input v-model="medtime.oncemedfirsttime" required type="number" placeholder="時間を入力してね"/>
              時から
              <input v-model="medtime.oncemedlasttime" required type="number" placeholder="時間を入力してね"/>
              時の間
            </div>
            <div class="ui left input">
              <input v-model="medtime.twicemedfirsttime" required type="number" placeholder="時間を入力してね"/>
              時から
              <input v-model="medtime.twicemedlasttime" required type="number" placeholder="時間を入力してね"/>
              時の間
            </div>
            <div class="ui left input">
              <input v-model="medtime.thircemedfirsttime" required type="number" placeholder="時間を入力してね"/>
              時から
              <input v-model="medtime.thircemedlasttime" required type="number" placeholder="時間を入力してね"/>
              時の間
            </div>
          </div>
          
          <button class="ui huge green fluid button" type="submit" @click="submit()">
            登録
          </button>
          
          <button class="ui right floated grey mini button" @click="mededit()">
            一覧に戻る
          </button>
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
  name: 'MedicalAdd',
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      // userId: window.localStrage.getItem('userId'),
      userId: window.localStorage.getItem('userId'),
      med: {
        medName: null,
        medQuantity: null,
      },
      medtime: {
        oncemedfirsttime: null,
        oncemedlasttime: null,
        twicemedfirsttime: null,
        twicemedlasttime: null,
        thircemedfirsttime: null,
        thircemedlasttime: null,
      },
      selectItems: [
        { id: 1, label: "1回" },
        { id: 2, label: "2回" },
        { id: 3, label: "3回" },
      ],
      selectedItem: 1,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    isOnce() {
      return this.selectedItem === 1;
    },
    isTwice() {
      return this.selectedItem === 2;
    },
    isThirce() {
      return this.selectedItem === 3;
    },
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
     async submit() {
      // headerを指定する
      const headers = {'Authorization' : 'mtiToken'};
      // リクエストボディを指定する
      const userId = this.userId;
      const { medName, medQuantity } = this.med;
      const medNum = this.selectedItem;
      const { oncemedfirsttime, oncemedlasttime, twicemedfirsttime, twicemedlasttime, thircemedfirsttime, thircemedlasttime } = this.medtime;
      const requestBody = {
        userId,
        medName,
        medQuantity,
        medNum,
        oncemedfirsttime,
        oncemedlasttime,
        twicemedfirsttime,
        twicemedlasttime,
        thircemedfirsttime,
        thircemedlasttime
      };
      
      try {
        console.log(requestBody);
        const res = await axios.post(baseUrl + '/app-medicine', requestBody, { headers });
        // 成功時の処理
        console.log('register med information');
        console.log(res.data);
        
        //お薬の情報を登録すると一覧に飛ぶ
        if (res) {
          this.$router.push({name: "MedicalEdit"});
        }
      }catch(e){
        // エラー時の処理
        console.log('error in submit');
      }
    },
    
    async mededit() {
      this.$router.push({name: "MedicalEdit"});
    }, //お薬追加ページに飛ぶ
  },
  
  // created: async function(){
  //   const headers = {'Authorization': 'mtiToken'};
    
  //   try{
  //     const res = await axios.get(baseUrl + `/user?userId=${this.user.userId}`, { headers });
      
  //     this.user.nickname = res.data.nickname;
  //     this.user.age = res.data.age;
  //   }catch(e){
  //     console.log('error in get')
  //   }
  // }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSはここに記載する */
.text {
  width : 300px;
}

.timetext {
  width : 600px;
}
</style>