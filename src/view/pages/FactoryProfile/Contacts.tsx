import React from 'react';
import { OrgResContactData } from 'services/api';
import { Typography, Grid } from '@material-ui/core';
import { InfoItem } from 'view/components';

interface ContactsProps {
  contacts: OrgResContactData[];
}

interface ContactProps {
  contact: OrgResContactData;
}

function Contact({ contact }: ContactProps) {
  const { name, language_code, phone_number } = contact;

  return (
    <Grid container item>
      <InfoItem title="Name" val={name} />
      <InfoItem title="Language Code" val={language_code} />
      <InfoItem title="Phone Number" val={phone_number} />
    </Grid>
  );
}
export const Contacts = ({ contacts }: ContactsProps) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Contacts</Typography>
      </Grid>

      <Grid container item direction="column" spacing={2}>
        {contacts.map((contact) => (
          <Contact contact={contact} key={contact.name} />
        ))}
      </Grid>
    </Grid>
  );
};
