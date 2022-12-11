<template>
  <div class="news-wrapper">
    <h2 id="title" @click="goToNews">최신 부동산 뉴스</h2>
    <b-carousel
      v-model="slide"
      :interval="4000"
      controls
      indicators
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        class="carousel"
        :caption="this.newsList_now[0].title"
        :text="this.newsList_now[0].description"
        img-src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXIZoA%2FbtrRY2e0GYR%2FTLesJydWaZ4uf0KQDOJDN1%2Fimg.png"
      ></b-carousel-slide>

      <b-carousel-slide
        :caption="this.newsList_now[1].title"
        :text="this.newsList_now[1].description"
        img-src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FclwanP%2FbtrRZM36tbz%2Fxuc9W7Rlior3qWdLUkvAtk%2Fimg.png"
      ></b-carousel-slide>

      <b-carousel-slide
        :caption="this.newsList_now[2].title"
        :text="this.newsList_now[2].description"
        img-src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FT0GEK%2FbtrR3cgackS%2FhkcCEFklsKiSckZPK3a5Dk%2Fimg.png"
      ></b-carousel-slide>

      <b-carousel-slide
        :caption="this.newsList_now[3].title"
        :text="this.newsList_now[3].description"
        img-src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpxmjW%2FbtrR2HOtCqq%2FoO6hqMyX7oAJ2pbETmuoe0%2Fimg.png"
      ></b-carousel-slide>

      <b-carousel-slide
        :caption="this.newsList_now[4].title"
        :text="this.newsList_now[4].description"
        img-src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FchI67T%2FbtrRY5W8Qap%2FzJwKJ8mS6cyVfLkSttdYX1%2Fimg.png"
      ></b-carousel-slide>
    </b-carousel>
    <div><b-button pill class="go-button" @click="goToLink(slide)">GO</b-button></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const newsStore = "newsStore";

export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      newsList_now: [],
    };
  },
  computed: {
    ...mapState(newsStore, ["newsList"]),
  },
  methods: {
    ...mapActions(newsStore, ["get10NewsList"]),
    goToNews() {
      this.$router.go();
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = true;
    },
    async getNews() {
      await this.get10NewsList();
      this.newsList_now = this.newsList;
      console.log(this.newsList_now);
    },
    goToLink: function (num) {
      window.open(this.newsList_now[num].link, "_blank");
    },
  },
  created() {
    this.getNews();
  },
};
</script>

<style scoped>
.news-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  width: 50%;
  animation: fadein 1s;
}

#title {
  margin-bottom: 7%;
}

.go-button {
  background-color: #f2f2f2;
  color: rgb(0, 0, 0);
  margin-top: 2%;
  outline: 0;
  border: 0;
  width: 100%;
}
</style>
