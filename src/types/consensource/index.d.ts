export as namespace consensource;
import * as $protobuf from "protobufjs";
/** Properties of an Agent. */
export interface IAgent {

    /** Agent publicKey */
    publicKey?: (string|null);

    /** Agent name */
    name?: (string|null);

    /** Agent organizationId */
    organizationId?: (string|null);

    /** Agent timestamp */
    timestamp?: (number|Long|null);
}

/** Represents an Agent. */
export class Agent implements IAgent {

    /**
     * Constructs a new Agent.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAgent);

    /** Agent publicKey. */
    public publicKey: string;

    /** Agent name. */
    public name: string;

    /** Agent organizationId. */
    public organizationId: string;

    /** Agent timestamp. */
    public timestamp: (number|Long);

    /**
     * Creates a new Agent instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Agent instance
     */
    public static create(properties?: IAgent): Agent;

    /**
     * Encodes the specified Agent message. Does not implicitly {@link Agent.verify|verify} messages.
     * @param message Agent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAgent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Agent message, length delimited. Does not implicitly {@link Agent.verify|verify} messages.
     * @param message Agent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAgent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Agent message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Agent;

    /**
     * Decodes an Agent message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Agent;

    /**
     * Verifies an Agent message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Agent message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Agent
     */
    public static fromObject(object: { [k: string]: any }): Agent;

    /**
     * Creates a plain object from an Agent message. Also converts values to other types if specified.
     * @param message Agent
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Agent, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Agent to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AgentContainer. */
export interface IAgentContainer {

    /** AgentContainer entries */
    entries?: (IAgent[]|null);
}

/** Represents an AgentContainer. */
export class AgentContainer implements IAgentContainer {

    /**
     * Constructs a new AgentContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAgentContainer);

    /** AgentContainer entries. */
    public entries: IAgent[];

    /**
     * Creates a new AgentContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AgentContainer instance
     */
    public static create(properties?: IAgentContainer): AgentContainer;

    /**
     * Encodes the specified AgentContainer message. Does not implicitly {@link AgentContainer.verify|verify} messages.
     * @param message AgentContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAgentContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AgentContainer message, length delimited. Does not implicitly {@link AgentContainer.verify|verify} messages.
     * @param message AgentContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAgentContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AgentContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AgentContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AgentContainer;

    /**
     * Decodes an AgentContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AgentContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AgentContainer;

    /**
     * Verifies an AgentContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AgentContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AgentContainer
     */
    public static fromObject(object: { [k: string]: any }): AgentContainer;

    /**
     * Creates a plain object from an AgentContainer message. Also converts values to other types if specified.
     * @param message AgentContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AgentContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AgentContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Certificate. */
export interface ICertificate {

    /** Certificate id */
    id?: (string|null);

    /** Certificate certifyingBodyId */
    certifyingBodyId?: (string|null);

    /** Certificate factoryId */
    factoryId?: (string|null);

    /** Certificate standardId */
    standardId?: (string|null);

    /** Certificate standardVersion */
    standardVersion?: (string|null);

    /** Certificate certificateData */
    certificateData?: (Certificate.ICertificateData[]|null);

    /** Certificate validFrom */
    validFrom?: (number|Long|null);

    /** Certificate validTo */
    validTo?: (number|Long|null);
}

/** Represents a Certificate. */
export class Certificate implements ICertificate {

    /**
     * Constructs a new Certificate.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICertificate);

    /** Certificate id. */
    public id: string;

    /** Certificate certifyingBodyId. */
    public certifyingBodyId: string;

    /** Certificate factoryId. */
    public factoryId: string;

    /** Certificate standardId. */
    public standardId: string;

    /** Certificate standardVersion. */
    public standardVersion: string;

    /** Certificate certificateData. */
    public certificateData: Certificate.ICertificateData[];

    /** Certificate validFrom. */
    public validFrom: (number|Long);

    /** Certificate validTo. */
    public validTo: (number|Long);

    /**
     * Creates a new Certificate instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Certificate instance
     */
    public static create(properties?: ICertificate): Certificate;

    /**
     * Encodes the specified Certificate message. Does not implicitly {@link Certificate.verify|verify} messages.
     * @param message Certificate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICertificate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Certificate message, length delimited. Does not implicitly {@link Certificate.verify|verify} messages.
     * @param message Certificate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICertificate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Certificate message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Certificate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Certificate;

    /**
     * Decodes a Certificate message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Certificate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Certificate;

    /**
     * Verifies a Certificate message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Certificate message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Certificate
     */
    public static fromObject(object: { [k: string]: any }): Certificate;

    /**
     * Creates a plain object from a Certificate message. Also converts values to other types if specified.
     * @param message Certificate
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Certificate, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Certificate to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Certificate {

    /** Properties of a CertificateData. */
    interface ICertificateData {

        /** CertificateData field */
        field?: (string|null);

        /** CertificateData data */
        data?: (string|null);
    }

    /** Represents a CertificateData. */
    class CertificateData implements ICertificateData {

        /**
         * Constructs a new CertificateData.
         * @param [properties] Properties to set
         */
        constructor(properties?: Certificate.ICertificateData);

        /** CertificateData field. */
        public field: string;

        /** CertificateData data. */
        public data: string;

        /**
         * Creates a new CertificateData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CertificateData instance
         */
        public static create(properties?: Certificate.ICertificateData): Certificate.CertificateData;

        /**
         * Encodes the specified CertificateData message. Does not implicitly {@link Certificate.CertificateData.verify|verify} messages.
         * @param message CertificateData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Certificate.ICertificateData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CertificateData message, length delimited. Does not implicitly {@link Certificate.CertificateData.verify|verify} messages.
         * @param message CertificateData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Certificate.ICertificateData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CertificateData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CertificateData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Certificate.CertificateData;

        /**
         * Decodes a CertificateData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CertificateData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Certificate.CertificateData;

        /**
         * Verifies a CertificateData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CertificateData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CertificateData
         */
        public static fromObject(object: { [k: string]: any }): Certificate.CertificateData;

        /**
         * Creates a plain object from a CertificateData message. Also converts values to other types if specified.
         * @param message CertificateData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Certificate.CertificateData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CertificateData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a CertificateContainer. */
export interface ICertificateContainer {

    /** CertificateContainer entries */
    entries?: (ICertificate[]|null);
}

/** Represents a CertificateContainer. */
export class CertificateContainer implements ICertificateContainer {

    /**
     * Constructs a new CertificateContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICertificateContainer);

    /** CertificateContainer entries. */
    public entries: ICertificate[];

    /**
     * Creates a new CertificateContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CertificateContainer instance
     */
    public static create(properties?: ICertificateContainer): CertificateContainer;

