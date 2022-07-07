# Software Engineering - Internship Assignment

Software Engineering - Internship Assignment surge

## Running the Application

### Docker

you can use docker-composer to run the application

```bash
docker-composer up
```
- api will be hosted on port : 4001
- frontend web application will host on port : 3000
- database will be hosted on port : 27017


### Local setup

setup mongo db, its possible to use docker to setup mongo db locally

```bash
sudo docker run --name surgedb -d -p 27017:27017 mongo
```
environment variables

```bash
export MONGODB_URL=mongodb://127.0.0.1:27017
export NODE_ENV=dev
export FRONTEND_HOST=http://localhost:3000/
```

### Secrets

JWT secret can be set by using a env variable, also in case where this variable is not present the application
will generate one 

```bash
export SECRET=secret
```

---

### Docs

API documentation can be found on [here](https://documenter.getpostman.com/view/15892759/UzJJucyC#2ad25e08-7d99-4841-a68e-4d5d39438308).

### Links

- Web : [localhost:3000](http://localhost:3000)
- API : [localhost:4001](http://localhost:4001)
- Docs : [here](https://documenter.getpostman.com/view/15892759/UzJJucyC#2ad25e08-7d99-4841-a68e-4d5d39438308).
