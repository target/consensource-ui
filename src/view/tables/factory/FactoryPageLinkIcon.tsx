import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from '@material-ui/core/Tooltip';
import { OrgResData } from 'services/api/organization';

export interface FactoryPageLinkIconProps {
  factoryId: OrgResData['id'];
}

export function FactoryPageLinkIcon({ factoryId }: FactoryPageLinkIconProps) {
  return (
    <Link to={`factories/${factoryId}`}>
      <Tooltip title="View factory profile">
        <IconButton aria-label="view factory profile">
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
}
