import * as $protobuf from 'protobufjs';
/** Properties of a CertificateRegistryPayload. */
export interface ICertificateRegistryPayload {
  /** CertificateRegistryPayload action */
  action?: CertificateRegistryPayload.Action | null;

  /** CertificateRegistryPayload create_agent */
  create_agent?: ICreateAgentAction | null;

  /** CertificateRegistryPayload create_organization */
  create_organization?: ICreateOrganizationAction | null;

  /** CertificateRegistryPayload update_organization */
  update_organization?: IUpdateOrganizationAction | null;

  /** CertificateRegistryPayload authorize_agent */
  authorize_agent?: IAuthorizeAgentAction | null;

  /** CertificateRegistryPayload issue_certificate */
  issue_certificate?: IIssueCertificateAction | null;

  /** CertificateRegistryPayload create_standard */
  create_standard?: ICreateStandardAction | null;

  /** CertificateRegistryPayload update_standard */
  update_standard?: IUpdateStandardAction | null;

  /** CertificateRegistryPayload open_request_action */
  open_request_action?: IOpenRequestAction | null;

  /** CertificateRegistryPayload change_request_status_action */
  change_request_status_action?: IChangeRequestStatusAction | null;

  /** CertificateRegistryPayload accredit_certifying_body_action */
  accredit_certifying_body_action?: IAccreditCertifyingBodyAction | null;

  /** CertificateRegistryPayload assert_action */
  assert_action?: IAssertAction | null;

  /** CertificateRegistryPayload transfer_assertion_action */
  transfer_assertion_action?: ITransferAssertionAction | null;
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

  /** CertificateRegistryPayload create_agent. */
  public create_agent?: ICreateAgentAction | null;

  /** CertificateRegistryPayload create_organization. */
  public create_organization?: ICreateOrganizationAction | null;

  /** CertificateRegistryPayload update_organization. */
  public update_organization?: IUpdateOrganizationAction | null;

  /** CertificateRegistryPayload authorize_agent. */
  public authorize_agent?: IAuthorizeAgentAction | null;

  /** CertificateRegistryPayload issue_certificate. */
  public issue_certificate?: IIssueCertificateAction | null;

  /** CertificateRegistryPayload create_standard. */
  public create_standard?: ICreateStandardAction | null;

  /** CertificateRegistryPayload update_standard. */
  public update_standard?: IUpdateStandardAction | null;

  /** CertificateRegistryPayload open_request_action. */
  public open_request_action?: IOpenRequestAction | null;

  /** CertificateRegistryPayload change_request_status_action. */
  public change_request_status_action?: IChangeRequestStatusAction | null;

  /** CertificateRegistryPayload accredit_certifying_body_action. */
  public accredit_certifying_body_action?: IAccreditCertifyingBodyAction | null;

  /** CertificateRegistryPayload assert_action. */
  public assert_action?: IAssertAction | null;

  /** CertificateRegistryPayload transfer_assertion_action. */
  public transfer_assertion_action?: ITransferAssertionAction | null;

  /**
   * Creates a new CertificateRegistryPayload instance using the specified properties.
   * @param [properties] Properties to set
   * @returns CertificateRegistryPayload instance
   */
  public static create(
    properties?: ICertificateRegistryPayload,
  ): CertificateRegistryPayload;

  /**
   * Encodes the specified CertificateRegistryPayload message. Does not implicitly {@link CertificateRegistryPayload.verify|verify} messages.
   * @param message CertificateRegistryPayload message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ICertificateRegistryPayload,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified CertificateRegistryPayload message, length delimited. Does not implicitly {@link CertificateRegistryPayload.verify|verify} messages.
   * @param message CertificateRegistryPayload message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICertificateRegistryPayload,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a CertificateRegistryPayload message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CertificateRegistryPayload
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): CertificateRegistryPayload;

  /**
   * Decodes a CertificateRegistryPayload message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CertificateRegistryPayload
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): CertificateRegistryPayload;

  /**
   * Verifies a CertificateRegistryPayload message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a CertificateRegistryPayload message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns CertificateRegistryPayload
   */
  public static fromObject(object: {
    [k: string]: any;
  }): CertificateRegistryPayload;

  /**
   * Creates a plain object from a CertificateRegistryPayload message. Also converts values to other types if specified.
   * @param message CertificateRegistryPayload
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: CertificateRegistryPayload,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

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
    ACCREDIT_CERTIFYING_BODY_ACTION = 10,
    ASSERT_ACTION = 11,
    TRANSFER_ASSERTION = 12,
  }
}

/** Properties of a CreateAgentAction. */
export interface ICreateAgentAction {
  /** CreateAgentAction name */
  name?: string | null;

  /** CreateAgentAction timestamp */
  timestamp?: number | Long | null;
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
  public timestamp: number | Long;

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
  public static encode(
    message: ICreateAgentAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified CreateAgentAction message, length delimited. Does not implicitly {@link CreateAgentAction.verify|verify} messages.
   * @param message CreateAgentAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICreateAgentAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a CreateAgentAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CreateAgentAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): CreateAgentAction;

  /**
   * Decodes a CreateAgentAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CreateAgentAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): CreateAgentAction;

  /**
   * Verifies a CreateAgentAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: CreateAgentAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this CreateAgentAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a CreateOrganizationAction. */
export interface ICreateOrganizationAction {
  /** CreateOrganizationAction id */
  id?: string | null;

  /** CreateOrganizationAction organization_type */
  organization_type?: Organization.Type | null;

  /** CreateOrganizationAction name */
  name?: string | null;

  /** CreateOrganizationAction contacts */
  contacts?: Organization.IContact[] | null;

  /** CreateOrganizationAction address */
  address?: Factory.IAddress | null;
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

  /** CreateOrganizationAction organization_type. */
  public organization_type: Organization.Type;

  /** CreateOrganizationAction name. */
  public name: string;

  /** CreateOrganizationAction contacts. */
  public contacts: Organization.IContact[];

