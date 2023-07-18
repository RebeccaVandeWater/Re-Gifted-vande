import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GiftsService {

  async getGifts() {
    const res = await api.get('api/gifts')

    logger.log(res.data)

    const gifts = res.data.map(pojo => new Gift(pojo))

    AppState.gifts = gifts

    logger.log(AppState.gifts)
  }

  async createGift(giftData) {

    const res = await api.post('api/gifts', giftData)

    logger.log("Made new gift in the API?", res.data)

    AppState.gifts.unshift(new Gift(res.data))
  }

  async openGift(giftId) {
    const foundGift = AppState.gifts.find(g => g.id == giftId)

    const foundGiftIndex = AppState.gifts.findIndex(g => g.id == giftId)

    const res = await api.put(`api/gifts/${giftId}`, { opened: !foundGift.opened })

    logger.log(res.data)

    const openedGift = new Gift(res.data)

    AppState.gifts.splice(foundGiftIndex, 1, openedGift)
  }


}

export const giftsService = new GiftsService()