import React from 'react';
import stores from 'stores';
import CreateOrganizationForm from 'view/forms/transactionForms/CreateOrganizationForm';
import { Organization } from 'services/protobuf';

export default function Dashboard() {
  return (
    <div>
      <h1>{`Hello, ${
        stores.userStore.user && stores.userStore.user.username
      }`}</h1>
      <div>
        <CreateOrganizationForm organizationType={Organization.Type.FACTORY} />
      </div>
    </div>
  );
}
