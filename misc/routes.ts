export const APP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://heightcomparisonchart.com";

export const routes = {
  home: {
    title: "Home",
    path: "/",
    showInNav: true,
  },

  about: {
    title: "About",
    path: "/about",
    showInNav: true,
  },
  contact: {
    title: "Contact",
    path: "/contact",
    showInNav: true,
  },
};
