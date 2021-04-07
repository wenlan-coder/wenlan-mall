<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index == currentIndex }"
      @click="btn(index)"
    >
      <span :class="{ active: index == currentIndex }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    btn: function (index) {
      this.currentIndex = index;
      this.$emit("tab-current-index", index); 
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
}

.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: blue;
}
.active span {
  border-bottom: 3px solid blue;
}
.tab-control {
  position: sticky;
  top: 48px;
  z-index: 9;
  background-color: #fff;
}
</style>