  /** CreateOrganizationAction address. */
  public address?: Factory.IAddress | null;

  /**
   * Creates a new CreateOrganizationAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns CreateOrganizationAction instance
   */
  public static create(
    properties?: ICreateOrganizationAction,
  ): CreateOrganizationAction;

  /**
   * Encodes the specified CreateOrganizationAction message. Does not implicitly {@link CreateOrganizationAction.verify|verify} messages.
   * @param message CreateOrganizationAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ICreateOrganizationAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified CreateOrganizationAction message, length delimited. Does not implicitly {@link CreateOrganizationAction.verify|verify} messages.
   * @param message CreateOrganizationAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICreateOrganizationAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a CreateOrganizationAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CreateOrganizationAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): CreateOrganizationAction;

  /**
   * Decodes a CreateOrganizationAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CreateOrganizationAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): CreateOrganizationAction;

  /**
   * Verifies a CreateOrganizationAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a CreateOrganizationAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns CreateOrganizationAction
   */
  public static fromObject(object: {
    [k: string]: any;
  }): CreateOrganizationAction;

  /**
   * Creates a plain object from a CreateOrganizationAction message. Also converts values to other types if specified.
   * @param message CreateOrganizationAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: CreateOrganizationAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this CreateOrganizationAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an UpdateOrganizationAction. */
export interface IUpdateOrganizationAction {
  /** UpdateOrganizationAction contacts */
  contacts?: Organization.IContact[] | null;

  /** UpdateOrganizationAction address */
  address?: Factory.IAddress | null;
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
  public address?: Factory.IAddress | null;

  /**
   * Creates a new UpdateOrganizationAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns UpdateOrganizationAction instance
   */
  public static create(
    properties?: IUpdateOrganizationAction,
  ): UpdateOrganizationAction;

  /**
   * Encodes the specified UpdateOrganizationAction message. Does not implicitly {@link UpdateOrganizationAction.verify|verify} messages.
   * @param message UpdateOrganizationAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IUpdateOrganizationAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified UpdateOrganizationAction message, length delimited. Does not implicitly {@link UpdateOrganizationAction.verify|verify} messages.
   * @param message UpdateOrganizationAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IUpdateOrganizationAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an UpdateOrganizationAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns UpdateOrganizationAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): UpdateOrganizationAction;

  /**
   * Decodes an UpdateOrganizationAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns UpdateOrganizationAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): UpdateOrganizationAction;

  /**
   * Verifies an UpdateOrganizationAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an UpdateOrganizationAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns UpdateOrganizationAction
   */
  public static fromObject(object: {
    [k: string]: any;
  }): UpdateOrganizationAction;

  /**
   * Creates a plain object from an UpdateOrganizationAction message. Also converts values to other types if specified.
   * @param message UpdateOrganizationAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: UpdateOrganizationAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this UpdateOrganizationAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an AuthorizeAgentAction. */
export interface IAuthorizeAgentAction {
  /** AuthorizeAgentAction public_key */
  public_key?: string | null;

  /** AuthorizeAgentAction role */
  role?: Organization.Authorization.Role | null;
}

/** Represents an AuthorizeAgentAction. */
export class AuthorizeAgentAction implements IAuthorizeAgentAction {
  /**
   * Constructs a new AuthorizeAgentAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: IAuthorizeAgentAction);

  /** AuthorizeAgentAction public_key. */
  public public_key: string;

  /** AuthorizeAgentAction role. */
  public role: Organization.Authorization.Role;

  /**
   * Creates a new AuthorizeAgentAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns AuthorizeAgentAction instance
   */
  public static create(
    properties?: IAuthorizeAgentAction,
  ): AuthorizeAgentAction;

  /**
   * Encodes the specified AuthorizeAgentAction message. Does not implicitly {@link AuthorizeAgentAction.verify|verify} messages.
   * @param message AuthorizeAgentAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IAuthorizeAgentAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified AuthorizeAgentAction message, length delimited. Does not implicitly {@link AuthorizeAgentAction.verify|verify} messages.
   * @param message AuthorizeAgentAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IAuthorizeAgentAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an AuthorizeAgentAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns AuthorizeAgentAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): AuthorizeAgentAction;

  /**
   * Decodes an AuthorizeAgentAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns AuthorizeAgentAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): AuthorizeAgentAction;

  /**
   * Verifies an AuthorizeAgentAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: AuthorizeAgentAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this AuthorizeAgentAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an IssueCertificateAction. */
export interface IIssueCertificateAction {
  /** IssueCertificateAction id */
  id?: string | null;

  /** IssueCertificateAction factory_id */
  factory_id?: string | null;

  /** IssueCertificateAction source */
  source?: IssueCertificateAction.Source | null;

  /** IssueCertificateAction request_id */
  request_id?: string | null;

  /** IssueCertificateAction standard_id */
  standard_id?: string | null;

  /** IssueCertificateAction certificate_data */
  certificate_data?: Certificate.ICertificateData[] | null;

  /** IssueCertificateAction valid_from */
  valid_from?: number | Long | null;

  /** IssueCertificateAction valid_to */
  valid_to?: number | Long | null;
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

  /** IssueCertificateAction factory_id. */
  public factory_id: string;

  /** IssueCertificateAction source. */
  public source: IssueCertificateAction.Source;

  /** IssueCertificateAction request_id. */
  public request_id: string;

  /** IssueCertificateAction standard_id. */
  public standard_id: string;

  /** IssueCertificateAction certificate_data. */
  public certificate_data: Certificate.ICertificateData[];

  /** IssueCertificateAction valid_from. */
  public valid_from: number | Long;

  /** IssueCertificateAction valid_to. */
  public valid_to: number | Long;

  /**
   * Creates a new IssueCertificateAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns IssueCertificateAction instance
   */
  public static create(
    properties?: IIssueCertificateAction,
  ): IssueCertificateAction;

