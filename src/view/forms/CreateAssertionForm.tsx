import React from 'react';
import { FormProps } from 'view/forms';
import CreateOrganizationForm from 'view/forms/CreateOrganizationForm';
import { createAssertionAction } from 'services/protobuf/assertion';
import { CreateOrgAction } from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiledProtos';

function CreateAssertionForm({ onSubmit }: FormProps) {
  const onSubmitOrg = (org: CreateOrgAction) => {
    onSubmit(
      createAssertionAction({
        assertion_id: '',
        new_factory: { factory: org },
      }),
    );
  };

  return (
    <CreateOrganizationForm
      organization_type={Organization.Type.FACTORY}
      onSubmit={onSubmitOrg}
    />
  );
}

export default CreateAssertionForm;
