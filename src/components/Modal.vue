<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button @click="close" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['isActive'],
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style>
</style>