    /**
     * Encodes the specified CertificateContainer message. Does not implicitly {@link CertificateContainer.verify|verify} messages.
     * @param message CertificateContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICertificateContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CertificateContainer message, length delimited. Does not implicitly {@link CertificateContainer.verify|verify} messages.
     * @param message CertificateContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICertificateContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CertificateContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CertificateContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CertificateContainer;

    /**
     * Decodes a CertificateContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CertificateContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CertificateContainer;

    /**
     * Verifies a CertificateContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CertificateContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CertificateContainer
     */
    public static fromObject(object: { [k: string]: any }): CertificateContainer;

    /**
     * Creates a plain object from a CertificateContainer message. Also converts values to other types if specified.
     * @param message CertificateContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CertificateContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CertificateContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Request. */
export interface IRequest {

    /** Request id */
    id?: (string|null);

    /** Request status */
    status?: (Request.Status|null);

    /** Request standardId */
    standardId?: (string|null);

    /** Request factoryId */
    factoryId?: (string|null);

    /** Request requestDate */
    requestDate?: (number|Long|null);
}

/** Represents a Request. */
export class Request implements IRequest {

    /**
     * Constructs a new Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRequest);

    /** Request id. */
    public id: string;

    /** Request status. */
    public status: Request.Status;

    /** Request standardId. */
    public standardId: string;

    /** Request factoryId. */
    public factoryId: string;

    /** Request requestDate. */
    public requestDate: (number|Long);

    /**
     * Creates a new Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Request instance
     */
    public static create(properties?: IRequest): Request;

    /**
     * Encodes the specified Request message. Does not implicitly {@link Request.verify|verify} messages.
     * @param message Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Request message, length delimited. Does not implicitly {@link Request.verify|verify} messages.
     * @param message Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Request;

    /**
     * Decodes a Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Request;

    /**
     * Verifies a Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Request
     */
    public static fromObject(object: { [k: string]: any }): Request;

    /**
     * Creates a plain object from a Request message. Also converts values to other types if specified.
     * @param message Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Request to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Request {

    /** Status enum. */
    enum Status {
        UNSET_STATUS = 0,
        OPEN = 1,
        IN_PROGRESS = 2,
        CLOSED = 3,
        CERTIFIED = 4
    }
}

/** Properties of a RequestContainer. */
export interface IRequestContainer {

    /** RequestContainer entries */
    entries?: (IRequest[]|null);
}

/** Represents a RequestContainer. */
export class RequestContainer implements IRequestContainer {

    /**
     * Constructs a new RequestContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRequestContainer);

    /** RequestContainer entries. */
    public entries: IRequest[];

    /**
     * Creates a new RequestContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RequestContainer instance
     */
    public static create(properties?: IRequestContainer): RequestContainer;

    /**
     * Encodes the specified RequestContainer message. Does not implicitly {@link RequestContainer.verify|verify} messages.
     * @param message RequestContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRequestContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RequestContainer message, length delimited. Does not implicitly {@link RequestContainer.verify|verify} messages.
     * @param message RequestContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRequestContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RequestContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RequestContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RequestContainer;

    /**
     * Decodes a RequestContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RequestContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RequestContainer;

    /**
     * Verifies a RequestContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RequestContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RequestContainer
     */
    public static fromObject(object: { [k: string]: any }): RequestContainer;

    /**
     * Creates a plain object from a RequestContainer message. Also converts values to other types if specified.
     * @param message RequestContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RequestContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RequestContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Organization. */
export interface IOrganization {

    /** Organization id */
    id?: (string|null);

    /** Organization name */
    name?: (string|null);

    /** Organization authorizations */
    authorizations?: (Organization.IAuthorization[]|null);

    /** Organization contacts */
    contacts?: (Organization.IContact[]|null);

    /** Organization organizationType */
    organizationType?: (Organization.Type|null);

    /** Organization certifyingBodyDetails */
    certifyingBodyDetails?: (ICertifyingBody|null);

    /** Organization standardsBodyDetails */
    standardsBodyDetails?: (IStandardsBody|null);

    /** Organization factoryDetails */
    factoryDetails?: (IFactory|null);
}

/** Represents an Organization. */
export class Organization implements IOrganization {

    /**
     * Constructs a new Organization.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrganization);

    /** Organization id. */
    public id: string;

    /** Organization name. */
    public name: string;

    /** Organization authorizations. */
    public authorizations: Organization.IAuthorization[];

    /** Organization contacts. */
    public contacts: Organization.IContact[];

    /** Organization organizationType. */
    public organizationType: Organization.Type;

    /** Organization certifyingBodyDetails. */
    public certifyingBodyDetails?: (ICertifyingBody|null);

    /** Organization standardsBodyDetails. */
    public standardsBodyDetails?: (IStandardsBody|null);

    /** Organization factoryDetails. */
    public factoryDetails?: (IFactory|null);

    /**
     * Creates a new Organization instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Organization instance
     */
    public static create(properties?: IOrganization): Organization;

    /**
     * Encodes the specified Organization message. Does not implicitly {@link Organization.verify|verify} messages.
     * @param message Organization message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrganization, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Organization message, length delimited. Does not implicitly {@link Organization.verify|verify} messages.
     * @param message Organization message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrganization, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Organization message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Organization
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Organization;

    /**
     * Decodes an Organization message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Organization
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Organization;

    /**
     * Verifies an Organization message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Organization message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Organization
     */
    public static fromObject(object: { [k: string]: any }): Organization;

    /**
     * Creates a plain object from an Organization message. Also converts values to other types if specified.
     * @param message Organization
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Organization, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Organization to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Organization {

    /** Type enum. */
    enum Type {
        UNSET_TYPE = 0,
        CERTIFYING_BODY = 1,
        STANDARDS_BODY = 2,
        FACTORY = 3
    }

    /** Properties of an Authorization. */
    interface IAuthorization {

        /** Authorization publicKey */
        publicKey?: (string|null);

        /** Authorization role */
        role?: (Organization.Authorization.Role|null);
    }

    /** Represents an Authorization. */
    class Authorization implements IAuthorization {

        /**
         * Constructs a new Authorization.
         * @param [properties] Properties to set
         */
        constructor(properties?: Organization.IAuthorization);

        /** Authorization publicKey. */
        public publicKey: string;

        /** Authorization role. */
        public role: Organization.Authorization.Role;

        /**
         * Creates a new Authorization instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Authorization instance
         */
        public static create(properties?: Organization.IAuthorization): Organization.Authorization;

