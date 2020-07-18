docker build -t ggolfz/cs21-peer-mentor-client -f ./client/Dockerfile ./client
docker build -t ggolfz/cs21-peer-mentor-server -f ./server/Dockerfile ./server
docker build -t ggolfz/cs21-peer-mentor-socket -f ./socket/Dockerfile ./socket

docker push ggolfz/cs21-peer-mentor-client
docker push ggolfz/cs21-peer-mentor-server
docker push ggolfz/cs21-peer-mentor-socket


kubectl apply -f k8s
kubectl set image deployments/server-deployment cs21-peer-mentor-server=ggolfz/cs21-peer-mentor-server
kubectl set image deployments/client-deployment cs21-peer-mentor-client=ggolfz/cs21-peer-mentor-client
kubectl set image deployments/socket-deployment cs21-peer-mentor-socket=ggolfz/cs21-peer-mentor-socket