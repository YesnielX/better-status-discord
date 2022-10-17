import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

const CreatePresence = () => {
  const router = useRouter();

  return (
    <>
      <Grid xs={12} sm={3}>
        <Card
          css={{
            bgColor: "#282a36",
          }}
        >
          <Card.Body css={{ p: 9 }}>
            <Card.Image
              src="/discord.png"
              width="100%"
              height={150}
              alt="Card image background"
            />
          </Card.Body>
          <Card.Footer
            css={{
              bgColor: "#44475a",
            }}
          >
            <Grid.Container gap={1} justify="center">
              <Grid>
                <Row justify="center">
                  <Grid>
                    <Text h3 color="white">
                      New Presence
                    </Text>
                  </Grid>
                </Row>

                <Row justify="center">
                  <Grid>
                    <Button
                      auto
                      color="success"
                      icon={
                        <Image
                          src="/new.png"
                          alt="trash-icon"
                          width={30}
                          height={30}
                        />
                      }
                      onClick={() => {
                        router.push("/new");
                      }}
                    >
                      <Text b>Create</Text>
                    </Button>
                  </Grid>
                </Row>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  );
};

export default CreatePresence;
