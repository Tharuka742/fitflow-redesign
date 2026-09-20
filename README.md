# FitFlow Redesign

A user-centered rework of the FitFlow fitness application, focused on tackling three pain
points surfaced through user research: lack of personalization, weak social accountability,
and friction in logging nutrition.

## Project Background
FitFlow had been losing users, and its App Store rating had slipped from 4.6 down to 3.8
stars. To turn this around, the project follows a full HCI workflow — starting with
stakeholder mapping and user research, and moving through technology evaluation and
system architecture — in order to rebuild the app around AI-driven personalization, social
engagement features, and a much simpler way to track nutrition.

## Tech Stack
- **Frontend:** React Native + React Native Web (covers iOS, Android, and Web)
- **Backend:** Node.js / Express
- **Databases:** PostgreSQL for structured health data, Firebase Firestore for real-time
  social features
- **Auth:** Firebase Auth
- **AI/ML:** TensorFlow Lite for on-device inference, ML Kit for computer-vision-based
  nutrition logging

## Folder Structure

```
fitflow-redesign/
├── frontend/   # React Native app (iOS, Android, Web)
├── backend/    # Core Node.js/Express API
├── ai-service/ # Microservices for AI personalization and computer vision
├── docs/       # Comparison tables, decision matrix, architecture diagram, ADR
```

## Documentation
The `/docs` folder contains:
- `activity1-frontend-comparison.md` — a comparison of Flutter, React Native, KMP, and Swift
- `activity2-backend-db-auth-comparison.md` — comparison of backend, database, and auth options
- `activity3-decision-matrix.md` — a weighted decision matrix for the technology stack
- `activity4-architecture-diagram.png` — high-level system architecture diagram
- `adr/activity4-adr.md` — the Architecture Decision Record

## Getting Started
1. Clone the repository
2. Run `cd frontend && npm install && npm start`
3. Run `cd backend && npm install && npm run dev`

## Author
Tharuka D L B — BSc (Hons) Information Technology, SLIIT
IT3060 — Human Computer Interaction, Lab Exercise 05