<template>
  <!-- Pre Header -->
  <div>
    <div class="container-fluid " style="background-color: black;">
      <div class="row">
        <div class="col-md-12">
          <img :src="require('@/assets/logoSR.png')" style="height: 250px;">
        </div>
      </div>
    </div>
  </div>
  <!-- <div>

  </div> -->
</template>
<script>
import Header from "@/components/Header";

export default {
  name: "HomeTeste",

  components: { Header },
  data() {
    return {
      parts: [],
      filter: false,
      headerFilter:false
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.verificarScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.verificarScroll);
  },
  methods: {
    verificarScroll() {
      // Verifica se o usuário atingiu o final da página
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      if (scrollTop > 240) {
        this.headerFilter = true;
      }else{
        this.headerFilter = false;
        this.filter = false
      }
    },

  },
};
</script>
