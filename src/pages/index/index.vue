<template>
  <div class="index">
    <div class="navbar">
      <div>ele.me</div>
      <div>登录|注册</div>
    </div>
    <div class="location-container">
      <div class="location">
        <div>当前定位城市：</div>
        <div>定位不准确，请在城市列表中选择</div>
      </div>
      <div class="current-city">
        <div class="name">{{locationCity.name}}</div>
        <div @click="goToLocation(locationCity.id)">></div>
      </div>
    </div>
    <div class="city-container">
      <div class="title">热门城市</div>
      <div class="city-grid-container">
        <div
          class="city-grid-item"
          @click="goToLocation(city.id)"
          v-for="city in hotCities"
          :key="city.id"
        >{{city.name}}</div>
      </div>
    </div>
    <div class="city-container" v-for="(value, key, index) in allCities" :key="index">
      <div class="title">{{key}}</div>
      <div class="city-grid-container">
        <div
          class="city-grid-item"
          style="color: #666"
          @click="goToLocation(city.id)"
          v-for="city in value"
          :key="city.index"
        >{{city.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from "BMap";
import { fetchCities } from "@/service/getData";
import pyjs from "js-pinyin";

export default {
  name: "index",
  data() {
    return {
      locationCity: {
        name: "正在定位",
      },
      hotCities: [],
      allCities: {},
    };
  },
  mounted() {
    this.getCurrentCity();
    this.getAllCities();
    this.getHotCities();
  },
  methods: {
    getCurrentCity() {
      fetchCities("guess")
        .then((res) => {
          this.locationCity = res;
        })
        .catch((err) => {
          this.locationCity = "定位失败";
        });
    },
    getHotCities() {
      fetchCities("hot").then((res) => {
        this.hotCities = res;
      });
    },
    getAllCities() {
      fetchCities("group").then((res) => {
        let result = {};
        let keys = Object.keys(res);
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
          let k = keys[i];
          result[k] = res[k];
        }
        this.allCities = result;
        console.log(this.allCities, "city");
      });
    },
    goToLocation(id) {
      console.log(id, "id");
      this.$router.push({
        path: "/location/" + id,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index {
  background: #eee;
  .navbar {
    display: flex;
    justify-content: space-between;
    background: rgb(49, 144, 232);
    padding: 15px;
    color: #fff;
    font-size: 1rem;
  }
  .location-container {
    margin-bottom: 10px;
    background: #fff;
    .location {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 15px;
      font-size: 0.9rem;
      color: #666;
    }
    .current-city {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      .name {
        color: rgb(49, 144, 232);
      }
    }
  }
  .city-container {
    margin: 10px 0;
    background: #fff;
    font-size: 0.9rem;
    .title {
      padding: 10px 15px;
      text-align: left;
    }
    .city-grid-container {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      color: rgb(49, 144, 232);
      .city-grid-item {
        border: 1px solid #eee;
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
