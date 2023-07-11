<template>
  <div>
    <Header />
    <!-- Single Starts Here -->
    <div class="single-product mt-5" style="margin-bottom: 100px">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div>
              <carousel perPage="1">
                <slide v-for="(partImage, index) in part.imagepart" :key="partImage.id">
                  <div
                    style="
                      height: 300px;
                      border-style: ridge;
                      border-radius: 5px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background-color: rgba(0, 0, 0, 0.03);
                    "
                  >
                    <img
                      style="
                        max-height: 280px;
                        max-width: 280px;
                        object-fit: contain;
                        border-radius: 5px;
                        cursor: pointer;
                      "
                      @click="expandirImagem(index)"
                      :src="
                        $url +
                        'imageParts/image/' +
                        part.customer.id +
                        '_' +
                        part.imagepart[0].image
                      "
                    />
                  </div>
                </slide>
              </carousel>
            </div>
          </div>
          <div class="col-md-6">
            <div class="right-content pt-3" style="text-align: initial">
              <h4>{{ part.title }}</h4>
              <p>{{ part.note }}</p>
              <h6 class="mt-5">
                {{
                  part.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
              </h6>
              <div class="mt-5">{{ part.customer.name }}</div>
              <div>{{ formatarNumeroTelefone(part.customer.cell) }}</div>
              <div>{{ part.customer.city }} - {{ part.customer.state }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="sub-footer mt-5"
      style="width: 100%; background-color: black; position: fixed; bottom: 0"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <!-- <p>APENAS FAZER O CONTATO ENTRE O COMPRADOR E O VENDEDOR</p> -->
            <p style="color: white">SHOP RACING 44</p>
          </div>
        </div>
      </div>
    </div>
    <vue-easy-lightbox
      :visible="singleImage"
      :imgs="imagemAux"
      @hide="singleImage = false"
    ></vue-easy-lightbox>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Products",
  components: { Header, Carousel, Slide },
  data() {
    return {
      part: {
        title: "",
        note: "",
        value: 0,
        imagepart: [],
        customer: {
          id: 0,
          name: "",
          cell: "",
          city: "",
          state: "",
        },
      },
      singleImage: false,
      imagemAux:""
    };
  },
  async created() {
    var partId = this.$route.params.id;
    await this.$http.get("parts/" + partId).then((response) => {
      this.part = response.data.Data;
    });
  },
  methods: {
    async buscarPeca() {},
    expandirImagem(index){
      this.imagemAux = this.$url+'imageParts/image/'+this.part.customer.id+'_'+this.part.imagepart[index].image;
      this.singleImage = true;
    },
    formatarNumeroTelefone(numero) {
      // Remove todos os caracteres não numéricos
      const numeroLimpo = numero.replace(/\D/g, '');

      // Formata o número com parênteses, traços ou espaços, de acordo com a quantidade de dígitos
      if (numeroLimpo.length === 11) {
        return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (numeroLimpo.length === 10) {
        return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        // Retorna o número sem formatação se não for possível identificar o padrão
        return numeroLimpo;
      }
    }
  },
};
</script>
