"""
Fake News Detector - Model Training Script
==========================================
Model: Logistic Regression with TF-IDF
Why chosen:
  - Excellent for text classification tasks
  - Interpretable (gives probabilities, not just labels)
  - Generalizes well with proper regularization
  - Fast training & inference
  - Works great with TF-IDF features
  - Outperforms deep learning on small-medium datasets

Pipeline:
  1. Load & merge datasets
  2. Clean & preprocess text
  3. TF-IDF vectorization (captures word importance)
  4. Train with L2 regularization (prevents overfitting)
  5. Evaluate with multiple metrics
  6. Save model artifacts
"""

import pandas as pd
import numpy as np
import re
import string
import joblib
import os
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, precision_score,
                             recall_score, f1_score, confusion_matrix,
                             classification_report)
from sklearn.pipeline import Pipeline

# ─────────────────────────────────────────────
# 1. LOAD DATASETS
# ─────────────────────────────────────────────
print("=" * 50)
print("PHASE 1: Loading Datasets")
print("=" * 50)

fake_path = os.environ.get("FAKE_CSV", "../data/Fake.csv")
true_path = os.environ.get("TRUE_CSV", "../data/True.csv")

fake_df = pd.read_csv(fake_path)
true_df = pd.read_csv(true_path)

fake_df["label"] = 0   # 0 = FAKE
true_df["label"] = 1   # 1 = REAL

print(f"Fake news articles: {len(fake_df)}")
print(f"Real news articles: {len(true_df)}")

# ─────────────────────────────────────────────
# 2. MERGE & CLEAN
# ─────────────────────────────────────────────
print("\nPHASE 2: Merging & Cleaning")
print("=" * 50)

df = pd.concat([fake_df, true_df], ignore_index=True)
df = df.drop_duplicates()
df = df.dropna(subset=["text"])

# Combine title + text for richer features
df["content"] = df["title"].fillna("") + " " + df["text"].fillna("")

print(f"Total samples after merge: {len(df)}")
print(f"Label distribution:\n{df['label'].value_counts()}")


def clean_text(text):
    """
    Professional text preprocessing:
    - Lowercase
    - Remove URLs (common in fake news)
    - Remove special characters & digits
    - Remove extra whitespace
    Note: We intentionally keep stopwords because their
    frequency patterns matter for fake vs real detection.
    We skip stemming to preserve interpretability.
    """
    text = str(text).lower()
    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)
    # Remove HTML tags
    text = re.sub(r"<.*?>", "", text)
    # Remove digits
    text = re.sub(r"\d+", "", text)
    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))
    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


df["clean_content"] = df["content"].apply(clean_text)
df = df[df["clean_content"].str.len() > 20]  # Remove near-empty articles

print(f"Samples after cleaning: {len(df)}")

# ─────────────────────────────────────────────
# 3. TRAIN-TEST SPLIT
# ─────────────────────────────────────────────
print("\nPHASE 3: Train-Test Split (80/20, stratified)")
print("=" * 50)

X = df["clean_content"]
y = df["label"]

# Stratified split preserves class balance in both sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples:  {len(X_test)}")

# ─────────────────────────────────────────────
# 4. BUILD PIPELINE
# ─────────────────────────────────────────────
print("\nPHASE 4: Building TF-IDF + Logistic Regression Pipeline")
print("=" * 50)
"""
TF-IDF Configuration:
  - max_features=50000: captures top 50K words
  - ngram_range=(1,2): unigrams + bigrams (phrase patterns)
  - sublinear_tf=True: log normalization (reduces impact of very frequent words)
  - min_df=3: ignore very rare words (reduces noise)
  - max_df=0.85: ignore very common words (corpus-specific stopwords)

Logistic Regression Configuration:
  - C=1.0: L2 regularization strength (prevents overfitting)
  - max_iter=1000: enough iterations for convergence
  - solver='lbfgs': efficient for large datasets
"""

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        max_features=50000,
        ngram_range=(1, 2),
        sublinear_tf=True,
        min_df=3,
        max_df=0.85,
        strip_accents="unicode",
        analyzer="word",
    )),
    ("clf", LogisticRegression(
        C=1.0,
        max_iter=1000,
        solver="lbfgs",
        class_weight="balanced",  # handles slight imbalance
        random_state=42,
        n_jobs=-1,
    ))
])

# ─────────────────────────────────────────────
# 5. TRAIN
# ─────────────────────────────────────────────
print("\nPHASE 5: Training Model...")
print("=" * 50)
pipeline.fit(X_train, y_train)
print("Training complete!")

# ─────────────────────────────────────────────
# 6. EVALUATE
# ─────────────────────────────────────────────
print("\nPHASE 6: Evaluation Metrics")
print("=" * 50)

y_pred = pipeline.predict(X_test)
y_prob = pipeline.predict_proba(X_test)

acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print(f"Accuracy:  {acc:.4f} ({acc*100:.2f}%)")
print(f"Precision: {prec:.4f}")
print(f"Recall:    {rec:.4f}")
print(f"F1-Score:  {f1:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["FAKE", "REAL"]))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Cross-validation (5-fold) — checks for overfitting
print("\nPHASE 6b: 5-Fold Cross Validation")
cv_scores = cross_val_score(pipeline, X, y, cv=5, scoring="f1", n_jobs=-1)
print(f"CV F1 Scores: {cv_scores}")
print(f"Mean CV F1: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
if cv_scores.std() < 0.02:
    print("✓ Low variance — model generalizes well (no overfitting)")

# ─────────────────────────────────────────────
# 7. EXTRACT TOP FEATURES (for keyword detection)
# ─────────────────────────────────────────────
tfidf = pipeline.named_steps["tfidf"]
clf = pipeline.named_steps["clf"]
feature_names = tfidf.get_feature_names_out()
coefficients = clf.coef_[0]

top_fake_indices = np.argsort(coefficients)[:30]
top_real_indices = np.argsort(coefficients)[-30:]

fake_keywords = list(feature_names[top_fake_indices])
real_keywords = list(feature_names[top_real_indices])

print("\nTop FAKE indicators:", fake_keywords[:15])
print("Top REAL indicators:", real_keywords[-15:])

# ─────────────────────────────────────────────
# 8. SAVE MODEL ARTIFACTS
# ─────────────────────────────────────────────
print("\nPHASE 7: Saving Model Artifacts")
print("=" * 50)

os.makedirs("model", exist_ok=True)
joblib.dump(pipeline, "model/fake_news_model.pkl")
joblib.dump(fake_keywords, "model/fake_keywords.pkl")
joblib.dump(real_keywords, "model/real_keywords.pkl")

# Save metrics summary
metrics = {
    "accuracy": round(acc, 4),
    "precision": round(prec, 4),
    "recall": round(rec, 4),
    "f1_score": round(f1, 4),
    "cv_mean_f1": round(float(cv_scores.mean()), 4),
    "cv_std": round(float(cv_scores.std()), 4),
}
import json
with open("model/metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

print("✓ Model saved to model/fake_news_model.pkl")
print("✓ Keywords saved to model/fake_keywords.pkl")
print("✓ Metrics saved to model/metrics.json")
print("\nTraining complete! ✨")