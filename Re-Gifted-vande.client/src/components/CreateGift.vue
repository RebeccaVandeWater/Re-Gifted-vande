<template>
  <div class="tan-glass mt-3">
    <form @submit.prevent="createGift()">
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
  <div class="dark-blue-glass mt-3 text-center">
    <p class="m-3">
      Search for a Gif
    </p>
    <form @submit.prevent="findGifByQuery()">
    <div class="m-3">
      <label for="searchBar"></label>
      <input v-model="query.value" type="text" name="query" id="searchBar" placeholder="Search">
    </div>
    <div>
      <button class="btn btn-primary m-2" type="submit">
        <i class="mdi mdi-magnify"></i>
      </button>
    </div>
    </form>
  </div>
  <div class="row gif-box">
    <div class="col-12 m-2" v-for="gif in gifs" :key="gif.index">
    <img @click="selectGif(gif)" class="img-fluid selectable rounded" :src="gif" alt="Image Not Found">
    </div>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import { giftsService } from '../services/GiftsService.js';
import Pop from '../utils/Pop.js';
import { gifsService } from '../services/GifsService.js';

export default {
  setup(){

    const editable = ref({})

    const query = ref({})

    return {
      editable,

      query,

      gifs: computed(() => AppState.gifs),

      selectedGif: computed(() => AppState.selectedGif),

      async createGift(){
        try {
          const giftData = editable.value

          logger.log('My giftData from editable', giftData)

          await giftsService.createGift(giftData)
        } catch (error) {
          Pop.error(error)
        }
      },

      async findGifByQuery(){
        try{
          const gifQuery = query.value.value

          logger.log('Query data', gifQuery)

          await gifsService.findGifByQuery(gifQuery)
        } catch(error){
          Pop.error(error)
        }
      },

      async selectGif(gif){
        await gifsService.selectGif(gif)

        editable.value.url = this.selectedGif
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.dark-blue-glass{
  background: rgba(51, 109, 162, 0.64);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);
  border: 1px solid rgba(51, 109, 162, 0.49);
  width: fit-content;
}
.gif-box{
  max-height: 60vh;
  overflow-y: scroll;
}
.tan-glass{
  background: rgba(228, 196, 183, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.8px);
  -webkit-backdrop-filter: blur(9.8px);
  border: 1px solid rgba(228, 196, 183, 0.76);
  height: 30vh;
  min-width: max-content;
}
</style>