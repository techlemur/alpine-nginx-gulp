**DEVELOPMENT USE ONLY DO NOT USE IN PRODUCTION**

Quick and dirty Alpine image with NGINX and Gulp.  

## Build

```sh
docker build --no-cache -t alpine-nginx-gulp . 
```

## Run

> Remember to have a gulpfile.js in your project directory.  (or copy the example gupfile.js from this repository)

```sh
docker run --rm -it -p 3333:80 -p 4444:443 -p 8080-8085:8080-8085 -v "$PWD":/workbench alpine-nginx-gulp 
```
