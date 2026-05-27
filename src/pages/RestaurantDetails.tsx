import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Star,
  ThumbsUp,
  UtensilsCrossed,
  Leaf,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { mockRestaurants, mockReviews } from "../data/mockData";

export function RestaurantDetails() {
  const { id } = useParams<{ id: string }>();
  const restaurant = mockRestaurants.find((r) => r.id === id);

  const [reviews, setReviews] = useState(
    mockReviews.filter((r) => r.restaurantId === id)
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [helpfulVoted, setHelpfulVoted] = useState<Set<string>>(new Set());

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <UtensilsCrossed className="size-12 mx-auto mb-4 text-slate-300" />
        <p className="text-slate-600 font-medium mb-1">Restauracja nie została znaleziona</p>
        <Link to="/restaurants">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="size-4" />
            Wróć do listy
          </Button>
        </Link>
      </div>
    );
  }

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : restaurant.rating;

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    setReviews((prev) => [
      {
        id: `new-${Date.now()}`,
        restaurantId: restaurant.id,
        userId: "user1",
        userName: "Anna Kowalska",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().slice(0, 10),
        helpful: 0,
      },
      ...prev,
    ]);
    setNewReview({ rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  const voteHelpful = (reviewId: string) => {
    if (helpfulVoted.has(reviewId)) return;
    setHelpfulVoted((prev) => new Set(prev).add(reviewId));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/restaurants"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="size-4" />
        Wróć do listy restauracji
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-72 md:h-96">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{avgRating.toFixed(1)}</span>
                  <span className="text-white/70">({reviews.length} opinii)</span>
                </div>
                <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                  {restaurant.priceRange}
                </span>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <MapPin className="size-4" />
                  {restaurant.city}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`shrink-0 size-12 rounded-full flex items-center justify-center transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart className={`size-5 ${isFavorite ? "fill-white" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">O restauracji</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">{restaurant.description}</p>
            </CardContent>
          </Card>

          {/* Rating breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Oceny</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-slate-900">{avgRating.toFixed(1)}</p>
                  <div className="flex justify-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${
                          i < Math.round(avgRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{reviews.length} opinii</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-4 text-right text-slate-500">{star}</span>
                        <Star className="size-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-slate-500">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Opinie</h2>
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="gap-2"
                variant={showReviewForm ? "outline" : "default"}
              >
                <MessageSquare className="size-4" />
                {showReviewForm ? "Anuluj" : "Dodaj opinię"}
              </Button>
            </div>

            {showReviewForm && (
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <form onSubmit={submitReview} className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Twoja ocena</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview((r) => ({ ...r, rating: star }))}
                          >
                            <Star
                              className={`size-7 transition-colors ${
                                star <= newReview.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-200 hover:text-yellow-200"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Komentarz</p>
                      <textarea
                        className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Opisz swoje wrażenia..."
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview((r) => ({ ...r, comment: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Opublikuj opinię
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{review.userName}</p>
                          <p className="text-xs text-slate-400">{review.date}</p>
                        </div>
                        <div className="flex shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{review.comment}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img) => (
                            <img
                              key={img}
                              src={img}
                              alt=""
                              className="size-20 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => voteHelpful(review.id)}
                        disabled={helpfulVoted.has(review.id)}
                        className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
                          helpfulVoted.has(review.id)
                            ? "text-orange-500"
                            : "text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        <ThumbsUp className="size-3.5" />
                        Pomocna ({review.helpful})
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 border rounded-xl">
                <MessageSquare className="size-8 mx-auto mb-2 text-slate-300" />
                <p>Brak opinii. Bądź pierwszy!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column — info sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Adres</p>
                  <p className="text-sm text-slate-600">{restaurant.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Telefon</p>
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="text-sm text-orange-500 hover:underline"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              </div>

              {restaurant.website && (
                <div className="flex items-center gap-3">
                  <Globe className="size-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Strona www</p>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-500 hover:underline"
                    >
                      {restaurant.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Kuchnia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((c) => (
                  <span
                    key={c}
                    className="text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Leaf className="size-4 text-green-500" />
                Opcje dietetyczne
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {restaurant.dietaryOptions.map((d) => (
                  <span
                    key={d}
                    className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Tagi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}