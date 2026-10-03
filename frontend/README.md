# FitFlow Redesign

**IT3060 – Human Computer Interaction**
**Lab Exercise 06**

**Frontend:** React Native (Expo)

## Description

Frontend prototype of the redesigned FitFlow fitness tracking application. All data is local mock data, so the app runs on its own.

## Features

- AI-inspired personalized workouts (simulated plan generator)
- Social community (likes, comments, challenges)
- Nutrition tracking (meal logging and simulated food scan)
- Progress tracking (weekly chart, streak, history)
- Motivation and achievements
- Profile / settings (including the personalized recommendations switch)
- In-app Privacy Policy, Release Notes and Testing checklist

## Running the project

```bash
npm install
npx expo start
```

If Expo reports package version mismatches, run `npx expo install --fix` once.

### Android emulator

1. Install Android Studio and create a virtual device (AVD) in Device Manager.
2. Start the emulator.
3. Run `npx expo start`, then press `a` in the terminal (or run `npm run android`).

### Expo Go (physical phone)

1. Install **Expo Go** from the Play Store.
2. Run `npx expo start`.
3. Scan the QR code with Expo Go. The phone and computer must be on the same Wi-Fi.
   If the QR does not connect, try `npx expo start --tunnel`.

## Project structure

```
App.js                     App entry (providers + navigator)
src/navigation/            AppNavigator.js (bottom tabs + stack)
src/screens/               7 main screens + Privacy, Release Notes, Testing
src/components/            Reusable UI components
src/data/                  Local mock data
src/state/AppContext.js    Shared local state (workout done, meals, settings)
src/theme/                 colors.js, typography.js, spacing.js
../docs/lab06/             Lab 06 documentation (repo root)
assets/                    icons, screenshots, feature-graphics, promotional
```

Simple flow for every feature: **Screen → Component → Local Mock Data → State Update → UI**

## Release build (Lab 06 Activity 1)

This is an Expo project, so there is no `android/` Gradle folder to edit.
Version values are set in `app.json`:

- `expo.version` = `1.0.0` (versionName)
- `expo.android.versionCode` = `1`

Increase `versionCode` by 1 for every new upload to Google Play.

### Creating a release keystore securely

Easiest option: let EAS generate and store the keystore for you.

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile production   # .aab for Google Play
eas build --platform android --profile preview      # .apk for internal testing
```

On the first build EAS asks to generate a keystore. You can see or download it with `eas credentials`.

Using your own keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore fitflow-release.jks \
  -alias fitflow -keyalg RSA -keysize 2048 -validity 10000
```

Rules:

- Choose the passwords yourself when `keytool` asks. **Never write them in source code or commit them.**
- `*.jks`, `*.keystore` and `credentials.json` are already in `.gitignore`.
- Keep a backup of the keystore and passwords in a password manager. If you lose them you cannot update the app.
- Upload the keystore with `eas credentials` instead of placing it in the repo.

No signed APK/AAB is included in this project. Build one yourself with the commands above.

See `../docs/lab06/` for all Lab 06 activity documents.
