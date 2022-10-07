import { Grid } from "@nextui-org/react";

const Prensences = ({ children }) => {
  return (
    <Grid.Container gap={2} justify="center">
      {children}
    </Grid.Container>
  );
};

export default Prensences;
