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
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";

interface Inputs {
  name: string;
  age: number;
}

const Form = () => {
  const toast = useToast();
  const [result, setResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const mutation = useMutation(
    (body: Inputs) => axios.post("/.netlify/functions/submit", body),
    {
      onSuccess: (res) => {
        reset();
        setResult(res.data.message);
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast({
            title: err.message,
            status: "error",
            isClosable: true,
            position: "top",
          });
        }
      },
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    toast.closeAll();
    mutation.mutate({ name: values.name, age: values.age });
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
                    <Text>{result} ✅</Text>
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
              <Button
                isLoading={mutation.isLoading}
                loadingText="Submitting"
                colorScheme="blue"
                w="full"
                type="submit"
              >
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
