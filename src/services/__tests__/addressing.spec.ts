import * as addressing from 'services/addressing';

it('creates an address of 70 chars with the correct namespace prefixes', () => {
  const [reservedNamespaceStart, reservedNamespaceEnd] = [
    addressing.FAMILY_NAMESPACE_LEN,
    addressing.FAMILY_NAMESPACE_LEN + 2,
  ];

  const [txnNamespaceStart, txnNamespaceEnd] = [
    reservedNamespaceEnd,
    reservedNamespaceEnd + 2,
  ];

  const address = addressing.createStateAddress(
    addressing.ConsenSourceNamespaces.ORGANIZATION,
    'test',
  );

  expect(address.length).toEqual(addressing.ADDRESS_LEN);
  expect(address.substring(0, addressing.FAMILY_NAMESPACE_LEN)).toEqual(
    addressing.FAMILY_NAMESPACE,
  );

  expect(
    address.substring(reservedNamespaceStart, reservedNamespaceEnd),
  ).toEqual(addressing.RESERVED_NAMESPACE);

  expect(address.substring(txnNamespaceStart, txnNamespaceEnd)).toEqual(
    addressing.ConsenSourceNamespaces.ORGANIZATION,
  );
});

it('creates a namespace prefix that concatenates the family namespace, reserved namespace, and txn namespace', () => {
  const prefix =
    addressing.FAMILY_NAMESPACE +
    addressing.RESERVED_NAMESPACE +
    addressing.ConsenSourceNamespaces.AGENT;

  expect(
    addressing.getNamespaceWithPrefix(addressing.ConsenSourceNamespaces.AGENT),
  ).toEqual(prefix);

  expect(prefix.length).toEqual(addressing.ADDRESS_PREFIX_LEN);
});
