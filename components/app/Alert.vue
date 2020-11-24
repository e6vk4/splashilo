<template>
  <div v-if="type" class="alert" :class="alertTypeClass">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String, // info, error
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    alertTypeClass() {
      return `alert__${this.type}`
    },
  },
}
</script>

<style lang="scss" scoped>
.alert {
  width: auto;
  padding: 1rem 2rem;
  position: absolute;
  top: 8rem;
  z-index: 50;
  color: $white;
  margin: 0 auto;
  border-radius: 0 0 0.2rem 0.2rem;
  font-size: 0.8rem;

  @include respond-to('sm') {
    top: 0;
  }

  &__error {
    background-color: $red;
  }

  &__info {
    background-color: $blue;
  }
}
</style>
