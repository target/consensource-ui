import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllStandards } from 'services/api';
import { LoadingWithMinDisplay } from 'view/components';
import { FilterMultiselect } from './Multiselect';

export interface CertificationsMultiselectProps {
  activeCertFilters: string[];
  onChange: (value: string[]) => void;
}

export const CertificationsMultiselect = ({
  activeCertFilters,
  onChange,
}: CertificationsMultiselectProps) => {
  const queryRes = useQuery('fetchAllStandards', () => fetchAllStandards());

  const { data } = queryRes;

  return (
    <LoadingWithMinDisplay queryRes={queryRes}>
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
