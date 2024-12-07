#!/bin/sh
set -e

# Unzip export
OUTPUT_DIR="${1%.zip}"
unzip "$1" -d $OUTPUT_DIR

# Delete unnecessary csv
rm $OUTPUT_DIR/*_all.csv
# Rename main csv
mv $OUTPUT_DIR/*.csv $OUTPUT_DIR/contents.csv
# Move all material out of nested folder (only if folders for subpages is enabled)
# mv $OUTPUT_DIR/*/* $OUTPUT_DIR/

# Sync all articles into a central location
rsync -a --delete --prune-empty-dirs $OUTPUT_DIR/ src/_data/export/

# Finally, delete output since all files are moved
# rm -r $OUTPUT_DIR