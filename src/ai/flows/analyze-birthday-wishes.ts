// use server'

/**
 * @fileOverview Analyzes birthday wishes using AI to identify common themes and positive sentiments.
 *
 * - analyzeBirthdayWishes - A function that handles the analysis of birthday wishes.
 * - AnalyzeBirthdayWishesInput - The input type for the analyzeBirthdayWishes function.
 * - AnalyzeBirthdayWishesOutput - The return type for the analyzeBirthdayWishes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBirthdayWishesInputSchema = z.object({
  wishes: z
    .array(z.string())
    .describe('An array of birthday wishes to analyze.'),
});
export type AnalyzeBirthdayWishesInput = z.infer<
  typeof AnalyzeBirthdayWishesInputSchema
>;

const AnalyzeBirthdayWishesOutputSchema = z.object({
  themes: z
    .array(z.string())
    .describe('Common themes identified in the birthday wishes.'),
  sentimentSummary: z
    .string()
    .describe('A summary of the overall sentiment expressed in the wishes.'),
  emojiSummary: z.string().describe('An emoji summary of the wishes'),
});
export type AnalyzeBirthdayWishesOutput = z.infer<
  typeof AnalyzeBirthdayWishesOutputSchema
>;

export async function analyzeBirthdayWishes(
  input: AnalyzeBirthdayWishesInput
): Promise<AnalyzeBirthdayWishesOutput> {
  return analyzeBirthdayWishesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBirthdayWishesPrompt',
  input: {schema: AnalyzeBirthdayWishesInputSchema},
  output: {schema: AnalyzeBirthdayWishesOutputSchema},
  prompt: `You are an AI sentiment analyzer specializing in birthday wishes.

  Analyze the following birthday wishes to identify common themes and the overall sentiment.  Summarize the sentiment with text and emojis.

Wishes:
{{#each wishes}}
- {{{this}}}
{{/each}}`,
});

const analyzeBirthdayWishesFlow = ai.defineFlow(
  {
    name: 'analyzeBirthdayWishesFlow',
    inputSchema: AnalyzeBirthdayWishesInputSchema,
    outputSchema: AnalyzeBirthdayWishesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
