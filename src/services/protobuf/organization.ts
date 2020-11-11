import { createOrgAddress, createAgentStateAddress } from 'services/addressing';
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
    createOrgAddress(create_organization.id),
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
 * Name param is only required because we currently don't allow
 * updating the org name through update_organization
 */
export function updateOrgTransaction(
  update_organization: UpdateOrganizationAction,
  signer: sawtooth.signing.Signer,
  name: OrgResData['name'],
) {
  const addresses = [createOrgAddress(name), createAgentStateAddress(signer)];

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
