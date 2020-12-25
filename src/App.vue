<template>
  <div class="nav">
    <router-link class="router-link" to="/">Flow</router-link>
    <router-link class="router-link" to="/blocks">Blocks</router-link>
  </div>
  <div class="view">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: black;
  color: #96c2e0;
}

#app{
  height: 100vh;
  display: grid;
  grid-template-areas: "nav" "view";
  grid-template-rows: max-content 1fr;
}

.view {
  grid-area: view;
}

.nav {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  grid-area: nav;

  :first-child {
    border-radius: 8px 0 0 8px;
  }

  :last-child {
    border-radius: 0 8px 8px 0;
  }
}

.router-link {
  color: black;
  background-color: #42b983;
  padding: 0.4rem;
  margin: 0.2rem;
  text-decoration: none;

  &.router-link-exact-active {
    color: gray;
  }
}

* {
  padding: 0;
  margin: 0;
}
</style>
