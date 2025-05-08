import MobileMenu from "@/app/[[...slug]]/MobileMenu";
import { AppBar, Avatar, Box, Button, Container, Divider, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { NavItem, NavItemProps } from "./NavItems";

type ConfigSection = {
  mui: string;
  props?: Record<string, unknown>;
  children?: ConfigSection;
};
export function RenderComponent({ section }: { section: ConfigSection }) {
  const { mui, props = {}, children } = section;

  const renderedChildren = renderChildren(children as ConfigSection);

  switch (mui) {
    case "MobileMenu":
      return <MobileMenu {...props} />; // ✅ передаём props
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
      case 'Divider':
        return <Divider {...props} />;
      case 'Avatar':
        return <Avatar {...props} />;
      case 'NavItem':
        return <NavItem {...props as NavItemProps} />;
  
      return (
        <div style={{ border: "1px dashed red", padding: 4 }}>
          Unknown component: {mui}
        </div>
      );
  }
}

function renderChildren(children: ConfigSection) {
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
