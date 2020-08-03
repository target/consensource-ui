import React from 'react';
import { OrgResContactData } from 'services/api/organization';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { InfoItem } from 'view/components';

interface FactoryProfileContactsProps {
  contacts: OrgResContactData[];
}

interface ContactProps {
  contact: OrgResContactData;
}

function Contact({ contact }: ContactProps) {
  const { name, language_code, phone_number } = contact;

  return (
    <Grid container spacing={2}>
      <InfoItem title="Name" val={name} />
      <InfoItem title="Language Code" val={language_code} />
      <InfoItem title="Phone Number" val={phone_number} />
    </Grid>
  );
}

export function FactoryProfileContacts({
  contacts,
}: FactoryProfileContactsProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Contacts</Typography>
      </Grid>

      {contacts.map((contact) => (
        <Grid item xs={12} key={contact.name}>
          <Contact contact={contact} />
        </Grid>
      ))}
    </Grid>
  );
}
