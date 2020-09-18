<template>
  <div class="location">
    <div class="navbar">
      <div @click="goToIndex">&lt;</div>
      <div>{{currentCity}}</div>
      <div @click="goToIndex">切换城市</div>
    </div>

    <form class="search-container" v-on:submit.prevent>
      <div class="input-container">
        <input
          class="search-input"
          v-model="query.keyword"
          placeholder="输入学校、商务楼、地址"
          required
          oninvalid="setCustomValidity('请输入地址！');"
          oninput="setCustomValidity('')"
        />
      </div>
      <div class="button-container">
        <input type="submit" class="submit-button" value="提交" @click="searchPlace" />
      </div>
    </form>

    <ul class="result-container" v-show="!noResult">
      <li class="result" v-for="place in places" :key="place.index" @click="goToShop(place)">
        <h4 class="title">{{place.name}}</h4>
        <p class="address">{{place.address}}</p>
      </li>
    </ul>

    <div v-show="historyVisible">
      <div>搜索历史</div>
      <ul class="result-container">
        <li class="result" v-for="history in histories" :key="history.index">
          <h4 class="title">{{history.name}}</h4>
          <p class="address">{{history.address}}</p>
        </li>
      </ul>
      <div @click="clearAllHistory">清空所有</div>
    </div>

    <div v-show="noResult">
      <p>很抱歉！无搜索结果</p>
    </div>
  </div>
</template>

<script>
import BMap from "BMap";
import { fetchCurrentCity, fetchPlaceInfo } from "@/service/getData";
import { setStore, getStore, removeStore } from "@/config/utils";
import pyjs from "js-pinyin";

export default {
  name: "index",
  data() {
    return {
      currentCity: "",
      query: {
        type: "search",
        id: this.$route.params.id,
        keyword: "",
      },
      places: [],
      histories: [],
      historyVisible: false,
      noResult: false,
    };
  },
  mounted() {
    this.getCurrentCity();
    this.getHistory();
  },
  methods: {
    getCurrentCity() {
      fetchCurrentCity(this.$route.params.id).then((res) => {
        this.currentCity = res.name;
      });
    },
    getHistory() {
      if (getStore("placeHistory")) {
        this.histories = JSON.parse(getStore("placeHistory"));
        console.log(this.histories, "get");
      }
    },
    searchPlace() {
      if (this.query.keyword) {
        fetchPlaceInfo(this.query).then((res) => {
          this.places = res;
          this.historyVisible = false;
          if (!this.places.length) {
            this.noResult = true;
          }
        });
      }
    },
    clearAllHistory() {
      this.histories = [];
      removeStore("placeHistory");
      this.historyVisible = false;
    },
    goToShop(place) {
      this.histories.push(place);
      setStore("placeHistory", this.histories);
      console.log(this.histories, "history");
      // this.$route.push()
    },
    goToIndex() {
      this.$router.push("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.location {
  .navbar {
    display: flex;
    justify-content: space-between;
    background: rgb(49, 144, 232);
    padding: 1rem;
    color: #fff;
    font-size: 1.2rem;
  }
  .search-container {
    .input-container {
      margin: 0 auto;
      width: 90%;
      .search-input {
        margin: 10px 0;
        border: 1px solid #ccc;
        padding: 0 0.3rem;
        width: 100%;
        height: 2rem;
        font-size: 1rem;
      }
    }
    .button-container {
      margin: 0 auto;
      width: 90%;
      .submit-button {
        border: 1px solid #ccc;
        background: rgb(49, 144, 232);
        width: 100%;
        height: 2.5rem;
        color: #fff;
        font-size: 1rem;
      }
    }
  }
  .result-container {
    margin-top: 10px;
    padding: 0;
    .result {
      border-top: 1px solid #ccc;
      padding: 0.5rem 1rem;
      list-style: none;
      text-align: left;
      .title {
        margin: 0.5rem 0;
        font-size: 1rem;
        color: #666;
      }
      .address {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        color: #999;
      }
    }
  }
}
</style>
