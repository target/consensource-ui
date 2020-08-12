import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SvgIconProps, IconButton, Tooltip } from '@material-ui/core';
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons';
import { OrgResData } from 'services/api';

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
          onFocus={() => setColor('primary')}
          onMouseOut={() => setColor('inherit')}
          onBlur={() => setColor('inherit')}
          aria-label="view factory profile"
        >
          <OpenInNewIcon color={color} />
        </IconButton>
      </Tooltip>
    </Link>
  );
}
