<template>
  <div>
    <div id="map"></div>
    <div class="button-wrapper">
      <b-button pill @click="changeSize(0)">-</b-button>
      <b-button pill @click="changeSize(420)">+</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const resultStore = "resultStore";

export default {
  name: "KakaoMap",
  data() {
    return {
      markers: [],
    };
  },
  watch: {
    location: function () {
      this.displayMarker([this.location]);
    },
  },
  computed: {
    ...mapState(resultStore, ["location"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8ddedb8e406e2b9e4aa90b0dc9f5fb84";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options); // 지도 객체 등록
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));

      this.markers = positions.map(
        (position) =>
          new kakao.maps.Marker({
            map: this.map,
            position,
          })
      );

      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },
  },
};
</script>

<style scoped>
#map {
  width: 420px;
  height: 420px;
  border-radius: 20px;
}

.button-wrapper {
  margin: 10px 0px;
  margin-right: 80%;
  margin-bottom: 10%;
}

button {
  margin: 0 3px;
  height: 15px;
  padding-top: 0px;
  padding-bottom: 25px;
  background-color: #d0cece;
  border: 0;
  outline: 0;
}
</style>
