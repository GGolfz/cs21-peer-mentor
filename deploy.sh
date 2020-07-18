docker build -t cs21-peer-mentor_client -f ./client/Dockerfile ./client
docker build -t cs21-peer-mentor_server -f ./server/Dockerfile ./server
docker build -t cs21-peer-mentor_socket -f ./socket/Dockerfile ./socket

# docker run --name cs21-peer-mentor_client -p 3000:3000 cs21-peer-mentor_client 
# docker run --name cs21-peer-mentor_server -p 3050:3050 cs21-peer-mentor_server
# docker run --name cs21-peer-mentor_socket -p 5000:5000 cs21-peer-mentor_socket