# VeritasAI — AI-Powered Fake News Detector

> Detect misinformation instantly using Machine Learning. Paste any news article and get a real-time credibility analysis powered by a 99.26% accurate model.

🔗 **Live Demo**: [getveritasai.vercel.app](https://getveritasai.vercel.app)

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind CSS + Framer Motion |
| Backend | Flask (Python) |
| ML Model | Logistic Regression + TF-IDF (scikit-learn) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Features

- 🧠 **99.26% accuracy** on 44,000+ articles
- 📰 Paste article text or enter a URL
- 📊 Confidence score, credibility metrics, sentiment analysis
- 🔍 Suspicious keyword and emotional language detection
- ⚡ Sub-second inference time
- 🎨 Glassmorphic futuristic UI with animations

---

## Local Setup

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Clone the repo
```bash
git clone https://github.com/GitByAnu/fake-news-detector.git
cd fake-news-detector
```

### 2. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
python app.py
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** — Flask must be running on port 5000.

---

## API

### `POST /api/analyze`
```json
// Request
{ "text": "news article text here..." }

// Response
{
  "label": "FAKE",
  "confidence": 97.43,
  "credibility_score": 12,
  "explanation": "This article exhibits strong indicators of misinformation...",
  "sentiment": { "label": "Highly Emotional", "emotional_score": 72 },
  "suspicious_keywords": ["shocking", "exposed"]
}
```

### `GET /api/health`
Returns model status and accuracy metrics.

---

## Model Performance

| Metric | Score |
|--------|-------|
| Accuracy | 99.26% |
| F1-Score | 0.992 |
| Precision | 99.01% |
| Recall | 99.43% |

Trained on the [ISOT Fake News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset) (44,000 articles).

---

## Project Structure

```
fake-news-detector/
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── requirements.txt
│   └── model/
│       ├── fake_news_model.pkl
│       ├── fake_keywords.pkl
│       ├── real_keywords.pkl
│       └── metrics.json
└── frontend/
    └── src/
        └── components/
            ├── Detector.jsx
            ├── Hero.jsx
            ├── Navbar.jsx
            └── ...
```

---

Made by [Anupama Bain](https://github.com/GitByAnu)
