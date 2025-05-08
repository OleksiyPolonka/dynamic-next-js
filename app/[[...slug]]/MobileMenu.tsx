'use client';

import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (openState: boolean) => () => {
    setOpen(openState);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{ ml: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer transitionDuration={3000} anchor="right" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'Catalog', href: '/catalog' },
            { label: 'Login', href: '/login' },
            { label: 'dashboard', href: '/dashboard' }
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              href={item.href}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