        /**
         * Encodes the specified Authorization message. Does not implicitly {@link Organization.Authorization.verify|verify} messages.
         * @param message Authorization message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Organization.IAuthorization, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Authorization message, length delimited. Does not implicitly {@link Organization.Authorization.verify|verify} messages.
         * @param message Authorization message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Organization.IAuthorization, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Authorization message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Authorization
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Organization.Authorization;

        /**
         * Decodes an Authorization message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Authorization
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Organization.Authorization;

        /**
         * Verifies an Authorization message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Authorization message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Authorization
         */
        public static fromObject(object: { [k: string]: any }): Organization.Authorization;

        /**
         * Creates a plain object from an Authorization message. Also converts values to other types if specified.
         * @param message Authorization
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Organization.Authorization, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Authorization to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Authorization {

        /** Role enum. */
        enum Role {
            UNSET_ROLE = 0,
            ADMIN = 1,
            TRANSACTOR = 2
        }
    }

    /** Properties of a Contact. */
    interface IContact {

        /** Contact name */
        name?: (string|null);

        /** Contact phoneNumber */
        phoneNumber?: (string|null);

        /** Contact languageCode */
        languageCode?: (string|null);
    }

    /** Represents a Contact. */
    class Contact implements IContact {

        /**
         * Constructs a new Contact.
         * @param [properties] Properties to set
         */
        constructor(properties?: Organization.IContact);

        /** Contact name. */
        public name: string;

        /** Contact phoneNumber. */
        public phoneNumber: string;

        /** Contact languageCode. */
        public languageCode: string;

        /**
         * Creates a new Contact instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Contact instance
         */
        public static create(properties?: Organization.IContact): Organization.Contact;

        /**
         * Encodes the specified Contact message. Does not implicitly {@link Organization.Contact.verify|verify} messages.
         * @param message Contact message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Organization.IContact, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Contact message, length delimited. Does not implicitly {@link Organization.Contact.verify|verify} messages.
         * @param message Contact message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Organization.IContact, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Contact message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Contact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Organization.Contact;

        /**
         * Decodes a Contact message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Contact
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Organization.Contact;

        /**
         * Verifies a Contact message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Contact message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Contact
         */
        public static fromObject(object: { [k: string]: any }): Organization.Contact;

        /**
         * Creates a plain object from a Contact message. Also converts values to other types if specified.
         * @param message Contact
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Organization.Contact, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Contact to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a CertifyingBody. */
export interface ICertifyingBody {

    /** CertifyingBody accreditations */
    accreditations?: (CertifyingBody.IAccreditation[]|null);
}

/** Represents a CertifyingBody. */
export class CertifyingBody implements ICertifyingBody {

    /**
     * Constructs a new CertifyingBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICertifyingBody);

    /** CertifyingBody accreditations. */
    public accreditations: CertifyingBody.IAccreditation[];

    /**
     * Creates a new CertifyingBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CertifyingBody instance
     */
    public static create(properties?: ICertifyingBody): CertifyingBody;

    /**
     * Encodes the specified CertifyingBody message. Does not implicitly {@link CertifyingBody.verify|verify} messages.
     * @param message CertifyingBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICertifyingBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CertifyingBody message, length delimited. Does not implicitly {@link CertifyingBody.verify|verify} messages.
     * @param message CertifyingBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICertifyingBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CertifyingBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CertifyingBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CertifyingBody;

    /**
     * Decodes a CertifyingBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CertifyingBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CertifyingBody;

    /**
     * Verifies a CertifyingBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CertifyingBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CertifyingBody
     */
    public static fromObject(object: { [k: string]: any }): CertifyingBody;

    /**
     * Creates a plain object from a CertifyingBody message. Also converts values to other types if specified.
     * @param message CertifyingBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CertifyingBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CertifyingBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace CertifyingBody {

    /** Properties of an Accreditation. */
    interface IAccreditation {

        /** Accreditation standardId */
        standardId?: (string|null);

        /** Accreditation standardVersion */
        standardVersion?: (string|null);

        /** Accreditation accreditorId */
        accreditorId?: (string|null);

        /** Accreditation validFrom */
        validFrom?: (number|Long|null);

        /** Accreditation validTo */
        validTo?: (number|Long|null);
    }

    /** Represents an Accreditation. */
    class Accreditation implements IAccreditation {

        /**
         * Constructs a new Accreditation.
         * @param [properties] Properties to set
         */
        constructor(properties?: CertifyingBody.IAccreditation);

        /** Accreditation standardId. */
        public standardId: string;

        /** Accreditation standardVersion. */
        public standardVersion: string;

        /** Accreditation accreditorId. */
        public accreditorId: string;

        /** Accreditation validFrom. */
        public validFrom: (number|Long);

        /** Accreditation validTo. */
        public validTo: (number|Long);

        /**
         * Creates a new Accreditation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Accreditation instance
         */
        public static create(properties?: CertifyingBody.IAccreditation): CertifyingBody.Accreditation;

        /**
         * Encodes the specified Accreditation message. Does not implicitly {@link CertifyingBody.Accreditation.verify|verify} messages.
         * @param message Accreditation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CertifyingBody.IAccreditation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Accreditation message, length delimited. Does not implicitly {@link CertifyingBody.Accreditation.verify|verify} messages.
         * @param message Accreditation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CertifyingBody.IAccreditation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Accreditation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Accreditation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CertifyingBody.Accreditation;

        /**
         * Decodes an Accreditation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Accreditation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CertifyingBody.Accreditation;

        /**
         * Verifies an Accreditation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Accreditation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Accreditation
         */
        public static fromObject(object: { [k: string]: any }): CertifyingBody.Accreditation;

        /**
         * Creates a plain object from an Accreditation message. Also converts values to other types if specified.
         * @param message Accreditation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CertifyingBody.Accreditation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Accreditation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a StandardsBody. */
export interface IStandardsBody {
}

/** Represents a StandardsBody. */
export class StandardsBody implements IStandardsBody {

    /**
     * Constructs a new StandardsBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStandardsBody);

    /**
     * Creates a new StandardsBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StandardsBody instance
     */
    public static create(properties?: IStandardsBody): StandardsBody;

    /**
     * Encodes the specified StandardsBody message. Does not implicitly {@link StandardsBody.verify|verify} messages.
     * @param message StandardsBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStandardsBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified StandardsBody message, length delimited. Does not implicitly {@link StandardsBody.verify|verify} messages.
     * @param message StandardsBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStandardsBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a StandardsBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StandardsBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StandardsBody;

    /**
     * Decodes a StandardsBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StandardsBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StandardsBody;

    /**
     * Verifies a StandardsBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a StandardsBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StandardsBody
     */
    public static fromObject(object: { [k: string]: any }): StandardsBody;

