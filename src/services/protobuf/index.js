/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Agent = (function() {

    /**
     * Properties of an Agent.
     * @exports IAgent
     * @interface IAgent
     * @property {string|null} [publicKey] Agent publicKey
     * @property {string|null} [name] Agent name
     * @property {string|null} [organizationId] Agent organizationId
     * @property {number|Long|null} [timestamp] Agent timestamp
     */

    /**
     * Constructs a new Agent.
     * @exports Agent
     * @classdesc Represents an Agent.
     * @implements IAgent
     * @constructor
     * @param {IAgent=} [properties] Properties to set
     */
    function Agent(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Agent publicKey.
     * @member {string} publicKey
     * @memberof Agent
     * @instance
     */
    Agent.prototype.publicKey = "";

    /**
     * Agent name.
     * @member {string} name
     * @memberof Agent
     * @instance
     */
    Agent.prototype.name = "";

    /**
     * Agent organizationId.
     * @member {string} organizationId
     * @memberof Agent
     * @instance
     */
    Agent.prototype.organizationId = "";

    /**
     * Agent timestamp.
     * @member {number|Long} timestamp
     * @memberof Agent
     * @instance
     */
    Agent.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new Agent instance using the specified properties.
     * @function create
     * @memberof Agent
     * @static
     * @param {IAgent=} [properties] Properties to set
     * @returns {Agent} Agent instance
     */
    Agent.create = function create(properties) {
        return new Agent(properties);
    };

    /**
     * Encodes the specified Agent message. Does not implicitly {@link Agent.verify|verify} messages.
     * @function encode
     * @memberof Agent
     * @static
     * @param {IAgent} message Agent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Agent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.publicKey);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.organizationId != null && Object.hasOwnProperty.call(message, "organizationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.organizationId);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.timestamp);
        return writer;
    };

    /**
     * Encodes the specified Agent message, length delimited. Does not implicitly {@link Agent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Agent
     * @static
     * @param {IAgent} message Agent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Agent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Agent message from the specified reader or buffer.
     * @function decode
     * @memberof Agent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Agent} Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Agent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Agent();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.publicKey = reader.string();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.organizationId = reader.string();
                break;
            case 4:
                message.timestamp = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Agent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Agent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Agent} Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Agent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Agent message.
     * @function verify
     * @memberof Agent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Agent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            if (!$util.isString(message.publicKey))
                return "publicKey: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.organizationId != null && message.hasOwnProperty("organizationId"))
            if (!$util.isString(message.organizationId))
                return "organizationId: string expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        return null;
    };

    /**
     * Creates an Agent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Agent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Agent} Agent
     */
    Agent.fromObject = function fromObject(object) {
        if (object instanceof $root.Agent)
            return object;
        var message = new $root.Agent();
        if (object.publicKey != null)
            message.publicKey = String(object.publicKey);
        if (object.name != null)
            message.name = String(object.name);
        if (object.organizationId != null)
            message.organizationId = String(object.organizationId);
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an Agent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Agent
     * @static
     * @param {Agent} message Agent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Agent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.publicKey = "";
            object.name = "";
            object.organizationId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
        }
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            object.publicKey = message.publicKey;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.organizationId != null && message.hasOwnProperty("organizationId"))
            object.organizationId = message.organizationId;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
        return object;
    };

    /**
     * Converts this Agent to JSON.
     * @function toJSON
     * @memberof Agent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Agent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Agent;
})();

$root.AgentContainer = (function() {

    /**
     * Properties of an AgentContainer.
     * @exports IAgentContainer
     * @interface IAgentContainer
     * @property {Array.<IAgent>|null} [entries] AgentContainer entries
     */

    /**
     * Constructs a new AgentContainer.
     * @exports AgentContainer
     * @classdesc Represents an AgentContainer.
     * @implements IAgentContainer
     * @constructor
     * @param {IAgentContainer=} [properties] Properties to set
     */
    function AgentContainer(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AgentContainer entries.
     * @member {Array.<IAgent>} entries
     * @memberof AgentContainer
     * @instance
     */
    AgentContainer.prototype.entries = $util.emptyArray;

    /**
     * Creates a new AgentContainer instance using the specified properties.
     * @function create
     * @memberof AgentContainer
     * @static
     * @param {IAgentContainer=} [properties] Properties to set
     * @returns {AgentContainer} AgentContainer instance
     */
    AgentContainer.create = function create(properties) {
        return new AgentContainer(properties);
    };

    /**
     * Encodes the specified AgentContainer message. Does not implicitly {@link AgentContainer.verify|verify} messages.
     * @function encode
     * @memberof AgentContainer
     * @static
     * @param {IAgentContainer} message AgentContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AgentContainer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.Agent.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AgentContainer message, length delimited. Does not implicitly {@link AgentContainer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AgentContainer
     * @static
     * @param {IAgentContainer} message AgentContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AgentContainer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AgentContainer message from the specified reader or buffer.
     * @function decode
     * @memberof AgentContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AgentContainer} AgentContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AgentContainer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AgentContainer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.Agent.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AgentContainer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AgentContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AgentContainer} AgentContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AgentContainer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AgentContainer message.
     * @function verify
     * @memberof AgentContainer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AgentContainer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.Agent.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates an AgentContainer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AgentContainer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AgentContainer} AgentContainer
     */
    AgentContainer.fromObject = function fromObject(object) {
        if (object instanceof $root.AgentContainer)
            return object;
        var message = new $root.AgentContainer();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".AgentContainer.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".AgentContainer.entries: object expected");
                message.entries[i] = $root.Agent.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an AgentContainer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AgentContainer
     * @static
     * @param {AgentContainer} message AgentContainer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AgentContainer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.Agent.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this AgentContainer to JSON.
     * @function toJSON
     * @memberof AgentContainer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AgentContainer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AgentContainer;
})();

$root.Certificate = (function() {

    /**
     * Properties of a Certificate.
     * @exports ICertificate
     * @interface ICertificate
     * @property {string|null} [id] Certificate id
     * @property {string|null} [certifyingBodyId] Certificate certifyingBodyId
     * @property {string|null} [factoryId] Certificate factoryId
     * @property {string|null} [standardId] Certificate standardId
     * @property {string|null} [standardVersion] Certificate standardVersion
     * @property {Array.<Certificate.ICertificateData>|null} [certificateData] Certificate certificateData
     * @property {number|Long|null} [validFrom] Certificate validFrom
     * @property {number|Long|null} [validTo] Certificate validTo
     */

    /**
     * Constructs a new Certificate.
     * @exports Certificate
     * @classdesc Represents a Certificate.
     * @implements ICertificate
     * @constructor
     * @param {ICertificate=} [properties] Properties to set
     */
    function Certificate(properties) {
        this.certificateData = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Certificate id.
     * @member {string} id
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.id = "";

    /**
     * Certificate certifyingBodyId.
     * @member {string} certifyingBodyId
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.certifyingBodyId = "";

    /**
     * Certificate factoryId.
     * @member {string} factoryId
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.factoryId = "";

    /**
     * Certificate standardId.
     * @member {string} standardId
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.standardId = "";

    /**
     * Certificate standardVersion.
     * @member {string} standardVersion
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.standardVersion = "";

    /**
     * Certificate certificateData.
     * @member {Array.<Certificate.ICertificateData>} certificateData
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.certificateData = $util.emptyArray;

    /**
     * Certificate validFrom.
     * @member {number|Long} validFrom
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.validFrom = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Certificate validTo.
     * @member {number|Long} validTo
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.validTo = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new Certificate instance using the specified properties.
     * @function create
     * @memberof Certificate
     * @static
     * @param {ICertificate=} [properties] Properties to set
     * @returns {Certificate} Certificate instance
     */
    Certificate.create = function create(properties) {
        return new Certificate(properties);
    };

    /**
     * Encodes the specified Certificate message. Does not implicitly {@link Certificate.verify|verify} messages.
     * @function encode
     * @memberof Certificate
     * @static
     * @param {ICertificate} message Certificate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Certificate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.certifyingBodyId != null && Object.hasOwnProperty.call(message, "certifyingBodyId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.certifyingBodyId);
        if (message.factoryId != null && Object.hasOwnProperty.call(message, "factoryId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.factoryId);
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.standardId);
        if (message.standardVersion != null && Object.hasOwnProperty.call(message, "standardVersion"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.standardVersion);
        if (message.certificateData != null && message.certificateData.length)
            for (var i = 0; i < message.certificateData.length; ++i)
                $root.Certificate.CertificateData.encode(message.certificateData[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.validFrom != null && Object.hasOwnProperty.call(message, "validFrom"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.validFrom);
        if (message.validTo != null && Object.hasOwnProperty.call(message, "validTo"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.validTo);
        return writer;
    };

    /**
     * Encodes the specified Certificate message, length delimited. Does not implicitly {@link Certificate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Certificate
     * @static
     * @param {ICertificate} message Certificate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Certificate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Certificate message from the specified reader or buffer.
     * @function decode
     * @memberof Certificate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Certificate} Certificate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Certificate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Certificate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.certifyingBodyId = reader.string();
                break;
            case 3:
                message.factoryId = reader.string();
                break;
            case 4:
                message.standardId = reader.string();
                break;
            case 5:
                message.standardVersion = reader.string();
                break;
            case 6:
                if (!(message.certificateData && message.certificateData.length))
                    message.certificateData = [];
                message.certificateData.push($root.Certificate.CertificateData.decode(reader, reader.uint32()));
                break;
            case 7:
                message.validFrom = reader.uint64();
                break;
            case 8:
                message.validTo = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Certificate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Certificate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Certificate} Certificate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Certificate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Certificate message.
     * @function verify
     * @memberof Certificate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Certificate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.certifyingBodyId != null && message.hasOwnProperty("certifyingBodyId"))
            if (!$util.isString(message.certifyingBodyId))
                return "certifyingBodyId: string expected";
        if (message.factoryId != null && message.hasOwnProperty("factoryId"))
            if (!$util.isString(message.factoryId))
                return "factoryId: string expected";
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.standardVersion != null && message.hasOwnProperty("standardVersion"))
            if (!$util.isString(message.standardVersion))
                return "standardVersion: string expected";
        if (message.certificateData != null && message.hasOwnProperty("certificateData")) {
            if (!Array.isArray(message.certificateData))
                return "certificateData: array expected";
            for (var i = 0; i < message.certificateData.length; ++i) {
                var error = $root.Certificate.CertificateData.verify(message.certificateData[i]);
                if (error)
                    return "certificateData." + error;
            }
        }
        if (message.validFrom != null && message.hasOwnProperty("validFrom"))
            if (!$util.isInteger(message.validFrom) && !(message.validFrom && $util.isInteger(message.validFrom.low) && $util.isInteger(message.validFrom.high)))
                return "validFrom: integer|Long expected";
        if (message.validTo != null && message.hasOwnProperty("validTo"))
            if (!$util.isInteger(message.validTo) && !(message.validTo && $util.isInteger(message.validTo.low) && $util.isInteger(message.validTo.high)))
                return "validTo: integer|Long expected";
        return null;
    };

    /**
     * Creates a Certificate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Certificate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Certificate} Certificate
     */
    Certificate.fromObject = function fromObject(object) {
        if (object instanceof $root.Certificate)
            return object;
        var message = new $root.Certificate();
        if (object.id != null)
            message.id = String(object.id);
        if (object.certifyingBodyId != null)
            message.certifyingBodyId = String(object.certifyingBodyId);
        if (object.factoryId != null)
            message.factoryId = String(object.factoryId);
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.standardVersion != null)
            message.standardVersion = String(object.standardVersion);
        if (object.certificateData) {
            if (!Array.isArray(object.certificateData))
                throw TypeError(".Certificate.certificateData: array expected");
            message.certificateData = [];
            for (var i = 0; i < object.certificateData.length; ++i) {
                if (typeof object.certificateData[i] !== "object")
                    throw TypeError(".Certificate.certificateData: object expected");
                message.certificateData[i] = $root.Certificate.CertificateData.fromObject(object.certificateData[i]);
            }
        }
        if (object.validFrom != null)
            if ($util.Long)
                (message.validFrom = $util.Long.fromValue(object.validFrom)).unsigned = true;
            else if (typeof object.validFrom === "string")
                message.validFrom = parseInt(object.validFrom, 10);
            else if (typeof object.validFrom === "number")
                message.validFrom = object.validFrom;
            else if (typeof object.validFrom === "object")
                message.validFrom = new $util.LongBits(object.validFrom.low >>> 0, object.validFrom.high >>> 0).toNumber(true);
        if (object.validTo != null)
            if ($util.Long)
                (message.validTo = $util.Long.fromValue(object.validTo)).unsigned = true;
            else if (typeof object.validTo === "string")
                message.validTo = parseInt(object.validTo, 10);
            else if (typeof object.validTo === "number")
                message.validTo = object.validTo;
            else if (typeof object.validTo === "object")
                message.validTo = new $util.LongBits(object.validTo.low >>> 0, object.validTo.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a Certificate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Certificate
     * @static
     * @param {Certificate} message Certificate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Certificate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.certificateData = [];
        if (options.defaults) {
            object.id = "";
            object.certifyingBodyId = "";
            object.factoryId = "";
            object.standardId = "";
            object.standardVersion = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.validFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.validTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validTo = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.certifyingBodyId != null && message.hasOwnProperty("certifyingBodyId"))
            object.certifyingBodyId = message.certifyingBodyId;
        if (message.factoryId != null && message.hasOwnProperty("factoryId"))
            object.factoryId = message.factoryId;
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.standardVersion != null && message.hasOwnProperty("standardVersion"))
            object.standardVersion = message.standardVersion;
        if (message.certificateData && message.certificateData.length) {
            object.certificateData = [];
            for (var j = 0; j < message.certificateData.length; ++j)
                object.certificateData[j] = $root.Certificate.CertificateData.toObject(message.certificateData[j], options);
        }
        if (message.validFrom != null && message.hasOwnProperty("validFrom"))
            if (typeof message.validFrom === "number")
                object.validFrom = options.longs === String ? String(message.validFrom) : message.validFrom;
            else
                object.validFrom = options.longs === String ? $util.Long.prototype.toString.call(message.validFrom) : options.longs === Number ? new $util.LongBits(message.validFrom.low >>> 0, message.validFrom.high >>> 0).toNumber(true) : message.validFrom;
        if (message.validTo != null && message.hasOwnProperty("validTo"))
            if (typeof message.validTo === "number")
                object.validTo = options.longs === String ? String(message.validTo) : message.validTo;
            else
                object.validTo = options.longs === String ? $util.Long.prototype.toString.call(message.validTo) : options.longs === Number ? new $util.LongBits(message.validTo.low >>> 0, message.validTo.high >>> 0).toNumber(true) : message.validTo;
        return object;
    };

    /**
     * Converts this Certificate to JSON.
     * @function toJSON
     * @memberof Certificate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Certificate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Certificate.CertificateData = (function() {

        /**
         * Properties of a CertificateData.
         * @memberof Certificate
         * @interface ICertificateData
         * @property {string|null} [field] CertificateData field
         * @property {string|null} [data] CertificateData data
         */

        /**
         * Constructs a new CertificateData.
         * @memberof Certificate
         * @classdesc Represents a CertificateData.
         * @implements ICertificateData
         * @constructor
         * @param {Certificate.ICertificateData=} [properties] Properties to set
         */
        function CertificateData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CertificateData field.
         * @member {string} field
         * @memberof Certificate.CertificateData
         * @instance
         */
        CertificateData.prototype.field = "";

        /**
         * CertificateData data.
         * @member {string} data
         * @memberof Certificate.CertificateData
         * @instance
         */
        CertificateData.prototype.data = "";

        /**
         * Creates a new CertificateData instance using the specified properties.
         * @function create
         * @memberof Certificate.CertificateData
         * @static
         * @param {Certificate.ICertificateData=} [properties] Properties to set
         * @returns {Certificate.CertificateData} CertificateData instance
         */
        CertificateData.create = function create(properties) {
            return new CertificateData(properties);
        };

        /**
         * Encodes the specified CertificateData message. Does not implicitly {@link Certificate.CertificateData.verify|verify} messages.
         * @function encode
         * @memberof Certificate.CertificateData
         * @static
         * @param {Certificate.ICertificateData} message CertificateData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CertificateData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.field);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
            return writer;
        };

        /**
         * Encodes the specified CertificateData message, length delimited. Does not implicitly {@link Certificate.CertificateData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Certificate.CertificateData
         * @static
         * @param {Certificate.ICertificateData} message CertificateData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CertificateData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CertificateData message from the specified reader or buffer.
         * @function decode
         * @memberof Certificate.CertificateData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Certificate.CertificateData} CertificateData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CertificateData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Certificate.CertificateData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.field = reader.string();
                    break;
                case 2:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CertificateData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Certificate.CertificateData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Certificate.CertificateData} CertificateData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CertificateData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CertificateData message.
         * @function verify
         * @memberof Certificate.CertificateData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CertificateData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.field != null && message.hasOwnProperty("field"))
                if (!$util.isString(message.field))
                    return "field: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };

        /**
         * Creates a CertificateData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Certificate.CertificateData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Certificate.CertificateData} CertificateData
         */
        CertificateData.fromObject = function fromObject(object) {
            if (object instanceof $root.Certificate.CertificateData)
                return object;
            var message = new $root.Certificate.CertificateData();
            if (object.field != null)
                message.field = String(object.field);
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };

        /**
         * Creates a plain object from a CertificateData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Certificate.CertificateData
         * @static
         * @param {Certificate.CertificateData} message CertificateData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CertificateData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.field = "";
                object.data = "";
            }
            if (message.field != null && message.hasOwnProperty("field"))
                object.field = message.field;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };

        /**
         * Converts this CertificateData to JSON.
         * @function toJSON
         * @memberof Certificate.CertificateData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CertificateData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CertificateData;
    })();

    return Certificate;
})();

$root.CertificateContainer = (function() {

    /**
     * Properties of a CertificateContainer.
     * @exports ICertificateContainer
     * @interface ICertificateContainer
     * @property {Array.<ICertificate>|null} [entries] CertificateContainer entries
     */

    /**
     * Constructs a new CertificateContainer.
     * @exports CertificateContainer
     * @classdesc Represents a CertificateContainer.
     * @implements ICertificateContainer
     * @constructor
     * @param {ICertificateContainer=} [properties] Properties to set
     */
    function CertificateContainer(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CertificateContainer entries.
     * @member {Array.<ICertificate>} entries
     * @memberof CertificateContainer
     * @instance
     */
    CertificateContainer.prototype.entries = $util.emptyArray;

    /**
     * Creates a new CertificateContainer instance using the specified properties.
     * @function create
     * @memberof CertificateContainer
     * @static
     * @param {ICertificateContainer=} [properties] Properties to set
     * @returns {CertificateContainer} CertificateContainer instance
     */
    CertificateContainer.create = function create(properties) {
        return new CertificateContainer(properties);
    };

    /**
     * Encodes the specified CertificateContainer message. Does not implicitly {@link CertificateContainer.verify|verify} messages.
     * @function encode
     * @memberof CertificateContainer
     * @static
     * @param {ICertificateContainer} message CertificateContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CertificateContainer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.Certificate.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CertificateContainer message, length delimited. Does not implicitly {@link CertificateContainer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CertificateContainer
     * @static
     * @param {ICertificateContainer} message CertificateContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CertificateContainer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CertificateContainer message from the specified reader or buffer.
     * @function decode
     * @memberof CertificateContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CertificateContainer} CertificateContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CertificateContainer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CertificateContainer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.Certificate.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CertificateContainer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CertificateContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CertificateContainer} CertificateContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CertificateContainer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CertificateContainer message.
     * @function verify
     * @memberof CertificateContainer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CertificateContainer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.Certificate.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates a CertificateContainer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CertificateContainer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CertificateContainer} CertificateContainer
     */
    CertificateContainer.fromObject = function fromObject(object) {
        if (object instanceof $root.CertificateContainer)
            return object;
        var message = new $root.CertificateContainer();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".CertificateContainer.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".CertificateContainer.entries: object expected");
                message.entries[i] = $root.Certificate.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a CertificateContainer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CertificateContainer
     * @static
     * @param {CertificateContainer} message CertificateContainer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CertificateContainer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.Certificate.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this CertificateContainer to JSON.
     * @function toJSON
     * @memberof CertificateContainer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CertificateContainer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CertificateContainer;
})();

$root.Request = (function() {

    /**
     * Properties of a Request.
     * @exports IRequest
     * @interface IRequest
     * @property {string|null} [id] Request id
     * @property {Request.Status|null} [status] Request status
     * @property {string|null} [standardId] Request standardId
     * @property {string|null} [factoryId] Request factoryId
     * @property {number|Long|null} [requestDate] Request requestDate
     */

    /**
     * Constructs a new Request.
     * @exports Request
     * @classdesc Represents a Request.
     * @implements IRequest
     * @constructor
     * @param {IRequest=} [properties] Properties to set
     */
    function Request(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Request id.
     * @member {string} id
     * @memberof Request
     * @instance
     */
    Request.prototype.id = "";

    /**
     * Request status.
     * @member {Request.Status} status
     * @memberof Request
     * @instance
     */
    Request.prototype.status = 0;

    /**
     * Request standardId.
     * @member {string} standardId
     * @memberof Request
     * @instance
     */
    Request.prototype.standardId = "";

    /**
     * Request factoryId.
     * @member {string} factoryId
     * @memberof Request
     * @instance
     */
    Request.prototype.factoryId = "";

    /**
     * Request requestDate.
     * @member {number|Long} requestDate
     * @memberof Request
     * @instance
     */
    Request.prototype.requestDate = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new Request instance using the specified properties.
     * @function create
     * @memberof Request
     * @static
     * @param {IRequest=} [properties] Properties to set
     * @returns {Request} Request instance
     */
    Request.create = function create(properties) {
        return new Request(properties);
    };

    /**
     * Encodes the specified Request message. Does not implicitly {@link Request.verify|verify} messages.
     * @function encode
     * @memberof Request
     * @static
     * @param {IRequest} message Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.standardId);
        if (message.factoryId != null && Object.hasOwnProperty.call(message, "factoryId"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.factoryId);
        if (message.requestDate != null && Object.hasOwnProperty.call(message, "requestDate"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.requestDate);
        return writer;
    };

    /**
     * Encodes the specified Request message, length delimited. Does not implicitly {@link Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Request
     * @static
     * @param {IRequest} message Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Request message from the specified reader or buffer.
     * @function decode
     * @memberof Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Request} Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Request();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.status = reader.int32();
                break;
            case 3:
                message.standardId = reader.string();
                break;
            case 4:
                message.factoryId = reader.string();
                break;
            case 5:
                message.requestDate = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Request} Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Request message.
     * @function verify
     * @memberof Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.factoryId != null && message.hasOwnProperty("factoryId"))
            if (!$util.isString(message.factoryId))
                return "factoryId: string expected";
        if (message.requestDate != null && message.hasOwnProperty("requestDate"))
            if (!$util.isInteger(message.requestDate) && !(message.requestDate && $util.isInteger(message.requestDate.low) && $util.isInteger(message.requestDate.high)))
                return "requestDate: integer|Long expected";
        return null;
    };

    /**
     * Creates a Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Request} Request
     */
    Request.fromObject = function fromObject(object) {
        if (object instanceof $root.Request)
            return object;
        var message = new $root.Request();
        if (object.id != null)
            message.id = String(object.id);
        switch (object.status) {
        case "UNSET_STATUS":
        case 0:
            message.status = 0;
            break;
        case "OPEN":
        case 1:
            message.status = 1;
            break;
        case "IN_PROGRESS":
        case 2:
            message.status = 2;
            break;
        case "CLOSED":
        case 3:
            message.status = 3;
            break;
        case "CERTIFIED":
        case 4:
            message.status = 4;
            break;
        }
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.factoryId != null)
            message.factoryId = String(object.factoryId);
        if (object.requestDate != null)
            if ($util.Long)
                (message.requestDate = $util.Long.fromValue(object.requestDate)).unsigned = true;
            else if (typeof object.requestDate === "string")
                message.requestDate = parseInt(object.requestDate, 10);
            else if (typeof object.requestDate === "number")
                message.requestDate = object.requestDate;
            else if (typeof object.requestDate === "object")
                message.requestDate = new $util.LongBits(object.requestDate.low >>> 0, object.requestDate.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Request
     * @static
     * @param {Request} message Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.status = options.enums === String ? "UNSET_STATUS" : 0;
            object.standardId = "";
            object.factoryId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.requestDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.requestDate = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.Request.Status[message.status] : message.status;
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.factoryId != null && message.hasOwnProperty("factoryId"))
            object.factoryId = message.factoryId;
        if (message.requestDate != null && message.hasOwnProperty("requestDate"))
            if (typeof message.requestDate === "number")
                object.requestDate = options.longs === String ? String(message.requestDate) : message.requestDate;
            else
                object.requestDate = options.longs === String ? $util.Long.prototype.toString.call(message.requestDate) : options.longs === Number ? new $util.LongBits(message.requestDate.low >>> 0, message.requestDate.high >>> 0).toNumber(true) : message.requestDate;
        return object;
    };

    /**
     * Converts this Request to JSON.
     * @function toJSON
     * @memberof Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Status enum.
     * @name Request.Status
     * @enum {number}
     * @property {number} UNSET_STATUS=0 UNSET_STATUS value
     * @property {number} OPEN=1 OPEN value
     * @property {number} IN_PROGRESS=2 IN_PROGRESS value
     * @property {number} CLOSED=3 CLOSED value
     * @property {number} CERTIFIED=4 CERTIFIED value
     */
    Request.Status = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSET_STATUS"] = 0;
        values[valuesById[1] = "OPEN"] = 1;
        values[valuesById[2] = "IN_PROGRESS"] = 2;
        values[valuesById[3] = "CLOSED"] = 3;
        values[valuesById[4] = "CERTIFIED"] = 4;
        return values;
    })();

    return Request;
})();

$root.RequestContainer = (function() {

    /**
     * Properties of a RequestContainer.
     * @exports IRequestContainer
     * @interface IRequestContainer
     * @property {Array.<IRequest>|null} [entries] RequestContainer entries
     */

    /**
     * Constructs a new RequestContainer.
     * @exports RequestContainer
     * @classdesc Represents a RequestContainer.
     * @implements IRequestContainer
     * @constructor
     * @param {IRequestContainer=} [properties] Properties to set
     */
    function RequestContainer(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RequestContainer entries.
     * @member {Array.<IRequest>} entries
     * @memberof RequestContainer
     * @instance
     */
    RequestContainer.prototype.entries = $util.emptyArray;

    /**
     * Creates a new RequestContainer instance using the specified properties.
     * @function create
     * @memberof RequestContainer
     * @static
     * @param {IRequestContainer=} [properties] Properties to set
     * @returns {RequestContainer} RequestContainer instance
     */
    RequestContainer.create = function create(properties) {
        return new RequestContainer(properties);
    };

    /**
     * Encodes the specified RequestContainer message. Does not implicitly {@link RequestContainer.verify|verify} messages.
     * @function encode
     * @memberof RequestContainer
     * @static
     * @param {IRequestContainer} message RequestContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestContainer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.Request.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RequestContainer message, length delimited. Does not implicitly {@link RequestContainer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RequestContainer
     * @static
     * @param {IRequestContainer} message RequestContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestContainer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RequestContainer message from the specified reader or buffer.
     * @function decode
     * @memberof RequestContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RequestContainer} RequestContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestContainer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RequestContainer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.Request.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RequestContainer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RequestContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RequestContainer} RequestContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestContainer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RequestContainer message.
     * @function verify
     * @memberof RequestContainer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RequestContainer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.Request.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates a RequestContainer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RequestContainer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RequestContainer} RequestContainer
     */
    RequestContainer.fromObject = function fromObject(object) {
        if (object instanceof $root.RequestContainer)
            return object;
        var message = new $root.RequestContainer();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".RequestContainer.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".RequestContainer.entries: object expected");
                message.entries[i] = $root.Request.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a RequestContainer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RequestContainer
     * @static
     * @param {RequestContainer} message RequestContainer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RequestContainer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.Request.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this RequestContainer to JSON.
     * @function toJSON
     * @memberof RequestContainer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RequestContainer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RequestContainer;
})();

$root.Organization = (function() {

    /**
     * Properties of an Organization.
     * @exports IOrganization
     * @interface IOrganization
     * @property {string|null} [id] Organization id
     * @property {string|null} [name] Organization name
     * @property {Array.<Organization.IAuthorization>|null} [authorizations] Organization authorizations
     * @property {Array.<Organization.IContact>|null} [contacts] Organization contacts
     * @property {Organization.Type|null} [organizationType] Organization organizationType
     * @property {ICertifyingBody|null} [certifyingBodyDetails] Organization certifyingBodyDetails
     * @property {IStandardsBody|null} [standardsBodyDetails] Organization standardsBodyDetails
     * @property {IFactory|null} [factoryDetails] Organization factoryDetails
     */

    /**
     * Constructs a new Organization.
     * @exports Organization
     * @classdesc Represents an Organization.
     * @implements IOrganization
     * @constructor
     * @param {IOrganization=} [properties] Properties to set
     */
    function Organization(properties) {
        this.authorizations = [];
        this.contacts = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Organization id.
     * @member {string} id
     * @memberof Organization
     * @instance
     */
    Organization.prototype.id = "";

    /**
     * Organization name.
     * @member {string} name
     * @memberof Organization
     * @instance
     */
    Organization.prototype.name = "";

    /**
     * Organization authorizations.
     * @member {Array.<Organization.IAuthorization>} authorizations
     * @memberof Organization
     * @instance
     */
    Organization.prototype.authorizations = $util.emptyArray;

    /**
     * Organization contacts.
     * @member {Array.<Organization.IContact>} contacts
     * @memberof Organization
     * @instance
     */
    Organization.prototype.contacts = $util.emptyArray;

    /**
     * Organization organizationType.
     * @member {Organization.Type} organizationType
     * @memberof Organization
     * @instance
     */
    Organization.prototype.organizationType = 0;

    /**
     * Organization certifyingBodyDetails.
     * @member {ICertifyingBody|null|undefined} certifyingBodyDetails
     * @memberof Organization
     * @instance
     */
    Organization.prototype.certifyingBodyDetails = null;

    /**
     * Organization standardsBodyDetails.
     * @member {IStandardsBody|null|undefined} standardsBodyDetails
     * @memberof Organization
     * @instance
     */
    Organization.prototype.standardsBodyDetails = null;

    /**
     * Organization factoryDetails.
     * @member {IFactory|null|undefined} factoryDetails
     * @memberof Organization
     * @instance
     */
    Organization.prototype.factoryDetails = null;

    /**
     * Creates a new Organization instance using the specified properties.
     * @function create
     * @memberof Organization
     * @static
     * @param {IOrganization=} [properties] Properties to set
     * @returns {Organization} Organization instance
     */
    Organization.create = function create(properties) {
        return new Organization(properties);
    };

    /**
     * Encodes the specified Organization message. Does not implicitly {@link Organization.verify|verify} messages.
     * @function encode
     * @memberof Organization
     * @static
     * @param {IOrganization} message Organization message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Organization.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.authorizations != null && message.authorizations.length)
            for (var i = 0; i < message.authorizations.length; ++i)
                $root.Organization.Authorization.encode(message.authorizations[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.contacts != null && message.contacts.length)
            for (var i = 0; i < message.contacts.length; ++i)
                $root.Organization.Contact.encode(message.contacts[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.organizationType != null && Object.hasOwnProperty.call(message, "organizationType"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.organizationType);
        if (message.certifyingBodyDetails != null && Object.hasOwnProperty.call(message, "certifyingBodyDetails"))
            $root.CertifyingBody.encode(message.certifyingBodyDetails, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.standardsBodyDetails != null && Object.hasOwnProperty.call(message, "standardsBodyDetails"))
            $root.StandardsBody.encode(message.standardsBodyDetails, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.factoryDetails != null && Object.hasOwnProperty.call(message, "factoryDetails"))
            $root.Factory.encode(message.factoryDetails, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Organization message, length delimited. Does not implicitly {@link Organization.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Organization
     * @static
     * @param {IOrganization} message Organization message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Organization.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Organization message from the specified reader or buffer.
     * @function decode
     * @memberof Organization
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Organization} Organization
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Organization.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Organization();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                if (!(message.authorizations && message.authorizations.length))
                    message.authorizations = [];
                message.authorizations.push($root.Organization.Authorization.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.contacts && message.contacts.length))
                    message.contacts = [];
                message.contacts.push($root.Organization.Contact.decode(reader, reader.uint32()));
                break;
            case 5:
                message.organizationType = reader.int32();
                break;
            case 6:
                message.certifyingBodyDetails = $root.CertifyingBody.decode(reader, reader.uint32());
                break;
            case 7:
                message.standardsBodyDetails = $root.StandardsBody.decode(reader, reader.uint32());
                break;
            case 8:
                message.factoryDetails = $root.Factory.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Organization message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Organization
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Organization} Organization
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Organization.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Organization message.
     * @function verify
     * @memberof Organization
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Organization.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.authorizations != null && message.hasOwnProperty("authorizations")) {
            if (!Array.isArray(message.authorizations))
                return "authorizations: array expected";
            for (var i = 0; i < message.authorizations.length; ++i) {
                var error = $root.Organization.Authorization.verify(message.authorizations[i]);
                if (error)
                    return "authorizations." + error;
            }
        }
        if (message.contacts != null && message.hasOwnProperty("contacts")) {
            if (!Array.isArray(message.contacts))
                return "contacts: array expected";
            for (var i = 0; i < message.contacts.length; ++i) {
                var error = $root.Organization.Contact.verify(message.contacts[i]);
                if (error)
                    return "contacts." + error;
            }
        }
        if (message.organizationType != null && message.hasOwnProperty("organizationType"))
            switch (message.organizationType) {
            default:
                return "organizationType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.certifyingBodyDetails != null && message.hasOwnProperty("certifyingBodyDetails")) {
            var error = $root.CertifyingBody.verify(message.certifyingBodyDetails);
            if (error)
                return "certifyingBodyDetails." + error;
        }
        if (message.standardsBodyDetails != null && message.hasOwnProperty("standardsBodyDetails")) {
            var error = $root.StandardsBody.verify(message.standardsBodyDetails);
            if (error)
                return "standardsBodyDetails." + error;
        }
        if (message.factoryDetails != null && message.hasOwnProperty("factoryDetails")) {
            var error = $root.Factory.verify(message.factoryDetails);
            if (error)
                return "factoryDetails." + error;
        }
        return null;
    };

    /**
     * Creates an Organization message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Organization
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Organization} Organization
     */
    Organization.fromObject = function fromObject(object) {
        if (object instanceof $root.Organization)
            return object;
        var message = new $root.Organization();
        if (object.id != null)
            message.id = String(object.id);
        if (object.name != null)
            message.name = String(object.name);
        if (object.authorizations) {
            if (!Array.isArray(object.authorizations))
                throw TypeError(".Organization.authorizations: array expected");
            message.authorizations = [];
            for (var i = 0; i < object.authorizations.length; ++i) {
                if (typeof object.authorizations[i] !== "object")
                    throw TypeError(".Organization.authorizations: object expected");
                message.authorizations[i] = $root.Organization.Authorization.fromObject(object.authorizations[i]);
            }
        }
        if (object.contacts) {
            if (!Array.isArray(object.contacts))
                throw TypeError(".Organization.contacts: array expected");
            message.contacts = [];
            for (var i = 0; i < object.contacts.length; ++i) {
                if (typeof object.contacts[i] !== "object")
                    throw TypeError(".Organization.contacts: object expected");
                message.contacts[i] = $root.Organization.Contact.fromObject(object.contacts[i]);
            }
        }
        switch (object.organizationType) {
        case "UNSET_TYPE":
        case 0:
            message.organizationType = 0;
            break;
        case "CERTIFYING_BODY":
        case 1:
            message.organizationType = 1;
            break;
        case "STANDARDS_BODY":
        case 2:
            message.organizationType = 2;
            break;
        case "FACTORY":
        case 3:
            message.organizationType = 3;
            break;
        }
        if (object.certifyingBodyDetails != null) {
            if (typeof object.certifyingBodyDetails !== "object")
                throw TypeError(".Organization.certifyingBodyDetails: object expected");
            message.certifyingBodyDetails = $root.CertifyingBody.fromObject(object.certifyingBodyDetails);
        }
        if (object.standardsBodyDetails != null) {
            if (typeof object.standardsBodyDetails !== "object")
                throw TypeError(".Organization.standardsBodyDetails: object expected");
            message.standardsBodyDetails = $root.StandardsBody.fromObject(object.standardsBodyDetails);
        }
        if (object.factoryDetails != null) {
            if (typeof object.factoryDetails !== "object")
                throw TypeError(".Organization.factoryDetails: object expected");
            message.factoryDetails = $root.Factory.fromObject(object.factoryDetails);
        }
        return message;
    };

    /**
     * Creates a plain object from an Organization message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Organization
     * @static
     * @param {Organization} message Organization
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Organization.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.authorizations = [];
            object.contacts = [];
        }
        if (options.defaults) {
            object.id = "";
            object.name = "";
            object.organizationType = options.enums === String ? "UNSET_TYPE" : 0;
            object.certifyingBodyDetails = null;
            object.standardsBodyDetails = null;
            object.factoryDetails = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.authorizations && message.authorizations.length) {
            object.authorizations = [];
            for (var j = 0; j < message.authorizations.length; ++j)
                object.authorizations[j] = $root.Organization.Authorization.toObject(message.authorizations[j], options);
        }
        if (message.contacts && message.contacts.length) {
            object.contacts = [];
            for (var j = 0; j < message.contacts.length; ++j)
                object.contacts[j] = $root.Organization.Contact.toObject(message.contacts[j], options);
        }
        if (message.organizationType != null && message.hasOwnProperty("organizationType"))
            object.organizationType = options.enums === String ? $root.Organization.Type[message.organizationType] : message.organizationType;
        if (message.certifyingBodyDetails != null && message.hasOwnProperty("certifyingBodyDetails"))
            object.certifyingBodyDetails = $root.CertifyingBody.toObject(message.certifyingBodyDetails, options);
        if (message.standardsBodyDetails != null && message.hasOwnProperty("standardsBodyDetails"))
            object.standardsBodyDetails = $root.StandardsBody.toObject(message.standardsBodyDetails, options);
        if (message.factoryDetails != null && message.hasOwnProperty("factoryDetails"))
            object.factoryDetails = $root.Factory.toObject(message.factoryDetails, options);
        return object;
    };

    /**
     * Converts this Organization to JSON.
     * @function toJSON
     * @memberof Organization
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Organization.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Type enum.
     * @name Organization.Type
     * @enum {number}
     * @property {number} UNSET_TYPE=0 UNSET_TYPE value
     * @property {number} CERTIFYING_BODY=1 CERTIFYING_BODY value
     * @property {number} STANDARDS_BODY=2 STANDARDS_BODY value
     * @property {number} FACTORY=3 FACTORY value
     */
    Organization.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSET_TYPE"] = 0;
        values[valuesById[1] = "CERTIFYING_BODY"] = 1;
        values[valuesById[2] = "STANDARDS_BODY"] = 2;
        values[valuesById[3] = "FACTORY"] = 3;
        return values;
    })();

    Organization.Authorization = (function() {

        /**
         * Properties of an Authorization.
         * @memberof Organization
         * @interface IAuthorization
         * @property {string|null} [publicKey] Authorization publicKey
         * @property {Organization.Authorization.Role|null} [role] Authorization role
         */

        /**
         * Constructs a new Authorization.
         * @memberof Organization
         * @classdesc Represents an Authorization.
         * @implements IAuthorization
         * @constructor
         * @param {Organization.IAuthorization=} [properties] Properties to set
         */
        function Authorization(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Authorization publicKey.
         * @member {string} publicKey
         * @memberof Organization.Authorization
         * @instance
         */
        Authorization.prototype.publicKey = "";

        /**
         * Authorization role.
         * @member {Organization.Authorization.Role} role
         * @memberof Organization.Authorization
         * @instance
         */
        Authorization.prototype.role = 0;

        /**
         * Creates a new Authorization instance using the specified properties.
         * @function create
         * @memberof Organization.Authorization
         * @static
         * @param {Organization.IAuthorization=} [properties] Properties to set
         * @returns {Organization.Authorization} Authorization instance
         */
        Authorization.create = function create(properties) {
            return new Authorization(properties);
        };

        /**
         * Encodes the specified Authorization message. Does not implicitly {@link Organization.Authorization.verify|verify} messages.
         * @function encode
         * @memberof Organization.Authorization
         * @static
         * @param {Organization.IAuthorization} message Authorization message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Authorization.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.publicKey);
            if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.role);
            return writer;
        };

        /**
         * Encodes the specified Authorization message, length delimited. Does not implicitly {@link Organization.Authorization.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Organization.Authorization
         * @static
         * @param {Organization.IAuthorization} message Authorization message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Authorization.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Authorization message from the specified reader or buffer.
         * @function decode
         * @memberof Organization.Authorization
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Organization.Authorization} Authorization
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Authorization.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Organization.Authorization();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.publicKey = reader.string();
                    break;
                case 2:
                    message.role = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Authorization message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Organization.Authorization
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Organization.Authorization} Authorization
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Authorization.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Authorization message.
         * @function verify
         * @memberof Organization.Authorization
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Authorization.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                if (!$util.isString(message.publicKey))
                    return "publicKey: string expected";
            if (message.role != null && message.hasOwnProperty("role"))
                switch (message.role) {
                default:
                    return "role: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates an Authorization message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Organization.Authorization
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Organization.Authorization} Authorization
         */
        Authorization.fromObject = function fromObject(object) {
            if (object instanceof $root.Organization.Authorization)
                return object;
            var message = new $root.Organization.Authorization();
            if (object.publicKey != null)
                message.publicKey = String(object.publicKey);
            switch (object.role) {
            case "UNSET_ROLE":
            case 0:
                message.role = 0;
                break;
            case "ADMIN":
            case 1:
                message.role = 1;
                break;
            case "TRANSACTOR":
            case 2:
                message.role = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an Authorization message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Organization.Authorization
         * @static
         * @param {Organization.Authorization} message Authorization
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Authorization.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.publicKey = "";
                object.role = options.enums === String ? "UNSET_ROLE" : 0;
            }
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                object.publicKey = message.publicKey;
            if (message.role != null && message.hasOwnProperty("role"))
                object.role = options.enums === String ? $root.Organization.Authorization.Role[message.role] : message.role;
            return object;
        };

        /**
         * Converts this Authorization to JSON.
         * @function toJSON
         * @memberof Organization.Authorization
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Authorization.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Role enum.
         * @name Organization.Authorization.Role
         * @enum {number}
         * @property {number} UNSET_ROLE=0 UNSET_ROLE value
         * @property {number} ADMIN=1 ADMIN value
         * @property {number} TRANSACTOR=2 TRANSACTOR value
         */
        Authorization.Role = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNSET_ROLE"] = 0;
            values[valuesById[1] = "ADMIN"] = 1;
            values[valuesById[2] = "TRANSACTOR"] = 2;
            return values;
        })();

        return Authorization;
    })();

    Organization.Contact = (function() {

        /**
         * Properties of a Contact.
         * @memberof Organization
         * @interface IContact
         * @property {string|null} [name] Contact name
         * @property {string|null} [phoneNumber] Contact phoneNumber
         * @property {string|null} [languageCode] Contact languageCode
         */

        /**
         * Constructs a new Contact.
         * @memberof Organization
         * @classdesc Represents a Contact.
         * @implements IContact
         * @constructor
         * @param {Organization.IContact=} [properties] Properties to set
         */
        function Contact(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Contact name.
         * @member {string} name
         * @memberof Organization.Contact
         * @instance
         */
        Contact.prototype.name = "";

        /**
         * Contact phoneNumber.
         * @member {string} phoneNumber
         * @memberof Organization.Contact
         * @instance
         */
        Contact.prototype.phoneNumber = "";

        /**
         * Contact languageCode.
         * @member {string} languageCode
         * @memberof Organization.Contact
         * @instance
         */
        Contact.prototype.languageCode = "";

        /**
         * Creates a new Contact instance using the specified properties.
         * @function create
         * @memberof Organization.Contact
         * @static
         * @param {Organization.IContact=} [properties] Properties to set
         * @returns {Organization.Contact} Contact instance
         */
        Contact.create = function create(properties) {
            return new Contact(properties);
        };

        /**
         * Encodes the specified Contact message. Does not implicitly {@link Organization.Contact.verify|verify} messages.
         * @function encode
         * @memberof Organization.Contact
         * @static
         * @param {Organization.IContact} message Contact message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Contact.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.phoneNumber != null && Object.hasOwnProperty.call(message, "phoneNumber"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.phoneNumber);
            if (message.languageCode != null && Object.hasOwnProperty.call(message, "languageCode"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.languageCode);
            return writer;
        };

        /**
         * Encodes the specified Contact message, length delimited. Does not implicitly {@link Organization.Contact.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Organization.Contact
         * @static
         * @param {Organization.IContact} message Contact message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Contact.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Contact message from the specified reader or buffer.
         * @function decode
         * @memberof Organization.Contact
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Organization.Contact} Contact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Contact.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Organization.Contact();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.phoneNumber = reader.string();
                    break;
                case 3:
                    message.languageCode = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Contact message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Organization.Contact
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Organization.Contact} Contact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Contact.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Contact message.
         * @function verify
         * @memberof Organization.Contact
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Contact.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.phoneNumber != null && message.hasOwnProperty("phoneNumber"))
                if (!$util.isString(message.phoneNumber))
                    return "phoneNumber: string expected";
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                if (!$util.isString(message.languageCode))
                    return "languageCode: string expected";
            return null;
        };

        /**
         * Creates a Contact message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Organization.Contact
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Organization.Contact} Contact
         */
        Contact.fromObject = function fromObject(object) {
            if (object instanceof $root.Organization.Contact)
                return object;
            var message = new $root.Organization.Contact();
            if (object.name != null)
                message.name = String(object.name);
            if (object.phoneNumber != null)
                message.phoneNumber = String(object.phoneNumber);
            if (object.languageCode != null)
                message.languageCode = String(object.languageCode);
            return message;
        };

        /**
         * Creates a plain object from a Contact message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Organization.Contact
         * @static
         * @param {Organization.Contact} message Contact
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Contact.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.phoneNumber = "";
                object.languageCode = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.phoneNumber != null && message.hasOwnProperty("phoneNumber"))
                object.phoneNumber = message.phoneNumber;
            if (message.languageCode != null && message.hasOwnProperty("languageCode"))
                object.languageCode = message.languageCode;
            return object;
        };

        /**
         * Converts this Contact to JSON.
         * @function toJSON
         * @memberof Organization.Contact
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Contact.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Contact;
    })();

    return Organization;
})();

$root.CertifyingBody = (function() {

    /**
     * Properties of a CertifyingBody.
     * @exports ICertifyingBody
     * @interface ICertifyingBody
     * @property {Array.<CertifyingBody.IAccreditation>|null} [accreditations] CertifyingBody accreditations
     */

    /**
     * Constructs a new CertifyingBody.
     * @exports CertifyingBody
     * @classdesc Represents a CertifyingBody.
     * @implements ICertifyingBody
     * @constructor
     * @param {ICertifyingBody=} [properties] Properties to set
     */
    function CertifyingBody(properties) {
        this.accreditations = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CertifyingBody accreditations.
     * @member {Array.<CertifyingBody.IAccreditation>} accreditations
     * @memberof CertifyingBody
     * @instance
     */
    CertifyingBody.prototype.accreditations = $util.emptyArray;

    /**
     * Creates a new CertifyingBody instance using the specified properties.
     * @function create
     * @memberof CertifyingBody
     * @static
     * @param {ICertifyingBody=} [properties] Properties to set
     * @returns {CertifyingBody} CertifyingBody instance
     */
    CertifyingBody.create = function create(properties) {
        return new CertifyingBody(properties);
    };

    /**
     * Encodes the specified CertifyingBody message. Does not implicitly {@link CertifyingBody.verify|verify} messages.
     * @function encode
     * @memberof CertifyingBody
     * @static
     * @param {ICertifyingBody} message CertifyingBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CertifyingBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.accreditations != null && message.accreditations.length)
            for (var i = 0; i < message.accreditations.length; ++i)
                $root.CertifyingBody.Accreditation.encode(message.accreditations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CertifyingBody message, length delimited. Does not implicitly {@link CertifyingBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CertifyingBody
     * @static
     * @param {ICertifyingBody} message CertifyingBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CertifyingBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CertifyingBody message from the specified reader or buffer.
     * @function decode
     * @memberof CertifyingBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CertifyingBody} CertifyingBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CertifyingBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CertifyingBody();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.accreditations && message.accreditations.length))
                    message.accreditations = [];
                message.accreditations.push($root.CertifyingBody.Accreditation.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CertifyingBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CertifyingBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CertifyingBody} CertifyingBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CertifyingBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CertifyingBody message.
     * @function verify
     * @memberof CertifyingBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CertifyingBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.accreditations != null && message.hasOwnProperty("accreditations")) {
            if (!Array.isArray(message.accreditations))
                return "accreditations: array expected";
            for (var i = 0; i < message.accreditations.length; ++i) {
                var error = $root.CertifyingBody.Accreditation.verify(message.accreditations[i]);
                if (error)
                    return "accreditations." + error;
            }
        }
        return null;
    };

    /**
     * Creates a CertifyingBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CertifyingBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CertifyingBody} CertifyingBody
     */
    CertifyingBody.fromObject = function fromObject(object) {
        if (object instanceof $root.CertifyingBody)
            return object;
        var message = new $root.CertifyingBody();
        if (object.accreditations) {
            if (!Array.isArray(object.accreditations))
                throw TypeError(".CertifyingBody.accreditations: array expected");
            message.accreditations = [];
            for (var i = 0; i < object.accreditations.length; ++i) {
                if (typeof object.accreditations[i] !== "object")
                    throw TypeError(".CertifyingBody.accreditations: object expected");
                message.accreditations[i] = $root.CertifyingBody.Accreditation.fromObject(object.accreditations[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a CertifyingBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CertifyingBody
     * @static
     * @param {CertifyingBody} message CertifyingBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CertifyingBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.accreditations = [];
        if (message.accreditations && message.accreditations.length) {
            object.accreditations = [];
            for (var j = 0; j < message.accreditations.length; ++j)
                object.accreditations[j] = $root.CertifyingBody.Accreditation.toObject(message.accreditations[j], options);
        }
        return object;
    };

    /**
     * Converts this CertifyingBody to JSON.
     * @function toJSON
     * @memberof CertifyingBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CertifyingBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    CertifyingBody.Accreditation = (function() {

        /**
         * Properties of an Accreditation.
         * @memberof CertifyingBody
         * @interface IAccreditation
         * @property {string|null} [standardId] Accreditation standardId
         * @property {string|null} [standardVersion] Accreditation standardVersion
         * @property {string|null} [accreditorId] Accreditation accreditorId
         * @property {number|Long|null} [validFrom] Accreditation validFrom
         * @property {number|Long|null} [validTo] Accreditation validTo
         */

        /**
         * Constructs a new Accreditation.
         * @memberof CertifyingBody
         * @classdesc Represents an Accreditation.
         * @implements IAccreditation
         * @constructor
         * @param {CertifyingBody.IAccreditation=} [properties] Properties to set
         */
        function Accreditation(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Accreditation standardId.
         * @member {string} standardId
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.standardId = "";

        /**
         * Accreditation standardVersion.
         * @member {string} standardVersion
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.standardVersion = "";

        /**
         * Accreditation accreditorId.
         * @member {string} accreditorId
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.accreditorId = "";

        /**
         * Accreditation validFrom.
         * @member {number|Long} validFrom
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.validFrom = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Accreditation validTo.
         * @member {number|Long} validTo
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.validTo = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Accreditation instance using the specified properties.
         * @function create
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {CertifyingBody.IAccreditation=} [properties] Properties to set
         * @returns {CertifyingBody.Accreditation} Accreditation instance
         */
        Accreditation.create = function create(properties) {
            return new Accreditation(properties);
        };

        /**
         * Encodes the specified Accreditation message. Does not implicitly {@link CertifyingBody.Accreditation.verify|verify} messages.
         * @function encode
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {CertifyingBody.IAccreditation} message Accreditation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Accreditation.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.standardId);
            if (message.standardVersion != null && Object.hasOwnProperty.call(message, "standardVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.standardVersion);
            if (message.accreditorId != null && Object.hasOwnProperty.call(message, "accreditorId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.accreditorId);
            if (message.validFrom != null && Object.hasOwnProperty.call(message, "validFrom"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.validFrom);
            if (message.validTo != null && Object.hasOwnProperty.call(message, "validTo"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.validTo);
            return writer;
        };

        /**
         * Encodes the specified Accreditation message, length delimited. Does not implicitly {@link CertifyingBody.Accreditation.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {CertifyingBody.IAccreditation} message Accreditation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Accreditation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Accreditation message from the specified reader or buffer.
         * @function decode
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CertifyingBody.Accreditation} Accreditation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Accreditation.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CertifyingBody.Accreditation();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.standardId = reader.string();
                    break;
                case 2:
                    message.standardVersion = reader.string();
                    break;
                case 3:
                    message.accreditorId = reader.string();
                    break;
                case 4:
                    message.validFrom = reader.uint64();
                    break;
                case 5:
                    message.validTo = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Accreditation message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CertifyingBody.Accreditation} Accreditation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Accreditation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Accreditation message.
         * @function verify
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Accreditation.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.standardId != null && message.hasOwnProperty("standardId"))
                if (!$util.isString(message.standardId))
                    return "standardId: string expected";
            if (message.standardVersion != null && message.hasOwnProperty("standardVersion"))
                if (!$util.isString(message.standardVersion))
                    return "standardVersion: string expected";
            if (message.accreditorId != null && message.hasOwnProperty("accreditorId"))
                if (!$util.isString(message.accreditorId))
                    return "accreditorId: string expected";
            if (message.validFrom != null && message.hasOwnProperty("validFrom"))
                if (!$util.isInteger(message.validFrom) && !(message.validFrom && $util.isInteger(message.validFrom.low) && $util.isInteger(message.validFrom.high)))
                    return "validFrom: integer|Long expected";
            if (message.validTo != null && message.hasOwnProperty("validTo"))
                if (!$util.isInteger(message.validTo) && !(message.validTo && $util.isInteger(message.validTo.low) && $util.isInteger(message.validTo.high)))
                    return "validTo: integer|Long expected";
            return null;
        };

        /**
         * Creates an Accreditation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CertifyingBody.Accreditation} Accreditation
         */
        Accreditation.fromObject = function fromObject(object) {
            if (object instanceof $root.CertifyingBody.Accreditation)
                return object;
            var message = new $root.CertifyingBody.Accreditation();
            if (object.standardId != null)
                message.standardId = String(object.standardId);
            if (object.standardVersion != null)
                message.standardVersion = String(object.standardVersion);
            if (object.accreditorId != null)
                message.accreditorId = String(object.accreditorId);
            if (object.validFrom != null)
                if ($util.Long)
                    (message.validFrom = $util.Long.fromValue(object.validFrom)).unsigned = true;
                else if (typeof object.validFrom === "string")
                    message.validFrom = parseInt(object.validFrom, 10);
                else if (typeof object.validFrom === "number")
                    message.validFrom = object.validFrom;
                else if (typeof object.validFrom === "object")
                    message.validFrom = new $util.LongBits(object.validFrom.low >>> 0, object.validFrom.high >>> 0).toNumber(true);
            if (object.validTo != null)
                if ($util.Long)
                    (message.validTo = $util.Long.fromValue(object.validTo)).unsigned = true;
                else if (typeof object.validTo === "string")
                    message.validTo = parseInt(object.validTo, 10);
                else if (typeof object.validTo === "number")
                    message.validTo = object.validTo;
                else if (typeof object.validTo === "object")
                    message.validTo = new $util.LongBits(object.validTo.low >>> 0, object.validTo.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an Accreditation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CertifyingBody.Accreditation
         * @static
         * @param {CertifyingBody.Accreditation} message Accreditation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Accreditation.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.standardId = "";
                object.standardVersion = "";
                object.accreditorId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.validFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.validFrom = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.validTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.validTo = options.longs === String ? "0" : 0;
            }
            if (message.standardId != null && message.hasOwnProperty("standardId"))
                object.standardId = message.standardId;
            if (message.standardVersion != null && message.hasOwnProperty("standardVersion"))
                object.standardVersion = message.standardVersion;
            if (message.accreditorId != null && message.hasOwnProperty("accreditorId"))
                object.accreditorId = message.accreditorId;
            if (message.validFrom != null && message.hasOwnProperty("validFrom"))
                if (typeof message.validFrom === "number")
                    object.validFrom = options.longs === String ? String(message.validFrom) : message.validFrom;
                else
                    object.validFrom = options.longs === String ? $util.Long.prototype.toString.call(message.validFrom) : options.longs === Number ? new $util.LongBits(message.validFrom.low >>> 0, message.validFrom.high >>> 0).toNumber(true) : message.validFrom;
            if (message.validTo != null && message.hasOwnProperty("validTo"))
                if (typeof message.validTo === "number")
                    object.validTo = options.longs === String ? String(message.validTo) : message.validTo;
                else
                    object.validTo = options.longs === String ? $util.Long.prototype.toString.call(message.validTo) : options.longs === Number ? new $util.LongBits(message.validTo.low >>> 0, message.validTo.high >>> 0).toNumber(true) : message.validTo;
            return object;
        };

        /**
         * Converts this Accreditation to JSON.
         * @function toJSON
         * @memberof CertifyingBody.Accreditation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Accreditation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Accreditation;
    })();

    return CertifyingBody;
})();

$root.StandardsBody = (function() {

    /**
     * Properties of a StandardsBody.
     * @exports IStandardsBody
     * @interface IStandardsBody
     */

    /**
     * Constructs a new StandardsBody.
     * @exports StandardsBody
     * @classdesc Represents a StandardsBody.
     * @implements IStandardsBody
     * @constructor
     * @param {IStandardsBody=} [properties] Properties to set
     */
    function StandardsBody(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new StandardsBody instance using the specified properties.
     * @function create
     * @memberof StandardsBody
     * @static
     * @param {IStandardsBody=} [properties] Properties to set
     * @returns {StandardsBody} StandardsBody instance
     */
    StandardsBody.create = function create(properties) {
        return new StandardsBody(properties);
    };

    /**
     * Encodes the specified StandardsBody message. Does not implicitly {@link StandardsBody.verify|verify} messages.
     * @function encode
     * @memberof StandardsBody
     * @static
     * @param {IStandardsBody} message StandardsBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StandardsBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified StandardsBody message, length delimited. Does not implicitly {@link StandardsBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StandardsBody
     * @static
     * @param {IStandardsBody} message StandardsBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StandardsBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StandardsBody message from the specified reader or buffer.
     * @function decode
     * @memberof StandardsBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StandardsBody} StandardsBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StandardsBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.StandardsBody();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StandardsBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StandardsBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StandardsBody} StandardsBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StandardsBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StandardsBody message.
     * @function verify
     * @memberof StandardsBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StandardsBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a StandardsBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StandardsBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StandardsBody} StandardsBody
     */
    StandardsBody.fromObject = function fromObject(object) {
        if (object instanceof $root.StandardsBody)
            return object;
        return new $root.StandardsBody();
    };

    /**
     * Creates a plain object from a StandardsBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StandardsBody
     * @static
     * @param {StandardsBody} message StandardsBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StandardsBody.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this StandardsBody to JSON.
     * @function toJSON
     * @memberof StandardsBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StandardsBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StandardsBody;
})();

$root.Factory = (function() {

    /**
     * Properties of a Factory.
     * @exports IFactory
     * @interface IFactory
     * @property {Factory.IAddress|null} [address] Factory address
     */

    /**
     * Constructs a new Factory.
     * @exports Factory
     * @classdesc Represents a Factory.
     * @implements IFactory
     * @constructor
     * @param {IFactory=} [properties] Properties to set
     */
    function Factory(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Factory address.
     * @member {Factory.IAddress|null|undefined} address
     * @memberof Factory
     * @instance
     */
    Factory.prototype.address = null;

    /**
     * Creates a new Factory instance using the specified properties.
     * @function create
     * @memberof Factory
     * @static
     * @param {IFactory=} [properties] Properties to set
     * @returns {Factory} Factory instance
     */
    Factory.create = function create(properties) {
        return new Factory(properties);
    };

    /**
     * Encodes the specified Factory message. Does not implicitly {@link Factory.verify|verify} messages.
     * @function encode
     * @memberof Factory
     * @static
     * @param {IFactory} message Factory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Factory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.address != null && Object.hasOwnProperty.call(message, "address"))
            $root.Factory.Address.encode(message.address, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Factory message, length delimited. Does not implicitly {@link Factory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Factory
     * @static
     * @param {IFactory} message Factory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Factory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Factory message from the specified reader or buffer.
     * @function decode
     * @memberof Factory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Factory} Factory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Factory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Factory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.address = $root.Factory.Address.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Factory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Factory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Factory} Factory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Factory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Factory message.
     * @function verify
     * @memberof Factory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Factory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.address != null && message.hasOwnProperty("address")) {
            var error = $root.Factory.Address.verify(message.address);
            if (error)
                return "address." + error;
        }
        return null;
    };

    /**
     * Creates a Factory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Factory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Factory} Factory
     */
    Factory.fromObject = function fromObject(object) {
        if (object instanceof $root.Factory)
            return object;
        var message = new $root.Factory();
        if (object.address != null) {
            if (typeof object.address !== "object")
                throw TypeError(".Factory.address: object expected");
            message.address = $root.Factory.Address.fromObject(object.address);
        }
        return message;
    };

    /**
     * Creates a plain object from a Factory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Factory
     * @static
     * @param {Factory} message Factory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Factory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.address = null;
        if (message.address != null && message.hasOwnProperty("address"))
            object.address = $root.Factory.Address.toObject(message.address, options);
        return object;
    };

    /**
     * Converts this Factory to JSON.
     * @function toJSON
     * @memberof Factory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Factory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Factory.Address = (function() {

        /**
         * Properties of an Address.
         * @memberof Factory
         * @interface IAddress
         * @property {string|null} [streetLine_1] Address streetLine_1
         * @property {string|null} [streetLine_2] Address streetLine_2
         * @property {string|null} [city] Address city
         * @property {string|null} [stateProvince] Address stateProvince
         * @property {string|null} [country] Address country
         * @property {string|null} [postalCode] Address postalCode
         */

        /**
         * Constructs a new Address.
         * @memberof Factory
         * @classdesc Represents an Address.
         * @implements IAddress
         * @constructor
         * @param {Factory.IAddress=} [properties] Properties to set
         */
        function Address(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Address streetLine_1.
         * @member {string} streetLine_1
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.streetLine_1 = "";

        /**
         * Address streetLine_2.
         * @member {string} streetLine_2
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.streetLine_2 = "";

        /**
         * Address city.
         * @member {string} city
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.city = "";

        /**
         * Address stateProvince.
         * @member {string} stateProvince
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.stateProvince = "";

        /**
         * Address country.
         * @member {string} country
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.country = "";

        /**
         * Address postalCode.
         * @member {string} postalCode
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.postalCode = "";

        /**
         * Creates a new Address instance using the specified properties.
         * @function create
         * @memberof Factory.Address
         * @static
         * @param {Factory.IAddress=} [properties] Properties to set
         * @returns {Factory.Address} Address instance
         */
        Address.create = function create(properties) {
            return new Address(properties);
        };

        /**
         * Encodes the specified Address message. Does not implicitly {@link Factory.Address.verify|verify} messages.
         * @function encode
         * @memberof Factory.Address
         * @static
         * @param {Factory.IAddress} message Address message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Address.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streetLine_1 != null && Object.hasOwnProperty.call(message, "streetLine_1"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.streetLine_1);
            if (message.streetLine_2 != null && Object.hasOwnProperty.call(message, "streetLine_2"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.streetLine_2);
            if (message.city != null && Object.hasOwnProperty.call(message, "city"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.city);
            if (message.stateProvince != null && Object.hasOwnProperty.call(message, "stateProvince"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.stateProvince);
            if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.country);
            if (message.postalCode != null && Object.hasOwnProperty.call(message, "postalCode"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.postalCode);
            return writer;
        };

        /**
         * Encodes the specified Address message, length delimited. Does not implicitly {@link Factory.Address.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Factory.Address
         * @static
         * @param {Factory.IAddress} message Address message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Address.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Address message from the specified reader or buffer.
         * @function decode
         * @memberof Factory.Address
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Factory.Address} Address
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Address.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Factory.Address();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.streetLine_1 = reader.string();
                    break;
                case 2:
                    message.streetLine_2 = reader.string();
                    break;
                case 3:
                    message.city = reader.string();
                    break;
                case 4:
                    message.stateProvince = reader.string();
                    break;
                case 5:
                    message.country = reader.string();
                    break;
                case 6:
                    message.postalCode = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Address message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Factory.Address
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Factory.Address} Address
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Address.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Address message.
         * @function verify
         * @memberof Factory.Address
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Address.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.streetLine_1 != null && message.hasOwnProperty("streetLine_1"))
                if (!$util.isString(message.streetLine_1))
                    return "streetLine_1: string expected";
            if (message.streetLine_2 != null && message.hasOwnProperty("streetLine_2"))
                if (!$util.isString(message.streetLine_2))
                    return "streetLine_2: string expected";
            if (message.city != null && message.hasOwnProperty("city"))
                if (!$util.isString(message.city))
                    return "city: string expected";
            if (message.stateProvince != null && message.hasOwnProperty("stateProvince"))
                if (!$util.isString(message.stateProvince))
                    return "stateProvince: string expected";
            if (message.country != null && message.hasOwnProperty("country"))
                if (!$util.isString(message.country))
                    return "country: string expected";
            if (message.postalCode != null && message.hasOwnProperty("postalCode"))
                if (!$util.isString(message.postalCode))
                    return "postalCode: string expected";
            return null;
        };

        /**
         * Creates an Address message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Factory.Address
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Factory.Address} Address
         */
        Address.fromObject = function fromObject(object) {
            if (object instanceof $root.Factory.Address)
                return object;
            var message = new $root.Factory.Address();
            if (object.streetLine_1 != null)
                message.streetLine_1 = String(object.streetLine_1);
            if (object.streetLine_2 != null)
                message.streetLine_2 = String(object.streetLine_2);
            if (object.city != null)
                message.city = String(object.city);
            if (object.stateProvince != null)
                message.stateProvince = String(object.stateProvince);
            if (object.country != null)
                message.country = String(object.country);
            if (object.postalCode != null)
                message.postalCode = String(object.postalCode);
            return message;
        };

        /**
         * Creates a plain object from an Address message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Factory.Address
         * @static
         * @param {Factory.Address} message Address
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Address.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.streetLine_1 = "";
                object.streetLine_2 = "";
                object.city = "";
                object.stateProvince = "";
                object.country = "";
                object.postalCode = "";
            }
            if (message.streetLine_1 != null && message.hasOwnProperty("streetLine_1"))
                object.streetLine_1 = message.streetLine_1;
            if (message.streetLine_2 != null && message.hasOwnProperty("streetLine_2"))
                object.streetLine_2 = message.streetLine_2;
            if (message.city != null && message.hasOwnProperty("city"))
                object.city = message.city;
            if (message.stateProvince != null && message.hasOwnProperty("stateProvince"))
                object.stateProvince = message.stateProvince;
            if (message.country != null && message.hasOwnProperty("country"))
                object.country = message.country;
            if (message.postalCode != null && message.hasOwnProperty("postalCode"))
                object.postalCode = message.postalCode;
            return object;
        };

        /**
         * Converts this Address to JSON.
         * @function toJSON
         * @memberof Factory.Address
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Address.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Address;
    })();

    return Factory;
})();

$root.OrganizationContainer = (function() {

    /**
     * Properties of an OrganizationContainer.
     * @exports IOrganizationContainer
     * @interface IOrganizationContainer
     * @property {Array.<IOrganization>|null} [entries] OrganizationContainer entries
     */

    /**
     * Constructs a new OrganizationContainer.
     * @exports OrganizationContainer
     * @classdesc Represents an OrganizationContainer.
     * @implements IOrganizationContainer
     * @constructor
     * @param {IOrganizationContainer=} [properties] Properties to set
     */
    function OrganizationContainer(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrganizationContainer entries.
     * @member {Array.<IOrganization>} entries
     * @memberof OrganizationContainer
     * @instance
     */
    OrganizationContainer.prototype.entries = $util.emptyArray;

    /**
     * Creates a new OrganizationContainer instance using the specified properties.
     * @function create
     * @memberof OrganizationContainer
     * @static
     * @param {IOrganizationContainer=} [properties] Properties to set
     * @returns {OrganizationContainer} OrganizationContainer instance
     */
    OrganizationContainer.create = function create(properties) {
        return new OrganizationContainer(properties);
    };

    /**
     * Encodes the specified OrganizationContainer message. Does not implicitly {@link OrganizationContainer.verify|verify} messages.
     * @function encode
     * @memberof OrganizationContainer
     * @static
     * @param {IOrganizationContainer} message OrganizationContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrganizationContainer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.Organization.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified OrganizationContainer message, length delimited. Does not implicitly {@link OrganizationContainer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrganizationContainer
     * @static
     * @param {IOrganizationContainer} message OrganizationContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrganizationContainer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrganizationContainer message from the specified reader or buffer.
     * @function decode
     * @memberof OrganizationContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrganizationContainer} OrganizationContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrganizationContainer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrganizationContainer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.Organization.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrganizationContainer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrganizationContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrganizationContainer} OrganizationContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrganizationContainer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrganizationContainer message.
     * @function verify
     * @memberof OrganizationContainer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrganizationContainer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.Organization.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates an OrganizationContainer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrganizationContainer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrganizationContainer} OrganizationContainer
     */
    OrganizationContainer.fromObject = function fromObject(object) {
        if (object instanceof $root.OrganizationContainer)
            return object;
        var message = new $root.OrganizationContainer();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".OrganizationContainer.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".OrganizationContainer.entries: object expected");
                message.entries[i] = $root.Organization.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an OrganizationContainer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrganizationContainer
     * @static
     * @param {OrganizationContainer} message OrganizationContainer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrganizationContainer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.Organization.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this OrganizationContainer to JSON.
     * @function toJSON
     * @memberof OrganizationContainer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrganizationContainer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return OrganizationContainer;
})();

$root.Standard = (function() {

    /**
     * Properties of a Standard.
     * @exports IStandard
     * @interface IStandard
     * @property {string|null} [id] Standard id
     * @property {string|null} [organizationId] Standard organizationId
     * @property {string|null} [name] Standard name
     * @property {Array.<Standard.IStandardVersion>|null} [versions] Standard versions
     */

    /**
     * Constructs a new Standard.
     * @exports Standard
     * @classdesc Represents a Standard.
     * @implements IStandard
     * @constructor
     * @param {IStandard=} [properties] Properties to set
     */
    function Standard(properties) {
        this.versions = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Standard id.
     * @member {string} id
     * @memberof Standard
     * @instance
     */
    Standard.prototype.id = "";

    /**
     * Standard organizationId.
     * @member {string} organizationId
     * @memberof Standard
     * @instance
     */
    Standard.prototype.organizationId = "";

    /**
     * Standard name.
     * @member {string} name
     * @memberof Standard
     * @instance
     */
    Standard.prototype.name = "";

    /**
     * Standard versions.
     * @member {Array.<Standard.IStandardVersion>} versions
     * @memberof Standard
     * @instance
     */
    Standard.prototype.versions = $util.emptyArray;

    /**
     * Creates a new Standard instance using the specified properties.
     * @function create
     * @memberof Standard
     * @static
     * @param {IStandard=} [properties] Properties to set
     * @returns {Standard} Standard instance
     */
    Standard.create = function create(properties) {
        return new Standard(properties);
    };

    /**
     * Encodes the specified Standard message. Does not implicitly {@link Standard.verify|verify} messages.
     * @function encode
     * @memberof Standard
     * @static
     * @param {IStandard} message Standard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Standard.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.organizationId != null && Object.hasOwnProperty.call(message, "organizationId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.organizationId);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        if (message.versions != null && message.versions.length)
            for (var i = 0; i < message.versions.length; ++i)
                $root.Standard.StandardVersion.encode(message.versions[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Standard message, length delimited. Does not implicitly {@link Standard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Standard
     * @static
     * @param {IStandard} message Standard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Standard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Standard message from the specified reader or buffer.
     * @function decode
     * @memberof Standard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Standard} Standard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Standard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Standard();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.organizationId = reader.string();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                if (!(message.versions && message.versions.length))
                    message.versions = [];
                message.versions.push($root.Standard.StandardVersion.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Standard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Standard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Standard} Standard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Standard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Standard message.
     * @function verify
     * @memberof Standard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Standard.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.organizationId != null && message.hasOwnProperty("organizationId"))
            if (!$util.isString(message.organizationId))
                return "organizationId: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.versions != null && message.hasOwnProperty("versions")) {
            if (!Array.isArray(message.versions))
                return "versions: array expected";
            for (var i = 0; i < message.versions.length; ++i) {
                var error = $root.Standard.StandardVersion.verify(message.versions[i]);
                if (error)
                    return "versions." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Standard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Standard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Standard} Standard
     */
    Standard.fromObject = function fromObject(object) {
        if (object instanceof $root.Standard)
            return object;
        var message = new $root.Standard();
        if (object.id != null)
            message.id = String(object.id);
        if (object.organizationId != null)
            message.organizationId = String(object.organizationId);
        if (object.name != null)
            message.name = String(object.name);
        if (object.versions) {
            if (!Array.isArray(object.versions))
                throw TypeError(".Standard.versions: array expected");
            message.versions = [];
            for (var i = 0; i < object.versions.length; ++i) {
                if (typeof object.versions[i] !== "object")
                    throw TypeError(".Standard.versions: object expected");
                message.versions[i] = $root.Standard.StandardVersion.fromObject(object.versions[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Standard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Standard
     * @static
     * @param {Standard} message Standard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Standard.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.versions = [];
        if (options.defaults) {
            object.id = "";
            object.organizationId = "";
            object.name = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.organizationId != null && message.hasOwnProperty("organizationId"))
            object.organizationId = message.organizationId;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.versions && message.versions.length) {
            object.versions = [];
            for (var j = 0; j < message.versions.length; ++j)
                object.versions[j] = $root.Standard.StandardVersion.toObject(message.versions[j], options);
        }
        return object;
    };

    /**
     * Converts this Standard to JSON.
     * @function toJSON
     * @memberof Standard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Standard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Standard.StandardVersion = (function() {

        /**
         * Properties of a StandardVersion.
         * @memberof Standard
         * @interface IStandardVersion
         * @property {string|null} [version] StandardVersion version
         * @property {string|null} [description] StandardVersion description
         * @property {string|null} [link] StandardVersion link
         * @property {number|Long|null} [approvalDate] StandardVersion approvalDate
         */

        /**
         * Constructs a new StandardVersion.
         * @memberof Standard
         * @classdesc Represents a StandardVersion.
         * @implements IStandardVersion
         * @constructor
         * @param {Standard.IStandardVersion=} [properties] Properties to set
         */
        function StandardVersion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StandardVersion version.
         * @member {string} version
         * @memberof Standard.StandardVersion
         * @instance
         */
        StandardVersion.prototype.version = "";

        /**
         * StandardVersion description.
         * @member {string} description
         * @memberof Standard.StandardVersion
         * @instance
         */
        StandardVersion.prototype.description = "";

        /**
         * StandardVersion link.
         * @member {string} link
         * @memberof Standard.StandardVersion
         * @instance
         */
        StandardVersion.prototype.link = "";

        /**
         * StandardVersion approvalDate.
         * @member {number|Long} approvalDate
         * @memberof Standard.StandardVersion
         * @instance
         */
        StandardVersion.prototype.approvalDate = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new StandardVersion instance using the specified properties.
         * @function create
         * @memberof Standard.StandardVersion
         * @static
         * @param {Standard.IStandardVersion=} [properties] Properties to set
         * @returns {Standard.StandardVersion} StandardVersion instance
         */
        StandardVersion.create = function create(properties) {
            return new StandardVersion(properties);
        };

        /**
         * Encodes the specified StandardVersion message. Does not implicitly {@link Standard.StandardVersion.verify|verify} messages.
         * @function encode
         * @memberof Standard.StandardVersion
         * @static
         * @param {Standard.IStandardVersion} message StandardVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StandardVersion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
            if (message.link != null && Object.hasOwnProperty.call(message, "link"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.link);
            if (message.approvalDate != null && Object.hasOwnProperty.call(message, "approvalDate"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.approvalDate);
            return writer;
        };

        /**
         * Encodes the specified StandardVersion message, length delimited. Does not implicitly {@link Standard.StandardVersion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Standard.StandardVersion
         * @static
         * @param {Standard.IStandardVersion} message StandardVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StandardVersion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StandardVersion message from the specified reader or buffer.
         * @function decode
         * @memberof Standard.StandardVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Standard.StandardVersion} StandardVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StandardVersion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Standard.StandardVersion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.link = reader.string();
                    break;
                case 4:
                    message.approvalDate = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StandardVersion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Standard.StandardVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Standard.StandardVersion} StandardVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StandardVersion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StandardVersion message.
         * @function verify
         * @memberof Standard.StandardVersion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StandardVersion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.link != null && message.hasOwnProperty("link"))
                if (!$util.isString(message.link))
                    return "link: string expected";
            if (message.approvalDate != null && message.hasOwnProperty("approvalDate"))
                if (!$util.isInteger(message.approvalDate) && !(message.approvalDate && $util.isInteger(message.approvalDate.low) && $util.isInteger(message.approvalDate.high)))
                    return "approvalDate: integer|Long expected";
            return null;
        };

        /**
         * Creates a StandardVersion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Standard.StandardVersion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Standard.StandardVersion} StandardVersion
         */
        StandardVersion.fromObject = function fromObject(object) {
            if (object instanceof $root.Standard.StandardVersion)
                return object;
            var message = new $root.Standard.StandardVersion();
            if (object.version != null)
                message.version = String(object.version);
            if (object.description != null)
                message.description = String(object.description);
            if (object.link != null)
                message.link = String(object.link);
            if (object.approvalDate != null)
                if ($util.Long)
                    (message.approvalDate = $util.Long.fromValue(object.approvalDate)).unsigned = true;
                else if (typeof object.approvalDate === "string")
                    message.approvalDate = parseInt(object.approvalDate, 10);
                else if (typeof object.approvalDate === "number")
                    message.approvalDate = object.approvalDate;
                else if (typeof object.approvalDate === "object")
                    message.approvalDate = new $util.LongBits(object.approvalDate.low >>> 0, object.approvalDate.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a StandardVersion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Standard.StandardVersion
         * @static
         * @param {Standard.StandardVersion} message StandardVersion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StandardVersion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = "";
                object.description = "";
                object.link = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.approvalDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.approvalDate = options.longs === String ? "0" : 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.link != null && message.hasOwnProperty("link"))
                object.link = message.link;
            if (message.approvalDate != null && message.hasOwnProperty("approvalDate"))
                if (typeof message.approvalDate === "number")
                    object.approvalDate = options.longs === String ? String(message.approvalDate) : message.approvalDate;
                else
                    object.approvalDate = options.longs === String ? $util.Long.prototype.toString.call(message.approvalDate) : options.longs === Number ? new $util.LongBits(message.approvalDate.low >>> 0, message.approvalDate.high >>> 0).toNumber(true) : message.approvalDate;
            return object;
        };

        /**
         * Converts this StandardVersion to JSON.
         * @function toJSON
         * @memberof Standard.StandardVersion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StandardVersion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StandardVersion;
    })();

    return Standard;
})();

$root.StandardContainer = (function() {

    /**
     * Properties of a StandardContainer.
     * @exports IStandardContainer
     * @interface IStandardContainer
     * @property {Array.<IStandard>|null} [entries] StandardContainer entries
     */

    /**
     * Constructs a new StandardContainer.
     * @exports StandardContainer
     * @classdesc Represents a StandardContainer.
     * @implements IStandardContainer
     * @constructor
     * @param {IStandardContainer=} [properties] Properties to set
     */
    function StandardContainer(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StandardContainer entries.
     * @member {Array.<IStandard>} entries
     * @memberof StandardContainer
     * @instance
     */
    StandardContainer.prototype.entries = $util.emptyArray;

    /**
     * Creates a new StandardContainer instance using the specified properties.
     * @function create
     * @memberof StandardContainer
     * @static
     * @param {IStandardContainer=} [properties] Properties to set
     * @returns {StandardContainer} StandardContainer instance
     */
    StandardContainer.create = function create(properties) {
        return new StandardContainer(properties);
    };

    /**
     * Encodes the specified StandardContainer message. Does not implicitly {@link StandardContainer.verify|verify} messages.
     * @function encode
     * @memberof StandardContainer
     * @static
     * @param {IStandardContainer} message StandardContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StandardContainer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.Standard.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified StandardContainer message, length delimited. Does not implicitly {@link StandardContainer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StandardContainer
     * @static
     * @param {IStandardContainer} message StandardContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StandardContainer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StandardContainer message from the specified reader or buffer.
     * @function decode
     * @memberof StandardContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StandardContainer} StandardContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StandardContainer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.StandardContainer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.Standard.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StandardContainer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StandardContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StandardContainer} StandardContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StandardContainer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StandardContainer message.
     * @function verify
     * @memberof StandardContainer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StandardContainer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.Standard.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates a StandardContainer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StandardContainer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StandardContainer} StandardContainer
     */
    StandardContainer.fromObject = function fromObject(object) {
        if (object instanceof $root.StandardContainer)
            return object;
        var message = new $root.StandardContainer();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".StandardContainer.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".StandardContainer.entries: object expected");
                message.entries[i] = $root.Standard.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a StandardContainer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StandardContainer
     * @static
     * @param {StandardContainer} message StandardContainer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StandardContainer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.Standard.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this StandardContainer to JSON.
     * @function toJSON
     * @memberof StandardContainer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StandardContainer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StandardContainer;
})();

$root.CertificateRegistryPayload = (function() {

    /**
     * Properties of a CertificateRegistryPayload.
     * @exports ICertificateRegistryPayload
     * @interface ICertificateRegistryPayload
     * @property {CertificateRegistryPayload.Action|null} [action] CertificateRegistryPayload action
     * @property {ICreateAgentAction|null} [createAgent] CertificateRegistryPayload createAgent
     * @property {ICreateOrganizationAction|null} [createOrganization] CertificateRegistryPayload createOrganization
     * @property {IUpdateOrganizationAction|null} [updateOrganization] CertificateRegistryPayload updateOrganization
     * @property {IAuthorizeAgentAction|null} [authorizeAgent] CertificateRegistryPayload authorizeAgent
     * @property {IIssueCertificateAction|null} [issueCertificate] CertificateRegistryPayload issueCertificate
     * @property {ICreateStandardAction|null} [createStandard] CertificateRegistryPayload createStandard
     * @property {IUpdateStandardAction|null} [updateStandard] CertificateRegistryPayload updateStandard
     * @property {IOpenRequestAction|null} [openRequestAction] CertificateRegistryPayload openRequestAction
     * @property {IChangeRequestStatusAction|null} [changeRequestStatusAction] CertificateRegistryPayload changeRequestStatusAction
     * @property {IAccreditCertifyingBodyAction|null} [accreditCertifyingBodyAction] CertificateRegistryPayload accreditCertifyingBodyAction
     */

    /**
     * Constructs a new CertificateRegistryPayload.
     * @exports CertificateRegistryPayload
     * @classdesc Represents a CertificateRegistryPayload.
     * @implements ICertificateRegistryPayload
     * @constructor
     * @param {ICertificateRegistryPayload=} [properties] Properties to set
     */
    function CertificateRegistryPayload(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CertificateRegistryPayload action.
     * @member {CertificateRegistryPayload.Action} action
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.action = 0;

    /**
     * CertificateRegistryPayload createAgent.
     * @member {ICreateAgentAction|null|undefined} createAgent
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.createAgent = null;

    /**
     * CertificateRegistryPayload createOrganization.
     * @member {ICreateOrganizationAction|null|undefined} createOrganization
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.createOrganization = null;

    /**
     * CertificateRegistryPayload updateOrganization.
     * @member {IUpdateOrganizationAction|null|undefined} updateOrganization
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.updateOrganization = null;

    /**
     * CertificateRegistryPayload authorizeAgent.
     * @member {IAuthorizeAgentAction|null|undefined} authorizeAgent
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.authorizeAgent = null;

    /**
     * CertificateRegistryPayload issueCertificate.
     * @member {IIssueCertificateAction|null|undefined} issueCertificate
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.issueCertificate = null;

    /**
     * CertificateRegistryPayload createStandard.
     * @member {ICreateStandardAction|null|undefined} createStandard
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.createStandard = null;

    /**
     * CertificateRegistryPayload updateStandard.
     * @member {IUpdateStandardAction|null|undefined} updateStandard
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.updateStandard = null;

    /**
     * CertificateRegistryPayload openRequestAction.
     * @member {IOpenRequestAction|null|undefined} openRequestAction
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.openRequestAction = null;

    /**
     * CertificateRegistryPayload changeRequestStatusAction.
     * @member {IChangeRequestStatusAction|null|undefined} changeRequestStatusAction
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.changeRequestStatusAction = null;

    /**
     * CertificateRegistryPayload accreditCertifyingBodyAction.
     * @member {IAccreditCertifyingBodyAction|null|undefined} accreditCertifyingBodyAction
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.accreditCertifyingBodyAction = null;

    /**
     * Creates a new CertificateRegistryPayload instance using the specified properties.
     * @function create
     * @memberof CertificateRegistryPayload
     * @static
     * @param {ICertificateRegistryPayload=} [properties] Properties to set
     * @returns {CertificateRegistryPayload} CertificateRegistryPayload instance
     */
    CertificateRegistryPayload.create = function create(properties) {
        return new CertificateRegistryPayload(properties);
    };

    /**
     * Encodes the specified CertificateRegistryPayload message. Does not implicitly {@link CertificateRegistryPayload.verify|verify} messages.
     * @function encode
     * @memberof CertificateRegistryPayload
     * @static
     * @param {ICertificateRegistryPayload} message CertificateRegistryPayload message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CertificateRegistryPayload.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && Object.hasOwnProperty.call(message, "action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.createAgent != null && Object.hasOwnProperty.call(message, "createAgent"))
            $root.CreateAgentAction.encode(message.createAgent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.createOrganization != null && Object.hasOwnProperty.call(message, "createOrganization"))
            $root.CreateOrganizationAction.encode(message.createOrganization, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.updateOrganization != null && Object.hasOwnProperty.call(message, "updateOrganization"))
            $root.UpdateOrganizationAction.encode(message.updateOrganization, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.authorizeAgent != null && Object.hasOwnProperty.call(message, "authorizeAgent"))
            $root.AuthorizeAgentAction.encode(message.authorizeAgent, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.issueCertificate != null && Object.hasOwnProperty.call(message, "issueCertificate"))
            $root.IssueCertificateAction.encode(message.issueCertificate, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.createStandard != null && Object.hasOwnProperty.call(message, "createStandard"))
            $root.CreateStandardAction.encode(message.createStandard, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.updateStandard != null && Object.hasOwnProperty.call(message, "updateStandard"))
            $root.UpdateStandardAction.encode(message.updateStandard, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.openRequestAction != null && Object.hasOwnProperty.call(message, "openRequestAction"))
            $root.OpenRequestAction.encode(message.openRequestAction, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.changeRequestStatusAction != null && Object.hasOwnProperty.call(message, "changeRequestStatusAction"))
            $root.ChangeRequestStatusAction.encode(message.changeRequestStatusAction, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.accreditCertifyingBodyAction != null && Object.hasOwnProperty.call(message, "accreditCertifyingBodyAction"))
            $root.AccreditCertifyingBodyAction.encode(message.accreditCertifyingBodyAction, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CertificateRegistryPayload message, length delimited. Does not implicitly {@link CertificateRegistryPayload.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CertificateRegistryPayload
     * @static
     * @param {ICertificateRegistryPayload} message CertificateRegistryPayload message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CertificateRegistryPayload.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CertificateRegistryPayload message from the specified reader or buffer.
     * @function decode
     * @memberof CertificateRegistryPayload
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CertificateRegistryPayload} CertificateRegistryPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CertificateRegistryPayload.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CertificateRegistryPayload();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.createAgent = $root.CreateAgentAction.decode(reader, reader.uint32());
                break;
            case 3:
                message.createOrganization = $root.CreateOrganizationAction.decode(reader, reader.uint32());
                break;
            case 4:
                message.updateOrganization = $root.UpdateOrganizationAction.decode(reader, reader.uint32());
                break;
            case 5:
                message.authorizeAgent = $root.AuthorizeAgentAction.decode(reader, reader.uint32());
                break;
            case 6:
                message.issueCertificate = $root.IssueCertificateAction.decode(reader, reader.uint32());
                break;
            case 7:
                message.createStandard = $root.CreateStandardAction.decode(reader, reader.uint32());
                break;
            case 8:
                message.updateStandard = $root.UpdateStandardAction.decode(reader, reader.uint32());
                break;
            case 9:
                message.openRequestAction = $root.OpenRequestAction.decode(reader, reader.uint32());
                break;
            case 10:
                message.changeRequestStatusAction = $root.ChangeRequestStatusAction.decode(reader, reader.uint32());
                break;
            case 11:
                message.accreditCertifyingBodyAction = $root.AccreditCertifyingBodyAction.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CertificateRegistryPayload message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CertificateRegistryPayload
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CertificateRegistryPayload} CertificateRegistryPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CertificateRegistryPayload.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CertificateRegistryPayload message.
     * @function verify
     * @memberof CertificateRegistryPayload
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CertificateRegistryPayload.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.action != null && message.hasOwnProperty("action"))
            switch (message.action) {
            default:
                return "action: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                break;
            }
        if (message.createAgent != null && message.hasOwnProperty("createAgent")) {
            var error = $root.CreateAgentAction.verify(message.createAgent);
            if (error)
                return "createAgent." + error;
        }
        if (message.createOrganization != null && message.hasOwnProperty("createOrganization")) {
            var error = $root.CreateOrganizationAction.verify(message.createOrganization);
            if (error)
                return "createOrganization." + error;
        }
        if (message.updateOrganization != null && message.hasOwnProperty("updateOrganization")) {
            var error = $root.UpdateOrganizationAction.verify(message.updateOrganization);
            if (error)
                return "updateOrganization." + error;
        }
        if (message.authorizeAgent != null && message.hasOwnProperty("authorizeAgent")) {
            var error = $root.AuthorizeAgentAction.verify(message.authorizeAgent);
            if (error)
                return "authorizeAgent." + error;
        }
        if (message.issueCertificate != null && message.hasOwnProperty("issueCertificate")) {
            var error = $root.IssueCertificateAction.verify(message.issueCertificate);
            if (error)
                return "issueCertificate." + error;
        }
        if (message.createStandard != null && message.hasOwnProperty("createStandard")) {
            var error = $root.CreateStandardAction.verify(message.createStandard);
            if (error)
                return "createStandard." + error;
        }
        if (message.updateStandard != null && message.hasOwnProperty("updateStandard")) {
            var error = $root.UpdateStandardAction.verify(message.updateStandard);
            if (error)
                return "updateStandard." + error;
        }
        if (message.openRequestAction != null && message.hasOwnProperty("openRequestAction")) {
            var error = $root.OpenRequestAction.verify(message.openRequestAction);
            if (error)
                return "openRequestAction." + error;
        }
        if (message.changeRequestStatusAction != null && message.hasOwnProperty("changeRequestStatusAction")) {
            var error = $root.ChangeRequestStatusAction.verify(message.changeRequestStatusAction);
            if (error)
                return "changeRequestStatusAction." + error;
        }
        if (message.accreditCertifyingBodyAction != null && message.hasOwnProperty("accreditCertifyingBodyAction")) {
            var error = $root.AccreditCertifyingBodyAction.verify(message.accreditCertifyingBodyAction);
            if (error)
                return "accreditCertifyingBodyAction." + error;
        }
        return null;
    };

    /**
     * Creates a CertificateRegistryPayload message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CertificateRegistryPayload
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CertificateRegistryPayload} CertificateRegistryPayload
     */
    CertificateRegistryPayload.fromObject = function fromObject(object) {
        if (object instanceof $root.CertificateRegistryPayload)
            return object;
        var message = new $root.CertificateRegistryPayload();
        switch (object.action) {
        case "UNSET_ACTION":
        case 0:
            message.action = 0;
            break;
        case "CREATE_AGENT":
        case 1:
            message.action = 1;
            break;
        case "CREATE_ORGANIZATION":
        case 2:
            message.action = 2;
            break;
        case "UPDATE_ORGANIZATION":
        case 3:
            message.action = 3;
            break;
        case "AUTHORIZE_AGENT":
        case 4:
            message.action = 4;
            break;
        case "ISSUE_CERTIFICATE":
        case 5:
            message.action = 5;
            break;
        case "CREATE_STANDARD":
        case 6:
            message.action = 6;
            break;
        case "UPDATE_STANDARD":
        case 7:
            message.action = 7;
            break;
        case "OPEN_REQUEST_ACTION":
        case 8:
            message.action = 8;
            break;
        case "CHANGE_REQUEST_STATUS_ACTION":
        case 9:
            message.action = 9;
            break;
        case "ACCREDIT_CERTIFYING_BODY_ACTION":
        case 10:
            message.action = 10;
            break;
        }
        if (object.createAgent != null) {
            if (typeof object.createAgent !== "object")
                throw TypeError(".CertificateRegistryPayload.createAgent: object expected");
            message.createAgent = $root.CreateAgentAction.fromObject(object.createAgent);
        }
        if (object.createOrganization != null) {
            if (typeof object.createOrganization !== "object")
                throw TypeError(".CertificateRegistryPayload.createOrganization: object expected");
            message.createOrganization = $root.CreateOrganizationAction.fromObject(object.createOrganization);
        }
        if (object.updateOrganization != null) {
            if (typeof object.updateOrganization !== "object")
                throw TypeError(".CertificateRegistryPayload.updateOrganization: object expected");
            message.updateOrganization = $root.UpdateOrganizationAction.fromObject(object.updateOrganization);
        }
        if (object.authorizeAgent != null) {
            if (typeof object.authorizeAgent !== "object")
                throw TypeError(".CertificateRegistryPayload.authorizeAgent: object expected");
            message.authorizeAgent = $root.AuthorizeAgentAction.fromObject(object.authorizeAgent);
        }
        if (object.issueCertificate != null) {
            if (typeof object.issueCertificate !== "object")
                throw TypeError(".CertificateRegistryPayload.issueCertificate: object expected");
            message.issueCertificate = $root.IssueCertificateAction.fromObject(object.issueCertificate);
        }
        if (object.createStandard != null) {
            if (typeof object.createStandard !== "object")
                throw TypeError(".CertificateRegistryPayload.createStandard: object expected");
            message.createStandard = $root.CreateStandardAction.fromObject(object.createStandard);
        }
        if (object.updateStandard != null) {
            if (typeof object.updateStandard !== "object")
                throw TypeError(".CertificateRegistryPayload.updateStandard: object expected");
            message.updateStandard = $root.UpdateStandardAction.fromObject(object.updateStandard);
        }
        if (object.openRequestAction != null) {
            if (typeof object.openRequestAction !== "object")
                throw TypeError(".CertificateRegistryPayload.openRequestAction: object expected");
            message.openRequestAction = $root.OpenRequestAction.fromObject(object.openRequestAction);
        }
        if (object.changeRequestStatusAction != null) {
            if (typeof object.changeRequestStatusAction !== "object")
                throw TypeError(".CertificateRegistryPayload.changeRequestStatusAction: object expected");
            message.changeRequestStatusAction = $root.ChangeRequestStatusAction.fromObject(object.changeRequestStatusAction);
        }
        if (object.accreditCertifyingBodyAction != null) {
            if (typeof object.accreditCertifyingBodyAction !== "object")
                throw TypeError(".CertificateRegistryPayload.accreditCertifyingBodyAction: object expected");
            message.accreditCertifyingBodyAction = $root.AccreditCertifyingBodyAction.fromObject(object.accreditCertifyingBodyAction);
        }
        return message;
    };

    /**
     * Creates a plain object from a CertificateRegistryPayload message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CertificateRegistryPayload
     * @static
     * @param {CertificateRegistryPayload} message CertificateRegistryPayload
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CertificateRegistryPayload.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.action = options.enums === String ? "UNSET_ACTION" : 0;
            object.createAgent = null;
            object.createOrganization = null;
            object.updateOrganization = null;
            object.authorizeAgent = null;
            object.issueCertificate = null;
            object.createStandard = null;
            object.updateStandard = null;
            object.openRequestAction = null;
            object.changeRequestStatusAction = null;
            object.accreditCertifyingBodyAction = null;
        }
        if (message.action != null && message.hasOwnProperty("action"))
            object.action = options.enums === String ? $root.CertificateRegistryPayload.Action[message.action] : message.action;
        if (message.createAgent != null && message.hasOwnProperty("createAgent"))
            object.createAgent = $root.CreateAgentAction.toObject(message.createAgent, options);
        if (message.createOrganization != null && message.hasOwnProperty("createOrganization"))
            object.createOrganization = $root.CreateOrganizationAction.toObject(message.createOrganization, options);
        if (message.updateOrganization != null && message.hasOwnProperty("updateOrganization"))
            object.updateOrganization = $root.UpdateOrganizationAction.toObject(message.updateOrganization, options);
        if (message.authorizeAgent != null && message.hasOwnProperty("authorizeAgent"))
            object.authorizeAgent = $root.AuthorizeAgentAction.toObject(message.authorizeAgent, options);
        if (message.issueCertificate != null && message.hasOwnProperty("issueCertificate"))
            object.issueCertificate = $root.IssueCertificateAction.toObject(message.issueCertificate, options);
        if (message.createStandard != null && message.hasOwnProperty("createStandard"))
            object.createStandard = $root.CreateStandardAction.toObject(message.createStandard, options);
        if (message.updateStandard != null && message.hasOwnProperty("updateStandard"))
            object.updateStandard = $root.UpdateStandardAction.toObject(message.updateStandard, options);
        if (message.openRequestAction != null && message.hasOwnProperty("openRequestAction"))
            object.openRequestAction = $root.OpenRequestAction.toObject(message.openRequestAction, options);
        if (message.changeRequestStatusAction != null && message.hasOwnProperty("changeRequestStatusAction"))
            object.changeRequestStatusAction = $root.ChangeRequestStatusAction.toObject(message.changeRequestStatusAction, options);
        if (message.accreditCertifyingBodyAction != null && message.hasOwnProperty("accreditCertifyingBodyAction"))
            object.accreditCertifyingBodyAction = $root.AccreditCertifyingBodyAction.toObject(message.accreditCertifyingBodyAction, options);
        return object;
    };

    /**
     * Converts this CertificateRegistryPayload to JSON.
     * @function toJSON
     * @memberof CertificateRegistryPayload
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CertificateRegistryPayload.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Action enum.
     * @name CertificateRegistryPayload.Action
     * @enum {number}
     * @property {number} UNSET_ACTION=0 UNSET_ACTION value
     * @property {number} CREATE_AGENT=1 CREATE_AGENT value
     * @property {number} CREATE_ORGANIZATION=2 CREATE_ORGANIZATION value
     * @property {number} UPDATE_ORGANIZATION=3 UPDATE_ORGANIZATION value
     * @property {number} AUTHORIZE_AGENT=4 AUTHORIZE_AGENT value
     * @property {number} ISSUE_CERTIFICATE=5 ISSUE_CERTIFICATE value
     * @property {number} CREATE_STANDARD=6 CREATE_STANDARD value
     * @property {number} UPDATE_STANDARD=7 UPDATE_STANDARD value
     * @property {number} OPEN_REQUEST_ACTION=8 OPEN_REQUEST_ACTION value
     * @property {number} CHANGE_REQUEST_STATUS_ACTION=9 CHANGE_REQUEST_STATUS_ACTION value
     * @property {number} ACCREDIT_CERTIFYING_BODY_ACTION=10 ACCREDIT_CERTIFYING_BODY_ACTION value
     */
    CertificateRegistryPayload.Action = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSET_ACTION"] = 0;
        values[valuesById[1] = "CREATE_AGENT"] = 1;
        values[valuesById[2] = "CREATE_ORGANIZATION"] = 2;
        values[valuesById[3] = "UPDATE_ORGANIZATION"] = 3;
        values[valuesById[4] = "AUTHORIZE_AGENT"] = 4;
        values[valuesById[5] = "ISSUE_CERTIFICATE"] = 5;
        values[valuesById[6] = "CREATE_STANDARD"] = 6;
        values[valuesById[7] = "UPDATE_STANDARD"] = 7;
        values[valuesById[8] = "OPEN_REQUEST_ACTION"] = 8;
        values[valuesById[9] = "CHANGE_REQUEST_STATUS_ACTION"] = 9;
        values[valuesById[10] = "ACCREDIT_CERTIFYING_BODY_ACTION"] = 10;
        return values;
    })();

    return CertificateRegistryPayload;
})();

$root.CreateAgentAction = (function() {

    /**
     * Properties of a CreateAgentAction.
     * @exports ICreateAgentAction
     * @interface ICreateAgentAction
     * @property {string|null} [name] CreateAgentAction name
     * @property {number|Long|null} [timestamp] CreateAgentAction timestamp
     */

    /**
     * Constructs a new CreateAgentAction.
     * @exports CreateAgentAction
     * @classdesc Represents a CreateAgentAction.
     * @implements ICreateAgentAction
     * @constructor
     * @param {ICreateAgentAction=} [properties] Properties to set
     */
    function CreateAgentAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateAgentAction name.
     * @member {string} name
     * @memberof CreateAgentAction
     * @instance
     */
    CreateAgentAction.prototype.name = "";

    /**
     * CreateAgentAction timestamp.
     * @member {number|Long} timestamp
     * @memberof CreateAgentAction
     * @instance
     */
    CreateAgentAction.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CreateAgentAction instance using the specified properties.
     * @function create
     * @memberof CreateAgentAction
     * @static
     * @param {ICreateAgentAction=} [properties] Properties to set
     * @returns {CreateAgentAction} CreateAgentAction instance
     */
    CreateAgentAction.create = function create(properties) {
        return new CreateAgentAction(properties);
    };

    /**
     * Encodes the specified CreateAgentAction message. Does not implicitly {@link CreateAgentAction.verify|verify} messages.
     * @function encode
     * @memberof CreateAgentAction
     * @static
     * @param {ICreateAgentAction} message CreateAgentAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateAgentAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.timestamp);
        return writer;
    };

    /**
     * Encodes the specified CreateAgentAction message, length delimited. Does not implicitly {@link CreateAgentAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateAgentAction
     * @static
     * @param {ICreateAgentAction} message CreateAgentAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateAgentAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateAgentAction message from the specified reader or buffer.
     * @function decode
     * @memberof CreateAgentAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateAgentAction} CreateAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateAgentAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateAgentAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.timestamp = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CreateAgentAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateAgentAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateAgentAction} CreateAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateAgentAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateAgentAction message.
     * @function verify
     * @memberof CreateAgentAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateAgentAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        return null;
    };

    /**
     * Creates a CreateAgentAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateAgentAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateAgentAction} CreateAgentAction
     */
    CreateAgentAction.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateAgentAction)
            return object;
        var message = new $root.CreateAgentAction();
        if (object.name != null)
            message.name = String(object.name);
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a CreateAgentAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateAgentAction
     * @static
     * @param {CreateAgentAction} message CreateAgentAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateAgentAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.name = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
        return object;
    };

    /**
     * Converts this CreateAgentAction to JSON.
     * @function toJSON
     * @memberof CreateAgentAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateAgentAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateAgentAction;
})();

$root.CreateOrganizationAction = (function() {

    /**
     * Properties of a CreateOrganizationAction.
     * @exports ICreateOrganizationAction
     * @interface ICreateOrganizationAction
     * @property {string|null} [id] CreateOrganizationAction id
     * @property {Organization.Type|null} [organizationType] CreateOrganizationAction organizationType
     * @property {string|null} [name] CreateOrganizationAction name
     * @property {Array.<Organization.IContact>|null} [contacts] CreateOrganizationAction contacts
     * @property {Factory.IAddress|null} [address] CreateOrganizationAction address
     */

    /**
     * Constructs a new CreateOrganizationAction.
     * @exports CreateOrganizationAction
     * @classdesc Represents a CreateOrganizationAction.
     * @implements ICreateOrganizationAction
     * @constructor
     * @param {ICreateOrganizationAction=} [properties] Properties to set
     */
    function CreateOrganizationAction(properties) {
        this.contacts = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateOrganizationAction id.
     * @member {string} id
     * @memberof CreateOrganizationAction
     * @instance
     */
    CreateOrganizationAction.prototype.id = "";

    /**
     * CreateOrganizationAction organizationType.
     * @member {Organization.Type} organizationType
     * @memberof CreateOrganizationAction
     * @instance
     */
    CreateOrganizationAction.prototype.organizationType = 0;

    /**
     * CreateOrganizationAction name.
     * @member {string} name
     * @memberof CreateOrganizationAction
     * @instance
     */
    CreateOrganizationAction.prototype.name = "";

    /**
     * CreateOrganizationAction contacts.
     * @member {Array.<Organization.IContact>} contacts
     * @memberof CreateOrganizationAction
     * @instance
     */
    CreateOrganizationAction.prototype.contacts = $util.emptyArray;

    /**
     * CreateOrganizationAction address.
     * @member {Factory.IAddress|null|undefined} address
     * @memberof CreateOrganizationAction
     * @instance
     */
    CreateOrganizationAction.prototype.address = null;

    /**
     * Creates a new CreateOrganizationAction instance using the specified properties.
     * @function create
     * @memberof CreateOrganizationAction
     * @static
     * @param {ICreateOrganizationAction=} [properties] Properties to set
     * @returns {CreateOrganizationAction} CreateOrganizationAction instance
     */
    CreateOrganizationAction.create = function create(properties) {
        return new CreateOrganizationAction(properties);
    };

    /**
     * Encodes the specified CreateOrganizationAction message. Does not implicitly {@link CreateOrganizationAction.verify|verify} messages.
     * @function encode
     * @memberof CreateOrganizationAction
     * @static
     * @param {ICreateOrganizationAction} message CreateOrganizationAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateOrganizationAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.organizationType != null && Object.hasOwnProperty.call(message, "organizationType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.organizationType);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        if (message.contacts != null && message.contacts.length)
            for (var i = 0; i < message.contacts.length; ++i)
                $root.Organization.Contact.encode(message.contacts[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.address != null && Object.hasOwnProperty.call(message, "address"))
            $root.Factory.Address.encode(message.address, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CreateOrganizationAction message, length delimited. Does not implicitly {@link CreateOrganizationAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateOrganizationAction
     * @static
     * @param {ICreateOrganizationAction} message CreateOrganizationAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateOrganizationAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateOrganizationAction message from the specified reader or buffer.
     * @function decode
     * @memberof CreateOrganizationAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateOrganizationAction} CreateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateOrganizationAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateOrganizationAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.organizationType = reader.int32();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                if (!(message.contacts && message.contacts.length))
                    message.contacts = [];
                message.contacts.push($root.Organization.Contact.decode(reader, reader.uint32()));
                break;
            case 5:
                message.address = $root.Factory.Address.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CreateOrganizationAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateOrganizationAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateOrganizationAction} CreateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateOrganizationAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateOrganizationAction message.
     * @function verify
     * @memberof CreateOrganizationAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateOrganizationAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.organizationType != null && message.hasOwnProperty("organizationType"))
            switch (message.organizationType) {
            default:
                return "organizationType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.contacts != null && message.hasOwnProperty("contacts")) {
            if (!Array.isArray(message.contacts))
                return "contacts: array expected";
            for (var i = 0; i < message.contacts.length; ++i) {
                var error = $root.Organization.Contact.verify(message.contacts[i]);
                if (error)
                    return "contacts." + error;
            }
        }
        if (message.address != null && message.hasOwnProperty("address")) {
            var error = $root.Factory.Address.verify(message.address);
            if (error)
                return "address." + error;
        }
        return null;
    };

    /**
     * Creates a CreateOrganizationAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateOrganizationAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateOrganizationAction} CreateOrganizationAction
     */
    CreateOrganizationAction.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateOrganizationAction)
            return object;
        var message = new $root.CreateOrganizationAction();
        if (object.id != null)
            message.id = String(object.id);
        switch (object.organizationType) {
        case "UNSET_TYPE":
        case 0:
            message.organizationType = 0;
            break;
        case "CERTIFYING_BODY":
        case 1:
            message.organizationType = 1;
            break;
        case "STANDARDS_BODY":
        case 2:
            message.organizationType = 2;
            break;
        case "FACTORY":
        case 3:
            message.organizationType = 3;
            break;
        }
        if (object.name != null)
            message.name = String(object.name);
        if (object.contacts) {
            if (!Array.isArray(object.contacts))
                throw TypeError(".CreateOrganizationAction.contacts: array expected");
            message.contacts = [];
            for (var i = 0; i < object.contacts.length; ++i) {
                if (typeof object.contacts[i] !== "object")
                    throw TypeError(".CreateOrganizationAction.contacts: object expected");
                message.contacts[i] = $root.Organization.Contact.fromObject(object.contacts[i]);
            }
        }
        if (object.address != null) {
            if (typeof object.address !== "object")
                throw TypeError(".CreateOrganizationAction.address: object expected");
            message.address = $root.Factory.Address.fromObject(object.address);
        }
        return message;
    };

    /**
     * Creates a plain object from a CreateOrganizationAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateOrganizationAction
     * @static
     * @param {CreateOrganizationAction} message CreateOrganizationAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateOrganizationAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.contacts = [];
        if (options.defaults) {
            object.id = "";
            object.organizationType = options.enums === String ? "UNSET_TYPE" : 0;
            object.name = "";
            object.address = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.organizationType != null && message.hasOwnProperty("organizationType"))
            object.organizationType = options.enums === String ? $root.Organization.Type[message.organizationType] : message.organizationType;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.contacts && message.contacts.length) {
            object.contacts = [];
            for (var j = 0; j < message.contacts.length; ++j)
                object.contacts[j] = $root.Organization.Contact.toObject(message.contacts[j], options);
        }
        if (message.address != null && message.hasOwnProperty("address"))
            object.address = $root.Factory.Address.toObject(message.address, options);
        return object;
    };

    /**
     * Converts this CreateOrganizationAction to JSON.
     * @function toJSON
     * @memberof CreateOrganizationAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateOrganizationAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateOrganizationAction;
})();

$root.UpdateOrganizationAction = (function() {

    /**
     * Properties of an UpdateOrganizationAction.
     * @exports IUpdateOrganizationAction
     * @interface IUpdateOrganizationAction
     * @property {Array.<Organization.IContact>|null} [contacts] UpdateOrganizationAction contacts
     * @property {Factory.IAddress|null} [address] UpdateOrganizationAction address
     */

    /**
     * Constructs a new UpdateOrganizationAction.
     * @exports UpdateOrganizationAction
     * @classdesc Represents an UpdateOrganizationAction.
     * @implements IUpdateOrganizationAction
     * @constructor
     * @param {IUpdateOrganizationAction=} [properties] Properties to set
     */
    function UpdateOrganizationAction(properties) {
        this.contacts = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdateOrganizationAction contacts.
     * @member {Array.<Organization.IContact>} contacts
     * @memberof UpdateOrganizationAction
     * @instance
     */
    UpdateOrganizationAction.prototype.contacts = $util.emptyArray;

    /**
     * UpdateOrganizationAction address.
     * @member {Factory.IAddress|null|undefined} address
     * @memberof UpdateOrganizationAction
     * @instance
     */
    UpdateOrganizationAction.prototype.address = null;

    /**
     * Creates a new UpdateOrganizationAction instance using the specified properties.
     * @function create
     * @memberof UpdateOrganizationAction
     * @static
     * @param {IUpdateOrganizationAction=} [properties] Properties to set
     * @returns {UpdateOrganizationAction} UpdateOrganizationAction instance
     */
    UpdateOrganizationAction.create = function create(properties) {
        return new UpdateOrganizationAction(properties);
    };

    /**
     * Encodes the specified UpdateOrganizationAction message. Does not implicitly {@link UpdateOrganizationAction.verify|verify} messages.
     * @function encode
     * @memberof UpdateOrganizationAction
     * @static
     * @param {IUpdateOrganizationAction} message UpdateOrganizationAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateOrganizationAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.contacts != null && message.contacts.length)
            for (var i = 0; i < message.contacts.length; ++i)
                $root.Organization.Contact.encode(message.contacts[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.address != null && Object.hasOwnProperty.call(message, "address"))
            $root.Factory.Address.encode(message.address, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified UpdateOrganizationAction message, length delimited. Does not implicitly {@link UpdateOrganizationAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdateOrganizationAction
     * @static
     * @param {IUpdateOrganizationAction} message UpdateOrganizationAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateOrganizationAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpdateOrganizationAction message from the specified reader or buffer.
     * @function decode
     * @memberof UpdateOrganizationAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdateOrganizationAction} UpdateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateOrganizationAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpdateOrganizationAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.contacts && message.contacts.length))
                    message.contacts = [];
                message.contacts.push($root.Organization.Contact.decode(reader, reader.uint32()));
                break;
            case 2:
                message.address = $root.Factory.Address.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpdateOrganizationAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdateOrganizationAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdateOrganizationAction} UpdateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateOrganizationAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdateOrganizationAction message.
     * @function verify
     * @memberof UpdateOrganizationAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdateOrganizationAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.contacts != null && message.hasOwnProperty("contacts")) {
            if (!Array.isArray(message.contacts))
                return "contacts: array expected";
            for (var i = 0; i < message.contacts.length; ++i) {
                var error = $root.Organization.Contact.verify(message.contacts[i]);
                if (error)
                    return "contacts." + error;
            }
        }
        if (message.address != null && message.hasOwnProperty("address")) {
            var error = $root.Factory.Address.verify(message.address);
            if (error)
                return "address." + error;
        }
        return null;
    };

    /**
     * Creates an UpdateOrganizationAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdateOrganizationAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdateOrganizationAction} UpdateOrganizationAction
     */
    UpdateOrganizationAction.fromObject = function fromObject(object) {
        if (object instanceof $root.UpdateOrganizationAction)
            return object;
        var message = new $root.UpdateOrganizationAction();
        if (object.contacts) {
            if (!Array.isArray(object.contacts))
                throw TypeError(".UpdateOrganizationAction.contacts: array expected");
            message.contacts = [];
            for (var i = 0; i < object.contacts.length; ++i) {
                if (typeof object.contacts[i] !== "object")
                    throw TypeError(".UpdateOrganizationAction.contacts: object expected");
                message.contacts[i] = $root.Organization.Contact.fromObject(object.contacts[i]);
            }
        }
        if (object.address != null) {
            if (typeof object.address !== "object")
                throw TypeError(".UpdateOrganizationAction.address: object expected");
            message.address = $root.Factory.Address.fromObject(object.address);
        }
        return message;
    };

    /**
     * Creates a plain object from an UpdateOrganizationAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdateOrganizationAction
     * @static
     * @param {UpdateOrganizationAction} message UpdateOrganizationAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdateOrganizationAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.contacts = [];
        if (options.defaults)
            object.address = null;
        if (message.contacts && message.contacts.length) {
            object.contacts = [];
            for (var j = 0; j < message.contacts.length; ++j)
                object.contacts[j] = $root.Organization.Contact.toObject(message.contacts[j], options);
        }
        if (message.address != null && message.hasOwnProperty("address"))
            object.address = $root.Factory.Address.toObject(message.address, options);
        return object;
    };

    /**
     * Converts this UpdateOrganizationAction to JSON.
     * @function toJSON
     * @memberof UpdateOrganizationAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdateOrganizationAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdateOrganizationAction;
})();

$root.AuthorizeAgentAction = (function() {

    /**
     * Properties of an AuthorizeAgentAction.
     * @exports IAuthorizeAgentAction
     * @interface IAuthorizeAgentAction
     * @property {string|null} [publicKey] AuthorizeAgentAction publicKey
     * @property {Organization.Authorization.Role|null} [role] AuthorizeAgentAction role
     */

    /**
     * Constructs a new AuthorizeAgentAction.
     * @exports AuthorizeAgentAction
     * @classdesc Represents an AuthorizeAgentAction.
     * @implements IAuthorizeAgentAction
     * @constructor
     * @param {IAuthorizeAgentAction=} [properties] Properties to set
     */
    function AuthorizeAgentAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthorizeAgentAction publicKey.
     * @member {string} publicKey
     * @memberof AuthorizeAgentAction
     * @instance
     */
    AuthorizeAgentAction.prototype.publicKey = "";

    /**
     * AuthorizeAgentAction role.
     * @member {Organization.Authorization.Role} role
     * @memberof AuthorizeAgentAction
     * @instance
     */
    AuthorizeAgentAction.prototype.role = 0;

    /**
     * Creates a new AuthorizeAgentAction instance using the specified properties.
     * @function create
     * @memberof AuthorizeAgentAction
     * @static
     * @param {IAuthorizeAgentAction=} [properties] Properties to set
     * @returns {AuthorizeAgentAction} AuthorizeAgentAction instance
     */
    AuthorizeAgentAction.create = function create(properties) {
        return new AuthorizeAgentAction(properties);
    };

    /**
     * Encodes the specified AuthorizeAgentAction message. Does not implicitly {@link AuthorizeAgentAction.verify|verify} messages.
     * @function encode
     * @memberof AuthorizeAgentAction
     * @static
     * @param {IAuthorizeAgentAction} message AuthorizeAgentAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthorizeAgentAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.publicKey);
        if (message.role != null && Object.hasOwnProperty.call(message, "role"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.role);
        return writer;
    };

    /**
     * Encodes the specified AuthorizeAgentAction message, length delimited. Does not implicitly {@link AuthorizeAgentAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthorizeAgentAction
     * @static
     * @param {IAuthorizeAgentAction} message AuthorizeAgentAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthorizeAgentAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthorizeAgentAction message from the specified reader or buffer.
     * @function decode
     * @memberof AuthorizeAgentAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthorizeAgentAction} AuthorizeAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthorizeAgentAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthorizeAgentAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.publicKey = reader.string();
                break;
            case 2:
                message.role = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthorizeAgentAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthorizeAgentAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthorizeAgentAction} AuthorizeAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthorizeAgentAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthorizeAgentAction message.
     * @function verify
     * @memberof AuthorizeAgentAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthorizeAgentAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            if (!$util.isString(message.publicKey))
                return "publicKey: string expected";
        if (message.role != null && message.hasOwnProperty("role"))
            switch (message.role) {
            default:
                return "role: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates an AuthorizeAgentAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthorizeAgentAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthorizeAgentAction} AuthorizeAgentAction
     */
    AuthorizeAgentAction.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthorizeAgentAction)
            return object;
        var message = new $root.AuthorizeAgentAction();
        if (object.publicKey != null)
            message.publicKey = String(object.publicKey);
        switch (object.role) {
        case "UNSET_ROLE":
        case 0:
            message.role = 0;
            break;
        case "ADMIN":
        case 1:
            message.role = 1;
            break;
        case "TRANSACTOR":
        case 2:
            message.role = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from an AuthorizeAgentAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthorizeAgentAction
     * @static
     * @param {AuthorizeAgentAction} message AuthorizeAgentAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthorizeAgentAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.publicKey = "";
            object.role = options.enums === String ? "UNSET_ROLE" : 0;
        }
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            object.publicKey = message.publicKey;
        if (message.role != null && message.hasOwnProperty("role"))
            object.role = options.enums === String ? $root.Organization.Authorization.Role[message.role] : message.role;
        return object;
    };

    /**
     * Converts this AuthorizeAgentAction to JSON.
     * @function toJSON
     * @memberof AuthorizeAgentAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthorizeAgentAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AuthorizeAgentAction;
})();

$root.IssueCertificateAction = (function() {

    /**
     * Properties of an IssueCertificateAction.
     * @exports IIssueCertificateAction
     * @interface IIssueCertificateAction
     * @property {string|null} [id] IssueCertificateAction id
     * @property {string|null} [factoryId] IssueCertificateAction factoryId
     * @property {IssueCertificateAction.Source|null} [source] IssueCertificateAction source
     * @property {string|null} [requestId] IssueCertificateAction requestId
     * @property {string|null} [standardId] IssueCertificateAction standardId
     * @property {Array.<Certificate.ICertificateData>|null} [certificateData] IssueCertificateAction certificateData
     * @property {number|Long|null} [validFrom] IssueCertificateAction validFrom
     * @property {number|Long|null} [validTo] IssueCertificateAction validTo
     */

    /**
     * Constructs a new IssueCertificateAction.
     * @exports IssueCertificateAction
     * @classdesc Represents an IssueCertificateAction.
     * @implements IIssueCertificateAction
     * @constructor
     * @param {IIssueCertificateAction=} [properties] Properties to set
     */
    function IssueCertificateAction(properties) {
        this.certificateData = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * IssueCertificateAction id.
     * @member {string} id
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.id = "";

    /**
     * IssueCertificateAction factoryId.
     * @member {string} factoryId
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.factoryId = "";

    /**
     * IssueCertificateAction source.
     * @member {IssueCertificateAction.Source} source
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.source = 0;

    /**
     * IssueCertificateAction requestId.
     * @member {string} requestId
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.requestId = "";

    /**
     * IssueCertificateAction standardId.
     * @member {string} standardId
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.standardId = "";

    /**
     * IssueCertificateAction certificateData.
     * @member {Array.<Certificate.ICertificateData>} certificateData
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.certificateData = $util.emptyArray;

    /**
     * IssueCertificateAction validFrom.
     * @member {number|Long} validFrom
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.validFrom = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * IssueCertificateAction validTo.
     * @member {number|Long} validTo
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.validTo = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new IssueCertificateAction instance using the specified properties.
     * @function create
     * @memberof IssueCertificateAction
     * @static
     * @param {IIssueCertificateAction=} [properties] Properties to set
     * @returns {IssueCertificateAction} IssueCertificateAction instance
     */
    IssueCertificateAction.create = function create(properties) {
        return new IssueCertificateAction(properties);
    };

    /**
     * Encodes the specified IssueCertificateAction message. Does not implicitly {@link IssueCertificateAction.verify|verify} messages.
     * @function encode
     * @memberof IssueCertificateAction
     * @static
     * @param {IIssueCertificateAction} message IssueCertificateAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    IssueCertificateAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.factoryId != null && Object.hasOwnProperty.call(message, "factoryId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.factoryId);
        if (message.source != null && Object.hasOwnProperty.call(message, "source"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.source);
        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.requestId);
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.standardId);
        if (message.certificateData != null && message.certificateData.length)
            for (var i = 0; i < message.certificateData.length; ++i)
                $root.Certificate.CertificateData.encode(message.certificateData[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.validFrom != null && Object.hasOwnProperty.call(message, "validFrom"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.validFrom);
        if (message.validTo != null && Object.hasOwnProperty.call(message, "validTo"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.validTo);
        return writer;
    };

    /**
     * Encodes the specified IssueCertificateAction message, length delimited. Does not implicitly {@link IssueCertificateAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof IssueCertificateAction
     * @static
     * @param {IIssueCertificateAction} message IssueCertificateAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    IssueCertificateAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an IssueCertificateAction message from the specified reader or buffer.
     * @function decode
     * @memberof IssueCertificateAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {IssueCertificateAction} IssueCertificateAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    IssueCertificateAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.IssueCertificateAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.factoryId = reader.string();
                break;
            case 3:
                message.source = reader.int32();
                break;
            case 4:
                message.requestId = reader.string();
                break;
            case 5:
                message.standardId = reader.string();
                break;
            case 6:
                if (!(message.certificateData && message.certificateData.length))
                    message.certificateData = [];
                message.certificateData.push($root.Certificate.CertificateData.decode(reader, reader.uint32()));
                break;
            case 7:
                message.validFrom = reader.uint64();
                break;
            case 8:
                message.validTo = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an IssueCertificateAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof IssueCertificateAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {IssueCertificateAction} IssueCertificateAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    IssueCertificateAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an IssueCertificateAction message.
     * @function verify
     * @memberof IssueCertificateAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    IssueCertificateAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.factoryId != null && message.hasOwnProperty("factoryId"))
            if (!$util.isString(message.factoryId))
                return "factoryId: string expected";
        if (message.source != null && message.hasOwnProperty("source"))
            switch (message.source) {
            default:
                return "source: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            if (!$util.isString(message.requestId))
                return "requestId: string expected";
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.certificateData != null && message.hasOwnProperty("certificateData")) {
            if (!Array.isArray(message.certificateData))
                return "certificateData: array expected";
            for (var i = 0; i < message.certificateData.length; ++i) {
                var error = $root.Certificate.CertificateData.verify(message.certificateData[i]);
                if (error)
                    return "certificateData." + error;
            }
        }
        if (message.validFrom != null && message.hasOwnProperty("validFrom"))
            if (!$util.isInteger(message.validFrom) && !(message.validFrom && $util.isInteger(message.validFrom.low) && $util.isInteger(message.validFrom.high)))
                return "validFrom: integer|Long expected";
        if (message.validTo != null && message.hasOwnProperty("validTo"))
            if (!$util.isInteger(message.validTo) && !(message.validTo && $util.isInteger(message.validTo.low) && $util.isInteger(message.validTo.high)))
                return "validTo: integer|Long expected";
        return null;
    };

    /**
     * Creates an IssueCertificateAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof IssueCertificateAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {IssueCertificateAction} IssueCertificateAction
     */
    IssueCertificateAction.fromObject = function fromObject(object) {
        if (object instanceof $root.IssueCertificateAction)
            return object;
        var message = new $root.IssueCertificateAction();
        if (object.id != null)
            message.id = String(object.id);
        if (object.factoryId != null)
            message.factoryId = String(object.factoryId);
        switch (object.source) {
        case "UNSET_SOURCE":
        case 0:
            message.source = 0;
            break;
        case "FROM_REQUEST":
        case 1:
            message.source = 1;
            break;
        case "INDEPENDENT":
        case 2:
            message.source = 2;
            break;
        }
        if (object.requestId != null)
            message.requestId = String(object.requestId);
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.certificateData) {
            if (!Array.isArray(object.certificateData))
                throw TypeError(".IssueCertificateAction.certificateData: array expected");
            message.certificateData = [];
            for (var i = 0; i < object.certificateData.length; ++i) {
                if (typeof object.certificateData[i] !== "object")
                    throw TypeError(".IssueCertificateAction.certificateData: object expected");
                message.certificateData[i] = $root.Certificate.CertificateData.fromObject(object.certificateData[i]);
            }
        }
        if (object.validFrom != null)
            if ($util.Long)
                (message.validFrom = $util.Long.fromValue(object.validFrom)).unsigned = true;
            else if (typeof object.validFrom === "string")
                message.validFrom = parseInt(object.validFrom, 10);
            else if (typeof object.validFrom === "number")
                message.validFrom = object.validFrom;
            else if (typeof object.validFrom === "object")
                message.validFrom = new $util.LongBits(object.validFrom.low >>> 0, object.validFrom.high >>> 0).toNumber(true);
        if (object.validTo != null)
            if ($util.Long)
                (message.validTo = $util.Long.fromValue(object.validTo)).unsigned = true;
            else if (typeof object.validTo === "string")
                message.validTo = parseInt(object.validTo, 10);
            else if (typeof object.validTo === "number")
                message.validTo = object.validTo;
            else if (typeof object.validTo === "object")
                message.validTo = new $util.LongBits(object.validTo.low >>> 0, object.validTo.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an IssueCertificateAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof IssueCertificateAction
     * @static
     * @param {IssueCertificateAction} message IssueCertificateAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    IssueCertificateAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.certificateData = [];
        if (options.defaults) {
            object.id = "";
            object.factoryId = "";
            object.source = options.enums === String ? "UNSET_SOURCE" : 0;
            object.requestId = "";
            object.standardId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.validFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.validTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validTo = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.factoryId != null && message.hasOwnProperty("factoryId"))
            object.factoryId = message.factoryId;
        if (message.source != null && message.hasOwnProperty("source"))
            object.source = options.enums === String ? $root.IssueCertificateAction.Source[message.source] : message.source;
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = message.requestId;
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.certificateData && message.certificateData.length) {
            object.certificateData = [];
            for (var j = 0; j < message.certificateData.length; ++j)
                object.certificateData[j] = $root.Certificate.CertificateData.toObject(message.certificateData[j], options);
        }
        if (message.validFrom != null && message.hasOwnProperty("validFrom"))
            if (typeof message.validFrom === "number")
                object.validFrom = options.longs === String ? String(message.validFrom) : message.validFrom;
            else
                object.validFrom = options.longs === String ? $util.Long.prototype.toString.call(message.validFrom) : options.longs === Number ? new $util.LongBits(message.validFrom.low >>> 0, message.validFrom.high >>> 0).toNumber(true) : message.validFrom;
        if (message.validTo != null && message.hasOwnProperty("validTo"))
            if (typeof message.validTo === "number")
                object.validTo = options.longs === String ? String(message.validTo) : message.validTo;
            else
                object.validTo = options.longs === String ? $util.Long.prototype.toString.call(message.validTo) : options.longs === Number ? new $util.LongBits(message.validTo.low >>> 0, message.validTo.high >>> 0).toNumber(true) : message.validTo;
        return object;
    };

    /**
     * Converts this IssueCertificateAction to JSON.
     * @function toJSON
     * @memberof IssueCertificateAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    IssueCertificateAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Source enum.
     * @name IssueCertificateAction.Source
     * @enum {number}
     * @property {number} UNSET_SOURCE=0 UNSET_SOURCE value
     * @property {number} FROM_REQUEST=1 FROM_REQUEST value
     * @property {number} INDEPENDENT=2 INDEPENDENT value
     */
    IssueCertificateAction.Source = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSET_SOURCE"] = 0;
        values[valuesById[1] = "FROM_REQUEST"] = 1;
        values[valuesById[2] = "INDEPENDENT"] = 2;
        return values;
    })();

    return IssueCertificateAction;
})();

$root.OpenRequestAction = (function() {

    /**
     * Properties of an OpenRequestAction.
     * @exports IOpenRequestAction
     * @interface IOpenRequestAction
     * @property {string|null} [id] OpenRequestAction id
     * @property {string|null} [standardId] OpenRequestAction standardId
     * @property {number|Long|null} [requestDate] OpenRequestAction requestDate
     */

    /**
     * Constructs a new OpenRequestAction.
     * @exports OpenRequestAction
     * @classdesc Represents an OpenRequestAction.
     * @implements IOpenRequestAction
     * @constructor
     * @param {IOpenRequestAction=} [properties] Properties to set
     */
    function OpenRequestAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OpenRequestAction id.
     * @member {string} id
     * @memberof OpenRequestAction
     * @instance
     */
    OpenRequestAction.prototype.id = "";

    /**
     * OpenRequestAction standardId.
     * @member {string} standardId
     * @memberof OpenRequestAction
     * @instance
     */
    OpenRequestAction.prototype.standardId = "";

    /**
     * OpenRequestAction requestDate.
     * @member {number|Long} requestDate
     * @memberof OpenRequestAction
     * @instance
     */
    OpenRequestAction.prototype.requestDate = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new OpenRequestAction instance using the specified properties.
     * @function create
     * @memberof OpenRequestAction
     * @static
     * @param {IOpenRequestAction=} [properties] Properties to set
     * @returns {OpenRequestAction} OpenRequestAction instance
     */
    OpenRequestAction.create = function create(properties) {
        return new OpenRequestAction(properties);
    };

    /**
     * Encodes the specified OpenRequestAction message. Does not implicitly {@link OpenRequestAction.verify|verify} messages.
     * @function encode
     * @memberof OpenRequestAction
     * @static
     * @param {IOpenRequestAction} message OpenRequestAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OpenRequestAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.standardId);
        if (message.requestDate != null && Object.hasOwnProperty.call(message, "requestDate"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.requestDate);
        return writer;
    };

    /**
     * Encodes the specified OpenRequestAction message, length delimited. Does not implicitly {@link OpenRequestAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OpenRequestAction
     * @static
     * @param {IOpenRequestAction} message OpenRequestAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OpenRequestAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OpenRequestAction message from the specified reader or buffer.
     * @function decode
     * @memberof OpenRequestAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OpenRequestAction} OpenRequestAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OpenRequestAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OpenRequestAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.standardId = reader.string();
                break;
            case 3:
                message.requestDate = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OpenRequestAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OpenRequestAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OpenRequestAction} OpenRequestAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OpenRequestAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OpenRequestAction message.
     * @function verify
     * @memberof OpenRequestAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OpenRequestAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.requestDate != null && message.hasOwnProperty("requestDate"))
            if (!$util.isInteger(message.requestDate) && !(message.requestDate && $util.isInteger(message.requestDate.low) && $util.isInteger(message.requestDate.high)))
                return "requestDate: integer|Long expected";
        return null;
    };

    /**
     * Creates an OpenRequestAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OpenRequestAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OpenRequestAction} OpenRequestAction
     */
    OpenRequestAction.fromObject = function fromObject(object) {
        if (object instanceof $root.OpenRequestAction)
            return object;
        var message = new $root.OpenRequestAction();
        if (object.id != null)
            message.id = String(object.id);
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.requestDate != null)
            if ($util.Long)
                (message.requestDate = $util.Long.fromValue(object.requestDate)).unsigned = true;
            else if (typeof object.requestDate === "string")
                message.requestDate = parseInt(object.requestDate, 10);
            else if (typeof object.requestDate === "number")
                message.requestDate = object.requestDate;
            else if (typeof object.requestDate === "object")
                message.requestDate = new $util.LongBits(object.requestDate.low >>> 0, object.requestDate.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an OpenRequestAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OpenRequestAction
     * @static
     * @param {OpenRequestAction} message OpenRequestAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OpenRequestAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.standardId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.requestDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.requestDate = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.requestDate != null && message.hasOwnProperty("requestDate"))
            if (typeof message.requestDate === "number")
                object.requestDate = options.longs === String ? String(message.requestDate) : message.requestDate;
            else
                object.requestDate = options.longs === String ? $util.Long.prototype.toString.call(message.requestDate) : options.longs === Number ? new $util.LongBits(message.requestDate.low >>> 0, message.requestDate.high >>> 0).toNumber(true) : message.requestDate;
        return object;
    };

    /**
     * Converts this OpenRequestAction to JSON.
     * @function toJSON
     * @memberof OpenRequestAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OpenRequestAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return OpenRequestAction;
})();

$root.ChangeRequestStatusAction = (function() {

    /**
     * Properties of a ChangeRequestStatusAction.
     * @exports IChangeRequestStatusAction
     * @interface IChangeRequestStatusAction
     * @property {string|null} [requestId] ChangeRequestStatusAction requestId
     * @property {Request.Status|null} [status] ChangeRequestStatusAction status
     */

    /**
     * Constructs a new ChangeRequestStatusAction.
     * @exports ChangeRequestStatusAction
     * @classdesc Represents a ChangeRequestStatusAction.
     * @implements IChangeRequestStatusAction
     * @constructor
     * @param {IChangeRequestStatusAction=} [properties] Properties to set
     */
    function ChangeRequestStatusAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChangeRequestStatusAction requestId.
     * @member {string} requestId
     * @memberof ChangeRequestStatusAction
     * @instance
     */
    ChangeRequestStatusAction.prototype.requestId = "";

    /**
     * ChangeRequestStatusAction status.
     * @member {Request.Status} status
     * @memberof ChangeRequestStatusAction
     * @instance
     */
    ChangeRequestStatusAction.prototype.status = 0;

    /**
     * Creates a new ChangeRequestStatusAction instance using the specified properties.
     * @function create
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {IChangeRequestStatusAction=} [properties] Properties to set
     * @returns {ChangeRequestStatusAction} ChangeRequestStatusAction instance
     */
    ChangeRequestStatusAction.create = function create(properties) {
        return new ChangeRequestStatusAction(properties);
    };

    /**
     * Encodes the specified ChangeRequestStatusAction message. Does not implicitly {@link ChangeRequestStatusAction.verify|verify} messages.
     * @function encode
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {IChangeRequestStatusAction} message ChangeRequestStatusAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChangeRequestStatusAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.requestId);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
        return writer;
    };

    /**
     * Encodes the specified ChangeRequestStatusAction message, length delimited. Does not implicitly {@link ChangeRequestStatusAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {IChangeRequestStatusAction} message ChangeRequestStatusAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChangeRequestStatusAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChangeRequestStatusAction message from the specified reader or buffer.
     * @function decode
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChangeRequestStatusAction} ChangeRequestStatusAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChangeRequestStatusAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChangeRequestStatusAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.requestId = reader.string();
                break;
            case 2:
                message.status = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChangeRequestStatusAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChangeRequestStatusAction} ChangeRequestStatusAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChangeRequestStatusAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChangeRequestStatusAction message.
     * @function verify
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChangeRequestStatusAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            if (!$util.isString(message.requestId))
                return "requestId: string expected";
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
        return null;
    };

    /**
     * Creates a ChangeRequestStatusAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChangeRequestStatusAction} ChangeRequestStatusAction
     */
    ChangeRequestStatusAction.fromObject = function fromObject(object) {
        if (object instanceof $root.ChangeRequestStatusAction)
            return object;
        var message = new $root.ChangeRequestStatusAction();
        if (object.requestId != null)
            message.requestId = String(object.requestId);
        switch (object.status) {
        case "UNSET_STATUS":
        case 0:
            message.status = 0;
            break;
        case "OPEN":
        case 1:
            message.status = 1;
            break;
        case "IN_PROGRESS":
        case 2:
            message.status = 2;
            break;
        case "CLOSED":
        case 3:
            message.status = 3;
            break;
        case "CERTIFIED":
        case 4:
            message.status = 4;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a ChangeRequestStatusAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChangeRequestStatusAction
     * @static
     * @param {ChangeRequestStatusAction} message ChangeRequestStatusAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChangeRequestStatusAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.requestId = "";
            object.status = options.enums === String ? "UNSET_STATUS" : 0;
        }
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = message.requestId;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.Request.Status[message.status] : message.status;
        return object;
    };

    /**
     * Converts this ChangeRequestStatusAction to JSON.
     * @function toJSON
     * @memberof ChangeRequestStatusAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChangeRequestStatusAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChangeRequestStatusAction;
})();

$root.CreateStandardAction = (function() {

    /**
     * Properties of a CreateStandardAction.
     * @exports ICreateStandardAction
     * @interface ICreateStandardAction
     * @property {string|null} [standardId] CreateStandardAction standardId
     * @property {string|null} [name] CreateStandardAction name
     * @property {string|null} [version] CreateStandardAction version
     * @property {string|null} [description] CreateStandardAction description
     * @property {string|null} [link] CreateStandardAction link
     * @property {number|Long|null} [approvalDate] CreateStandardAction approvalDate
     */

    /**
     * Constructs a new CreateStandardAction.
     * @exports CreateStandardAction
     * @classdesc Represents a CreateStandardAction.
     * @implements ICreateStandardAction
     * @constructor
     * @param {ICreateStandardAction=} [properties] Properties to set
     */
    function CreateStandardAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateStandardAction standardId.
     * @member {string} standardId
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.standardId = "";

    /**
     * CreateStandardAction name.
     * @member {string} name
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.name = "";

    /**
     * CreateStandardAction version.
     * @member {string} version
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.version = "";

    /**
     * CreateStandardAction description.
     * @member {string} description
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.description = "";

    /**
     * CreateStandardAction link.
     * @member {string} link
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.link = "";

    /**
     * CreateStandardAction approvalDate.
     * @member {number|Long} approvalDate
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.approvalDate = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CreateStandardAction instance using the specified properties.
     * @function create
     * @memberof CreateStandardAction
     * @static
     * @param {ICreateStandardAction=} [properties] Properties to set
     * @returns {CreateStandardAction} CreateStandardAction instance
     */
    CreateStandardAction.create = function create(properties) {
        return new CreateStandardAction(properties);
    };

    /**
     * Encodes the specified CreateStandardAction message. Does not implicitly {@link CreateStandardAction.verify|verify} messages.
     * @function encode
     * @memberof CreateStandardAction
     * @static
     * @param {ICreateStandardAction} message CreateStandardAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateStandardAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.standardId);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
        if (message.link != null && Object.hasOwnProperty.call(message, "link"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.link);
        if (message.approvalDate != null && Object.hasOwnProperty.call(message, "approvalDate"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.approvalDate);
        return writer;
    };

    /**
     * Encodes the specified CreateStandardAction message, length delimited. Does not implicitly {@link CreateStandardAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateStandardAction
     * @static
     * @param {ICreateStandardAction} message CreateStandardAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateStandardAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateStandardAction message from the specified reader or buffer.
     * @function decode
     * @memberof CreateStandardAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateStandardAction} CreateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateStandardAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateStandardAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.standardId = reader.string();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.version = reader.string();
                break;
            case 4:
                message.description = reader.string();
                break;
            case 5:
                message.link = reader.string();
                break;
            case 6:
                message.approvalDate = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CreateStandardAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateStandardAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateStandardAction} CreateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateStandardAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateStandardAction message.
     * @function verify
     * @memberof CreateStandardAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateStandardAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isString(message.version))
                return "version: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.link != null && message.hasOwnProperty("link"))
            if (!$util.isString(message.link))
                return "link: string expected";
        if (message.approvalDate != null && message.hasOwnProperty("approvalDate"))
            if (!$util.isInteger(message.approvalDate) && !(message.approvalDate && $util.isInteger(message.approvalDate.low) && $util.isInteger(message.approvalDate.high)))
                return "approvalDate: integer|Long expected";
        return null;
    };

    /**
     * Creates a CreateStandardAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateStandardAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateStandardAction} CreateStandardAction
     */
    CreateStandardAction.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateStandardAction)
            return object;
        var message = new $root.CreateStandardAction();
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.name != null)
            message.name = String(object.name);
        if (object.version != null)
            message.version = String(object.version);
        if (object.description != null)
            message.description = String(object.description);
        if (object.link != null)
            message.link = String(object.link);
        if (object.approvalDate != null)
            if ($util.Long)
                (message.approvalDate = $util.Long.fromValue(object.approvalDate)).unsigned = true;
            else if (typeof object.approvalDate === "string")
                message.approvalDate = parseInt(object.approvalDate, 10);
            else if (typeof object.approvalDate === "number")
                message.approvalDate = object.approvalDate;
            else if (typeof object.approvalDate === "object")
                message.approvalDate = new $util.LongBits(object.approvalDate.low >>> 0, object.approvalDate.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a CreateStandardAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateStandardAction
     * @static
     * @param {CreateStandardAction} message CreateStandardAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateStandardAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.standardId = "";
            object.name = "";
            object.version = "";
            object.description = "";
            object.link = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.approvalDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.approvalDate = options.longs === String ? "0" : 0;
        }
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.link != null && message.hasOwnProperty("link"))
            object.link = message.link;
        if (message.approvalDate != null && message.hasOwnProperty("approvalDate"))
            if (typeof message.approvalDate === "number")
                object.approvalDate = options.longs === String ? String(message.approvalDate) : message.approvalDate;
            else
                object.approvalDate = options.longs === String ? $util.Long.prototype.toString.call(message.approvalDate) : options.longs === Number ? new $util.LongBits(message.approvalDate.low >>> 0, message.approvalDate.high >>> 0).toNumber(true) : message.approvalDate;
        return object;
    };

    /**
     * Converts this CreateStandardAction to JSON.
     * @function toJSON
     * @memberof CreateStandardAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateStandardAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateStandardAction;
})();

$root.UpdateStandardAction = (function() {

    /**
     * Properties of an UpdateStandardAction.
     * @exports IUpdateStandardAction
     * @interface IUpdateStandardAction
     * @property {string|null} [standardId] UpdateStandardAction standardId
     * @property {string|null} [version] UpdateStandardAction version
     * @property {string|null} [description] UpdateStandardAction description
     * @property {string|null} [link] UpdateStandardAction link
     * @property {number|Long|null} [approvalDate] UpdateStandardAction approvalDate
     */

    /**
     * Constructs a new UpdateStandardAction.
     * @exports UpdateStandardAction
     * @classdesc Represents an UpdateStandardAction.
     * @implements IUpdateStandardAction
     * @constructor
     * @param {IUpdateStandardAction=} [properties] Properties to set
     */
    function UpdateStandardAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdateStandardAction standardId.
     * @member {string} standardId
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.standardId = "";

    /**
     * UpdateStandardAction version.
     * @member {string} version
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.version = "";

    /**
     * UpdateStandardAction description.
     * @member {string} description
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.description = "";

    /**
     * UpdateStandardAction link.
     * @member {string} link
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.link = "";

    /**
     * UpdateStandardAction approvalDate.
     * @member {number|Long} approvalDate
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.approvalDate = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new UpdateStandardAction instance using the specified properties.
     * @function create
     * @memberof UpdateStandardAction
     * @static
     * @param {IUpdateStandardAction=} [properties] Properties to set
     * @returns {UpdateStandardAction} UpdateStandardAction instance
     */
    UpdateStandardAction.create = function create(properties) {
        return new UpdateStandardAction(properties);
    };

    /**
     * Encodes the specified UpdateStandardAction message. Does not implicitly {@link UpdateStandardAction.verify|verify} messages.
     * @function encode
     * @memberof UpdateStandardAction
     * @static
     * @param {IUpdateStandardAction} message UpdateStandardAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateStandardAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.standardId);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
        if (message.link != null && Object.hasOwnProperty.call(message, "link"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.link);
        if (message.approvalDate != null && Object.hasOwnProperty.call(message, "approvalDate"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.approvalDate);
        return writer;
    };

    /**
     * Encodes the specified UpdateStandardAction message, length delimited. Does not implicitly {@link UpdateStandardAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdateStandardAction
     * @static
     * @param {IUpdateStandardAction} message UpdateStandardAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateStandardAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpdateStandardAction message from the specified reader or buffer.
     * @function decode
     * @memberof UpdateStandardAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdateStandardAction} UpdateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateStandardAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpdateStandardAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.standardId = reader.string();
                break;
            case 2:
                message.version = reader.string();
                break;
            case 3:
                message.description = reader.string();
                break;
            case 4:
                message.link = reader.string();
                break;
            case 5:
                message.approvalDate = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpdateStandardAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdateStandardAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdateStandardAction} UpdateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateStandardAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdateStandardAction message.
     * @function verify
     * @memberof UpdateStandardAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdateStandardAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isString(message.version))
                return "version: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.link != null && message.hasOwnProperty("link"))
            if (!$util.isString(message.link))
                return "link: string expected";
        if (message.approvalDate != null && message.hasOwnProperty("approvalDate"))
            if (!$util.isInteger(message.approvalDate) && !(message.approvalDate && $util.isInteger(message.approvalDate.low) && $util.isInteger(message.approvalDate.high)))
                return "approvalDate: integer|Long expected";
        return null;
    };

    /**
     * Creates an UpdateStandardAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdateStandardAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdateStandardAction} UpdateStandardAction
     */
    UpdateStandardAction.fromObject = function fromObject(object) {
        if (object instanceof $root.UpdateStandardAction)
            return object;
        var message = new $root.UpdateStandardAction();
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.version != null)
            message.version = String(object.version);
        if (object.description != null)
            message.description = String(object.description);
        if (object.link != null)
            message.link = String(object.link);
        if (object.approvalDate != null)
            if ($util.Long)
                (message.approvalDate = $util.Long.fromValue(object.approvalDate)).unsigned = true;
            else if (typeof object.approvalDate === "string")
                message.approvalDate = parseInt(object.approvalDate, 10);
            else if (typeof object.approvalDate === "number")
                message.approvalDate = object.approvalDate;
            else if (typeof object.approvalDate === "object")
                message.approvalDate = new $util.LongBits(object.approvalDate.low >>> 0, object.approvalDate.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an UpdateStandardAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdateStandardAction
     * @static
     * @param {UpdateStandardAction} message UpdateStandardAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdateStandardAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.standardId = "";
            object.version = "";
            object.description = "";
            object.link = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.approvalDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.approvalDate = options.longs === String ? "0" : 0;
        }
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.link != null && message.hasOwnProperty("link"))
            object.link = message.link;
        if (message.approvalDate != null && message.hasOwnProperty("approvalDate"))
            if (typeof message.approvalDate === "number")
                object.approvalDate = options.longs === String ? String(message.approvalDate) : message.approvalDate;
            else
                object.approvalDate = options.longs === String ? $util.Long.prototype.toString.call(message.approvalDate) : options.longs === Number ? new $util.LongBits(message.approvalDate.low >>> 0, message.approvalDate.high >>> 0).toNumber(true) : message.approvalDate;
        return object;
    };

    /**
     * Converts this UpdateStandardAction to JSON.
     * @function toJSON
     * @memberof UpdateStandardAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdateStandardAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdateStandardAction;
})();

$root.AccreditCertifyingBodyAction = (function() {

    /**
     * Properties of an AccreditCertifyingBodyAction.
     * @exports IAccreditCertifyingBodyAction
     * @interface IAccreditCertifyingBodyAction
     * @property {string|null} [certifyingBodyId] AccreditCertifyingBodyAction certifyingBodyId
     * @property {string|null} [standardId] AccreditCertifyingBodyAction standardId
     * @property {number|Long|null} [validFrom] AccreditCertifyingBodyAction validFrom
     * @property {number|Long|null} [validTo] AccreditCertifyingBodyAction validTo
     */

    /**
     * Constructs a new AccreditCertifyingBodyAction.
     * @exports AccreditCertifyingBodyAction
     * @classdesc Represents an AccreditCertifyingBodyAction.
     * @implements IAccreditCertifyingBodyAction
     * @constructor
     * @param {IAccreditCertifyingBodyAction=} [properties] Properties to set
     */
    function AccreditCertifyingBodyAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AccreditCertifyingBodyAction certifyingBodyId.
     * @member {string} certifyingBodyId
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.certifyingBodyId = "";

    /**
     * AccreditCertifyingBodyAction standardId.
     * @member {string} standardId
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.standardId = "";

    /**
     * AccreditCertifyingBodyAction validFrom.
     * @member {number|Long} validFrom
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.validFrom = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * AccreditCertifyingBodyAction validTo.
     * @member {number|Long} validTo
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.validTo = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new AccreditCertifyingBodyAction instance using the specified properties.
     * @function create
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {IAccreditCertifyingBodyAction=} [properties] Properties to set
     * @returns {AccreditCertifyingBodyAction} AccreditCertifyingBodyAction instance
     */
    AccreditCertifyingBodyAction.create = function create(properties) {
        return new AccreditCertifyingBodyAction(properties);
    };

    /**
     * Encodes the specified AccreditCertifyingBodyAction message. Does not implicitly {@link AccreditCertifyingBodyAction.verify|verify} messages.
     * @function encode
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {IAccreditCertifyingBodyAction} message AccreditCertifyingBodyAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AccreditCertifyingBodyAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.certifyingBodyId != null && Object.hasOwnProperty.call(message, "certifyingBodyId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.certifyingBodyId);
        if (message.standardId != null && Object.hasOwnProperty.call(message, "standardId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.standardId);
        if (message.validFrom != null && Object.hasOwnProperty.call(message, "validFrom"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.validFrom);
        if (message.validTo != null && Object.hasOwnProperty.call(message, "validTo"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.validTo);
        return writer;
    };

    /**
     * Encodes the specified AccreditCertifyingBodyAction message, length delimited. Does not implicitly {@link AccreditCertifyingBodyAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {IAccreditCertifyingBodyAction} message AccreditCertifyingBodyAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AccreditCertifyingBodyAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AccreditCertifyingBodyAction message from the specified reader or buffer.
     * @function decode
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AccreditCertifyingBodyAction} AccreditCertifyingBodyAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AccreditCertifyingBodyAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccreditCertifyingBodyAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.certifyingBodyId = reader.string();
                break;
            case 2:
                message.standardId = reader.string();
                break;
            case 3:
                message.validFrom = reader.uint64();
                break;
            case 4:
                message.validTo = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AccreditCertifyingBodyAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AccreditCertifyingBodyAction} AccreditCertifyingBodyAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AccreditCertifyingBodyAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AccreditCertifyingBodyAction message.
     * @function verify
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AccreditCertifyingBodyAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.certifyingBodyId != null && message.hasOwnProperty("certifyingBodyId"))
            if (!$util.isString(message.certifyingBodyId))
                return "certifyingBodyId: string expected";
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            if (!$util.isString(message.standardId))
                return "standardId: string expected";
        if (message.validFrom != null && message.hasOwnProperty("validFrom"))
            if (!$util.isInteger(message.validFrom) && !(message.validFrom && $util.isInteger(message.validFrom.low) && $util.isInteger(message.validFrom.high)))
                return "validFrom: integer|Long expected";
        if (message.validTo != null && message.hasOwnProperty("validTo"))
            if (!$util.isInteger(message.validTo) && !(message.validTo && $util.isInteger(message.validTo.low) && $util.isInteger(message.validTo.high)))
                return "validTo: integer|Long expected";
        return null;
    };

    /**
     * Creates an AccreditCertifyingBodyAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AccreditCertifyingBodyAction} AccreditCertifyingBodyAction
     */
    AccreditCertifyingBodyAction.fromObject = function fromObject(object) {
        if (object instanceof $root.AccreditCertifyingBodyAction)
            return object;
        var message = new $root.AccreditCertifyingBodyAction();
        if (object.certifyingBodyId != null)
            message.certifyingBodyId = String(object.certifyingBodyId);
        if (object.standardId != null)
            message.standardId = String(object.standardId);
        if (object.validFrom != null)
            if ($util.Long)
                (message.validFrom = $util.Long.fromValue(object.validFrom)).unsigned = true;
            else if (typeof object.validFrom === "string")
                message.validFrom = parseInt(object.validFrom, 10);
            else if (typeof object.validFrom === "number")
                message.validFrom = object.validFrom;
            else if (typeof object.validFrom === "object")
                message.validFrom = new $util.LongBits(object.validFrom.low >>> 0, object.validFrom.high >>> 0).toNumber(true);
        if (object.validTo != null)
            if ($util.Long)
                (message.validTo = $util.Long.fromValue(object.validTo)).unsigned = true;
            else if (typeof object.validTo === "string")
                message.validTo = parseInt(object.validTo, 10);
            else if (typeof object.validTo === "number")
                message.validTo = object.validTo;
            else if (typeof object.validTo === "object")
                message.validTo = new $util.LongBits(object.validTo.low >>> 0, object.validTo.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an AccreditCertifyingBodyAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AccreditCertifyingBodyAction
     * @static
     * @param {AccreditCertifyingBodyAction} message AccreditCertifyingBodyAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AccreditCertifyingBodyAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.certifyingBodyId = "";
            object.standardId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.validFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.validTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.validTo = options.longs === String ? "0" : 0;
        }
        if (message.certifyingBodyId != null && message.hasOwnProperty("certifyingBodyId"))
            object.certifyingBodyId = message.certifyingBodyId;
        if (message.standardId != null && message.hasOwnProperty("standardId"))
            object.standardId = message.standardId;
        if (message.validFrom != null && message.hasOwnProperty("validFrom"))
            if (typeof message.validFrom === "number")
                object.validFrom = options.longs === String ? String(message.validFrom) : message.validFrom;
            else
                object.validFrom = options.longs === String ? $util.Long.prototype.toString.call(message.validFrom) : options.longs === Number ? new $util.LongBits(message.validFrom.low >>> 0, message.validFrom.high >>> 0).toNumber(true) : message.validFrom;
        if (message.validTo != null && message.hasOwnProperty("validTo"))
            if (typeof message.validTo === "number")
                object.validTo = options.longs === String ? String(message.validTo) : message.validTo;
            else
                object.validTo = options.longs === String ? $util.Long.prototype.toString.call(message.validTo) : options.longs === Number ? new $util.LongBits(message.validTo.low >>> 0, message.validTo.high >>> 0).toNumber(true) : message.validTo;
        return object;
    };

    /**
     * Converts this AccreditCertifyingBodyAction to JSON.
     * @function toJSON
     * @memberof AccreditCertifyingBodyAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AccreditCertifyingBodyAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AccreditCertifyingBodyAction;
})();

module.exports = $root;
