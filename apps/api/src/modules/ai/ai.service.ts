import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

import { env } from '../../config';
import { COURSE_SYSTEM_PROMPT } from '../../constants';

@Injectable()
export class AiService {
  private groq = createGroq({
    apiKey: env.GROQ_API_KEY,
  });

  async generateCourse(topic: string) {
    const { text } = await generateText({
      model: this.groq('llama-3.3-70b-versatile'),
      system: COURSE_SYSTEM_PROMPT,
      prompt: `Generate a course for: ${topic}`,
    });

    const parsed = this.parseResponse(text);

    if (!parsed) {
      throw new InternalServerErrorException('Failed to parse AI response');
    }

    return parsed;
  }

  private parseResponse(raw: string) {
    try {
      const cleaned = raw
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      if (
        !parsed.title ||
        !parsed.description ||
        !parsed.chapters?.length ||
        !parsed.resources?.length
      ) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }
}
