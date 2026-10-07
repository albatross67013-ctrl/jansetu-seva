<<<<<<< HEAD
# JanSetu Digital Citizen Services & e-District Portal

A complete, modern citizen service portal supporting instant application, verification, payment, and digital certificate downloading.

## Features Implemented According to Requirements

1. **Multi-language Support (बहुभाषी समर्थन)**:
   - Dynamic real-time switching between 5 languages:
     - **English**
     - **हिन्दी (Hindi)**
     - **Hinglish (हिंग्लिश)**
     - **বাংলা (Bengali)**
     - **मराठी (Marathi)**
   - All navigation, service cards, document requirements, application forms, payment instructions, and AI assistant dialogs are translated dynamically.

2. **Minimum Government Cost & Official UPI Integration**:
   - Nominal statutory government fees:
     - **Caste Certificate (जाति प्रमाण पत्र)**: ₹30 (₹20 Statutory + ₹10 Portal Processing)
     - **Birth Certificate (जन्म प्रमाण पत्र)**: ₹25 (₹15 Statutory + ₹10 Portal Processing)
     - **Income Certificate (आय प्रमाण पत्र)**: ₹30 (₹20 Statutory + ₹10 Portal Processing)
   - Official Receiver UPI ID: **`7501468140-4@ybl`**
   - Features:
     - Prominent UPI ID display with one-click **"Copy UPI ID"** button
     - Dynamic offline-capable **QR Code** for scanning with Google Pay, PhonePe, Paytm, BHIM
     - Direct mobile app payment link (`upi://pay?...`)
     - Optional UPI UTR / Transaction reference input with instant verification simulation

3. **Related Images on Each Service Panel**:
   - Each service card prominently features its official certificate specimen image:
     - **Caste Certificate**: `images/caste_certificate.jpeg`
     - **Birth Certificate**: `images/birth_certificate.jpeg`
     - **Income Certificate**: `images/income_certificate.jpeg`
   - High-resolution interactive lightbox preview modal by clicking on the specimen image.

4. **Strict Step-by-Step Flow**:
   - **Step 1: Choose Service**: Preview certificate image, validity, and statutory government cost.
   - **Step 2: Upload Documents**: Check required proofs (Aadhaar, residence, hospital/caste/income slips) with individual upload and a **"⚡ Quick Test: Auto-verify All 3 Documents"** shortcut.
   - **Step 3: Applicant Particulars**: Interactive form tailored to the selected certificate (category/sub-caste, DOB/place of birth, or annual family income).
   - **Step 4: Review Summary**: Final review of all entered details and verified documents.
   - **Step 5: Payment Option (UPI)**: *Payment comes after filling all required documents & form details.* Fee invoice breakdown, UPI ID `7501468140-4@ybl`, QR code scan, and payment verification.
   - **Step 6: Completion & Issuance**: *After payment the process is completed.* Digital reference ID generated and certificate status updated to "Issued & Verified".

5. **Download Issued Certificate**:
   - Citizens can download their issued certificate:
     - Directly upon completing the application flow.
     - From the **"My Applications"** table at any time.
     - From the **"Active Journey"** tracking card on the Overview dashboard.
   - **Official Certificate Layout**:
     - Ashok Stambh National Emblem & State e-District header
     - Official Certificate Title (Caste, Birth, or Income)
     - Unique Certificate Number, Application Ref, and Date of Issue
     - Full applicant details in official tabular format
     - Digital verification QR code & barcode
     - Digital Signature Stamp of the Sub-Divisional Magistrate (SDM) / Tehsildar
     - **"Print / Save PDF"**: Triggers browser print with dedicated clean A4 print styles.
     - **"Download Document"**: Instant JSON / document file download.

6. **Interactive AI Seva Assistant**:
   - Multilingual guidance with voice microphone input and speech synthesis voice output.

## How to Run Locally

### Option 1: Python Backend Server (Recommended)
Python 3 is installed. In this folder, run:
```sh
python backend.py
```
Or:
```sh
python server.py
```
Or with custom port:
```sh
python backend.py 3000
```

### Option 2: Node.js Server
If Node is installed:
```sh
node server.js
```

### Open in Browser
Visit: https://albatross67013-ctrl.github.io/jansetu-seva/

Both servers serve all frontend files, images (`/images/...`), and mock REST API endpoints (`/api/health`, `/api/applications`, `/api/certificates/:id`).
=======
# jansetu-seva
AI Agent for Government Certificate Services
>>>>>>> a1eccf6a6aafd9565d3ec380b10bf99440b281b7
