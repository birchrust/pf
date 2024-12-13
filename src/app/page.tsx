"use client"

import { MyTerminal } from '~/components/react-xterm';
import { XTerm } from '~/components/xterm';

export default function HomePage() {
  const messages = [
    'Welcome to XTerm.js!',
    '',
    'This is a typing effect.',
    '',
    'You can customize speed and delay.',
    '',
    'Enjoy!',
    '',
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <XTerm messages={messages} typingSpeed={70} lineDelay={300} />
      </div>
    </main>
  );
}
