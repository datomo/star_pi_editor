<template>
  <div class="taskbar">
    <div class="nav">
      <router-link class="router-link btn" to="/">Flow</router-link>
      <router-link class="router-link btn" to="/blocks">Blocks</router-link>
    </div>
    <div class="spacer"></div>
    <Control/>
  </div>
  <div class="view">
    <router-view/>
  </div>
</template>

<script>
import Control from "@/components/Control";

export default {
  components: {
    Control
  }
}
</script>

<style lang="scss">
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: black;
  color: #96c2e0;
}

#app {
  height: 100vh;
  display: grid;
  grid-template-areas: "nav" "view";
  grid-template-rows: max-content 1fr;
}

.view {
  grid-area: view;
}

.taskbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  grid-area: nav;

  :first-child {
    border-radius: 8px 0 0 8px;
  }

  :last-child {
    border-radius: 0 8px 8px 0;
  }

}
.btn {
  color: black;
  background-color: #42b983;
  padding: 0.4rem;
  margin: 0.2rem;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    color: gray;
  }
}

.router-link-exact-active {
  background-color: grey;
  display: inline-block;
}

.router-link {
  text-decoration: none;
}

* {
  padding: 0;
  margin: 0;
}
</style>
