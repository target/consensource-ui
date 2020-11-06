import React from 'react';
import { FactoryResData } from 'services/api';
import { Tooltip, makeStyles, createStyles } from '@material-ui/core';
import { UnstyledLink } from 'view/components';

export interface FactoryNameCellProps {
  // TODO: Remove optional `certificates` once we fix backend issues
  name: FactoryResData['name'];
  id: FactoryResData['id'];
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    name: {
      borderBottom: `2px solid ${palette.primary.light}`,
      cursor: 'pointer',
      '&:hover': {
        borderBottom: `2px solid ${palette.primary.main}`,
      },
    },
  }),
);

export const FactoryNameCell = ({ name, id }: FactoryNameCellProps) => {
  const classes = useStyles();

  return (
    <UnstyledLink to={`factories/${id}`}>
      <Tooltip
        placement="top"
        data-testid="cert-cell-tooltip"
        title="View Factory Profile"
      >
        <i className={classes.name}>{name}</i>
      </Tooltip>
    </UnstyledLink>
  );
};