  /**
   * Encodes the specified IssueCertificateAction message. Does not implicitly {@link IssueCertificateAction.verify|verify} messages.
   * @param message IssueCertificateAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IIssueCertificateAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified IssueCertificateAction message, length delimited. Does not implicitly {@link IssueCertificateAction.verify|verify} messages.
   * @param message IssueCertificateAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IIssueCertificateAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an IssueCertificateAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns IssueCertificateAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): IssueCertificateAction;

  /**
   * Decodes an IssueCertificateAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns IssueCertificateAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): IssueCertificateAction;

  /**
   * Verifies an IssueCertificateAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an IssueCertificateAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns IssueCertificateAction
   */
  public static fromObject(object: {
    [k: string]: any;
  }): IssueCertificateAction;

  /**
   * Creates a plain object from an IssueCertificateAction message. Also converts values to other types if specified.
   * @param message IssueCertificateAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: IssueCertificateAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

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
    INDEPENDENT = 2,
  }
}

/** Properties of an OpenRequestAction. */
export interface IOpenRequestAction {
  /** OpenRequestAction id */
  id?: string | null;

  /** OpenRequestAction standard_id */
  standard_id?: string | null;

  /** OpenRequestAction request_date */
  request_date?: number | Long | null;
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

  /** OpenRequestAction standard_id. */
  public standard_id: string;

  /** OpenRequestAction request_date. */
  public request_date: number | Long;

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
  public static encode(
    message: IOpenRequestAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified OpenRequestAction message, length delimited. Does not implicitly {@link OpenRequestAction.verify|verify} messages.
   * @param message OpenRequestAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IOpenRequestAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an OpenRequestAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns OpenRequestAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): OpenRequestAction;

  /**
   * Decodes an OpenRequestAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns OpenRequestAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): OpenRequestAction;

  /**
   * Verifies an OpenRequestAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: OpenRequestAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this OpenRequestAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a ChangeRequestStatusAction. */
export interface IChangeRequestStatusAction {
  /** ChangeRequestStatusAction request_id */
  request_id?: string | null;

  /** ChangeRequestStatusAction status */
  status?: Request.Status | null;
}

/** Represents a ChangeRequestStatusAction. */
export class ChangeRequestStatusAction implements IChangeRequestStatusAction {
  /**
   * Constructs a new ChangeRequestStatusAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: IChangeRequestStatusAction);

  /** ChangeRequestStatusAction request_id. */
  public request_id: string;

  /** ChangeRequestStatusAction status. */
  public status: Request.Status;

  /**
   * Creates a new ChangeRequestStatusAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns ChangeRequestStatusAction instance
   */
  public static create(
    properties?: IChangeRequestStatusAction,
  ): ChangeRequestStatusAction;

  /**
   * Encodes the specified ChangeRequestStatusAction message. Does not implicitly {@link ChangeRequestStatusAction.verify|verify} messages.
   * @param message ChangeRequestStatusAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IChangeRequestStatusAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified ChangeRequestStatusAction message, length delimited. Does not implicitly {@link ChangeRequestStatusAction.verify|verify} messages.
   * @param message ChangeRequestStatusAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IChangeRequestStatusAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a ChangeRequestStatusAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns ChangeRequestStatusAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): ChangeRequestStatusAction;

  /**
   * Decodes a ChangeRequestStatusAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns ChangeRequestStatusAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): ChangeRequestStatusAction;

  /**
   * Verifies a ChangeRequestStatusAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a ChangeRequestStatusAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns ChangeRequestStatusAction
   */
  public static fromObject(object: {
    [k: string]: any;
  }): ChangeRequestStatusAction;

  /**
   * Creates a plain object from a ChangeRequestStatusAction message. Also converts values to other types if specified.
   * @param message ChangeRequestStatusAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: ChangeRequestStatusAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this ChangeRequestStatusAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a CreateStandardAction. */
export interface ICreateStandardAction {
  /** CreateStandardAction standard_id */
  standard_id?: string | null;

  /** CreateStandardAction name */
  name?: string | null;

  /** CreateStandardAction version */
  version?: string | null;

  /** CreateStandardAction description */
  description?: string | null;

  /** CreateStandardAction link */
  link?: string | null;

  /** CreateStandardAction approval_date */
  approval_date?: number | Long | null;
}

/** Represents a CreateStandardAction. */
export class CreateStandardAction implements ICreateStandardAction {
  /**
   * Constructs a new CreateStandardAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: ICreateStandardAction);

  /** CreateStandardAction standard_id. */
  public standard_id: string;

  /** CreateStandardAction name. */
  public name: string;

  /** CreateStandardAction version. */
  public version: string;

  /** CreateStandardAction description. */
  public description: string;

  /** CreateStandardAction link. */
  public link: string;

  /** CreateStandardAction approval_date. */
  public approval_date: number | Long;

  /**
   * Creates a new CreateStandardAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns CreateStandardAction instance
   */
  public static create(
    properties?: ICreateStandardAction,
  ): CreateStandardAction;

  /**
   * Encodes the specified CreateStandardAction message. Does not implicitly {@link CreateStandardAction.verify|verify} messages.
   * @param message CreateStandardAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ICreateStandardAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified CreateStandardAction message, length delimited. Does not implicitly {@link CreateStandardAction.verify|verify} messages.
   * @param message CreateStandardAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICreateStandardAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a CreateStandardAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CreateStandardAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): CreateStandardAction;

  /**
   * Decodes a CreateStandardAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CreateStandardAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): CreateStandardAction;

  /**
   * Verifies a CreateStandardAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: CreateStandardAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this CreateStandardAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an UpdateStandardAction. */
export interface IUpdateStandardAction {
  /** UpdateStandardAction standard_id */
  standard_id?: string | null;

  /** UpdateStandardAction version */
  version?: string | null;

  /** UpdateStandardAction description */
  description?: string | null;

  /** UpdateStandardAction link */
  link?: string | null;

