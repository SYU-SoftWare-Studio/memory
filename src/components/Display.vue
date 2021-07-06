<template>
  <div class="display-wrap">
    <div class="img-wrap">
      <img class="img" :src="value[index].url" />
    </div>
    <div class="info-wrap">
      <div class="title">{{ value[index].title }}</div>
      <div class="info">{{ value[index].info }}</div>
      <div class="tags-wrap" style="margin-top: 30px">
        <p class="label" style="line-height: 24px">图片标签：</p>
        <div class="label-wrap">
          <Label v-for="(tag, index) in value[index].tag" :key="index" :msg="tag"></Label>
        </div>
      </div>
      <div class="tags-wrap" style="margin-top: 30px">
        <p class="label" style="line-height: 24px" v-if="this.value[index].expand">拓展属性：</p>
        <div class="label-wrap">
          <Label v-for="(tag, index) in value[index].expand.trim().split(' ')" :key="index" :msg="tag"></Label>
        </div>
      </div>
      <div style="flex: 1"></div>
      <div class="creat-time" style="margin-bottom: 25px">
        <p class="label">上传时间：</p>
        <p>{{ dateFormat(value[index].creatTime, 'Y年m月d日 H时i分') }}</p>
      </div>

      <div class="func-wrap">
        <el-button icon="el-icon-close" class="close" @click="handleClose" circle></el-button>
        <el-button icon="el-icon-arrow-left" circle @click="indexReduce" :disabled="leftDis"></el-button>
        <el-button icon="el-icon-arrow-right" circle @click="indexAdd" :disabled="rigthDis"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from '../../utils/formate';
import Label from './Label.vue';

export default {
  name: 'Display',
  components: {
    Label,
  },
  props: {
    value: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      dateFormat: dateFormat,
      index: 0,
    };
  },
  methods: {
    indexAdd() {
      if (this.index < this.len - 1) {
        this.index = this.index + 1;
      }
    },
    indexReduce() {
      if (this.index > 0) {
        this.index = this.index - 1;
      }
    },
    handleClose() {
      this.$emit('close');
    },
  },
  computed: {
    len() {
      return this.value.length;
    },
    leftDis() {
      return this.index === 0;
    },
    rigthDis() {
      return this.index === this.len - 1;
    },
  },
};
</script>

<style lang="less" scoped>
.display-wrap {
  width: 90%;
  height: 90%;
  transition: 0.6s ease-in-out;
  color: #606266;
  display: flex;
  min-height: 450px;
  min-width: 620px;

  .img-wrap {
    width: 70%;
    height: 100%;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: #ececece6;
    .img {
      height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }

  .info-wrap {
    height: 100%;
    flex: 1;
    background-color: #fff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 30px;
      color: #303133;
      margin-top: 10px;
    }

    .info {
      margin-top: 20px;
      text-align: left;
      padding: 0 5px;
    }

    .tags-wrap,
    .creat-time {
      width: 100%;
      display: flex;
      text-align: left;
      font-size: 14px;
    }

    .label-wrap {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
    }

    .func-wrap {
      width: 100%;
      text-align: right;
      * {
        margin: 0 10px;
      }
    }

    .label {
      width: 70px;
    }

    .close {
      float: left;
      margin: 0;
    }
  }
}
</style>
