# fitflow-redesign

FitFlow fitness app redesign — IT3060 Human Computer Interaction

## Repository structure

| Folder | Content |
|---|---|
| `docs/` | Lab 05 documents (technology comparison, decision matrix, architecture diagram, ADR) |
| `docs/lab06/` | Lab 06 documents (signed build, store assets, Google Play, TestFlight, privacy policy, release notes, testing) |
| `frontend/` | Lab 06 React Native (Expo) frontend prototype |
| `backend/`, `ai-service/` | Reserved for later work (not part of Lab 06) |

## Lab 06 – run the frontend

```bash
cd frontend
npm install
npx expo install --fix
npx expo start
```

Then press `a` for the Android emulator, or scan the QR code with Expo Go.
See `frontend/README.md` for full details. The frontend uses mock/local data only and needs no backend.
