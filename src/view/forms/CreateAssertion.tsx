import React from 'react';
import { FormProps } from 'view/forms';
import CreateOrganizationForm from 'view/forms/organization';
import { createAssertionAction } from 'services/protobuf/assertion';
import { Organization } from 'services/protobuf/compiledProtos';

function CreateAssertionForm({ onSubmit }: FormProps) {
  const onSubmitOrg = (org: CreateOrganizationAction) => {
    onSubmit(
      createAssertionAction({
        assertion_id: '', // TODO
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
