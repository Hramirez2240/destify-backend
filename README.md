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
