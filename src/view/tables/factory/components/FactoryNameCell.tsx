import React from 'react';
import { FactoryResData } from 'services/api';
import { Tooltip } from '@material-ui/core';
import { Link } from 'view/components';

export interface FactoryNameCellProps {
  name: FactoryResData['name'];
  id: FactoryResData['id'];
}

export const FactoryNameCell = ({ name, id }: FactoryNameCellProps) => {
  return (
    <Link to={`factories/${id}`} color="secondary">
      <Tooltip placement="top" title="View factory profile">
        <i>{name}</i>
      </Tooltip>
    </Link>
  );
};
