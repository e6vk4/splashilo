<template>
  <div class="container">
    <Modal
      :showing="showModal"
      :photo="selectedPhoto"
      @modal-close="showModal = false"
    />
    <Alert :show="alert.type" :type="alert.type" :message="alert.message" />
    <div class="search">
      <div v-if="isLoadingPhotos && !isOnMount" class="search__label">
        <Button class="search__label-icon" @click.native="back">
          <IconBack class="search__label-icon-back" />
        </Button>
        Searching for <span> "{{ query }}" </span>
      </div>

      <div v-else-if="!isLoadingPhotos && searchedPhotos" class="search__label">
        <Button class="search__label-icon" @click.native="back">
          <IconBack class="search__label-icon-back" />
        </Button>
        Search results for <span> "{{ query }}" </span>
      </div>
      <div v-else class="search__container">
        <IconSearch class="search__container-icon-search" />
        <form @submit.prevent="search()">
          <input
            v-model="query"
            type="text"
            placeholder="Search for photo"
            class="search__container-input"
          />
        </form>
      </div>
      <div ref="searchRes" class="search__results">
        <div
          v-for="i in 8"
          :key="i + 'A'"
          :class="
            isLoadingPhotos && !infiniteScroll
              ? 'search__results-item'
              : 'hidden'
          "
          :style="{
            'grid-row-end': `span ${
              Math.floor(Math.random() * (10 - 5 + 1)) + 5
            }`,
          }"
        >
          <Skeleton class="search__results-item-skeleton" />
        </div>
        <div
          v-for="(photo, index) in photos"
          :key="index + 'B'"
          :style="{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.85)), url(${photo.urls.regular})`,
            'grid-row-end': `span ${photo.flowNum}`,
          }"
          class="search__results-item"
          @click="openModal(photo)"
        >
          <div class="search__results-item-meta">
            <div>{{ photo.user.first_name }} {{ photo.user.last_name }}</div>
            <div>{{ photo.user.location }}</div>
          </div>
        </div>
        <div
          v-for="i in 3"
          :key="i + 'C'"
          :class="
            isLoadingPhotos && infiniteScroll
              ? 'search__results-item'
              : 'hidden'
          "
          :style="{
            'grid-row-end': `span ${
              Math.floor(Math.random() * (10 - 5 + 1)) + 5
            }`,
          }"
        >
          <Skeleton class="search__results-item-skeleton" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconSearch from '@/components/icons/IconSearch'
import IconBack from '@/components/icons/IconBack'
import Skeleton from '@/components/elements/Skeleton'
import Button from '@/components/elements/Button'
import Modal from '@/components/app/Modal'
import Alert from '@/components/app/Alert'

