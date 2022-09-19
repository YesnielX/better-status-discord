import { Grid, Card, Col, Button, Text, Input } from "@nextui-org/react";

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
                <Input
                  clearable
                  bordered
                  label="App ID"
                  placeholder="000000000000"
                  type="text"
                  required
                  status="default"
                  color="default"
                />
              </Grid>

              <Grid>
                <Button auto color="success">
                  Connect
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Card>
      </Grid>
    </>
  );
};

export default CreatePresence;
