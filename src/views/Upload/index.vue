<template>
  <div class="wrap">
    <img v-if="background" :src="background" class="background" />
    <div class="upload-container">
      <div class="upload-wrap">
        <el-upload
          class="img-wrap"
          :action="domain"
          :http-request="upqiniu"
          list-type="picture"
          :show-file-list="false"
          :before-upload="beforeUpload"
        >
          <img v-if="imgUrl" :src="imgUrl" ref="img" class="img" />
          <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 52px" />
        </el-upload>
        <div class="info-wrap">
          <div class="title">
            <input v-model="value.title" class="title-ipt input" placeholder="这里输入标题" />
          </div>
          <div class="info">
            <textarea v-model="value.info" rows="4" class="info-ipt input" placeholder="这里输入描述" />
          </div>
          <div class="tags-wrap">
            <el-select v-model="value.tag" multiple placeholder="选择标签" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="expand">
            <textarea
              v-model="value.expand"
              rows="6"
              class="expand-ipt input"
              placeholder="这里输入拓展属性，越多越好，可以将照片中的信息都输入进来用于增强检索，关键字使用空格分隔，如：小狗 草地 操场 食堂等"
            />
          </div>
          <div class="func-wrap">
            <div class="btn-wrap">
              <div style="float: right; margin-right: 10px">
                <el-button icon="el-icon-close" @click="handleCancle" circle></el-button>
                <el-button :icon="icon" @click="handleUpload" circle></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="home">
    <div class="upload">
      <el-upload
        class="avatar-uploader"
        :action="domain"
        :http-request="upqiniu"
        list-type="picture"
        :show-file-list="false"
        :before-upload="beforeUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
  </div> -->
</template>

<script>
import SYU from '../../../engine';

export default {
  name: 'Home',
  data() {
    return {
      token: {},
      domain: 'https://upload-z2.qiniup.com',
      background: '',
      imgUrl: '',
      options: [
        {
          value: '毕业照',
        },
        {
          value: '食堂',
        },
        {
          value: '6号楼',
        },
        {
          value: '412实验室',
        },
        {
          value: '410实验室',
        },
        {
          value: '女生',
        },
        {
          value: '男生',
        },
        {
          value: '操场',
        },
        {
          value: '校园',
        },
        {
          value: '沈阳市',
        },
        {
          value: '教室',
        },
        {
          value: '寝室',
        },
        {
          value: '老师',
        },
        {
          value: '四季',
        },
      ],
      value: {
        title: '',
        info: '',
        expand: '',
        url: '',
        tag: [],
      },
      icon: 'el-icon-position',
    };
  },
  async mounted() {
    // this.$message.error('该功能暂未开放');
    // this.$router.replace({ name: 'Index' });
    this.background = await SYU.fetchUploadPic();
  },
  methods: {
    async upqiniu(req) {
      this.reqFile = req;
    },

    beforeUpload(file) {
      console.log(file);
      this.imgUrl = window.URL.createObjectURL(file);
      const legalVal = ['jpeg', 'jpg', 'png', 'gif'];
      const isJPG = legalVal.includes(file.type.split('/')[1]);
      const isLt2M = file.size / 1024 / 1024 < 8;
      if (!isJPG) {
        this.$message.error('所上传图片的格式只能为 jepg,jpg,png,gif');
      }
      if (!isLt2M) {
        this.$message.error('所上传图片大小不能超过 8MB');
      }
      return isJPG && isLt2M;
    },

    handleCancle() {
      this.$router.replace({ name: 'Index' });
    },

    async handleUpload() {
      if (!this.value.tag.length) {
        this.$message.error('必须选择一个标签');
        return;
      }
      if (this.reqFile) {
        this.icon = 'el-icon-loading';
        this.$message.info('上传中');
        this.value.url = await SYU.uploadPic(this.reqFile);
        const params = this.value;
        params.tag = this.value.tag.join(' ');
        const { status } = await SYU.uploadArticle(params);
        if (status !== 0) {
          this.$message.error('Somethis Wrong');
          return;
        }
        this.icon = 'el-icon-position';
        this.value = {
          title: '',
          info: '',
          expand: '',
          url: '',
          tag: [],
        };
        this.imgUrl = '';
        this.$message.success('上传成功');
      }
    },
  },
};
</script>

<style lang="less">
@keyframes blur {
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(1.3px);
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.wrap {
  width: 100%;
  height: 100%;
  color: #606266;

  .background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -999;
    filter: blur(1.3px);
    object-fit: cover;
    animation: 1.4s blur;
  }

  .upload-container {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(64, 64, 64, 0.4);
    z-index: 100;
    animation: 2s fade;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upload-wrap {
    width: 90%;
    height: 90%;
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
        margin-top: 10px;
        width: 100%;

        .title-ipt {
          font-size: 30px;
          color: #303133;
        }
      }
      .info,
      .tags-wrap {
        margin-top: 10px;
        width: 100%;

        &-ipt {
          width: 100%;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          resize: none;
          font-size: 18px;
          color: #606266;
        }
      }
      .expand {
        margin-top: 20px;
        width: 100%;

        &-ipt {
          width: 100%;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          resize: none;
          font-size: 14px;
          color: #606266;
        }
      }
      .func-wrap {
        flex: 1;
        display: flex;
        flex-direction: column-reverse;
        width: 100%;

        .btn-wrap {
          width: 100%;
        }
      }
    }
  }
  .input {
    outline: none;
    width: 100%;
    border: 0;
  }
}
.el-upload {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
