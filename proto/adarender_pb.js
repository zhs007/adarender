/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.adarender.HTMLData', null, global);
goog.exportSymbol('proto.adarender.HTMLStream', null, global);
goog.exportSymbol('proto.adarender.MarkdownData', null, global);
goog.exportSymbol('proto.adarender.MarkdownStream', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.adarender.MarkdownData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.adarender.MarkdownData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.adarender.MarkdownData.displayName = 'proto.adarender.MarkdownData';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.adarender.MarkdownData.prototype.toObject = function(opt_includeInstance) {
  return proto.adarender.MarkdownData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.adarender.MarkdownData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.MarkdownData.toObject = function(includeInstance, msg) {
  var f, obj = {
    strdata: jspb.Message.getFieldWithDefault(msg, 1, ""),
    binarydataMap: (f = msg.getBinarydataMap()) ? f.toObject(includeInstance, undefined) : [],
    templatename: jspb.Message.getFieldWithDefault(msg, 10, ""),
    templatedata: jspb.Message.getFieldWithDefault(msg, 11, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.adarender.MarkdownData}
 */
proto.adarender.MarkdownData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.adarender.MarkdownData;
  return proto.adarender.MarkdownData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.adarender.MarkdownData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.adarender.MarkdownData}
 */
proto.adarender.MarkdownData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStrdata(value);
      break;
    case 2:
      var value = msg.getBinarydataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readBytes, null, "");
         });
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplatename(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplatedata(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.adarender.MarkdownData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.adarender.MarkdownData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.adarender.MarkdownData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.MarkdownData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStrdata();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBinarydataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeBytes);
  }
  f = message.getTemplatename();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getTemplatedata();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
};


/**
 * optional string strData = 1;
 * @return {string}
 */
proto.adarender.MarkdownData.prototype.getStrdata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.adarender.MarkdownData.prototype.setStrdata = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * map<string, bytes> binaryData = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!(string|Uint8Array)>}
 */
proto.adarender.MarkdownData.prototype.getBinarydataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!(string|Uint8Array)>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


proto.adarender.MarkdownData.prototype.clearBinarydataMap = function() {
  this.getBinarydataMap().clear();
};


/**
 * optional string templateName = 10;
 * @return {string}
 */
