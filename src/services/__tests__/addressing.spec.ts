import {
  createStateAddress,
  ConsenSourceNamespaces,
  ADDRESS_LEN,
  FAMILY_NAMESPACE,
  RESERVED_NAMESPACE,
  FAMILY_NAMESPACE_LEN,
} from 'services/addressing';

it('creates an address of 70 chars with the correct namespace prefixes', () => {
  const [reservedNamespaceStart, reservedNamespaceEnd] = [
    FAMILY_NAMESPACE_LEN,
    FAMILY_NAMESPACE_LEN + 2,
  ];

  const [txnNamespaceStart, txnNamespaceEnd] = [
    reservedNamespaceEnd,
    reservedNamespaceEnd + 2,
  ];

  const address = createStateAddress(
    ConsenSourceNamespaces.ORGANIZATION,
    'test',
  );

  expect(address.length).toEqual(ADDRESS_LEN);
  expect(address.substring(0, FAMILY_NAMESPACE_LEN)).toEqual(FAMILY_NAMESPACE);

  expect(
    address.substring(reservedNamespaceStart, reservedNamespaceEnd),
  ).toEqual(RESERVED_NAMESPACE);

  expect(address.substring(txnNamespaceStart, txnNamespaceEnd)).toEqual(
    ConsenSourceNamespaces.ORGANIZATION,
  );
});
