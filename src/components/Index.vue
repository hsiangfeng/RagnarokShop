<template>
  <div>
    <Navbar/>
    <Jumbotron/>
    <Carousel/>
    <router-view/>
    <Secret/>
    <Esay/>
    <Other/>
    <Shop/>
    <Partner/>
    <Footer/>
  </div>
</template>

<script>
import Jumbotron from '../components/Jumbotron';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import Secret from '../components/Secret';
import Esay from '../components/Esay';
import Other from '../components/Other';
import Shop from '../components/Shop';
import Partner from '../components/Partner';
import Footer from '../components/Footer';

export default {
  name: 'Index',
  data() {
    return {};
  },
  components: {
    Jumbotron,
    Carousel,
    Navbar,
    Secret,
    Esay,
    Other,
    Shop,
    Partner,
    Footer,
  },
};
</script>

