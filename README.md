# Fyxlife Mobile App Assignment

A simple **fitness tracker** built with **Expo (React Native + TypeScript)**.  
Implements onboarding, daily goals (Move / Eat / Calm), progress tracking, a risk-o-meter, and local persistence — as per the Fyxlife assignment brief.

---

## 📱 Features

- **Onboarding Flow (3 screens)**
  - Welcome → User details → Completion screen
  - Stores profile (name, age, phone, gender, activity level)

- **Dashboard**
  - 3 daily goals (Move / Eat / Calm)
  - Track progress with buttons (e.g., +5 min walk, +1 serving)
  - Progress bar + completion tick ✅
  - **Goal swapping** (choose alternative goals)

- **Progress View**
  - Today / Week / Month completion stats
  - **Streak counter** 🔥 (consecutive completed days)

- **Risk-o-meter**
  - Illustrative risks grouped by system:
    - Cardio, Metabolic, Musculoskeletal, Neuro
  - Non-medical snapshot for demo purposes

- **State & Storage**
  - Zustand store with persistence (`AsyncStorage`)
  - All progress and profile saved locally

- **Navigation**
  - Onboarding flow → Tab navigation (Dashboard, Progress, Risk-o-meter)
  - Expo Router with bottom tab bar

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd fyxlife-tracker
npm install
