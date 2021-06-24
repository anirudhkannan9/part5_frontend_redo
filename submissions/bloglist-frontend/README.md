# Bloglist: a MERN-stack web app
- Built frontend and backend of MERN-stack app to list blog posts and allow creation/deletion/other behaviour
- Implemented token-based user administration and authentication (jsonwebtoken, bcrypt)
- Extracted token and user authentication functionality into middleware
- Implemented login, token persistence, and blog creation/deletion in frontend; frontend conditionally renders
blogs based on user-specified parameters (users can ‘like’ blogs; blogs displayed in order of likes)
- Modularized frontend of application into 7 components
- Wrote and ran unit tests for API and token authentication in backend (Jest, supertest)
- Wrote and ran tests for component rendering and interactive behaviour in frontend (Jest)
- Wrote and ran E2E tests of application frontend & backend (Cypress)

## Running the app

You must download both the frontend (this repo) and backend () repositories. 

After downloading the repositories, navigate to the directories that contain them and run
### `npm install` 
in BOTH the frontend AND backend repos to install the project's dependencies.

In the backend repository: 
### `npm start` 
starts the server at localhost:3003

In the frontend repository:
### `npm start`
starts the frontend of the application at [http://localhost:3000](http://localhost:3000/) (this is the address you'll need to go to to actually interact with the app via its frontend). 

The server and the frontend must run simultaneously. You'll also need to put the .env file in the backend root directory. Email me at anirudhkannan9[AT]gmail[DOT]com for my .env file. It probably won't work even with the .env, because you may need access to the MongoDB Atlas Cluster I use to store data in the backend, so I've provided some demos of the app below. 

## Demos (in progress)

### Failed log in

### Successful log in 

### Viewing blogs

### 'Liking' a blog

### Creating new blogs

### Deleting a blog


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
