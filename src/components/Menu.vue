<template>
    <div class="ui secondary pointing green inverted massive menu" v-if="isLogin">
        <router-link active-class="active" class="item" exact to="/">Home</router-link>
        <router-link active-class="active" class="item" exact to="/User">User</router-link>
        <router-link active-class="active" class="item" exact to="/Profile">Profile</router-link>
        <div class="right menu">
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

</style>