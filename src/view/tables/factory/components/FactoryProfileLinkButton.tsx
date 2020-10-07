import React from 'react';
import { Link } from 'react-router-dom';
import { OrgResData } from 'services/api';
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons';
import {
  Tooltip,
  IconButton,
  createStyles,
  makeStyles,
} from '@material-ui/core';

export interface FactoryProfileLinkButtonProps {
  factoryId: OrgResData['id'];
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    icon: {
      '&:hover': {
        color: palette.primary.main,
      },
    },
  }),
);

export const FactoryProfileLinkButton = ({
  factoryId,
}: FactoryProfileLinkButtonProps) => {
  const classes = useStyles();

  return (
    <Link to={{ pathname: `factories/${factoryId}` }}>
      <Tooltip title="View Factory Profile">
        <IconButton className={classes.icon}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};
