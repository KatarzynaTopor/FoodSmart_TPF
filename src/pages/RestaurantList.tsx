import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { Search, Star, MapPin, SlidersHorizontal, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { mockRestaurants } from "../data/mockData";

const ALL_CUISINES = Array.from(
  new Set(mockRestaurants.flatMap((r) => r.cuisine))
).sort();

const ALL_CITIES = Array.from(
  new Set(mockRestaurants.map((r) => r.city))
).sort();

const PRICE_RANGES = ["$", "$$", "$$$", "$$$$"] as const;

const DIETARY_OPTIONS = Array.from(
  new Set(mockRestaurants.flatMap((r) => r.dietaryOptions))
).sort();

type SortKey = "rating" | "reviewCount" | "priceAsc" | "priceDesc" | "name";

const PRICE_ORDER: Record<string, number> = { $: 1, "$$": 2, "$$$": 3, "$$$$": 4 };

export function RestaurantList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) =>
    setList(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
    );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return mockRestaurants
      .filter((r) => {
        if (
          q &&
          !r.name.toLowerCase().includes(q) &&
          !r.city.toLowerCase().includes(q) &&
          !r.cuisine.some((c) => c.toLowerCase().includes(q)) &&
          !r.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
        if (selectedCities.length && !selectedCities.includes(r.city))
          return false;
        if (
          selectedCuisines.length &&
          !selectedCuisines.some((c) => r.cuisine.includes(c))
        )
          return false;
        if (selectedPrices.length && !selectedPrices.includes(r.priceRange))
          return false;
        if (
          selectedDietary.length &&
          !selectedDietary.every((d) => r.dietaryOptions.includes(d))
        )
          return false;
        if (r.rating < minRating) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "reviewCount":
            return b.reviewCount - a.reviewCount;
          case "priceAsc":
            return PRICE_ORDER[a.priceRange] - PRICE_ORDER[b.priceRange];
          case "priceDesc":
            return PRICE_ORDER[b.priceRange] - PRICE_ORDER[a.priceRange];
          case "name":
            return a.name.localeCompare(b.name);
        }
      });
  }, [query, selectedCities, selectedCuisines, selectedPrices, selectedDietary, minRating, sortBy]);

  const hasActiveFilters =
    selectedCities.length ||
    selectedCuisines.length ||
    selectedPrices.length ||
    selectedDietary.length ||
    minRating > 0;

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedCuisines([]);
    setSelectedPrices([]);
    setSelectedDietary([]);
    setMinRating(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { search: query } : {});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Restauracje</h1>
        <p className="text-slate-500">Znajdź idealną restaurację dla siebie</p>
      </div>

      {/* Search + sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Szukaj po nazwie, kuchni, mieście..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Szukaj</Button>
        </form>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          >
            <option value="rating">Najlepiej oceniane</option>
            <option value="reviewCount">Najwięcej opinii</option>
            <option value="priceAsc">Cena: rosnąco</option>
            <option value="priceDesc">Cena: malejąco</option>
            <option value="name">Nazwa A–Z</option>
          </select>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="size-4" />
            Filtry
            {hasActiveFilters ? (
              <span className="size-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                {[selectedCities, selectedCuisines, selectedPrices, selectedDietary].filter(
                  (a) => a.length
                ).length + (minRating > 0 ? 1 : 0)}
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-slate-50 border rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-slate-900">Filtry</span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-orange-500 hover:underline flex items-center gap-1"
              >
                <X className="size-3.5" />
                Wyczyść
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Miasto</p>
              <div className="flex flex-wrap gap-2">
                {ALL_CITIES.map((city) => (
                  <FilterChip
                    key={city}
                    label={city}
                    active={selectedCities.includes(city)}
                    onClick={() => toggle(selectedCities, setSelectedCities, city)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Kuchnia</p>
              <div className="flex flex-wrap gap-2">
                {ALL_CUISINES.map((cuisine) => (
                  <FilterChip
                    key={cuisine}
                    label={cuisine}
                    active={selectedCuisines.includes(cuisine)}
                    onClick={() => toggle(selectedCuisines, setSelectedCuisines, cuisine)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Przedział cenowy</p>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((p) => (
                  <FilterChip
                    key={p}
                    label={p}
                    active={selectedPrices.includes(p)}
                    onClick={() => toggle(selectedPrices, setSelectedPrices, p)}
                  />
                ))}
              </div>

              <p className="text-sm font-medium text-slate-700 mt-4 mb-2">Min. ocena</p>
              <div className="flex gap-2">
                {[0, 3, 3.5, 4, 4.5].map((v) => (
                  <FilterChip
                    key={v}
                    label={v === 0 ? "Wszystkie" : `${v}+`}
                    active={minRating === v}
                    onClick={() => setMinRating(v)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Dieta</p>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((d) => (
                  <FilterChip
                    key={d}
                    label={d}
                    active={selectedDietary.includes(d)}
                    onClick={() => toggle(selectedDietary, setSelectedDietary, d)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        Znaleziono <span className="font-medium text-slate-900">{filtered.length}</span> restauracji
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((restaurant) => (
            <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 text-slate-800 text-sm font-semibold px-2 py-1 rounded-md shadow-sm">
                    {restaurant.priceRange}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg text-slate-900 mb-1">{restaurant.name}</h2>

                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
                    <MapPin className="size-3.5 shrink-0" />
                    <span>{restaurant.city}</span>
                    <span className="text-slate-300">·</span>
                    <span>{restaurant.address.split(",")[0]}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-900">{restaurant.rating}</span>
                    <span className="text-sm text-slate-400">({restaurant.reviewCount} opinii)</span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {restaurant.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {restaurant.cuisine.map((c) => (
                      <span
                        key={c}
                        className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded"
                      >
                        {c}
                      </span>
                    ))}
                    {restaurant.dietaryOptions.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Search className="size-12 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-600 font-medium mb-1">Brak wyników</p>
          <p className="text-sm text-slate-400">Spróbuj zmienić filtry lub wyszukiwaną frazę</p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="mt-4 text-sm text-orange-500 hover:underline">
              Wyczyść filtry
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
        active
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-white text-slate-600 border-slate-200 hover:border-orange-300"
      }`}
    >
      {label}
    </button>
  );
}