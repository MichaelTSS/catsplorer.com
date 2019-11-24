Le test technique consiste à concevoir une petite application web qui affiche sous forme de trombinoscope des photos de chats (photo + si race existe, nom, origine, page wiki).

Pour cela, thecatapi.com met à disposition une API que tu peux requêter pour obtenir tous les chats dont tu auras besoin https://docs.thecatapi.com

Contraintes techniques :

- Cette application doit être mobile-first
- La liste complète des chats ne pourra pas être affichée sur la même page, il faudra les paginer de façon élégante
- Elle doit être faite en Vue.JS ou en Vanilla JS
- Je vais tester l'application avec plusieurs vitesses de connexion, 3G, 2G etc. aussi l'application doit prioriser le contenu visible, et afficher des placeholders comme le fait Facebook (cf. pièce jointe).
- Héberger le code source sur un repo git privé (ex. Github, Bitbucket, Gitlab, CodeCommit, etc.) et me donner accès -> michel@jellynote.com
- Le projet doit pouvoir être lancé en quelques lignes de commande sur un poste de développement

NB : Ne pas pousser tout le projet en un unique commit. L'historique Git doit révéler ta progression et tes axes de réflexion.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
