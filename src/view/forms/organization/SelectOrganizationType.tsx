import React, { useState } from 'react';
import { OrgTypeStrings } from 'services/protobuf/organization';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { Organization } from 'services/protobuf/compiled';

interface SelectOrganizationTypeProps {
  onSubmit: (orgType: Organization.Type) => void;
  submitLabel?: string;
}

export const SelectOrganizationType = ({
  onSubmit,
  submitLabel = 'Submit',
}: SelectOrganizationTypeProps) => {
  const [selectedOrgType, setSelectedOrgType] = useState<OrgTypeStrings>(
    'UNSET_TYPE',
  );

  // Remove the UNSET_TYPE from list of orgs
  const orgTypes = Object.keys(Organization.Type).slice(1) as OrgTypeStrings[];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(Organization.Type[selectedOrgType]);
  };

  const onChange = (orgType: OrgTypeStrings) => {
    if (orgType === selectedOrgType) {
      setSelectedOrgType('UNSET_TYPE');
    } else {
      setSelectedOrgType(orgType);
    }
  };

  return (
    <form>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h6">Select Org Type</Typography>
        </Grid>
        <Grid item>
          <FormGroup>
            {orgTypes.map((orgType) => (
              <Grid item>
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
              </Grid>
            ))}
          </FormGroup>
        </Grid>

        <Grid item>
          <Button
            color="secondary"
            onClick={submit}
            disabled={selectedOrgType === 'UNSET_TYPE'}
          >
            {submitLabel}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
