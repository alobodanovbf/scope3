#!/usr/bin/env bash

set -e

BASE_URL="${BASE_URL:-http://localhost:3000}"
CONCURRENT="${CONCURRENT:-5}"
DURATION="${DURATION:-5S}"

URLS_FILE=$(mktemp)

cat >"$URLS_FILE" <<EOF
$BASE_URL/emissions/day?domain=yahoo.com&date=2025-08-04
$BASE_URL/emissions/week?domain=yahoo.com&date=2025-08-04
$BASE_URL/emissions/month?domain=yahoo.com&date=2025-08
EOF

echo "Running load test against $BASE_URL"
echo "Concurrent users : $CONCURRENT"
echo "Duration         : $DURATION"
echo ""

siege \
  --concurrent="$CONCURRENT" \
  --time="$DURATION" \
  --file="$URLS_FILE" \
  --log=/dev/null

rm -f "$URLS_FILE"
