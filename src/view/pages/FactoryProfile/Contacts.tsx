import React from 'react';
import { OrgResContactData } from 'services/api/organization';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface FactoryProfileContactsProps {
  contacts: OrgResContactData[];
}

interface ContactProps {
  contact: OrgResContactData;
}

interface ContactInfoProps {
  title: string;
  val: string;
}

const useStyles = makeStyles(
  createStyles({
    title: {
      fontWeight: 'bold',
    },
  }),
);

function ContactInfo({ title, val }: ContactInfoProps) {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2">{val}</Typography>
    </Grid>
  );
}

function Contact({ contact }: ContactProps) {
  const { name, language_code, phone_number } = contact;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <ContactInfo title="Name" val={name} />
      </Grid>
      <Grid item xs={4}>
        <ContactInfo title="Language Code" val={language_code} />
      </Grid>
      <Grid item xs={4}>
        <ContactInfo title="Phone Number" val={phone_number} />
      </Grid>
    </Grid>
  );
}

function FactoryProfileContacts({ contacts }: FactoryProfileContactsProps) {
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

export { FactoryProfileContacts };
