import { usePresence } from "@BetterStatus/Contexts/PresenceContext";
import IPresence from "@BetterStatus/Interfaces/Presence";
import { Button, Card, Col, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Prensence = (props: { presence: IPresence }) => {
  const { deletePresence } = usePresence();

  const router = useRouter();

  return (
    <Grid xs={12} sm={3}>
      <Link href={`/edit/${props.presence.id}`}>
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
                  color="success"
                  icon={
                    <Image
                      src="/play-icon.png"
                      alt="trash-icon"
                      width={26}
                      height={26}
                    />
                  }
                  onClick={() => {
                    router.push(`/edit/${props.presence.id}`);
                  }}
                >
                  <Text color="White" b>
                    Start
                  </Text>
                </Button>
              </Grid>
              <Grid>
                <Button
                  auto
                  color="error"
                  onPress={() => {
                    deletePresence(props.presence.name);
                  }}
                  icon={
                    <Image
                      src="/trash.png"
                      alt="trash-icon"
                      width={26}
                      height={26}
                    />
                  }
                >
                  <Text color="White" b>
                    Delete
                  </Text>
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Card>
      </Link>
    </Grid>
  );
};

export default Prensence;
