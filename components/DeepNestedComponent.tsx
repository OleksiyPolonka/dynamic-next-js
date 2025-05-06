import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { TodoItem } from "@/app/[[...slug]]/page";

const DeepNestedComponent = async () => {
  // Серверний запит
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", { cache: "no-store" });
  const todos = await res.json();

  return (
    <Box sx={{ border: "2px solid black", padding: 2, backgroundColor: "#f5f5f5" }}>
      <Card sx={{ padding: 2, backgroundColor: "#e8f0fe" }}>
        <Container sx={{ padding: 2, backgroundColor: "#fffde7" }}>
          <Grid container spacing={2} sx={{ backgroundColor: "#e0f7fa", padding: 2 }}>
            <Paper sx={{ padding: 2, backgroundColor: "#fce4ec" }}>
              <Stack spacing={2} sx={{ backgroundColor: "#ede7f6", padding: 2 }}>
                <List sx={{ backgroundColor: "#fff3e0" }}>
                  {todos.map((todo: TodoItem) => (
                    <ListItem key={todo.id} divider>
                      <Typography variant="body2">{todo.title}</Typography>
                    </ListItem>
                  ))}
                  <ListItem>
                    <Typography variant="h6">
                      <Button variant="contained" color="secondary">
                        <CardContent>
                          <Typography variant="body1">
                            Deeply nested content with button ✅
                          </Typography>
                        </CardContent>
                      </Button>
                    </Typography>
                  </ListItem>
                </List>
              </Stack>
            </Paper>
          </Grid>
        </Container>
      </Card>
    </Box>
  );
};

export default DeepNestedComponent;
