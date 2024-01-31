#INSTRUCTIONS

## Configure docker for your environment

REACT APP

- goto react-app directory
- Run the command to initiate react containers: docker run -p 3000:3000 -v $(pwd):/app -d react-app
- run npm install command to install all required packages for react app
- after running react containers, visit the url: http://localhost:3000


Laravel App

- Goto laravel-app directory
- run composer install
- run the command to initiate laravel containers: ./vendor/bin/sail up -d
- run following command to migrate database:./vendor/bin/sail artisan migrate
- after all tables are migrated and app is up then you need to run command to populate news data into tables: ./vendor/bin/sail artisan app:user-dashboard-feed-command
- Now you have all data into your database, now visit http://localhost:3000 where react app is running
- Here you can login and register user. after that you will gain access of dashboard
- your database server url will be: localhost:8001 according to docker configuration
- You can consult docker-compose.yml file for both application

