import z from 'zod';

// User Schema
const userSchema = z.object({
  firstname: z
    .string()
    .min(3, 'Minimum 03 chararcters are required in firstName')
    .max(50, 'Maximum 50 characters are allowed in the firstName'),
  lastname: z
    .string()
    .min(3, 'Minimum 03 chararcters are required in lastname')
    .max(50, 'Maximum 50 characters are allowed in the lastname')
    .optional(),
  email: z.email().max(128, 'Maximum 128 characters are required in the email'),
  password: z
    .string()
    .length(60, 'Invalid bcrypt hash length')
    .regex(/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/, 'Invalid bcrypt hash'),
  socketId: z.string().optional(),
});

const registerBodySchema = z.object({
  firstname: z
    .string()
    .min(3, 'Minimum 03 chararcters are required in firstName')
    .max(50, 'Maximum 50 characters are allowed in the firstName'),
  lastname: z
    .string()
    .min(3, 'Minimum 03 chararcters are required in lastname')
    .max(50, 'Maximum 50 characters are allowed in the lastname')
    .optional(),
  email: z.email().max(128, 'Maximum 128 characters are allowed in the email'),
  password: z
    .string()
    .min(6, 'Password must have minimum 06 characters')
    .max(16, 'Password must have maximum 16 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/),
});

const loginBodySchema = z.object({
  email: z.email().max(128, 'Maximum 128 characters are required in the email'),
  password: z.string().max(16, 'Password must have maximum 16 characters'),
});

export { userSchema, registerBodySchema, loginBodySchema };
