<template>
  <div class="container-fluid cream-bg">
    <section class="row">
      <div class="col-3">
        <CreateGift />
      </div>
      <div class="col-9">
        <div class="row justify-content-center">
          <div class="col-md-3 p-3 blue-glass m-3 elevation-5"  v-for="gift in gifts" :key="gift.id">
            <GiftCard :giftProp="gift" />
        </div>
      </div>
      </div>
    </section>

  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { giftsService } from '../services/GiftsService.js'
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import CreateGift from '../components/CreateGift.vue';
import GiftCard from '../components/GiftCard.vue';

export default {
    setup() {
        async function getGifts() {
            try {
                await giftsService.getGifts();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(() => {
            logger.log("Home Page Mounted.");
            getGifts();
        });
        return {
            gifts: computed(() => AppState.gifts),
            async openGift(giftId) {
                try {
                    await giftsService.openGift(giftId);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
        };
    },
    components: { CreateGift, GiftCard }
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

</style>
