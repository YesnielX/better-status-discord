import { Button, Navbar, Switch, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";

const AppNavbar = ({ children }) => {
  const { setTheme } = useNextTheme();

  const { isDark } = useTheme();

  return (
    <>
      <Navbar isBordered maxWidth={"fluid"} variant={"sticky"}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn={"xs"}>
            <Link href="/">
              <Text>Better Status</Text>
            </Link>
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Link href="/">
            <Navbar.Link isActive>Home</Navbar.Link>
          </Link>
          <Navbar.Link href="/about">About</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat>
              <Link href="/">
                <Text>Discord</Text>
              </Link>
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {children}
    </>
  );
};

export default AppNavbar;
