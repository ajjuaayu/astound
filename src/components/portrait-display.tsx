
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function PortraitDisplay() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl overflow-hidden rounded-xl border-4 border-primary/50">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/aayushi-portrait.jpeg" // Updated image path
            alt="Aayushi's Portrait"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            data-ai-hint="portrait woman" // Kept the hint, can be adjusted if needed
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}
