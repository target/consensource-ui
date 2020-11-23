import React from 'react';
import { CertResData } from 'services/api';
import { Button, makeStyles, createStyles } from '@material-ui/core';
import { Link } from 'view/components';

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
      <Link to={`/certifications/${certificationId}`}>
        <Button color="secondary" aria-label="More Info" title="More Info">
          More Info
        </Button>
      </Link>
    </div>
  );
};
