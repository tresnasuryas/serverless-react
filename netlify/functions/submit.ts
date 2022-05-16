import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const { name, age } = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      name,
      age,
      message: `My name is ${name} and i am ${age} years old`,
    }),
  };
};
