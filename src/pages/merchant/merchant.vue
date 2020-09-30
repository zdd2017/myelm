<template>
  <div class="merchant">
    <div class="navbar">
      <div class="search" @click="search">
        <svg
          width="100%"
          height="1.2rem"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="white"
            stroke-width="1"
            fill="none"
          />
          <line
            x1="13"
            y1="13"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2"
          />
        </svg>
      </div>
      <div class="address">{{ currentPosition }}</div>
      <div class="login">登录|注册</div>
    </div>

    <div class="food-type-container">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in types" :key="item.index">
          <ul>
            <li v-for="type in item" :key="type.index">
              <img :src="'https://fuss10.elemecdn.com' + type.image_url" />
              <div class="desc">{{ type.title }}</div>
            </li>
          </ul>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import {
  fetchCityByPosition,
  fetchFoodTypes,
  fetchMerchants,
} from "@/service/getData";

export default {
  name: "merchant",
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      geohash: "",
      currentPosition: "",
      types: [],
      merchantList: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      typeQuery: {
        geohash: "",
        type: 1, // ?????
        flags: [], // ?????
      },
      listQuery: {
        latitude: "",
        longitude: "",
        offset: "",
        limit: "",
        extras: "",
        keyword: "",
        id: "",
        ids: "",
        order_by: "",
        delivery_mode: "",
      },
    };
  },

  created() {
    this.geohash = this.$route.query.geohash;
    this.getCity();
    this.getTypes();
    // this.getMerchants();
  },
  methods: {
    getCity() {
      this.typeQuery.geohash = this.geohash;
      fetchCityByPosition(this.geohash).then((res) => {
        this.currentPosition = res.name;
      });
    },
    getTypes() {
      fetchFoodTypes(this.typeQuery).then((res) => {
        this.types[0] = res.slice(0, res.length / 2);
        this.types[1] = res.slice(res.length / 2);
      });
    },
    getMerchants() {
      fetchMerchants(this.listQuery).then((res) => {
        this.merchantList = res;
      });
    },
    search() {},
  },
};
</script>

<style scoped lang="less">
.merchant {
  background: #eee;
  .navbar {
    display: flex;
    justify-content: space-between;
    background: rgb(49, 144, 232);
    padding: 15px;
    color: #fff;
    font-size: 1.2rem;
    .search {
      flex: 1;
    }
    .address {
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .login {
      flex: 1;
      text-align: right;
    }
  }
  .food-type-container {
    position: relative;
    background: #fff;
    .swiper-container {
      padding-bottom: 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        list-style: none;
        li {
          width: 25%;
          img {
            width: 50%;
          }
        }
      }
    }
  }
}
</style>