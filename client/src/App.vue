<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/Header";

  export default {
    name: 'app',
    components: {Header},
    data() {
      return {
        msg: 'Welcome to 1My Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');
  body {
    margin: 0;
    padding: 0;
      font-family: 'Open Sans'
  }

  #app {
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
