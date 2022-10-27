export interface ColorTheme {
  name: string;
  white: string;
  black: string;
  gray: string;
  green: string;
  red: string;
  halfToneGray: string;
  link: string;
  linkAccent: string;
}

export const LIGHT_MODE: ColorTheme = {
  name: "light_mode",
  white: "#ffffff",
  black: "#453f3c",
  gray: "#938c8a",
  green: "#75bd8c",
  red: "#da7167",
  halfToneGray: "#f5f5f5",
  link: "#ff9940",
  linkAccent: "#a37acc",
};

export const DARK_MODE: ColorTheme = {
  name: "gruvbox",
  white: "#282828",
  black: "#ebdbb2",
  gray: "#928374",
  green: "#ABB66F",
  red: "#DA7167",
  halfToneGray: "#3c3836",
  link: "#fe8019",
  linkAccent: "#d3869b",
};

export function setPalette(theme: ColorTheme) {
  const style = document.documentElement.style;
  style.setProperty("--white", theme.white);
  style.setProperty("--black", theme.black);
  style.setProperty("--gray", theme.gray);
  style.setProperty("--green", theme.green);
  style.setProperty("--red", theme.red);
  style.setProperty("--half-tone-gray", theme.halfToneGray);
}
