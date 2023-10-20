/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx}"];
export const theme = {
    extend: {},
};
export const daisyui = {
    themes: ["light", "dark", "cupcake", "retro", "halloween"],
};
export const plugins = [require("daisyui")];
