<template>
  <div class="label-wrpa" :style="color">{{ msg }}</div>
</template>

<script>
import SYU from '../../engine';
export default {
  name: 'Label',
  props: {
    msg: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      color: {},
    };
  },
  mounted() {
    this.color = { backgroundColor: SYU.randomColor() };
  },
};
</script>

<style lang="less" scoped>
.label-wrpa {
  line-height: 24px;
  color: #fff;
  padding: 0 6px;
  font-size: 12px;
  border-radius: 3px;
  background-color: #faa;
  margin: 0 2px;
  margin-bottom: 3px;
  user-select: none;
}
</style>
