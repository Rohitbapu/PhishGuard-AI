import os
import sys
import torch
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

# --- EXE PATH LOGIC ---
# This part tells the .exe exactly where to find the 'model_data' folder
if getattr(sys, 'frozen', False):
    base_path = sys._MEIPASS
else:
    base_path = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(base_path, "model_data")
# ----------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Initialize the AI Engine directly
# device=0 uses your GTX 1650, device=-1 falls back to CPU automatically
device_id = 0 if torch.cuda.is_available() else -1
detector_pipeline = pipeline(
    "text-classification", 
    model=model_path, 
    tokenizer=model_path, 
    device=device_id
)

if device_id == 0:
    print("🚀 GPU Active: PhishGuard Engine Ready")
else:
    print("💻 CPU Mode Active: PhishGuard Engine Ready")

class URLRequest(BaseModel):
    url: str

@app.post("/check")
async def check_url(req: URLRequest):
    try:
        # Standard input cleaning
        safe_url = req.url[:500]
        
        # Run prediction
        results = detector_pipeline(safe_url)
        pred = results[0]
        
        # Determine if it's phishing
        is_phish = True if pred["label"].lower() == 'phishing' else False
        
        print(f"URL: {safe_url[:40]}... | Phish: {is_phish} | Score: {pred['score']:.2f}")
        
        return {"url": req.url, "is_phishing": is_phish, "score": pred["score"]}
    except Exception as e:
        print(f"Error during scan: {e}")
        return {"url": req.url, "is_phishing": False, "score": 0.0}

if __name__ == "__main__":
    # This keeps the server running and prevents the .exe from auto-closing
    uvicorn.run(app, host="127.0.0.1", port=8000)