  /** UpdateStandardAction approval_date */
  approval_date?: number | Long | null;
}

/** Represents an UpdateStandardAction. */
export class UpdateStandardAction implements IUpdateStandardAction {
  /**
   * Constructs a new UpdateStandardAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: IUpdateStandardAction);

  /** UpdateStandardAction standard_id. */
  public standard_id: string;

  /** UpdateStandardAction version. */
  public version: string;

  /** UpdateStandardAction description. */
  public description: string;

  /** UpdateStandardAction link. */
  public link: string;

  /** UpdateStandardAction approval_date. */
  public approval_date: number | Long;

  /**
   * Creates a new UpdateStandardAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns UpdateStandardAction instance
   */
  public static create(
    properties?: IUpdateStandardAction,
  ): UpdateStandardAction;

  /**
   * Encodes the specified UpdateStandardAction message. Does not implicitly {@link UpdateStandardAction.verify|verify} messages.
   * @param message UpdateStandardAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IUpdateStandardAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified UpdateStandardAction message, length delimited. Does not implicitly {@link UpdateStandardAction.verify|verify} messages.
   * @param message UpdateStandardAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IUpdateStandardAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an UpdateStandardAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns UpdateStandardAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): UpdateStandardAction;

  /**
   * Decodes an UpdateStandardAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns UpdateStandardAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): UpdateStandardAction;

  /**
   * Verifies an UpdateStandardAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: UpdateStandardAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this UpdateStandardAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an AccreditCertifyingBodyAction. */
export interface IAccreditCertifyingBodyAction {
  /** AccreditCertifyingBodyAction certifying_body_id */
  certifying_body_id?: string | null;

  /** AccreditCertifyingBodyAction standard_id */
  standard_id?: string | null;

  /** AccreditCertifyingBodyAction valid_from */
  valid_from?: number | Long | null;

