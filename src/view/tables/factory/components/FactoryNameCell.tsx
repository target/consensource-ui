import React from 'react';
import { FactoryResData } from 'services/api';
import { Tooltip, makeStyles, createStyles } from '@material-ui/core';
import { UnstyledLink } from 'view/components';

export interface FactoryNameCellProps {
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
      <Tooltip placement="top" title="View factory profile">
        <i className={classes.name}>{name}</i>
      </Tooltip>
    </UnstyledLink>
  );
};
