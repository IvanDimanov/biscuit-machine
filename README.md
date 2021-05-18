# Profile :: Livescore API / Soccer API
Profile UI related to the Livescore API and Soccer API platforms


## Running locally
```
git clone git@gitlab.com:livescore/profile.git
cd profile
npm ci
npm start
```
__Note:__ Should you need to install the HTTPS certificate then consider taking a look at [mkcert](https://github.com/FiloSottile/mkcert).



## Tech stack
- Create React App - scaffolding - [https://reactjs.org](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)
- using HTTPS locally - [mkcert](https://github.com/FiloSottile/mkcert)
- Redux Toolkit - global state management - [https://redux-toolkit.js.org](https://redux-toolkit.js.org)
- React Query + axios - API handling - [https://react-query.tanstack.com](https://react-query.tanstack.com) + [https://github.com/axios/axio](https://github.com/axios/axio)
- Storybook - interactive components - [https://storybook.js.org](https://storybook.js.org)
- Ant Design - basic UI components - [http://ant.design](http://ant.design)
- react-icons - supercharged icons repo - [https://react-icons.github.io/react-icons](https://react-icons.github.io/react-icons)
- TailwindCSS - for all that common CSS rules - [https://tailwindcss.com](https://tailwindcss.com)



## File & Folder structure
Here we describe what you can find and where.
```
/src
  /api
    -- All BackEnd API calls should use an axios wrapper, e.g.:
    -- axiosClient.post('/api/user', { username, password })

  /App
    -- Root folder where we add Store and Theme Providers,
    -- implement page routers, and base CSS rules

  /components
    -- All UI blocks that do not use global state data can be found here.
    -- It is generally desirable to keep balance between reusable components and "props dripping"

  /globalState
    -- Every piece of shared data hosts a "data slice" in this folder.
    -- Every "slice" exposes actions for manipulating the global data object.

  /layouts
    -- Pages are commonly rendered in containers with menus, links, and headers.
    -- Such layouts can be generated for authenticated users and free public access.

  /pages
    -- These components combines the global state data with common UI components
    -- to generate complete data flow for every user.

  /stories
    -- Storybook placeholder for its info page

  /utils
    -- Common set of handy functions that manage money, time, strings, etc.
```
