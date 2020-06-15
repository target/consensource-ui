import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CreateOrgForm from 'view/widgets/forms/organization';
import {
  Organization,
  CreateOrganizationAction,
} from 'services/protobuf/compiled';
import {
  OrgTypeStrings,
  createOrgTransaction,
} from 'services/protobuf/organization';
import stores from 'stores';
import { createBatch } from 'services/protobuf/batch';
import BatchService from 'services/batch';

interface SelectOrgTypeProps {
  onOrgSelect: (orgType: Organization.Type) => void;
}

function SelectOrgType({ onOrgSelect }: SelectOrgTypeProps) {
  const [selectedOrgType, setSelectedOrgType] = useState<OrgTypeStrings>(
    'UNSET_TYPE',
  );

  const orgTypes = Object.keys(Organization.Type).slice(1) as OrgTypeStrings[];

  const onClick = () => {
    onOrgSelect(Organization.Type[selectedOrgType]);
  };

  return (
    <div>
      <h2>Org Types</h2>
      <FormGroup>
        {orgTypes.map((orgType) => (
          <FormControlLabel
            key={orgType}
            control={
              <Checkbox
                checked={selectedOrgType === orgType}
                onChange={() => {
                  setSelectedOrgType(orgType);
                }}
                name={orgType}
              />
            }
            label={orgType.split('_').join(' ').toLowerCase()}
          />
        ))}
      </FormGroup>

      <Button onClick={onClick} disabled={selectedOrgType === 'UNSET_TYPE'}>
        Continue
      </Button>
    </div>
  );
}

function Dashboard() {
  const [orgType, setOrgType] = useState(Organization.Type.UNSET_TYPE);

  const onSubmit = async (org: CreateOrganizationAction) => {
    let signer;

    if (!stores.userStore.user) {
      throw new Error('A signer is required to create an agent');
    } else {
      signer = stores.userStore.user.signer;
    }

    const txns = new Array(createOrgTransaction(org, signer));
    const batchListBytes = createBatch(txns, signer);
    await BatchService.submitBatch(batchListBytes);
  };

  if (orgType === Organization.Type.UNSET_TYPE) {
    return <SelectOrgType onOrgSelect={(org) => setOrgType(org)} />;
  }

  return <CreateOrgForm organization_type={orgType} onSubmit={onSubmit} />;
}

export default Dashboard;
