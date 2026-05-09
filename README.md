# VeritasAI — AI-Powered Fake News Detector

> A premium, futuristic, glassmorphic fake news detection web app.
> Built with React + Vite + Tailwind + Framer Motion (frontend) and Flask + scikit-learn (backend).
> **Model Accuracy: 99.26% | F1-Score: 0.992**

---

## 📁 Complete Folder Structure

```
fake-news-detector/
├── backend/
│   ├── app.py                  ← Flask API server
│   ├── train_model.py          ← ML training script
│   ├── requirements.txt        ← Python dependencies
│   └── model/
│       ├── fake_news_model.pkl ← Trained scikit-learn pipeline
│       ├── fake_keywords.pkl   ← Top fake-indicator words
│       ├── real_keywords.pkl   ← Top real-indicator words
│       └── metrics.json        ← Model evaluation metrics
├── data/
│   ├── Fake.csv                ← Kaggle fake news dataset
│   └── True.csv                ← Kaggle real news dataset
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── Detector.jsx    ← Core AI analysis UI
            ├── About.jsx
            ├── Statistics.jsx
            ├── Comparison.jsx
            ├── FAQ.jsx
            └── Footer.jsx
```

---

## 🤖 Why This ML Model?

**Model: Logistic Regression + TF-IDF Pipeline**

| Criterion | Why it wins |
|-----------|-------------|
| **Accuracy** | 99.26% on 8,936 test samples |
| **Speed** | <0.5 second inference time |
| **Interpretability** | Probabilities + feature coefficients for explanations |
| **Generalization** | L2 regularization + balanced class weights prevent overfitting |
| **Beginner-friendly** | No GPU needed, runs on any machine |

**TF-IDF Configuration:**
- `max_features=50,000` — top 50K unigrams + bigrams
- `ngram_range=(1,2)` — captures phrase patterns like "reuters confirmed"
- `sublinear_tf=True` — log normalization reduces impact of very common words
- `min_df=3, max_df=0.85` — removes noise (rare words) and corpus-specific stopwords

**Why NOT deep learning (LSTM/BERT)?**
- Dataset size (44K) is excellent for classical ML — BERT would overfit or need fine-tuning
- TF-IDF + LogReg achieves near-identical accuracy at 100x the speed
- Easier to deploy, debug, and retrain

---

## 🔌 How React Connects to Flask (Beginner Explanation)

```
React (port 5173)  →  Vite Proxy  →  Flask (port 5000)
     ↓                                      ↓
  axios.post('/api/analyze', {text})    @app.route('/api/analyze')
     ↑                                      ↓
  result JSON  ←  Flask returns JSON  ←  model.predict()
```

**Vite proxy** (`vite.config.js`) forwards all `/api/*` requests to Flask automatically. This means:
- In React you call: `axios.post('/api/analyze', ...)`
- Vite sees `/api/...` and forwards it to `http://localhost:5000/api/...`
- **No CORS errors** in development

In production, use `flask-cors` (already included) or an Nginx reverse proxy.

---

## 🚀 Step-by-Step Setup (Complete Guide for Beginners)

### Prerequisites
Make sure you have installed:
- **Python 3.9+** → `python --version`
- **Node.js 18+** → `node --version`
- **npm** → `npm --version`

---

### STEP 1: Clone / Create Project

```bash
# If you're starting fresh, create the structure:
mkdir fake-news-detector
cd fake-news-detector
```

Copy all files from this project into the folder structure shown above.

---

### STEP 2: Place Your Datasets

```bash
mkdir data
# Copy your files here:
cp /path/to/Fake.csv data/
cp /path/to/True.csv data/
```

---

### STEP 3: Set Up Python Backend

```bash
cd backend

# Create a virtual environment (keeps dependencies isolated)
python -m venv venv

# Activate it:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install all Python packages:
pip install -r requirements.txt
```

---

### STEP 4: Train the ML Model

```bash
# Still inside backend/ with venv activated:
FAKE_CSV=../data/Fake.csv TRUE_CSV=../data/True.csv python train_model.py

# On Windows (Command Prompt):
set FAKE_CSV=../data/Fake.csv && set TRUE_CSV=../data/True.csv && python train_model.py

# You should see:
# ✓ Model saved to model/fake_news_model.pkl
# Accuracy: 99.26%
```

