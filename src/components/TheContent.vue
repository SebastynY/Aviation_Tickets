<template>
  <div class="content">
    <div class="content__tabs">
      <div
        v-bind:class="{ isActive: cheapestActive == true }"
        @click="getCheapest()"
        class="content__tabs__link"
        id="first"
      >
        <div class="content__tabs__link-title">Самый дешёвый</div>
      </div>

      <div
        v-bind:class="{ isActive: fastestActive == true }"
        @click="getFastest()"
        class="content__tabs__link"
        id="second"
      >
        <div class="content__tabs__link-title">Самый быстрый</div>
      </div>

      <!--      <div class="content__tabs__link" id="third">-->
      <!--        <div class="content__tabs__link-title">Самый оптимальный</div>-->
      <!--      </div>-->
    </div>
    <div class="content__tickets">
      <div
        v-for="ticket in tickets.slice(0, 10)"
        :key="ticket.id"
        class="content__tickets__inner"
      >
        <div class="content__tickets__inner__head">
          <div class="content__tickets__inner__head-price">
            <!-- {{ Math.trunc(ticket.price / 1000) }}
            {{ Math.trunc(ticket.price % 1000) }} P -->
            {{ ticket.price.toLocaleString() }}
          </div>
          <img
            v-bind:src="'http://pics.avs.io/110/36/' + ticket.carrier + '.png'"
            class="content__tickets__inner__head-logo"
            alt="logo"
          />
        </div>

        <div
          v-for="segment in ticket.segments"
          :key="segment"
          class="content__tickets__inner__info"
        >
          <div class="content__tickets__inner__info__date">
            <div class="content__tickets__inner__info__date-route">
              {{ segment.origin }} - {{ segment.destination }}
            </div>
            <div class="content__tickets__inner__info__date-period">
              {{ new Date(segment.date).toLocaleTimeString() }}
            </div>
          </div>

          <div class="content__tickets__inner__info__date">
            <div class="content__tickets__inner__info__date-way">В пути</div>
            <div class="content__tickets__inner__info__date-length">
              {{ Math.trunc(segment.duration / 60) }}ч
              {{ segment.duration % 60 }}м
            </div>
          </div>

          <div class="content__tickets__inner__info__date">
            <div
              v-if="transferFilter(segment.stops.length)"
              class="content__tickets__inner__info__date-transfer"
            >
              {{ segment.stops.length }} {{ transfer }}
            </div>
            <div class="content__tickets__inner__info__date__box">
              <div
                v-for="stop in segment.stops"
                :key="stop.id"
                class="content__tickets__inner__info__date__box-stops"
              >
                {{ stop }}
              </div>
            </div>
          </div>
          <button @click="getFiltered()">Нажми</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTickets } from "../API";

export default {
  name: "TheContent",
  data() {
    return {
      tickets: [],
      cheapestActive: false,
      fastestActive: false,
      transfer: "",
      filtered: ["1", "2", ],
    };
  },
  methods: {
    getCheapest() {
      this.tickets.sort((prev, curr) => prev.price - curr.price);
      this.cheapestActive = true;
      this.fastestActive = false;
    },
    getFastest() {
      this.tickets.sort(
        (prev, curr) => prev.segments[0].duration - curr.segments[0].duration
      );
      this.cheapestActive = false;
      this.fastestActive = true;
    },
    transferFilter(length) {
      if (length >= 2) {
        return (this.transfer = "Пересадки");
      } else if (length == 1) {
        return (this.transfer = "Пересадка");
      } else {
        return (this.transfer = "Пересадок");
      }
    },
    getFiltered() {
      this.filtered.forEach((item) => {
        if (item) {
          this.tickets = this.tickets.filter((arr) => {
            return (
              arr.segments[0].stops.length == item ||
              arr.segments[1].stops.length == item
            );
          });
          console.log(item)
        }
      });
      
    },
  },
  computed: {
    // getFiltered() {
    // for(let i = 0; i < this.filtered.length; i++) {
    //   return console.log(this.filtered[i])
    //   if(this.filtered[i]) {
    //     this.tickets = this.tickets.filter(function(item) {
    //       return item.segments[0].stops[0].length == this.filtered[i]
    //     })
    //   }
    // }
    // },
  },
  mounted() {
    getTickets().then((r) => {
      this.tickets = r.tickets;
    });
  },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
@import "../styles/_mixins.scss";

.content {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  &__tabs {
    display: flex;
    height: 50px;
    border: 1px solid #dfe5ec;
    border-right: 0px;
    border-radius: 5px;

    &__link {
      background: #ffffff;
      border-right: 1px solid #dfe5ec;
      padding: 15px;
      border-radius: 5px;
      width: 100%;
      display: flex;
      justify-content: center;

      &-title {
        font-family: $font;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: $color;
      }
    }
  }
  &__tickets {
    display: flex;
    flex-direction: column;

    &__inner {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border-radius: 5px;
      margin-top: 20px;
      padding: 20px;

      &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-price {
          font-family: $font;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 24px;
          color: #2196f3;
        }
      }
      &__info {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        &__date {
          font-family: $font;
          width: 140px;
          &__box {
            display: flex;
            flex-wrap: wrap;

            &-stops {
              margin-right: 5px;
              @include data;
            }
          }
          &-route,
          &-way,
          &-transfer {
            @include text;
          }
          &-period,
          &-length {
            @include data;
          }
        }
      }
    }
  }
}
#second {
  border-radius: 0 5px 5px 0;
}
#first {
  border-radius: 5px 0 0 5px;
}
//#third {
//  border-radius: 0 5px 5px 0;
//}

.isActive {
  background: #2196f3;
  border-right: 1px solid #dfe5ec;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  .content__tabs__link-title {
    color: #ffffff;
  }
}
</style>
