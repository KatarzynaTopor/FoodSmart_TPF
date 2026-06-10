# Protokół porównawczy — FoodSmart
## Założenia teoretyczne vs. Stan realizacji

---

## 1. Wymagania funkcjonalne

| # | Wymaganie (wersja ostateczna) | Status | Uwagi / lokalizacja w kodzie |
|---|-------------------------------|--------|------------------------------|
| 1 | Dodawanie nowych restauracji do systemu | ✅ Zrealizowane | `AddRestaurant.tsx` — formularz z polami: nazwa, miasto, adres, opis, kuchnia, dieta, cena, kontakt; walidacja wymaganych pól; informacja o oczekiwaniu na moderację |
| 2 | Ocenianie restauracji (gwiazdki + opinia tekstowa) | ✅ Zrealizowane | `RestaurantDetails.tsx` — formularz oceny z interaktywnym wyborem 1–5 gwiazdek i polem komentarza; nowe opinie dodawane do listy w tej samej sesji |
| 3 | Dodawanie zdjęć do restauracji | ⚠️ Częściowe | Typ `Review.images` jest zdefiniowany w `types.ts`, zdjęcia są wyświetlane w opiniach (`MyReviews.tsx`, `RestaurantDetails.tsx`), jednak formularz dodawania opinii nie zawiera pola do przesyłania pliku |
| 4 | Przeglądanie szczegółów restauracji | ✅ Zrealizowane | `RestaurantDetails.tsx` — opis, galeria, ocena zbiorcza z wykresem słupkowym, lista opinii, dane kontaktowe, kuchnia, opcje dietetyczne, tagi |
| 5a | Filtrowanie — zakres cenowy | ✅ Zrealizowane | `RestaurantList.tsx` — filtry `$` / `$$` / `$$$` / `$$$$` |
| 5b | Filtrowanie — lokalizacja (miasto) | ✅ Zrealizowane | `RestaurantList.tsx` — filtr wielokrotnego wyboru miast |
| 5c | Filtrowanie — preferencje dietetyczne | ✅ Zrealizowane | `RestaurantList.tsx` — filtr opcji dietetycznych (Vegan, Gluten-Free itd.) |
| 5d | Filtrowanie — oceny i opinie | ✅ Zrealizowane | `RestaurantList.tsx` — filtr minimalnej oceny (0 / 3 / 3.5 / 4 / 4.5+) |
| 5e | Filtrowanie — typ kuchni | ✅ Zrealizowane | `RestaurantList.tsx` — filtr kuchni (Italian, Japanese itd.) |
| 6 | Sortowanie wyników | ✅ Zrealizowane | `RestaurantList.tsx` — dropdown: najlepiej oceniane, najwięcej opinii, cena rosnąco/malejąco, nazwa A–Z |
| 7 | Rejestracja i logowanie użytkowników | ✅ Zrealizowane (frontend) | `Login.tsx`, `Register.tsx` — formularze z walidacją; stan logowania w `localStorage` |
| 8 | Zapisywanie restauracji na liście ulubionych | ⚠️ Częściowe | `RestaurantDetails.tsx` — przycisk serduszka z wizualną zmianą stanu; pole `favoriteRestaurants` w modelu `User`; stan **nie jest persystowany** (reset przy odświeżeniu strony) |
| 9 | Definiowanie indywidualnych preferencji użytkownika | ✅ Zrealizowane | `Profile.tsx` — checkboxy: preferowane kuchnie, ograniczenia dietetyczne, przedział cenowy; zapis przez toast (brak backendu) |
| 10 | System rekomendacji na podstawie preferencji | ✅ Zrealizowane | `ChatRecommendations.tsx` — chatbot filtruje restauracje wg słów kluczowych (kuchnia, miasto, budżet, dieta), zwraca top 3 wyniki z linkami |
| 11 | Funkcja „polecanych restauracji" | ✅ Zrealizowane | `Home.tsx` — sekcja „Najlepiej oceniane": 3 restauracje sortowane wg oceny |
| 12 | Chatbot wspierający wybór restauracji | ✅ Zrealizowane | `ChatRecommendations.tsx` — interfejs czatu (bańki wiadomości, animacja pisania, karty z rekomendacjami); logika oparta na dopasowaniu słów kluczowych |

---

## 2. Wymagania niefunkcjonalne

