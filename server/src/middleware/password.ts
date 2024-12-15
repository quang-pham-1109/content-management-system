import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const saltRounds: number = 10;
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const match: boolean = await bcrypt.compare(password, hashedPassword);
  return match;
};
