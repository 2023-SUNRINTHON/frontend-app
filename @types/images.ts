export const icons = {
  call: [
    require("../assets/images/maps/call.png"),
    require("../assets/images/maps/call_en.png"),
  ],
  account: [
    require("../assets/images/maps/account_circle.png"),
    require("../assets/images/maps/account_circle_en.png"),
  ],
  list: [
    require("../assets/images/maps/list_alt.png"),
    require("../assets/images/maps/list_alt_en.png"),
  ],
  home: [
    require("../assets/images/maps/home.png"),
    require("../assets/images/maps/home_en.png"),
  ],
  location: [
    require("../assets/images/maps/location_searching_en.png"),
    require("../assets/images/maps/location_searching_en.png"),
  ],
  pen: [
    require("../assets/images/maps/pen.png"),
    require("../assets/images/maps/pen.png"),
  ],
  notice: [require("../assets/images/list/notice.png")],
  alert: [require("../assets/images/list/alert.png")],
} as const;

export type Icons = {
  [key in keyof typeof icons]: [string, string];
};
