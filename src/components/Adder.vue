<template>
  <div class="adder">
    <div>+</div>
  </div>
</template>

<script>
export default {
  name: "Adder"
}
</script>

<style lang="scss" scoped>

.adder {
  display: inline-block;

  div {
    background: white;
    color: black;
    text-align: center;
    display: inline-block;
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      font-size: 2.1rem;
      background-color: grey;
    }
  }
}



</style>
