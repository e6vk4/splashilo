<template>
  <div class="container">
    <div class="search">
      <div class="search__container">
        <IconSearch class="search__container-icon" />
        <input
          type="text"
          name=""
          placeholder="Search for photo"
          class="search__container-input"
        />
      </div>
      <div class="search__results">
        <div class="search__results-item variant__two"></div>
        <div class="search__results-item variant__one"></div>
        <div class="search__results-item variant__three"></div>
        <div class="search__results-item variant__two"></div>
        <div class="search__results-item variant__one"></div>
        <div class="search__results-item variant__three"></div>
      </div>
    </div>
  </div>
</template>

<script>
import IconSearch from '@/components/icons/IconSearch'

export default {
  components: {
    IconSearch,
  },
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  // min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.search {
  background-color: $navy-3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 5rem;
  width: 50%;
  border-radius: 0.1rem;
  position: relative;
  max-width: 1140px;

  &__container {
    width: 100%;
    position: relative;

    &-icon {
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
    column-gap: 30px;
    padding: 0 9rem;

    @media only screen and (min-width: 992px) {
      column-count: 3;
    }

    &-item {
      margin: 0 0 30px;
      display: inline-block;
      width: 100%;
      border-radius: 0.3rem;

      &.variant__one {
        height: 250px;
        background-color: $gray-2;
      }

      &.variant__two {
        height: 225px;
        background-color: $gray-2;
      }

      &.variant__three {
        height: 300px;
        background-color: $gray-2;
      }
    }
  }
}
</style>
