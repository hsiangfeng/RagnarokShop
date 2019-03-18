<template lang="pug">
  div
    Navbar
    router-view
    Footer
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Footer,
  },
};
</script>
