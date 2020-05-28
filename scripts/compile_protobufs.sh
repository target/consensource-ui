#!/bin/sh

echo "Compiling .proto files..."

js_file="./src/services/protobuf/compiledProtos.js"
ts_file="./src/types/consensource/index.d.ts"

## The only proto that is relevant to the UI is `payload`.
## These are the messages that are used to build an action that 
## modifies state.
proto_to_compile='payload.proto'

## Generate JS code for protos
npx pbjs --keep-case -t static-module -w commonjs -o $js_file $(ls -d "$PWD"/protos/$proto_to_compile)

## Generate TS definitions for the JS code
npx pbts -o $ts_file $js_file

## Add types to global namesapce
## Add 'declare global {' to beginning of file
sed -i '' '2 a\ 
declare global {
' $ts_file
# printf '%s\n%s\n' "declare global {" "$(cat $ts_file)" >$ts_file

## Add closing '}' to end of file
echo '}' >> $ts_file  

echo "Successfully compiled all .proto files"
