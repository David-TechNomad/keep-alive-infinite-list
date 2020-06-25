<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <u-item :node="item"></u-item>
    </div>
  </div>
</template>

<script>
import UItem from "./UItem.vue";

export default {
  name: "u-list",
  props: {
    items: {
      required: true
    }
  },
  components: {
    UItem
  }
};
</script>