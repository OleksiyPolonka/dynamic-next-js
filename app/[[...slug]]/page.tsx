import React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import { notFound } from "next/navigation";
// import { configs } from "../../configs"; // 👈 наша новая мапа
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar"; // если используется
// import Paper from "@mui/material/Paper"; // если используется
// import Stack from "@mui/material/Stack"; // если используется
// import List from "@mui/material/List"; // если используется
// import ListItem from "@mui/material/ListItem"; // если используется

import Link from "next/link";
// import DeepNestedComponent from "@/components/DeepNestedComponent";
// import { fetchAllConfigs } from "@/lib/api";
// import { fetchAllConfigs } from "@/lib/api";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import MobileMenu from './MobileMenu'

import { config } from "../../configs";
// import { SetLayout } from "@/components/SetLeyout";
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";
import AuthTabs from "@/components/AuthTabs";
// import ProtectedGuard from "@/components/ProtectedGuard";
import { BackButtonComponent } from "@/components/BackButton";
import { Divider, Avatar } from '@mui/material';
import { NavItem } from "@/components/NavItems";
import { Metadata } from "next";

export type Params = { slug?: string[] };
export type PageConfig = {
  protected?: boolean,
  path: string;
  seo?: {
    title?: string;
    description?: string;
  };
  layout: ConfigSection[];
  main: ConfigSection[];
};

export type ConfigSection = {
  mui: string;
  props?: Record<string, unknown>;
  children?: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const path = slug.length > 0 ? `/${slug.join("/")}` : "/";
  const pageConfig = config[path] as PageConfig | undefined;

  return {
    title: pageConfig?.seo?.title || "Default Title",
    description: pageConfig?.seo?.description,
  };
}

export default async function Page({ params, children }: {
  params: Params;
}) {
  const {slug = []} = await params;

  const response = await fetch(`https://api.myjson.online/v1/records/438bb988-189d-4d16-b45a-470dbcac27ec`);
  const { data } = await response.json();
  const config: PageConfig = data[slug[0] ? `/${slug[0]}` : '/']
console.log('%capp/[[...slug]]/page.tsx:82 config', 'color: #007acc;', config);
  if (!config) {
    return notFound();
  }
  if (Array.isArray(config.main)) {
    return config.main.map((child, idx) => (
      <RenderComponent key={idx} section={child} />
    ));
  }

  if (typeof children === "object") {
    return <RenderComponent section={children} />;
  }

  return children;
}
export function RenderComponent({ section }: { section: ConfigSection }) {
  const { mui, props = {}, children } = section;

  const renderedChildren = renderChildren(children);

  switch (mui) {
    case "AppBar":
      return <MobileMenu />;
    case "AppBar":
      return <AppBar {...props}>{renderedChildren}</AppBar>;
    case "Toolbar":
      return <Toolbar {...props}>{renderedChildren}</Toolbar>;
    case "Typography":
      return <Typography {...props}>{renderedChildren}</Typography>;
    case "Box":
      return <Box {...props}>{renderedChildren}</Box>;
    case "Button":
      return <Button {...props}>{renderedChildren}</Button>;
    case "TextField":
      return <TextField {...props} />;
      case 'ClerkSignIn':
        return <SignIn {...props} />;
      case 'ClerkSignUp':
        return <SignUp {...props} />;
      case 'ClerkUserButton':
        return <UserButton {...props} />;
      case 'AuthTabs':
        return <AuthTabs {...props} />;
      case "BackButton":
        return <BackButtonComponent {...props} />;
      case 'Divider':
        return <Divider {...props} />;
      case 'Avatar':
        return <Avatar {...props} />;
      case 'NavItem':
        return <NavItem {...props} />;
  
        
      
    case "Link":
      return (
        <Link href={props?.href || "#"} {...props}>
          {renderedChildren}
        </Link>
      );
    case "Container":
      return <Container {...props}>{renderedChildren}</Container>;
    case "Grid":
      return <Grid {...props}>{renderedChildren}</Grid>;
    default:
      console.warn("Unknown component type:", mui);
      return (
        <div style={{ border: "1px dashed red", padding: 4 }}>
          Unknown component: {mui}
        </div>
      );
  }
}

function renderChildren(children: React.ReactNode) {
  if (!children) return null;

  if (Array.isArray(children)) {
    return children.map((child, idx) => (
      <RenderComponent key={idx} section={child} />
    ));
  }

  if (typeof children === "object") {
    return <RenderComponent section={children} />;
  }

  return children;
}
