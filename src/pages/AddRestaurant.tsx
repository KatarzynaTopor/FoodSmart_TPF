import { useState } from "react";
import { PlusCircle, MapPin, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export function AddRestaurant() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState<string>("$$");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  const cuisines = ["Italian", "Japanese", "Thai", "Chinese", "Mexican", "Indian", "Polish", "American"];
  const diets = ["Vegan", "Vegetarian", "Gluten-Free", "Lactose-Free"];

  const toggleItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !city || !address || !description) {
      toast.error("Proszę wypełnić wszystkie wymagane pola");
      return;
    }

    if (selectedCuisines.length === 0) {
      toast.error("Wybierz co najmniej jeden rodzaj kuchni");
      return;
    }

    toast.success("Restauracja została dodana! Czeka na moderację.");
    
    // Reset form
    setName("");
    setCity("");
    setAddress("");
    setPhone("");
    setWebsite("");
    setDescription("");
    setPriceRange("$$");
    setSelectedCuisines([]);
    setSelectedDiets([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Toaster />
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <PlusCircle className="size-8 text-orange-500" />
          <div>
            <h1 className="text-3xl font-bold">Dodaj restaurację</h1>
            <p className="text-sm text-slate-600 mt-1">
              Pomóż innym odkryć nowe miejsca
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informacje o restauracji</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Podstawowe informacje</h3>
                <div>
                  <Label htmlFor="name">
                    Nazwa restauracji <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="np. Green Bistro"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">
                      Miasto <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="np. Warsaw"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceRange">Przedział cenowy</Label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$ (Budżetowe)</SelectItem>
                        <SelectItem value="$$">$$ (Średnie)</SelectItem>
                        <SelectItem value="$$$">$$$ (Drogie)</SelectItem>
                        <SelectItem value="$$$$">$$$$ (Bardzo drogie)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">
                    Adres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ul. Marszałkowska 123"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">
                    Opis <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Opisz restaurację..."
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Kontakt</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Strona internetowa</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Cuisines */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Rodzaj kuchni <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cuisines.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cuisine-${cuisine}`}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={() =>
                          setSelectedCuisines(toggleItem(selectedCuisines, cuisine))
                        }
                      />
                      <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dietary Options */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Opcje dietetyczne</h3>
                <div className="grid grid-cols-2 gap-3">
                  {diets.map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={`diet-${diet}`}
                        checked={selectedDiets.includes(diet)}
                        onCheckedChange={() =>
                          setSelectedDiets(toggleItem(selectedDiets, diet))
                        }
                      />
                      <Label htmlFor={`diet-${diet}`}>{diet}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-900">
                <strong>Informacja:</strong> Wszystkie nowe restauracje przechodzą
                proces moderacji przed publikacją. Otrzymasz powiadomienie, gdy
                restauracja zostanie zatwierdzona.
              </div>

              <Button type="submit" className="w-full gap-2" size="lg">
                <PlusCircle className="size-5" />
                Dodaj restaurację
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
