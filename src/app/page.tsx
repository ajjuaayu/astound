import PortraitDisplay from '@/components/portrait-display';
import MemoryGallery from '@/components/memory-gallery';
import WishAnalyzer from '@/components/wish-analyzer';
import Guestbook from '@/components/guestbook';
import ShareButton from '@/components/share-button';
import Confetti from '@/components/confetti';
import { Separator } from '@/components/ui/separator';
import { Gift, Camera, BookOpen, Feather } from 'lucide-react';

export default function BirthdayPage() {
  return (
    <>
      <Confetti />
      <div className="min-h-screen flex flex-col items-center p-4 md:p-8 selection:bg-primary/30 selection:text-primary-foreground">
        <header className="text-center my-8 md:my-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-accent">
              Happy Birthday, Aayushi!
            </span>
          </h1>
          <p className="mt-3 text-lg md:text-xl text-muted-foreground">
            Celebrating Your Radiant Day!
          </p>
        </header>

        <main className="w-full max-w-5xl space-y-12 md:space-y-16">
          <section id="portrait" aria-labelledby="portrait-heading" className="flex flex-col items-center">
             <h2 id="portrait-heading" className="sr-only">Aayushi&apos;s Portrait</h2>
            <PortraitDisplay />
          </section>

          <Separator className="bg-primary/20 h-0.5"/>

          <section id="gallery" aria-labelledby="gallery-heading" className="space-y-6">
            <h2 id="gallery-heading" className="flex items-center text-2xl md:text-3xl font-semibold text-primary">
              <Camera className="mr-3 h-7 w-7" />
              Moments to Cherish
            </h2>
            <MemoryGallery />
          </section>

          <Separator className="bg-primary/20 h-0.5"/>
          
          <section id="ai-wishes" aria-labelledby="ai-wishes-heading" className="space-y-6">
             <h2 id="ai-wishes-heading" className="sr-only">AI Wish Analyzer</h2>
            <WishAnalyzer />
          </section>

          <Separator className="bg-primary/20 h-0.5"/>

          <section id="guestbook" aria-labelledby="guestbook-heading" className="space-y-6">
            <h2 id="guestbook-heading" className="sr-only">Guestbook</h2>
            <Guestbook />
          </section>
          
          <Separator className="bg-primary/20 h-0.5"/>

          <section id="share" aria-labelledby="share-heading" className="text-center py-8">
            <h2 id="share-heading" className="flex items-center justify-center text-2xl md:text-3xl font-semibold text-primary mb-6">
              <Gift className="mr-3 h-7 w-7" />
              Spread the Celebration!
            </h2>
            <ShareButton />
          </section>
        </main>

        <footer className="w-full max-w-5xl text-center py-8 mt-12 border-t border-primary/20">
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-red-500">❤</span> for Aayushi&apos;s special day.
          </p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            Note: The "Birthday Automation" feature (automated scheduling) is a backend task and not implemented in this UI-focused demo.
          </p>
        </footer>
      </div>
    </>
  );
}
