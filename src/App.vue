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
  background-color: #1F1B24;
  color: #ffffff;
}

#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: "nav" "view";
  grid-template-rows: max-content 1fr;
  position: relative;
}

.black {
  background-color: #1F1B24;
  color: #ffffff;
}

.red {
  background-color: #78002e;
}

.blue {
  background-color: #0d47a1;
}

.pink {
  background-color: #9C528B;
}

.white {
  background-color: #FFFDF7;
}

.yellow {
  background-color: #ffb300;
  color: black;
}

.title {
  margin-bottom: 1rem;
}


.view {
  grid-area: view;
  scroll-behavior: auto;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  bottom: 0;
}


.taskbar {
  display: flex;
  width: 100vw;
  z-index: 10;
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
  box-sizing: border-box;
}
</style>
