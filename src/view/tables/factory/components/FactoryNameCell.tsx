import React from 'react';
import { FactoryResData } from 'services/api';
import { Tooltip } from '@material-ui/core';
import { ThemedLink, useStyles } from '../../../components/Links/ThemedLink';

export interface FactoryNameCellProps {
  name: FactoryResData['name'];
  id: FactoryResData['id'];
}

export const FactoryNameCell = ({ name, id }: FactoryNameCellProps) => {
  const classes = useStyles();
  return (
    <ThemedLink to={`factories/${id}`}>
      <Tooltip placement="top" title="View factory profile">
        <i className={classes.name}>{name}</i>
      </Tooltip>
    </ThemedLink>
  );
};
