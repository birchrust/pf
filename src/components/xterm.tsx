'use client'

import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';

import { useRouter } from 'next/navigation';

interface XTermProps {
    messages: any
    typingSpeed: number
    lineDelay: number
}

export function XTerm({ messages, typingSpeed = 100, lineDelay = 500 }: XTermProps) {
    const xtermRef = useRef<Terminal>();
    const ref = useRef<HTMLDivElement>(null);

    const router = useRouter()

    useEffect(() => {
        if (!ref.current || xtermRef.current) return;

        const xterm = new Terminal();
        xterm.open(ref.current);
        xtermRef.current = xterm;

        let lineIndex = 0;

        let userInputBuffer = '';

        const typeMessage = (message: any) => {
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < message.length) {
                    xterm.write(message[charIndex]!);
                    charIndex++;
                    setTimeout(typeChar, typingSpeed);
                } else {
                    xterm.write('\r\n');
                    lineIndex++;
                    if (lineIndex < messages.length) {
                        setTimeout(() => typeMessage(messages[lineIndex]!), lineDelay);
                    } else {
                        enableUserInput(); // Enable user input after all messages
                    }
                }
            };
            typeChar();
        };

        const enableUserInput = () => {
            xterm.write('> '); // Display prompt

            const handleData = (data: string) => {
                if (typeof data !== 'string') return; // Ensure data is a string

                if (data === '\r') { // Enter key pressed
                    xterm.write('\r\n'); // Add a new line
                    router.push('/home')
                    userInputBuffer = ''; // Clear the buffer after submission
                } else if (data === '\x7f' || data === '\b') { // Backspace/Delete key pressed
                    console.log("Backspace/Delete pressed");

                    if (userInputBuffer.length > 0) {
                        userInputBuffer = userInputBuffer.slice(0, -1); // Remove last character
                        xterm.write('\b \b'); // Remove last character from terminal display
                    }
                } else {
                    userInputBuffer += data; // Add data to buffer
                    xterm.write(data); // Echo the input
                }
            };

            xterm.onData(handleData); // Listen for user input


        };

        if (messages.length > 0) {
            typeMessage(messages[lineIndex]);
        }

        return () => {
            xterm.dispose(); // 清理终端实例
        };
    }, [messages, typingSpeed, lineDelay]);

    return (
        <div
            ref={ref}
            className="fixed inset-0 text-white ml-8 mt-8"
            style={{
                width: "100%",
                whiteSpace: 'pre-wrap', // Ensure text wraps
                wordWrap: 'break-word', // Allow breaking long words
            }}
        />
    );
}