    /**
     * Creates a plain object from a StandardsBody message. Also converts values to other types if specified.
     * @param message StandardsBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: StandardsBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this StandardsBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Factory. */
export interface IFactory {

    /** Factory address */
    address?: (Factory.IAddress|null);
}

/** Represents a Factory. */
export class Factory implements IFactory {

    /**
     * Constructs a new Factory.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFactory);

    /** Factory address. */
    public address?: (Factory.IAddress|null);

    /**
     * Creates a new Factory instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Factory instance
     */
    public static create(properties?: IFactory): Factory;

    /**
     * Encodes the specified Factory message. Does not implicitly {@link Factory.verify|verify} messages.
     * @param message Factory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFactory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Factory message, length delimited. Does not implicitly {@link Factory.verify|verify} messages.
     * @param message Factory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFactory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Factory message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Factory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Factory;

    /**
     * Decodes a Factory message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Factory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Factory;

    /**
     * Verifies a Factory message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Factory message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Factory
     */
    public static fromObject(object: { [k: string]: any }): Factory;

    /**
     * Creates a plain object from a Factory message. Also converts values to other types if specified.
     * @param message Factory
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Factory, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Factory to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Factory {

    /** Properties of an Address. */
    interface IAddress {

        /** Address streetLine_1 */
        streetLine_1?: (string|null);

        /** Address streetLine_2 */
        streetLine_2?: (string|null);

        /** Address city */
        city?: (string|null);

        /** Address stateProvince */
        stateProvince?: (string|null);

        /** Address country */
        country?: (string|null);

        /** Address postalCode */
        postalCode?: (string|null);
    }

    /** Represents an Address. */
    class Address implements IAddress {

        /**
         * Constructs a new Address.
         * @param [properties] Properties to set
         */
        constructor(properties?: Factory.IAddress);

        /** Address streetLine_1. */
        public streetLine_1: string;

        /** Address streetLine_2. */
        public streetLine_2: string;

        /** Address city. */
        public city: string;

        /** Address stateProvince. */
        public stateProvince: string;

        /** Address country. */
        public country: string;

        /** Address postalCode. */
        public postalCode: string;

        /**
         * Creates a new Address instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Address instance
         */
        public static create(properties?: Factory.IAddress): Factory.Address;

        /**
         * Encodes the specified Address message. Does not implicitly {@link Factory.Address.verify|verify} messages.
         * @param message Address message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Factory.IAddress, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Address message, length delimited. Does not implicitly {@link Factory.Address.verify|verify} messages.
         * @param message Address message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Factory.IAddress, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Address message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Address
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Factory.Address;

        /**
         * Decodes an Address message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Address
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Factory.Address;

        /**
         * Verifies an Address message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Address message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Address
         */
        public static fromObject(object: { [k: string]: any }): Factory.Address;

        /**
         * Creates a plain object from an Address message. Also converts values to other types if specified.
         * @param message Address
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Factory.Address, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Address to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of an OrganizationContainer. */
export interface IOrganizationContainer {

    /** OrganizationContainer entries */
    entries?: (IOrganization[]|null);
}

/** Represents an OrganizationContainer. */
export class OrganizationContainer implements IOrganizationContainer {

    /**
     * Constructs a new OrganizationContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrganizationContainer);

    /** OrganizationContainer entries. */
    public entries: IOrganization[];

    /**
     * Creates a new OrganizationContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OrganizationContainer instance
     */
    public static create(properties?: IOrganizationContainer): OrganizationContainer;

    /**
     * Encodes the specified OrganizationContainer message. Does not implicitly {@link OrganizationContainer.verify|verify} messages.
     * @param message OrganizationContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrganizationContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OrganizationContainer message, length delimited. Does not implicitly {@link OrganizationContainer.verify|verify} messages.
     * @param message OrganizationContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrganizationContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OrganizationContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OrganizationContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OrganizationContainer;

    /**
     * Decodes an OrganizationContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OrganizationContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OrganizationContainer;

    /**
     * Verifies an OrganizationContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OrganizationContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OrganizationContainer
     */
    public static fromObject(object: { [k: string]: any }): OrganizationContainer;

    /**
     * Creates a plain object from an OrganizationContainer message. Also converts values to other types if specified.
     * @param message OrganizationContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OrganizationContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OrganizationContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Standard. */
export interface IStandard {

    /** Standard id */
    id?: (string|null);

    /** Standard organizationId */
    organizationId?: (string|null);

    /** Standard name */
    name?: (string|null);

    /** Standard versions */
    versions?: (Standard.IStandardVersion[]|null);
}

/** Represents a Standard. */
export class Standard implements IStandard {

    /**
     * Constructs a new Standard.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStandard);

    /** Standard id. */
    public id: string;

    /** Standard organizationId. */
    public organizationId: string;

    /** Standard name. */
    public name: string;

    /** Standard versions. */
    public versions: Standard.IStandardVersion[];

    /**
     * Creates a new Standard instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Standard instance
     */
    public static create(properties?: IStandard): Standard;

    /**
     * Encodes the specified Standard message. Does not implicitly {@link Standard.verify|verify} messages.
     * @param message Standard message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStandard, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Standard message, length delimited. Does not implicitly {@link Standard.verify|verify} messages.
     * @param message Standard message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStandard, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Standard message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Standard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Standard;

    /**
     * Decodes a Standard message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Standard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Standard;

    /**
     * Verifies a Standard message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Standard message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Standard
     */
    public static fromObject(object: { [k: string]: any }): Standard;

    /**
     * Creates a plain object from a Standard message. Also converts values to other types if specified.
     * @param message Standard
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Standard, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Standard to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Standard {

    /** Properties of a StandardVersion. */
    interface IStandardVersion {

        /** StandardVersion version */
        version?: (string|null);

        /** StandardVersion description */
        description?: (string|null);

        /** StandardVersion link */
        link?: (string|null);

        /** StandardVersion approvalDate */
        approvalDate?: (number|Long|null);
    }

    /** Represents a StandardVersion. */
    class StandardVersion implements IStandardVersion {

        /**
         * Constructs a new StandardVersion.
         * @param [properties] Properties to set
         */
        constructor(properties?: Standard.IStandardVersion);

        /** StandardVersion version. */
        public version: string;

        /** StandardVersion description. */
        public description: string;

        /** StandardVersion link. */
        public link: string;

        /** StandardVersion approvalDate. */
        public approvalDate: (number|Long);

        /**
         * Creates a new StandardVersion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StandardVersion instance
         */
        public static create(properties?: Standard.IStandardVersion): Standard.StandardVersion;

