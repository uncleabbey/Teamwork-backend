#  Teamwork-backend
[![Build Status](https://travis-ci.com/uncleabbey/Teamwork-backend.svg?branch=develop)](https://travis-ci.com/uncleabbey/Teamwork-backend)
[![Coverage Status](https://coveralls.io/repos/github/uncleabbey/Teamwork-backend/badge.svg?branch=develop)](https://coveralls.io/github/uncleabbey/Teamwork-backend?branch=develop)


## Workable endpoints
### Base Url 
https://abbey-teamwork-backend.herokuapp.com/api/v1
Please not that every endpoint apart from user login (/auth/signin) requires a token which can be gotten from login is passed into the request. Login response example
  
headers as
  ``` 
  headers { 
   'authorization', `Bearer ${token}`
   }
   ```
#### Auth
- user Login: POST /auth/signin
  
  request example 
  ``` 
  body {
   email: 'admin@gmail.com',
   password: '12345678'
  } 
  ```
  success response
  ```
  {
  "status": "success",
  "data": {
    "message": "Succesfully Logged in User",
    "userId": INT,
    "isAdmin": BOOLEAN,
    "token": "String"
  }
}

- Create user: POST /auth/create-user

 request example 
  ``` 
  body {
	"email": "papa@gmail.com",
	"password": "password",
	"firstName": "Nwankwo",
	"lastName": "Kanu",
	"isAdmin": true,
	"gender": "Male",
	"jobRole": "Sales Representative",
	"department": "Admin",
	"address": "2678, Etim Nyang Cresent Victoria Island Lagos"
}
  ``` 
  req header 
  ```
 
     headers { 
   'authorization', `Bearer ${token}`
   }
  }
  ```
#### Articles
- Create Article: POST /articles
  req example 
  ``` 
   body  {
      title: 'Yellow Fever',
      article:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus unde itaque mollitia, soluta sit voluptate omnis beatae placeat veniam assumenda amet voluptas, nihil eos obcaecati in iusto! Fugit, deleniti ut.',
       tags: ["gsf", "kkk", "babab"]
    }
    headers {
    'authorization', `Bearer ${token}`
    }
   ```
   
   
- View Article by Id: GET /articles/:id
- Edit Article:  PATCH /articles/:id
- Delete Article: DELETE /articles/:id
- Comment POST /gifs/:id/comment
- Search Articles by Tags: POST /v1/search
#### Gifs
- Create Gifs: POST /gifs
- View Gif by Id - GET /gifs/:id
- Delete Gif DELETE /gifs/:id
- Comment POST /gifs/:id/comment

#### Feed
- View all articles and gif: GET /feed
- With pagination http://localhost:5000/api/v1/feed?currentPage={:num}&pageSize={:num} where currentPage and pagesize are used to determine offset and limits in the database



