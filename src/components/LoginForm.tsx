import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function LoginForm() {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormLabel marginTop='16px'>Password</FormLabel>
      <Input type="password" />
    </FormControl>
  );
}
