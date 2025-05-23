'use client';

import React, { useEffect, useRef, useState, useTransition, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleAddGuestbookWish, fetchGuestbookWishes, type Wish } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Loader2, MessageSquarePlus, UserCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialFormState = {
  success: undefined,
  error: undefined,
  fieldErrors: undefined,
  timestamp: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquarePlus className="mr-2 h-4 w-4" />}
      Add Your Wish
    </Button>
  );
}

export default function Guestbook() {
  const [formState, formAction] = useActionState(handleAddGuestbookWish, initialFormState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isPending, startTransition] = useTransition();
  const prevTimestamp = useRef<number | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const loadWishes = () => {
    startTransition(async () => {
      const fetchedWishes = await fetchGuestbookWishes();
      setWishes(fetchedWishes);
    });
  };

  useEffect(() => {
    loadWishes();
  }, []);
  
  useEffect(() => {
    if (formState.timestamp && formState.timestamp !== prevTimestamp.current) {
      if (formState.success) {
        toast({
          title: 'Wish Added!',
          description: 'Thank you for your birthday message.',
        });
        formRef.current?.reset();
        loadWishes(); 
      } else if (formState.error) {
        toast({
          title: 'Error',
          description: formState.error,
          variant: 'destructive',
        });
      }
      prevTimestamp.current = formState.timestamp;
    }
  }, [formState, toast]);


  return (
    <div className="space-y-8">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MessageSquarePlus className="mr-2 h-6 w-6 text-primary" />
            Digital Guestbook
          </CardTitle>
          <CardDescription>Leave your birthday wishes for Aayushi!</CardDescription>
        </CardHeader>
        {hasMounted ? (
          <form action={formAction} ref={formRef}>
            <CardContent className="space-y-4">
              <div>
                <Input name="name" placeholder="Your Name" className="focus:ring-accent" aria-label="Your Name"/>
                {formState.fieldErrors?.name && (
                  <p className="text-sm text-destructive mt-1">{formState.fieldErrors.name.join(', ')}</p>
                )}
              </div>
              <div>
                <Textarea name="message" placeholder="Your birthday message..." rows={4} className="focus:ring-accent" aria-label="Your birthday message"/>
                {formState.fieldErrors?.message && (
                  <p className="text-sm text-destructive mt-1">{formState.fieldErrors.message.join(', ')}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        ) : (
          <>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-36" />
            </CardFooter>
          </>
        )}
      </Card>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary">Warm Wishes:</h3>
        {isPending && wishes.length === 0 && <p className="text-muted-foreground">Loading wishes...</p>}
        {!isPending && !hasMounted && wishes.length === 0 && <p className="text-muted-foreground">Loading wishes...</p> }
        {!isPending && hasMounted && wishes.length === 0 && <p className="text-muted-foreground">Be the first to leave a wish!</p>}
        
        {wishes.map((wish) => (
          <Card key={wish.id} className="shadow-md bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <UserCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-grow">
                  <p className="font-semibold text-card-foreground">{wish.name}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{wish.message}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {hasMounted ? format(new Date(wish.timestamp), "MMMM d, yyyy 'at' h:mm a") : new Date(wish.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
