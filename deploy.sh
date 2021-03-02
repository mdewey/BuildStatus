docker build -t build-status-image .

docker tag build-status-image registry.heroku.com/build-insight/web


docker push registry.heroku.com/build-insight/web

heroku container:release web -a build-insight