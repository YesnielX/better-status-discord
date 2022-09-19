import { Button, Card, Col, Grid, Text } from "@nextui-org/react";

const Prensence = (props: { title: string; description: string }) => {
  return (
    <Grid xs={12} sm={3}>
      <Card
        isPressable
        css={{
          bgColor: "#282a36",
        }}
      >
        <Card.Body css={{ p: 9 }}>
          <Card.Image
            src="https://cdn.discordapp.com/app-icons/841512699350745099/71f3a0fe00d676919e95c07a82527700.png?size=512"
            width="100%"
            height={150}
            alt="Card image background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            bgColor: "#44475a",
          }}
        >
          <Grid.Container gap={1} justify="center">
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                {props.description}
              </Text>
              <Text h4 color="white">
                {props.title}
              </Text>
            </Col>
            <Grid>
              <Button auto color="error">
                Delete
              </Button>
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
  );
};

export default Prensence;
