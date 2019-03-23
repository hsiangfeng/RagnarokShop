<template lang="pug">
  div
    AlertMessage
    CartMessage
    Navbar
    router-view
    Footer
</template>

<script>
import AlertMessage from '@/components/pages/AlertMessage';
import CartMessage from '@/components/pages/CartMessage';
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
    CartMessage,
  },
};
</script>
