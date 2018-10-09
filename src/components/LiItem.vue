<template>
  <li v-on:click="$emit('handleToLoad')" >{{ elem.name }}</li>
</template>

<script>
export default {
  name: 'liItem',
  props: ['elem']
}
</script>

<style scoped lang="less">

</style>