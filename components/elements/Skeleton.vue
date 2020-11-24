<template>
  <div class="component">
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  </div>
</template>

<style lang="scss" scoped>
.component {
  width: 100%;
  margin: 1rem 1rem;
}

.skeleton {
  border-color: $gray;
  background: $gray;
  animation: 0.8s linear infinite alternate animation-fadeInfadeOut;
  border-radius: 0.2rem;
  opacity: 1;
  box-shadow: none;
  background-clip: padding-box;
  cursor: default;
  color: transparent;
  pointer-events: none;
  user-select: none;
  height: 0.6rem;
  width: 5rem;

  &:nth-child(2) {
    margin-top: 0.3rem;
    width: 2rem;
  }
}

@keyframes animation-fadeInfadeOut {
  0% {
    border-color: $navy-3;
    background: $navy-3;
  }
  100% {
    border-color: $gray;
    background: $gray;
  }
}
</style>
