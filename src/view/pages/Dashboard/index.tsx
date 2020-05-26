import React from 'react';
import CreateOrganizationForm from 'view/forms/CreateOrganizationForm';
import { Organization } from 'services/protobuf';

export default function Dashboard() {
  return (
    <div>
      <CreateOrganizationForm organization_type={Organization.Type.FACTORY} />
    </div>
  );
}
