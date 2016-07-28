#!/bin/bash

# Initialize the database
/docker-entrypoint.sh mysqld &

# Run any additional commands provided
source /root/.profile
exec "$@"
