import React from 'react';
import CreateOrganizationForm from 'view/forms/CreateOrganizationForm';
import { Organization } from 'services/protobuf';

export default function Dashboard() {
  return (
    <div>
      <CreateOrganizationForm organizationType={Organization.Type.FACTORY} />
    </div>
  );
}
