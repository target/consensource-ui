import React, { useState } from 'react';
import { OrgTypeStrings } from 'services/protobuf/organization';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Organization } from 'services/protobuf/compiled';

interface SelectOrgTypeProps {
  onOrgSelect: (orgType: Organization.Type) => void;
}

export function SelectOrgType({ onOrgSelect }: SelectOrgTypeProps) {
  const [selectedOrgType, setSelectedOrgType] = useState<OrgTypeStrings>(
    'UNSET_TYPE',
  );

  // Remove the UNSET_TYPE from list of orgs
  const orgTypes = Object.keys(Organization.Type).slice(1) as OrgTypeStrings[];

  const onClick = () => {
    onOrgSelect(Organization.Type[selectedOrgType]);
  };

  const onChange = (orgType: OrgTypeStrings) => {
    if (orgType === selectedOrgType) {
      setSelectedOrgType('UNSET_TYPE');
    } else {
      setSelectedOrgType(orgType);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormGroup>
          {orgTypes.map((orgType) => (
            <FormControlLabel
              key={orgType}
              control={
                <Checkbox
                  checked={selectedOrgType === orgType}
                  onChange={() => {
                    onChange(orgType);
                  }}
                  name={orgType}
                />
              }
              label={orgType.split('_').join(' ').toLowerCase()}
            />
          ))}
        </FormGroup>

        <Grid item xs={12}>
          <Button
            color="secondary"
            onClick={onClick}
            disabled={selectedOrgType === 'UNSET_TYPE'}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
