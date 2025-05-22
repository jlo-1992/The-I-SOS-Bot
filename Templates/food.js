export default () => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'https://line.me/',
    },
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Brown Cafe',
        weight: 'bold',
        size: 'xl',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'addy',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '9a bath road, morley, WA',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'phone',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '0437265193',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: 'Website',
          uri: 'https://line.me/',
        },
      },
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: 'Google maps',
          uri: 'https://line.me/',
        },
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [],
        margin: 'sm',
      },
    ],
    flex: 0,
  },
})
