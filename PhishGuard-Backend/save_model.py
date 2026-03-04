from transformers import AutoModelForSequenceClassification, AutoTokenizer
import os

# Using a verified public model for Phishing detection
model_name = "ealvaradob/bert-finetuned-phishing"
save_path = "./model_data"

print(f"⏳ Downloading {model_name}...")

try:
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    
    # Download and save locally
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    model.save_pretrained(save_path)
    tokenizer.save_pretrained(save_path)
    
    print(f"✅ Success! Model saved to {save_path} for offline use.")
except Exception as e:
    print(f"❌ Error downloading model: {e}")