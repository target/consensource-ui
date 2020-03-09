const { AccreditCertifyingBodyAction } = require('../protobuf/protos')

// example code
let message =  AccreditCertifyingBodyAction.create({
    certifyingBodyId: 'test',
    standardId: 'test',
    validFrom: 'test',
    validTo: 'test',
})


let buffer  = AccreditCertifyingBodyAction.encode(message).finish();

let decoded = AccreditCertifyingBodyAction.decode(buffer);

