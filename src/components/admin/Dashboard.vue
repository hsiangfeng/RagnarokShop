<template lang="pug">
  div
    Navbar
    Alert
    router-view
</template>

<script>
import Navbar from '@/components/admin/Navbar';
import Alert from '@/components/admin/pages/AlertMessage';

export default {
  components: {
    Navbar,
    Alert,
  },
};
</script>