        /**
         * Encodes the specified StandardVersion message. Does not implicitly {@link Standard.StandardVersion.verify|verify} messages.
         * @param message StandardVersion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Standard.IStandardVersion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StandardVersion message, length delimited. Does not implicitly {@link Standard.StandardVersion.verify|verify} messages.
         * @param message StandardVersion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Standard.IStandardVersion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StandardVersion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StandardVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Standard.StandardVersion;

        /**
         * Decodes a StandardVersion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StandardVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Standard.StandardVersion;

        /**
         * Verifies a StandardVersion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StandardVersion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StandardVersion
         */
        public static fromObject(object: { [k: string]: any }): Standard.StandardVersion;

        /**
         * Creates a plain object from a StandardVersion message. Also converts values to other types if specified.
         * @param message StandardVersion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Standard.StandardVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StandardVersion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a StandardContainer. */
export interface IStandardContainer {

    /** StandardContainer entries */
    entries?: (IStandard[]|null);
}

/** Represents a StandardContainer. */
export class StandardContainer implements IStandardContainer {

    /**
     * Constructs a new StandardContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStandardContainer);

    /** StandardContainer entries. */
    public entries: IStandard[];

    /**
     * Creates a new StandardContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StandardContainer instance
     */
    public static create(properties?: IStandardContainer): StandardContainer;

    /**
     * Encodes the specified StandardContainer message. Does not implicitly {@link StandardContainer.verify|verify} messages.
     * @param message StandardContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStandardContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified StandardContainer message, length delimited. Does not implicitly {@link StandardContainer.verify|verify} messages.
     * @param message StandardContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStandardContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a StandardContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StandardContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StandardContainer;

    /**
     * Decodes a StandardContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StandardContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StandardContainer;

    /**
     * Verifies a StandardContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a StandardContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StandardContainer
     */
    public static fromObject(object: { [k: string]: any }): StandardContainer;

    /**
     * Creates a plain object from a StandardContainer message. Also converts values to other types if specified.
     * @param message StandardContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: StandardContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this StandardContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CertificateRegistryPayload. */
export interface ICertificateRegistryPayload {

    /** CertificateRegistryPayload action */
    action?: (CertificateRegistryPayload.Action|null);

    /** CertificateRegistryPayload createAgent */
    createAgent?: (ICreateAgentAction|null);

    /** CertificateRegistryPayload createOrganization */
    createOrganization?: (ICreateOrganizationAction|null);

    /** CertificateRegistryPayload updateOrganization */
    updateOrganization?: (IUpdateOrganizationAction|null);

    /** CertificateRegistryPayload authorizeAgent */
    authorizeAgent?: (IAuthorizeAgentAction|null);

    /** CertificateRegistryPayload issueCertificate */
    issueCertificate?: (IIssueCertificateAction|null);

    /** CertificateRegistryPayload createStandard */
    createStandard?: (ICreateStandardAction|null);

    /** CertificateRegistryPayload updateStandard */
    updateStandard?: (IUpdateStandardAction|null);

    /** CertificateRegistryPayload openRequestAction */
    openRequestAction?: (IOpenRequestAction|null);

    /** CertificateRegistryPayload changeRequestStatusAction */
    changeRequestStatusAction?: (IChangeRequestStatusAction|null);

    /** CertificateRegistryPayload accreditCertifyingBodyAction */
    accreditCertifyingBodyAction?: (IAccreditCertifyingBodyAction|null);
}

/** Represents a CertificateRegistryPayload. */
export class CertificateRegistryPayload implements ICertificateRegistryPayload {

    /**
     * Constructs a new CertificateRegistryPayload.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICertificateRegistryPayload);

    /** CertificateRegistryPayload action. */
    public action: CertificateRegistryPayload.Action;

    /** CertificateRegistryPayload createAgent. */
    public createAgent?: (ICreateAgentAction|null);

    /** CertificateRegistryPayload createOrganization. */
    public createOrganization?: (ICreateOrganizationAction|null);

    /** CertificateRegistryPayload updateOrganization. */
    public updateOrganization?: (IUpdateOrganizationAction|null);

    /** CertificateRegistryPayload authorizeAgent. */
    public authorizeAgent?: (IAuthorizeAgentAction|null);

    /** CertificateRegistryPayload issueCertificate. */
    public issueCertificate?: (IIssueCertificateAction|null);

    /** CertificateRegistryPayload createStandard. */
    public createStandard?: (ICreateStandardAction|null);

    /** CertificateRegistryPayload updateStandard. */
    public updateStandard?: (IUpdateStandardAction|null);

    /** CertificateRegistryPayload openRequestAction. */
    public openRequestAction?: (IOpenRequestAction|null);

    /** CertificateRegistryPayload changeRequestStatusAction. */
    public changeRequestStatusAction?: (IChangeRequestStatusAction|null);

    /** CertificateRegistryPayload accreditCertifyingBodyAction. */
    public accreditCertifyingBodyAction?: (IAccreditCertifyingBodyAction|null);

    /**
     * Creates a new CertificateRegistryPayload instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CertificateRegistryPayload instance
     */
    public static create(properties?: ICertificateRegistryPayload): CertificateRegistryPayload;

    /**
     * Encodes the specified CertificateRegistryPayload message. Does not implicitly {@link CertificateRegistryPayload.verify|verify} messages.
     * @param message CertificateRegistryPayload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICertificateRegistryPayload, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CertificateRegistryPayload message, length delimited. Does not implicitly {@link CertificateRegistryPayload.verify|verify} messages.
     * @param message CertificateRegistryPayload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICertificateRegistryPayload, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CertificateRegistryPayload message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CertificateRegistryPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CertificateRegistryPayload;

    /**
     * Decodes a CertificateRegistryPayload message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CertificateRegistryPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CertificateRegistryPayload;

    /**
     * Verifies a CertificateRegistryPayload message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CertificateRegistryPayload message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CertificateRegistryPayload
     */
    public static fromObject(object: { [k: string]: any }): CertificateRegistryPayload;

    /**
     * Creates a plain object from a CertificateRegistryPayload message. Also converts values to other types if specified.
     * @param message CertificateRegistryPayload
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CertificateRegistryPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CertificateRegistryPayload to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace CertificateRegistryPayload {

    /** Action enum. */
    enum Action {
        UNSET_ACTION = 0,
        CREATE_AGENT = 1,
        CREATE_ORGANIZATION = 2,
        UPDATE_ORGANIZATION = 3,
        AUTHORIZE_AGENT = 4,
        ISSUE_CERTIFICATE = 5,
        CREATE_STANDARD = 6,
        UPDATE_STANDARD = 7,
        OPEN_REQUEST_ACTION = 8,
        CHANGE_REQUEST_STATUS_ACTION = 9,
        ACCREDIT_CERTIFYING_BODY_ACTION = 10
    }
}

/** Properties of a CreateAgentAction. */
export interface ICreateAgentAction {

