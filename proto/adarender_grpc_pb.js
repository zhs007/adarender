// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_adarender_pb = require('../proto/adarender_pb.js');

function serialize_adarender_HTMLStream(arg) {
  if (!(arg instanceof proto_adarender_pb.HTMLStream)) {
    throw new Error('Expected argument of type adarender.HTMLStream');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_adarender_HTMLStream(buffer_arg) {
  return proto_adarender_pb.HTMLStream.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_adarender_MarkdownStream(arg) {
  if (!(arg instanceof proto_adarender_pb.MarkdownStream)) {
    throw new Error('Expected argument of type adarender.MarkdownStream');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_adarender_MarkdownStream(buffer_arg) {
  return proto_adarender_pb.MarkdownStream.deserializeBinary(new Uint8Array(buffer_arg));
}


// AdaRenderService - AdaRender service
var AdaRenderServiceService = exports.AdaRenderServiceService = {
  // render - render markdown
  render: {
    path: '/adarender.AdaRenderService/render',
    requestStream: true,
    responseStream: true,
    requestType: proto_adarender_pb.MarkdownStream,
    responseType: proto_adarender_pb.HTMLStream,
    requestSerialize: serialize_adarender_MarkdownStream,
    requestDeserialize: deserialize_adarender_MarkdownStream,
    responseSerialize: serialize_adarender_HTMLStream,
    responseDeserialize: deserialize_adarender_HTMLStream,
  },
};

exports.AdaRenderServiceClient = grpc.makeGenericClientConstructor(AdaRenderServiceService);
