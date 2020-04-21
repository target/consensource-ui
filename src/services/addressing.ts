import { createHash, Hash } from 'crypto';

/**
 * The address at which to store data in the Merkle State tree.
 * Addresses are composed of 35 bytes, represented as 70 hex characters.
 *
 * The family namespace prefix, which determines the location in the tree
 * at which data is stored for ConsenSource, is the first 6 characters
 * of the hash of the string "consensource", resulting in `ABC123`.
 *
 * Read more at:
 * https://sawtooth.hyperledger.org/docs/core/releases/1.0/app_developers_guide/address_and_namespace.html
 */

const FAMILY_NAME = 'consensource';
const FAMILY_VERSION = '0.1';
const AGENT = '00';
const CERTIFICATE = '01';
const ORGANIZATION = '02';
const STANDARD = '03';
const CERTIFICATE_REQUEST = '04';

const PREFIX_SIZE = 6;
const RESERVED_SPACE = '00';

const hash = (val: string, len: number): string => {
    const sha: Hash = createHash('sha256');
    return sha
        .update(val)
        .digest('hex')
        .substring(0, len);
};

const FAMILY_NAMESPACE = hash(FAMILY_NAME, PREFIX_SIZE);
const AGENT_ADDRESS_PREFIX = FAMILY_NAMESPACE + RESERVED_SPACE + AGENT;
const ORGANIZATION_ADDRESS_PREFIX =
    FAMILY_NAMESPACE + RESERVED_SPACE + ORGANIZATION;

const getFamilyNamespacePrefix = (): string => FAMILY_NAMESPACE;

const makeAgentAddress = (agentPublicKey: string): string =>
    AGENT_ADDRESS_PREFIX + hash(agentPublicKey, 60);

const makeOrganizationAddress = (organizationId: string): string =>
    FAMILY_NAMESPACE + RESERVED_SPACE + ORGANIZATION + hash(organizationId, 60);

const makeCertificateAddress = (certificateId: string): string =>
    FAMILY_NAMESPACE + RESERVED_SPACE + CERTIFICATE + hash(certificateId, 60);

const makeCertificateRequestAddress = (certificateRequestId: string): string =>
    FAMILY_NAMESPACE +
    RESERVED_SPACE +
    CERTIFICATE_REQUEST +
    hash(certificateRequestId, 60);

const makeStandardAddress = (standardId: string): string =>
    FAMILY_NAMESPACE + RESERVED_SPACE + STANDARD + hash(standardId, 60);

export {
    getFamilyNamespacePrefix,
    makeAgentAddress,
    makeOrganizationAddress,
    makeCertificateAddress,
    makeCertificateRequestAddress,
    makeStandardAddress,
    FAMILY_NAME as familyName,
    FAMILY_VERSION as familyVersion,
    AGENT_ADDRESS_PREFIX as agentAddressPrefix,
    ORGANIZATION_ADDRESS_PREFIX as organizationAddressPrefix,
};
