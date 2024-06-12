const { createThemes } = require("tw-colors");

module.exports = {
    darkMode: "class",
    content: [
        "./resources/**/*.blade.php",
        "./resources/js/src/**/*.js",
        "./resources/js/src/node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        // "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        createThemes({
            light: {
                primary: "steelblue",
                secondary: "darkblue",
                brand: "#F3F3F3",
            },
            dark: {
                primary: "turquoise",
                secondary: "tomato",
                brand: "#4A4A4A",
            },
            forest: {
                primary: "#2A9D8F",
                secondary: "#E9C46A",
                brand: "#264653",
            },
            summer: {
                primary: "pink",
                secondary: "red",
            },
        }),
    ],
    // plugins: [require("flowbite/plugin")],
};
