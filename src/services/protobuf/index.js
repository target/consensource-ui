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
     * @property {string|null} [public_key] Agent public_key
     * @property {string|null} [name] Agent name
     * @property {string|null} [organization_id] Agent organization_id
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
     * Agent public_key.
     * @member {string} public_key
     * @memberof Agent
     * @instance
     */
    Agent.prototype.public_key = "";

    /**
     * Agent name.
     * @member {string} name
     * @memberof Agent
     * @instance
     */
    Agent.prototype.name = "";

    /**
     * Agent organization_id.
     * @member {string} organization_id
     * @memberof Agent
     * @instance
     */
    Agent.prototype.organization_id = "";

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
        if (message.public_key != null && Object.hasOwnProperty.call(message, "public_key"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.public_key);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.organization_id != null && Object.hasOwnProperty.call(message, "organization_id"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.organization_id);
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
                message.public_key = reader.string();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.organization_id = reader.string();
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
        if (message.public_key != null && message.hasOwnProperty("public_key"))
            if (!$util.isString(message.public_key))
                return "public_key: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.organization_id != null && message.hasOwnProperty("organization_id"))
            if (!$util.isString(message.organization_id))
                return "organization_id: string expected";
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
        if (object.public_key != null)
            message.public_key = String(object.public_key);
        if (object.name != null)
            message.name = String(object.name);
        if (object.organization_id != null)
            message.organization_id = String(object.organization_id);
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
            object.public_key = "";
            object.name = "";
            object.organization_id = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
        }
        if (message.public_key != null && message.hasOwnProperty("public_key"))
            object.public_key = message.public_key;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.organization_id != null && message.hasOwnProperty("organization_id"))
            object.organization_id = message.organization_id;
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

$root.Assertion = (function() {

    /**
     * Properties of an Assertion.
     * @exports IAssertion
     * @interface IAssertion
     * @property {string|null} [id] Assertion id
     * @property {string|null} [assertor_pub_key] Assertion assertor_pub_key
     * @property {Assertion.Type|null} [assertion_type] Assertion assertion_type
     * @property {string|null} [object_id] Assertion object_id
     * @property {string|null} [data_id] Assertion data_id
     */

    /**
     * Constructs a new Assertion.
     * @exports Assertion
     * @classdesc Represents an Assertion.
     * @implements IAssertion
     * @constructor
     * @param {IAssertion=} [properties] Properties to set
     */
    function Assertion(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Assertion id.
     * @member {string} id
     * @memberof Assertion
     * @instance
     */
    Assertion.prototype.id = "";

    /**
     * Assertion assertor_pub_key.
     * @member {string} assertor_pub_key
     * @memberof Assertion
     * @instance
     */
    Assertion.prototype.assertor_pub_key = "";

    /**
     * Assertion assertion_type.
     * @member {Assertion.Type} assertion_type
     * @memberof Assertion
     * @instance
     */
    Assertion.prototype.assertion_type = 0;

    /**
     * Assertion object_id.
     * @member {string} object_id
     * @memberof Assertion
     * @instance
     */
    Assertion.prototype.object_id = "";

    /**
     * Assertion data_id.
     * @member {string} data_id
     * @memberof Assertion
     * @instance
     */
    Assertion.prototype.data_id = "";

    /**
     * Creates a new Assertion instance using the specified properties.
     * @function create
     * @memberof Assertion
     * @static
     * @param {IAssertion=} [properties] Properties to set
     * @returns {Assertion} Assertion instance
     */
    Assertion.create = function create(properties) {
        return new Assertion(properties);
    };

    /**
     * Encodes the specified Assertion message. Does not implicitly {@link Assertion.verify|verify} messages.
     * @function encode
     * @memberof Assertion
     * @static
     * @param {IAssertion} message Assertion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Assertion.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.assertor_pub_key != null && Object.hasOwnProperty.call(message, "assertor_pub_key"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.assertor_pub_key);
        if (message.assertion_type != null && Object.hasOwnProperty.call(message, "assertion_type"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.assertion_type);
        if (message.object_id != null && Object.hasOwnProperty.call(message, "object_id"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.object_id);
        if (message.data_id != null && Object.hasOwnProperty.call(message, "data_id"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.data_id);
        return writer;
    };

    /**
     * Encodes the specified Assertion message, length delimited. Does not implicitly {@link Assertion.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Assertion
     * @static
     * @param {IAssertion} message Assertion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Assertion.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Assertion message from the specified reader or buffer.
     * @function decode
     * @memberof Assertion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Assertion} Assertion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Assertion.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Assertion();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.assertor_pub_key = reader.string();
                break;
            case 3:
                message.assertion_type = reader.int32();
                break;
            case 4:
                message.object_id = reader.string();
                break;
            case 5:
                message.data_id = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Assertion message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Assertion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Assertion} Assertion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Assertion.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Assertion message.
     * @function verify
     * @memberof Assertion
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Assertion.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.assertor_pub_key != null && message.hasOwnProperty("assertor_pub_key"))
            if (!$util.isString(message.assertor_pub_key))
                return "assertor_pub_key: string expected";
        if (message.assertion_type != null && message.hasOwnProperty("assertion_type"))
            switch (message.assertion_type) {
            default:
                return "assertion_type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.object_id != null && message.hasOwnProperty("object_id"))
            if (!$util.isString(message.object_id))
                return "object_id: string expected";
        if (message.data_id != null && message.hasOwnProperty("data_id"))
            if (!$util.isString(message.data_id))
                return "data_id: string expected";
        return null;
    };

    /**
     * Creates an Assertion message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Assertion
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Assertion} Assertion
     */
    Assertion.fromObject = function fromObject(object) {
        if (object instanceof $root.Assertion)
            return object;
        var message = new $root.Assertion();
        if (object.id != null)
            message.id = String(object.id);
        if (object.assertor_pub_key != null)
            message.assertor_pub_key = String(object.assertor_pub_key);
        switch (object.assertion_type) {
        case "UNSET_TYPE":
        case 0:
            message.assertion_type = 0;
            break;
        case "FACTORY":
        case 1:
            message.assertion_type = 1;
            break;
        case "CERTIFICATE":
        case 2:
            message.assertion_type = 2;
            break;
        case "STANDARD":
        case 3:
            message.assertion_type = 3;
            break;
        }
        if (object.object_id != null)
            message.object_id = String(object.object_id);
        if (object.data_id != null)
            message.data_id = String(object.data_id);
        return message;
    };

    /**
     * Creates a plain object from an Assertion message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Assertion
     * @static
     * @param {Assertion} message Assertion
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Assertion.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.assertor_pub_key = "";
            object.assertion_type = options.enums === String ? "UNSET_TYPE" : 0;
            object.object_id = "";
            object.data_id = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.assertor_pub_key != null && message.hasOwnProperty("assertor_pub_key"))
            object.assertor_pub_key = message.assertor_pub_key;
        if (message.assertion_type != null && message.hasOwnProperty("assertion_type"))
            object.assertion_type = options.enums === String ? $root.Assertion.Type[message.assertion_type] : message.assertion_type;
        if (message.object_id != null && message.hasOwnProperty("object_id"))
            object.object_id = message.object_id;
        if (message.data_id != null && message.hasOwnProperty("data_id"))
            object.data_id = message.data_id;
        return object;
    };

    /**
     * Converts this Assertion to JSON.
     * @function toJSON
     * @memberof Assertion
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Assertion.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Type enum.
     * @name Assertion.Type
     * @enum {number}
     * @property {number} UNSET_TYPE=0 UNSET_TYPE value
     * @property {number} FACTORY=1 FACTORY value
     * @property {number} CERTIFICATE=2 CERTIFICATE value
     * @property {number} STANDARD=3 STANDARD value
     */
    Assertion.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSET_TYPE"] = 0;
        values[valuesById[1] = "FACTORY"] = 1;
        values[valuesById[2] = "CERTIFICATE"] = 2;
        values[valuesById[3] = "STANDARD"] = 3;
        return values;
    })();

    return Assertion;
})();

