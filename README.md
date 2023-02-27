
You can check our project deplyed here: https://rick-and-morty-project.fly.dev/

# APIs
- Cloudinary
- API Google
- https://rickandmortyapi.com/api

# ROUTES

## Index routes:
|         Route         | HTTP Verb |     Description      |
|-----------------------|-----------|----------------------|
|`/`                    |GET        |Home page             |
|`/community`           |GET        |View community        |


## Auth routes:

|         Route         | HTTP Verb |     Description      |
|-----------------------|-----------|----------------------|
|`/singup`              |GET        |Page new user         |
|`/singup`              |POST       |Create new user       |     
|`/login`               |GET        |Login page            |  
|`/login`               |POST       |Login user            |     
|`/logout`              |GET        |Logout user           |     

## Profile routes:

|         Route         | HTTP Verb |     Description      |
|-----------------------|-----------|----------------------|
|`/profile/:id`         |GET        |Profile detaile page  |
|`/profile/:id/edit`    |GET        |Edit profile page     |
|`/profile/:id/edit`    |POST       |Edit profile          |
|`/profile/:id/delete`  |POST       |Delete profile        |
|`/profile/:id/:role `  |POST       |Change role           |

## Character routes:

|                Route           | HTTP Verb |     Description       |
|--------------------------------|-----------|-----------------------|
|`/characters/:page`             |GET        |List all characters    |
|`/characters/results/:page`     |GET        |Character search result|
|`/characters/details/:id`       |GET        |Details character by ID|
|`/characters/:id/add-favorites` |POST       |Add character to fav   |
|`/characters/:id/quit-favorites`|POST       |Quit characters to fav |


## Locations routes:

|              Route            | HTTP Verb |     Description       |
|-------------------------------|-----------|-----------------------|
|`/locations/:page`             |GET        |List all locations     |
|`/locations/results/:page`     |GET        |Location search results|
|`/locations/details/:id`       |GET        |Details location by ID |
|`/locations/:id/add-favorites` |POST       |Add location to fav    |
|`/locations/:id/quit-favorites`|POST       |Quit location to fav   |


## Episodies routes:

|              Route            | HTTP Verb |     Description       |
|-------------------------------|-----------|-----------------------|
|`/episodies/:page`             |GET        |List all episodies     |
|`/episodies/results/:page`     |GET        |Eposodies search result|
|`/episodies/details/:id`       |GET        |Details episodie by ID |
|`/episodies/:id/add-favorites` |POST       |Add episodie to fav    |
|`/episodies/:id/quit-favorites`|POST       |Quit episodie to fav   |


## Events routes:

|          Route          | HTTP Verb |            Description         |
|-------------------------|-----------|--------------------------------|
|`/events`                |GET        |List all events                 |
|`/events/create`         |GET        |Create event page               |
|`/events/create`         |POST       |Create new event                |
|`/events/:id`            |GET        |Details events by ID            |
|`/events/:id/edit`       |GET        |Edit event page                 |
|`/events/:id/edit`       |POST       |Edit event                      |
|`/events/:id/delete`     |POST       |Delete event                    |
|`/events/results`        |GET        |Get event filtered by dimension |
|`/events/:id/add-event`  |POST       |Participet in the event         |
|`/events/:id/leave-event`|POST       |Leave the event                 |

## API routes:

|       Route     | HTTP Verb |    Description      | JSON |
|-----------------|-----------|---------------------|------|
|`/api/users`     |GET        |API with all users   |  ✅ |
|`/api/events`    |GET        |API with all events  |  ✅ |
|`/api/events/:id`|GET        |API with event by id |  ✅ |

