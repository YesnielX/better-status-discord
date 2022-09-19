import {
  Button,
  Input,
  Link,
  Navbar,
  Switch,
  Text,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

const AppNavbar = () => {
  const { setTheme } = useNextTheme();

  const { isDark, type } = useTheme();

  return (
    <Navbar isBordered maxWidth={"fluid"} variant={"sticky"}>
      <Navbar.Brand>
        <Text b color="inherit" hideIn={"xs"}>
          Better Status
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link isActive href="/">
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Discord
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
  );
};

export default AppNavbar;
