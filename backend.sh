#!/bin/bash
docker run --rm -it \
  -e MYSQL_DATABASE='trendwave' \
  -e MYSQL_ROOT_PASSWORD='cake' \
  -v $(pwd):/usr/src \
  -p 3000:3000 \
  t2 \
  ${@-npm start}
