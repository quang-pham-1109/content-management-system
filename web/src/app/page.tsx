'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export default Home;
