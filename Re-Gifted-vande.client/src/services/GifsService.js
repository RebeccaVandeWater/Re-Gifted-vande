import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { giphyApi } from "./AxiosService.js"

class GifsService {
  async findGifByQuery(gifQuery) {
    logger.log(gifQuery)

    const res = await giphyApi.get('', {
      params: {
        q: gifQuery
      }
    }
    )

    logger.log(res.data)

    const gifs = res.data.data.map(g => g.images.downsized_large.url)

    AppState.gifs = gifs

    logger.log("gifs in the AppState", AppState.gifs)
  }

  selectGif(gif) {
    AppState.selectedGif = gif
  }
}
export const gifsService = new GifsService