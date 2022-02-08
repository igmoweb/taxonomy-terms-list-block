#!/usr/bin/env bash

docker-compose exec -T --user root phpfpm phpunit "$@"
