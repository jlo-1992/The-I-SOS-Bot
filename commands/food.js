import axios from 'axios'
import { distance } from '../utils/distance.js'
// import json from '../Templates/food.json' with {type: 'json'}
// 不行，因為 pass by reference，會一直修改到原本的檔案
import template from '../Templates/food.js'
// fs 功能是檔案處理，是 node.js 內建的套件，不用另外安裝
import fs from 'fs'

export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://data.moa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx?IsTransData=1&UnitId=193',
    )
    const bubbles = data
      // 加上距離欄位，紀錄每個東西離使用者的位置多遠
      .map((value) => {
        value.distance = distance(
          value.Latitude,
          value.Longitude,
          event.message.latitude,
          event.message.longitude,
          'K',
        )
        return value
      })
      // 依照距離位置由近到遠排序，sort(a-b)->由小到大；sort(b-a)->由大到小
      .sort((a, b) => {
        return a.distance - b.distance
      })
      // 取出前三筆資料，.slice(開始索引，結束索引)，不包含結束位置
      .slice(0, 3)
      // 套用 line flex 模板
      .map((value) => {
        const address = value.City + value.Town + value.Address
        const bubble = template()
        // 換圖片
        const url = value.Url || `https://www.google.com/maps/place/${encodeURIComponent(address)}`
        bubble.hero.url = value.PicURL
        bubble.hero.action.uri = url
        // 換標題名稱
        bubble.body.contents[0].text = value.Name
        // 換地址內容
        bubble.body.contents[1].contents[0].contents[1].text = address
        // 換電話內容
        bubble.body.contents[1].contents[1].contents[1].text = value.Tel
        // 換官方網站按鈕
        bubble.footer.contents[0].action.uri = url
        // 換 google maps 按鈕
        bubble.footer.contents[1].action.uri = `https://www.google.com/maps/place/${encodeURIComponent(address)}`
        return bubble
      })
    const result = await event.reply({
      type: 'flex',
      altText: '農村地方美食',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })
    console.log(result)

    if (result.message) {
      await event.reply('發生錯誤')
      // 如果是開發環境，而且傳送訊息錯誤時
      if (process.env.DEV === 'true') {
        // 絕對路徑以 index.js 為判斷主體
        fs.writeFileSync(
          './dump/food.json',
          JSON.stringify({ type: 'carousel', contents: bubbles }, null, 2),
        )
      }
    }
  } catch (error) {
    console.error(error)
    await event.reply('發生錯誤')
  }
}
