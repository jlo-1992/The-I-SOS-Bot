// templates/newsFlex.js

export default (articles) => ({
  type: "flex",
  altText: "本週焦點新聞",
  contents: {
    type: "carousel",
    contents: articles.map((article) => ({
      type: "bubble",
      size: "kilo",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "text",
            text: article.title,
            weight: "bold",
            wrap: true,
            size: "md",
          },
          {
            type: "text",
            text: article.description,
            size: "sm",
            color: "#666666",
            wrap: true,
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "uri",
              label: "閱讀更多",
              uri: article.link,
            },
          },
        ],
        flex: 0,
      },
    })),
  },
});
