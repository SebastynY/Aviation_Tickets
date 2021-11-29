<template>
  <div class="header">
    <img class="header__logo" src="../assets/images/Logo.svg" alt="Logo" />
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;

  &__logo {
    margin: 50px 0 50px 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 100%;
    box-shadow: 0 8px 11px rgba(55, 104, 142, 0.25);
  }
}
</style>
