# nox-framework
Meta framework made on top of Express.js to power the backend all nox. web applications.

It's goal is to bring conventions and best practices to an unopinionated Express.js, exposing a RESTful API that should work seamlessly with any NuxtJS application.

Since this framework is meant to be used inside a NuxtJS application, it is currently not tested to work as a standalone, although it should be possible with the right adaptations.

### Endpoints

By default two endpoints already exist: v1/auth for user authentication and v1/spotify for Spotify-related queries.

New versions of the API can be registered on the config file. A folder with the version's name should be created in the root of the application.

New endpoints creation is as simple as making a new folder under any directory currently registered as a version.

##### Endpoints usually contain 4 files:

- index.js -> This is where the routes are defined and the requests are handled

- {endpoint}.model.js -> This is where the mongoose schema is defined

- {endpoint}.service.js -> Contains all business logic and loads external libraries

- {endpoint}.validation.js -> Contains all validation logic