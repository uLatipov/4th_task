# 4th_task
## First make sure to to install dependencies in each servers using 
    npm install
## Secondly make sure you created     .env file in server folder, that contains following variables
1. PORT - Port in which the api server will be running(default is 8080, in client side I forgot to remove static port, so if its necessary to use another port, make sure you port in client/src/http/api.js)
2. DB - link to mongodb server
3. REFRESH_KEY_SECRET - secret key for refresh token generation
4. ACCESS_KEY_SECRET - secret key for access token generation
## Comand to run both Client & Api servers 
    npm run dev


### All technical requirements of 4th task are implemented, but there might be some ui related bugs
