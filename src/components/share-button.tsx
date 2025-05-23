'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ShareButton() {
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
        // Handle error or cancellation - often users cancel share dialog
        if ((err as Error).name !== 'AbortError') {
         toast({ title: 'Error Sharing', description: 'Could not share the page. Please try copying the link.', variant: 'destructive' });
        }
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: 'Link Copied!', description: 'Birthday page link copied to clipboard.' });
      } catch (err) {
        toast({ title: 'Error Copying Link', description: 'Could not copy link to clipboard.', variant: 'destructive' });
      }
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
      <Share2 className="mr-2 h-4 w-4" />
      Share the Joy
    </Button>
  );
}
