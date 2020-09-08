import React from 'react';
import { CertResData } from 'services/api';
import { List, ListItem } from '@material-ui/core';

export interface CertificatesCellProps {
  // TODO: Remove optional `certificates` once we fix backend issues
  certificates?: CertResData[];
}

export const CertificatesCell = ({ certificates }: CertificatesCellProps) => {
  if (!certificates || certificates.length === 0) {
    return <i>None</i>;
  }

  return (
    <List>
      {certificates.map(({ standard_name }) => (
        <ListItem>{standard_name}</ListItem>
      ))}
    </List>
  );
};
