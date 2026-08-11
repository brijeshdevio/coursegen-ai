import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

import { env } from '../../config';
import {
  COURSE_SYSTEM_PROMPT,
  COURSE_TOPIC_SYSTEM_PROMPT,
} from '../../constants';
import { GenerateCourseDto } from '../course/dto/generate-course.dto';
import { CourseResponse, CourseResponseSchema } from './dto/ai-response.dto';
import { parseAiResponse } from './utils/parse-ai-response';
import { GenerateCourseTopicDto } from '../course/dto/generate-course-topic.dto';

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

  async generateCourseTopic(dto: GenerateCourseTopicDto): Promise<string> {
    let rawText: string;
    const { createGroq } = await import('@ai-sdk/groq');
    const { generateText } = await import('ai');
    const groq = createGroq({ apiKey: env.GROQ_API_KEY });

    try {
      const model = groq('llama-3.3-70b-versatile');
      const { text } = await generateText({
        model,
        system: COURSE_TOPIC_SYSTEM_PROMPT,
        prompt: `
Course: "${dto.courseTitle}"
Module: "${dto.moduleTitle}"
Topic: "${dto.topicTitle}"
Level: ${dto.level}

Generate complete educational content for this topic.
      `.trim(),
        temperature: 0.4, // thoda creative content chahiye, 0 se zyada
      });

      rawText = text.trim();
      this.logger.debug(
        `Topic content generated. Length: ${rawText.length} chars`,
      );
    } catch (err) {
      this.logger.error('Groq API failed for topic generation:', err);
      throw new InternalServerErrorException(
        'AI service unavailable. Please retry.',
      );
    }

    // Sanity check — markdown quality validate karo
    this.validateMarkdownContent(rawText, dto.topicTitle);

    return rawText;
  }

  private validateMarkdownContent(content: string, topicTitle: string): void {
    const MIN_LENGTH = 300; // characters

    if (content.length < MIN_LENGTH) {
      this.logger.error(
        `Topic "${topicTitle}" — content too short: ${content.length} chars`,
      );
      throw new InternalServerErrorException(
        'AI returned insufficient content. Please retry.',
      );
    }

    if (!content.includes('#')) {
      this.logger.error(`Topic "${topicTitle}" — no markdown headings found`);
      throw new InternalServerErrorException(
        'AI returned unstructured content. Please retry.',
      );
    }
  }
}
