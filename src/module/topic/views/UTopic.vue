<template>
  <div>
    <u-infinite-list :items="items" :item-height="80" #default="{ sliceItems }">
      <u-list :items="sliceItems"></u-list>
    </u-infinite-list>

    <div class="x-bottom" v-intersect="{ handler: fetchNext }"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import UList from "../components/UList.vue";
import UInfiniteList from "../../../components/UInfiniteList.vue";
const { mapState, mapActions } = createNamespacedHelpers("topic");

export default {
  name: "u-top",
  props: ["type"],
  components: {
    UList,
    UInfiniteList
  },
  computed: {
    ...mapState({
      items: state => state[state.activeType].items
    })
  },
  created() {
    this.fetchNext();
  },
  watch: {
    type(type) {
      this.fetchData({ type });
    }
  },
  methods: {
    ...mapActions({
      fetchData: "FETCH_LIST_DATA"
    }),
    fetchNext() {
      const { type } = this;
      this.fetchData({ type });
    }
  }
};
</script>

<style scoped>
.x-bottom {
  width: 100%;
  height: 1px;
}
</style>