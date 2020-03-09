#!/bin/sh

echo "Compiling .proto files..."

js_file="./src/protobuf/index.js"
ts_file="./src/protobuf/index.d.ts"

npx pbjs -t static-module -w commonjs -o $js_file $(ls -d "$PWD"/protos/*)
npx pbts -o $ts_file $js_file

echo "Successfully compiled all .proto files"
