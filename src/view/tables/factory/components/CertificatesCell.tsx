import React from 'react';
import { CertResData } from 'services/api';
import { List, ListItem, Tooltip } from '@material-ui/core';
import { getLocaleFromUnix } from 'utils';
import { Link } from 'view/components';

export interface CertificatesCellProps {
  // TODO: Remove optional `certificates` once we fix backend issues
  certificates?: CertResData[];
}

export const CertificatesCell = ({ certificates }: CertificatesCellProps) => {
  if (!certificates || !certificates.length) {
    return (
      <ListItem>
        <i>None</i>
      </ListItem>
    );
  }

  return (
    <List>
      {certificates.map(({ standard_name, id, valid_to }) => (
        <Link to={`certifications/${id}`} color="secondary" key={id}>
          <ListItem>
            <Tooltip
              placement="top"
              data-testid="cert-cell-tooltip"
              title={`Valid until ${getLocaleFromUnix(valid_to)}`}
            >
              <i>{standard_name}</i>
            </Tooltip>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
