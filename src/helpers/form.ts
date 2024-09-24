export const checkPasswordConfirmation = (
  value: string,
  { password }: { password: string }
) => (value !== password ? "The passwords do not match" : true);
