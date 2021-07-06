<template>
  <transition name="fade">
    <div v-if="isBeagin" class="wrap">
      <!-- <img class="index-img" src="https://seopic.699pic.com/photo/50059/8210.jpg_wh1200.jpg" /> -->
      <img class="index-img" :src="indexImg" />

      <div class="cover-container">
        <div v-if="infoShow" class="info-wrap">
          <div class="tips">{{ tips }}</div>
          <div class="info">{{ info }}</div>
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="funcShow" class="function-wrap">
            <input class="serach" placeholder="查询图片关键字" />
            <div>
              <a class="text-link" @click="handleClick">随便看看</a>
              <a class="text-link" @click="handleWantUpdate">我要上传</a>
            </div>
          </div>
          <Display v-if="isDisplay" :value="value" @close="handleClose"></Display>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import SYU from '../../../engine';
import Display from '../../components/Display.vue';

export default {
  name: 'Index',
  components: {
    Display,
  },
  data() {
    return {
      indexImg: '',
      tips: '',
      info: '',
      infoShow: false,
      funcShow: false,
      isBeagin: false,
      isDisplay: false,
      value: [],
    };
  },
  async mounted() {
    const { url, title, info } = await SYU.fetchIndexPic();
    this.indexImg = url;
    this.isBeagin = true;
    this.tips = title;
    this.info = info;
    setTimeout(() => {
      this.infoShow = true;
    }, 2000);
    setTimeout(() => {
      this.infoShow = false;
      this.funcShow = true;
    }, 8000);
  },
  methods: {
    async handleClick() {
      this.value = await SYU.fetchPic();
      this.funcShow = false;
      this.isDisplay = true;
    },
    handleWantUpdate() {
      this.$router.push({ name: 'Upload' });
    },
    handleClose() {
      this.funcShow = true;
      this.isDisplay = false;
    },
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes sliderAndFade {
  0% {
    margin-bottom: -40px;
    opacity: 0;
  }
  50% {
    margin-bottom: 80px;
    opacity: 1;
  }
  75% {
    margin-bottom: 80px;
    opacity: 1;
  }
  100% {
    margin-bottom: 80px;
    opacity: 0;
  }
}

@keyframes coverFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blur {
  0% {
    filter: blur(0px);
  }
  50% {
    filter: blur(0px);
  }
  100% {
    filter: blur(1.3px);
  }
}

.wrap {
  width: 100%;
  height: 100%;
  transition: 1.4s ease-out;

  .index-img {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -999;
    object-fit: cover;
    filter: blur(1.2px);
    animation: 4s blur;
  }

  .cover-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: 4s coverFade;
    background-color: rgba(64, 64, 64, 0.4);
    .info-wrap {
      color: #fff;
      animation: 6s sliderAndFade ease-in-out;
      .tips {
        font-size: 65px;
        letter-spacing: 4px;
        font-weight: bold;
      }

      .info {
        font-size: 32px;
        letter-spacing: 2px;
      }
    }
  }

  .function-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.6s ease-in-out;
    padding: 50px 40px;
    background-color: #fff;
    border-radius: 30px;

    .serach {
      width: 600px;
      box-sizing: border-box;
      height: 50px;
      border: 0;
      font-size: 14px;
      padding: 0 20px;
      margin-bottom: 20px;
      outline: none;
      border-radius: 20px;
      background-color: #efefef;
    }

    .text-link {
      font-size: 14px;
      margin: 20px 10px 0 10px;
      letter-spacing: 1px;
      transition: 0.6s ease-in-out;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: #faa;
      }
    }
  }
}
</style>
