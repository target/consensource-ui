import React, { useState, useEffect } from 'react';
import { fetchAgentByPubKey, AgentResData } from 'services/api/agent';
import stores from 'stores';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react-lite';
import { User } from 'stores/UserStore';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface ProfileInfoItemProps {
  title: string;
  val: string;
}

interface UserInfoProps {
  user: User;
}

interface AgentInfoProps {
  agent: AgentResData | null;
}

const useStyles = makeStyles(
  createStyles({
    title: {
      fontWeight: 'bold',
    },
    val: {
      wordWrap: 'break-word',
    },
  }),
);

function ProfileInfoItem({ title, val }: ProfileInfoItemProps) {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.val}>
        {val}
      </Typography>
    </Grid>
  );
}

function UserInfo({ user }: UserInfoProps) {
  const { username, password } = user;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">User Info</Typography>
      </Grid>

      <ProfileInfoItem title="Username" val={username} />
      <ProfileInfoItem title="Password" val={password} />
    </Grid>
  );
}

function AgentInfo({ agent }: AgentInfoProps) {
  if (!agent) {
    return (
      <Typography variant="caption" color="error">
        Failed to fetch agent
      </Typography>
    );
  }

  const { public_key, name, created_on, organization } = agent;

  const createdOnStr = new Date(created_on).toLocaleDateString();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Agent Info</Typography>
      </Grid>

      <ProfileInfoItem title="Name" val={name} />
      <ProfileInfoItem title="Public Key" val={public_key} />
      <ProfileInfoItem title="Created On" val={createdOnStr} />
    </Grid>
  );
}

// TODO: Remove checks on user store when session tokens are setup
export const Profile = observer(() => {
  const { userStore } = stores;

  const [agent, setAgent] = useState<AgentResData | null>(null);
  const [errMsg, setErrMsg] = useState('');

  const fetchAgent = async (publicKeyString: User['publicKeyString']) => {
    try {
      const { data } = await fetchAgentByPubKey(publicKeyString);
      setAgent(data);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  useEffect(() => {
    if (userStore.user) {
      const { publicKeyString } = userStore.user;
      fetchAgent(publicKeyString);
    }
  }, [userStore.user]);

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h3">Profile</Typography>
      </Grid>

      {userStore.user && (
        <Grid item xs={12}>
          <UserInfo user={userStore.user} />
        </Grid>
      )}

      <Grid item xs={12}>
        <AgentInfo agent={agent} />
      </Grid>
    </Grid>
  );
});
