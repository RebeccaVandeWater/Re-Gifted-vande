<template>
  <div class="container-fluid cream-bg">
    <section class="row">
      <div class="col-3">
        <div class="tan-glass mt-3">
          <form @submit.prevent="createGift(event)">
            <div class="d-flex flex-column align-content-center">
              <label for="tag"></label>
              <input v-model="editable.tag" type="text" name="tag" id="tag" minlength="1" maxlength="120" placeholder="Gift Tag" class="m-3">
  
              <label for="imgUrl"></label>
              <input v-model="editable.url" type="url" name="imgUrl" id="imgUrl" minlength="1" maxlength="300" placeholder="Gift Image" class="m-3">

              <div class="text-center">
                <button class="btn btn-primary m-3" type="submit">
                  <i class="mdi mdi-gift"> Create Gift</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p>Search Gif Section</p>
        </div>
      </div>
      <div class="col-9">
        <div class="row justify-content-center">
          <div class="col-md-3 p-3 blue-glass m-1 elevation-5"  v-for="gift in gifts" :key="gift.id">
            <img class="img-fluid" :src="gift.opened?gift.url:gift.imgAlt" :alt="gift.id" >
            <p>{{ gift.tag }}</p>
            <div class="text-center">
              <button class="btn btn-info" @click="openGift(gift.id)" v-if="!gift.opened">
                <i class="mdi mdi-gift-open"> Open?</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { giftsService } from '../services/GiftsService.js'
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';

export default {
  setup() {

    const editable = ref({})

    async function getGifts(){
      try{
        await giftsService.getGifts()
      } catch(error){
        Pop.error(error)
      }
    }

    onMounted(() => {
      logger.log("Home Page Mounted.");
      getGifts();
    })

    return {
      editable,

      gifts: computed(() => AppState.gifts),

      async createGift(){
        try {
          const giftData = editable.value

          logger.log('My giftData from editable', giftData)

          await giftsService.createGift(giftData)
        } catch (error) {
          Pop.error(error)
        }
      },

      async openGift(giftId){
        try {
          // logger.log(giftId)
          await giftsService.openGift(giftId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

.cream-bg{
  background-color: #fffff9;
}
.blue-glass{
  background: rgba(121, 211, 202, 0.77);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.6px);
  -webkit-backdrop-filter: blur(8.6px);
  border: 1px solid rgba(121, 211, 202, 0.7);
  height:fit-content;
}

.tan-glass{
  background: rgba(228, 196, 183, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.8px);
  -webkit-backdrop-filter: blur(9.8px);
  border: 1px solid rgba(228, 196, 183, 0.76);
  height: 30vh;
}
</style>
