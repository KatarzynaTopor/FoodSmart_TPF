import { useState } from "react";
import { Send, Bot, User as UserIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Link } from "react-router";
import { mockRestaurants } from "../data/mockData";
import { type ChatMessage } from "../types";
import { Star, MapPin } from "lucide-react";

export function ChatRecommendations() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Cześć! Jestem chatbotem FoodSmart. Pomogę Ci znaleźć idealną restaurację. Powiedz mi, czego szukasz - jakiej kuchni, w jakim mieście, jaki budżet?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateRecommendations = (userMessage: string): any[] => {
    const msg = userMessage.toLowerCase();
    let filtered = mockRestaurants;

    if (msg.includes("wege") || msg.includes("vegan")) {
      filtered = filtered.filter((r) =>
        r.dietaryOptions.some((d) => d.includes("Vegan") || d.includes("Vegetarian"))
      );
    }
    if (msg.includes("sushi") || msg.includes("japoń")) {
      filtered = filtered.filter((r) => r.cuisine.includes("Japanese"));
    }
    if (msg.includes("włos") || msg.includes("pasta") || msg.includes("pizza")) {
      filtered = filtered.filter((r) => r.cuisine.includes("Italian"));
    }
    if (msg.includes("thai")) {
      filtered = filtered.filter((r) => r.cuisine.includes("Thai"));
    }
    if (msg.includes("warszaw")) {
      filtered = filtered.filter((r) => r.city === "Warsaw");
    }
    if (msg.includes("kraków") || msg.includes("krakow")) {
      filtered = filtered.filter((r) => r.city === "Krakow");
    }
    if (msg.includes("tanio") || msg.includes("budżet")) {
      filtered = filtered.filter((r) => r.priceRange === "$" || r.priceRange === "$$");
    }
    if (msg.includes("luksus") || msg.includes("drogi")) {
      filtered = filtered.filter((r) => r.priceRange === "$$$" || r.priceRange === "$$$$");
    }

    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 3);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const recommendations = generateRecommendations(input);
      
      let responseContent = "";
      if (recommendations.length > 0) {
        responseContent = `Znalazłem ${recommendations.length} restauracje, które mogą Ci się spodobać! Oto moje rekomendacje:`;
      } else {
        responseContent =
          "Niestety nie znalazłem restauracji pasujących do Twoich kryteriów. Spróbuj zmienić swoje preferencje lub poszukaj restauracji w innym mieście.";
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toISOString(),
        recommendations: recommendations.length > 0 ? recommendations : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Chatbot rekomendacji</h1>
              <p className="text-sm text-slate-600">
                Zapytaj mnie o restauracje, a znajdę dla Ciebie idealne miejsce
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500">
                        <Bot className="size-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-slate-300">
                        <UserIcon className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Recommendations */}
                {message.recommendations && (
                  <div className="mt-4 space-y-3 ml-11">
                    {message.recommendations.map((restaurant) => (
                      <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-24 h-24 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">
                                  {restaurant.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                  <MapPin className="size-4" />
                                  {restaurant.city}
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-sm">
                                      {restaurant.rating}
                                    </span>
                                  </div>
                                  <span className="text-sm">
                                    {restaurant.priceRange}
                                  </span>
                                  <span className="text-sm text-slate-500">
                                    {restaurant.cuisine.join(", ")}
                                  </span>
                                </div>
                                <Button size="sm" variant="outline">
                                  Zobacz szczegóły
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500">
                    <Bot className="size-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="size-2 bg-slate-400 rounded-full animate-bounce" />
                    <div
                      className="size-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="size-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Napisz swoją wiadomość..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!input.trim()}>
                <Send className="size-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Przykłady: "Szukam wegańskiej restauracji w Warszawie", "Polecasz
              tanią pizzerię?", "Gdzie zjeść sushi?"
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
