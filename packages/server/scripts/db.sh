sudo docker run --name surgedb -d -p 27017:27017 mongo

# tests db
docker run --name surgetests -d -p 27018:27017 mongo
