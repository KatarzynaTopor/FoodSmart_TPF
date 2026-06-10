import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({ email, name: credential.user.displayName ?? email.split("@")[0] }));
      toast.success("Zalogowano pomyślnie!");
      setTimeout(() => { navigate("/profile"); }, 1000);
    } catch (err: any) {
      const msg: Record<string, string> = {
        "auth/invalid-credential": "Nieprawidłowy email lub hasło",
        "auth/user-not-found": "Nie znaleziono konta z tym adresem email",
        "auth/wrong-password": "Nieprawidłowe hasło",
        "auth/too-many-requests": "Zbyt wiele prób. Spróbuj ponownie za chwilę",
      };
      toast.error(msg[err.code] ?? "Błąd logowania. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Logowanie</CardTitle>
          <p className="text-sm text-slate-600 mt-2">
            Zaloguj się do swojego konta FoodSmart
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="twoj@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <LogIn className="size-4" />
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Nie masz konta?{" "}
              <Link to="/register" className="text-orange-500 hover:underline">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
