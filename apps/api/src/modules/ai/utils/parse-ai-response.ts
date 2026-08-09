import { Logger } from '@nestjs/common';
import { ZodSchema } from 'zod';

const logger = new Logger('parseAiResponse');

export function parseAiResponse<T>(raw: string, schema: ZodSchema<T>): T {
  // [1] Sanitize — AI kabhi kabhi backticks ya ```json wrap karta hai
  const sanitized = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '') // leading ```json or ```
    .replace(/\s*```$/i, '') // trailing ```
    .trim();

  // [2] Parse
  let parsed: unknown;
  try {
    parsed = JSON.parse(sanitized);
  } catch (err) {
    logger.error('JSON parse failed. Raw snippet:', sanitized.slice(0, 300));
    throw new Error('AI returned malformed JSON. Cannot parse course data.');
  }

  // [3] Validate with Zod
  const result = schema.safeParse(parsed);
  if (!result.success) {
    logger.error('Zod validation failed:', result.error.flatten());
    throw new Error('AI response failed schema validation.');
  }

  return result.data;
}
