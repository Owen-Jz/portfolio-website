---
uid: vault-readme
type: index
tags: [root, vault, readme]
created: 2024-01-01
---

# Owen Digitals — Knowledge Vault

Hub-and-spoke model knowledge base for Obsidian graph view.

## Primary Hubs (4 + Documents)

| Hub | Purpose |
|-----|---------|
| [[00_Projects]] | All 11 project case studies |
| [[00_Services]] | Brand, UI/UX, Web Dev offerings |
| [[00_Process]] | 5-stage methodology (Discovery → Validation) |
| [[00_Tech_Stack]] | Frontend, Database, Auth, Deployment tools |
| [[Documents]] | Invoices, proposals, contracts, client records |

## Structure

```
vault/
├── 00_Projects.md              ← Hub
├── 00_Services.md              ← Hub
├── 00_Process.md               ← Hub
├── 00_Tech_Stack.md            ← Hub
├── 00_Reference.md             ← Hub
├── Documents/                   ← Business Documents
│   ├── Invoices/
│   │   ├── Invoice-Template.md
│   │   └── INV-001-Organ-Station.md
│   ├── Proposals/
│   │   ├── Brand-Identity-Template.md
│   │   ├── Web-Dev-Template.md
│   │   └── UI-UX-Template.md
│   ├── Contracts/
│   │   ├── Service-Agreement.md
│   │   ├── NDA.md
│   │   └── SOW-Template.md
│   └── Clients/
│       ├── Client-Template.md
│       ├── Organ-Station.md
│       ├── Web-Kitchen.md
│       └── Jedidah.md
├── Services/
│   ├── Brand-Identity.md
│   ├── UI-UX-Design.md
│   └── Web-Development.md
├── Projects/
│   ├── Nova-Trade.md
│   ├── Naija-Diaspora-Hub.md
│   ├── Finddr.md
│   ├── True-North.md
│   ├── SaaS-Dashboard.md
│   ├── Flux.md
│   ├── Numero.md
│   ├── Brinova.md
│   ├── Organ-Station.md
│   ├── Web-Kitchen.md
│   └── Jedidah.md
├── Process/
│   ├── Discovery.md            ← Linear Chain:
│   ├── Definition.md              Discovery →
│   ├── Prototyping.md              Definition →
│   ├── MVP-Build.md                 Prototyping →
│   ├── Validation.md               MVP-Build →
│   └── Handoff.md                  Validation
├── Tech/
│   ├── Frontend.md (Next.js, Tailwind, Framer, GSAP, Lenis)
│   ├── Database.md (MongoDB, Mongoose)
│   ├── Auth.md (NextAuth)
│   ├── Deployment.md (Vercel)
│   └── Design-Tools.md (Figma)
├── Reference/
│   ├── Pricing.md
│   ├── Essential-Package.md
│   ├── Premium-Package.md
│   ├── Ultimate-Package.md
│   ├── Payment.md
│   └── Brand-Assets.md
└── Lead-Capture/
    ├── Start.md
    ├── Contact.md
    ├── Website-Brief.md
    ├── Branding-Brief.md
    └── UI-UX-Brief.md
```

## Document Flow

```
Lead Capture → Proposal → Contract Signed → Work Done → Invoice → Payment Receipt
```

## Link Rules Applied

1. **5 Hubs only**: No "back to home" links in every note
2. **Linear Process Chain**: Discovery → Definition → Prototyping → MVP-Build → Validation
3. **Projects isolated**: Each links only to 00_Projects + current Process stage + relevant Service
4. **Tech hub**: Tools link to 00_Tech_Stack, not to every project
5. **No cross-project links**: Projects don't link to each other
6. **Documents connect to**: Clients, Services, Reference, Projects

## Total Notes: 55

---

*Import this folder into Obsidian as your vault*