$root.AssertionContainer = (function() {

    /**
     * Properties of an AssertionContainer.
     * @exports IAssertionContainer
     * @interface IAssertionContainer
     * @property {Array.<IAssertion>|null} [entries] AssertionContainer entries
     */

    /**
     * Constructs a new AssertionContainer.
     * @exports AssertionContainer
     * @classdesc Represents an AssertionContainer.
     * @implements IAssertionContainer
     * @constructor
     * @param {IAssertionContainer=} [properties] Properties to set
     */
    function AssertionContainer(properties) {
        this.entries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AssertionContainer entries.
     * @member {Array.<IAssertion>} entries
     * @memberof AssertionContainer
     * @instance
     */
    AssertionContainer.prototype.entries = $util.emptyArray;

    /**
     * Creates a new AssertionContainer instance using the specified properties.
     * @function create
     * @memberof AssertionContainer
     * @static
     * @param {IAssertionContainer=} [properties] Properties to set
     * @returns {AssertionContainer} AssertionContainer instance
     */
    AssertionContainer.create = function create(properties) {
        return new AssertionContainer(properties);
    };

    /**
     * Encodes the specified AssertionContainer message. Does not implicitly {@link AssertionContainer.verify|verify} messages.
     * @function encode
     * @memberof AssertionContainer
     * @static
     * @param {IAssertionContainer} message AssertionContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AssertionContainer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.entries != null && message.entries.length)
            for (var i = 0; i < message.entries.length; ++i)
                $root.Assertion.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AssertionContainer message, length delimited. Does not implicitly {@link AssertionContainer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AssertionContainer
     * @static
     * @param {IAssertionContainer} message AssertionContainer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AssertionContainer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AssertionContainer message from the specified reader or buffer.
     * @function decode
     * @memberof AssertionContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AssertionContainer} AssertionContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AssertionContainer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AssertionContainer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.entries && message.entries.length))
                    message.entries = [];
                message.entries.push($root.Assertion.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AssertionContainer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AssertionContainer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AssertionContainer} AssertionContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AssertionContainer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AssertionContainer message.
     * @function verify
     * @memberof AssertionContainer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AssertionContainer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.entries != null && message.hasOwnProperty("entries")) {
            if (!Array.isArray(message.entries))
                return "entries: array expected";
            for (var i = 0; i < message.entries.length; ++i) {
                var error = $root.Assertion.verify(message.entries[i]);
                if (error)
                    return "entries." + error;
            }
        }
        return null;
    };

    /**
     * Creates an AssertionContainer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AssertionContainer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AssertionContainer} AssertionContainer
     */
    AssertionContainer.fromObject = function fromObject(object) {
        if (object instanceof $root.AssertionContainer)
            return object;
        var message = new $root.AssertionContainer();
        if (object.entries) {
            if (!Array.isArray(object.entries))
                throw TypeError(".AssertionContainer.entries: array expected");
            message.entries = [];
            for (var i = 0; i < object.entries.length; ++i) {
                if (typeof object.entries[i] !== "object")
                    throw TypeError(".AssertionContainer.entries: object expected");
                message.entries[i] = $root.Assertion.fromObject(object.entries[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an AssertionContainer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AssertionContainer
     * @static
     * @param {AssertionContainer} message AssertionContainer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AssertionContainer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.entries = [];
        if (message.entries && message.entries.length) {
            object.entries = [];
            for (var j = 0; j < message.entries.length; ++j)
                object.entries[j] = $root.Assertion.toObject(message.entries[j], options);
        }
        return object;
    };

    /**
     * Converts this AssertionContainer to JSON.
     * @function toJSON
     * @memberof AssertionContainer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AssertionContainer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AssertionContainer;
})();

$root.Certificate = (function() {

    /**
     * Properties of a Certificate.
     * @exports ICertificate
     * @interface ICertificate
     * @property {string|null} [id] Certificate id
     * @property {string|null} [certifying_body_id] Certificate certifying_body_id
     * @property {string|null} [factory_id] Certificate factory_id
     * @property {string|null} [standard_id] Certificate standard_id
     * @property {string|null} [standard_version] Certificate standard_version
     * @property {Array.<Certificate.ICertificateData>|null} [certificate_data] Certificate certificate_data
     * @property {number|Long|null} [valid_from] Certificate valid_from
     * @property {number|Long|null} [valid_to] Certificate valid_to
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
        this.certificate_data = [];
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
     * Certificate certifying_body_id.
     * @member {string} certifying_body_id
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.certifying_body_id = "";

    /**
     * Certificate factory_id.
     * @member {string} factory_id
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.factory_id = "";

    /**
     * Certificate standard_id.
     * @member {string} standard_id
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.standard_id = "";

    /**
     * Certificate standard_version.
     * @member {string} standard_version
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.standard_version = "";

    /**
     * Certificate certificate_data.
     * @member {Array.<Certificate.ICertificateData>} certificate_data
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.certificate_data = $util.emptyArray;

    /**
     * Certificate valid_from.
     * @member {number|Long} valid_from
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.valid_from = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Certificate valid_to.
     * @member {number|Long} valid_to
     * @memberof Certificate
     * @instance
     */
    Certificate.prototype.valid_to = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.certifying_body_id != null && Object.hasOwnProperty.call(message, "certifying_body_id"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.certifying_body_id);
        if (message.factory_id != null && Object.hasOwnProperty.call(message, "factory_id"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.factory_id);
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.standard_id);
        if (message.standard_version != null && Object.hasOwnProperty.call(message, "standard_version"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.standard_version);
        if (message.certificate_data != null && message.certificate_data.length)
            for (var i = 0; i < message.certificate_data.length; ++i)
                $root.Certificate.CertificateData.encode(message.certificate_data[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.valid_from != null && Object.hasOwnProperty.call(message, "valid_from"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.valid_from);
        if (message.valid_to != null && Object.hasOwnProperty.call(message, "valid_to"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.valid_to);
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
                message.certifying_body_id = reader.string();
                break;
            case 3:
                message.factory_id = reader.string();
                break;
            case 4:
                message.standard_id = reader.string();
                break;
            case 5:
                message.standard_version = reader.string();
                break;
            case 6:
                if (!(message.certificate_data && message.certificate_data.length))
                    message.certificate_data = [];
                message.certificate_data.push($root.Certificate.CertificateData.decode(reader, reader.uint32()));
                break;
            case 7:
                message.valid_from = reader.uint64();
                break;
            case 8:
                message.valid_to = reader.uint64();
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
        if (message.certifying_body_id != null && message.hasOwnProperty("certifying_body_id"))
            if (!$util.isString(message.certifying_body_id))
                return "certifying_body_id: string expected";
        if (message.factory_id != null && message.hasOwnProperty("factory_id"))
            if (!$util.isString(message.factory_id))
                return "factory_id: string expected";
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
        if (message.standard_version != null && message.hasOwnProperty("standard_version"))
            if (!$util.isString(message.standard_version))
                return "standard_version: string expected";
        if (message.certificate_data != null && message.hasOwnProperty("certificate_data")) {
            if (!Array.isArray(message.certificate_data))
                return "certificate_data: array expected";
            for (var i = 0; i < message.certificate_data.length; ++i) {
                var error = $root.Certificate.CertificateData.verify(message.certificate_data[i]);
                if (error)
                    return "certificate_data." + error;
            }
        }
        if (message.valid_from != null && message.hasOwnProperty("valid_from"))
            if (!$util.isInteger(message.valid_from) && !(message.valid_from && $util.isInteger(message.valid_from.low) && $util.isInteger(message.valid_from.high)))
                return "valid_from: integer|Long expected";
        if (message.valid_to != null && message.hasOwnProperty("valid_to"))
            if (!$util.isInteger(message.valid_to) && !(message.valid_to && $util.isInteger(message.valid_to.low) && $util.isInteger(message.valid_to.high)))
                return "valid_to: integer|Long expected";
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
        if (object.certifying_body_id != null)
            message.certifying_body_id = String(object.certifying_body_id);
        if (object.factory_id != null)
            message.factory_id = String(object.factory_id);
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.standard_version != null)
            message.standard_version = String(object.standard_version);
        if (object.certificate_data) {
            if (!Array.isArray(object.certificate_data))
                throw TypeError(".Certificate.certificate_data: array expected");
            message.certificate_data = [];
            for (var i = 0; i < object.certificate_data.length; ++i) {
                if (typeof object.certificate_data[i] !== "object")
                    throw TypeError(".Certificate.certificate_data: object expected");
                message.certificate_data[i] = $root.Certificate.CertificateData.fromObject(object.certificate_data[i]);
            }
        }
        if (object.valid_from != null)
            if ($util.Long)
                (message.valid_from = $util.Long.fromValue(object.valid_from)).unsigned = true;
            else if (typeof object.valid_from === "string")
                message.valid_from = parseInt(object.valid_from, 10);
            else if (typeof object.valid_from === "number")
                message.valid_from = object.valid_from;
            else if (typeof object.valid_from === "object")
                message.valid_from = new $util.LongBits(object.valid_from.low >>> 0, object.valid_from.high >>> 0).toNumber(true);
        if (object.valid_to != null)
            if ($util.Long)
                (message.valid_to = $util.Long.fromValue(object.valid_to)).unsigned = true;
            else if (typeof object.valid_to === "string")
                message.valid_to = parseInt(object.valid_to, 10);
            else if (typeof object.valid_to === "number")
                message.valid_to = object.valid_to;
            else if (typeof object.valid_to === "object")
                message.valid_to = new $util.LongBits(object.valid_to.low >>> 0, object.valid_to.high >>> 0).toNumber(true);
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
            object.certificate_data = [];
        if (options.defaults) {
            object.id = "";
            object.certifying_body_id = "";
            object.factory_id = "";
            object.standard_id = "";
            object.standard_version = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.valid_from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.valid_from = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.valid_to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.valid_to = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.certifying_body_id != null && message.hasOwnProperty("certifying_body_id"))
            object.certifying_body_id = message.certifying_body_id;
        if (message.factory_id != null && message.hasOwnProperty("factory_id"))
            object.factory_id = message.factory_id;
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.standard_version != null && message.hasOwnProperty("standard_version"))
            object.standard_version = message.standard_version;
        if (message.certificate_data && message.certificate_data.length) {
            object.certificate_data = [];
            for (var j = 0; j < message.certificate_data.length; ++j)
                object.certificate_data[j] = $root.Certificate.CertificateData.toObject(message.certificate_data[j], options);
        }
        if (message.valid_from != null && message.hasOwnProperty("valid_from"))
            if (typeof message.valid_from === "number")
                object.valid_from = options.longs === String ? String(message.valid_from) : message.valid_from;
            else
                object.valid_from = options.longs === String ? $util.Long.prototype.toString.call(message.valid_from) : options.longs === Number ? new $util.LongBits(message.valid_from.low >>> 0, message.valid_from.high >>> 0).toNumber(true) : message.valid_from;
        if (message.valid_to != null && message.hasOwnProperty("valid_to"))
            if (typeof message.valid_to === "number")
                object.valid_to = options.longs === String ? String(message.valid_to) : message.valid_to;
            else
                object.valid_to = options.longs === String ? $util.Long.prototype.toString.call(message.valid_to) : options.longs === Number ? new $util.LongBits(message.valid_to.low >>> 0, message.valid_to.high >>> 0).toNumber(true) : message.valid_to;
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
     * @property {string|null} [standard_id] Request standard_id
     * @property {string|null} [factory_id] Request factory_id
     * @property {number|Long|null} [request_date] Request request_date
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
     * Request standard_id.
     * @member {string} standard_id
     * @memberof Request
     * @instance
     */
    Request.prototype.standard_id = "";

    /**
     * Request factory_id.
     * @member {string} factory_id
     * @memberof Request
     * @instance
     */
    Request.prototype.factory_id = "";

    /**
     * Request request_date.
     * @member {number|Long} request_date
     * @memberof Request
     * @instance
     */
    Request.prototype.request_date = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.standard_id);
        if (message.factory_id != null && Object.hasOwnProperty.call(message, "factory_id"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.factory_id);
        if (message.request_date != null && Object.hasOwnProperty.call(message, "request_date"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.request_date);
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
                message.standard_id = reader.string();
                break;
            case 4:
                message.factory_id = reader.string();
                break;
            case 5:
                message.request_date = reader.uint64();
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
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
        if (message.factory_id != null && message.hasOwnProperty("factory_id"))
            if (!$util.isString(message.factory_id))
                return "factory_id: string expected";
        if (message.request_date != null && message.hasOwnProperty("request_date"))
            if (!$util.isInteger(message.request_date) && !(message.request_date && $util.isInteger(message.request_date.low) && $util.isInteger(message.request_date.high)))
                return "request_date: integer|Long expected";
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
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.factory_id != null)
            message.factory_id = String(object.factory_id);
        if (object.request_date != null)
            if ($util.Long)
                (message.request_date = $util.Long.fromValue(object.request_date)).unsigned = true;
            else if (typeof object.request_date === "string")
                message.request_date = parseInt(object.request_date, 10);
            else if (typeof object.request_date === "number")
                message.request_date = object.request_date;
            else if (typeof object.request_date === "object")
                message.request_date = new $util.LongBits(object.request_date.low >>> 0, object.request_date.high >>> 0).toNumber(true);
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
            object.standard_id = "";
            object.factory_id = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.request_date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.request_date = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.Request.Status[message.status] : message.status;
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.factory_id != null && message.hasOwnProperty("factory_id"))
            object.factory_id = message.factory_id;
        if (message.request_date != null && message.hasOwnProperty("request_date"))
            if (typeof message.request_date === "number")
                object.request_date = options.longs === String ? String(message.request_date) : message.request_date;
            else
                object.request_date = options.longs === String ? $util.Long.prototype.toString.call(message.request_date) : options.longs === Number ? new $util.LongBits(message.request_date.low >>> 0, message.request_date.high >>> 0).toNumber(true) : message.request_date;
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
     * @property {Organization.Type|null} [organization_type] Organization organization_type
     * @property {ICertifyingBody|null} [certifying_body_details] Organization certifying_body_details
     * @property {IStandardsBody|null} [standards_body_details] Organization standards_body_details
     * @property {IFactory|null} [factory_details] Organization factory_details
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
     * Organization organization_type.
     * @member {Organization.Type} organization_type
     * @memberof Organization
     * @instance
     */
    Organization.prototype.organization_type = 0;

    /**
     * Organization certifying_body_details.
     * @member {ICertifyingBody|null|undefined} certifying_body_details
     * @memberof Organization
     * @instance
     */
    Organization.prototype.certifying_body_details = null;

    /**
     * Organization standards_body_details.
     * @member {IStandardsBody|null|undefined} standards_body_details
     * @memberof Organization
     * @instance
     */
    Organization.prototype.standards_body_details = null;

    /**
     * Organization factory_details.
     * @member {IFactory|null|undefined} factory_details
     * @memberof Organization
     * @instance
     */
    Organization.prototype.factory_details = null;

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
        if (message.organization_type != null && Object.hasOwnProperty.call(message, "organization_type"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.organization_type);
        if (message.certifying_body_details != null && Object.hasOwnProperty.call(message, "certifying_body_details"))
            $root.CertifyingBody.encode(message.certifying_body_details, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.standards_body_details != null && Object.hasOwnProperty.call(message, "standards_body_details"))
            $root.StandardsBody.encode(message.standards_body_details, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.factory_details != null && Object.hasOwnProperty.call(message, "factory_details"))
            $root.Factory.encode(message.factory_details, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
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
                message.organization_type = reader.int32();
                break;
            case 6:
                message.certifying_body_details = $root.CertifyingBody.decode(reader, reader.uint32());
                break;
            case 7:
                message.standards_body_details = $root.StandardsBody.decode(reader, reader.uint32());
                break;
            case 8:
                message.factory_details = $root.Factory.decode(reader, reader.uint32());
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
        if (message.organization_type != null && message.hasOwnProperty("organization_type"))
            switch (message.organization_type) {
            default:
                return "organization_type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
        if (message.certifying_body_details != null && message.hasOwnProperty("certifying_body_details")) {
            var error = $root.CertifyingBody.verify(message.certifying_body_details);
            if (error)
                return "certifying_body_details." + error;
        }
        if (message.standards_body_details != null && message.hasOwnProperty("standards_body_details")) {
            var error = $root.StandardsBody.verify(message.standards_body_details);
            if (error)
                return "standards_body_details." + error;
        }
        if (message.factory_details != null && message.hasOwnProperty("factory_details")) {
            var error = $root.Factory.verify(message.factory_details);
            if (error)
                return "factory_details." + error;
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
        switch (object.organization_type) {
        case "UNSET_TYPE":
        case 0:
            message.organization_type = 0;
            break;
        case "CERTIFYING_BODY":
        case 1:
            message.organization_type = 1;
            break;
        case "STANDARDS_BODY":
        case 2:
            message.organization_type = 2;
            break;
        case "FACTORY":
        case 3:
            message.organization_type = 3;
            break;
        case "INGESTION":
        case 4:
            message.organization_type = 4;
            break;
        }
        if (object.certifying_body_details != null) {
            if (typeof object.certifying_body_details !== "object")
                throw TypeError(".Organization.certifying_body_details: object expected");
            message.certifying_body_details = $root.CertifyingBody.fromObject(object.certifying_body_details);
        }
        if (object.standards_body_details != null) {
            if (typeof object.standards_body_details !== "object")
                throw TypeError(".Organization.standards_body_details: object expected");
            message.standards_body_details = $root.StandardsBody.fromObject(object.standards_body_details);
        }
        if (object.factory_details != null) {
            if (typeof object.factory_details !== "object")
                throw TypeError(".Organization.factory_details: object expected");
            message.factory_details = $root.Factory.fromObject(object.factory_details);
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
            object.organization_type = options.enums === String ? "UNSET_TYPE" : 0;
            object.certifying_body_details = null;
            object.standards_body_details = null;
            object.factory_details = null;
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
        if (message.organization_type != null && message.hasOwnProperty("organization_type"))
            object.organization_type = options.enums === String ? $root.Organization.Type[message.organization_type] : message.organization_type;
        if (message.certifying_body_details != null && message.hasOwnProperty("certifying_body_details"))
            object.certifying_body_details = $root.CertifyingBody.toObject(message.certifying_body_details, options);
        if (message.standards_body_details != null && message.hasOwnProperty("standards_body_details"))
            object.standards_body_details = $root.StandardsBody.toObject(message.standards_body_details, options);
        if (message.factory_details != null && message.hasOwnProperty("factory_details"))
            object.factory_details = $root.Factory.toObject(message.factory_details, options);
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
     * @property {number} INGESTION=4 INGESTION value
     */
    Organization.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSET_TYPE"] = 0;
        values[valuesById[1] = "CERTIFYING_BODY"] = 1;
        values[valuesById[2] = "STANDARDS_BODY"] = 2;
        values[valuesById[3] = "FACTORY"] = 3;
        values[valuesById[4] = "INGESTION"] = 4;
        return values;
    })();

    Organization.Authorization = (function() {

        /**
         * Properties of an Authorization.
         * @memberof Organization
         * @interface IAuthorization
         * @property {string|null} [public_key] Authorization public_key
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
         * Authorization public_key.
         * @member {string} public_key
         * @memberof Organization.Authorization
         * @instance
         */
        Authorization.prototype.public_key = "";

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
            if (message.public_key != null && Object.hasOwnProperty.call(message, "public_key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.public_key);
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
                    message.public_key = reader.string();
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
            if (message.public_key != null && message.hasOwnProperty("public_key"))
                if (!$util.isString(message.public_key))
                    return "public_key: string expected";
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
            if (object.public_key != null)
                message.public_key = String(object.public_key);
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
                object.public_key = "";
                object.role = options.enums === String ? "UNSET_ROLE" : 0;
            }
            if (message.public_key != null && message.hasOwnProperty("public_key"))
                object.public_key = message.public_key;
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
         * @property {string|null} [phone_number] Contact phone_number
         * @property {string|null} [language_code] Contact language_code
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
         * Contact phone_number.
         * @member {string} phone_number
         * @memberof Organization.Contact
         * @instance
         */
        Contact.prototype.phone_number = "";

        /**
         * Contact language_code.
         * @member {string} language_code
         * @memberof Organization.Contact
         * @instance
         */
        Contact.prototype.language_code = "";

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
            if (message.phone_number != null && Object.hasOwnProperty.call(message, "phone_number"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.phone_number);
            if (message.language_code != null && Object.hasOwnProperty.call(message, "language_code"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.language_code);
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
                    message.phone_number = reader.string();
                    break;
                case 3:
                    message.language_code = reader.string();
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
            if (message.phone_number != null && message.hasOwnProperty("phone_number"))
                if (!$util.isString(message.phone_number))
                    return "phone_number: string expected";
            if (message.language_code != null && message.hasOwnProperty("language_code"))
                if (!$util.isString(message.language_code))
                    return "language_code: string expected";
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
            if (object.phone_number != null)
                message.phone_number = String(object.phone_number);
            if (object.language_code != null)
                message.language_code = String(object.language_code);
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
                object.phone_number = "";
                object.language_code = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.phone_number != null && message.hasOwnProperty("phone_number"))
                object.phone_number = message.phone_number;
            if (message.language_code != null && message.hasOwnProperty("language_code"))
                object.language_code = message.language_code;
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
         * @property {string|null} [standard_id] Accreditation standard_id
         * @property {string|null} [standard_version] Accreditation standard_version
         * @property {string|null} [accreditor_id] Accreditation accreditor_id
         * @property {number|Long|null} [valid_from] Accreditation valid_from
         * @property {number|Long|null} [valid_to] Accreditation valid_to
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
         * Accreditation standard_id.
         * @member {string} standard_id
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.standard_id = "";

        /**
         * Accreditation standard_version.
         * @member {string} standard_version
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.standard_version = "";

        /**
         * Accreditation accreditor_id.
         * @member {string} accreditor_id
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.accreditor_id = "";

        /**
         * Accreditation valid_from.
         * @member {number|Long} valid_from
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.valid_from = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Accreditation valid_to.
         * @member {number|Long} valid_to
         * @memberof CertifyingBody.Accreditation
         * @instance
         */
        Accreditation.prototype.valid_to = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
            if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.standard_id);
            if (message.standard_version != null && Object.hasOwnProperty.call(message, "standard_version"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.standard_version);
            if (message.accreditor_id != null && Object.hasOwnProperty.call(message, "accreditor_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.accreditor_id);
            if (message.valid_from != null && Object.hasOwnProperty.call(message, "valid_from"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.valid_from);
            if (message.valid_to != null && Object.hasOwnProperty.call(message, "valid_to"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.valid_to);
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
                    message.standard_id = reader.string();
                    break;
                case 2:
                    message.standard_version = reader.string();
                    break;
                case 3:
                    message.accreditor_id = reader.string();
                    break;
                case 4:
                    message.valid_from = reader.uint64();
                    break;
                case 5:
                    message.valid_to = reader.uint64();
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
            if (message.standard_id != null && message.hasOwnProperty("standard_id"))
                if (!$util.isString(message.standard_id))
                    return "standard_id: string expected";
            if (message.standard_version != null && message.hasOwnProperty("standard_version"))
                if (!$util.isString(message.standard_version))
                    return "standard_version: string expected";
            if (message.accreditor_id != null && message.hasOwnProperty("accreditor_id"))
                if (!$util.isString(message.accreditor_id))
                    return "accreditor_id: string expected";
            if (message.valid_from != null && message.hasOwnProperty("valid_from"))
                if (!$util.isInteger(message.valid_from) && !(message.valid_from && $util.isInteger(message.valid_from.low) && $util.isInteger(message.valid_from.high)))
                    return "valid_from: integer|Long expected";
            if (message.valid_to != null && message.hasOwnProperty("valid_to"))
                if (!$util.isInteger(message.valid_to) && !(message.valid_to && $util.isInteger(message.valid_to.low) && $util.isInteger(message.valid_to.high)))
                    return "valid_to: integer|Long expected";
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
            if (object.standard_id != null)
                message.standard_id = String(object.standard_id);
            if (object.standard_version != null)
                message.standard_version = String(object.standard_version);
            if (object.accreditor_id != null)
                message.accreditor_id = String(object.accreditor_id);
            if (object.valid_from != null)
                if ($util.Long)
                    (message.valid_from = $util.Long.fromValue(object.valid_from)).unsigned = true;
                else if (typeof object.valid_from === "string")
                    message.valid_from = parseInt(object.valid_from, 10);
                else if (typeof object.valid_from === "number")
                    message.valid_from = object.valid_from;
                else if (typeof object.valid_from === "object")
                    message.valid_from = new $util.LongBits(object.valid_from.low >>> 0, object.valid_from.high >>> 0).toNumber(true);
            if (object.valid_to != null)
                if ($util.Long)
                    (message.valid_to = $util.Long.fromValue(object.valid_to)).unsigned = true;
                else if (typeof object.valid_to === "string")
                    message.valid_to = parseInt(object.valid_to, 10);
                else if (typeof object.valid_to === "number")
                    message.valid_to = object.valid_to;
                else if (typeof object.valid_to === "object")
                    message.valid_to = new $util.LongBits(object.valid_to.low >>> 0, object.valid_to.high >>> 0).toNumber(true);
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
                object.standard_id = "";
                object.standard_version = "";
                object.accreditor_id = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.valid_from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.valid_from = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.valid_to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.valid_to = options.longs === String ? "0" : 0;
            }
            if (message.standard_id != null && message.hasOwnProperty("standard_id"))
                object.standard_id = message.standard_id;
            if (message.standard_version != null && message.hasOwnProperty("standard_version"))
                object.standard_version = message.standard_version;
            if (message.accreditor_id != null && message.hasOwnProperty("accreditor_id"))
                object.accreditor_id = message.accreditor_id;
            if (message.valid_from != null && message.hasOwnProperty("valid_from"))
                if (typeof message.valid_from === "number")
                    object.valid_from = options.longs === String ? String(message.valid_from) : message.valid_from;
                else
                    object.valid_from = options.longs === String ? $util.Long.prototype.toString.call(message.valid_from) : options.longs === Number ? new $util.LongBits(message.valid_from.low >>> 0, message.valid_from.high >>> 0).toNumber(true) : message.valid_from;
            if (message.valid_to != null && message.hasOwnProperty("valid_to"))
                if (typeof message.valid_to === "number")
                    object.valid_to = options.longs === String ? String(message.valid_to) : message.valid_to;
                else
                    object.valid_to = options.longs === String ? $util.Long.prototype.toString.call(message.valid_to) : options.longs === Number ? new $util.LongBits(message.valid_to.low >>> 0, message.valid_to.high >>> 0).toNumber(true) : message.valid_to;
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
         * @property {string|null} [street_line_1] Address street_line_1
         * @property {string|null} [street_line_2] Address street_line_2
         * @property {string|null} [city] Address city
         * @property {string|null} [state_province] Address state_province
         * @property {string|null} [country] Address country
         * @property {string|null} [postal_code] Address postal_code
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
         * Address street_line_1.
         * @member {string} street_line_1
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.street_line_1 = "";

        /**
         * Address street_line_2.
         * @member {string} street_line_2
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.street_line_2 = "";

        /**
         * Address city.
         * @member {string} city
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.city = "";

        /**
         * Address state_province.
         * @member {string} state_province
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.state_province = "";

        /**
         * Address country.
         * @member {string} country
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.country = "";

        /**
         * Address postal_code.
         * @member {string} postal_code
         * @memberof Factory.Address
         * @instance
         */
        Address.prototype.postal_code = "";

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
            if (message.street_line_1 != null && Object.hasOwnProperty.call(message, "street_line_1"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.street_line_1);
            if (message.street_line_2 != null && Object.hasOwnProperty.call(message, "street_line_2"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.street_line_2);
            if (message.city != null && Object.hasOwnProperty.call(message, "city"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.city);
            if (message.state_province != null && Object.hasOwnProperty.call(message, "state_province"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.state_province);
            if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.country);
            if (message.postal_code != null && Object.hasOwnProperty.call(message, "postal_code"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.postal_code);
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
                    message.street_line_1 = reader.string();
                    break;
                case 2:
                    message.street_line_2 = reader.string();
                    break;
                case 3:
                    message.city = reader.string();
                    break;
                case 4:
                    message.state_province = reader.string();
                    break;
                case 5:
                    message.country = reader.string();
                    break;
                case 6:
                    message.postal_code = reader.string();
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
            if (message.street_line_1 != null && message.hasOwnProperty("street_line_1"))
                if (!$util.isString(message.street_line_1))
                    return "street_line_1: string expected";
            if (message.street_line_2 != null && message.hasOwnProperty("street_line_2"))
                if (!$util.isString(message.street_line_2))
                    return "street_line_2: string expected";
            if (message.city != null && message.hasOwnProperty("city"))
                if (!$util.isString(message.city))
                    return "city: string expected";
            if (message.state_province != null && message.hasOwnProperty("state_province"))
                if (!$util.isString(message.state_province))
                    return "state_province: string expected";
            if (message.country != null && message.hasOwnProperty("country"))
                if (!$util.isString(message.country))
                    return "country: string expected";
            if (message.postal_code != null && message.hasOwnProperty("postal_code"))
                if (!$util.isString(message.postal_code))
                    return "postal_code: string expected";
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
            if (object.street_line_1 != null)
                message.street_line_1 = String(object.street_line_1);
            if (object.street_line_2 != null)
                message.street_line_2 = String(object.street_line_2);
            if (object.city != null)
                message.city = String(object.city);
            if (object.state_province != null)
                message.state_province = String(object.state_province);
            if (object.country != null)
                message.country = String(object.country);
            if (object.postal_code != null)
                message.postal_code = String(object.postal_code);
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
                object.street_line_1 = "";
                object.street_line_2 = "";
                object.city = "";
                object.state_province = "";
                object.country = "";
                object.postal_code = "";
            }
            if (message.street_line_1 != null && message.hasOwnProperty("street_line_1"))
                object.street_line_1 = message.street_line_1;
            if (message.street_line_2 != null && message.hasOwnProperty("street_line_2"))
                object.street_line_2 = message.street_line_2;
            if (message.city != null && message.hasOwnProperty("city"))
                object.city = message.city;
            if (message.state_province != null && message.hasOwnProperty("state_province"))
                object.state_province = message.state_province;
            if (message.country != null && message.hasOwnProperty("country"))
                object.country = message.country;
            if (message.postal_code != null && message.hasOwnProperty("postal_code"))
                object.postal_code = message.postal_code;
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

$root.Ingestion = (function() {

    /**
     * Properties of an Ingestion.
     * @exports IIngestion
     * @interface IIngestion
     */

    /**
     * Constructs a new Ingestion.
     * @exports Ingestion
     * @classdesc Represents an Ingestion.
     * @implements IIngestion
     * @constructor
     * @param {IIngestion=} [properties] Properties to set
     */
    function Ingestion(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Ingestion instance using the specified properties.
     * @function create
     * @memberof Ingestion
     * @static
     * @param {IIngestion=} [properties] Properties to set
     * @returns {Ingestion} Ingestion instance
     */
    Ingestion.create = function create(properties) {
        return new Ingestion(properties);
    };

    /**
     * Encodes the specified Ingestion message. Does not implicitly {@link Ingestion.verify|verify} messages.
     * @function encode
     * @memberof Ingestion
     * @static
     * @param {IIngestion} message Ingestion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ingestion.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Ingestion message, length delimited. Does not implicitly {@link Ingestion.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ingestion
     * @static
     * @param {IIngestion} message Ingestion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ingestion.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Ingestion message from the specified reader or buffer.
     * @function decode
     * @memberof Ingestion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ingestion} Ingestion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ingestion.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ingestion();
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
     * Decodes an Ingestion message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ingestion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ingestion} Ingestion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ingestion.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Ingestion message.
     * @function verify
     * @memberof Ingestion
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ingestion.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates an Ingestion message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ingestion
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ingestion} Ingestion
     */
    Ingestion.fromObject = function fromObject(object) {
        if (object instanceof $root.Ingestion)
            return object;
        return new $root.Ingestion();
    };

    /**
     * Creates a plain object from an Ingestion message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ingestion
     * @static
     * @param {Ingestion} message Ingestion
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ingestion.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Ingestion to JSON.
     * @function toJSON
     * @memberof Ingestion
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ingestion.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ingestion;
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

$root.CertificateRegistryPayload = (function() {

    /**
     * Properties of a CertificateRegistryPayload.
     * @exports ICertificateRegistryPayload
     * @interface ICertificateRegistryPayload
     * @property {CertificateRegistryPayload.Action|null} [action] CertificateRegistryPayload action
     * @property {ICreateAgentAction|null} [create_agent] CertificateRegistryPayload create_agent
     * @property {ICreateOrganizationAction|null} [create_organization] CertificateRegistryPayload create_organization
     * @property {IUpdateOrganizationAction|null} [update_organization] CertificateRegistryPayload update_organization
     * @property {IAuthorizeAgentAction|null} [authorize_agent] CertificateRegistryPayload authorize_agent
     * @property {IIssueCertificateAction|null} [issue_certificate] CertificateRegistryPayload issue_certificate
     * @property {ICreateStandardAction|null} [create_standard] CertificateRegistryPayload create_standard
     * @property {IUpdateStandardAction|null} [update_standard] CertificateRegistryPayload update_standard
     * @property {IOpenRequestAction|null} [open_request_action] CertificateRegistryPayload open_request_action
     * @property {IChangeRequestStatusAction|null} [change_request_status_action] CertificateRegistryPayload change_request_status_action
     * @property {IAccreditCertifyingBodyAction|null} [accredit_certifying_body_action] CertificateRegistryPayload accredit_certifying_body_action
     * @property {IAssertAction|null} [assert_action] CertificateRegistryPayload assert_action
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
     * CertificateRegistryPayload create_agent.
     * @member {ICreateAgentAction|null|undefined} create_agent
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.create_agent = null;

    /**
     * CertificateRegistryPayload create_organization.
     * @member {ICreateOrganizationAction|null|undefined} create_organization
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.create_organization = null;

    /**
     * CertificateRegistryPayload update_organization.
     * @member {IUpdateOrganizationAction|null|undefined} update_organization
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.update_organization = null;

    /**
     * CertificateRegistryPayload authorize_agent.
     * @member {IAuthorizeAgentAction|null|undefined} authorize_agent
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.authorize_agent = null;

    /**
     * CertificateRegistryPayload issue_certificate.
     * @member {IIssueCertificateAction|null|undefined} issue_certificate
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.issue_certificate = null;

    /**
     * CertificateRegistryPayload create_standard.
     * @member {ICreateStandardAction|null|undefined} create_standard
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.create_standard = null;

    /**
     * CertificateRegistryPayload update_standard.
     * @member {IUpdateStandardAction|null|undefined} update_standard
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.update_standard = null;

    /**
     * CertificateRegistryPayload open_request_action.
     * @member {IOpenRequestAction|null|undefined} open_request_action
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.open_request_action = null;

    /**
     * CertificateRegistryPayload change_request_status_action.
     * @member {IChangeRequestStatusAction|null|undefined} change_request_status_action
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.change_request_status_action = null;

    /**
     * CertificateRegistryPayload accredit_certifying_body_action.
     * @member {IAccreditCertifyingBodyAction|null|undefined} accredit_certifying_body_action
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.accredit_certifying_body_action = null;

    /**
     * CertificateRegistryPayload assert_action.
     * @member {IAssertAction|null|undefined} assert_action
     * @memberof CertificateRegistryPayload
     * @instance
     */
    CertificateRegistryPayload.prototype.assert_action = null;

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
        if (message.create_agent != null && Object.hasOwnProperty.call(message, "create_agent"))
            $root.CreateAgentAction.encode(message.create_agent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.create_organization != null && Object.hasOwnProperty.call(message, "create_organization"))
            $root.CreateOrganizationAction.encode(message.create_organization, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.update_organization != null && Object.hasOwnProperty.call(message, "update_organization"))
            $root.UpdateOrganizationAction.encode(message.update_organization, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.authorize_agent != null && Object.hasOwnProperty.call(message, "authorize_agent"))
            $root.AuthorizeAgentAction.encode(message.authorize_agent, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.issue_certificate != null && Object.hasOwnProperty.call(message, "issue_certificate"))
            $root.IssueCertificateAction.encode(message.issue_certificate, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.create_standard != null && Object.hasOwnProperty.call(message, "create_standard"))
            $root.CreateStandardAction.encode(message.create_standard, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.update_standard != null && Object.hasOwnProperty.call(message, "update_standard"))
            $root.UpdateStandardAction.encode(message.update_standard, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.open_request_action != null && Object.hasOwnProperty.call(message, "open_request_action"))
            $root.OpenRequestAction.encode(message.open_request_action, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.change_request_status_action != null && Object.hasOwnProperty.call(message, "change_request_status_action"))
            $root.ChangeRequestStatusAction.encode(message.change_request_status_action, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.accredit_certifying_body_action != null && Object.hasOwnProperty.call(message, "accredit_certifying_body_action"))
            $root.AccreditCertifyingBodyAction.encode(message.accredit_certifying_body_action, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.assert_action != null && Object.hasOwnProperty.call(message, "assert_action"))
            $root.AssertAction.encode(message.assert_action, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
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
                message.create_agent = $root.CreateAgentAction.decode(reader, reader.uint32());
                break;
            case 3:
                message.create_organization = $root.CreateOrganizationAction.decode(reader, reader.uint32());
                break;
            case 4:
                message.update_organization = $root.UpdateOrganizationAction.decode(reader, reader.uint32());
                break;
            case 5:
                message.authorize_agent = $root.AuthorizeAgentAction.decode(reader, reader.uint32());
                break;
            case 6:
                message.issue_certificate = $root.IssueCertificateAction.decode(reader, reader.uint32());
                break;
            case 7:
                message.create_standard = $root.CreateStandardAction.decode(reader, reader.uint32());
                break;
            case 8:
                message.update_standard = $root.UpdateStandardAction.decode(reader, reader.uint32());
                break;
            case 9:
                message.open_request_action = $root.OpenRequestAction.decode(reader, reader.uint32());
                break;
            case 10:
                message.change_request_status_action = $root.ChangeRequestStatusAction.decode(reader, reader.uint32());
                break;
            case 11:
                message.accredit_certifying_body_action = $root.AccreditCertifyingBodyAction.decode(reader, reader.uint32());
                break;
            case 12:
                message.assert_action = $root.AssertAction.decode(reader, reader.uint32());
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
            case 11:
                break;
            }
        if (message.create_agent != null && message.hasOwnProperty("create_agent")) {
            var error = $root.CreateAgentAction.verify(message.create_agent);
            if (error)
                return "create_agent." + error;
        }
        if (message.create_organization != null && message.hasOwnProperty("create_organization")) {
            var error = $root.CreateOrganizationAction.verify(message.create_organization);
            if (error)
                return "create_organization." + error;
        }
        if (message.update_organization != null && message.hasOwnProperty("update_organization")) {
            var error = $root.UpdateOrganizationAction.verify(message.update_organization);
            if (error)
                return "update_organization." + error;
        }
        if (message.authorize_agent != null && message.hasOwnProperty("authorize_agent")) {
            var error = $root.AuthorizeAgentAction.verify(message.authorize_agent);
            if (error)
                return "authorize_agent." + error;
        }
        if (message.issue_certificate != null && message.hasOwnProperty("issue_certificate")) {
            var error = $root.IssueCertificateAction.verify(message.issue_certificate);
            if (error)
                return "issue_certificate." + error;
        }
        if (message.create_standard != null && message.hasOwnProperty("create_standard")) {
            var error = $root.CreateStandardAction.verify(message.create_standard);
            if (error)
                return "create_standard." + error;
        }
        if (message.update_standard != null && message.hasOwnProperty("update_standard")) {
            var error = $root.UpdateStandardAction.verify(message.update_standard);
            if (error)
                return "update_standard." + error;
        }
        if (message.open_request_action != null && message.hasOwnProperty("open_request_action")) {
            var error = $root.OpenRequestAction.verify(message.open_request_action);
            if (error)
                return "open_request_action." + error;
        }
        if (message.change_request_status_action != null && message.hasOwnProperty("change_request_status_action")) {
            var error = $root.ChangeRequestStatusAction.verify(message.change_request_status_action);
            if (error)
                return "change_request_status_action." + error;
        }
        if (message.accredit_certifying_body_action != null && message.hasOwnProperty("accredit_certifying_body_action")) {
            var error = $root.AccreditCertifyingBodyAction.verify(message.accredit_certifying_body_action);
            if (error)
                return "accredit_certifying_body_action." + error;
        }
        if (message.assert_action != null && message.hasOwnProperty("assert_action")) {
            var error = $root.AssertAction.verify(message.assert_action);
            if (error)
                return "assert_action." + error;
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
        case "ASSERT_ACTION":
        case 11:
            message.action = 11;
            break;
        }
        if (object.create_agent != null) {
            if (typeof object.create_agent !== "object")
                throw TypeError(".CertificateRegistryPayload.create_agent: object expected");
            message.create_agent = $root.CreateAgentAction.fromObject(object.create_agent);
        }
        if (object.create_organization != null) {
            if (typeof object.create_organization !== "object")
                throw TypeError(".CertificateRegistryPayload.create_organization: object expected");
            message.create_organization = $root.CreateOrganizationAction.fromObject(object.create_organization);
        }
        if (object.update_organization != null) {
            if (typeof object.update_organization !== "object")
                throw TypeError(".CertificateRegistryPayload.update_organization: object expected");
            message.update_organization = $root.UpdateOrganizationAction.fromObject(object.update_organization);
        }
        if (object.authorize_agent != null) {
            if (typeof object.authorize_agent !== "object")
                throw TypeError(".CertificateRegistryPayload.authorize_agent: object expected");
            message.authorize_agent = $root.AuthorizeAgentAction.fromObject(object.authorize_agent);
        }
        if (object.issue_certificate != null) {
            if (typeof object.issue_certificate !== "object")
                throw TypeError(".CertificateRegistryPayload.issue_certificate: object expected");
            message.issue_certificate = $root.IssueCertificateAction.fromObject(object.issue_certificate);
        }
        if (object.create_standard != null) {
            if (typeof object.create_standard !== "object")
                throw TypeError(".CertificateRegistryPayload.create_standard: object expected");
            message.create_standard = $root.CreateStandardAction.fromObject(object.create_standard);
        }
        if (object.update_standard != null) {
            if (typeof object.update_standard !== "object")
                throw TypeError(".CertificateRegistryPayload.update_standard: object expected");
            message.update_standard = $root.UpdateStandardAction.fromObject(object.update_standard);
        }
        if (object.open_request_action != null) {
            if (typeof object.open_request_action !== "object")
                throw TypeError(".CertificateRegistryPayload.open_request_action: object expected");
            message.open_request_action = $root.OpenRequestAction.fromObject(object.open_request_action);
        }
        if (object.change_request_status_action != null) {
            if (typeof object.change_request_status_action !== "object")
                throw TypeError(".CertificateRegistryPayload.change_request_status_action: object expected");
            message.change_request_status_action = $root.ChangeRequestStatusAction.fromObject(object.change_request_status_action);
        }
        if (object.accredit_certifying_body_action != null) {
            if (typeof object.accredit_certifying_body_action !== "object")
                throw TypeError(".CertificateRegistryPayload.accredit_certifying_body_action: object expected");
            message.accredit_certifying_body_action = $root.AccreditCertifyingBodyAction.fromObject(object.accredit_certifying_body_action);
        }
        if (object.assert_action != null) {
            if (typeof object.assert_action !== "object")
                throw TypeError(".CertificateRegistryPayload.assert_action: object expected");
            message.assert_action = $root.AssertAction.fromObject(object.assert_action);
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
            object.create_agent = null;
            object.create_organization = null;
            object.update_organization = null;
            object.authorize_agent = null;
            object.issue_certificate = null;
            object.create_standard = null;
            object.update_standard = null;
            object.open_request_action = null;
            object.change_request_status_action = null;
            object.accredit_certifying_body_action = null;
            object.assert_action = null;
        }
        if (message.action != null && message.hasOwnProperty("action"))
            object.action = options.enums === String ? $root.CertificateRegistryPayload.Action[message.action] : message.action;
        if (message.create_agent != null && message.hasOwnProperty("create_agent"))
            object.create_agent = $root.CreateAgentAction.toObject(message.create_agent, options);
        if (message.create_organization != null && message.hasOwnProperty("create_organization"))
            object.create_organization = $root.CreateOrganizationAction.toObject(message.create_organization, options);
        if (message.update_organization != null && message.hasOwnProperty("update_organization"))
            object.update_organization = $root.UpdateOrganizationAction.toObject(message.update_organization, options);
        if (message.authorize_agent != null && message.hasOwnProperty("authorize_agent"))
            object.authorize_agent = $root.AuthorizeAgentAction.toObject(message.authorize_agent, options);
        if (message.issue_certificate != null && message.hasOwnProperty("issue_certificate"))
            object.issue_certificate = $root.IssueCertificateAction.toObject(message.issue_certificate, options);
        if (message.create_standard != null && message.hasOwnProperty("create_standard"))
            object.create_standard = $root.CreateStandardAction.toObject(message.create_standard, options);
        if (message.update_standard != null && message.hasOwnProperty("update_standard"))
            object.update_standard = $root.UpdateStandardAction.toObject(message.update_standard, options);
        if (message.open_request_action != null && message.hasOwnProperty("open_request_action"))
            object.open_request_action = $root.OpenRequestAction.toObject(message.open_request_action, options);
        if (message.change_request_status_action != null && message.hasOwnProperty("change_request_status_action"))
            object.change_request_status_action = $root.ChangeRequestStatusAction.toObject(message.change_request_status_action, options);
        if (message.accredit_certifying_body_action != null && message.hasOwnProperty("accredit_certifying_body_action"))
            object.accredit_certifying_body_action = $root.AccreditCertifyingBodyAction.toObject(message.accredit_certifying_body_action, options);
        if (message.assert_action != null && message.hasOwnProperty("assert_action"))
            object.assert_action = $root.AssertAction.toObject(message.assert_action, options);
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
     * @property {number} ASSERT_ACTION=11 ASSERT_ACTION value
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
        values[valuesById[11] = "ASSERT_ACTION"] = 11;
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
     * @property {Organization.Type|null} [organization_type] CreateOrganizationAction organization_type
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
     * CreateOrganizationAction organization_type.
     * @member {Organization.Type} organization_type
     * @memberof CreateOrganizationAction
     * @instance
     */
    CreateOrganizationAction.prototype.organization_type = 0;

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
        if (message.organization_type != null && Object.hasOwnProperty.call(message, "organization_type"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.organization_type);
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
                message.organization_type = reader.int32();
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
        if (message.organization_type != null && message.hasOwnProperty("organization_type"))
            switch (message.organization_type) {
            default:
                return "organization_type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
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
        switch (object.organization_type) {
        case "UNSET_TYPE":
        case 0:
            message.organization_type = 0;
            break;
        case "CERTIFYING_BODY":
        case 1:
            message.organization_type = 1;
            break;
        case "STANDARDS_BODY":
        case 2:
            message.organization_type = 2;
            break;
        case "FACTORY":
        case 3:
            message.organization_type = 3;
            break;
        case "INGESTION":
        case 4:
            message.organization_type = 4;
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
            object.organization_type = options.enums === String ? "UNSET_TYPE" : 0;
            object.name = "";
            object.address = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.organization_type != null && message.hasOwnProperty("organization_type"))
            object.organization_type = options.enums === String ? $root.Organization.Type[message.organization_type] : message.organization_type;
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
     * @property {string|null} [public_key] AuthorizeAgentAction public_key
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
     * AuthorizeAgentAction public_key.
     * @member {string} public_key
     * @memberof AuthorizeAgentAction
     * @instance
     */
    AuthorizeAgentAction.prototype.public_key = "";

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
        if (message.public_key != null && Object.hasOwnProperty.call(message, "public_key"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.public_key);
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
                message.public_key = reader.string();
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
        if (message.public_key != null && message.hasOwnProperty("public_key"))
            if (!$util.isString(message.public_key))
                return "public_key: string expected";
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
        if (object.public_key != null)
            message.public_key = String(object.public_key);
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
            object.public_key = "";
            object.role = options.enums === String ? "UNSET_ROLE" : 0;
        }
        if (message.public_key != null && message.hasOwnProperty("public_key"))
            object.public_key = message.public_key;
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
     * @property {string|null} [factory_id] IssueCertificateAction factory_id
     * @property {IssueCertificateAction.Source|null} [source] IssueCertificateAction source
     * @property {string|null} [request_id] IssueCertificateAction request_id
     * @property {string|null} [standard_id] IssueCertificateAction standard_id
     * @property {Array.<Certificate.ICertificateData>|null} [certificate_data] IssueCertificateAction certificate_data
     * @property {number|Long|null} [valid_from] IssueCertificateAction valid_from
     * @property {number|Long|null} [valid_to] IssueCertificateAction valid_to
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
        this.certificate_data = [];
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
     * IssueCertificateAction factory_id.
     * @member {string} factory_id
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.factory_id = "";

    /**
     * IssueCertificateAction source.
     * @member {IssueCertificateAction.Source} source
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.source = 0;

    /**
     * IssueCertificateAction request_id.
     * @member {string} request_id
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.request_id = "";

    /**
     * IssueCertificateAction standard_id.
     * @member {string} standard_id
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.standard_id = "";

    /**
     * IssueCertificateAction certificate_data.
     * @member {Array.<Certificate.ICertificateData>} certificate_data
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.certificate_data = $util.emptyArray;

    /**
     * IssueCertificateAction valid_from.
     * @member {number|Long} valid_from
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.valid_from = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * IssueCertificateAction valid_to.
     * @member {number|Long} valid_to
     * @memberof IssueCertificateAction
     * @instance
     */
    IssueCertificateAction.prototype.valid_to = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.factory_id != null && Object.hasOwnProperty.call(message, "factory_id"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.factory_id);
        if (message.source != null && Object.hasOwnProperty.call(message, "source"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.source);
        if (message.request_id != null && Object.hasOwnProperty.call(message, "request_id"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.request_id);
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.standard_id);
        if (message.certificate_data != null && message.certificate_data.length)
            for (var i = 0; i < message.certificate_data.length; ++i)
                $root.Certificate.CertificateData.encode(message.certificate_data[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.valid_from != null && Object.hasOwnProperty.call(message, "valid_from"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.valid_from);
        if (message.valid_to != null && Object.hasOwnProperty.call(message, "valid_to"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.valid_to);
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
                message.factory_id = reader.string();
                break;
            case 3:
                message.source = reader.int32();
                break;
            case 4:
                message.request_id = reader.string();
                break;
            case 5:
                message.standard_id = reader.string();
                break;
            case 6:
                if (!(message.certificate_data && message.certificate_data.length))
                    message.certificate_data = [];
                message.certificate_data.push($root.Certificate.CertificateData.decode(reader, reader.uint32()));
                break;
            case 7:
                message.valid_from = reader.uint64();
                break;
            case 8:
                message.valid_to = reader.uint64();
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
        if (message.factory_id != null && message.hasOwnProperty("factory_id"))
            if (!$util.isString(message.factory_id))
                return "factory_id: string expected";
        if (message.source != null && message.hasOwnProperty("source"))
            switch (message.source) {
            default:
                return "source: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.request_id != null && message.hasOwnProperty("request_id"))
            if (!$util.isString(message.request_id))
                return "request_id: string expected";
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
        if (message.certificate_data != null && message.hasOwnProperty("certificate_data")) {
            if (!Array.isArray(message.certificate_data))
                return "certificate_data: array expected";
            for (var i = 0; i < message.certificate_data.length; ++i) {
                var error = $root.Certificate.CertificateData.verify(message.certificate_data[i]);
                if (error)
                    return "certificate_data." + error;
            }
        }
        if (message.valid_from != null && message.hasOwnProperty("valid_from"))
            if (!$util.isInteger(message.valid_from) && !(message.valid_from && $util.isInteger(message.valid_from.low) && $util.isInteger(message.valid_from.high)))
                return "valid_from: integer|Long expected";
        if (message.valid_to != null && message.hasOwnProperty("valid_to"))
            if (!$util.isInteger(message.valid_to) && !(message.valid_to && $util.isInteger(message.valid_to.low) && $util.isInteger(message.valid_to.high)))
                return "valid_to: integer|Long expected";
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
        if (object.factory_id != null)
            message.factory_id = String(object.factory_id);
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
        if (object.request_id != null)
            message.request_id = String(object.request_id);
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.certificate_data) {
            if (!Array.isArray(object.certificate_data))
                throw TypeError(".IssueCertificateAction.certificate_data: array expected");
            message.certificate_data = [];
            for (var i = 0; i < object.certificate_data.length; ++i) {
                if (typeof object.certificate_data[i] !== "object")
                    throw TypeError(".IssueCertificateAction.certificate_data: object expected");
                message.certificate_data[i] = $root.Certificate.CertificateData.fromObject(object.certificate_data[i]);
            }
        }
        if (object.valid_from != null)
            if ($util.Long)
                (message.valid_from = $util.Long.fromValue(object.valid_from)).unsigned = true;
            else if (typeof object.valid_from === "string")
                message.valid_from = parseInt(object.valid_from, 10);
            else if (typeof object.valid_from === "number")
                message.valid_from = object.valid_from;
            else if (typeof object.valid_from === "object")
                message.valid_from = new $util.LongBits(object.valid_from.low >>> 0, object.valid_from.high >>> 0).toNumber(true);
        if (object.valid_to != null)
            if ($util.Long)
                (message.valid_to = $util.Long.fromValue(object.valid_to)).unsigned = true;
            else if (typeof object.valid_to === "string")
                message.valid_to = parseInt(object.valid_to, 10);
            else if (typeof object.valid_to === "number")
                message.valid_to = object.valid_to;
            else if (typeof object.valid_to === "object")
                message.valid_to = new $util.LongBits(object.valid_to.low >>> 0, object.valid_to.high >>> 0).toNumber(true);
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
            object.certificate_data = [];
        if (options.defaults) {
            object.id = "";
            object.factory_id = "";
            object.source = options.enums === String ? "UNSET_SOURCE" : 0;
            object.request_id = "";
            object.standard_id = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.valid_from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.valid_from = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.valid_to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.valid_to = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.factory_id != null && message.hasOwnProperty("factory_id"))
            object.factory_id = message.factory_id;
        if (message.source != null && message.hasOwnProperty("source"))
            object.source = options.enums === String ? $root.IssueCertificateAction.Source[message.source] : message.source;
        if (message.request_id != null && message.hasOwnProperty("request_id"))
            object.request_id = message.request_id;
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.certificate_data && message.certificate_data.length) {
            object.certificate_data = [];
            for (var j = 0; j < message.certificate_data.length; ++j)
                object.certificate_data[j] = $root.Certificate.CertificateData.toObject(message.certificate_data[j], options);
        }
        if (message.valid_from != null && message.hasOwnProperty("valid_from"))
            if (typeof message.valid_from === "number")
                object.valid_from = options.longs === String ? String(message.valid_from) : message.valid_from;
            else
                object.valid_from = options.longs === String ? $util.Long.prototype.toString.call(message.valid_from) : options.longs === Number ? new $util.LongBits(message.valid_from.low >>> 0, message.valid_from.high >>> 0).toNumber(true) : message.valid_from;
        if (message.valid_to != null && message.hasOwnProperty("valid_to"))
            if (typeof message.valid_to === "number")
                object.valid_to = options.longs === String ? String(message.valid_to) : message.valid_to;
            else
                object.valid_to = options.longs === String ? $util.Long.prototype.toString.call(message.valid_to) : options.longs === Number ? new $util.LongBits(message.valid_to.low >>> 0, message.valid_to.high >>> 0).toNumber(true) : message.valid_to;
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
     * @property {string|null} [standard_id] OpenRequestAction standard_id
     * @property {number|Long|null} [request_date] OpenRequestAction request_date
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
     * OpenRequestAction standard_id.
     * @member {string} standard_id
     * @memberof OpenRequestAction
     * @instance
     */
    OpenRequestAction.prototype.standard_id = "";

    /**
     * OpenRequestAction request_date.
     * @member {number|Long} request_date
     * @memberof OpenRequestAction
     * @instance
     */
    OpenRequestAction.prototype.request_date = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.standard_id);
        if (message.request_date != null && Object.hasOwnProperty.call(message, "request_date"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.request_date);
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
                message.standard_id = reader.string();
                break;
            case 3:
                message.request_date = reader.uint64();
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
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
        if (message.request_date != null && message.hasOwnProperty("request_date"))
            if (!$util.isInteger(message.request_date) && !(message.request_date && $util.isInteger(message.request_date.low) && $util.isInteger(message.request_date.high)))
                return "request_date: integer|Long expected";
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
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.request_date != null)
            if ($util.Long)
                (message.request_date = $util.Long.fromValue(object.request_date)).unsigned = true;
            else if (typeof object.request_date === "string")
                message.request_date = parseInt(object.request_date, 10);
            else if (typeof object.request_date === "number")
                message.request_date = object.request_date;
            else if (typeof object.request_date === "object")
                message.request_date = new $util.LongBits(object.request_date.low >>> 0, object.request_date.high >>> 0).toNumber(true);
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
            object.standard_id = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.request_date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.request_date = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.request_date != null && message.hasOwnProperty("request_date"))
            if (typeof message.request_date === "number")
                object.request_date = options.longs === String ? String(message.request_date) : message.request_date;
            else
                object.request_date = options.longs === String ? $util.Long.prototype.toString.call(message.request_date) : options.longs === Number ? new $util.LongBits(message.request_date.low >>> 0, message.request_date.high >>> 0).toNumber(true) : message.request_date;
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
     * @property {string|null} [request_id] ChangeRequestStatusAction request_id
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
     * ChangeRequestStatusAction request_id.
     * @member {string} request_id
     * @memberof ChangeRequestStatusAction
     * @instance
     */
    ChangeRequestStatusAction.prototype.request_id = "";

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
        if (message.request_id != null && Object.hasOwnProperty.call(message, "request_id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.request_id);
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
                message.request_id = reader.string();
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
        if (message.request_id != null && message.hasOwnProperty("request_id"))
            if (!$util.isString(message.request_id))
                return "request_id: string expected";
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
        if (object.request_id != null)
            message.request_id = String(object.request_id);
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
            object.request_id = "";
            object.status = options.enums === String ? "UNSET_STATUS" : 0;
        }
        if (message.request_id != null && message.hasOwnProperty("request_id"))
            object.request_id = message.request_id;
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
     * @property {string|null} [standard_id] CreateStandardAction standard_id
     * @property {string|null} [name] CreateStandardAction name
     * @property {string|null} [version] CreateStandardAction version
     * @property {string|null} [description] CreateStandardAction description
     * @property {string|null} [link] CreateStandardAction link
     * @property {number|Long|null} [approval_date] CreateStandardAction approval_date
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
     * CreateStandardAction standard_id.
     * @member {string} standard_id
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.standard_id = "";

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
     * CreateStandardAction approval_date.
     * @member {number|Long} approval_date
     * @memberof CreateStandardAction
     * @instance
     */
    CreateStandardAction.prototype.approval_date = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.standard_id);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
        if (message.link != null && Object.hasOwnProperty.call(message, "link"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.link);
        if (message.approval_date != null && Object.hasOwnProperty.call(message, "approval_date"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.approval_date);
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
                message.standard_id = reader.string();
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
                message.approval_date = reader.uint64();
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
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
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
        if (message.approval_date != null && message.hasOwnProperty("approval_date"))
            if (!$util.isInteger(message.approval_date) && !(message.approval_date && $util.isInteger(message.approval_date.low) && $util.isInteger(message.approval_date.high)))
                return "approval_date: integer|Long expected";
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
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.name != null)
            message.name = String(object.name);
        if (object.version != null)
            message.version = String(object.version);
        if (object.description != null)
            message.description = String(object.description);
        if (object.link != null)
            message.link = String(object.link);
        if (object.approval_date != null)
            if ($util.Long)
                (message.approval_date = $util.Long.fromValue(object.approval_date)).unsigned = true;
            else if (typeof object.approval_date === "string")
                message.approval_date = parseInt(object.approval_date, 10);
            else if (typeof object.approval_date === "number")
                message.approval_date = object.approval_date;
            else if (typeof object.approval_date === "object")
                message.approval_date = new $util.LongBits(object.approval_date.low >>> 0, object.approval_date.high >>> 0).toNumber(true);
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
            object.standard_id = "";
            object.name = "";
            object.version = "";
            object.description = "";
            object.link = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.approval_date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.approval_date = options.longs === String ? "0" : 0;
        }
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.link != null && message.hasOwnProperty("link"))
            object.link = message.link;
        if (message.approval_date != null && message.hasOwnProperty("approval_date"))
            if (typeof message.approval_date === "number")
                object.approval_date = options.longs === String ? String(message.approval_date) : message.approval_date;
            else
                object.approval_date = options.longs === String ? $util.Long.prototype.toString.call(message.approval_date) : options.longs === Number ? new $util.LongBits(message.approval_date.low >>> 0, message.approval_date.high >>> 0).toNumber(true) : message.approval_date;
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
     * @property {string|null} [standard_id] UpdateStandardAction standard_id
     * @property {string|null} [version] UpdateStandardAction version
     * @property {string|null} [description] UpdateStandardAction description
     * @property {string|null} [link] UpdateStandardAction link
     * @property {number|Long|null} [approval_date] UpdateStandardAction approval_date
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
     * UpdateStandardAction standard_id.
     * @member {string} standard_id
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.standard_id = "";

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
     * UpdateStandardAction approval_date.
     * @member {number|Long} approval_date
     * @memberof UpdateStandardAction
     * @instance
     */
    UpdateStandardAction.prototype.approval_date = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.standard_id);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
        if (message.link != null && Object.hasOwnProperty.call(message, "link"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.link);
        if (message.approval_date != null && Object.hasOwnProperty.call(message, "approval_date"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.approval_date);
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
                message.standard_id = reader.string();
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
                message.approval_date = reader.uint64();
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
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isString(message.version))
                return "version: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.link != null && message.hasOwnProperty("link"))
            if (!$util.isString(message.link))
                return "link: string expected";
        if (message.approval_date != null && message.hasOwnProperty("approval_date"))
            if (!$util.isInteger(message.approval_date) && !(message.approval_date && $util.isInteger(message.approval_date.low) && $util.isInteger(message.approval_date.high)))
                return "approval_date: integer|Long expected";
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
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.version != null)
            message.version = String(object.version);
        if (object.description != null)
            message.description = String(object.description);
        if (object.link != null)
            message.link = String(object.link);
        if (object.approval_date != null)
            if ($util.Long)
                (message.approval_date = $util.Long.fromValue(object.approval_date)).unsigned = true;
            else if (typeof object.approval_date === "string")
                message.approval_date = parseInt(object.approval_date, 10);
            else if (typeof object.approval_date === "number")
                message.approval_date = object.approval_date;
            else if (typeof object.approval_date === "object")
                message.approval_date = new $util.LongBits(object.approval_date.low >>> 0, object.approval_date.high >>> 0).toNumber(true);
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
            object.standard_id = "";
            object.version = "";
            object.description = "";
            object.link = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.approval_date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.approval_date = options.longs === String ? "0" : 0;
        }
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.link != null && message.hasOwnProperty("link"))
            object.link = message.link;
        if (message.approval_date != null && message.hasOwnProperty("approval_date"))
            if (typeof message.approval_date === "number")
                object.approval_date = options.longs === String ? String(message.approval_date) : message.approval_date;
            else
                object.approval_date = options.longs === String ? $util.Long.prototype.toString.call(message.approval_date) : options.longs === Number ? new $util.LongBits(message.approval_date.low >>> 0, message.approval_date.high >>> 0).toNumber(true) : message.approval_date;
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
     * @property {string|null} [certifying_body_id] AccreditCertifyingBodyAction certifying_body_id
     * @property {string|null} [standard_id] AccreditCertifyingBodyAction standard_id
     * @property {number|Long|null} [valid_from] AccreditCertifyingBodyAction valid_from
     * @property {number|Long|null} [valid_to] AccreditCertifyingBodyAction valid_to
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
     * AccreditCertifyingBodyAction certifying_body_id.
     * @member {string} certifying_body_id
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.certifying_body_id = "";

    /**
     * AccreditCertifyingBodyAction standard_id.
     * @member {string} standard_id
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.standard_id = "";

    /**
     * AccreditCertifyingBodyAction valid_from.
     * @member {number|Long} valid_from
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.valid_from = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * AccreditCertifyingBodyAction valid_to.
     * @member {number|Long} valid_to
     * @memberof AccreditCertifyingBodyAction
     * @instance
     */
    AccreditCertifyingBodyAction.prototype.valid_to = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
        if (message.certifying_body_id != null && Object.hasOwnProperty.call(message, "certifying_body_id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.certifying_body_id);
        if (message.standard_id != null && Object.hasOwnProperty.call(message, "standard_id"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.standard_id);
        if (message.valid_from != null && Object.hasOwnProperty.call(message, "valid_from"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.valid_from);
        if (message.valid_to != null && Object.hasOwnProperty.call(message, "valid_to"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.valid_to);
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
                message.certifying_body_id = reader.string();
                break;
            case 2:
                message.standard_id = reader.string();
                break;
            case 3:
                message.valid_from = reader.uint64();
                break;
            case 4:
                message.valid_to = reader.uint64();
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
        if (message.certifying_body_id != null && message.hasOwnProperty("certifying_body_id"))
            if (!$util.isString(message.certifying_body_id))
                return "certifying_body_id: string expected";
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            if (!$util.isString(message.standard_id))
                return "standard_id: string expected";
        if (message.valid_from != null && message.hasOwnProperty("valid_from"))
            if (!$util.isInteger(message.valid_from) && !(message.valid_from && $util.isInteger(message.valid_from.low) && $util.isInteger(message.valid_from.high)))
                return "valid_from: integer|Long expected";
        if (message.valid_to != null && message.hasOwnProperty("valid_to"))
            if (!$util.isInteger(message.valid_to) && !(message.valid_to && $util.isInteger(message.valid_to.low) && $util.isInteger(message.valid_to.high)))
                return "valid_to: integer|Long expected";
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
        if (object.certifying_body_id != null)
            message.certifying_body_id = String(object.certifying_body_id);
        if (object.standard_id != null)
            message.standard_id = String(object.standard_id);
        if (object.valid_from != null)
            if ($util.Long)
                (message.valid_from = $util.Long.fromValue(object.valid_from)).unsigned = true;
            else if (typeof object.valid_from === "string")
                message.valid_from = parseInt(object.valid_from, 10);
            else if (typeof object.valid_from === "number")
                message.valid_from = object.valid_from;
            else if (typeof object.valid_from === "object")
                message.valid_from = new $util.LongBits(object.valid_from.low >>> 0, object.valid_from.high >>> 0).toNumber(true);
        if (object.valid_to != null)
            if ($util.Long)
                (message.valid_to = $util.Long.fromValue(object.valid_to)).unsigned = true;
            else if (typeof object.valid_to === "string")
                message.valid_to = parseInt(object.valid_to, 10);
            else if (typeof object.valid_to === "number")
                message.valid_to = object.valid_to;
            else if (typeof object.valid_to === "object")
                message.valid_to = new $util.LongBits(object.valid_to.low >>> 0, object.valid_to.high >>> 0).toNumber(true);
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
            object.certifying_body_id = "";
            object.standard_id = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.valid_from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.valid_from = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.valid_to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.valid_to = options.longs === String ? "0" : 0;
        }
        if (message.certifying_body_id != null && message.hasOwnProperty("certifying_body_id"))
            object.certifying_body_id = message.certifying_body_id;
        if (message.standard_id != null && message.hasOwnProperty("standard_id"))
            object.standard_id = message.standard_id;
        if (message.valid_from != null && message.hasOwnProperty("valid_from"))
            if (typeof message.valid_from === "number")
                object.valid_from = options.longs === String ? String(message.valid_from) : message.valid_from;
            else
                object.valid_from = options.longs === String ? $util.Long.prototype.toString.call(message.valid_from) : options.longs === Number ? new $util.LongBits(message.valid_from.low >>> 0, message.valid_from.high >>> 0).toNumber(true) : message.valid_from;
        if (message.valid_to != null && message.hasOwnProperty("valid_to"))
            if (typeof message.valid_to === "number")
                object.valid_to = options.longs === String ? String(message.valid_to) : message.valid_to;
            else
                object.valid_to = options.longs === String ? $util.Long.prototype.toString.call(message.valid_to) : options.longs === Number ? new $util.LongBits(message.valid_to.low >>> 0, message.valid_to.high >>> 0).toNumber(true) : message.valid_to;
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

$root.AssertAction = (function() {

    /**
     * Properties of an AssertAction.
     * @exports IAssertAction
     * @interface IAssertAction
     * @property {string|null} [assertion_id] AssertAction assertion_id
     * @property {AssertAction.IFactoryAssertion|null} [new_factory] AssertAction new_factory
     * @property {IIssueCertificateAction|null} [new_certificate] AssertAction new_certificate
     * @property {ICreateStandardAction|null} [new_standard] AssertAction new_standard
     */

    /**
     * Constructs a new AssertAction.
     * @exports AssertAction
     * @classdesc Represents an AssertAction.
     * @implements IAssertAction
     * @constructor
     * @param {IAssertAction=} [properties] Properties to set
     */
    function AssertAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AssertAction assertion_id.
     * @member {string} assertion_id
     * @memberof AssertAction
     * @instance
     */
    AssertAction.prototype.assertion_id = "";

    /**
     * AssertAction new_factory.
     * @member {AssertAction.IFactoryAssertion|null|undefined} new_factory
     * @memberof AssertAction
     * @instance
     */
    AssertAction.prototype.new_factory = null;

    /**
     * AssertAction new_certificate.
     * @member {IIssueCertificateAction|null|undefined} new_certificate
     * @memberof AssertAction
     * @instance
     */
    AssertAction.prototype.new_certificate = null;

    /**
     * AssertAction new_standard.
     * @member {ICreateStandardAction|null|undefined} new_standard
     * @memberof AssertAction
     * @instance
     */
    AssertAction.prototype.new_standard = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * AssertAction assertion.
     * @member {"new_factory"|"new_certificate"|"new_standard"|undefined} assertion
     * @memberof AssertAction
     * @instance
     */
    Object.defineProperty(AssertAction.prototype, "assertion", {
        get: $util.oneOfGetter($oneOfFields = ["new_factory", "new_certificate", "new_standard"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new AssertAction instance using the specified properties.
     * @function create
     * @memberof AssertAction
     * @static
     * @param {IAssertAction=} [properties] Properties to set
     * @returns {AssertAction} AssertAction instance
     */
    AssertAction.create = function create(properties) {
        return new AssertAction(properties);
    };

    /**
     * Encodes the specified AssertAction message. Does not implicitly {@link AssertAction.verify|verify} messages.
     * @function encode
     * @memberof AssertAction
     * @static
     * @param {IAssertAction} message AssertAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AssertAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.assertion_id != null && Object.hasOwnProperty.call(message, "assertion_id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.assertion_id);
        if (message.new_factory != null && Object.hasOwnProperty.call(message, "new_factory"))
            $root.AssertAction.FactoryAssertion.encode(message.new_factory, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.new_certificate != null && Object.hasOwnProperty.call(message, "new_certificate"))
            $root.IssueCertificateAction.encode(message.new_certificate, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.new_standard != null && Object.hasOwnProperty.call(message, "new_standard"))
            $root.CreateStandardAction.encode(message.new_standard, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AssertAction message, length delimited. Does not implicitly {@link AssertAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AssertAction
     * @static
     * @param {IAssertAction} message AssertAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AssertAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AssertAction message from the specified reader or buffer.
     * @function decode
     * @memberof AssertAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AssertAction} AssertAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AssertAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AssertAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.assertion_id = reader.string();
                break;
            case 2:
                message.new_factory = $root.AssertAction.FactoryAssertion.decode(reader, reader.uint32());
                break;
            case 3:
                message.new_certificate = $root.IssueCertificateAction.decode(reader, reader.uint32());
                break;
            case 4:
                message.new_standard = $root.CreateStandardAction.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AssertAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AssertAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AssertAction} AssertAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AssertAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AssertAction message.
     * @function verify
     * @memberof AssertAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AssertAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.assertion_id != null && message.hasOwnProperty("assertion_id"))
            if (!$util.isString(message.assertion_id))
                return "assertion_id: string expected";
        if (message.new_factory != null && message.hasOwnProperty("new_factory")) {
            properties.assertion = 1;
            {
                var error = $root.AssertAction.FactoryAssertion.verify(message.new_factory);
                if (error)
                    return "new_factory." + error;
            }
        }
        if (message.new_certificate != null && message.hasOwnProperty("new_certificate")) {
            if (properties.assertion === 1)
                return "assertion: multiple values";
            properties.assertion = 1;
            {
                var error = $root.IssueCertificateAction.verify(message.new_certificate);
                if (error)
                    return "new_certificate." + error;
            }
        }
        if (message.new_standard != null && message.hasOwnProperty("new_standard")) {
            if (properties.assertion === 1)
                return "assertion: multiple values";
            properties.assertion = 1;
            {
                var error = $root.CreateStandardAction.verify(message.new_standard);
                if (error)
                    return "new_standard." + error;
            }
        }
        return null;
    };

    /**
     * Creates an AssertAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AssertAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AssertAction} AssertAction
     */
    AssertAction.fromObject = function fromObject(object) {
        if (object instanceof $root.AssertAction)
            return object;
        var message = new $root.AssertAction();
        if (object.assertion_id != null)
            message.assertion_id = String(object.assertion_id);
        if (object.new_factory != null) {
            if (typeof object.new_factory !== "object")
                throw TypeError(".AssertAction.new_factory: object expected");
            message.new_factory = $root.AssertAction.FactoryAssertion.fromObject(object.new_factory);
        }
        if (object.new_certificate != null) {
            if (typeof object.new_certificate !== "object")
                throw TypeError(".AssertAction.new_certificate: object expected");
            message.new_certificate = $root.IssueCertificateAction.fromObject(object.new_certificate);
        }
        if (object.new_standard != null) {
            if (typeof object.new_standard !== "object")
                throw TypeError(".AssertAction.new_standard: object expected");
            message.new_standard = $root.CreateStandardAction.fromObject(object.new_standard);
        }
        return message;
    };

    /**
     * Creates a plain object from an AssertAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AssertAction
     * @static
     * @param {AssertAction} message AssertAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AssertAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.assertion_id = "";
        if (message.assertion_id != null && message.hasOwnProperty("assertion_id"))
            object.assertion_id = message.assertion_id;
        if (message.new_factory != null && message.hasOwnProperty("new_factory")) {
            object.new_factory = $root.AssertAction.FactoryAssertion.toObject(message.new_factory, options);
            if (options.oneofs)
                object.assertion = "new_factory";
        }
        if (message.new_certificate != null && message.hasOwnProperty("new_certificate")) {
            object.new_certificate = $root.IssueCertificateAction.toObject(message.new_certificate, options);
            if (options.oneofs)
                object.assertion = "new_certificate";
        }
        if (message.new_standard != null && message.hasOwnProperty("new_standard")) {
            object.new_standard = $root.CreateStandardAction.toObject(message.new_standard, options);
            if (options.oneofs)
                object.assertion = "new_standard";
        }
        return object;
    };

    /**
     * Converts this AssertAction to JSON.
     * @function toJSON
     * @memberof AssertAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AssertAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    AssertAction.FactoryAssertion = (function() {

        /**
         * Properties of a FactoryAssertion.
         * @memberof AssertAction
         * @interface IFactoryAssertion
         * @property {ICreateOrganizationAction|null} [factory] FactoryAssertion factory
         * @property {string|null} [existing_factory_id] FactoryAssertion existing_factory_id
         */

        /**
         * Constructs a new FactoryAssertion.
         * @memberof AssertAction
         * @classdesc Represents a FactoryAssertion.
         * @implements IFactoryAssertion
         * @constructor
         * @param {AssertAction.IFactoryAssertion=} [properties] Properties to set
         */
        function FactoryAssertion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FactoryAssertion factory.
         * @member {ICreateOrganizationAction|null|undefined} factory
         * @memberof AssertAction.FactoryAssertion
         * @instance
         */
        FactoryAssertion.prototype.factory = null;

        /**
         * FactoryAssertion existing_factory_id.
         * @member {string} existing_factory_id
         * @memberof AssertAction.FactoryAssertion
         * @instance
         */
        FactoryAssertion.prototype.existing_factory_id = "";

        /**
         * Creates a new FactoryAssertion instance using the specified properties.
         * @function create
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {AssertAction.IFactoryAssertion=} [properties] Properties to set
         * @returns {AssertAction.FactoryAssertion} FactoryAssertion instance
         */
        FactoryAssertion.create = function create(properties) {
            return new FactoryAssertion(properties);
        };

        /**
         * Encodes the specified FactoryAssertion message. Does not implicitly {@link AssertAction.FactoryAssertion.verify|verify} messages.
         * @function encode
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {AssertAction.IFactoryAssertion} message FactoryAssertion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FactoryAssertion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.factory != null && Object.hasOwnProperty.call(message, "factory"))
                $root.CreateOrganizationAction.encode(message.factory, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.existing_factory_id != null && Object.hasOwnProperty.call(message, "existing_factory_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.existing_factory_id);
            return writer;
        };

        /**
         * Encodes the specified FactoryAssertion message, length delimited. Does not implicitly {@link AssertAction.FactoryAssertion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {AssertAction.IFactoryAssertion} message FactoryAssertion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FactoryAssertion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FactoryAssertion message from the specified reader or buffer.
         * @function decode
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AssertAction.FactoryAssertion} FactoryAssertion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FactoryAssertion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AssertAction.FactoryAssertion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.factory = $root.CreateOrganizationAction.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.existing_factory_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FactoryAssertion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AssertAction.FactoryAssertion} FactoryAssertion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FactoryAssertion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FactoryAssertion message.
         * @function verify
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FactoryAssertion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.factory != null && message.hasOwnProperty("factory")) {
                var error = $root.CreateOrganizationAction.verify(message.factory);
                if (error)
                    return "factory." + error;
            }
            if (message.existing_factory_id != null && message.hasOwnProperty("existing_factory_id"))
                if (!$util.isString(message.existing_factory_id))
                    return "existing_factory_id: string expected";
            return null;
        };

        /**
         * Creates a FactoryAssertion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AssertAction.FactoryAssertion} FactoryAssertion
         */
        FactoryAssertion.fromObject = function fromObject(object) {
            if (object instanceof $root.AssertAction.FactoryAssertion)
                return object;
            var message = new $root.AssertAction.FactoryAssertion();
            if (object.factory != null) {
                if (typeof object.factory !== "object")
                    throw TypeError(".AssertAction.FactoryAssertion.factory: object expected");
                message.factory = $root.CreateOrganizationAction.fromObject(object.factory);
            }
            if (object.existing_factory_id != null)
                message.existing_factory_id = String(object.existing_factory_id);
            return message;
        };

        /**
         * Creates a plain object from a FactoryAssertion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AssertAction.FactoryAssertion
         * @static
         * @param {AssertAction.FactoryAssertion} message FactoryAssertion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FactoryAssertion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.factory = null;
                object.existing_factory_id = "";
            }
            if (message.factory != null && message.hasOwnProperty("factory"))
                object.factory = $root.CreateOrganizationAction.toObject(message.factory, options);
            if (message.existing_factory_id != null && message.hasOwnProperty("existing_factory_id"))
                object.existing_factory_id = message.existing_factory_id;
            return object;
        };

        /**
         * Converts this FactoryAssertion to JSON.
         * @function toJSON
         * @memberof AssertAction.FactoryAssertion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FactoryAssertion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FactoryAssertion;
    })();

    return AssertAction;
})();

$root.Standard = (function() {

    /**
     * Properties of a Standard.
     * @exports IStandard
     * @interface IStandard
     * @property {string|null} [id] Standard id
     * @property {string|null} [organization_id] Standard organization_id
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
     * Standard organization_id.
     * @member {string} organization_id
     * @memberof Standard
     * @instance
     */
    Standard.prototype.organization_id = "";

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
        if (message.organization_id != null && Object.hasOwnProperty.call(message, "organization_id"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.organization_id);
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
                message.organization_id = reader.string();
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
        if (message.organization_id != null && message.hasOwnProperty("organization_id"))
            if (!$util.isString(message.organization_id))
                return "organization_id: string expected";
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
        if (object.organization_id != null)
            message.organization_id = String(object.organization_id);
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
            object.organization_id = "";
            object.name = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.organization_id != null && message.hasOwnProperty("organization_id"))
            object.organization_id = message.organization_id;
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
         * @property {number|Long|null} [approval_date] StandardVersion approval_date
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
         * StandardVersion approval_date.
         * @member {number|Long} approval_date
         * @memberof Standard.StandardVersion
         * @instance
         */
        StandardVersion.prototype.approval_date = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
            if (message.approval_date != null && Object.hasOwnProperty.call(message, "approval_date"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.approval_date);
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
                    message.approval_date = reader.uint64();
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
            if (message.approval_date != null && message.hasOwnProperty("approval_date"))
                if (!$util.isInteger(message.approval_date) && !(message.approval_date && $util.isInteger(message.approval_date.low) && $util.isInteger(message.approval_date.high)))
                    return "approval_date: integer|Long expected";
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
            if (object.approval_date != null)
                if ($util.Long)
                    (message.approval_date = $util.Long.fromValue(object.approval_date)).unsigned = true;
                else if (typeof object.approval_date === "string")
                    message.approval_date = parseInt(object.approval_date, 10);
                else if (typeof object.approval_date === "number")
                    message.approval_date = object.approval_date;
                else if (typeof object.approval_date === "object")
                    message.approval_date = new $util.LongBits(object.approval_date.low >>> 0, object.approval_date.high >>> 0).toNumber(true);
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
                    object.approval_date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.approval_date = options.longs === String ? "0" : 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.link != null && message.hasOwnProperty("link"))
                object.link = message.link;
            if (message.approval_date != null && message.hasOwnProperty("approval_date"))
                if (typeof message.approval_date === "number")
                    object.approval_date = options.longs === String ? String(message.approval_date) : message.approval_date;
                else
                    object.approval_date = options.longs === String ? $util.Long.prototype.toString.call(message.approval_date) : options.longs === Number ? new $util.LongBits(message.approval_date.low >>> 0, message.approval_date.high >>> 0).toNumber(true) : message.approval_date;
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

module.exports = $root;
