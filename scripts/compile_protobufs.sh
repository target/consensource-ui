#!/bin/bash

echo "Compiling .proto files..."

js_file="./src/services/protobuf/compiled/index.js"
ts_file="./src/services/protobuf/compiled/index.d.ts"

## The only proto that is relevant to the UI is `payload`.
## These are the messages that are used to build an action that 
## modifies state.
proto_to_compile='payload.proto'

## Generate JS code for protos
npx pbjs --keep-case -t static-module -w commonjs -o $js_file $(ls -d "$PWD"/src/protos/$proto_to_compile)

## Generate TS definitions for the JS code
npx pbts -o $ts_file $js_file

echo "Successfully compiled all .proto files"
