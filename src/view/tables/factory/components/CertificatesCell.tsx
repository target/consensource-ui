import React from 'react';
import { CertResData } from 'services/api';
import {
  List,
  ListItem,
  Tooltip,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { UnstyledLink } from 'view/components';
import { getLocaleFromUnix } from 'utils';

export interface CertificatesCellProps {
  // TODO: Remove optional `certificates` once we fix backend issues
  certificates?: CertResData[];
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    certName: {
      borderBottom: `2px solid ${palette.primary.light}`,
      cursor: 'pointer',
      '&:hover': {
        borderBottom: `2px solid ${palette.primary.main}`,
      },
    },
  }),
);

export const CertificatesCell = ({ certificates }: CertificatesCellProps) => {
  const classes = useStyles();

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
        <UnstyledLink to={`certifications/${id}`} key={id}>
          <ListItem>
            <Tooltip
              placement="top"
              data-testid="cert-cell-tooltip"
              title={`Valid until ${getLocaleFromUnix(valid_to)}`}
            >
              <i className={classes.certName}>{standard_name}</i>
            </Tooltip>
          </ListItem>
        </UnstyledLink>
      ))}
    </List>
  );
};
