import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { notFound } from "next/navigation";
// import { configs } from "../../configs"; // 👈 наша новая мапа
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar"; // если используется
import Paper from "@mui/material/Paper"; // если используется
import Stack from "@mui/material/Stack"; // если используется
import List from "@mui/material/List"; // если используется
import ListItem from "@mui/material/ListItem"; // если используется

import Link from "next/link";
import DeepNestedComponent from "@/components/DeepNestedComponent";
// import { fetchAllConfigs } from "@/lib/api";
// import { fetchAllConfigs } from "@/lib/api";


type ConfigNode = {
  mui: string;
  props?: Record<string, unknown>;
  children?: ConfigNode[] | string;
};

export type Params = Promise<{
  slug: string[];
  // config?: PageConfig;
}>;


const componentMap: Record<string, React.ElementType> = {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  Link,
  Paper,
  Stack,
  List,
  ListItem,
  DeepNestedComponent
};
const VOID_ELEMENTS = ["img", "input", "br", "hr", "meta", "area", "base", "col", "embed", "param", "source", "track", "wbr"];

export type TodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type DynamicProps = {
  url: string;
  map: ConfigNode;
};

function isDynamicProps(obj: unknown): obj is { dynamic: DynamicProps } {
  if (
    typeof obj === 'object' &&
    obj !== null &&
    'dynamic' in obj
  ) {
    const dynamic = (obj as Record<string, unknown>).dynamic;
    if (
      typeof dynamic === 'object' &&
      dynamic !== null &&
      'url' in dynamic &&
      'map' in dynamic
    ) {
      const dyn = dynamic as Record<string, unknown>;
      return (
        typeof dyn.url === 'string' &&
        typeof dyn.map === 'object' &&
        dyn.map !== null
      );
    }
  }
  return false;
}

async function RenderNode({ node }: { node: ConfigNode | string }) {
  if (typeof node === "string") {
    return node;
  }


  const { mui, props = {}, children } = node;
  if (mui == undefined)
  console.log('%capp/[[...slug]]/page.tsx:95 node', 'color: #007acc;', node);
  const Component = componentMap[mui];

  if (!Component) {
    console.log('%capp/[[...slug]]/page.tsx:99 mui', 'color: #007acc;', mui);
    return (
      <div style={{ border: "2px solid red", padding: "10px" }}>
        Unknown MUI component: {mui}
      </div>
    );
  }

  // SSR dynamic
  let dynamicChildren = null;
  if (isDynamicProps(props)) {
    try {
      const res = await fetch(props.dynamic.url, { cache: "no-store" });
      const data = await res.json();
  
      dynamicChildren = await Promise.all(
        data.map((item: TodoItem, idx: number) => {
          const mappedNode = JSON.parse(
            JSON.stringify(props.dynamic.map).replace(
              /\{(\w+)\}/g,
              (_, key) => {
                if (key in item) {
                  return String(item[key as keyof TodoItem]);
                }
                return '';
              }
            )
          );
          return <RenderNode key={idx} node={mappedNode} />;
        })
      );
    } catch (err) {
      console.error("Dynamic fetch failed:", err);
      dynamicChildren = (
        <div style={{ border: "2px solid red", padding: "10px" }}>
          Failed to load dynamic data
        </div>
      );
    }
  }
  

  // 🛡 Перевірка на void:
  const isVoid =
    VOID_ELEMENTS.includes(mui.toLowerCase()) ||
    ('component' in props &&
      typeof props.component === "string" &&
      VOID_ELEMENTS.includes((props.component as string).toLowerCase()));

      if (isVoid) {
    return <Component {...props} />;
  }

  return (
    <Component {...props}>
      {/* Динамічні діти */}
      {dynamicChildren}

      {/* Звичайні діти */}
      {Array.isArray(children)
        ? await Promise.all(
            children.map((child, idx) => (
              <RenderNode key={idx} node={child} />
            ))
          )
        : typeof children === "object" && children !== null
        ? <RenderNode node={children} />
        : children}
    </Component>
  );
}


export default async function Page({ params }: {
  params: Params;
}) {
  const {slug = []} = await params;

  const response = await fetch(`https://api.myjson.online/v1/records/438bb988-189d-4d16-b45a-470dbcac27ec`);
  const { data } = await response.json();

  const config = data[slug[0] ?? '/'];

  if (!config) {
    return notFound();
  }

  return (
    <main>
      {config.layout.map((section: ConfigNode, idx: number) => (
        <RenderNode key={idx} node={section} />
      ))}
    </main>
  );
}
