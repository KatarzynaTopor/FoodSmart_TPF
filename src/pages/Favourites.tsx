import { useState } from "react";
import { Link } from "react-router";
import { Heart, Star, MapPin, UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { mockRestaurants, mockUser } from "../data/mockData";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export function Favourites() {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(
    mockUser.favoriteRestaurants
  );

  const favourites = mockRestaurants.filter((r) => favouriteIds.includes(r.id));

  const removeFromFavourites = (id: string) => {
    setFavouriteIds((prev) => prev.filter((fid) => fid !== id));
    toast.success("Usunięto z ulubionych");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="size-8 text-orange-500 fill-orange-500" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Ulubione</h1>
            <p className="text-slate-500">
              {favourites.length > 0
                ? `${favourites.length} ${favourites.length === 1 ? "restauracja" : favourites.length < 5 ? "restauracje" : "restauracji"}`
                : "Twoje ulubione restauracje"}
            </p>
          </div>
        </div>

        {favourites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative">
                  <Link to={`/restaurants/${restaurant.id}`}>
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-sm font-semibold px-2 py-1 rounded-md shadow-sm">
                    {restaurant.priceRange}
                  </span>
                  <button
                    onClick={() => removeFromFavourites(restaurant.id)}
                    className="absolute top-3 right-3 size-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
                    title="Usuń z ulubionych"
                  >
                    <Heart className="size-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                <CardContent className="p-4 flex flex-col flex-1">
                  <Link to={`/restaurants/${restaurant.id}`} className="hover:underline">
                    <h2 className="font-semibold text-lg text-slate-900 mb-1">
                      {restaurant.name}
                    </h2>
                  </Link>

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

                  <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">
                    {restaurant.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
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

                  <div className="flex gap-2 mt-auto">
                    <Link to={`/restaurants/${restaurant.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Zobacz szczegóły
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => removeFromFavourites(restaurant.id)}
                    >
                      <Heart className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Heart className="size-16 mx-auto mb-4 text-slate-300" />
            <h2 className="text-2xl font-semibold mb-2">Brak ulubionych</h2>
            <p className="text-slate-600 mb-6">
              Nie dodałeś jeszcze żadnej restauracji do ulubionych. Przeglądaj
              restauracje i klikaj serce, aby je tu zapisać!
            </p>
            <Link to="/restaurants">
              <Button className="gap-2">
                <UtensilsCrossed className="size-4" />
                Przeglądaj restauracje
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}