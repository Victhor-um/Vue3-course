<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app_btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </MyDialog>
    <post-list
      v-if="!isPostLoading"
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <div v-else>Идёт загрузка...</div>
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
        <div
          v-for="pageNumber in totalPages"
          key="pageNumber"
          class="page"
          :class="{ 'current-page': pageNumber === page }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div> 
      </div>-->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MySelect from '@/components/UI/MySelect.vue';
import axios from 'axios';
import MyInput from '@/components/UI/MyInput.vue';

export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
    };
  },
  methods: {
    createPost(post) {
      console.log('appvue');
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      console.log('removePost');
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              __limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = response.data;
        console.log('🚀 ~ file: App.vue:67 ~ fetchUsers ~ response', response);
      } catch (error) {
        alert('Error');
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              __limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
        console.log('🚀 ~ file: App.vue:67 ~ fetchUsers ~ response', response);
      } catch (error) {
        alert('Error');
      } finally {
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      );
    },
  },
  mounted() {
    this.fetchPosts();
    this.$refs.observer;
    let options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  watch: {
    /*     page() {
        this.fetchPosts();
      }, */
  },
};
</script>

<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15;
}
.page {
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: teal;
}
</style>
