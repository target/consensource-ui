import React, { useState, useEffect } from 'react';
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
  onSubmit?: (orgType: Organization.Type) => void;
  onChange?: (orgType: Organization.Type) => void;
  submitLabel?: string;
}

export const SelectOrganizationType = ({
  onSubmit,
  onChange,
  submitLabel = 'Submit',
}: SelectOrganizationTypeProps) => {
  const [selectedOrgType, setSelectedOrgType] = useState<OrgTypeStrings>(
    'UNSET_TYPE',
  );

  // Remove the UNSET_TYPE from list of orgs
  const orgTypes = Object.keys(Organization.Type).slice(1) as OrgTypeStrings[];

  const getOrgEnumFromString = () => {
    return Organization.Type[selectedOrgType];
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(getOrgEnumFromString());
    }
  };

  useEffect(() => {
    /**
     * The `onChange` handler for each input will keep the internal
     * state of the form updated. If the parent also passes an `onChange`,
     * call that function to keep the parent in sync.
     */
    if (onChange) {
      onChange(getOrgEnumFromString());
    }
  }, [selectedOrgType]);

  const handleChange = (orgType: OrgTypeStrings) => {
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
              <Grid item key={orgType}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOrgType === orgType}
                      onChange={() => {
                        handleChange(orgType);
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

        {onSubmit && (
          <Grid item>
            <Button
              color="secondary"
              onClick={submit}
              disabled={selectedOrgType === 'UNSET_TYPE'}
            >
              {submitLabel}
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};