export default {
  components: {
    IconSearch,
    IconBack,
    Skeleton,
    Button,
    Modal,
    Alert,
  },
  data() {
    return {
      query: '',
      searchedPhotos: false,
      selectedPhoto: {},
      showModal: false,
      isOnMount: false,
      page: 1,
      newPage: 2,
      infiniteScroll: false,
      infiniteScrollSearched: false,
    }
  },
  computed: {
    photos() {
      return this.$store.getters.getPhotos
    },
    isLoadingPhotos() {
      return this.$store.getters.getLoadingState
    },
    alert() {
      return this.$store.getters.getAlert
    },
  },
  mounted() {
    this.isOnMount = true
    this.search('African')
    this.infiniteScrollLoader()
  },
  methods: {
    infiniteScrollLoader() {
      const vm = this
      this.$nextTick(() => {
        window.addEventListener('scroll', function () {
          setTimeout(() => {
            vm.infiniteScrollSearched = false
          }, 2000)

          if (vm.infiniteScrollSearched) return
          if (
            window.innerHeight + window.scrollY >=
            vm.$refs.searchRes.offsetHeight
          ) {
            if (vm.alert.type === 'error') return
            if (vm.newPage - vm.page === 1) {
              vm.page = vm.page + 1
              vm.newPage = vm.page + 1 - 1

              vm.infiniteScroll = true
              infiniteScrollSearch()
            }
            vm.newPage = vm.newPage + 1
          }
        })
      })
      const infiniteScrollSearch = async () => {
        await this.$store.dispatch('getPhotosFromAPI', {
          query: this.query || 'African',
          page: this.newPage,
          isNewQuery: false,
        })
        this.infiniteScrollSearched = true
      }
    },
    async search(query = '') {
      if (this.alert.type === 'error') return
      if (!(this.query || query)) return
      if (this.query) this.isOnMount = false

      this.isOnMount
        ? (this.searchedPhotos = false)
        : (this.searchedPhotos = true)

      await this.$store.commit('setAlert', {
        type: '',
        message: '',
      })

      await this.$store.commit('setPhotos', {
        photos: [],
        isNewQuery: true,
      })

      this.page = 1
      this.newPage = 2
      this.infiniteScroll = false

      await this.$store.dispatch('getPhotosFromAPI', {
        query: query || this.query,
        page: this.page,
        isNewQuery: true,
      })
    },
    openModal(photo) {
      this.selectedPhoto = photo
      this.showModal = true
    },
    async back() {
      await this.$store.commit('setPhotos', {
        photos: [],
        isNewQuery: true,
      })
      this.page = 1
      this.newPage = 2
      this.query = ''
      this.searchedPhotos = false
      this.isOnMount = true
      this.search('African')
    },
  },
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.search {
  background-color: $navy-3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  width: 100%;
  margin: 0;
  border-radius: 0 0 0.15rem 0.15rem;
  position: relative;
  max-width: 900px;

  @include respond-to('md') {
    padding: 4rem 5rem;
  }

  &__label {
    font-size: 1.5rem;
    padding: 0.2rem 1rem;
    color: $navy;
    letter-spacing: -2px;
    word-spacing: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-flow: wrap;
    font-weight: 500;

    @include respond-to('sm') {
      font-size: 2rem;
      padding: 0.2rem 4rem;
    }

    &-icon {
      position: absolute;
      left: 45%;
      top: -2.5rem;

      @include respond-to('sm') {
        left: 1.4rem;
        top: 0.8rem;
      }

      &-back {
        width: 1.7rem;
        height: 1.7rem;
        fill: $navy;
        transition: transform 0.3s ease-in-out;

        &:hover {
          transform: scale(2);
          transition: transform 0.3s ease-in-out;
        }
      }
    }

    & span {
      margin-left: 1rem;
      color: $navy-2;
    }
  }

  &__container {
    width: 100%;
    position: relative;

    &-icon-search {
      width: 1.2rem;
      height: 1.2rem;
      position: absolute;
      left: 1.4rem;
      top: 0.8rem;
      fill: $navy;
    }

    &-input {
      padding: 1rem 4rem;
      width: 100%;
      border: 0;
      border-radius: 0.2rem;
      color: $navy;

      &:focus-within {
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.025);
      }

      &:focus {
        outline: none;
      }
    }
  }

  &__results {
    margin-top: 4rem;
    position: absolute;
    top: 5rem;
    width: 100%;
    max-width: 41.875rem;
    padding: 0 2rem 2rem 2rem;
    display: grid;
    grid-row-gap: 1.875rem;
    grid-auto-rows: 1.875rem;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    column-gap: 1.875rem;

    @include respond-to('md') {
      grid-template-columns: repeat(auto-fit, minmax(10.625rem, 1fr));
    }

    &-item {
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
      position: relative;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: $gray-2;
      transition: all 0.5s;

      &:hover {
        cursor: zoom-in;
      }

      &-skeleton {
        position: absolute;
        bottom: 0;
      }

      &-meta {
        text-align: left;
        margin: 1rem 1rem;
        position: absolute;
        bottom: 0;
        color: white;
        transition: all 0.5s ease-in-out;

        & div:nth-child(2) {
          font-size: 0.65rem;
          font-weight: 100;
        }
      }
    }
  }
}
</style>
