<template>
  <div id="app">
    <!--<Menu v-if="isLogin" key='login'></Menu>-->
    <!--<Menu v-else key='logout'></Menu>-->
    <router-view/>
  </div>
</template>
<script>
// import Menu from '@/components/Menu.vue'

export default {
  name: 'App',
  data() {
            if(window.localStorage.getItem('token') == 'mtiToken'){
                return { isLogin: true }
            }else{
                return { isLogin: false }
            }
  },
  components: {
    // Menu,
  },
  methods: {
  },
  created: async function() {
    if( !this.isLogin ){
      this.$router.push({name: "Login"})
    }
  }
}
</script>