| Wymaganie | Status | Uzasadnienie |
|-----------|--------|--------------|
| Wydajność (czas odpowiedzi < kilka sekund) | ✅ | Aplikacja SPA (Vite + React) bez backendu; dane mockowe ładowane natychmiast; brak opóźnień sieciowych |
| Użyteczność (interfejs intuicyjny) | ✅ | Spójna nawigacja w `Layout.tsx`, czytelna hierarchia typograficzna, komunikaty toast, stany puste z podpowiedziami |
| Responsywność (komputery i mobile) | ✅ | Tailwind CSS z breakpointami `sm:` / `md:` / `lg:`; siatki kart, panel filtrów i tabele admina adaptują układ |
| Bezpieczeństwo danych użytkownika | ⚠️ | Brak backendu — dane nie opuszczają przeglądarki (brak ryzyka wycieku), ale uwierzytelnianie przez `localStorage` bez haszowania haseł; w środowisku produkcyjnym wymagałoby prawdziwego auth |
| Dostępność 24/7 | ✅ | Frontend-only; dostępność zależy wyłącznie od hostingu statycznych plików |
| Skalowalność | ⚠️ | Architektura mockowa nie skaluje się; projekt wymaga backendu (API + baza danych) do obsługi rosnącej liczby użytkowników i danych |
| Niezawodność (minimalizacja błędów) | ✅ | Strona 404 (`NotFound.tsx`), obsługa braku restauracji w szczegółach, stany puste na listach; brak crashy przy pustych wynikach |

---

## 3. Schemat funkcjonalny — pokrycie ekranami

| Widok / Strona | Trasa | Powiązane wymagania |
|----------------|-------|---------------------|
| Strona główna | `/` | W11 (polecane), wyszukiwanie, chatbot CTA |
| Lista restauracji | `/restaurants` | W5a–e, W6 (filtry, sortowanie) |
| Szczegóły restauracji | `/restaurants/:id` | W2, W3, W4, W8 |
| Dodaj restaurację | `/add-restaurant` | W1 |
| Logowanie | `/login` | W7 |
| Rejestracja | `/register` | W7 |
| Profil użytkownika | `/profile` | W9 (preferencje) |
| Moje opinie | `/my-reviews` | W2 (zarządzanie własnymi opiniami) |
| Chatbot | `/chat` | W10, W12 |
| Panel admina | `/admin` | Zarządzanie restauracjami, opiniami, użytkownikami |

---

## 4. Elementy zrealizowane ponad pierwotne założenia

| Element | Lokalizacja | Opis |
|---------|-------------|------|
| Panel administratora | `AdminDashboard.tsx` | Statystyki (liczba restauracji, użytkowników, opinii, śr. ocena), moderacja opinii, zarządzanie użytkownikami (nadawanie/odbieranie roli admina) |
| Głosowanie „Pomocna" na opinie | `RestaurantDetails.tsx` | Przycisk ThumbsUp; licznik pomocności; blokada wielokrotnego głosowania w ramach sesji |
| Wykres rozkładu ocen | `RestaurantDetails.tsx` | Słupki procentowe dla gwiazdek 1–5 |
| Design System | `/design`, `/colors` | Dokumentacja komponentów UI i palety kolorów |

---

## 5. Zmiany względem projektu graficznego (Figma)

| Element | Status w Figmie | Status w implementacji | Powód zmiany |
|---------|-----------------|------------------------|--------------|
| Przycisk „Settings" na stronie profilu | Zaprojektowany | Usunięty | Uznany za zbędny — funkcje ustawień zostały zintegrowane bezpośrednio w karcie „Preferencje" na stronie profilu (`Profile.tsx`) |

---

## 6. Elementy wymagające uzupełnienia (delta do pełnej realizacji)

| Brakujący element | Priorytet | Co należy dodać |
|-------------------|-----------|-----------------|
| Przesyłanie zdjęć w opinii | Wysoki | Pole `<input type="file">` w formularzu recenzji + obsługa podglądu |
| Persystencja ulubionych | Wysoki | Zapis do `localStorage` lub backendu przy kliknięciu serduszka |
| Działająca edycja opinii | Średni | Logika edycji w `MyReviews.tsx` (przycisk istnieje, ale nie otwiera formularza) |
| Backend / baza danych | Wysoki | API REST lub BaaS (np. Supabase) zastępujące `mockData.ts` |
| Prawdziwe uwierzytelnianie | Wysoki | JWT/session zamiast plain `localStorage` bez walidacji hasła |
| Realne AI w chatbocie | Niski | Integracja z Claude API lub OpenAI zamiast dopasowania słów kluczowych |

---

## Podsumowanie

Spośród **12 ostatecznych wymagań funkcjonalnych** zdefiniowanych w fazie badań:

- **10 wymagań** zostało zrealizowanych w pełni
- **2 wymagania** zostały zrealizowane częściowo (dodawanie zdjęć, lista ulubionych)
- **0 wymagań** pozostało niezrealizowanych

Wszystkie **7 wymagań niefunkcjonalnych** znalazło odzwierciedlenie w projekcie, przy czym bezpieczeństwo i skalowalność są ograniczone przez brak backendu — co jest świadomym kompromisem na etapie prototypu frontendowego.
