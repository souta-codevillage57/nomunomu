<template>
    <div class="ui secondary pointing green inverted massive menu">
        <h2 class="title">    のむのむ</h2>
        <div class="right menu" v-if="isLogin">
            <router-link active-class="active" class="item" exact to="/UserSet">登録情報変更</router-link>
            <a @click="logout" class="item">Logout</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    data() {
        if(window.localStorage.getItem('token') == 'mtiToken'){
            return { isLogin: true }
        }else{
            return { isLogin: false }
        }
    },
    methods: {
        logout() {
            window.localStorage.clear();
            this.isLogin = !this.isLogin;
            console.log(this.isLogin);
            this.$router.push({name: "Login"});
            return;
        },
        loginStatus() {
            if(window.localStorage.getItem('token') == 'mtiToken'){
                return { isLogin: true }
            }else{
                return { isLogin: false }
            }
        }
    },
};
</script>
<style scoped>
    .title {
        color: #ffffff;
        font-weight: bold;
        padding:15px 15px 5px 5px;
    }
</style>