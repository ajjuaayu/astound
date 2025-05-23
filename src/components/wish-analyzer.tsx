'use client';

import React, { useState, useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleAnalyzeWishes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
  result: undefined,
  error: undefined,
  timestamp: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Analyze Wishes
    </Button>
  );
}

export default function WishAnalyzer() {
  const [state, formAction] = useActionState(handleAnalyzeWishes, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const prevTimestamp = useRef<number | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (state.timestamp && state.timestamp !== prevTimestamp.current) {
      if (state.error) {
        toast({
          title: 'Analysis Error',
          description: state.error,
          variant: 'destructive',
        });
      } else if (state.result) {
        toast({
          title: 'Analysis Complete!',
          description: 'Wishes analyzed successfully.',
        });
      }
      prevTimestamp.current = state.timestamp;
    }
  }, [state, toast]);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          AI Birthday Wish Analyzer
        </CardTitle>
        <CardDescription>
          Enter birthday wishes (one per line) to see common themes and sentiments.
        </CardDescription>
      </CardHeader>
      {hasMounted ? (
        <form action={formAction} ref={formRef}>
          <CardContent className="space-y-4">
            <Textarea
              name="wishes"
              placeholder="Happy Birthday Aayushi!\nWishing you lots of joy!\nHave a great year ahead!"
              rows={5}
              className="focus:ring-accent"
              aria-label="Enter birthday wishes"
            />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      ) : (
        <>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" /> {/* Placeholder for textarea */}
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-40" /> {/* Placeholder for button */}
          </CardFooter>
        </>
      )}
      {state.result && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">Analysis Results:</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-lg">Sentiment Summary:</h4>
              <p className="text-muted-foreground">{state.result.sentimentSummary}</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">Emoji Summary:</h4>
              <p className="text-3xl">{state.result.emojiSummary}</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">Common Themes:</h4>
              {state.result.themes.length > 0 ? (
                <ul className="list-none space-y-1">
                  {state.result.themes.map((theme, index) => (
                    <li key={index} className="flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-accent" /> 
                      {theme}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific themes identified.</p>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
