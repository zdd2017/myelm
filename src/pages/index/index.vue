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
        <div class="name">{{locationCity}}</div>
        <div>></div>
      </div>
    </div>
    <div class="city-container">
      <div class="title">热门城市</div>
      <div class="city-grid-container">
        <div class="city-grid-item" v-for="city in hotCities" :key="city.index">{{city}}</div>
      </div>
    </div>
    <div class="city-container" v-for="(value, key, index) in allCities" :key="index">
      <div class="title">{{key}}</div>
      <div class="city-grid-container">
        <div
          class="city-grid-item"
          style="color: #666"
          v-for="city in value"
          :key="city.index"
        >{{city.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from "BMap";
import { fetchAllCities } from "@/service/getData";
import pyjs from "js-pinyin";

export default {
  name: "index",
  data() {
    return {
      locationCity: "正在定位",
      hotCities: [
        "上海",
        "哈尔滨",
        "南京",
        "广州",
        "厦门",
        "杭州",
        "天津",
        "青岛",
      ],
      allCities: {},
    };
  },
  mounted() {
    this.getCurrentCity();
    this.getAllCities();
  },
  methods: {
    getCurrentCity() {
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        (position) => {
          let city = position.address.city; //获取城市信息
          this.locationCity = city;
        },
        function (e) {
          this.locationCity = "定位失败";
        },
        { provider: "baidu" }
      );
    },
    getAllCities() {
      fetchAllCities("group").then((res) => {
        let result = {};
        let keys = Object.keys(res);
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
          let k = keys[i];
          result[k] = res[k];
        }
        this.allCities = result;
        console.log(this.allCities, "cities");
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
