#TODO
- 3d arrows point to hitpoint
- add some threejs stuff    
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## usefull
rm -rf node_modules/.vite/
npm cache clean --force
npm i && npm run dev
unter windows hat das geholfen
/node_modules/.bin/vite dasSystem kann den angegebenen Pfad nicht finden.

npx vite

https://r3f.docs.pmnd.rs/getting-started/examples
## gsap
npm i @gsap/react gsap

## for Math noobs :-)
npm i maath

## remove Warnings
npm i @react-three/eslint-plugin --save-dev
add to eslint.config.js under plugins
plugins: {
react,
'react-three': ReactThreeFiber,
},

add rule
'react/no-unknown-property': 'off',
352

I faced a similar issue on my Arch Linux machine. Apparently my issue was an HTTP buffer issue. I got it to work by using

git config http.postBuffer 524288000
followed by

git pull && git push