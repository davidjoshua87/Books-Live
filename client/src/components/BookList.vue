<template>
<div class="main-page">
  <HeaderNav :title="title" :description="description"></HeaderNav>

  <div class="container sidenav col-md-9">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="article" v-for="(book,i) in books" :key='i'>
          <div class="post-preview">
            <router-link :to="{ name: 'bookMain', params: { id: book._id }}">
              <h2 class="post-title">
                {{book.title}}
              </h2>
              <img class="img-fit" alt="image not found" v-bind:src="book.imageUrl">
              <h2 class="post-title">
                {{book.penerbit}}
              </h2>
            </router-link>
            <p class="post-meta">Author by
              <a>{{book.author.name}}</a> on {{stringDate(book.createdAt)}}</p>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#">&larr; Older</a>
    </li>
    <li class="page-item disabled">
      <a class="page-link" href="#">Newer &rarr;</a>
    </li>
  </ul>
</div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import {
  mapState
} from 'vuex'
import HeaderNav from '@/components/HeaderNav'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'BookList',
  components: {
    HeaderNav,
    Sidebar
  },
  data () {
    return {
      title: 'BloG"z',
      description: 'A blog"s without articles is like a body without a soul.'
    }
  },
  computed: {
    ...mapState([
      'books'
    ])
  },
  methods: {
    fetchBookData: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/books'
      }).then(data => {
        this.books = data.data.data.map(val => val)
      }).catch(err => {
        console.log(err)
      })
    },
    stringDate: function (date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>

<style scoped>

.post-preview>a {
  color: #5da6bd;
}

.post-preview>a:focus,
.post-preview>a:hover {
  text-decoration: none;
  color: #0085A1;
}

.post-preview>a>.post-title {
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.post-preview>a>.post-subtitle {
  font-weight: 300;
  margin: 0 0 10px;
}

.post-preview>.post-meta {
  font-size: 16px;
  font-style: italic;
  margin-top: 0;
  color: #868e96;
}

.post-preview>.post-meta>a {
  text-decoration: none;
  color: #fa9b4d;
}

@media only screen and (min-width: 768px) {
  .post-preview>a>.post-title {
    font-size: 36px;
  }
}
</style>
