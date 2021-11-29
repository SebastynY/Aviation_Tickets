<template>
  <div class="filter">
    <div class="filter__title">Количество пересадок</div>
    <div class="filter__box">
      <div class="filter__box-item">
        <input type="checkbox" value="all" v-model="filter" />
        <div class="widget__box-item-desc">Всe</div>
      </div>
      <div class="filter__box-item">
        <input type="checkbox" value="0" v-model="filter" />
        <div class="widget__box-item-desc">Без пересадок</div>
      </div>
      <div class="filter__box-item">
        <input type="checkbox" value="1" v-model="filter"/>
        <div class="widget__box-item-desc">1 пересадка</div>
      </div>
      <div class="filter__box-item">
        <input type="checkbox" value="2" v-model="filter" />
        <div class="widget__box-item-desc">2 пересадки</div>
      </div>
      <div class="filter__box-item">
        <input type="checkbox" value="3" v-model="filter" />
        <div class="widget__box-item-desc">3 пересадки</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheFilter",
  data () {
    return {
      filter: []
    }
  }
};
</script>

<style lang="scss">

@import "../styles/_variables.scss";

.filter {
  width: 232px;
  height: 252px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;

  &__title {
    display: flex;
    font-family: $font;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: $color;
    justify-content: center;
  }
  &__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 0 10px 0;
    margin-top: 9px;
    &-item {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 0;
      transition: 0.4s;

      &:hover {
        cursor: pointer;
        background: #f1fcff;
      }
      &-desc {
        display: flex;
        font-family: $font;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
        align-items: center;
        color: $color;
      }
      input[type="checkbox"] {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        cursor: pointer;
        font-size: 17px;
        visibility: hidden;
      }
      input[type="checkbox"]:after {
        content: "";
        background-color: #ffffff;
        display: inline-block;
        align-items: center;
        color: #00bff0;
        width: 20px;
        height: 20px;
        visibility: visible;
        border: 1px solid $check;
        box-sizing: border-box;
        border-radius: 2px;
      }
      input[type="checkbox"]:checked:after {
        display: flex;
        border: 1px solid $checkActive;
        justify-content: center;
        content: "\2714";
        padding: -12px;
      }
    }
  }
}
</style>
