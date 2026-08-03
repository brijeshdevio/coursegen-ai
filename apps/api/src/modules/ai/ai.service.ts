import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

import { env } from '../../config';
import { COURSE_SYSTEM_PROMPT } from '../../constants';
import { GenerateCourseDto } from '../course/dto/generate-course.dto';
import { CourseResponse, CourseResponseSchema } from './dto/ai-response.dto';
import { parseAiResponse } from './utils/parse-ai-response';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async generateCourse(data: GenerateCourseDto): Promise<CourseResponse> {
    const { createGroq } = await import('@ai-sdk/groq');
    const { generateText } = await import('ai');
    const groq = createGroq({ apiKey: env.GROQ_API_KEY });
    let rawText: string;
    // [1] Call AI — network/API errors handle karo
    try {
      const model = groq('llama-3.3-70b-versatile');
      const { text } = await generateText({
        model,
        system: COURSE_SYSTEM_PROMPT,
        prompt: `Generate a complete course for topic: "${data.topic}" at ${data.level} level.`,
        temperature: 0.3,
      });
      rawText = text;
      this.logger.debug(`AI response received. Length: ${rawText.length}`);
    } catch (err) {
      this.logger.error('Groq API call failed:', err);
      throw new InternalServerErrorException(
        'AI service is unavailable. Please try again.',
      );
    }

    // [2] Parse + Validate
    try {
      const course = parseAiResponse(rawText, CourseResponseSchema);
      this.logger.log(
        `Course generated: "${course.title}" | Modules: ${course.modules.length}`,
      );
      return course;
    } catch (err) {
      this.logger.error('Course parsing failed. Raw text logged above.');
      throw new InternalServerErrorException(
        'Failed to process AI response. Please retry — the model may have returned incomplete data.',
      );
    }
  }
}
