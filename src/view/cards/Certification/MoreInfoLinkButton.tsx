import React from 'react';
import { CertResData } from 'services/api';
import { Button, makeStyles, createStyles } from '@material-ui/core';
import { UnstyledLink } from 'view/components';

export interface MoreInfoLinkButtonProps {
  certificationId: CertResData['id'];
}

const useStyles = makeStyles(
  createStyles({
    align: {
      marginLeft: 'auto',
    },
  }),
);

export const MoreInfoLinkButton = ({
  certificationId,
}: MoreInfoLinkButtonProps) => {
  const classes = useStyles();

  return (
    <div className={classes.align}>
      <UnstyledLink to={`/certifications/${certificationId}`}>
        <Button color="secondary">More Info</Button>
      </UnstyledLink>
    </div>
  );
};