proto.adarender.MarkdownData.prototype.getTemplatename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/** @param {string} value */
proto.adarender.MarkdownData.prototype.setTemplatename = function(value) {
  jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string templateData = 11;
 * @return {string}
 */
proto.adarender.MarkdownData.prototype.getTemplatedata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.adarender.MarkdownData.prototype.setTemplatedata = function(value) {
  jspb.Message.setProto3StringField(this, 11, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.adarender.MarkdownStream = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.adarender.MarkdownStream, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.adarender.MarkdownStream.displayName = 'proto.adarender.MarkdownStream';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.adarender.MarkdownStream.prototype.toObject = function(opt_includeInstance) {
  return proto.adarender.MarkdownStream.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.adarender.MarkdownStream} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.MarkdownStream.toObject = function(includeInstance, msg) {
  var f, obj = {
    totallength: jspb.Message.getFieldWithDefault(msg, 1, 0),
    curstart: jspb.Message.getFieldWithDefault(msg, 2, 0),
    curlength: jspb.Message.getFieldWithDefault(msg, 3, 0),
    hashdata: jspb.Message.getFieldWithDefault(msg, 4, ""),
    totalhashdata: jspb.Message.getFieldWithDefault(msg, 5, ""),
    data: msg.getData_asB64(),
    error: jspb.Message.getFieldWithDefault(msg, 100, ""),
    markdowndata: (f = msg.getMarkdowndata()) && proto.adarender.MarkdownData.toObject(includeInstance, f),
    token: jspb.Message.getFieldWithDefault(msg, 300, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.adarender.MarkdownStream}
 */
proto.adarender.MarkdownStream.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.adarender.MarkdownStream;
  return proto.adarender.MarkdownStream.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.adarender.MarkdownStream} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.adarender.MarkdownStream}
 */
proto.adarender.MarkdownStream.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotallength(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCurstart(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCurlength(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setHashdata(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setTotalhashdata(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    case 100:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 200:
      var value = new proto.adarender.MarkdownData;
      reader.readMessage(value,proto.adarender.MarkdownData.deserializeBinaryFromReader);
      msg.setMarkdowndata(value);
      break;
    case 300:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.adarender.MarkdownStream.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.adarender.MarkdownStream.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.adarender.MarkdownStream} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.MarkdownStream.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotallength();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getCurstart();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getCurlength();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getHashdata();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTotalhashdata();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      100,
      f
    );
  }
  f = message.getMarkdowndata();
  if (f != null) {
    writer.writeMessage(
      200,
      f,
      proto.adarender.MarkdownData.serializeBinaryToWriter
    );
  }
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      300,
      f
    );
  }
};


/**
 * optional int32 totalLength = 1;
 * @return {number}
 */
proto.adarender.MarkdownStream.prototype.getTotallength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.adarender.MarkdownStream.prototype.setTotallength = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 curStart = 2;
 * @return {number}
 */
proto.adarender.MarkdownStream.prototype.getCurstart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.adarender.MarkdownStream.prototype.setCurstart = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 curLength = 3;
 * @return {number}
 */
proto.adarender.MarkdownStream.prototype.getCurlength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.adarender.MarkdownStream.prototype.setCurlength = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string hashData = 4;
 * @return {string}
 */
proto.adarender.MarkdownStream.prototype.getHashdata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.adarender.MarkdownStream.prototype.setHashdata = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string totalHashData = 5;
 * @return {string}
 */
proto.adarender.MarkdownStream.prototype.getTotalhashdata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.adarender.MarkdownStream.prototype.setTotalhashdata = function(value) {
  jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bytes data = 6;
 * @return {!(string|Uint8Array)}
 */
proto.adarender.MarkdownStream.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes data = 6;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.adarender.MarkdownStream.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.adarender.MarkdownStream.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/** @param {!(string|Uint8Array)} value */
proto.adarender.MarkdownStream.prototype.setData = function(value) {
  jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional string error = 100;
 * @return {string}
 */
proto.adarender.MarkdownStream.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 100, ""));
};


/** @param {string} value */
proto.adarender.MarkdownStream.prototype.setError = function(value) {
  jspb.Message.setProto3StringField(this, 100, value);
};


/**
 * optional MarkdownData markdownData = 200;
 * @return {?proto.adarender.MarkdownData}
 */
proto.adarender.MarkdownStream.prototype.getMarkdowndata = function() {
  return /** @type{?proto.adarender.MarkdownData} */ (
    jspb.Message.getWrapperField(this, proto.adarender.MarkdownData, 200));
};


/** @param {?proto.adarender.MarkdownData|undefined} value */
proto.adarender.MarkdownStream.prototype.setMarkdowndata = function(value) {
  jspb.Message.setWrapperField(this, 200, value);
};


proto.adarender.MarkdownStream.prototype.clearMarkdowndata = function() {
  this.setMarkdowndata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.adarender.MarkdownStream.prototype.hasMarkdowndata = function() {
  return jspb.Message.getField(this, 200) != null;
};


/**
 * optional string token = 300;
 * @return {string}
 */
proto.adarender.MarkdownStream.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 300, ""));
};


/** @param {string} value */
proto.adarender.MarkdownStream.prototype.setToken = function(value) {
  jspb.Message.setProto3StringField(this, 300, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.adarender.HTMLData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.adarender.HTMLData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.adarender.HTMLData.displayName = 'proto.adarender.HTMLData';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.adarender.HTMLData.prototype.toObject = function(opt_includeInstance) {
  return proto.adarender.HTMLData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.adarender.HTMLData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.HTMLData.toObject = function(includeInstance, msg) {
  var f, obj = {
    strdata: jspb.Message.getFieldWithDefault(msg, 1, ""),
    binarydataMap: (f = msg.getBinarydataMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.adarender.HTMLData}
 */
proto.adarender.HTMLData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.adarender.HTMLData;
  return proto.adarender.HTMLData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.adarender.HTMLData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.adarender.HTMLData}
 */
proto.adarender.HTMLData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStrdata(value);
      break;
    case 2:
      var value = msg.getBinarydataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readBytes, null, "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.adarender.HTMLData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.adarender.HTMLData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.adarender.HTMLData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.HTMLData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStrdata();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBinarydataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeBytes);
  }
};


/**
 * optional string strData = 1;
 * @return {string}
 */
proto.adarender.HTMLData.prototype.getStrdata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.adarender.HTMLData.prototype.setStrdata = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * map<string, bytes> binaryData = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!(string|Uint8Array)>}
 */
proto.adarender.HTMLData.prototype.getBinarydataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!(string|Uint8Array)>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      null));
};