  /** AccreditCertifyingBodyAction valid_to */
  valid_to?: number | Long | null;
}

/** Represents an AccreditCertifyingBodyAction. */
export class AccreditCertifyingBodyAction
  implements IAccreditCertifyingBodyAction {
  /**
   * Constructs a new AccreditCertifyingBodyAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: IAccreditCertifyingBodyAction);

  /** AccreditCertifyingBodyAction certifying_body_id. */
  public certifying_body_id: string;

  /** AccreditCertifyingBodyAction standard_id. */
  public standard_id: string;

  /** AccreditCertifyingBodyAction valid_from. */
  public valid_from: number | Long;

  /** AccreditCertifyingBodyAction valid_to. */
  public valid_to: number | Long;

  /**
   * Creates a new AccreditCertifyingBodyAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns AccreditCertifyingBodyAction instance
   */
  public static create(
    properties?: IAccreditCertifyingBodyAction,
  ): AccreditCertifyingBodyAction;

  /**
   * Encodes the specified AccreditCertifyingBodyAction message. Does not implicitly {@link AccreditCertifyingBodyAction.verify|verify} messages.
   * @param message AccreditCertifyingBodyAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IAccreditCertifyingBodyAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified AccreditCertifyingBodyAction message, length delimited. Does not implicitly {@link AccreditCertifyingBodyAction.verify|verify} messages.
   * @param message AccreditCertifyingBodyAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IAccreditCertifyingBodyAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an AccreditCertifyingBodyAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns AccreditCertifyingBodyAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): AccreditCertifyingBodyAction;

  /**
   * Decodes an AccreditCertifyingBodyAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns AccreditCertifyingBodyAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): AccreditCertifyingBodyAction;

  /**
   * Verifies an AccreditCertifyingBodyAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an AccreditCertifyingBodyAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns AccreditCertifyingBodyAction
   */
  public static fromObject(object: {
    [k: string]: any;
  }): AccreditCertifyingBodyAction;

  /**
   * Creates a plain object from an AccreditCertifyingBodyAction message. Also converts values to other types if specified.
   * @param message AccreditCertifyingBodyAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: AccreditCertifyingBodyAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this AccreditCertifyingBodyAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an AssertAction. */
export interface IAssertAction {
  /** AssertAction assertion_id */
  assertion_id?: string | null;

  /** AssertAction new_factory */
  new_factory?: AssertAction.IFactoryAssertion | null;

  /** AssertAction new_certificate */
  new_certificate?: IIssueCertificateAction | null;

  /** AssertAction new_standard */
  new_standard?: ICreateStandardAction | null;
}

/** Represents an AssertAction. */
export class AssertAction implements IAssertAction {
  /**
   * Constructs a new AssertAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: IAssertAction);

  /** AssertAction assertion_id. */
  public assertion_id: string;

  /** AssertAction new_factory. */
  public new_factory?: AssertAction.IFactoryAssertion | null;

  /** AssertAction new_certificate. */
  public new_certificate?: IIssueCertificateAction | null;

  /** AssertAction new_standard. */
  public new_standard?: ICreateStandardAction | null;

  /** AssertAction assertion. */
  public assertion?: 'new_factory' | 'new_certificate' | 'new_standard';

  /**
   * Creates a new AssertAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns AssertAction instance
   */
  public static create(properties?: IAssertAction): AssertAction;

  /**
   * Encodes the specified AssertAction message. Does not implicitly {@link AssertAction.verify|verify} messages.
   * @param message AssertAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IAssertAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified AssertAction message, length delimited. Does not implicitly {@link AssertAction.verify|verify} messages.
   * @param message AssertAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IAssertAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an AssertAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns AssertAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): AssertAction;

  /**
   * Decodes an AssertAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns AssertAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): AssertAction;

  /**
   * Verifies an AssertAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an AssertAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns AssertAction
   */
  public static fromObject(object: { [k: string]: any }): AssertAction;

  /**
   * Creates a plain object from an AssertAction message. Also converts values to other types if specified.
   * @param message AssertAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: AssertAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this AssertAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

export namespace AssertAction {
  /** Properties of a FactoryAssertion. */
  interface IFactoryAssertion {
    /** FactoryAssertion factory */
    factory?: ICreateOrganizationAction | null;

    /** FactoryAssertion existing_factory_id */
    existing_factory_id?: string | null;
  }

  /** Represents a FactoryAssertion. */
  class FactoryAssertion implements IFactoryAssertion {
    /**
     * Constructs a new FactoryAssertion.
     * @param [properties] Properties to set
     */
    constructor(properties?: AssertAction.IFactoryAssertion);

    /** FactoryAssertion factory. */
    public factory?: ICreateOrganizationAction | null;

    /** FactoryAssertion existing_factory_id. */
    public existing_factory_id: string;

    /**
     * Creates a new FactoryAssertion instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FactoryAssertion instance
     */
    public static create(
      properties?: AssertAction.IFactoryAssertion,
    ): AssertAction.FactoryAssertion;

    /**
     * Encodes the specified FactoryAssertion message. Does not implicitly {@link AssertAction.FactoryAssertion.verify|verify} messages.
     * @param message FactoryAssertion message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: AssertAction.IFactoryAssertion,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified FactoryAssertion message, length delimited. Does not implicitly {@link AssertAction.FactoryAssertion.verify|verify} messages.
     * @param message FactoryAssertion message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: AssertAction.IFactoryAssertion,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a FactoryAssertion message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FactoryAssertion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): AssertAction.FactoryAssertion;

    /**
     * Decodes a FactoryAssertion message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FactoryAssertion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): AssertAction.FactoryAssertion;

    /**
     * Verifies a FactoryAssertion message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a FactoryAssertion message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FactoryAssertion
     */
    public static fromObject(object: {
      [k: string]: any;
    }): AssertAction.FactoryAssertion;

    /**
     * Creates a plain object from a FactoryAssertion message. Also converts values to other types if specified.
     * @param message FactoryAssertion
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: AssertAction.FactoryAssertion,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this FactoryAssertion to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}

/** Properties of a TransferAssertionAction. */
export interface ITransferAssertionAction {
  /** TransferAssertionAction assertion_id */
  assertion_id?: string | null;

  /** TransferAssertionAction new_owner_public_key */
  new_owner_public_key?: string | null;
}

/** Represents a TransferAssertionAction. */
export class TransferAssertionAction implements ITransferAssertionAction {
  /**
   * Constructs a new TransferAssertionAction.
   * @param [properties] Properties to set
   */
  constructor(properties?: ITransferAssertionAction);

  /** TransferAssertionAction assertion_id. */
  public assertion_id: string;

  /** TransferAssertionAction new_owner_public_key. */
  public new_owner_public_key: string;

  /**
   * Creates a new TransferAssertionAction instance using the specified properties.
   * @param [properties] Properties to set
   * @returns TransferAssertionAction instance
   */
  public static create(
    properties?: ITransferAssertionAction,
  ): TransferAssertionAction;

  /**
   * Encodes the specified TransferAssertionAction message. Does not implicitly {@link TransferAssertionAction.verify|verify} messages.
   * @param message TransferAssertionAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ITransferAssertionAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified TransferAssertionAction message, length delimited. Does not implicitly {@link TransferAssertionAction.verify|verify} messages.
   * @param message TransferAssertionAction message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ITransferAssertionAction,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a TransferAssertionAction message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns TransferAssertionAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): TransferAssertionAction;

  /**
   * Decodes a TransferAssertionAction message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns TransferAssertionAction
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): TransferAssertionAction;

  /**
   * Verifies a TransferAssertionAction message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a TransferAssertionAction message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns TransferAssertionAction
   */
  public static fromObject(object: {
    [k: string]: any;
  }): TransferAssertionAction;

  /**
   * Creates a plain object from a TransferAssertionAction message. Also converts values to other types if specified.
   * @param message TransferAssertionAction
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: TransferAssertionAction,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this TransferAssertionAction to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an Organization. */
export interface IOrganization {
  /** Organization id */
  id?: string | null;

  /** Organization name */
  name?: string | null;

  /** Organization authorizations */
  authorizations?: Organization.IAuthorization[] | null;

  /** Organization contacts */
  contacts?: Organization.IContact[] | null;

  /** Organization organization_type */
  organization_type?: Organization.Type | null;

  /** Organization certifying_body_details */
  certifying_body_details?: ICertifyingBody | null;

  /** Organization standards_body_details */
  standards_body_details?: IStandardsBody | null;

  /** Organization factory_details */
  factory_details?: IFactory | null;
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

  /** Organization organization_type. */
  public organization_type: Organization.Type;

  /** Organization certifying_body_details. */
  public certifying_body_details?: ICertifyingBody | null;

  /** Organization standards_body_details. */
  public standards_body_details?: IStandardsBody | null;

  /** Organization factory_details. */
  public factory_details?: IFactory | null;

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
  public static encode(
    message: IOrganization,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified Organization message, length delimited. Does not implicitly {@link Organization.verify|verify} messages.
   * @param message Organization message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IOrganization,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an Organization message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Organization
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): Organization;

  /**
   * Decodes an Organization message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Organization
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): Organization;

  /**
   * Verifies an Organization message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: Organization,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

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
    FACTORY = 3,
    INGESTION = 4,
  }

  /** Properties of an Authorization. */
  interface IAuthorization {
    /** Authorization public_key */
    public_key?: string | null;

    /** Authorization role */
    role?: Organization.Authorization.Role | null;
  }

  /** Represents an Authorization. */
  class Authorization implements IAuthorization {
    /**
     * Constructs a new Authorization.
     * @param [properties] Properties to set
     */
    constructor(properties?: Organization.IAuthorization);

    /** Authorization public_key. */
    public public_key: string;

    /** Authorization role. */
    public role: Organization.Authorization.Role;

    /**
     * Creates a new Authorization instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Authorization instance
     */
    public static create(
      properties?: Organization.IAuthorization,
    ): Organization.Authorization;

    /**
     * Encodes the specified Authorization message. Does not implicitly {@link Organization.Authorization.verify|verify} messages.
     * @param message Authorization message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: Organization.IAuthorization,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Authorization message, length delimited. Does not implicitly {@link Organization.Authorization.verify|verify} messages.
     * @param message Authorization message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: Organization.IAuthorization,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an Authorization message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Authorization
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): Organization.Authorization;

    /**
     * Decodes an Authorization message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Authorization
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): Organization.Authorization;

    /**
     * Verifies an Authorization message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Authorization message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Authorization
     */
    public static fromObject(object: {
      [k: string]: any;
    }): Organization.Authorization;

    /**
     * Creates a plain object from an Authorization message. Also converts values to other types if specified.
     * @param message Authorization
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: Organization.Authorization,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

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
      TRANSACTOR = 2,
    }
  }

  /** Properties of a Contact. */
  interface IContact {
    /** Contact name */
    name?: string | null;

    /** Contact phone_number */
    phone_number?: string | null;

    /** Contact language_code */
    language_code?: string | null;
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

    /** Contact phone_number. */
    public phone_number: string;

    /** Contact language_code. */
    public language_code: string;

    /**
     * Creates a new Contact instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Contact instance
     */
    public static create(
      properties?: Organization.IContact,
    ): Organization.Contact;

    /**
     * Encodes the specified Contact message. Does not implicitly {@link Organization.Contact.verify|verify} messages.
     * @param message Contact message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: Organization.IContact,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Contact message, length delimited. Does not implicitly {@link Organization.Contact.verify|verify} messages.
     * @param message Contact message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: Organization.IContact,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a Contact message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Contact
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): Organization.Contact;

    /**
     * Decodes a Contact message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Contact
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): Organization.Contact;

    /**
     * Verifies a Contact message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Contact message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Contact
     */
    public static fromObject(object: {
      [k: string]: any;
    }): Organization.Contact;

    /**
     * Creates a plain object from a Contact message. Also converts values to other types if specified.
     * @param message Contact
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: Organization.Contact,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

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
  accreditations?: CertifyingBody.IAccreditation[] | null;
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
  public static encode(
    message: ICertifyingBody,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified CertifyingBody message, length delimited. Does not implicitly {@link CertifyingBody.verify|verify} messages.
   * @param message CertifyingBody message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICertifyingBody,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a CertifyingBody message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CertifyingBody
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): CertifyingBody;

  /**
   * Decodes a CertifyingBody message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CertifyingBody
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): CertifyingBody;

  /**
   * Verifies a CertifyingBody message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: CertifyingBody,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this CertifyingBody to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

export namespace CertifyingBody {
  /** Properties of an Accreditation. */
  interface IAccreditation {
    /** Accreditation standard_id */
    standard_id?: string | null;

    /** Accreditation standard_version */
    standard_version?: string | null;

    /** Accreditation accreditor_id */
    accreditor_id?: string | null;

    /** Accreditation valid_from */
    valid_from?: number | Long | null;

    /** Accreditation valid_to */
    valid_to?: number | Long | null;
  }

  /** Represents an Accreditation. */
  class Accreditation implements IAccreditation {
    /**
     * Constructs a new Accreditation.
     * @param [properties] Properties to set
     */
    constructor(properties?: CertifyingBody.IAccreditation);

    /** Accreditation standard_id. */
    public standard_id: string;

    /** Accreditation standard_version. */
    public standard_version: string;

    /** Accreditation accreditor_id. */
    public accreditor_id: string;

    /** Accreditation valid_from. */
    public valid_from: number | Long;

    /** Accreditation valid_to. */
    public valid_to: number | Long;

    /**
     * Creates a new Accreditation instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Accreditation instance
     */
    public static create(
      properties?: CertifyingBody.IAccreditation,
    ): CertifyingBody.Accreditation;

    /**
     * Encodes the specified Accreditation message. Does not implicitly {@link CertifyingBody.Accreditation.verify|verify} messages.
     * @param message Accreditation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: CertifyingBody.IAccreditation,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Accreditation message, length delimited. Does not implicitly {@link CertifyingBody.Accreditation.verify|verify} messages.
     * @param message Accreditation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: CertifyingBody.IAccreditation,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an Accreditation message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Accreditation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): CertifyingBody.Accreditation;

    /**
     * Decodes an Accreditation message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Accreditation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): CertifyingBody.Accreditation;

    /**
     * Verifies an Accreditation message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Accreditation message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Accreditation
     */
    public static fromObject(object: {
      [k: string]: any;
    }): CertifyingBody.Accreditation;

    /**
     * Creates a plain object from an Accreditation message. Also converts values to other types if specified.
     * @param message Accreditation
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: CertifyingBody.Accreditation,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Accreditation to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}

/** Properties of a StandardsBody. */
export interface IStandardsBody {}

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
  public static encode(
    message: IStandardsBody,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified StandardsBody message, length delimited. Does not implicitly {@link StandardsBody.verify|verify} messages.
   * @param message StandardsBody message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IStandardsBody,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a StandardsBody message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns StandardsBody
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): StandardsBody;

  /**
   * Decodes a StandardsBody message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns StandardsBody
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): StandardsBody;

  /**
   * Verifies a StandardsBody message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: StandardsBody,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this StandardsBody to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a Factory. */
export interface IFactory {
  /** Factory address */
  address?: Factory.IAddress | null;
}

/** Represents a Factory. */
export class Factory implements IFactory {
  /**
   * Constructs a new Factory.
   * @param [properties] Properties to set
   */
  constructor(properties?: IFactory);

  /** Factory address. */
  public address?: Factory.IAddress | null;

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
  public static encode(
    message: IFactory,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified Factory message, length delimited. Does not implicitly {@link Factory.verify|verify} messages.
   * @param message Factory message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IFactory,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a Factory message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Factory
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): Factory;

  /**
   * Decodes a Factory message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Factory
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Factory;

  /**
   * Verifies a Factory message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: Factory,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this Factory to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

export namespace Factory {
  /** Properties of an Address. */
  interface IAddress {
    /** Address street_line_1 */
    street_line_1?: string | null;

    /** Address street_line_2 */
    street_line_2?: string | null;

    /** Address city */
    city?: string | null;

    /** Address state_province */
    state_province?: string | null;

    /** Address country */
    country?: string | null;

    /** Address postal_code */
    postal_code?: string | null;
  }

  /** Represents an Address. */
  class Address implements IAddress {
    /**
     * Constructs a new Address.
     * @param [properties] Properties to set
     */
    constructor(properties?: Factory.IAddress);

    /** Address street_line_1. */
    public street_line_1: string;

    /** Address street_line_2. */
    public street_line_2: string;

    /** Address city. */
    public city: string;

    /** Address state_province. */
    public state_province: string;

    /** Address country. */
    public country: string;

    /** Address postal_code. */
    public postal_code: string;

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
    public static encode(
      message: Factory.IAddress,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Address message, length delimited. Does not implicitly {@link Factory.Address.verify|verify} messages.
     * @param message Address message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: Factory.IAddress,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an Address message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Address
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): Factory.Address;

    /**
     * Decodes an Address message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Address
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): Factory.Address;

    /**
     * Verifies an Address message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

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
    public static toObject(
      message: Factory.Address,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Address to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}

/** Properties of an Ingestion. */
export interface IIngestion {}

/** Represents an Ingestion. */
export class Ingestion implements IIngestion {
  /**
   * Constructs a new Ingestion.
   * @param [properties] Properties to set
   */
  constructor(properties?: IIngestion);

  /**
   * Creates a new Ingestion instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Ingestion instance
   */
  public static create(properties?: IIngestion): Ingestion;

  /**
   * Encodes the specified Ingestion message. Does not implicitly {@link Ingestion.verify|verify} messages.
   * @param message Ingestion message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IIngestion,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified Ingestion message, length delimited. Does not implicitly {@link Ingestion.verify|verify} messages.
   * @param message Ingestion message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IIngestion,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an Ingestion message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Ingestion
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): Ingestion;

  /**
   * Decodes an Ingestion message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Ingestion
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): Ingestion;

  /**
   * Verifies an Ingestion message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an Ingestion message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Ingestion
   */
  public static fromObject(object: { [k: string]: any }): Ingestion;

  /**
   * Creates a plain object from an Ingestion message. Also converts values to other types if specified.
   * @param message Ingestion
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Ingestion,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this Ingestion to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an OrganizationContainer. */
export interface IOrganizationContainer {
  /** OrganizationContainer entries */
  entries?: IOrganization[] | null;
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
  public static create(
    properties?: IOrganizationContainer,
  ): OrganizationContainer;

  /**
   * Encodes the specified OrganizationContainer message. Does not implicitly {@link OrganizationContainer.verify|verify} messages.
   * @param message OrganizationContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IOrganizationContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified OrganizationContainer message, length delimited. Does not implicitly {@link OrganizationContainer.verify|verify} messages.
   * @param message OrganizationContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IOrganizationContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an OrganizationContainer message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns OrganizationContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): OrganizationContainer;

  /**
   * Decodes an OrganizationContainer message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns OrganizationContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): OrganizationContainer;

  /**
   * Verifies an OrganizationContainer message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: OrganizationContainer,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this OrganizationContainer to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a Certificate. */
export interface ICertificate {
  /** Certificate id */
  id?: string | null;

  /** Certificate certifying_body_id */
  certifying_body_id?: string | null;

  /** Certificate factory_id */
  factory_id?: string | null;

  /** Certificate standard_id */
  standard_id?: string | null;

  /** Certificate standard_version */
  standard_version?: string | null;

  /** Certificate certificate_data */
  certificate_data?: Certificate.ICertificateData[] | null;

  /** Certificate valid_from */
  valid_from?: number | Long | null;

  /** Certificate valid_to */
  valid_to?: number | Long | null;
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

  /** Certificate certifying_body_id. */
  public certifying_body_id: string;

  /** Certificate factory_id. */
  public factory_id: string;

  /** Certificate standard_id. */
  public standard_id: string;

  /** Certificate standard_version. */
  public standard_version: string;

  /** Certificate certificate_data. */
  public certificate_data: Certificate.ICertificateData[];

  /** Certificate valid_from. */
  public valid_from: number | Long;

  /** Certificate valid_to. */
  public valid_to: number | Long;

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
  public static encode(
    message: ICertificate,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified Certificate message, length delimited. Does not implicitly {@link Certificate.verify|verify} messages.
   * @param message Certificate message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICertificate,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a Certificate message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Certificate
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): Certificate;

  /**
   * Decodes a Certificate message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Certificate
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): Certificate;

  /**
   * Verifies a Certificate message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: Certificate,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

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
    field?: string | null;

    /** CertificateData data */
    data?: string | null;
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
    public static create(
      properties?: Certificate.ICertificateData,
    ): Certificate.CertificateData;

    /**
     * Encodes the specified CertificateData message. Does not implicitly {@link Certificate.CertificateData.verify|verify} messages.
     * @param message CertificateData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: Certificate.ICertificateData,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified CertificateData message, length delimited. Does not implicitly {@link Certificate.CertificateData.verify|verify} messages.
     * @param message CertificateData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: Certificate.ICertificateData,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a CertificateData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CertificateData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): Certificate.CertificateData;

    /**
     * Decodes a CertificateData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CertificateData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): Certificate.CertificateData;

    /**
     * Verifies a CertificateData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a CertificateData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CertificateData
     */
    public static fromObject(object: {
      [k: string]: any;
    }): Certificate.CertificateData;

    /**
     * Creates a plain object from a CertificateData message. Also converts values to other types if specified.
     * @param message CertificateData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: Certificate.CertificateData,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

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
  entries?: ICertificate[] | null;
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
  public static create(
    properties?: ICertificateContainer,
  ): CertificateContainer;

  /**
   * Encodes the specified CertificateContainer message. Does not implicitly {@link CertificateContainer.verify|verify} messages.
   * @param message CertificateContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ICertificateContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified CertificateContainer message, length delimited. Does not implicitly {@link CertificateContainer.verify|verify} messages.
   * @param message CertificateContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICertificateContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a CertificateContainer message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CertificateContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): CertificateContainer;

  /**
   * Decodes a CertificateContainer message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CertificateContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): CertificateContainer;

  /**
   * Verifies a CertificateContainer message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: CertificateContainer,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this CertificateContainer to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a Request. */
export interface IRequest {
  /** Request id */
  id?: string | null;

  /** Request status */
  status?: Request.Status | null;

  /** Request standard_id */
  standard_id?: string | null;

  /** Request factory_id */
  factory_id?: string | null;

  /** Request request_date */
  request_date?: number | Long | null;
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

  /** Request standard_id. */
  public standard_id: string;

  /** Request factory_id. */
  public factory_id: string;

  /** Request request_date. */
  public request_date: number | Long;

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
  public static encode(
    message: IRequest,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified Request message, length delimited. Does not implicitly {@link Request.verify|verify} messages.
   * @param message Request message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IRequest,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a Request message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Request
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): Request;

  /**
   * Decodes a Request message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Request
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Request;

  /**
   * Verifies a Request message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: Request,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

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
    CERTIFIED = 4,
  }
}

/** Properties of a RequestContainer. */
export interface IRequestContainer {
  /** RequestContainer entries */
  entries?: IRequest[] | null;
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
  public static encode(
    message: IRequestContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified RequestContainer message, length delimited. Does not implicitly {@link RequestContainer.verify|verify} messages.
   * @param message RequestContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IRequestContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes a RequestContainer message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns RequestContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): RequestContainer;

  /**
   * Decodes a RequestContainer message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns RequestContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): RequestContainer;

  /**
   * Verifies a RequestContainer message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

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
  public static toObject(
    message: RequestContainer,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this RequestContainer to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of an Assertion. */
export interface IAssertion {
  /** Assertion id */
  id?: string | null;

  /** Assertion address */
  address?: string | null;

  /** Assertion assertor_pub_key */
  assertor_pub_key?: string | null;

  /** Assertion assertion_type */
  assertion_type?: Assertion.Type | null;

  /** Assertion object_id */
  object_id?: string | null;

  /** Assertion data_id */
  data_id?: string | null;
}

/** Represents an Assertion. */
export class Assertion implements IAssertion {
  /**
   * Constructs a new Assertion.
   * @param [properties] Properties to set
   */
  constructor(properties?: IAssertion);

  /** Assertion id. */
  public id: string;

  /** Assertion address. */
  public address: string;

  /** Assertion assertor_pub_key. */
  public assertor_pub_key: string;

  /** Assertion assertion_type. */
  public assertion_type: Assertion.Type;

  /** Assertion object_id. */
  public object_id: string;

  /** Assertion data_id. */
  public data_id: string;

  /**
   * Creates a new Assertion instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Assertion instance
   */
  public static create(properties?: IAssertion): Assertion;

  /**
   * Encodes the specified Assertion message. Does not implicitly {@link Assertion.verify|verify} messages.
   * @param message Assertion message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IAssertion,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified Assertion message, length delimited. Does not implicitly {@link Assertion.verify|verify} messages.
   * @param message Assertion message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IAssertion,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an Assertion message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Assertion
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): Assertion;

  /**
   * Decodes an Assertion message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Assertion
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): Assertion;

  /**
   * Verifies an Assertion message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an Assertion message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Assertion
   */
  public static fromObject(object: { [k: string]: any }): Assertion;

  /**
   * Creates a plain object from an Assertion message. Also converts values to other types if specified.
   * @param message Assertion
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Assertion,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this Assertion to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

export namespace Assertion {
  /** Type enum. */
  enum Type {
    UNSET_TYPE = 0,
    FACTORY = 1,
    CERTIFICATE = 2,
    STANDARD = 3,
  }
}

/** Properties of an AssertionContainer. */
export interface IAssertionContainer {
  /** AssertionContainer entries */
  entries?: IAssertion[] | null;
}

/** Represents an AssertionContainer. */
export class AssertionContainer implements IAssertionContainer {
  /**
   * Constructs a new AssertionContainer.
   * @param [properties] Properties to set
   */
  constructor(properties?: IAssertionContainer);

  /** AssertionContainer entries. */
  public entries: IAssertion[];

  /**
   * Creates a new AssertionContainer instance using the specified properties.
   * @param [properties] Properties to set
   * @returns AssertionContainer instance
   */
  public static create(properties?: IAssertionContainer): AssertionContainer;

  /**
   * Encodes the specified AssertionContainer message. Does not implicitly {@link AssertionContainer.verify|verify} messages.
   * @param message AssertionContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IAssertionContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Encodes the specified AssertionContainer message, length delimited. Does not implicitly {@link AssertionContainer.verify|verify} messages.
   * @param message AssertionContainer message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IAssertionContainer,
    writer?: $protobuf.Writer,
  ): $protobuf.Writer;

  /**
   * Decodes an AssertionContainer message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns AssertionContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number,
  ): AssertionContainer;

  /**
   * Decodes an AssertionContainer message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns AssertionContainer
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array,
  ): AssertionContainer;

  /**
   * Verifies an AssertionContainer message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates an AssertionContainer message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns AssertionContainer
   */
  public static fromObject(object: { [k: string]: any }): AssertionContainer;

  /**
   * Creates a plain object from an AssertionContainer message. Also converts values to other types if specified.
   * @param message AssertionContainer
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: AssertionContainer,
    options?: $protobuf.IConversionOptions,
  ): { [k: string]: any };

  /**
   * Converts this AssertionContainer to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}
