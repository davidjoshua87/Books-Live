# good-book

## Server

### List of users routes:
|Route               |HTTP   |Description                         |
|--------------------|-------|------------------------------------|
|`/api/users/`       | GET   | Get a all data                     |
|`/api/users/:id`    | GET   | Get a user by Id                   |
|`/api/users/signup` | POST  | User Sign Up                       |
|`/api/users/signin` | POST  | User Sign In                       |

### List of ulasan routes:
|Route                   |HTTP   |Description                     |
|------------------------|-------|--------------------------------|
|`/api/ulasan/`          | GET   | Get all ulasan                 |
|`/api/ulasan/:id`       | GET   | Get a ulasan                   |
|`/api/ulasan/`          | POST  | Create a ulasan (user only)    |
|`/api/ulasan/:id`       | DELETE| Delete a ulasan (user only)    |
|`/api/ulasan/like/:id`  | PUT   | Add like a ulasan (user only)  |
|`/api/ulasan/unlike/:id`| PUT   | Add like a ulasan (user only)  |


### List of books routes:
|Route                   |HTTP   |Description                     |
|------------------------|-------|--------------------------------|
|`/api/books/`           | GET   | Get all books                  |
|`/api/books/:id`        | GET   | Get a book                     |
|`/api/books/`           | POST  | Create a book (seller only)    |
|`/api/books/:id`        | DELETE| Delete a book (seller only)    |
|`/api/ulasan/:id`       | PUT   | Add ulasan a ulasan            |
|`/api/ulasan/like/:id`  | PUT   | Add like a book (user only)    |
|`/api/ulasan/unlike/:id`| PUT   | Add like a book (user only)    |

## Client
