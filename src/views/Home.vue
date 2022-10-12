<template>
  <div>
    <div class="ui width fulid center aligned grid">
      <div class="row back_ground_img_wrap">
        <div class="back_ground_img">
            <div class="ui medium image char_img_wrap">
              <img v-if="checkCount>='3'" class="char_img" src="@/assets/img/inu3.png">
              <img v-else-if="checkCount<='-1'" class="char_img" src="@/assets/img/inu1.png">
              <img v-else class="char_img" src="@/assets/img/inu2.png">
            </div>
        </div>
      </div>
    
    <div class="row" style="width:80%;">
      <div class="column ten wide left">
       
     <form class="ui form">
       <template v-for="(med, index) in all_meds">
         
        <div v-if="!isOver(med)" class="field" style="display:flex;" :key="index">
          <div class="ui checkbox">
            <input type="checkbox" v-on:change="CheckedFunction" onclick="this.disabled = false;">
            <label>{{med.medName}}</label>
          </div>
          <div style="margin-left:30px">{{med.medQuantity}} 錠</div>
          <div style="margin-left:30px">{{med.start}} 時から {{med.end}} 時まで</div>
        </div>
        
        <div v-if="isOver(med)" class="field" style="display:flex;" :key="index">
          <div class="ui checkbox">
            <input disabled type="checkbox" v-on:change="CheckedFunction" onclick="this.disabled = true;">
            <label>{{med.medName}}</label>
          </div>
          <div style="color:gray; margin-left:30px">{{med.medQuantity}} 錠</div>
          <div style="color:gray; margin-left:30px">{{med.start}} 時から {{med.end}} 時まで</div>
        </div>
        
       </template>
       
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
  
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      checkCount:0,
      outCount:0,
      flag:false,
      all_meds:[],
      meds:[],
      med:{
        medName: null,
        oncemedfirsttime: null,
        twicemedfirsttime: null,
        thircemedfirsttime: null,
        userId: window.localStorage.getItem('userId'),
        oncemedlasttime: null,
        twicemedlasttime: null,
        thircemedlasttime: null,
        medQuantity: null,
        medNum: null,
        start: null,
        end: null
      },
    };
  },
  
  computed: {
  },
  
  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    const nowtime = new Date();
    console.log(nowtime.getHours());

      // headerを指定する
      const headers = {'Authorization' : 'mtiToken'};
  
      try{
        const userId = this.med.userId;
        console.log(userId);
        const res = await axios.get(baseUrl + `/app-medicines?userId=` + userId,  { headers });
        this.meds = res.data.userMeds;
        
        // 成功時の処理
        var medd;
        for (var value of this.meds.values()) {
          if(value.medNum >= 1){
            medd = {
              userId,
              medName: value.medName,
              medQuantity: value.medQuantity,
              medNum: value.medNum,
              start: Number(value.oncemedfirsttime),
              end: Number(value.oncemedlasttime)
            };
            this.all_meds.push(medd);
          }
        }
        for (var value2 of this.meds.values()) {
          if(value2.medNum >= 2){
            medd = {
              userId,
              medName: value2.medName,
              medQuantity: value2.medQuantity,
              medNum: value2.medNum,
              start: Number(value2.twicemedfirsttime),
              end: Number(value2.twicemedlasttime)
            };
            this.all_meds.push(medd);
          }
        }
        for (var value3 of this.meds.values()) {
          if(value3.medNum >= 3){
            medd = {
              userId,
              medName: value3.medName,
              medQuantity: value3.medQuantity,
              medNum: value3.medNum,
              start: Number(value3.thircemedfirsttime),
              end: Number(value3.thircemedlasttime)
            };
            this.all_meds.push(medd);
          }
        }
        
        this.all_meds.sort(function(a,b){
          if(a.start < b.start) return -1;
          else if(a.start > b.start) return 1;
          else if(a.start == b.start){
            if(a.end < b.end) return -1;
            else if(a.end > b.end) return 1;
          }
          return 0;
        });
        //this.all_meds=this.meds
        console.log("all_meds");
        console.log(this.all_meds);
      }catch(e) {
        // エラー時の処理
        console.log("error");
      }
    
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    isOver(med) {
      const now = new Date();
      return (med.end <= now.getHours());
    },
    
    MedicalEditHandler(){
      this.$router.push('/medicaledit');
    },
    CheckedFunction(){
      if(this.checkCount==3){
         this.checkCount=3;
      }else{
      this.checkCount+=1;
      }
      console.log(this.checkCount);
    }
  }
};
  
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
  background-color:white;
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