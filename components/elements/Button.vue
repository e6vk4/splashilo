<template>
  <button><slot /></button>
</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  border: 0;
  background: transparent;

  &:focus {
    outline: none;
  }
}
</style>
