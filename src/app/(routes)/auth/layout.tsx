import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
    <main className="container mx-auto px-4 grid place-items-center h-full">
        {children}
    </main>
    );
  }