import {
  ConsenSourceNamespaces,
  createStateAddress,
  getAgentStateAddress,
} from 'services/addressing';
import {
  CreateOrganizationAction,
  ICreateOrganizationAction,
  ICertificateRegistryPayload,
  Factory,
  Organization,
  IUpdateOrganizationAction,
  UpdateOrganizationAction,
} from 'services/protobuf/compiled';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transaction';

export type OrgTypeStrings = keyof typeof Organization.Type;

export interface IContactStrict extends Organization.IContact {
  name: NonNullable<Organization.IContact['name']>;
  phone_number: NonNullable<Organization.IContact['phone_number']>;
  language_code: NonNullable<Organization.IContact['language_code']>;
}

export interface IFactoryAddressStrict extends Factory.IAddress {
  street_line_1: NonNullable<Factory.IAddress['street_line_1']>;
  city: NonNullable<Factory.IAddress['city']>;
  country: NonNullable<Factory.IAddress['country']>;
}

/**
 * Interface to define the minimum required properties for
 * an `ICreateOrganizationAction` since protobuf defaults to
 * all fields as optional.
 *
 * Note that an address is not required - we only enforce this on factories.
 */
export interface ICreateOrgActionStrict extends ICreateOrganizationAction {
  id: NonNullable<ICreateOrganizationAction['id']>;
  organization_type: NonNullable<
    ICreateOrganizationAction['organization_type']
  >;
  contacts: NonNullable<ICreateOrganizationAction['contacts']>;
  name: NonNullable<ICreateOrganizationAction['name']>;
}

/**
 * Enforce that a `CreateOrganizationAction` has the minimum
 * required fields defined in `ICreateOrgActionStrict`
 */
export type CreateOrgActionStrict = ICreateOrgActionStrict &
  CreateOrganizationAction;

/**
 * Create a `CreateOrganizationAction` that can be included
 * in a `CertificateRegistryPayload` transaction.
 */
export function createOrgAction(org: ICreateOrgActionStrict) {
  return CreateOrganizationAction.create(org);
}

/**
 * Interface to define the minimum required properties for
 * an `IUpdateOrganizationAction` since protobuf defaults to
 * all fields as optional.
 *
 * Note that an address is not required - we only enforce this on factories.
 */
export interface IUpdateOrgActionStrict extends IUpdateOrganizationAction {
  contacts: NonNullable<ICreateOrganizationAction['contacts']>;
}

/**
 * Enforce that an `UpdateOrganizationAction` has the minimum
 * required fields defined in `IUpdateOrgActionStrict`
 */
export type UpdateOrgActionStrict = IUpdateOrgActionStrict &
  UpdateOrganizationAction;

/**
 * Create an `UpdateOrganizationAction` that can be included
 * in a `CertificateRegistryPayload` transaction.
 */
export function updateOrgAction(org: IUpdateOrgActionStrict) {
  return UpdateOrganizationAction.create(org);
}

/**
 * Create a `Organization.Contact` that can be included
 * in a `CreateOrganizationAction` instance.
 */
export function createOrgContact(contact: Organization.IContact) {
  return Organization.Contact.create(contact);
}

/**
 * Create a `Factory.Address` that can be included
 * in a `CreateOrganizationAction` instance.
 */
export function createFactoryAddress(address: Factory.IAddress) {
  return Factory.Address.create(address);
}

/**
 * Creates a `CertificateRegistryPayload` transaction
 * containing a single `CreateOrganizationAction` payload.
 */
export function createOrgTransaction(
  create_organization: CreateOrgActionStrict,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.CREATE_ORGANIZATION,
    create_organization,
  };
  const payloadBytes = encodePayload(payload);

  const orgStateAddress = createStateAddress(
    ConsenSourceNamespaces.ORGANIZATION,
    create_organization.id,
  );

  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [orgStateAddress, agentStateAddress],
    outputs: [orgStateAddress, agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}

/**
 * Creates a `CertificateRegistryPayload` transaction
 * containing a single `UpdateOrganizationAction` payload.
 */
export function updateOrgTransaction(
  update_organization: UpdateOrgActionStrict,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.UPDATE_ORGANIZATION,
    update_organization,
  };
  const payloadBytes = encodePayload(payload);

  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [agentStateAddress],
    outputs: [agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
