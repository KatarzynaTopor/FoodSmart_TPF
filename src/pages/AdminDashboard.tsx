import { useState } from "react";
import {
  Shield,
  UtensilsCrossed,
  Users,
  Star,
  Trash2,
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { mockRestaurants, mockReviews, mockUsers } from "../data/mockData";
import type { Restaurant, Review, User } from "../types";

type Tab = "restaurants" | "reviews" | "users";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("restaurants");
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const avgRating =
    restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length;

  const stats = [
    {
      label: "Restauracje",
      value: restaurants.length,
      icon: UtensilsCrossed,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      label: "Użytkownicy",
      value: users.length,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      label: "Opinie",
      value: reviews.length,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      label: "Śr. ocena",
      value: avgRating.toFixed(1),
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-100",
    },
  ];

  const deleteRestaurant = (id: string) =>
    setRestaurants((prev) => prev.filter((r) => r.id !== id));

  const deleteReview = (id: string) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));

  const toggleAdmin = (id: string) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isAdmin: !u.isAdmin } : u))
    );

  const tabs: { key: Tab; label: string }[] = [
    { key: "restaurants", label: "Restauracje" },
    { key: "reviews", label: "Opinie" },
    { key: "users", label: "Użytkownicy" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="size-8 text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Panel administratora</h1>
          <p className="text-slate-500 text-sm">Zarządzaj restauracjami, opiniami i użytkownikami</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`size-12 ${bg} rounded-full flex items-center justify-center shrink-0`}>
                <Icon className={`size-6 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-0">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === key
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurants Tab */}
      {activeTab === "restaurants" && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Lista restauracji</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Nazwa</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Miasto</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Kuchnia</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Cena</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Ocena</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Opinie</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {restaurants.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={r.image}
                          alt={r.name}
                          className="size-10 rounded-md object-cover shrink-0"
                        />
                        <span className="font-medium text-slate-900">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.city}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {r.cuisine.slice(0, 2).map((c) => (
                          <span key={c} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.priceRange}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{r.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.reviewCount}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteRestaurant(r.id)}
                        className="gap-1.5"
                      >
                        <Trash2 className="size-3.5" />
                        Usuń
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {restaurants.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                <AlertCircle className="size-8 mx-auto mb-2 text-slate-300" />
                Brak restauracji
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Moderacja opinii</CardTitle>
          </CardHeader>
          <div className="divide-y">
            {reviews.map((review) => {
              const restaurant = restaurants.find((r) => r.id === review.restaurantId);
              return (
                <div key={review.id} className="px-6 py-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{review.userName}</span>
                      <span className="text-slate-400">·</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">{review.date}</span>
                    </div>
                    {restaurant && (
                      <p className="text-xs text-orange-500 mb-1">{restaurant.name}</p>
                    )}
                    <p className="text-sm text-slate-600 line-clamp-2">{review.comment}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {review.helpful} osób uznało za pomocną
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteReview(review.id)}
                    className="gap-1.5 shrink-0"
                  >
                    <Trash2 className="size-3.5" />
                    Usuń
                  </Button>
                </div>
              );
            })}
            {reviews.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                <AlertCircle className="size-8 mx-auto mb-2 text-slate-300" />
                Brak opinii
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Zarządzanie użytkownikami</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Użytkownik</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Ulubione</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Admin</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="size-9 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="size-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                            <Users className="size-4 text-slate-500" />
                          </div>
                        )}
                        <span className="font-medium text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{user.email}</td>
                    <td className="px-4 py-3 text-slate-600">{user.favoriteRestaurants.length}</td>
                    <td className="px-4 py-3">
                      {user.isAdmin ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="size-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          <XCircle className="size-3" />
                          Użytkownik
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdmin(user.id)}
                        className="gap-1.5"
                      >
                        <Shield className="size-3.5" />
                        {user.isAdmin ? "Odbierz admina" : "Nadaj admina"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}