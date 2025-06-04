from textblob import TextBlob
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

MODEL_PATH = "app/models/bigbird-model"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, use_fast=False)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

def analyze_classify(text: str) -> dict:
    inputs = tokenizer(
        text,
        return_tensors="pt",
        padding="max_length",
        truncation=True,
        max_length=4096
    )

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=1)
        confidence, prediction = torch.max(probs, dim=1)

    return {
        "label": prediction.item(),
        "confidence": round(confidence.item(), 4)
    }


def analyze_sentiment(text: str):
    blob = TextBlob(text)
    sentiment = blob.sentiment
    label = (
        "positive" if sentiment.polarity > 0.2 else
        "negative" if sentiment.polarity < -0.2 else
        "neutral"
    )
    
    return {
        "polarity": sentiment.polarity,
        "subjectivity": sentiment.subjectivity,
        "label": label
    }