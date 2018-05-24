 <template>
<div class="main-page">
  <article>
    <HeaderNav :title="titleBook" :description="descriptionBy"></HeaderNav>
    <div class="container">
      <div class="row">
        <div class="offset-md-1 col-md-8">
          <p>
            {{descriptionBook}}
          </p>
        </div>
      </div>
    </div>
  </article>
  <div>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" @click="showModal=false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 class="modal-title">Ulasan</h4>
                </div>
                <div class="modal-body">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="scrolling-wrapper ">
                        <p class="comment-user">Ulasans:</p>
                        <hr />
                        <div>
                          <div class="comment-user" v-for="(ulasan,i) in bookUlasan" :key="i">
                            <p>Comment: {{ comment.comments }}</p>
                            <p> {{ descriptionBy }}</p>
                            <hr>
                          </div>
                        </div>
                      </div>
                      <div class="comment-user">
                        <textarea rows="4" cols="55" v-model="newulasan"></textarea>
                        <button class="btn btn-success" @click="addComment">Add Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="three-inline-buttons">
      <a id="show-modal" @click="showModal = true" type="button" name="button" class="btn offset-md-6 col-md-9" data-toggle="modal" data-target="#modalEdit">Comment</a>
      <a v-if="bookAutId === user.id" @click="deteleArticle" type="button" name="button" class="btn offset-md-9 col-md-9">Delete Post</a><br />
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {
  mapState
} from 'vuex'

import HeaderNav from '@/components/HeaderNav'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      showModal: false,
      showModalEdit: false,
      book: null,
      titleBook: '',
      descriptionBook: '',
      descriptionBy: '',
      bookAutId: '',
      bookUlasan: '',
      newUlasan: ''
    }
  },
  props: ['id'],
  components: {
    Sidebar,
    HeaderNav
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    fetchBookdata: function () {
      axios({
        method: 'get',
        url: `http://localhost:3000/api/books/${this.id}`
      }).then(data => {
        this.book = data.data.data
        this.titleBook = this.book.title
        this.descriptionBook = this.book.description
        this.bookUlasan = this.book.comments
        this.descriptionBy = `by ${this.book.author.name}`
        this.bookAutId = this.book.author._id
      }).catch(err => {
        console.log(err)
      })
    },
    stringDate: function (date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    addUlasan: function () {
      axios.put(`http://35.198.236.79/books/${this.id}`, {
        id: this.id,
        comments: this.newComment
      }).then(data => {
        console.log(data, '====addComment......')
        this.$store.dispatch('getArticles')
        swal(
          'Good job!',
          'Success add comment!',
          'success'
        )
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
      })
    },
    deteleBook: function () {
      axios({
        method: 'delete',
        url: `http://35.198.236.79/books/${this.id}`
      }).then(data => {
        console.log(data, '====delete.......')
        this.$store.dispatch('getArticles')
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.fetchBookdata()
  },
  watch: {
    id: function () {
      this.fetchBookdata()
    }
  }
}
</script>

<style scoped>
.three-inline-buttons .btn {
  text-decoration: underline;
  text-align: center;
  margin-left: 30px;
  margin-right: 15px;
  padding: 0px 35px;
}

.three-inline-buttons {
  display: table;
  margin-bottom: 50px;
  margin-top: 20px;
  margin-left: 350px;

}

@media only screen and (max-width: 960px) {
  .three-inline-buttons .button {
    width: 100%;
    margin: 20px;
    text-align: center;
  }
}

p {
  text-align: justify;
  margin: 0 auto;
  padding: 0px;
  font-size: 15px;
}

.scrolling-wrapper {
  overflow: auto;
  height: 130px;

}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
