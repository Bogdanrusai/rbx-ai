# RBX.AI — Website oficial v1.0

Flagship-ul brandului RBX.AI. Construit cu **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion** și **Geist**. Verificat: build de producție curat, zero erori TypeScript, zero avertismente ESLint.

## Structură finală (aprobată)

Hero → Problema → Sisteme → VSL → Demonstrație → Poveste → Instagram (3 postări) → CTA → FAQ → Footer

## Rulare locală

```bash
npm install
npm run dev
```
Deschide http://localhost:3000

## Build de producție (verificare locală)

```bash
npm run build
npm start
```

---

## 🚀 Publicare pe Vercel — pas cu pas

### 1. Urcă proiectul pe GitHub
```bash
cd rbx-ai
git init
git add .
git commit -m "RBX.AI v1.0"
```
Creează un repo nou pe [github.com/new](https://github.com/new), apoi:
```bash
git remote add origin https://github.com/<user-ul-tau>/rbx-ai.git
git push -u origin main
```

### 2. Importă în Vercel
Intră pe [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → alege `rbx-ai`.
Framework-ul **Next.js** e detectat automat — nu trebuie schimbată nicio setare.

### 3. Setează domeniul (înainte de Deploy, sau imediat după)
- Tab **Environment Variables** → adaugă:
  `NEXT_PUBLIC_SITE_URL` = `https://domeniultau.ro` (fără slash la final)
  *(controlează link-urile din metadata, sitemap și robots.txt — un singur loc, ca și CTA-ul)*
- Apasă **Deploy**.

### 4. Conectează domeniul tău
Tab **Domains** din proiectul Vercel → adaugă domeniul → urmează instrucțiunile DNS afișate (de obicei un record `A` sau `CNAME` la registrar-ul tău).

### 5. Activează VSL-ul (când ai link-ul video)
Deschide `lib/config.ts`, completează:
```ts
vslUrl: "https://www.youtube.com/embed/ID_VIDEO",
```
Commit + push → Vercel redeploy automat. Nicio altă modificare de design necesară.

---

## ⚙️ Un singur loc pentru CTA

```ts
// lib/config.ts
contactUrl: "https://ig.me/m/bogdanrus.ai"  // ← schimbă doar aici
```
Toate butoanele „Hai să vorbim" din site preiau automat această valoare.

## Structură cod

```
app/                layout, pagina, metadata (icon, OG image, robots, sitemap)
components/          fiecare secțiune + Nav, Faq, Icons, Reveal (animații)
lib/config.ts       sursa unică: CTA, VSL, postările de Instagram
public/              portret, poster VSL, cele 3 postări (slide-uri optimizate)
```

## Note tehnice

- **Demo-ul** din secțiunea „Demonstrație" e o simulare (răspunsuri scriptate, funcționează fără backend). Pentru conectare la un sistem real (n8n/API), înlocuiește funcția `reply()` din `components/Demo.tsx` cu un fetch către endpoint-ul tău.
- **VSL**: secțiunea e completă și afișează elegant starea „video în curând" până completezi `vslUrl`.
- **Postările Instagram**: imagini locale în `public/instagram/`. Pentru postări noi, adaugă slide-urile și actualizează `lib/config.ts`.
- **Accesibilitate**: respectă `prefers-reduced-motion`, focus states vizibile, dialoguri (VSL/Instagram) cu semantică `role="dialog"`, chat live cu `aria-live`.
