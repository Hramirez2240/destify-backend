## Description

This is the backend side of the movies application, it consist in different modules such as: actor, movie, user and rating

## Technologies

This project was built using typescript with nodejs(nestjs)
I used the postgreSQL database to store all my information
Used JWT to managed user token

## How to run the project locally

To run the project you need to do this quick things:

1. Clone the repository
2. After you cloned the repository you need to install the project's dependencies using this command in your terminal:
```bash
$ npm i
```
3. After the installation of all the dependencies you need to create a .env file in the root of the project and configure with the values that I sent to the email
4. After you do this steps, you can visit http://localhost:3001/api.

PD: I also sent the postman collection just in case you want to see all the endpoints

## Run the project using docker

If you want to run the project using docker, after you cloned the repository you just have to look at this 2 things:

1. Just in case you want to use the containerized database you need to change the .env file and paste the backend environment docker that I sent in the mail.
2. You need to go to your terminal and run this command:
```bash
$ docker compose up
```
This command will create the container and install all the necessary images to run the application.

## Endpoint documentation

If you want to see the endpoints documented in swagger you need to run the application and after that you need to go to http://localhost:3001/api

## Api endpoints

In every module the only endpoints that don't require a token to be authenticated are the user and all the gets endpoints(actor, movie, rating).

# User

### Register user
POST /auth/register
```code
{
    "name": "Test User",
    "email": "testuser@gmail.com",
    "password": "Test"
}
```

### Login user
POST /auth/login
```code
{
    "email": "testuser@gmail.com",
    "password": "Test"
}
```

# Actor

### Create actor
POST /actors
```code
{
  "firstName": "Chris",
  "lastName": "Evans",
  "birthDate": "1981-06-13",
  "nationality": "American",
  "image": "https://ultimasnoticias.com.ve/wp-content/uploads/2022/11/CHRIS-EVANS-AP-3.jpg"
}
```

### Update actor(number 5 represents the id of the actor)
PATCH /actors/5
```code
{
  "image": "https://ultimasnoticias.com.ve/wp-content/uploads/2022/11/CHRIS-EVANS-AP-3.jpg"
}
```

### Delete actor(number 3 represents the id of the actor)
DELETE /actors/3

### Get movies and actor has been(number 1 represents the id of the actor)
GET /actors/1/movies

# Movie

### Create movie
POST /movies
```code
{
  "title": "Titanic",
  "description": "Set aboard the ill-fated RMS Titanic, the film tells the story of Jack and Rose, two passengers from different social classes who fall in love during the ship's tragic maiden voyage. Directed by James Cameron, Titanic blends historical drama, romance, and epic spectacle in a powerful narrative of love and loss.",
  "releaseDate": "1997-12-19",
  "genre": "Drama, Romance",
  "duration": 195,
  "director": "James Cameron",
  "actors": [1]
}
```

### Update movie(number 5 represents the id of the movie)
PATCH /movies/4
```code
{
    "image": "https://wallpaperaccess.com/full/2624059.jpg"
}
```

### Delete actor(number 3 represents the id of the movie)
DELETE /movies/3

### Get the list of actors in specific movie(number 1 represents the id of the movie)
GET /movies/1/actors

# Rating

### Add rating to specific movie
POST /ratings
```code
{
  "rating": 3.8,
  "review": "The film was way too long and focused too much on a fictional romance rather than the actual tragedy. It didn’t live up to the hype for me.",
  "reviewerName": "Kevin Brooks",
  "movieId": 4
}
```

### Update rating(number 1 represents the id of the rating)
PATCH /ratings/1
```code
{
    "rating": 5.0,
    "reviewerName": "John Doe"
}
```

### Delete rating(number 3 represents the id of the rating)
DELETE /ratings/3
