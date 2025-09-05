import { z } from 'zod';

const VALIDATIONS_FACTORY = {
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/,
      'Password must contain letters, numbers, and special symbols'
    ),
  name: z.string().min(2).max(100),
};

export default VALIDATIONS_FACTORY;