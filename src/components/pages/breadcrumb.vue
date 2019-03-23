<template lang="pug">
  nav(aria-label='breadcrumb')
    ol.breadcrumb.bg-transparent
      li.breadcrumb-item
        router-link(:to="{name: 'Index'}")
          | 首頁
      li.breadcrumb-item(aria-current='page' v-if='breadcrumb.title')
          | {{breadcrumb.title}}
      li.breadcrumb-item(aria-current='page' v-if='breadcrumb.productsList')
        router-link(:to="{name: 'Products', params:{data: '全部商品'}}")
          | {{breadcrumb.productsList}}
      li.breadcrumb-item(aria-current='page' v-if='breadcrumb.productsTitle')
          | {{breadcrumb.productsTitle}}
</template>

<script>
export default {
  props: {
    breadcrumb: {
    },
  },
  data() {
    return {
    };
  },
};
</script>
