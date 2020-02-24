#!/bin/sh

echo "Compiling .proto files..."

protos_dir='protos/*.proto'

for proto_with_ext in $protos_dir; do
  proto=$(basename $proto_with_ext .proto)

  js_file="./src/protobuf/$proto.js"
  ts_file="./src/protobuf/$proto.d.ts"

  npx pbjs -t static-module -w commonjs -o $js_file $proto_with_ext
  npx pbts -o $ts_file $js_file

  echo "Successfully compiled '$js_file', '$ts_file'"
done
