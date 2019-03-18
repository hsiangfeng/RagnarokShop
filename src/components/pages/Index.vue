<template lang="pug">
  div
    Jumbotron
    Secret
    Esay
    Other
    Shop
    Partner
</template>

<script>

import Jumbotron from '@/components/pages/Jumbotron';
import Carousel from '@/components/pages/Carousel';
import Secret from '@/components/pages/Secret';
import Esay from '@/components/pages/Esay';
import Other from '@/components/pages/Other';
import Shop from '@/components/pages/Shop';
import Partner from '@/components/pages/Partner';


export default {
  name: 'Index',
  data() {
    return {
    };
  },
  components: {
    Jumbotron,
    Carousel,
    Secret,
    Esay,
    Other,
    Shop,
    Partner,
  },
};
</script>

