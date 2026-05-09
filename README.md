# VeritasAI — Fake News Detector

AI-powered misinformation detection with 99.26% accuracy.

🔗 **Live Demo**: [getveritasai.vercel.app](https://getveritasai.vercel.app)

## Stack
React + Vite + Tailwind · Flask · scikit-learn · Vercel + Render

## Features
- Paste article text or enter a URL
- Confidence score, sentiment analysis, keyword detection
- Sub-second inference · Glassmorphic UI

## Local Setup
```bash
# Backend
cd backend && pip install -r requirements.txt && python app.py

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

Open **http://localhost:5173**

## Model
Logistic Regression + TF-IDF trained on 44K articles (ISOT dataset).
Accuracy: 99.26% · F1: 0.992

---
Made by [Anupama Bain](https://github.com/GitByAnu)
