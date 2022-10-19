export interface ColorTheme {
  white: string;
  black: string;
  gray: string;
  green: string;
  red: string;
}

export const LIGHT_MODE: ColorTheme = {
  white: "#ffffff",
  black: "#453f3c",
  gray: "#938c8a",
  green: "#75bd8c",
  red: "#da7167",
};

export const DARK_MODE: ColorTheme = {
  // it's gruvbox!
  white: "#282828",
  black: "#ebdbb2",
  gray: "#928374",
  green: "#ABB66F",
  red: "#DA7167",
};

export function setPalette(theme: ColorTheme) {
  const style = document.documentElement.style;
  style.setProperty("--white", theme.white);
  style.setProperty("--black", theme.black);
  style.setProperty("--gray", theme.gray);
  style.setProperty("--green", theme.green);
  style.setProperty("--red", theme.red);
}
