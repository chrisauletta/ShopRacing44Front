<template>
  <div>
    <div>
      <div class="container-fluid " style="background-color: black;">
        <div class="row">
          <div class="col-md-12">
            <img :src="require('@/assets/logoSR.png')" style="height: 250px;">
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-secondary mx-2"
            type="button"
            @click="scrollFilter()"
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div class="home-header" v-if="headerFilter">
        <div class="row p-1">
          <div class="col-2">
            <img :src="require('@/assets/logoSR.png')" style="height: 40px" />
          </div>
          <div class="col-10">
            <div class="d-flex">
              <input v-model="dadosFitler.title" type="text" class="form-control" placeholder="Item" />
              <button
                class="btn btn-secondary mx-2"
                type="button"
                @click="buscarPecas(true)"
              >
                <i class="fa fa-search"></i>
              </button>
              <button
                class="btn btn-danger"
                type="button"
                @click="filter = !filter"
              >
                <i class="fa" :class="filter ? 'fa-close' : 'fa-filter'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="hearder-filter" v-if="filter">
        <div class="d-flex flex-column pe-2" style="width: 82%">
          <div class="d-flex">
            <!-- <input v-model="dadosFitler.state" type="text" class="form-control" placeholder="Estado" /> -->
            <multiselect v-model="dadosFitler.state" 
                        :options="optionsState" 
                        :custom-label="({ nome }) => {  return `${nome}`}" 
                        placeholder="Select one" 
                        label="name" 
                        track-by="name"
                        @input="teste()">

                        </multiselect>
            <button class="btn btn-warning ms-2 pl-4 pr-3" type="button">Limpar</button>
          </div>
          <input v-model="dadosFitler.city" type="text" class="form-control mt-2 me-2" placeholder="Cidade" />
          <div class="d-flex mt-2">
            <input v-model="dadosFitler.value" type="text" class="form-control " placeholder="Preço" />
            <input @click="valueCondition = 'min'" type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked>
            <label class="btn btn-outline-success mx-2" for="success-outlined">MIN</label>

            <input @click="valueCondition = 'max'" type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off">
            <label class="btn btn-outline-danger" for="danger-outlined">MAX</label>
          </div>
        </div>
      </div>
    </div>
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
import Multiselect from 'vue-multiselect'

export default {
  name: "HomeTeste",
  components: { Header, Multiselect },
  data() {
    return {
      parts: [],
      page:1,
      end:false,
      dadosFitler:{
        title:"",
        state:{},
        city:"", 
        value:"",
        valueCondition:"min"
      },
      optionsState:[],
      filter: false,
      headerFilter:false
    };
  },
  async created() {
    await this.buscarPecas();
    await this.buscarState();
  },
  mounted() {
    window.addEventListener("scroll", this.verificarScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.verificarScroll);
  },
  methods: {
    async verificarScroll() {
      this.filterScroll();
      this.infintyScroll();
    },
    filterScroll(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 240) {
        this.headerFilter = true;
      }else{
        this.headerFilter = false;
        this.filter = false
      }
    },
    async infintyScroll(){
      //console.log('infintyScroll '+this.end);
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;     
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if(!this.end){
          this.page = this.page + 1;
          await this.buscarPecas();
        }
      }
    },
    async buscarPecas(resetPage = false) {
      if(resetPage){
        this.page = 1;
      }
      var url = "parts/findParts"
      var item = {
        page: this.page,
        limit: 2
      };
      if(this.dadosFitler.title != ''){
        item['title'] = this.dadosFitler.title;
      }
      if(this.dadosFitler.state != ''){
        item['state'] = this.dadosFitler.state;
      }
      if(this.dadosFitler.city != ''){
        item['city'] = this.dadosFitler.city;
      }
       if(this.dadosFitler.value != ''){
        item['value'] = this.dadosFitler.value;
        item['valueCondition'] = this.dadosFitler.valueCondition;
      }
      this.$http.post(url, item).then((response) => {
        console.log(response.data.Data.length);
        if(response.data.Data.length == 0){
          this.end = true;
        }
        if(resetPage){
          this.parts = response.data.Data;
          console.log();
        }else{
          this.parts.push(...response.data.Data);
        }
        
      });
      console.log(this.parts);
    },
    scrollFilter(){
        document.documentElement.scrollTop = 250;
        document.body.scrollTop = 250;
    },
    buscarState(){
      this.$http.get("state")
      .then((response) => {
        console.log(response.data.Data);
        this.optionsState = response.data.Data;
      }).catch((err) => {
        console.log(err);
      });
    },teste(){
      console.log("teste");
      console.log(this.dadosFitler.state);
    }
  },
};
</script>