    /** CreateAgentAction name */
    name?: (string|null);

    /** CreateAgentAction timestamp */
    timestamp?: (number|Long|null);
}

/** Represents a CreateAgentAction. */
export class CreateAgentAction implements ICreateAgentAction {

    /**
     * Constructs a new CreateAgentAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateAgentAction);

    /** CreateAgentAction name. */
    public name: string;

    /** CreateAgentAction timestamp. */
    public timestamp: (number|Long);

    /**
     * Creates a new CreateAgentAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateAgentAction instance
     */
    public static create(properties?: ICreateAgentAction): CreateAgentAction;

    /**
     * Encodes the specified CreateAgentAction message. Does not implicitly {@link CreateAgentAction.verify|verify} messages.
     * @param message CreateAgentAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateAgentAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateAgentAction message, length delimited. Does not implicitly {@link CreateAgentAction.verify|verify} messages.
     * @param message CreateAgentAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateAgentAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateAgentAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateAgentAction;

    /**
     * Decodes a CreateAgentAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateAgentAction;

    /**
     * Verifies a CreateAgentAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateAgentAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateAgentAction
     */
    public static fromObject(object: { [k: string]: any }): CreateAgentAction;

    /**
     * Creates a plain object from a CreateAgentAction message. Also converts values to other types if specified.
     * @param message CreateAgentAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateAgentAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateAgentAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateOrganizationAction. */
export interface ICreateOrganizationAction {

    /** CreateOrganizationAction id */
    id?: (string|null);

    /** CreateOrganizationAction organizationType */
    organizationType?: (Organization.Type|null);

    /** CreateOrganizationAction name */
    name?: (string|null);

    /** CreateOrganizationAction contacts */
    contacts?: (Organization.IContact[]|null);

    /** CreateOrganizationAction address */
    address?: (Factory.IAddress|null);
}

/** Represents a CreateOrganizationAction. */
export class CreateOrganizationAction implements ICreateOrganizationAction {

    /**
     * Constructs a new CreateOrganizationAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateOrganizationAction);

    /** CreateOrganizationAction id. */
    public id: string;

    /** CreateOrganizationAction organizationType. */
    public organizationType: Organization.Type;

    /** CreateOrganizationAction name. */
    public name: string;

    /** CreateOrganizationAction contacts. */
    public contacts: Organization.IContact[];

    /** CreateOrganizationAction address. */
    public address?: (Factory.IAddress|null);

    /**
     * Creates a new CreateOrganizationAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateOrganizationAction instance
     */
    public static create(properties?: ICreateOrganizationAction): CreateOrganizationAction;

    /**
     * Encodes the specified CreateOrganizationAction message. Does not implicitly {@link CreateOrganizationAction.verify|verify} messages.
     * @param message CreateOrganizationAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateOrganizationAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateOrganizationAction message, length delimited. Does not implicitly {@link CreateOrganizationAction.verify|verify} messages.
     * @param message CreateOrganizationAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateOrganizationAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateOrganizationAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateOrganizationAction;

    /**
     * Decodes a CreateOrganizationAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateOrganizationAction;

    /**
     * Verifies a CreateOrganizationAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateOrganizationAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateOrganizationAction
     */
    public static fromObject(object: { [k: string]: any }): CreateOrganizationAction;

    /**
     * Creates a plain object from a CreateOrganizationAction message. Also converts values to other types if specified.
     * @param message CreateOrganizationAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateOrganizationAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateOrganizationAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an UpdateOrganizationAction. */
export interface IUpdateOrganizationAction {

    /** UpdateOrganizationAction contacts */
    contacts?: (Organization.IContact[]|null);

    /** UpdateOrganizationAction address */
    address?: (Factory.IAddress|null);
}

/** Represents an UpdateOrganizationAction. */
export class UpdateOrganizationAction implements IUpdateOrganizationAction {

    /**
     * Constructs a new UpdateOrganizationAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUpdateOrganizationAction);

    /** UpdateOrganizationAction contacts. */
    public contacts: Organization.IContact[];

    /** UpdateOrganizationAction address. */
    public address?: (Factory.IAddress|null);

    /**
     * Creates a new UpdateOrganizationAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpdateOrganizationAction instance
     */
    public static create(properties?: IUpdateOrganizationAction): UpdateOrganizationAction;

    /**
     * Encodes the specified UpdateOrganizationAction message. Does not implicitly {@link UpdateOrganizationAction.verify|verify} messages.
     * @param message UpdateOrganizationAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUpdateOrganizationAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpdateOrganizationAction message, length delimited. Does not implicitly {@link UpdateOrganizationAction.verify|verify} messages.
     * @param message UpdateOrganizationAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUpdateOrganizationAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpdateOrganizationAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpdateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpdateOrganizationAction;

    /**
     * Decodes an UpdateOrganizationAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpdateOrganizationAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpdateOrganizationAction;

    /**
     * Verifies an UpdateOrganizationAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpdateOrganizationAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpdateOrganizationAction
     */
    public static fromObject(object: { [k: string]: any }): UpdateOrganizationAction;

    /**
     * Creates a plain object from an UpdateOrganizationAction message. Also converts values to other types if specified.
     * @param message UpdateOrganizationAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UpdateOrganizationAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpdateOrganizationAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AuthorizeAgentAction. */
export interface IAuthorizeAgentAction {

    /** AuthorizeAgentAction publicKey */
    publicKey?: (string|null);

    /** AuthorizeAgentAction role */
    role?: (Organization.Authorization.Role|null);
}

/** Represents an AuthorizeAgentAction. */
export class AuthorizeAgentAction implements IAuthorizeAgentAction {

    /**
     * Constructs a new AuthorizeAgentAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAuthorizeAgentAction);

    /** AuthorizeAgentAction publicKey. */
    public publicKey: string;

    /** AuthorizeAgentAction role. */
    public role: Organization.Authorization.Role;

    /**
     * Creates a new AuthorizeAgentAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AuthorizeAgentAction instance
     */
    public static create(properties?: IAuthorizeAgentAction): AuthorizeAgentAction;

