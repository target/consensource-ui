import { v4 as uuidv4 } from 'uuid';
import {
  createStateAddress,
  ConsenSourceNamespaces,
} from 'services/addressing';
import { OrgResData } from 'services/api';
import {
  CreateOrganizationAction,
  ICreateOrganizationAction,
  Factory,
  Organization,
  IUpdateOrganizationAction,
  UpdateOrganizationAction,
} from './compiled';
import { createTransaction } from './transaction';
import { PayloadInfo, encodePayload, ACTIONS } from './utils';
import { createAgentStateAddress } from './agent';

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
 * Helper function to get the organization address from the organization id.
 */
export function createOrgStateAddress(
  orgId: NonNullable<ICreateOrgActionStrict['id']>,
) {
  return createStateAddress(ConsenSourceNamespaces.ORGANIZATION, orgId);
}

/**
 * Create a `CreateOrganizationAction` that can be included
 * in a `CertificateRegistryPayload` transaction.
 *
 * The id of the org is not required as we generate it in this
 * method.
 */
export function createOrgAction(org: ICreateOrgActionStrict) {
  return CreateOrganizationAction.create({ ...org, id: uuidv4() });
}

/**
 * Create an `UpdateOrganizationAction` that can be included
 * in a `CertificateRegistryPayload` transaction.
 */
export function updateOrgAction(org: IUpdateOrganizationAction) {
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
) {
  const addresses = [
    createOrgStateAddress(create_organization.id),
    createAgentStateAddress(signer),
  ];

  const payloadInfo: PayloadInfo = {
    inputs: addresses,
    outputs: addresses,
    payloadBytes: encodePayload({
      action: ACTIONS.CREATE_ORGANIZATION,
      create_organization,
    }),
  };

  return createTransaction(payloadInfo, signer);
}

/**
 * Creates a `CertificateRegistryPayload` transaction
 * containing a single `UpdateOrganizationAction` payload.
 *
 * @param update_organization action to submit
 * @param signer agent who is signing the txn
 * @param id id of the org, only required because we currently
 * don't allow updating the org id through `update_organization`
 */
export function updateOrgTransaction(
  update_organization: UpdateOrganizationAction,
  signer: sawtooth.signing.Signer,
  id: OrgResData['id'],
) {
  const addresses = [
    createOrgStateAddress(id),
    createAgentStateAddress(signer),
  ];

  const payloadInfo: PayloadInfo = {
    inputs: addresses,
    outputs: addresses,
    payloadBytes: encodePayload({
      action: ACTIONS.UPDATE_ORGANIZATION,
      update_organization,
    }),
  };

  return createTransaction(payloadInfo, signer);
}
