import React from 'react';
import { CertResData } from 'services/api';
import {
  List,
  ListItem,
  Tooltip,
  makeStyles,
  createStyles,
} from '@material-ui/core';

export interface CertificatesCellProps {
  // TODO: Remove optional `certificates` once we fix backend issues
  certificates?: CertResData[];
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    certName: {
      borderBottom: `2px solid ${palette.primary.main}`,
      cursor: 'pointer',
    },
  }),
);

export const CertificatesCell = ({ certificates }: CertificatesCellProps) => {
  const classes = useStyles();

  if (!certificates || certificates.length === 0) {
    return (
      <ListItem>
        <i>None</i>
      </ListItem>
    );
  }

  return (
    <List>
      {certificates.map((cert) => (
        <ListItem key={cert.id}>
          <Tooltip
            placement="top"
            title={`Valid until ${new Date(
              cert.valid_to,
            ).toLocaleDateString()}`}
          >
            <i className={classes.certName}>{cert.standard_name}</i>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};
