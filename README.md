# carlosgm-flickr

App that resolves the challenge from [holidayextras/recruitment-tasks](https://github.com/holidayextras/recruitment-tasks/blob/master/developer-flickr-task.md).

The app has been built using [jaredpalmer/razzle](https://github.com/jaredpalmer/razzle) as a starting point.

The app consumes [flickr.photos.getRecent](https://www.flickr.com/services/api/flickr.photos.getRecent.html) and displays the photos retrieved, it also allows for filtering those photos by entering a search query.\
Please be aware that an API key from flickr will be required as an environment variable that can be consumed as `process.env.RAZZLE_FLICKR_API_KEY`.

App currently deployed at: https://carlosgm-flickr.herokuapp.com/

## Running the app

In order to build and run this app `node 12.x` and `yarn 1.19.x` are recommended.

1) Install the dependencies using `yarn install`
2) Run the development server using `yarn start`
3) Build the production ready deliverables using `yarn build`
4) Run the production server using `yarn start:prod`

Code styling is enforced through linting, use `yarn lint` to run the linter.\
The code is unit tested through Jest, use `yarn test` to run the tests.

## Understanding the app

The app is served using `Express`, all the code related to the server is within `src/server.jsx`, the server functionality is practically limited to serve static assets, a small JSON endpoint has been added as a response to assist in the development.

The client entry point is in `client.jsx` which basically wraps the `App` component inside a `Router` (boilerplate as react-router is not used atm).

The folder structure is as follows:

### appState
Contains the functionality related to the app-wide state. It is managed using Redux and intended to be divided by different _domains_ (at the moment only photos seem relevant as a domain).
API call to the Flickr endpoint is also managed from here as it is only relevant from the sense of populating the state.

### components

All the different React components that conform the application. App is the main entry point, Home would be the layout that contains all the components in the home page (it also contains search functionality, although this is not ideal), ImageDisplay is the individual display for each Flickr image and PhotoLoader is the component responsible of loading more photos each time the user scrolls to the end of the page.

### constants

Constants that are consumed in different parts of the application. At the moment only MockResponses is present, which contains an example of an API response for testing and development purposes.

### containers

Wrappers that expose the `appState` to the `components`. These should be completely devoid of any logic beyond mapping.

## TODO

Not in any particular order

- ~~Add search functionality~~
- Hide "PhotoLoader" component when searching
- Add pagination to API call to ensure that the photos retrieved are not duplicated
- Enable taking search as an url parameter
- Abstract search as its own component

