import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import Link from "next/link";

const CreatePresence = () => {
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
                    <Button auto color="success">
                      <Link href="/new" passHref={true}>
                        <Text>Create</Text>
                      </Link>
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
