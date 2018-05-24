import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Home from './views/Home'
import SignUp from '@/components/SignUp'
import EditPost from '@/components/EditPost'
import ArticleMain from '@/components/BookMain'
import ArticleList from '@/components/BookList'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/masuk',
    name: 'SignIn',
    component: SignIn
  }, {
    path: '/daftar',
    name: 'Daftar',
    component: SignUp
  }, {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: 'book/:id',
      name: 'BookMain',
      props: true,
      component: ArticleMain
    }, {
      path: 'edit/:id',
      name: 'EditPost',
      component: EditPost
    }, {
      path: '/',
      name: 'BookList',
      component: ArticleList
    }]
  }]
})
