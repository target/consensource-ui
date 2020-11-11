import { ACTIONS, encodePayload } from '../utils';
import {
  CertificateRegistryPayload,
  ICertificateRegistryPayload,
} from '../compiled';

describe('encodePayload()', () => {
  it('encodes and returns a CertificateRegistryPayload', () => {
    const payload: ICertificateRegistryPayload = {
      action: ACTIONS.UNSET_ACTION,
    };

    const encoded = encodePayload(payload);
    const decoded = CertificateRegistryPayload.decode(encoded);

    expect(decoded).toEqual(payload);
  });
});
