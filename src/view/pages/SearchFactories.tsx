import React from 'react';
import { FactoriesTable, queryOpts } from 'view/tables';
import { useSearchQuery } from 'services/hooks';
import { fetchAllFactories } from 'services/api';
import { useQuery } from 'react-query';
import { FullPageLoading } from 'view/components';

export const SearchFactories = () => {
  const searchParams = useSearchQuery(queryOpts);

  /**
   * Note that when parsing query params, we do not have a
   * guarantee that all params passed to `fetchAllFactories`
   * will be a valid `FactoryReqParams` object. The API is
   * responsible for filtering out invalid params.
   */
  const queryRes = useQuery(
    ['fetchAllFactories', { expand: true, ...searchParams }],
    (key, params) => fetchAllFactories(params as any),
  );

  return (
    <FullPageLoading
      queryRes={queryRes}
      loadingLabel="Loading factories..."
      errorLabel="Error loading factories"
    >
      {(factories) => (
        <FactoriesTable factories={factories} searchParams={searchParams} />
      )}
    </FullPageLoading>
  );
};
