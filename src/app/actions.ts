'use server';

import { z } from 'zod';
import { analyzeBirthdayWishes as analyzeBirthdayWishesFlow, type AnalyzeBirthdayWishesOutput } from '@/ai/flows/analyze-birthday-wishes';
import { addWish as addGuestbookWish, getWishes as getGuestbookWishes, type Wish } from '@/lib/guestbook-store';
import { revalidatePath } from 'next/cache';

const analyzeWishesSchema = z.object({
  wishes: z.string().min(1, 'Please enter some wishes to analyze.'),
});

interface AnalyzeWishesState {
  result?: AnalyzeBirthdayWishesOutput;
  error?: string;
  timestamp?: number;
}

export async function handleAnalyzeWishes(
  prevState: AnalyzeWishesState,
  formData: FormData
): Promise<AnalyzeWishesState> {
  const validatedFields = analyzeWishesSchema.safeParse({
    wishes: formData.get('wishes'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.wishes?.join(', '),
      timestamp: Date.now(),
    };
  }

  const wishesArray = validatedFields.data.wishes.split('\n').map(wish => wish.trim()).filter(wish => wish.length > 0);

  if (wishesArray.length === 0) {
    return {
      error: 'No valid wishes found. Please enter each wish on a new line.',
      timestamp: Date.now(),
    };
  }

  try {
    const result = await analyzeBirthdayWishesFlow({ wishes: wishesArray });
    return { result, timestamp: Date.now() };
  } catch (error) {
    console.error('Error analyzing wishes:', error);
    return { error: 'Failed to analyze wishes. Please try again.', timestamp: Date.now() };
  }
}


const addWishSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  message: z.string().min(1, 'Message is required.'),
});

interface AddWishState {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    message?: string[];
  };
  timestamp?: number;
}

export async function handleAddGuestbookWish(
  prevState: AddWishState,
  formData: FormData
): Promise<AddWishState> {
  const validatedFields = addWishSchema.safeParse({
    name: formData.get('name'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      error: "Please correct the errors in the form.",
      timestamp: Date.now(),
    };
  }

  try {
    addGuestbookWish(validatedFields.data.name, validatedFields.data.message);
    revalidatePath('/'); // Revalidate the page to show the new wish
    return { success: true, timestamp: Date.now() };
  } catch (error) {
    console.error('Error adding wish:', error);
    return { error: 'Failed to add wish. Please try again.', timestamp: Date.now() };
  }
}

export async function fetchGuestbookWishes(): Promise<Wish[]> {
  return getGuestbookWishes();
}
