import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, Container, Switch, useTheme } from "@nextui-org/react";
import Prensences from "../components/Presences/Presences";
import AppNavbar from "../components/Presences/AppNavbar";
import { Box } from "../components/Box";
import Prensence from "../components/Presences/Presence";
import CreatePresence from "../components/Presences/CreatePresence";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Box
      css={{
        maxW: "100%",
        minHeight: "1050px",
      }}
    >
      <AppNavbar />

      <Container>
        <Prensences>
          <CreatePresence></CreatePresence>
          <Prensence title="Youtube" description="Youtube Rich Presence" />
          <Prensence title="Youtube" description="Youtube Rich Presence" />
          <Prensence title="Youtube" description="Youtube Rich Presence" />
          <Prensence title="Youtube" description="Youtube Rich Presence" />
        </Prensences>
      </Container>
    </Box>
  );
}

export default App;