proto.adarender.HTMLData.prototype.clearBinarydataMap = function() {
  this.getBinarydataMap().clear();
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.adarender.HTMLStream = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.adarender.HTMLStream, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.adarender.HTMLStream.displayName = 'proto.adarender.HTMLStream';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.adarender.HTMLStream.prototype.toObject = function(opt_includeInstance) {
  return proto.adarender.HTMLStream.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.adarender.HTMLStream} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.HTMLStream.toObject = function(includeInstance, msg) {
  var f, obj = {
    totallength: jspb.Message.getFieldWithDefault(msg, 1, 0),
    curstart: jspb.Message.getFieldWithDefault(msg, 2, 0),
    curlength: jspb.Message.getFieldWithDefault(msg, 3, 0),
    hashdata: jspb.Message.getFieldWithDefault(msg, 4, ""),
    totalhashdata: jspb.Message.getFieldWithDefault(msg, 5, ""),
    data: msg.getData_asB64(),
    error: jspb.Message.getFieldWithDefault(msg, 100, ""),
    htmldata: (f = msg.getHtmldata()) && proto.adarender.HTMLData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.adarender.HTMLStream}
 */
proto.adarender.HTMLStream.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.adarender.HTMLStream;
  return proto.adarender.HTMLStream.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.adarender.HTMLStream} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.adarender.HTMLStream}
 */
proto.adarender.HTMLStream.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotallength(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCurstart(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCurlength(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setHashdata(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setTotalhashdata(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    case 100:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    case 200:
      var value = new proto.adarender.HTMLData;
      reader.readMessage(value,proto.adarender.HTMLData.deserializeBinaryFromReader);
      msg.setHtmldata(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.adarender.HTMLStream.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.adarender.HTMLStream.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.adarender.HTMLStream} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.adarender.HTMLStream.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotallength();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getCurstart();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getCurlength();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getHashdata();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTotalhashdata();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      100,
      f
    );
  }
  f = message.getHtmldata();
  if (f != null) {
    writer.writeMessage(
      200,
      f,
      proto.adarender.HTMLData.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 totalLength = 1;
 * @return {number}
 */
proto.adarender.HTMLStream.prototype.getTotallength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.adarender.HTMLStream.prototype.setTotallength = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 curStart = 2;
 * @return {number}
 */
proto.adarender.HTMLStream.prototype.getCurstart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.adarender.HTMLStream.prototype.setCurstart = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 curLength = 3;
 * @return {number}
 */
proto.adarender.HTMLStream.prototype.getCurlength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.adarender.HTMLStream.prototype.setCurlength = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string hashData = 4;
 * @return {string}
 */
proto.adarender.HTMLStream.prototype.getHashdata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.adarender.HTMLStream.prototype.setHashdata = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string totalHashData = 5;
 * @return {string}
 */
proto.adarender.HTMLStream.prototype.getTotalhashdata = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.adarender.HTMLStream.prototype.setTotalhashdata = function(value) {
  jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bytes data = 6;
 * @return {!(string|Uint8Array)}
 */
proto.adarender.HTMLStream.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes data = 6;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.adarender.HTMLStream.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.adarender.HTMLStream.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/** @param {!(string|Uint8Array)} value */
proto.adarender.HTMLStream.prototype.setData = function(value) {
  jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional string error = 100;
 * @return {string}
 */
proto.adarender.HTMLStream.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 100, ""));
};


/** @param {string} value */
proto.adarender.HTMLStream.prototype.setError = function(value) {
  jspb.Message.setProto3StringField(this, 100, value);
};


/**
 * optional HTMLData htmlData = 200;
 * @return {?proto.adarender.HTMLData}
 */
proto.adarender.HTMLStream.prototype.getHtmldata = function() {
  return /** @type{?proto.adarender.HTMLData} */ (
    jspb.Message.getWrapperField(this, proto.adarender.HTMLData, 200));
};


/** @param {?proto.adarender.HTMLData|undefined} value */
proto.adarender.HTMLStream.prototype.setHtmldata = function(value) {
  jspb.Message.setWrapperField(this, 200, value);
};


proto.adarender.HTMLStream.prototype.clearHtmldata = function() {
  this.setHtmldata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.adarender.HTMLStream.prototype.hasHtmldata = function() {
  return jspb.Message.getField(this, 200) != null;
};


goog.object.extend(exports, proto.adarender);
