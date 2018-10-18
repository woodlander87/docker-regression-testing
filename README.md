# Simple Regression Testing example using docker and docker-compose 

To run: 
* ensure docker and docker-compose are installed
* in current directory run

    ```docker-compose down -v && docker-compose build && docker-compose up```
* view results in ```~/results``` directory by running

    ```vimdiff ~/results/comics_base.json ~/results/comics_test.json```
