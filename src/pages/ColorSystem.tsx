export function ColorSystem() {
  const brandColors = [
    { name: "Orange 500 (Primary Brand)", class: "bg-orange-500", hex: "#f97316", usage: "Logo, CTA buttons, active links" },
    { name: "Orange 600", class: "bg-orange-600", hex: "#ea580c", usage: "Hover states for primary buttons" },
    { name: "Orange 100", class: "bg-orange-100", hex: "#ffedd5", usage: "Icon backgrounds, subtle highlights" },
  ];

  const neutralColors = [
    { name: "White", class: "bg-white", hex: "#ffffff", usage: "Backgrounds, cards" },
    { name: "Slate 50", class: "bg-slate-50", hex: "#f8fafc", usage: "Page backgrounds, section backgrounds" },
    { name: "Slate 100", class: "bg-slate-100", hex: "#f1f5f9", usage: "Tag backgrounds, subtle elements" },
    { name: "Slate 200", class: "bg-slate-200", hex: "#e2e8f0", usage: "Borders, dividers" },
    { name: "Slate 400", class: "bg-slate-400", hex: "#94a3b8", usage: "Icons, secondary text" },
    { name: "Slate 500", class: "bg-slate-500", hex: "#64748b", usage: "Secondary information" },
    { name: "Slate 600", class: "bg-slate-600", hex: "#475569", usage: "Body text, labels" },
    { name: "Slate 800", class: "bg-slate-800", hex: "#1e293b", usage: "Footer borders" },
    { name: "Slate 900", class: "bg-slate-900", hex: "#0f172a", usage: "Headers, dark text, footer" },
  ];

  const accentColors = [
    { name: "Green 100", class: "bg-green-100", hex: "#dcfce7", usage: "Chatbot icon background" },
    { name: "Green 500", class: "bg-green-500", hex: "#22c55e", usage: "Chatbot icon color" },
    { name: "Blue 100", class: "bg-blue-100", hex: "#dbeafe", usage: "Review icon background" },
    { name: "Blue 500", class: "bg-blue-500", hex: "#3b82f6", usage: "Review icon color" },
    { name: "Yellow 400", class: "bg-yellow-400", hex: "#facc15", usage: "Star ratings (fill)" },
    { name: "Red 500", class: "bg-red-500", hex: "#ef4444", usage: "Error states, delete actions" },
  ];

  const uiTokens = [
    { name: "Background", cssVar: "--background", value: "#ffffff", usage: "Main page background" },
    { name: "Foreground", cssVar: "--foreground", value: "oklch(0.145 0 0)", usage: "Main text color" },
    { name: "Primary", cssVar: "--primary", value: "#030213", usage: "Primary UI elements" },
    { name: "Secondary", cssVar: "--secondary", value: "oklch(0.95 0.0058 264.53)", usage: "Secondary elements" },
    { name: "Muted", cssVar: "--muted", value: "#ececf0", usage: "Muted backgrounds" },
    { name: "Border", cssVar: "--border", value: "rgba(0, 0, 0, 0.1)", usage: "Borders and dividers" },
    { name: "Destructive", cssVar: "--destructive", value: "#d4183d", usage: "Delete/danger actions" },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">System Kolorów FoodSmart</h1>
          <p className="text-slate-600">Paleta kolorów używana w aplikacji</p>
        </div>

        {/* Brand Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Kolory brandowe</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nazwa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Kolor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Hex</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {brandColors.map((color, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium">{color.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded border ${color.class}`} />
                        <span className="text-sm text-slate-500">{color.class}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono">{color.hex}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{color.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Kolory neutralne</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nazwa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Kolor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Hex</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {neutralColors.map((color, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium">{color.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded border ${color.class}`} />
                        <span className="text-sm text-slate-500">{color.class}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono">{color.hex}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{color.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Kolory akcentowe</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nazwa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Kolor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Hex</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {accentColors.map((color, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium">{color.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded border ${color.class}`} />
                        <span className="text-sm text-slate-500">{color.class}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono">{color.hex}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{color.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CSS Custom Properties */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tokeny CSS (zmienne)</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nazwa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">CSS Variable</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Wartość</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Użycie</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {uiTokens.map((token, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium">{token.name}</td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-600">{token.cssVar}</td>
                    <td className="px-6 py-4 text-sm font-mono">{token.value}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{token.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Przykłady użycia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Button */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold mb-3">Primary Button</h3>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                Zapisz
              </button>
              <p className="text-sm text-slate-500 mt-3">bg-orange-500, hover:bg-orange-600</p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold mb-3">Card</h3>
              <div className="bg-white border rounded-lg p-4">
                <p className="text-slate-900">Zawartość karty</p>
              </div>
              <p className="text-sm text-slate-500 mt-3">bg-white, border (slate-200)</p>
            </div>

            {/* Tag */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold mb-3">Tag</h3>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm">
                Wegańska
              </span>
              <p className="text-sm text-slate-500 mt-3">bg-slate-100, text-slate-700</p>
            </div>

            {/* Rating Star */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold mb-3">Rating Star</h3>
              <div className="flex items-center gap-1">
                <svg className="size-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">4.5</span>
              </div>
              <p className="text-sm text-slate-500 mt-3">fill-yellow-400, text-yellow-400</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
