import { Form } from "./components";
import { Text } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <Text
        as="h1"
        align="center"
        fontSize="2xl"
        fontWeight="bold"
        mt={10}
        mb={5}
      >
        Serverless React Example 👋
      </Text>
      <Form />
    </>
  );
};

export default App;
