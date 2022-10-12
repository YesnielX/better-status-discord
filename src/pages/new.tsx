import { usePresence } from "@BetterStatus/Contexts/PresenceContext";
import IPresence from "@BetterStatus/Interfaces/Presence";
import {
  Button,
  Card,
  Col,
  Container,
  FormElement,
  Grid,
  Input,
  Row,
  Switch,
  Text,
} from "@nextui-org/react";
import { open as OpenInBrowser } from "@tauri-apps/api/shell";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import isURL from "validator/lib/isURL";

const NewPresence = () => {
  const { updatePresence, createPresence, presences } = usePresence();

  const [isConnected, setIsConnected] = useState(false);
  const [appCooldown, setAppCooldown] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const [presence, setPresence] = useState<IPresence>({
    id: uuidv4(),
    appId: "",
    name: "New Presence",
    imageURL: "/discord.png",
    details: "My Details",
    state: "My State",
    largeImageKey: "Large Image Key",
    largeImageText: "Large Image Text",
    smallImageKey: "Small Image Key",
    smallImageText: "Small Image Text",
    buttons: [
      {
        label: "one button",
        url: "https://google.com",
      },
      {
        label: "two button",
        url: "https://youtube.com",
      },
    ],
    timestamp: false,
  });

  const handleChange = (e: ChangeEvent<FormElement>) => {
    setPresence({ ...presence, [e.target.name]: e.target.value });
  };

  const handleChangeButtons = (e: ChangeEvent<FormElement>) => {
    // if the label is empty remove from presence.buttons array.

    // if (presence.buttons[0].label === "" && presence.buttons[0].url === "") {
    //   delete presence.buttons[0]
    // } else  if (presence.buttons[1].label === "" && presence.buttons[1].url === "") {
    //   delete presence.buttons[1]
    // }

    if (e.target.name === "label") {
      presence.buttons[e.target.id === "oneButton" ? 0 : 1].label =
        e.target.value;
    } else if (e.target.name === "url") {
      presence.buttons[e.target.id === "oneButton" ? 0 : 1].url =
        e.target.value;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isConnected) {
      setAppCooldown(true);

      // fetch DELETE to /api/activity for disconnect presence.
      fetch("/api/activity", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // notify disconnected.
          enqueueSnackbar(`${data.message}`, {
            variant: "success",
            preventDuplicate: true,
          });
        });

      setIsConnected(false);
    } else {
      if (
        presence.largeImageKey.length <= 2 ||
        presence.largeImageText.length <= 2 ||
        presence.smallImageKey.length <= 2 ||
        presence.smallImageText.length <= 2
      ) {
        enqueueSnackbar("Some entries must have length > 2", {
          variant: "info",
          preventDuplicate: true,
        });
        return;
      }

      if (
        presence.largeImageKey.length >= 15 ||
        presence.largeImageText.length >= 15 ||
        presence.smallImageKey.length >= 15 ||
        presence.smallImageText.length >= 15
      ) {
        enqueueSnackbar("Some entries must have length <= 15", {
          variant: "info",
          preventDuplicate: true,
        });
        return;
      }

      if (presence.appId.length > 18) {
        enqueueSnackbar("App ID must have 18 length", {
          variant: "error",
          preventDuplicate: true,
        });
        return;
      }

      if (
        (presence.buttons[0].url.length > 6 &&
          !isURL(presence.buttons[0].url)) ||
        (presence.buttons[1].url.length > 6 && !isURL(presence.buttons[1].url))
      ) {
        enqueueSnackbar("button URL invalid", {
          variant: "error",
          preventDuplicate: true,
        });

        return;
      }

      setAppCooldown(true);

      enqueueSnackbar("Saved And Connecting", {
        variant: "success",
        preventDuplicate: true,
      });

      setIsConnected(true);

      // fetch POST to /api/activity with presence object.
      fetch("/api/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presence),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // notify connected
          enqueueSnackbar(data.message, {
            variant: data.variant,
            preventDuplicate: true,
          });
        })
        .catch((error) => {
          console.error(error);
          enqueueSnackbar("Error Connecting", {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }

    setTimeout(() => {
      setAppCooldown(false);
    }, 2500);

    if (router.query.id) {
      updatePresence(
        presence.id,
        presence.appId,
        presence.name,
        presence.imageURL,
        presence.details,
        presence.details,
        presence.largeImageKey,
        presence.largeImageText,
        presence.smallImageKey,
        presence.smallImageText,
        presence.buttons,
        presence.timestamp
      );
    } else {
      createPresence(
        presence.id,
        presence.appId,
        presence.name,
        presence.imageURL,
        presence.details,
        presence.details,
        presence.largeImageKey,
        presence.largeImageText,
        presence.smallImageKey,
        presence.smallImageText,
        presence.buttons,
        presence.timestamp
      );
      setTimeout(() => {
        router.push(`/edit/${presence.id}`);
        console.log("router id updated");
      }, 2000);
    }
  };

  const handleClose = () => {
    enqueueSnackbar("Closed", {
      variant: "success",
      autoHideDuration: 1500,
    });

    router.push("/");
  };

  useEffect(() => {
    if (router.query.id) {
      const doesExist = presences.find(
        (presence) => presence.id === router.query.id
      );
      if (doesExist) setPresence(doesExist);
    }
  }, [router.query.id, presences]);

  return (
    <Container fluid>
      <Grid.Container
        justify="center"
        css={{
          p: 10,
        }}
      >
        <Grid xs={12} sm={11}>
          <form onSubmit={handleSubmit}>
            <Card
              css={{
                bgColor: "#282a36",
              }}
            >
              <Card.Body css={{ p: 9 }}>
                <Card.Image
                  src={presence.imageURL || "/discord.png"}
                  width="100%"
                  height={150}
                  alt="Presence Image"
                  onClick={() => {
                    OpenInBrowser(
                      `https://discord.com/developers/applications/${presence.appId}/rich-presence/assets`
                    );
                  }}
                />
              </Card.Body>
              <Card.Footer
                css={{
                  bgColor: "#44475a",
                }}
              >
                <Grid.Container gap={1} justify="center">
                  <Grid>
                    <Row>
                      <Col>
                        <Text h4>Presence</Text>
                        <Col>
                          <Grid.Container gap={1}>
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
                                name="appId"
                                value={presence.appId}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid>
                              <Input
                                clearable
                                bordered
                                label="Presence name"
                                placeholder="Hello World"
                                type="text"
                                required
                                status="default"
                                color="default"
                                name="name"
                                value={presence.name}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid.Container>
                        </Col>
                      </Col>
                      <Col>
                        <Text h4>Details</Text>
                        <Col>
                          <Row>
                            <Col>
                              <Grid>
                                <Input
                                  clearable
                                  bordered
                                  label="Details"
                                  placeholder="My Details"
                                  name="details"
                                  type="text"
                                  required
                                  status="default"
                                  color="default"
                                  value={presence.details}
                                  onChange={handleChange}
                                />
                              </Grid>
                            </Col>
                            <Col>
                              <Grid>
                                <Input
                                  clearable
                                  bordered
                                  label="State"
                                  placeholder="My State"
                                  name="state"
                                  value={presence.state}
                                  onChange={handleChange}
                                  type="text"
                                  required
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                            <Col>
                              <Grid>
                                <Text>TimeStamp</Text>
                                <Switch
                                  checked={presence.timestamp}
                                  onChange={(e) => {
                                    setPresence({
                                      ...presence,
                                      ["timestamp"]: e.target.checked,
                                    });
                                  }}
                                />
                              </Grid>
                            </Col>
                          </Row>
                        </Col>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col>
                        <Text h4>Image</Text>
                        <Col>
                          <Row justify="center">
                            <Col>
                              <Grid justify="center">
                                <Input
                                  clearable
                                  bordered
                                  label="Small Image Key"
                                  placeholder="Twitch"
                                  name="smallImageKey"
                                  type="text"
                                  value={presence.smallImageKey}
                                  onChange={handleChange}
                                  required
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                            <Col>
                              <Grid>
                                <Input
                                  clearable
                                  bordered
                                  label="Large Image Key"
                                  placeholder="My_Twitch_Logo"
                                  name="largeImageKey"
                                  type="text"
                                  value={presence.largeImageKey}
                                  onChange={handleChange}
                                  required
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                          </Row>
                          <Row justify="center">
                            <Col>
                              <Grid justify="center">
                                <Input
                                  clearable
                                  bordered
                                  label="Large Image Text"
                                  placeholder="Twitch Text"
                                  name="largeImageText"
                                  type="text"
                                  value={presence.largeImageText}
                                  onChange={handleChange}
                                  required
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                            <Col>
                              <Grid>
                                <Input
                                  clearable
                                  bordered
                                  label="Small Image Text"
                                  placeholder="My Twitch Logo Text"
                                  name="smallImageText"
                                  type="text"
                                  value={presence.smallImageText}
                                  onChange={handleChange}
                                  required
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                          </Row>
                        </Col>
                        <Text h4>Buttons</Text>
                        <br></br>
                        <Col>
                          <Row justify="center">
                            <Col>
                              <Grid justify="center">
                                <Input
                                  clearable
                                  bordered
                                  labelPlaceholder="First Button Name"
                                  id="oneButton"
                                  name="label"
                                  type="text"
                                  value={presence.buttons[0].label || ""}
                                  onChange={handleChangeButtons}
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                            <Col>
                              <Grid>
                                <Input
                                  clearable
                                  bordered
                                  labelPlaceholder="First Button URL"
                                  id="oneButton"
                                  name="url"
                                  type="text"
                                  value={presence.buttons[0].url || ""}
                                  onChange={handleChangeButtons}
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                          </Row>
                          <Row justify="center">
                            <Col>
                              <Grid justify="center">
                                <br />
                                <Input
                                  clearable
                                  bordered
                                  labelPlaceholder="Second Button Name"
                                  id="twoButton"
                                  name="label"
                                  type="text"
                                  value={presence.buttons[1].label || ""}
                                  onChange={handleChangeButtons}
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                            <Col>
                              <Grid>
                                <br />
                                <Input
                                  clearable
                                  bordered
                                  labelPlaceholder="Second Button URL"
                                  id="twoButton"
                                  name="url"
                                  type="text"
                                  value={presence.buttons[1].url || ""}
                                  onChange={handleChangeButtons}
                                  status="default"
                                  color="default"
                                />
                              </Grid>
                            </Col>
                          </Row>
                        </Col>
                      </Col>
                    </Row>
                  </Grid>

                  <Row justify="center">
                    <Grid>
                      <Row>
                        <Grid>
                          <Button
                            auto
                            color="error"
                            type="button"
                            disabled={appCooldown || isConnected}
                            onPress={handleClose}
                          >
                            <Text>Close</Text>
                          </Button>
                        </Grid>

                        <Grid>
                          <Button
                            auto
                            color={isConnected ? "primary" : "success"}
                            type="submit"
                            disabled={
                              !presence.appId ||
                              !presence.name ||
                              !presence.details ||
                              !presence.state ||
                              !presence.largeImageKey ||
                              !presence.largeImageText ||
                              !presence.smallImageKey ||
                              !presence.smallImageText ||
                              appCooldown
                            }
                          >
                            {router.query.id && isConnected
                              ? "Disconnect"
                              : "Connect"}
                          </Button>
                        </Grid>
                      </Row>
                    </Grid>
                  </Row>
                </Grid.Container>
              </Card.Footer>
            </Card>
          </form>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default NewPresence;
