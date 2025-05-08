'use client';

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { SignIn, SignUp } from '@clerk/clerk-react';

export default function AuthTabs() {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tab === 0 && <SignIn />}
        {tab === 1 && <SignUp />}
      </Box>
    </Box>
  );
}
