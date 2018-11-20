<template>
  <div id="app">
    <MenuComponent/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MenuComponent from "@/components/MenuComponent";

export default {
  name: 'app',
  components: {
      MenuComponent,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'b koodak';
  margin-top: 50px;
}
</style>
