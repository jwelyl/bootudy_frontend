<template>
  <div class="free-wrapper">
    <h2 id="big-title" @click="goToList()">자유 게시판</h2>
    <div class="title-wrapper">
      <span id="title-text">제목</span>
      <b-form-input v-model="article.title" placeholder="title" id="title"></b-form-input>
    </div>
    <div class="author-wrapper">
      <span id="author-text">작성</span>
      <b-form-input v-model="this.article.memberId" id="author" readonly></b-form-input>
    </div>
    <div class="context-wrapper">
      <span id="context-text">내용</span>
      <b-container fluid id="context-content">
        <b-form-textarea
          v-model="article.content"
          id="textarea-auto-height"
          placeholder="context"
          rows="5"
          max-rows="10"
        ></b-form-textarea>
      </b-container>
    </div>
    <div v-show="memberInfo.memberId == this.article.memberId" class="button-wrapper">
      <b-button pill class="submit" @click="onChange()">수정</b-button>
      <b-button pill class="delete" @click="onDelete()">삭제</b-button>
      <b-button pill class="cancel" @click="goToList()">취소</b-button>
    </div>
    <div v-show="memberInfo.memberId != this.article.memberId" class="button-wrapper">
      <b-button pill class="cancel" @click="goToList()">취소</b-button>
    </div>
  </div>
</template>

<script>
import { getArticle, modifyArticle, deleteArticle } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      article: {
        articleNo: 0,
        memberId: "",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    let param = this.$route.params.articleNo;
    getArticle(
      param,
      ({ data }) => {
        // console.log("data = ", data);
        this.article = data;
        // console.log("this.article = ", this.article);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    onChange() {
      if (confirm("정말 수정하시겠습니까?")) {
        let param = {
          articleNo: this.article.articleNo,
          memberId: this.article.memberId,
          title: this.article.title,
          content: this.article.content,
        };
        modifyArticle(
          param,
          ({ data }) => {
            let msg = "수정 처리시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "수정이 완료되었습니다.";
            }
            alert(msg);
            // 현재 route를 /list로 변경.
            this.goToList();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    onDelete() {
      if (confirm("정말 삭제하시겠습니까?")) {
        let param = this.article.articleNo;
        console.log(param);
        console.log(typeof param);
        deleteArticle(
          param,
          ({ data }) => {
            let msg = "삭제 처리시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "삭제가 완료되었습니다.";
            }
            alert(msg);
            // 현재 route를 /list로 변경.
            this.goToList();
          },
          (error) => {
            console.log(error);
          }
        );
      }
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
.delete,
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

.delete {
  background-color: #939393;
}

.cancel {
  background-color: #d0cece;
}

#title:hover,
#author:hover,
#textarea-auto-height:hover {
  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200) inset;
}
</style>
