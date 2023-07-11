<template>
  <!-- Pre Header -->
  <div>
      <div class="container-fluid" style="background-color: black;">
      <div class="row">
        <div class="col-md-12">
          <img :src="require('@/assets/logoSR.png')" style="height: 250px;">
        </div>
      </div>
    </div>
    <div class="home-header" v-if="headerFilter">
      <div class="row p-1">
        <div class="col-2">
          <img :src="require('@/assets/logoSR.png')" style="height: 40px" />
        </div>
        <div class="col-10">
          <div class="d-flex">
            <input type="text" class="form-control" placeholder="Item" />
            <button
              class="btn btn-secondary ml-2"
              type="button"
            >
              <i class="fa fa-search"></i>
            </button>
            <button
              class="btn btn-danger ml-2"
              type="button"
              @click="filter = !filter"
            >
              <i class="fa fa-filter"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="hearder-filter" v-if="filter">
      <div class="d-flex flex-column pr-2" style="width: 82%">
        <div class="d-flex">
          <input type="text" class="form-control" placeholder="Estado" />
          <button class="btn btn-warning ml-1 pl-4 pr-3" type="button">Limpar</button>
        </div>
        <input type="text" class="form-control mt-2" placeholder="Cidade" />
        <input type="text" class="form-control mt-2" placeholder="Preço" />
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
      console.log(scrollTop);
      if (scrollTop > 240) {
        this.headerFilter = true;
      }else{
        this.headerFilter = false;
      }
    },
  },
};
</script>
