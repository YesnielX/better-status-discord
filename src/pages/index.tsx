import { Box } from "@BetterStatus/Components/Box";
import Prensences from "@BetterStatus/Components/Presences/Presences";
import { usePresence } from "@BetterStatus/Contexts/PresenceContext";
import { Container } from "@nextui-org/react";
import RedirectAnim from "Animations/RedirectAnim";
// import { invoke } from "@tauri-apps/api/tauri";
import CreatePresence from "Components/Presences/CreatePresence";
import Prensence from "Components/Presences/PresenceCard";

function App() {
  const { presences } = usePresence();

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <Box
      css={{
        maxW: "100%",
        minHeight: "1050px",
      }}
    >
      <Container>
        <RedirectAnim>
          <Prensences>
            <CreatePresence />
            {presences.map((presence) => (
              <Prensence presence={presence} key={presence.id} />
            ))}
          </Prensences>
        </RedirectAnim>
      </Container>
    </Box>
  );
}

export default App;
