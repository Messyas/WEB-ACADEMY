docker network create network-loja

docker run -d \
 --name mysql-loja \
 --network network-loja \
 --restart always \
 -p 3307:3306 \
 -e MYSQL_ROOT_PASSWORD=senhasegura \
 -e MYSQL_DATABASE=loja \
 -v mysql-volume-loja:/var/lib/mysql \
 mysql:latest

 docker run -d \
 --name phpmyadmin-loja \
 --network network-loja \
 --restart always \
 -e PMA_HOST=mysql-loja \
 -e PMA_PORT=3306 \
 -e PMA_USER=root \
 -e PMA_PASSWORD=senhasegura \
 -p 8080:80 \
 phpmyadmin/phpmyadmin