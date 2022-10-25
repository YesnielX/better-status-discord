import { Box } from "@BetterStatus/Components/Box";
import { Container, Grid } from "@nextui-org/react";
import { invoke } from "@tauri-apps/api/tauri";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

function SplashScreen() {
  // invoke('close_splashscreen')

  useEffect(() => {
    setTimeout(() => {
      invoke("close_splashscreen");
    }, 4000);
  });

  return (
    <Box
      css={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Container fluid>
        <Grid.Container justify="center">
          <Grid>
            <AnimatePresence>
              <motion.main
                animate={{
                  scale: [0, 1],
                  opacity: [0.5, 0.8, 1, 1, 1, 0],
                  rotateY: [0, 0, 360, 360],
                }}
                transition={{
                  delay: 0.1,
                  duration: 3.5,
                  type: "spring",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="better-status-logo"
                  width={500}
                  height={500}
                  draggable={false}
                />
              </motion.main>
            </AnimatePresence>
          </Grid>
        </Grid.Container>
      </Container>
    </Box>
  );
}

export default SplashScreen;
