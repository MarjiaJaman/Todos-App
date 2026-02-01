#!/bin/sh
set -e

# Run migrations first (retry a few times in case DB isn't ready)
n=0
until [ $n -ge 5 ]
do
  echo "Running migrations (attempt: $((n+1)))..."
  if npx sequelize-cli db:migrate; then
    break
  fi
  n=$((n+1))
  echo "Migration failed, sleeping 3s and retrying..."
  sleep 3
done

# Start the app
echo "Starting app..."
exec node index.js