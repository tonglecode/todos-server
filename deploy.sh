#!/user/bin/env

echo What should the version be?
read VERSION

docker build --platform linux/amd64 -t eshell/mytodos:$VERSION .
docker push eshell/mytodos:$VERSION
ssh todos "docker pull eshell/mytodos:$VERSION && docker tag eshell/mytodos:$VERSION dokku/api:latest && dokku deploy api latest"