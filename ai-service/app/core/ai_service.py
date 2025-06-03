# app/core/ai_service.py

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# Path to the unzipped model directory
MODEL_PATH = "app/models/bigbird-model"

# Load the tokenizer (SentencePiece-based) and the model
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, use_fast=False)  # SentencePiece = use_fast=False
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()  # Put the model in inference mode

def analyze_classify(text: str) -> dict:
    # Tokenize and prepare input
    inputs = tokenizer(
        text,
        return_tensors="pt",
        padding="max_length",
        truncation=True,
        max_length=4096  # BigBird supports long inputs
    )

    # Inference without gradient tracking
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=1)
        confidence, prediction = torch.max(probs, dim=1)

    return {
        "label": prediction.item(),
        "confidence": round(confidence.item(), 4)
    }
