import { Link } from "react-router";
import { Search, MessageSquare, Star, TrendingUp, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { mockRestaurants } from "../data/mockData";
import { useState } from "react";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const topRestaurants = mockRestaurants
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/restaurants?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Znajdź swoją idealną restaurację
          </h1>
          <p className="text-xl mb-8 text-slate-200">
            Tysiące restauracji, miliony opinii, nieskończone możliwości
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Szukaj restauracji, kuchni lub miasta..."
                className="flex-1 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="lg" className="h-14 px-8">
                <Search className="size-5 mr-2" />
                Szukaj
              </Button>
            </div>
          </form>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/restaurants">
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                Przeglądaj wszystkie
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <MessageSquare className="size-5 mr-2" />
                Zapytaj chatbota
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="size-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="size-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Zaawansowane wyszukiwanie</h3>
                <p className="text-slate-600">
                  Filtruj według diety, ceny, lokalizacji i ocen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="size-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chatbot AI</h3>
                <p className="text-slate-600">
                  Otrzymuj spersonalizowane rekomendacje restauracji
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="size-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Opinie użytkowników</h3>
                <p className="text-slate-600">
                  Prawdziwe recenzje od prawdziwych ludzi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Restaurants Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-6 text-orange-500" />
              <h2 className="text-3xl font-bold">Najlepiej oceniane</h2>
            </div>
            <Link to="/restaurants">
              <Button variant="outline">Zobacz wszystkie</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRestaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <MapPin className="size-4" />
                      {restaurant.city}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{restaurant.rating}</span>
                        <span className="text-sm text-slate-500">
                          ({restaurant.reviewCount})
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {restaurant.priceRange}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {restaurant.cuisine.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-slate-100 px-2 py-1 rounded"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Nie możesz się zdecydować?
          </h2>
          <p className="text-xl mb-8">
            Zapytaj naszego chatbota AI o spersonalizowane rekomendacje
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-slate-100">
              <MessageSquare className="size-5 mr-2" />
              Rozpocznij rozmowę
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
