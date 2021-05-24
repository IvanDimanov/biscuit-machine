# The Biscuit Machine
Online game where user bakes biscuits.

## [Live Demo](https://biscuit-machine.vercel.app)
## [![App](https://raw.githubusercontent.com/IvanDimanov/biscuit-machine/master/image.png)](https://biscuit-machine.vercel.app)

## Videos
- Game walkthrough: https://www.loom.com/share/dada09e7eecc4ee0a462036c0fa270f1
- Storybook walkthrough: https://www.loom.com/share/3169823d135f4f1494421ccdaa3aed96


## Running locally
```
git clone git@github.com:IvanDimanov/biscuit-machine.git
cd biscuit-machine
yarn
yarn start
```


## Tests
Running unit tests:
```
yarn test
```

Generate unit test coverage:
```
yarn test-coverage
```
Then you can open `./src/coverage/index.html`.

Running E2E tests:
```
yarn test-e2e
```
Access Storybook components [here](https://60a8a3b8988a5e003be6c930-wnkvlscdvv.chromatic.com).


## Tech stack
- Create React App - scaffolding - [https://reactjs.org](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)
- Zustand - global state management - [https://zustand.surge.sh/](https://zustand.surge.sh)
- Joi - schema validation used for ENV VARs - [https://www.npmjs.com/package/joi](https://www.npmjs.com/package/joi)
- Storybook - interactive components - [https://storybook.js.org](https://storybook.js.org)
- TailwindCSS - for all that common CSS rules - [https://tailwindcss.com](https://tailwindcss.com)


## File & Folder structure
Here we describe what you can find and where.
```
/src
  /App
    -- Root folder where we add Internationalization, check ENV VARs,
    -- implement Suspense fallback and base CSS rules

  /components
    -- All UI blocks that can be reused in multiple machine parts
    -- It is generally desirable to keep balance between reusable components and "props dripping"

  /globalState
    -- Every piece of shared data has its own hook
    -- Every hook exposes selectors for data and action manipulation

  /Machine
    -- Main instants where all game machine parts are combined and synched

  /stories
    -- Storybook placeholder hosting main project info

  /utils
    -- Common set of handy functions that manage random numbers, rescaling, etc.
```


## Used resources
During the development of this game a number of public images, color schemes, sounds, and animations were used.
Here`s a list of their domains.

### Used images
- [https://www.vectorstock.com/royalty-free-vector](https://www.vectorstock.com/royalty-free-vector)
- [https://gamedeveloperstudio.itch.io/conveyor-belt](https://gamedeveloperstudio.itch.io/conveyor-belt)
- [https://www.flaticon.com/search?word=oven](https://www.flaticon.com/search?word=oven)
- [https://game-icons.net](https://game-icons.net)
- [https://pngimg.com](https://pngimg.com)

### Used colors
- [https://www.schemecolor.com/sweet-cookies.php](https://www.schemecolor.com/sweet-cookies.php)

### Used sounds
- [https://mixkit.co/free-sound-effects/game](https://mixkit.co/free-sound-effects/game)

### Sound Editing
- [https://twistedwave.com](https://twistedwave.com)

### CSS Animations
- [https://codepen.io/jkantner/pen/PoPvoGK](https://codepen.io/jkantner/pen/PoPvoGK)
- [https://codepen.io/lukasoe/pen/BpMNjw](https://codepen.io/lukasoe/pen/BpMNjw)
- [https://codepen.io/vineethtrv/pen/xbyvmZ](https://codepen.io/vineethtrv/pen/xbyvmZ)
- [https://codepen.io/ivandimanov/pen/rNyeGMq?editors=1100](https://codepen.io/ivandimanov/pen/rNyeGMq?editors=1100)
- [https://codepen.io/ivandimanov/pen/wvJKQrV?editors=1100](https://codepen.io/ivandimanov/pen/wvJKQrV?editors=1100)
- [https://codepen.io/steylish/pen/YLxggB](https://codepen.io/steylish/pen/YLxggB)
- [https://codepen.io/ivandimanov/pen/eYvZPMb?editors=1100](https://codepen.io/ivandimanov/pen/eYvZPMb?editors=1100)
- [https://codepen.io/Vany/pen/aHgqv](https://codepen.io/Vany/pen/aHgqv)
- [https://askteammate.com/npm/react-thermometer-chart/](https://askteammate.com/npm/react-thermometer-chart/)
- [https://zamarrowski.github.io/react-thermometer-component/](https://zamarrowski.github.io/react-thermometer-component/)
