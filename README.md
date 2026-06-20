# Frontend Project 001 — Contact Form

Next.js 14 + TypeScript + Tailwind + shadcn/ui contact form, with a GSAP
entrance animation and toast feedback via `sonner`.

## What was broken in the uploaded zip

The original folder couldn't run at all — it was missing most of the files
a Next.js project needs:

- `package.json` had no `dependencies` or `devDependencies` at all (no
  `next`, `react`, `react-dom`, `typescript`, `tailwindcss`...).
- No `tsconfig.json` — required for TypeScript and for the `@/...` import
  alias used in `page.tsx`.
- No `next.config.js`, `tailwind.config.js`, or `postcss.config.js` —
  without these, Tailwind classes never compile and Next.js has nothing to
  build against.
- `layout.tsx` imported `Toaster` from `sonner`, and `ContactForm.tsx`
  imported `axios` — neither package was installed or listed anywhere.
- The README said "Shadcn UI" but no shadcn components existed; the form
  used raw `<input>` / `<textarea>` / `<button>` tags instead.
- The form posted to `https://www.greatfrontend.com/api/questions/contact-form`,
  a third-party practice endpoint that won't accept submissions from other
  projects — so the "Send" button would always fail silently (no error
  handling existed either).
- No loading state, validation, or success/error feedback on submit.

## What's fixed here

- `package.json` now lists every dependency the code actually uses, pinned
  to versions that are compatible with each other and free of known
  vulnerabilities (Next.js 14.2.35, patched against the Dec 2025 RSC
  advisories).
- Added `tsconfig.json`, `next.config.js`, `tailwind.config.js`,
  `postcss.config.js`, and `components.json` (shadcn config).
- Added real shadcn/ui primitives: `components/ui/button.tsx`,
  `input.tsx`, `textarea.tsx`, `label.tsx`.
- Rebuilt `ContactForm.tsx` using those components, with:
  - client-side validation (required fields, basic email format check)
  - a disabled/loading state while submitting
  - success and error toasts via `sonner`
  - a one-time GSAP fade/slide-in on mount
- Added a working `app/api/contact/route.ts` API route so the form has
  somewhere real to submit to out of the box. It currently just logs the
  submission and returns `{ ok: true }` — swap in a real email service
  (Resend, SendGrid, etc.) or database write when you're ready.
- Added `.gitignore`, `.eslintrc.json`, and `sandbox.config.json` (so
  CodeSandbox boots straight into `npm run dev` on port 3000).

## Running in CodeSandbox

1. Upload/import this folder as a new sandbox (Node template).
2. CodeSandbox will run `npm install` automatically.
3. It will then run `npm run dev` (configured in `sandbox.config.json`) and
   open the preview on port 3000.

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project structure

```
frontend-project001/
├── app/
│   ├── api/contact/route.ts   # POST handler the form submits to
│   ├── globals.css            # Tailwind + shadcn CSS variables
│   ├── layout.tsx             # Root layout + <Toaster />
│   └── page.tsx                # Renders <ContactForm />
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── label.tsx
│   └── ContactForm.tsx         # The form itself
├── lib/
│   └── utils.ts                # cn() class-merge helper
├── components.json             # shadcn config
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── next.config.js
├── sandbox.config.json         # CodeSandbox boot config
├── package.json
└── README.md
```

## Customizing

- **Where the form submits**: edit the `axios.post(...)` call in
  `components/ContactForm.tsx`, and replace the logic in
  `app/api/contact/route.ts` with your real backend integration.
- **Validation rules**: edit the `validate()` function in
  `components/ContactForm.tsx`.
- **Styling**: the page background is `bg-black` in `app/page.tsx`; the
  card itself uses the shadcn `--card` / `--border` CSS variables defined
  in `app/globals.css`.
