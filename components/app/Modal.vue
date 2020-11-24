<template>
  <transition name="fade">
    <div v-if="showing" class="modal" @click.self.prevent="close">
      <div class="modal__container">
        <Button class="modal__container-icon" @click.native.prevent="close">
          <IconClose class="modal__container-icon-close" />
        </Button>
        <div
          class="modal__container-content"
          :style="{ backgroundImage: `url(${photo.urls.full})` }"
        >
          <div class="modal__container-content-meta">
            <div>{{ photo.user.first_name }} {{ photo.user.last_name }}</div>
            <div>{{ photo.user.location }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import IconClose from '@/components/icons/IconClose'
import Button from '@/components/elements/Button'

export default {
  components: {
    IconClose,
    Button,
  },
  props: {
    showing: {
      required: true,
      type: Boolean,
    },
    photo: {
      required: true,
      type: Object,
    },
  },

  transitions: 'fade',

  watch: {
    showing(value) {
      const bodyElement = document.querySelector('body')
      if (value) return bodyElement.classList.add('overflow-hidden')
      return bodyElement.classList.remove('overflow-hidden')
    },
  },

  mounted() {
    const onEscape = (e) => {
      if (!this.showing || e.key !== 'Escape') return
      this.$emit('modal-close')
    }
    document.addEventListener('keydown', onEscape)
    this.$on('hook:destroyed', () => {
      document.removeEventListener('keydown', onEscape)
    })
  },

  methods: {
    close() {
      this.$emit('modal-close')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background-color: rgba(57, 53, 95, 0.42);

  &__container {
    position: relative;
    max-width: 100%;

    &-icon {
      position: absolute;
      z-index: 999;
      top: 1rem;
      right: 1rem;

      @include respond-to('md') {
        top: -3rem;
        right: -3rem;
      }

      &-close {
        width: 1.5rem;
        height: 1.5rem;
        color: $white;
        fill: currentColor;

        @include respond-to('md') {
          color: $gray;
        }
      }
    }

    &-content {
      background-color: $gray;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      overflow: hidden;
      width: 100vw;
      height: 80vh;
      border-radius: unset;

      @include respond-to('md') {
        width: 700px;
        height: 700px;
        border-radius: 0.4rem;
      }

      &-meta {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: $white;
        text-align: left;
        padding: 1.2rem 2rem;
        color: $navy;
        transition: all 0.5s ease-in-out;

        & div:nth-child(2) {
          color: $navy-2;
          font-size: 0.65rem;
          font-weight: 100;
        }
      }
    }
  }
}
</style>
