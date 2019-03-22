<template lang="pug">
  div
    AlertMessage
    Navbar
    router-view
    Footer
</template>

<script>
import AlertMessage from '@/components/pages/AlertMessage';
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
    AlertMessage,
  },
};
</script>
