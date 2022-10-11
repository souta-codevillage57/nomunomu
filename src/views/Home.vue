<template>
  <div>
    <div class="ui width fulid center aligned grid">
      <div class="row back_ground_img_wrap">
        <div class="back_ground_img">
            <div class="ui medium image char_img_wrap">
              <img v-if="value=='value1'" class="char_img" src="@/assets/img/inu1.png">
              <img v-else-if="value=='value2'" class="char_img" src="@/assets/img/inu2.png">
              <img v-else class="char_img" src="@/assets/img/inu3.png">
            </div>
        </div>
      </div>
      
      <div class="row" style="height:160px; width:80%;">
        <div class="column ten wide left">
          
       <form class="ui form">
         
         <div class="field" style="display:flex;">
          <div class="ui checkbox">
           <input type="checkbox">
           <label>薬1</label>
          </div>
      </div>
    </div>
    
    <div class="row" style="height:160px; width:80%;">
      <div class="column ten wide left">
        
     <form class="ui form">
       
       <div class="field" style="display:flex;">
        <div class="ui checkbox">
         <input type="checkbox">
         <label>{{med.medName}}</label>
        </div>
        <div style="margin-left:30px">{{med.medQuantity}} 錠</div>
        <div style="margin-left:30px">{{med.oncemedfirsttime}} から {{med.oncemedlasttime}} まで</div>
       </div>
       
     </form>

      </div>
      
      <div class="column five wide right">
        <div class="ui button">服をあげる</div>
      </div>
    </div>
  
    <div class="row">
      <div v-on:click="MedicalEditHandler" class="ui center button" type="submit">お薬編集</div>
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

// const headers = {'Authorization' : 'mtiToken'};

export default {
  name: 'Home',
  components: {
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      value: "value3",
      med:{
        medName: "葛根湯",
        oncemedfirsttime: "12:30",
        userId: "takashima",
        oncemedlasttime: "14:00",
        medQuantity: 3,
        medNum: 1
      }
    };
  },
  
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  //現在時刻が薬の服用時間に当てはまっているかの関数
  },
  
  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する

      // headerを指定する
      const headers = {'Authorization' : 'mtiToken'};
  
      try{
        const res = await axios.get(baseUrl + '/app-medicine',  { headers });
        // 成功時の処理
        console.log(res.data)
        // this.med.medName =res.data.medName;
        // this.med.oncemedfirsttime =res.data.oncemedfirsttime;
        // this.med.userId =res.data.userId;
        // this.med.oncemedlasttime =res.data.oncemedlasttime;
        // this.med.medQuantity =res.data.medQuantity;
        // this.med.medNum =res.data.medNum;
        
      }catch(e) {
        // エラー時の処理
        console.log("error")
      }
    
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
<<<<<<< HEAD
    MedicalEditHandler(){
      this.$router.push('/medicaledit')
    },
    
  }
=======
    medEdit(){
      this.$router.push({name: 'MedicalEdit'});
    },
  },
>>>>>>> feature/frontend
  

}
  
</script>

<style scoped>

.back_ground_img_wrap{
  width:100vw;
  height:400px;
}

.back_ground_img{
  position: relative;
  background-image:url(@/assets/img/washitsu.png);
  background-size:cover; 
  background-position: center;
  background-repeat:no-repeat;
  height:100%;
  width:100%;
}

.char_img_wrap{
  position:absolute;
  top: 50%;
  left: 50%;
  margin: auto;
}


.char_img{
  transform: translate(-50%,-50%);
}


.button{
  background-color:#0A7B83;
  color:white;
}

.left{
  border:solid gray 1px;
  border-radius:8px;
  box-shadow: 10px 5px 5px gray;
  padding:10px;
}


.header_container{
  background-color:#0A7B83;
  color:white;
}

.medicine_label{
  text-align:center;
}

</style>