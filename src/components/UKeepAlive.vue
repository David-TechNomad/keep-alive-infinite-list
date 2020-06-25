<script>
import {
  isDef,
  remove,
  getComponentName,
  getFirstComponentChild
} from "../util/vue";

function pruneCacheEntry(cache, key, keys, current) {
  const cached = cache[key];
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

export default {
  name: "u-keep-alive",
  abstract: true,

  props: {
    max: [Number, String]
  },

  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  render() {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    const componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      const { cache, keys } = this;
      const key =
        vnode.key == null
          ? `${componentOptions.Ctor.cid}::${componentOptions.tag || ""}`
          : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode;
  }
};
</script>