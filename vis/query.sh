TOTALPAGES=$(mongo BrowsingData --quiet --eval "db.logging.find().count();")

echo Total number of pages visited: $TOTALPAGES

SECONDLEVEL=$(mongo BrowsingData --quiet --eval "db.runCommand({distinct:\"logging\", key: \"baseURL\"}).values.length")

echo Total number of websites visited: $SECONDLEVEL

UNIQUEPAGES=$(mongo BrowsingData --quiet --eval "db.runCommand({distinct:\"logging\", key: \"fullURL\"}).values.length")

echo Total number of unique pages visited: $UNIQUEPAGES