<template>
  <div>
    <Header />
    <div class="container mt-5 mb-3">
      <div class="row">
        <div class="col-md-3" v-for="(dado, index) in parts" :key="index">
          <router-link :to="'/product/' + dado.id" tag="span" class="link">
            <div class="card mb-3" style="cursor: pointer;">
              <div class="card-header home-card-header">
                <img
                  :src="
                    'http://auto-unity.kinghost.net:21044/imageParts/image/' +
                    dado.customerId +
                    '_' +
                    dado.imagepart[0].image
                  "
                  class="home-card-image"
                />
              </div>
              <div class="card-body" style="text-align: left">
                <h5 class="card-title">{{ dado.title }}</h5>
                <p class="card-text">
                  {{
                    dado.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <!-- <div
      class="sub-footer mt-5"
      style="width: 100%; background-color: black; position: fixed; bottom: 0"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
             <p>APENAS FAZER O CONTATO ENTRE O COMPRADOR E O VENDEDOR</p>
            <p style="color: white">SHOP RACING 44</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import Header from "@/components/Header";

export default {
  name: "HomeTeste",
  components: { Header },
  data() {
    return {
      parts: [],
    };
  },
  created() {
    this.buscarPecas();
  },
  mounted() {
    window.addEventListener("scroll", this.verificarScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.verificarScroll);
  },
  methods: {
    verificarScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      console.log(scrollTop);      
      console.log(scrollHeight);
      console.log(clientHeight);      
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        //this.parts.push(...this.parts);
      }
    },
    buscarPecas() {
      this.$http.get("parts").then((response) => {
        this.parts = response.data.Data;
      });
    },
    infiniteHandler($state) {
      $state.loaded();
    },
  },
};
</script>