    /**
     * Encodes the specified AuthorizeAgentAction message. Does not implicitly {@link AuthorizeAgentAction.verify|verify} messages.
     * @param message AuthorizeAgentAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAuthorizeAgentAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AuthorizeAgentAction message, length delimited. Does not implicitly {@link AuthorizeAgentAction.verify|verify} messages.
     * @param message AuthorizeAgentAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAuthorizeAgentAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AuthorizeAgentAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AuthorizeAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthorizeAgentAction;

    /**
     * Decodes an AuthorizeAgentAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AuthorizeAgentAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthorizeAgentAction;

    /**
     * Verifies an AuthorizeAgentAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AuthorizeAgentAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AuthorizeAgentAction
     */
    public static fromObject(object: { [k: string]: any }): AuthorizeAgentAction;

    /**
     * Creates a plain object from an AuthorizeAgentAction message. Also converts values to other types if specified.
     * @param message AuthorizeAgentAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AuthorizeAgentAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AuthorizeAgentAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an IssueCertificateAction. */
export interface IIssueCertificateAction {

    /** IssueCertificateAction id */
    id?: (string|null);

    /** IssueCertificateAction factoryId */
    factoryId?: (string|null);

    /** IssueCertificateAction source */
    source?: (IssueCertificateAction.Source|null);

    /** IssueCertificateAction requestId */
    requestId?: (string|null);

    /** IssueCertificateAction standardId */
    standardId?: (string|null);

    /** IssueCertificateAction certificateData */
    certificateData?: (Certificate.ICertificateData[]|null);

    /** IssueCertificateAction validFrom */
    validFrom?: (number|Long|null);

    /** IssueCertificateAction validTo */
    validTo?: (number|Long|null);
}

/** Represents an IssueCertificateAction. */
export class IssueCertificateAction implements IIssueCertificateAction {

    /**
     * Constructs a new IssueCertificateAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IIssueCertificateAction);

    /** IssueCertificateAction id. */
    public id: string;

    /** IssueCertificateAction factoryId. */
    public factoryId: string;

    /** IssueCertificateAction source. */
    public source: IssueCertificateAction.Source;

    /** IssueCertificateAction requestId. */
    public requestId: string;

    /** IssueCertificateAction standardId. */
    public standardId: string;

    /** IssueCertificateAction certificateData. */
    public certificateData: Certificate.ICertificateData[];

    /** IssueCertificateAction validFrom. */
    public validFrom: (number|Long);

    /** IssueCertificateAction validTo. */
    public validTo: (number|Long);

    /**
     * Creates a new IssueCertificateAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns IssueCertificateAction instance
     */
    public static create(properties?: IIssueCertificateAction): IssueCertificateAction;

    /**
     * Encodes the specified IssueCertificateAction message. Does not implicitly {@link IssueCertificateAction.verify|verify} messages.
     * @param message IssueCertificateAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IIssueCertificateAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified IssueCertificateAction message, length delimited. Does not implicitly {@link IssueCertificateAction.verify|verify} messages.
     * @param message IssueCertificateAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IIssueCertificateAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an IssueCertificateAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns IssueCertificateAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): IssueCertificateAction;

    /**
     * Decodes an IssueCertificateAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns IssueCertificateAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): IssueCertificateAction;

    /**
     * Verifies an IssueCertificateAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an IssueCertificateAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns IssueCertificateAction
     */
    public static fromObject(object: { [k: string]: any }): IssueCertificateAction;

    /**
     * Creates a plain object from an IssueCertificateAction message. Also converts values to other types if specified.
     * @param message IssueCertificateAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: IssueCertificateAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this IssueCertificateAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace IssueCertificateAction {

    /** Source enum. */
    enum Source {
        UNSET_SOURCE = 0,
        FROM_REQUEST = 1,
        INDEPENDENT = 2
    }
}

/** Properties of an OpenRequestAction. */
export interface IOpenRequestAction {

    /** OpenRequestAction id */
    id?: (string|null);

    /** OpenRequestAction standardId */
    standardId?: (string|null);

    /** OpenRequestAction requestDate */
    requestDate?: (number|Long|null);
}

/** Represents an OpenRequestAction. */
export class OpenRequestAction implements IOpenRequestAction {

    /**
     * Constructs a new OpenRequestAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOpenRequestAction);

    /** OpenRequestAction id. */
    public id: string;

    /** OpenRequestAction standardId. */
    public standardId: string;

    /** OpenRequestAction requestDate. */
    public requestDate: (number|Long);

    /**
     * Creates a new OpenRequestAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OpenRequestAction instance
     */
    public static create(properties?: IOpenRequestAction): OpenRequestAction;

    /**
     * Encodes the specified OpenRequestAction message. Does not implicitly {@link OpenRequestAction.verify|verify} messages.
     * @param message OpenRequestAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOpenRequestAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OpenRequestAction message, length delimited. Does not implicitly {@link OpenRequestAction.verify|verify} messages.
     * @param message OpenRequestAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOpenRequestAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OpenRequestAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OpenRequestAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OpenRequestAction;

    /**
     * Decodes an OpenRequestAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OpenRequestAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OpenRequestAction;

    /**
     * Verifies an OpenRequestAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OpenRequestAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OpenRequestAction
     */
    public static fromObject(object: { [k: string]: any }): OpenRequestAction;

    /**
     * Creates a plain object from an OpenRequestAction message. Also converts values to other types if specified.
     * @param message OpenRequestAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OpenRequestAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OpenRequestAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChangeRequestStatusAction. */
export interface IChangeRequestStatusAction {

    /** ChangeRequestStatusAction requestId */
    requestId?: (string|null);

    /** ChangeRequestStatusAction status */
    status?: (Request.Status|null);
}

/** Represents a ChangeRequestStatusAction. */
export class ChangeRequestStatusAction implements IChangeRequestStatusAction {

    /**
     * Constructs a new ChangeRequestStatusAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChangeRequestStatusAction);

    /** ChangeRequestStatusAction requestId. */
    public requestId: string;

    /** ChangeRequestStatusAction status. */
    public status: Request.Status;

    /**
     * Creates a new ChangeRequestStatusAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChangeRequestStatusAction instance
     */
    public static create(properties?: IChangeRequestStatusAction): ChangeRequestStatusAction;

    /**
     * Encodes the specified ChangeRequestStatusAction message. Does not implicitly {@link ChangeRequestStatusAction.verify|verify} messages.
     * @param message ChangeRequestStatusAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChangeRequestStatusAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChangeRequestStatusAction message, length delimited. Does not implicitly {@link ChangeRequestStatusAction.verify|verify} messages.
     * @param message ChangeRequestStatusAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChangeRequestStatusAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChangeRequestStatusAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChangeRequestStatusAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChangeRequestStatusAction;

    /**
     * Decodes a ChangeRequestStatusAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChangeRequestStatusAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChangeRequestStatusAction;

    /**
     * Verifies a ChangeRequestStatusAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChangeRequestStatusAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChangeRequestStatusAction
     */
    public static fromObject(object: { [k: string]: any }): ChangeRequestStatusAction;

