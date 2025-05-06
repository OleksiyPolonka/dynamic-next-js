import React from "react";
import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material";

// Header компонент
export const HeaderComponent = ({ title = "My Site" }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">{title}</Typography>
    </Toolbar>
  </AppBar>
);

// Hero секція
export const HeroComponent = ({ title = "Welcome!", subtitle = "This is a hero section" }) => (
  <Box sx={{ padding: 4, textAlign: "center" }}>
    <Typography variant="h3">{title}</Typography>
    <Typography variant="subtitle1">{subtitle}</Typography>
  </Box>
);

// Footer компонент
export const FooterComponent = ({ text = "© 2025 My Site" }) => (
  <Box sx={{ bgcolor: "grey.200", p: 2, mt: 4, textAlign: "center" }}>
    <Typography variant="body2">{text}</Typography>
  </Box>
);

// Map
export const componentMap = {
  Header: HeaderComponent,
  Hero: HeroComponent,
  Footer: FooterComponent,
};
