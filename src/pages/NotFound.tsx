import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-300">404</h1>
        <h2 className="text-3xl font-bold mb-4">Strona nie znaleziona</h2>
        <p className="text-slate-600 mb-8">
          Przepraszamy, strona której szukasz nie istnieje.
        </p>
        <Link to="/">
          <Button className="gap-2" size="lg">
            <Home className="size-5" />
            Wróć do strony głównej
          </Button>
        </Link>
      </div>
    </div>
  );
}