This creates the `model/` folder with all required files.

---

### STEP 5: Start the Flask Backend Server

```bash
# Still inside backend/ with venv activated:
python app.py

# You should see:
# Loading model...
# Model loaded! Accuracy: 99.26%
# * Running on http://127.0.0.1:5000
```

**Keep this terminal open.** Flask must be running for the AI to work.

---

### STEP 6: Set Up React Frontend

Open a **new terminal** (keep Flask running in the first one):

```bash
cd frontend

# Install all Node.js packages:
npm install

# Start the development server:
npm run dev

# You should see:
# ➜  Local:   http://localhost:5173/
```

---

### STEP 7: Open the App

Go to: **http://localhost:5173**

You now have:
- ✅ Flask backend running on port 5000
- ✅ React frontend running on port 5173
- ✅ Vite automatically proxying /api calls to Flask

---

## 🔄 How to Retrain the Model Later

1. Add new articles to `data/Fake.csv` or `data/True.csv`  
   (keep the same columns: `title, text, subject, date`)
2. Run training again:
   ```bash
   cd backend
   source venv/bin/activate   # or venv\Scripts\activate on Windows
   FAKE_CSV=../data/Fake.csv TRUE_CSV=../data/True.csv python train_model.py
   ```
3. Restart Flask:
   ```bash
   # Stop Flask with Ctrl+C, then:
   python app.py
   ```

The new model is now live!

---

## 🌐 API Reference

### POST /api/analyze

**Request:**
```json
{
  "text": "Your news article text here..."
}
```

**Response:**
```json
{
  "label": "FAKE",
  "confidence": 97.43,
  "credibility_score": 12,
  "suspicious_keywords": ["you", "video", "watch", "obama"],
  "emotional_language": ["shocking", "exposed"],
  "sentiment": {
    "label": "Highly Emotional",
    "emotional_score": 72,
    "negative_word_count": 8,
    "positive_word_count": 1
  },
  "source_credibility": {
    "score": 20,
    "sources_found": 0,
    "has_citations": false
  },
  "explanation": "This article exhibits strong indicators of misinformation...",
  "word_count": 312
}
```

### GET /api/health

Returns model status and accuracy metrics.

---

## 🏗 Building for Production

### Frontend (static files):
```bash
cd frontend
npm run build
# Creates frontend/dist/ — deploy to Vercel, Netlify, or serve with Nginx
```

### Backend (production server):
```bash
cd backend
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Deploy Options:
- **Frontend**: Vercel (`vercel deploy`) or Netlify (drag dist/ folder)
- **Backend**: Railway, Render, or any VPS with Python support
- **Together**: Docker Compose with Nginx reverse proxy

---

## 🧪 Evaluation Metrics Explained

| Metric | Score | Meaning |
|--------|-------|---------|
| **Accuracy** | 99.26% | Of all articles, 99.26% were correctly classified |
| **Precision** | 99.01% | When model says REAL, it's right 99% of the time |
| **Recall** | 99.43% | Model catches 99.43% of all actual real articles |
| **F1-Score** | 0.992 | Harmonic mean of precision & recall — best single metric |
| **CV Std** | ±0.40% | Low variance → model generalizes, not just memorizing |

**Confusion Matrix:**
```
              Predicted FAKE  Predicted REAL
Actual FAKE:      4,652            42      ← 42 false negatives
Actual REAL:         24         4,218      ← 24 false positives
```

---

## ⚠ Overfitting Prevention

1. **L2 Regularization** (`C=1.0`) — penalizes overly large weights
2. **`min_df=3`** — ignores words appearing fewer than 3 times (noise)
3. **`max_df=0.85`** — ignores words in >85% of documents (uninformative)
4. **5-fold Cross Validation** — confirmed ±0.40% std (excellent stability)
5. **Stratified split** — maintains class balance in train/test sets
6. **`class_weight="balanced"`** — handles slight class imbalance fairly