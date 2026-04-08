import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import january from '@/assets/months/january.jpg';
import february from '@/assets/months/february.jpg';
import march from '@/assets/months/march.jpg';
import april from '@/assets/months/april.jpg';
import may from '@/assets/months/may.jpg';
import june from '@/assets/months/june.jpg';
import july from '@/assets/months/july.jpg';
import august from '@/assets/months/august.jpg';
import september from '@/assets/months/september.jpg';
import october from '@/assets/months/october.jpg';
import november from '@/assets/months/november.jpg';
import december from '@/assets/months/december.jpg';

const MONTH_IMAGES: Record<number, string> = {
  0: january, 1: february, 2: march, 3: april,
  4: may, 5: june, 6: july, 7: august,
  8: september, 9: october, 10: november, 11: december,
};

interface HeroSectionProps {
  monthName: string;
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function HeroSection({ monthName, year, month, onPrevMonth, onNextMonth }: HeroSectionProps) {
  const image = MONTH_IMAGES[month];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={month}
          src={image}
          alt={`${monthName} seasonal landscape`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Diagonal blue overlay on the right */}
      <div className="absolute inset-0">
        <svg
          className="absolute right-0 top-0 h-full"
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
          style={{ width: '40%' }}
        >
          <polygon
            className="hidden md:block"
            points="0,0 400,0 400,500 0,500 100,250"
            fill="black"
            fillOpacity="0.4"
          />
        </svg>
      </div>

      {/* Subtle gradient at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/40 to-transparent" />

      {/* Year and month text on the overlay */}
      <div className="absolute right-6 top-3/4 z-10 -translate-y-1/2 text-right sm:right-5 lg:right-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-2xl font-bold tracking-wide text-primary-foreground sm:text-3xl lg:text-4xl">
              {year}
            </p>
            <p className="font-display text-4xl font-bold uppercase tracking-tight text-primary-foreground sm:text-5xl lg:text-7xl">
              {monthName}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Month navigation arrows */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="rounded-full bg-primary-foreground/20 p-2 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            className="rounded-full bg-primary-foreground/20 p-2 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
