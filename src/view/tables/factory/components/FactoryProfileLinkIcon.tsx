import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SvgIconProps, IconButton, Tooltip } from '@material-ui/core';
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons';
import { OrgResData } from 'services/api';

export interface FactoryProfileLinkIconProps {
  factoryId: OrgResData['id'];
}

export function FactoryProfileLinkIcon({
  factoryId,
}: FactoryProfileLinkIconProps) {
  const { pathname } = useLocation();
  const [color, setColor] = useState<SvgIconProps['color']>('inherit');

  return (
    <Link
      to={{ pathname: `factories/${factoryId}`, state: { from: pathname } }}
    >
      <Tooltip title="View factory profile">
        <IconButton
          onMouseOver={() => setColor('primary')}
          onFocus={() => setColor('primary')}
          onMouseOut={() => setColor('inherit')}
          onBlur={() => setColor('inherit')}
          aria-label="View factory profile"
        >
          <OpenInNewIcon color={color} />
        </IconButton>
      </Tooltip>
    </Link>
  );
}
