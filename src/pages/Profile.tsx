import { useState } from "react";
import { User, Settings, Save, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { mockUser } from "../data/mockData";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { useNavigate } from "react-router";

export function Profile() {
  const [user, setUser] = useState(mockUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const cuisines = ["Italian", "Japanese", "Thai", "Chinese", "Mexican", "Indian", "Polish"];
  const diets = ["Vegan", "Vegetarian", "Gluten-Free", "Lactose-Free", "Halal", "Kosher"];
  const priceRanges = ["$", "$$", "$$$", "$$$$"];

  const togglePreference = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleSave = () => {
    toast.success("Profil zaktualizowany pomyślnie!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Toaster />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Profil użytkownika</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="size-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="size-12 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
              <p className="text-sm text-slate-600 mb-4">{user.email}</p>
              <Button variant="outline" className="w-full gap-2">
                <Settings className="size-4" />
                Ustawienia konta
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 mt-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Wyloguj się
              </Button>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5" />
                  Dane osobowe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="size-5" />
                  Preferencje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">
                    Preferowane rodzaje kuchni
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {cuisines.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${cuisine}`}
                          checked={user.preferences.cuisinePreferences.includes(
                            cuisine
                          )}
                          onCheckedChange={() =>
                            setUser({
                              ...user,
                              preferences: {
                                ...user.preferences,
                                cuisinePreferences: togglePreference(
                                  user.preferences.cuisinePreferences,
                                  cuisine
                                ),
                              },
                            })
                          }
                        />
                        <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">
                    Ograniczenia dietetyczne
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {diets.map((diet) => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${diet}`}
                          checked={user.preferences.dietaryRestrictions.includes(
                            diet
                          )}
                          onCheckedChange={() =>
                            setUser({
                              ...user,
                              preferences: {
                                ...user.preferences,
                                dietaryRestrictions: togglePreference(
                                  user.preferences.dietaryRestrictions,
                                  diet
                                ),
                              },
                            })
                          }
                        />
                        <Label htmlFor={`diet-${diet}`}>{diet}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">Przedział cenowy</Label>
                  <div className="flex gap-3">
                    {priceRanges.map((price) => (
                      <div key={price} className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${price}`}
                          checked={user.preferences.priceRange.includes(price)}
                          onCheckedChange={() =>
                            setUser({
                              ...user,
                              preferences: {
                                ...user.preferences,
                                priceRange: togglePreference(
                                  user.preferences.priceRange,
                                  price
                                ),
                              },
                            })
                          }
                        />
                        <Label htmlFor={`price-${price}`}>{price}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full gap-2">
                  <Save className="size-4" />
                  Zapisz zmiany
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
