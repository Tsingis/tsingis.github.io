#!/bin/bash

URL="$1"
SEARCH_TEXT="$2"

STATUS=$(curl --silent --output /dev/null --write-out "%{response_code}\n" "$URL")

if [ "$STATUS" -ne 200 ]; then
    echo "Status $STATUS"
    exit 1
fi

CONTENT=$(curl -s "$URL")
if echo "$CONTENT" | grep -q "$SEARCH_TEXT"; then
    echo "Text found"
    exit 0
fi