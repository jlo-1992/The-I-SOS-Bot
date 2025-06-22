export default (restaurantList) => ({
  type: "template",
  altText: "推薦餐廳列表",
  template: {
    type: "carousel",
    columns: restaurantList.slice(0, 5).map((restaurant) => ({
      thumbnailImageUrl: restaurant.image,
      title: restaurant.name.substring(0, 40),
      text: restaurant.address.substring(0, 60),
      actions: [
        {
          type: "uri",
          label: "Google Maps",
          uri: restaurant.mapUrl,
        },
      ],
    })),
  },
});
