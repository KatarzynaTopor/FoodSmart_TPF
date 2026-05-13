import { Outlet, Link, useLocation } from "react-router";
import { Home, UtensilsCrossed, MessageSquare, User, Heart, Star, PlusCircle, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const [isAdmin, setIsAdmin] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <UtensilsCrossed className="size-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">FoodSmart</h1>
                <p className="text-xs text-slate-500">Znajdź swoją idealną restaurację</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 text-sm ${
                  isActive("/") ? "text-orange-500 font-medium" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Home className="size-4" />
                Strona główna
              </Link>
              <Link
                to="/restaurants"
                className={`flex items-center gap-2 text-sm ${
                  isActive("/restaurants") ? "text-orange-500 font-medium" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UtensilsCrossed className="size-4" />
                Restauracje
              </Link>
              <Link
                to="/chat"
                className={`flex items-center gap-2 text-sm ${
                  isActive("/chat") ? "text-orange-500 font-medium" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MessageSquare className="size-4" />
                Chatbot
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/favorites"
                    className={`flex items-center gap-2 text-sm ${
                      isActive("/favorites") ? "text-orange-500 font-medium" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Heart className="size-4" />
                    Ulubione
                  </Link>
                  <Link
                    to="/my-reviews"
                    className={`flex items-center gap-2 text-sm ${
                      isActive("/my-reviews") ? "text-orange-500 font-medium" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Star className="size-4" />
                    Moje opinie
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Shield className="size-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link to="/add-restaurant">
                    <Button variant="outline" size="sm" className="gap-2">
                      <PlusCircle className="size-4" />
                      Dodaj
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button size="sm" className="gap-2">
                      <User className="size-4" />
                      Profil
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Logowanie
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Rejestracja</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">FoodSmart</h3>
              <p className="text-sm text-slate-400">
                Twój przewodnik po najlepszych restauracjach w Polsce
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Linki</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/" className="hover:text-white">Strona główna</Link></li>
                <li><Link to="/restaurants" className="hover:text-white">Restauracje</Link></li>
                <li><Link to="/chat" className="hover:text-white">Rekomendacje</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Konto</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/profile" className="hover:text-white">Profil</Link></li>
                <li><Link to="/favorites" className="hover:text-white">Ulubione</Link></li>
                <li><Link to="/my-reviews" className="hover:text-white">Moje opinie</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-sm text-slate-400">
                kontakt@foodsmart.pl<br />
                +48 123 456 789
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            © 2026 FoodSmart. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>
    </div>
  );
}
