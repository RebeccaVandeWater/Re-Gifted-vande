<template>
<div>
  <img class="img-fluid" :src="giftProp.opened?giftProp.url:giftProp.imgAlt" :alt="giftProp.id" >
  <p>{{ giftProp.tag }}</p>
  <div class="text-center">
    <button class="btn btn-info" @click="openGift(giftProp.id)" v-if="!giftProp.opened">
      <i class="mdi mdi-gift-open"> Open?</i>
    </button>
  </div>
</div>

</template>


<script>
import { Gift } from '../models/Gift.js';

export default {
  props:{
    giftProp:{type: Gift, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>