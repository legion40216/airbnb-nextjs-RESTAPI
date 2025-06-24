import { ReactNode } from "react";
import Navbar from "./(home)/_modules/components/layout/navbar";
import Footer from "./(home)/_modules/components/layout/footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
  <div className="grid grid-rows-[min-content_1fr_min-content] 
  min-h-full w-full gap-4">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      
      <main className="container mx-auto px-4">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
