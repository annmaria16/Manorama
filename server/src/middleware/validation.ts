import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const sourceInputSchema = z.object({
  title: z.string().max(300).optional(),
  sourceType: z.enum(['transcript', 'notes', 'draft', 'brief'], {
    errorMap: () => ({ message: 'Invalid source type. Must be one of: transcript, notes, draft, brief' })
  }),
  sourceLanguage: z.string().min(2, 'Source language is required'),
  targetLanguage: z.enum(['en', 'ml', 'hi'], {
    errorMap: () => ({ message: 'Target language must be one of: en (English), ml (Malayalam), hi (Hindi)' })
  }),
  articleStyle: z.enum(['standard', 'formal', 'feature'], {
    errorMap: () => ({ message: 'Article style must be one of: standard, formal, feature' })
  }),
  content: z.string()
    .min(25, 'Source content is too short. Please provide at least 25 characters of news material.')
    .max(50000, 'Source content exceeds maximum allowable length of 50,000 characters.'),
  editorialInstructions: z.string().max(1000).optional()
});

export const factCheckSchema = z.object({
  sourceContent: z.string().min(25, 'Source content required for verification.'),
  articleText: z.string().min(25, 'Article text required for verification.'),
  targetLanguage: z.enum(['en', 'ml', 'hi'])
});

export const editorialRefineSchema = z.object({
  action: z.enum(['headline', 'tone', 'grammar', 'shorten', 'expand']),
  text: z.string().min(5, 'Text to refine must be at least 5 characters.'),
  targetLanguage: z.enum(['en', 'ml', 'hi']),
  context: z.string().optional()
});

export const similaritySchema = z.object({
  articleA: z.string().min(20, 'First article text is required.'),
  articleB: z.string().min(20, 'Second article text is required.')
});

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      res.status(400).json({
        error: 'Validation failed',
        details: issues
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
