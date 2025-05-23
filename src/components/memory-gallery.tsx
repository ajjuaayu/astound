'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Memory {
  id: string;
  src: string;
  alt: string;
  aiHint: string;
}

const memories: Memory[] = [
  { id: '1', src: 'https://raw.githubusercontent.com/ajjuaayu/astound/refs/heads/master/Untitled%20design%20(3).png', alt: 'Memory 1', aiHint: 'friends celebration' },
  { id: '2', src: 'https://raw.githubusercontent.com/ajjuaayu/astound/refs/heads/master/Untitled%20design%20(3).png', alt: 'Memory 2', aiHint: 'happy moment' },
  { id: '3', src: 'https://placehold.co/400x300.png', alt: 'Memory 3', aiHint: 'group photo' },
  { id: '4', src: 'https://placehold.co/400x300.png', alt: 'Memory 4', aiHint: 'birthday party' },
  { id: '5', src: 'https://placehold.co/400x300.png', alt: 'Memory 5', aiHint: 'travel adventure' },
  { id: '6', src: 'https://placehold.co/400x300.png', alt: 'Memory 6', aiHint: 'family gathering' },
];

export default function MemoryGallery() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border border-primary/30 shadow-lg">
      <div className="flex w-max space-x-4 p-4">
        {memories.map((memory) => (
          <Card key={memory.id} className="w-[300px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={memory.aiHint}
                  className="rounded-t-md"
                />
              </div>
              <div className="p-3 bg-card">
                <p className="text-sm text-center text-card-foreground">{memory.alt}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
