import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, Heart, MapPin, Search, MessageSquare } from "lucide-react";

export function DesignSystem() {
  const typography = [
    { name: "H1", element: "h1", size: "text-2xl", weight: "font-medium", lineHeight: "1.5", example: "Nagłówek H1" },
    { name: "H2", element: "h2", size: "text-xl", weight: "font-medium", lineHeight: "1.5", example: "Nagłówek H2" },
    { name: "H3", element: "h3", size: "text-lg", weight: "font-medium", lineHeight: "1.5", example: "Nagłówek H3" },
    { name: "H4", element: "h4", size: "text-base", weight: "font-medium", lineHeight: "1.5", example: "Nagłówek H4" },
    { name: "Body", element: "p", size: "text-base", weight: "font-normal", lineHeight: "1.5", example: "Tekst podstawowy używany w paragrafach i większości treści." },
    { name: "Small", element: "small", size: "text-sm", weight: "font-normal", lineHeight: "1.5", example: "Mniejszy tekst dla opisów i dodatkowych informacji" },
    { name: "Label", element: "label", size: "text-base", weight: "font-medium", lineHeight: "1.5", example: "Etykieta formularza" },
  ];

  const textSizes = [
    { class: "text-xs", pixels: "12px", usage: "Bardzo mały tekst, tagi" },
    { class: "text-sm", pixels: "14px", usage: "Mały tekst, opisy" },
    { class: "text-base", pixels: "16px", usage: "Domyślny rozmiar tekstu" },
    { class: "text-lg", pixels: "18px", usage: "Większy tekst, podtytuły" },
    { class: "text-xl", pixels: "20px", usage: "Duży tekst, nagłówki H2" },
    { class: "text-2xl", pixels: "24px", usage: "Bardzo duży tekst, H1" },
    { class: "text-3xl", pixels: "30px", usage: "Główne nagłówki strony" },
    { class: "text-4xl", pixels: "36px", usage: "Hero headlines" },
    { class: "text-5xl", pixels: "48px", usage: "Bardzo duże nagłówki" },
  ];

  const fontWeights = [
    { class: "font-normal", value: "400", usage: "Normalny tekst" },
    { class: "font-medium", value: "500", usage: "Nagłówki, przyciski, etykiety" },
    { class: "font-semibold", value: "600", usage: "Ważne nagłówki" },
    { class: "font-bold", value: "700", usage: "Bardzo ważne elementy" },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">System Projektowy FoodSmart</h1>
          <p className="text-slate-600">Czcionki i komponenty używane w aplikacji</p>
        </div>

        {/* Typography System */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">System typograficzny</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Element</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rozmiar</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Waga</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Line Height</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Przykład</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {typography.map((typo, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium">{typo.name}</td>
                    <td className="px-6 py-4 text-sm font-mono">{typo.size}</td>
                    <td className="px-6 py-4 text-sm font-mono">{typo.weight}</td>
                    <td className="px-6 py-4 text-sm">{typo.lineHeight}</td>
                    <td className="px-6 py-4">
                      {typo.element === "h1" && <h1>{typo.example}</h1>}
                      {typo.element === "h2" && <h2>{typo.example}</h2>}
                      {typo.element === "h3" && <h3>{typo.example}</h3>}
                      {typo.element === "h4" && <h4>{typo.example}</h4>}
                      {typo.element === "p" && <p>{typo.example}</p>}
                      {typo.element === "small" && <small>{typo.example}</small>}
                      {typo.element === "label" && <label>{typo.example}</label>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Text Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Rozmiary tekstu</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Klasa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rozmiar</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Podgląd</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {textSizes.map((size, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-mono">{size.class}</td>
                    <td className="px-6 py-4 text-sm">{size.pixels}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{size.usage}</td>
                    <td className="px-6 py-4">
                      <span className={size.class}>Przykładowy tekst</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Wagi czcionek</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Klasa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Wartość</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Podgląd</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {fontWeights.map((weight, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-mono">{weight.class}</td>
                    <td className="px-6 py-4 text-sm">{weight.value}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{weight.usage}</td>
                    <td className="px-6 py-4">
                      <span className={weight.class}>Przykładowy tekst</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* UI Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Komponenty UI</h2>

          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Przyciski</h3>
            <div className="bg-white rounded-lg border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium mb-3">Primary Button</p>
                  <Button>Zapisz</Button>
                  <p className="text-xs text-slate-500 mt-2">Default variant</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3">Outline Button</p>
                  <Button variant="outline">Anuluj</Button>
                  <p className="text-xs text-slate-500 mt-2">variant="outline"</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3">Secondary Button</p>
                  <Button variant="secondary">Więcej</Button>
                  <p className="text-xs text-slate-500 mt-2">variant="secondary"</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3">Destructive Button</p>
                  <Button variant="destructive">Usuń</Button>
                  <p className="text-xs text-slate-500 mt-2">variant="destructive"</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3">Button z ikoną</p>
                  <Button className="gap-2">
                    <Search className="size-4" />
                    Szukaj
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">Z ikoną Lucide</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3">Small Button</p>
                  <Button size="sm">Mały przycisk</Button>
                  <p className="text-xs text-slate-500 mt-2">size="sm"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Karty</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tytuł karty</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Treść karty z przykładowym tekstem opisującym zawartość.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="size-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Karta z ikoną</h3>
                      <p className="text-sm text-slate-500">Z efektem hover</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Znaczniki (Badges)</h3>
            <div className="bg-white rounded-lg border p-6">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm">Custom Tag</span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm">Highlighted</span>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Pola formularza</h3>
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block mb-2">Input standardowy</label>
                  <Input placeholder="Wpisz tekst..." />
                </div>
                <div>
                  <label className="block mb-2">Input z ikoną</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input placeholder="Szukaj..." className="pl-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Ikony</h3>
            <div className="bg-white rounded-lg border p-6">
              <p className="text-sm text-slate-600 mb-4">Używamy biblioteki Lucide React</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 border rounded">
                  <Star className="size-6 text-slate-700" />
                  <span className="text-xs">Star</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border rounded">
                  <Heart className="size-6 text-slate-700" />
                  <span className="text-xs">Heart</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border rounded">
                  <MapPin className="size-6 text-slate-700" />
                  <span className="text-xs">MapPin</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border rounded">
                  <MessageSquare className="size-6 text-slate-700" />
                  <span className="text-xs">MessageSquare</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Oceny gwiazdkowe</h3>
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="font-medium">5.0</span>
                  <span className="text-sm text-slate-500">(128)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <Star className="size-5 text-slate-300" />
                  </div>
                  <span className="font-medium">4.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">System odstępów</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Klasa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Wartość</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Wizualizacja</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">gap-1, p-1, m-1</td>
                  <td className="px-6 py-4 text-sm">4px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Bardzo małe odstępy</td>
                  <td className="px-6 py-4"><div className="h-1 w-16 bg-orange-500"></div></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">gap-2, p-2, m-2</td>
                  <td className="px-6 py-4 text-sm">8px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Małe odstępy między elementami</td>
                  <td className="px-6 py-4"><div className="h-2 w-16 bg-orange-500"></div></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">gap-4, p-4, m-4</td>
                  <td className="px-6 py-4 text-sm">16px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Standardowe odstępy</td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-orange-500"></div></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">gap-6, p-6, m-6</td>
                  <td className="px-6 py-4 text-sm">24px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Średnie odstępy w kartach</td>
                  <td className="px-6 py-4"><div className="h-6 w-16 bg-orange-500"></div></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">gap-8, p-8, m-8</td>
                  <td className="px-6 py-4 text-sm">32px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Duże odstępy między sekcjami</td>
                  <td className="px-6 py-4"><div className="h-8 w-16 bg-orange-500"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Zaokrąglenia (Border Radius)</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Klasa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Wartość</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Wizualizacja</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">rounded</td>
                  <td className="px-6 py-4 text-sm">4px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Małe tagi, badges</td>
                  <td className="px-6 py-4"><div className="h-10 w-20 bg-orange-500 rounded"></div></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">rounded-lg</td>
                  <td className="px-6 py-4 text-sm">8px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Przyciski, inputy, karty</td>
                  <td className="px-6 py-4"><div className="h-10 w-20 bg-orange-500 rounded-lg"></div></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono">rounded-full</td>
                  <td className="px-6 py-4 text-sm">9999px</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Avatary, okrągłe ikony</td>
                  <td className="px-6 py-4"><div className="size-10 bg-orange-500 rounded-full"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
