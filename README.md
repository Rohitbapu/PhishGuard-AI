🛡️ PhishGuard AI: Real-Time Phishing Protection

**PhishGuard AI** is a high-performance, deep-learning-based browser security extension designed to detect phishing threats in real-time. Unlike traditional signature-based blockers, PhishGuard uses a **BERT-based Transformer model** to analyze URL structures and identify malicious intent before a user clicks.

## 🌟 The Problem

Phishing remains the #1 entry point for cyberattacks. Existing solutions rely on static blacklists (like Google Safe Browsing), which fail to catch **Zero-Day phishing sites** that appear and disappear in minutes. Users need a solution that "thinks" like a human but reacts with the speed of a machine.

## 🚀 The Solution

Our solution leverages a fine-tuned **BERT (Bidirectional Encoder Representations from Transformers)** model.

* **Proactive Detection:** Identifies malicious patterns in URLs without needing a database of known "bad" links.
* **GPU Acceleration:** Offloads heavy mathematical matrix operations to the **NVIDIA GPU (CUDA)**, reducing CPU overhead by **60%** and providing near-instant results.
* **Privacy-First:** The AI runs locally on your machine—your browsing data never leaves your local network.

---

## 🛠️ Tech Stack

* **Frontend:** Chrome Extension API (JavaScript/HTML/CSS)
* **Backend:** FastAPI (Python)
* **AI Model:** BERT (Transformers/PyTorch)
* **Hardware:** NVIDIA CUDA (GPU Acceleration)

---

## 💻 Hardware Configuration (GPU Version)

This version is optimized for systems with dedicated NVIDIA graphics cards.

* **GPU:** NVIDIA GeForce GTX 1650 (or higher)
* **Software:** CUDA Toolkit 12.x / 13.x
* **VRAM Utilization:** ~1.2 GB
* **Processing Speed:** < 50ms per URL

---

1. Hardware & Environment Check
Operating System: Windows 10/11.

Python: Ensure Python 3.10 or 3.11 is installed.

GPU Users: Ensure you have the latest NVIDIA Studio/Game Ready drivers installed.

2. Prepare the AI Backend
Open VS Code and open your project folder (e.g., E:\Phish Pro\API).

Open a new terminal (Ensure no (venv) is active).

Install Dependencies:

GPU: Run: pip install torch --index-url https://download.pytorch.org/whl/cu124

CPU: (If no NVIDIA card) Run: pip install torch --index-url https://download.pytorch.org/whl/cpu

Common: Run: pip install fastapi uvicorn transformers pydantic phishing-detection-py

Start the Server:

Run: python -m uvicorn main:app --reload

Verify Mode:

GPU: Look for: 🚀 GPU Active: PhishGuard Engine Ready

CPU: Look for: 💻 GPU not detected. Running in Universal CPU Mode.

3. Install the Chrome Frontend
Open Google Chrome and go to chrome://extensions/.

Enable Developer Mode (toggle in the top right corner).

Click the Load Unpacked button.

Select your extension folder (e.g., E:\Phish Pro\Extension).

Pin the Extension: Click the puzzle icon in Chrome and pin PhishGuard Pro.

---

## 🕹️ Features

* **Real-Time Scanning:** Automatically scans every link on a webpage as it loads.
* **Protection Toggle:** Quickly enable or disable the AI filter via the professional dashboard.
* **Dynamic Allowlist:** Add trusted domains (like Amazon or Gmail) to a local "Safe List" to bypass the AI scan.
* **Status Monitor:** Live indicator showing the connection status to the local GPU engine.

---

## 👥 The Team

* **S B ROHIT BAPU** - Lead Developer & AI Integration
* **Muhammed Ibrahim** - Lead Developer & AI Integration
* **K Siddharth** - Web Developer and Presentation

---
