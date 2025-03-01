Quick and dirty Alpine image with NGINX and Gulp.

### Build

```sh
docker build --no-cache -t alpine-nginx-gulp . 
```

### Run

```sh
docker run --rm -it -p 3333:80 -p 4444:443 -p 8080-8085:8080-8085 -v "$PWD":/workbench alpine-nginx-gulp 
```
