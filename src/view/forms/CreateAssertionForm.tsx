import React from 'react';
import { FormProps } from 'view/forms';
import CreateOrganizationForm from 'view/forms/CreateOrganizationForm';
import { createAssertion } from 'services/protobuf/transactions/assertion';
import { CreateOrgAction } from 'services/protobuf/transactions/organization';
import { Organization } from 'services/protobuf';

function CreateAssertionForm({ onSubmit, onError }: FormProps) {
  function onSubmitOrg(org: CreateOrgAction) {
    try {
      const assertion = createAssertion({
        assertion_id: '123',
        new_factory: { factory: org },
      });

      if (onSubmit) {
        onSubmit(assertion);
      }
    } catch ({ message }) {
      if (onError) {
        onError(message);
      }
    }
  }

  return (
    <CreateOrganizationForm
      organization_type={Organization.Type.FACTORY}
      onSubmit={onSubmitOrg}
    />
  );
}

export default CreateAssertionForm;
