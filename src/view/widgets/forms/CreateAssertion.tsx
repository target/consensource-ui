import React from 'react';
import { FormProps } from 'view/widgets/forms';
import CreateOrganizationForm from 'view/widgets/forms/organization';
import { createAssertionAction } from 'services/protobuf/assertion';
import {
  Organization,
  CreateOrganizationAction,
} from 'services/protobuf/compiled';

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
