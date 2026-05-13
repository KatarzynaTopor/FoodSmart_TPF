import { Link } from "react-router";
import { Star, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { mockReviews, mockRestaurants, mockUser } from "../data/mockData";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export function MyReviews() {
  const userReviews = mockReviews.filter((r) => r.userId === mockUser.id);

  const handleDelete = (id: string) => {
    toast.success("Opinia została usunięta");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Toaster />
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Star className="size-8 text-orange-500 fill-orange-500" />
          <h1 className="text-3xl font-bold">Moje opinie</h1>
        </div>

        {userReviews.length > 0 ? (
          <div className="space-y-4">
            {userReviews.map((review) => {
              const restaurant = mockRestaurants.find(
                (r) => r.id === review.restaurantId
              );
              if (!restaurant) return null;

              return (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Link to={`/restaurants/${restaurant.id}`}>
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link
                          to={`/restaurants/${restaurant.id}`}
                          className="hover:underline"
                        >
                          <h3 className="font-semibold text-lg mb-1">
                            {restaurant.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="size-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">
                            {new Date(review.date).toLocaleDateString("pl-PL")}
                          </span>
                        </div>
                        <p className="text-slate-700 mb-4">{review.comment}</p>
                        {review.images && (
                          <div className="flex gap-2 mb-4">
                            {review.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="Review"
                                className="w-20 h-20 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Edit className="size-4" />
                            Edytuj
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(review.id)}
                          >
                            <Trash2 className="size-4" />
                            Usuń
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Star className="size-16 mx-auto mb-4 text-slate-300" />
            <h2 className="text-2xl font-semibold mb-2">Brak opinii</h2>
            <p className="text-slate-600 mb-6">
              Nie dodałeś jeszcze żadnych opinii. Odwiedź restaurację i podziel
              się swoimi wrażeniami!
            </p>
            <Link to="/restaurants">
              <Button>Przeglądaj restauracje</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
