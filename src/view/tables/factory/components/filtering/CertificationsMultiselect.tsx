import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllStandards } from 'services/api';
import { makeStyles, createStyles } from '@material-ui/core';
import { LoadingWithMinDisplay, WarningIconError } from 'view/components';
import { FilterMultiselect } from './Multiselect';

export interface CertificationsMultiselectProps {
  activeCertFilters: string[];
  onChange: (value: string[]) => void;
}

const useStyles = makeStyles(
  createStyles({
    errorText: {
      paddingTop: 10,
    },
  }),
);

export const CertificationsMultiselect = ({
  activeCertFilters,
  onChange,
}: CertificationsMultiselectProps) => {
  const classes = useStyles();
  const { data, isLoading, error } = useQuery('fetchAllStandards', () =>
    fetchAllStandards(),
  );

  return (
    <LoadingWithMinDisplay isLoading={isLoading}>
      {error && (
        <div className={classes.errorText}>
          <WarningIconError size="small">
            Failed to load certifications
          </WarningIconError>
        </div>
      )}
      {data && (
        <FilterMultiselect
          options={data.data.map(({ standard_name }) => standard_name)}
          queryKey="certificates"
          label="Certifications"
          onChange={(val) => onChange(val)}
          filterVals={activeCertFilters}
        />
      )}
    </LoadingWithMinDisplay>
  );
};
