<template>
  <div class="free-wrapper">
    <h2 id="big-title">자유게시판 글 작성</h2>
    <div class="title-wrapper">
      <span id="title-text">제목</span>
      <b-form-input
        v-model="article.title"
        placeholder="제목을 입력해주세요."
        id="title"
      ></b-form-input>
    </div>
    <div class="author-wrapper">
      <span id="author-text">작성</span>
      <b-form-input v-model="memberInfo.memberId" id="author" readonly></b-form-input>
    </div>
    <div class="context-wrapper">
      <span id="context-text">내용</span>
      <b-container fluid id="context-content">
        <b-form-textarea
          v-model="article.content"
          id="content"
          placeholder="내용을 입력해주세요."
          rows="5"
          max-rows="10"
        ></b-form-textarea>
      </b-container>
    </div>
    <div class="button-wrapper">
      <b-button pill class="submit" @click="onSubmit()">등록</b-button>
      <b-button pill class="cancel" @click="goToList()">취소</b-button>
    </div>
  </div>
</template>

<script>
import { writeArticle } from "@/api/board";
import { mapState, mapGetters } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      article: {
        memberId: "",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
    ...mapGetters(["checkMemberInfo"]),
  },
  methods: {
    onSubmit() {
      // 추후 내용 입력하지 않았을 시 오류 처리 예정
      this.registArticle();
    },
    registArticle() {
      let param = {
        memberId: this.memberInfo.memberId,
        title: this.article.title,
        content: this.article.content,
      };
      writeArticle(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.goToList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    goToList() {
      this.$router.push("/menu/free").catch(() => {});
    },
  },
};
</script>

<style scoped>
.free-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-top: 12%;
  width: 50%;
  animation: fadein 1s;
}

#big-title {
  margin-bottom: 5%;
}

#title,
#author {
  margin-bottom: 3%;
}

#title-text,
#context-text,
#author-text {
  font-size: 15px;
  color: dimgray;
  margin-right: 95%;
  margin-bottom: 1%;
}

.write {
  font-size: 12px;
  padding-bottom: 0.5%;
  padding-left: 3%;
  padding-right: 3%;
  margin-left: 85%;
  margin-bottom: 5%;
  background-color: #d0cece;
  border: 0;
  outline: 0;
}

.button-wrapper {
  margin-top: 7%;
}

.submit,
.cancel {
  width: 15%;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 12px;
  border: 0;
  outline: 0;
  font-family: "bootudy_font4";
}

#context-content {
  padding: 0;
}

.submit {
  background-color: #a6ccc4;
}

.cancel {
  background-color: #d0cece;
}

#title:hover,
#author:hover,
#content:hover {
  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200) inset;
}
</style>
