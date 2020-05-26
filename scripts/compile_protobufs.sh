#!/bin/sh

echo "Compiling .proto files..."

js_file="./src/services/protobuf/index.js"
ts_file="./src/types/consensource/index.d.ts"

## Generate JS code for protos
npx pbjs --keep-case -t static-module -w commonjs -o $js_file $(ls -d "$PWD"/protos/*)

## Generate TS definitions for the JS code
npx pbts -o $ts_file $js_file

## Add a namespace export for the TS definitions
printf '%s\n%s\n' "export as namespace consensource;" "$(cat $ts_file)" >$ts_file

echo "Successfully compiled all .proto files"
