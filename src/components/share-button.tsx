'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function ShareButton() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: "Aayushi's Radiant Birthday Canvas",
      text: "Join me in celebrating Aayushi's birthday!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({ title: 'Shared!', description: 'Birthday page shared successfully.' });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
         toast({ title: 'Error Sharing', description: 'Could not share the page. Please try copying the link.', variant: 'destructive' });
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: 'Link Copied!', description: 'Birthday page link copied to clipboard.' });
      } catch (err) {
        toast({ title: 'Error Copying Link', description: 'Could not copy link to clipboard.', variant: 'destructive' });
      }
    }
  };

  if (!hasMounted) {
    return <Skeleton className="h-10 w-36" />; // Placeholder for the button
  }

  return (
    <Button onClick={handleShare} variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
      <Share2 className="mr-2 h-4 w-4" />
      Share the Joy
    </Button>
  );
}
