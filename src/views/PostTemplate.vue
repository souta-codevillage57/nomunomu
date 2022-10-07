<template>
  <div></div>
</template>
<script>
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

export default {
  name: 'Template',
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    async submit() {
      // headerを指定する
      const headers = {'Authorization' : 'mtiToken'};
      // リクエストボディを指定する
      const { userId, password, nickname, age } = this.user;
      const requestBody = {
        userId,
        password,
        nickname,
        age
      };
      
      try {
        const res = await axios.put(baseUrl + '/user', requestBody, { headers });
        // 成功時の処理
        console.log('updated user information')
        console.log(res.data)
      }catch(e){
        // エラー時の処理
        console.log('error')
      }
    }
  },
}
</script>
<style scoped>

</style>