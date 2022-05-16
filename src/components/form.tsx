import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Button,
  Box,
  Container,
  Fade,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  name: string;
  age: number;
}

const Form = () => {
  const [result, setResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      body: JSON.stringify({ name: values.name, age: values.age }),
    }).then((res) => res.json());
    reset();
    setResult(res);
  };

  return (
    <>
      <Box as="main">
        <Container>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5} border="1px solid #DDD" p={7} rounded="lg">
              {result && (
                <Box>
                  <Fade in>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                  </Fade>
                </Box>
              )}
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required fill",
                    },
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Name only alphabet",
                    },
                  })}
                  id="name"
                  type="text"
                  placeholder="Input your name..."
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.age}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  {...register("age", {
                    required: {
                      value: true,
                      message: "Age is required fill",
                    },
                    min: {
                      value: 17,
                      message: "Minimum age 17 years old",
                    },
                    max: {
                      value: 75,
                      message: "Maximum age 75 years old",
                    },
                  })}
                  id="age"
                  type="number"
                  placeholder="Input your age..."
                />
                {errors.age && (
                  <FormErrorMessage>{errors.age.message}</FormErrorMessage>
                )}
                <FormHelperText>
                  Minimum 17 years old, Maximum 75 years old
                </FormHelperText>
              </FormControl>
              <Button colorScheme="blue" w="full" type="submit">
                Submit
              </Button>
            </VStack>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Form;