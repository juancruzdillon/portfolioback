import EmailApiDocs from '@/components/EmailApiDocs';
import { Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold ml-4 text-foreground">EmailJet</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Your Simple and Reliable API for Sending Emails
        </p>
      </header>
      <main className="w-full max-w-3xl">
        <EmailApiDocs />
      </main>
      <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} EmailJet. Powered by Next.js & Nodemailer.</p>
      </footer>
    </div>
  );
}
