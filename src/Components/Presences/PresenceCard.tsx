import { usePresence } from "@BetterStatus/Contexts/PresenceContext";
import IPresence from "@BetterStatus/Interfaces/Presence";
import { Button, Card, Col, Grid, Text } from "@nextui-org/react";
import Link from "next/link";

const Prensence = (props: { presence: IPresence }) => {
  const { deletePresence } = usePresence();

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
            src={props.presence.imageURL || "/discord.png"}
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
                {props.presence.details}
              </Text>
              <Text h4 color="white">
                {props.presence.name}
              </Text>
            </Col>
            <Grid>
              <Button
                auto
                color="error"
                onPress={() => {
                  deletePresence(props.presence.name);
                }}
              >
                Delete
              </Button>
            </Grid>
            <Grid>
              <Button auto color="success">
                <Link href={`/edit/${props.presence.id}`}>
                  <Text color="White">Start</Text>
                </Link>
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default Prensence;
