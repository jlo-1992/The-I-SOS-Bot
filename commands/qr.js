export default async (event) => {
  await event.reply({
    type: 'text',
    text: '請選擇',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            // 按下去後，使用者傳送出的文字
            text: 'usd',
            // 按鈕文字
            label: '查美元匯率',
          },
        },
        {
          type: 'action',
          action: {
            type: 'uri',
            uri: 'https://line.me',
            label: 'LINE 官方網站',
          },
        },
        {
          type: 'action',
          action: {
            type: 'postback',
            label: 'postback',
            // 傳去 postback 事件的資料
            data: 'postback-data-abc',
            // 選填，使用者傳送出的文字
            displayText: '測試 postback',
          },
        },
      ],
    },
  })
}
