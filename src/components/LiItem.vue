<template>
  <li v-on:click="$emit('handleToLoad')" >{{ elem.name }}

    <ul class="inner-ul" v-if="(elem.children && elem.children.length > 0)">
      <li is="liItem" class="li" v-for="el in elem.children" v-bind:elem="el" ></li>
      {{!elem.children}}
    </ul> 

  </li>
</template>

<script>
export default {
  name: 'liItem',
  props: ['elem']
}
</script>

<style scoped lang="less">
li {
  list-style-type: none;
}
</style>