This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Start the sawtooth docker containers with docker-compose


make sure to have docker and docker composer installed and run docker-compose up 

```
docker-compose up -d

```

make sure you see 6 containers running

```
CONTAINER ID        IMAGE                                            COMMAND                  CREATED             STATUS              PORTS                              NAMES
8db9ed85e8f8        hyperledger/sawtooth-shell:chime                 "bash -c 'sawtooth k…"   4 seconds ago       Up 3 seconds        4004/tcp, 8008/tcp                 sawtooth-shell-default
07f9fbb2f834        hyperledger/sawtooth-settings-tp:chime           "settings-tp -vv -C …"   5 seconds ago       Up 3 seconds        4004/tcp                           sawtooth-settings-tp-default
0bb3752ae409        hyperledger/sawtooth-rest-api:chime              "sawtooth-rest-api -…"   5 seconds ago       Up 3 seconds        4004/tcp, 0.0.0.0:8008->8008/tcp   sawtooth-rest-api-default
3a347604801a        hyperledger/sawtooth-intkey-tp-python:chime      "intkey-tp-python -v…"   5 seconds ago       Up 2 seconds        4004/tcp                           sawtooth-intkey-tp-python-default
3b8c8f6c454e        hyperledger/sawtooth-devmode-engine-rust:chime   "devmode-engine-rust…"   5 seconds ago       Up 3 seconds                                           sawtooth-devmode-engine-rust-default
aa52df14e383        hyperledger/sawtooth-xo-tp-python:chime          "xo-tp-python -vv -C…"   5 seconds ago       Up 3 seconds        4004/tcp                           sawtooth-xo-tp-python-default
3ffe5d95620b        hyperledger/sawtooth-validator:chime             "bash -c 'sawadm key…"   5 seconds ago       Up 4 seconds        0.0.0.0:4004->4004/tcp             sawtooth-validator-default
```

We will add the delve in this particular compose at a later stage when I finish the code for it and dockerize it.

*The Sawtooth REST API doesn't support CORS. To allow cross-origin access to the Sawtooth API, put it behind a proxy.*

so we need to put it let's say behind nginx, and enable CORS for the nginx so that it would correctly go passed it 

```
check the nginx config that you need : nginx-proxy-conf

cp nginx-proxy-conf /sites-available/nginx-proxy-conf

ln -s $PATH/home/nginx-proxy-conf /etc/nginx/sites-enabled/nginx-proxy-conf
```


