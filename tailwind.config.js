module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '320px',
            sm: '375px',
            lsm: '425px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                'blue-dark': '#031432',
                'blue-middle': '#1c55a8',
                'blue-light': '#617db0',
            },
            fontFamily: {
                primary: ['Nunito', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
