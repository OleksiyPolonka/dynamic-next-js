'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Slide,
  useTheme
} from '@mui/material';

type PlatformsProps = {
  title: string
  link?: string
  query?: string
  count: number
  image: string
}


export type DropdownProps = {
  platforms: PlatformsProps[]
  brands: (ReactNode | { label: ReactNode })[];
}

export interface NavItemProps { icon: string, label: string, dropdown: DropdownProps }
export function NavItem({ icon, label, dropdown }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Trigger button */}
      <Box
        onClick={handleToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.5,
          py: 0.5,
          borderRadius: '999px',
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': { backgroundColor: theme.palette.action.hover }
        }}
      >
        <span>{icon}</span>
        <Typography variant="body2">{label}</Typography>
      </Box>

      {/* Backdrop to close */}
      {open && (
        <Box
          onClick={handleClose}
          sx={{
            position: 'fixed',
            top: '64px', // adjust if AppBar height differs
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 64px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1100
          }}
        />
      )}

      {/* Sliding dropdown */}
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            top: '64px', // AppBar height
            left: 0,
            width: '100vw',
            backgroundColor: 'background.paper',
            boxShadow: 4,
            zIndex: 1201, // above backdrop
            p: 3
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {dropdown?.platforms?.map((item: PlatformsProps, i: number) => {
              const query = item.query ? {query: { platform: item.query }} : {}
              return (
              <Link
                key={i}
                href={{ pathname: item.link, ...query }}
                style={{ textDecoration: 'none' }}
                onClick={handleClose}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 120,
                    borderRadius: 2,
                    boxShadow: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' }
                  }}
                >
                  {/* <Image
                    src={item.image}
                    alt={item.title}
                    style={{ width: 48, height: 48, objectFit: 'contain' }}
                  /> */}
                  <Typography variant="body2" fontWeight="bold" mt={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.count.toLocaleString()}
                  </Typography>
                </Paper>
              </Link>
            )})}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {dropdown?.brands?.map((brand, i: number) => (
              <Chip key={i} label={brand} />
            ))}
          </Box>
        </Box>
      </Slide>
    </Box>
  );
}
