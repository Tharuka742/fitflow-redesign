# Activity 01 – Signed Build

**Status: PREPARED. Signed build NOT yet generated.**

## Version
| Field | Value | Where |
|---|---|---|
| versionName | 1.0.0 | `app.json` → `expo.version` |
| versionCode | 1 | `app.json` → `expo.android.versionCode` |
| Package | com.fitflow.redesign | `app.json` → `expo.android.package` |

## Steps to do
1. Install EAS CLI: `npm install -g eas-cli` and log in: `eas login`.
2. Build AAB: `eas build --platform android --profile production`.
3. Build test APK: `eas build --platform android --profile preview`.
4. Let EAS generate the keystore (or upload your own with `eas credentials`).
5. Download the build from the EAS link and keep it outside the repository.

## Keystore safety
- Never commit `.jks` / `.keystore` files or passwords.
- Back up the keystore in a safe place.

## Evidence to add after you really do it
- [ ] Screenshot of the successful EAS build
- [ ] Build file name / size
- [ ] Date of build
