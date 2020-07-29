import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from '@material-ui/core/Tooltip';
import { OrgResData } from 'services/api/organization';

export interface FactoryPageLinkIconProps {
  factoryId: OrgResData['id'];
}

export function FactoryPageLinkIcon({ factoryId }: FactoryPageLinkIconProps) {
  const [color, setColor] = useState<SvgIconProps['color']>('inherit');

  return (
    <Link to={`factories/${factoryId}`}>
      <Tooltip title="View factory profile">
        <IconButton
          onMouseOver={() => setColor('primary')}
          onMouseOut={() => setColor('inherit')}
          aria-label="view factory profile"
        >
          <OpenInNewIcon color={color} />
        </IconButton>
      </Tooltip>
    </Link>
  );
}
