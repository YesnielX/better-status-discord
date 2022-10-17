import { Button, Navbar, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const AppNavbar = ({ children }) => {
  return (
    <>
      <Navbar isBordered maxWidth={"fluid"} variant={"sticky"}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn={"xs"}>
            <Text h3>Better Status</Text>
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant={"default"}>
          <Link href="/">
            <Navbar.Link isActive>Home</Navbar.Link>
          </Link>
          <Link href="/new">
            <Navbar.Link>About</Navbar.Link>
          </Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button
              auto
              flat
              icon={
                <Image
                  src="discord-logo.svg"
                  alt="discord-logo"
                  width="25"
                  height="25"
                />
              }
            >
              <Link href="/">
                <Text>Discord</Text>
              </Link>
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button
              auto
              flat
              icon={
                <Image
                  src="/github-logoo.svg"
                  alt="github-logo"
                  width="25"
                  height="25"
                />
              }
            >
              <Link href="/">
                <Text>GitHub</Text>
              </Link>
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {children}
    </>
  );
};

export default AppNavbar;
