import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import User from '../views/User.vue'
import UserReg from '../views/UserReg.vue'
import UserSet from '../views/UserSet.vue'
import MedicalEdit from '../views/MedicalEdit.vue'
import MedicalAdd from '../views/MedicalAdd.vue'
import MedicalUpdate from '../views/MedicalUpdate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/userreg',
    name: 'UserReg',
    component: UserReg
  },
  {
    path: '/userset',
    name: 'UserSet',
    component: UserSet
  },
  {
    path: '/medicaledit',
    name: 'MedicalEdit',
    component: MedicalEdit
  },
  {
    path: '/medicaladd',
    name: 'MedicalAdd',
    component: MedicalAdd
  },
  {
    path: '/medicalupdate',
    name: 'MedicalUpdate',
    component: MedicalUpdate
  }
]

const router = new VueRouter({
  routes
})

export default router