    /**
     * Creates a plain object from a ChangeRequestStatusAction message. Also converts values to other types if specified.
     * @param message ChangeRequestStatusAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChangeRequestStatusAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChangeRequestStatusAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateStandardAction. */
export interface ICreateStandardAction {

    /** CreateStandardAction standardId */
    standardId?: (string|null);

    /** CreateStandardAction name */
    name?: (string|null);

    /** CreateStandardAction version */
    version?: (string|null);

    /** CreateStandardAction description */
    description?: (string|null);

    /** CreateStandardAction link */
    link?: (string|null);

    /** CreateStandardAction approvalDate */
    approvalDate?: (number|Long|null);
}

/** Represents a CreateStandardAction. */
export class CreateStandardAction implements ICreateStandardAction {

    /**
     * Constructs a new CreateStandardAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateStandardAction);

    /** CreateStandardAction standardId. */
    public standardId: string;

    /** CreateStandardAction name. */
    public name: string;

    /** CreateStandardAction version. */
    public version: string;

    /** CreateStandardAction description. */
    public description: string;

    /** CreateStandardAction link. */
    public link: string;

    /** CreateStandardAction approvalDate. */
    public approvalDate: (number|Long);

    /**
     * Creates a new CreateStandardAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateStandardAction instance
     */
    public static create(properties?: ICreateStandardAction): CreateStandardAction;

    /**
     * Encodes the specified CreateStandardAction message. Does not implicitly {@link CreateStandardAction.verify|verify} messages.
     * @param message CreateStandardAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateStandardAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateStandardAction message, length delimited. Does not implicitly {@link CreateStandardAction.verify|verify} messages.
     * @param message CreateStandardAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateStandardAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateStandardAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateStandardAction;

    /**
     * Decodes a CreateStandardAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateStandardAction;

    /**
     * Verifies a CreateStandardAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateStandardAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateStandardAction
     */
    public static fromObject(object: { [k: string]: any }): CreateStandardAction;

    /**
     * Creates a plain object from a CreateStandardAction message. Also converts values to other types if specified.
     * @param message CreateStandardAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateStandardAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateStandardAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an UpdateStandardAction. */
export interface IUpdateStandardAction {

    /** UpdateStandardAction standardId */
    standardId?: (string|null);

    /** UpdateStandardAction version */
    version?: (string|null);

    /** UpdateStandardAction description */
    description?: (string|null);

    /** UpdateStandardAction link */
    link?: (string|null);

    /** UpdateStandardAction approvalDate */
    approvalDate?: (number|Long|null);
}

/** Represents an UpdateStandardAction. */
export class UpdateStandardAction implements IUpdateStandardAction {

    /**
     * Constructs a new UpdateStandardAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUpdateStandardAction);

    /** UpdateStandardAction standardId. */
    public standardId: string;

    /** UpdateStandardAction version. */
    public version: string;

    /** UpdateStandardAction description. */
    public description: string;

    /** UpdateStandardAction link. */
    public link: string;

    /** UpdateStandardAction approvalDate. */
    public approvalDate: (number|Long);

    /**
     * Creates a new UpdateStandardAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpdateStandardAction instance
     */
    public static create(properties?: IUpdateStandardAction): UpdateStandardAction;

    /**
     * Encodes the specified UpdateStandardAction message. Does not implicitly {@link UpdateStandardAction.verify|verify} messages.
     * @param message UpdateStandardAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUpdateStandardAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpdateStandardAction message, length delimited. Does not implicitly {@link UpdateStandardAction.verify|verify} messages.
     * @param message UpdateStandardAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUpdateStandardAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpdateStandardAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpdateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpdateStandardAction;

    /**
     * Decodes an UpdateStandardAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpdateStandardAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpdateStandardAction;

    /**
     * Verifies an UpdateStandardAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpdateStandardAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpdateStandardAction
     */
    public static fromObject(object: { [k: string]: any }): UpdateStandardAction;

    /**
     * Creates a plain object from an UpdateStandardAction message. Also converts values to other types if specified.
     * @param message UpdateStandardAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UpdateStandardAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpdateStandardAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AccreditCertifyingBodyAction. */
export interface IAccreditCertifyingBodyAction {

    /** AccreditCertifyingBodyAction certifyingBodyId */
    certifyingBodyId?: (string|null);

    /** AccreditCertifyingBodyAction standardId */
    standardId?: (string|null);

    /** AccreditCertifyingBodyAction validFrom */
    validFrom?: (number|Long|null);

    /** AccreditCertifyingBodyAction validTo */
    validTo?: (number|Long|null);
}

/** Represents an AccreditCertifyingBodyAction. */
export class AccreditCertifyingBodyAction implements IAccreditCertifyingBodyAction {

    /**
     * Constructs a new AccreditCertifyingBodyAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAccreditCertifyingBodyAction);

    /** AccreditCertifyingBodyAction certifyingBodyId. */
    public certifyingBodyId: string;

    /** AccreditCertifyingBodyAction standardId. */
    public standardId: string;

    /** AccreditCertifyingBodyAction validFrom. */
    public validFrom: (number|Long);

    /** AccreditCertifyingBodyAction validTo. */
    public validTo: (number|Long);

    /**
     * Creates a new AccreditCertifyingBodyAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AccreditCertifyingBodyAction instance
     */
    public static create(properties?: IAccreditCertifyingBodyAction): AccreditCertifyingBodyAction;

    /**
     * Encodes the specified AccreditCertifyingBodyAction message. Does not implicitly {@link AccreditCertifyingBodyAction.verify|verify} messages.
     * @param message AccreditCertifyingBodyAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAccreditCertifyingBodyAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AccreditCertifyingBodyAction message, length delimited. Does not implicitly {@link AccreditCertifyingBodyAction.verify|verify} messages.
     * @param message AccreditCertifyingBodyAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAccreditCertifyingBodyAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AccreditCertifyingBodyAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AccreditCertifyingBodyAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AccreditCertifyingBodyAction;

    /**
     * Decodes an AccreditCertifyingBodyAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AccreditCertifyingBodyAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AccreditCertifyingBodyAction;

    /**
     * Verifies an AccreditCertifyingBodyAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AccreditCertifyingBodyAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AccreditCertifyingBodyAction
     */
    public static fromObject(object: { [k: string]: any }): AccreditCertifyingBodyAction;

    /**
     * Creates a plain object from an AccreditCertifyingBodyAction message. Also converts values to other types if specified.
     * @param message AccreditCertifyingBodyAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AccreditCertifyingBodyAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AccreditCertifyingBodyAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
