"""
Fake News Detector - Flask Backend API
=======================================
Endpoints:
  POST /api/analyze  — analyze article text
  GET  /api/health   — health check
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import string
import os
import json

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",           # local dev
    "http://localhost:5174",           # vite alternate port
    # "https://YOUR-APP.vercel.app"   # ← uncomment & fill after Vercel deploy
])

# ─────────────────────────────────────────────
# Load model artifacts once at startup
# ─────────────────────────────────────────────
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")

print("Loading model...")
pipeline = joblib.load(os.path.join(MODEL_DIR, "fake_news_model.pkl"))
fake_keywords = joblib.load(os.path.join(MODEL_DIR, "fake_keywords.pkl"))
real_keywords = joblib.load(os.path.join(MODEL_DIR, "real_keywords.pkl"))
with open(os.path.join(MODEL_DIR, "metrics.json")) as f:
    model_metrics = json.load(f)
print(f"Model loaded! Accuracy: {model_metrics['accuracy']*100:.2f}%")

# ─────────────────────────────────────────────
# Suspicious / emotional language patterns
# ─────────────────────────────────────────────
EMOTIONAL_PATTERNS = [
    r"\byou won\'t believe\b", r"\bshocking\b", r"\bexplosive\b",
    r"\bbreaking\b", r"\bmust see\b", r"\bsecret\b", r"\bexposed\b",
    r"\bscandal\b", r"\bwake up\b", r"\bthey don\'t want you to know\b",
    r"\bconspiracy\b", r"\bcabal\b", r"\bdeep state\b", r"\bhoax\b",
    r"\bfake\b", r"\blie\b", r"\bcover.?up\b", r"\bpropaganda\b",
    r"\bno one is talking about\b", r"\bsuppressed\b", r"\bgovernment hid\b",
]

CLICKBAIT_PATTERNS = [
    r"\b\d+\s+reasons\b", r"\bwhat happened next\b", r"\bwill shock you\b",
    r"\bthis is why\b", r"\bhere\'s why\b", r"\byou need to know\b",
    r"\bthe truth about\b", r"\breal reason\b",
]

SOURCE_PATTERNS = [
    r"\breuters\b", r"\bap\b", r"\bassociated press\b", r"\bnyt\b",
    r"\bnew york times\b", r"\bwashington post\b", r"\bbbc\b",
    r"\baccording to\b", r"\bsaid in a statement\b", r"\bofficial\b",
    r"\bspokesperson\b", r"\bconfirmed\b",
]


def clean_text(text: str) -> str:
    """Same preprocessing used during training."""
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"\d+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text).strip()
    return text


def find_suspicious_keywords(text: str) -> list[str]:
    """Find top-fake-indicator words present in the article."""
    text_lower = text.lower()
    words = set(text_lower.split())
    found = []
    for kw in fake_keywords:
        if " " in kw:
            if kw in text_lower:
                found.append(kw)
        else:
            if kw in words:
                found.append(kw)
    return found[:10]  # Return top 10


def detect_emotional_language(text: str) -> list[str]:
    """Detect emotionally manipulative language patterns."""
    text_lower = text.lower()
    found = []
    for pattern in EMOTIONAL_PATTERNS + CLICKBAIT_PATTERNS:
        if re.search(pattern, text_lower):
            match = re.search(pattern, text_lower)
            if match:
                found.append(match.group().strip())
    return list(set(found))[:8]


def analyze_source_credibility(text: str) -> dict:
    """Check for credible source mentions."""
    text_lower = text.lower()
    matches = [p for p in SOURCE_PATTERNS if re.search(p, text_lower)]
    score = min(100, len(matches) * 15 + 20)
    return {
        "score": score,
        "sources_found": len(matches),
        "has_citations": score > 50,
    }


def sentiment_analysis(text: str) -> dict:
    """
    Lightweight rule-based sentiment.
    Fake news tends to be more emotionally charged.
    """
    negative_words = [
        "terrible", "horrible", "disgusting", "outrageous", "corrupt",
        "evil", "destroy", "attack", "hate", "dangerous", "threat",
        "crisis", "disaster", "failure", "corrupt", "lie", "fraud",
    ]
    positive_words = [
        "confirmed", "verified", "official", "statement", "evidence",
        "data", "research", "study", "report", "analysis",
    ]
    text_lower = text.lower()
    words = text_lower.split()
    neg_count = sum(1 for w in words if w in negative_words)
    pos_count = sum(1 for w in words if w in positive_words)
    total = len(words)

    emotional_score = min(100, int((neg_count / max(total, 1)) * 2000))
    label = "Neutral"
    if emotional_score > 60:
        label = "Highly Emotional"
    elif emotional_score > 30:
        label = "Moderately Emotional"
    elif pos_count > neg_count:
        label = "Fact-oriented"

    return {
        "label": label,
        "emotional_score": emotional_score,
        "negative_word_count": neg_count,
        "positive_word_count": pos_count,
    }


def generate_explanation(
    label: str,
    confidence: float,
    suspicious: list,
    emotional: list,
    source_info: dict,
    sentiment: dict,
) -> str:
    """Generate a human-readable AI explanation."""
    if label == "FAKE":
        parts = []
        if confidence > 0.90:
            parts.append("This article exhibits strong indicators of misinformation.")
        else:
            parts.append("This article shows several signs of potentially misleading content.")

        if emotional:
            parts.append(
                f"It contains emotionally charged language such as: "
                f"'{', '.join(emotional[:3])}'."
            )
        if suspicious:
            parts.append(
                f"Key terms associated with fake news were detected: "
                f"'{', '.join(suspicious[:4])}'."
            )
        if not source_info["has_citations"]:
            parts.append(
                "The article lacks references to credible news sources or official statements."
            )
        if sentiment["label"] == "Highly Emotional":
            parts.append(
                "The writing style is highly emotional, which is common in sensationalist content."
            )
        parts.append("We recommend verifying this article through trusted news outlets.")
        return " ".join(parts)
    else:
        parts = []
        if confidence > 0.90:
            parts.append("This article demonstrates strong characteristics of credible journalism.")
        else:
            parts.append("This article shows several signs of legitimate reporting.")

        if source_info["has_citations"]:
            parts.append("It references credible sources and official statements.")
        if sentiment["label"] in ["Fact-oriented", "Neutral"]:
            parts.append("The language is measured and fact-oriented rather than emotionally manipulative.")
        if not emotional:
            parts.append("No clickbait or emotionally manipulative language patterns were detected.")
        parts.append("The content aligns with patterns found in verified news reporting.")
        return " ".join(parts)


# ─────────────────────────────────────────────
# API ENDPOINTS
# ─────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model_accuracy": model_metrics["accuracy"],
        "model_f1": model_metrics["f1_score"],
    })


@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data["text"].strip()
    if len(text) < 30:
        return jsonify({"error": "Text too short. Please provide more content."}), 400

    # Preprocess
    clean = clean_text(text)

    # Predict
    prediction = pipeline.predict([clean])[0]
    proba = pipeline.predict_proba([clean])[0]

    label = "REAL" if prediction == 1 else "FAKE"
    confidence = float(proba[prediction])

    # Credibility score: weighted combination of signals
    source_info = analyze_source_credibility(text)
    sentiment = sentiment_analysis(text)
    suspicious = find_suspicious_keywords(text)
    emotional = detect_emotional_language(text)

    # Credibility = confidence if real, inverse if fake
    base = confidence * 100 if label == "REAL" else (1 - confidence) * 100
    bonus = source_info["score"] * 0.3
    penalty = len(emotional) * 3
    credibility = max(0, min(100, int(base * 0.7 + bonus - penalty)))

    explanation = generate_explanation(
        label, confidence, suspicious, emotional, source_info, sentiment
    )

    return jsonify({
        "label": label,
        "confidence": round(confidence * 100, 2),
        "credibility_score": credibility,
        "suspicious_keywords": suspicious,
        "emotional_language": emotional,
        "sentiment": sentiment,
        "source_credibility": source_info,
        "explanation": explanation,
        "word_count": len(text.split()),
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)