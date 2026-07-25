import 'dotenv/config';

import { z } from 'zod';
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(32),
  DATABASE_URL: z.url(),
  CLIENT_URL: z.url(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
