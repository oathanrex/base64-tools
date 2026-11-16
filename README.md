<div align="center">

# Base64 Tools Studio
**Google-Grade Client-Side Encoding, Decoding, Cryptographic Analysis & Omni-Workbench Suite**

[![Tools](https://img.shields.io/badge/Tools-40_Tools-10b981?style=for-the-badge&logoColor=white)](https://oathanrex.github.io/base64-tools/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline_First-059669?style=for-the-badge)](https://oathanrex.github.io/base64-tools/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_In--Memory-0d9488?style=for-the-badge)](https://oathanrex.github.io/base64-tools/)
[![RFC 4648](https://img.shields.io/badge/Standard-RFC_4648_Compliant-047857?style=for-the-badge)](https://oathanrex.github.io/base64-tools/)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

*Engineered by [Oathan Rex](https://oathanrex.github.io)*

---

[Launch Application](https://oathanrex.github.io/base64-tools/) • [Omni-Workbench](#universal-omni-workbench) • [Tool Catalog (40 Tools)](#production-tool-catalog) • [Engineering Guide](#practitioner-engineering-guide) • [RFC 4648 Specs](#rfc-4648-engineering-standards)

</div>

---

## Executive Overview

**Base64 Tools Studio** is an offline-first single-page developer flagship suite providing **40 client-side conversion, inspection, and cryptographic digest tools** for raw data, multimedia, documents, and web protocols.

Built from first principles with **zero external runtime dependencies**, the suite processes all transformations directly inside the browser's JavaScript V8 engine (Web Workers, `FileReader`, Web Crypto API `crypto.subtle`, and `TextEncoder`), ensuring complete data confidentiality and zero server uploads.

---

## What Makes This 10 / 10 Google-Grade

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Universal Omni-Workbench                          │
├───────────────────┬───────────────────┬────────────────────────────────┤
│   Auto-Detection  │  Session Telemetry│   Multi-Language Generator     │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ • Plain Text      │ • Throughput HUD  │ • JavaScript / TypeScript      │
│ • Base64 / URLSafe│ • Ops Counter     │ • Python, Go, Rust, PHP        │
│ • Hex & 8-Bit Bin │ • Sub-ms Latency  │ • Bash / cURL, HTML / CSS      │
│ • Data URI & JWT  │ • Memory Privacy  │ • One-Click Copy & Export      │
└───────────────────┴───────────────────┴────────────────────────────────┘
          │                   │                  │
          ▼                   ▼                  ▼
  [ 40 Studio Tools ]  [ PWA ServiceWorker ]  [ Interactive Sandboxes ]
```

1. **Universal Omni-Workbench**: Never guess which converter to use. Paste plain text, standard Base64, URL-Safe strings, Hex byte streams, 8-bit binary bits, Data URIs, or JSON Web Tokens (JWT) — the engine instantly detects the input format, selects the optimal conversion pathway, and generates production code snippets in 7 programming languages.
2. **Session Telemetry & Health HUD**: Live hardware metrics displaying throughput volume, operation counts, sub-millisecond execution latency, and a verified 100% in-browser memory privacy guarantee.
3. **Advanced Personalization**: Pin your most frequently used tools to the top of the interface with persistent local storage. Custom preferences allow configuring output line wrapping (64 chars RFC 2045, 76 chars RFC 1421), RFC 4648 §5 padding stripping, and character encodings.
4. **40 Production Tools with Live Sandboxes**: Dedicated preview players for audio, video, PDFs, images, XML trees, CSV tables, and an interactive **Font to Base64 Typography Specimen Sandbox** where uploaded fonts are decoded and previewed in real-time.
5. **Mobile-First UX & Stepper Navigation**: Two-column high-visibility grid on mobile screens with bottom Next/Previous steppers and progress dots so users never get lost in multi-section documentation.
6. **Progressive Web App (PWA)**: Complete offline capability powered by a Cache-First Service Worker (`sw.js`) and modern web app manifest.

---

## Universal Omni-Workbench

The primary workbench at the top of the application eliminates developer friction:

- **Format Heuristic Classifier**: Instantly recognizes `plaintext`, `base64`, `base64-url`, `data-uri`, `jwt`, `hex`, and `binary`.
- **Live Reactive Execution**: Automatically transforms payloads as you type with debounced performance optimization.
- **Visual Previews**: Inline rendering for decoded images and color-coded JWT breakdown (Header, Payload, Signature) with token expiration countdown badges.
- **Polyglot Code Generator**: Copy drop-in code snippets for:
  - **JavaScript / TypeScript** (`atob`, `btoa`, `decodeURIComponent`)
  - **Python** (`base64.b64decode`, `base64.b64encode`)
  - **Go** (`base64.StdEncoding.DecodeString`)
  - **Rust** (`base64::Engine::decode`)
  - **PHP** (`base64_decode`, `base64_encode`)
  - **Bash / Terminal** (`echo -n ... | base64 --decode`)
  - **HTML / CSS** (`<img src="data:..." />`, `background-image: url(...)`)

---

## Production Tool Catalog (40 Tools)

### 1. Text & Encodings (5 Tools)
- **Text to Base64**: Full UTF-8 multi-byte string serialization.
- **Base64 to Text**: Lossless Unicode byte reconstruction.
- **URL-Safe Base64 Encoder**: RFC 4648 §5 parameter encoding (`+` $\to$ `-`, `/` $\to$ `_`).
- **URL-Safe Base64 Decoder**: Strict query-string unescape and validation.
- **Live Real-Time Encoder/Decoder**: Instantaneous bidirectional reactive conversion.

### 2. Files & Documents (6 Tools)
- **File to Base64**: Universal drag-and-drop file encoder with progress monitoring.
- **Base64 to File**: Automatic MIME reconstruction and binary asset download.
- **PDF to Base64**: Dedicated document data URI generator.
- **Base64 to PDF**: Embedded PDF preview and instant export.
- **Batch File Encoder**: Multi-file queue processing with individual payload export.
- **Batch Image Encoder**: Automated image asset matrix encoder.

### 3. Image & Typography Studio (5 Tools)
- **Font to Base64 & Specimen**: Encodes WOFF2, TTF, OTF to Base64 with live interactive typography specimen tester.
- **Image to Base64**: Data URI generator for PNG, JPEG, GIF, WebP, and SVG.
- **Base64 to Image**: Live visual rendering, dimension metrics, and download.
- **Image to CSS Background**: Generates production-ready `background-image: url(...)` declarations.
- **Image to HTML Tag**: Pre-formats `<img>` markup with width, height, and accessibility attributes.

### 4. Audio & Video Multimedia (4 Tools)
- **Audio to Base64**: Encodes MP3, WAV, OGG, and AAC with integrated audio player preview.
- **Base64 to Audio**: In-browser waveform playback and audio file reconstruction.
- **Video to Base64**: Encodes MP4 and WebM video streams into Base64 data URIs.
- **Base64 to Video**: HTML5 video playback sandbox with file download.

### 5. Structured Data & Protocols (6 Tools)
- **JSON to Base64**: JSON object minification and base64 packaging.
- **Base64 to JSON**: Decodes and auto-formats structured JSON data trees.
- **XML to Base64**: Serializes XML hierarchies into transmission strings.
- **Base64 to XML**: Decodes and pretty-prints XML documents.
- **CSV to Base64**: Spreadsheet text conversion.
- **Base64 to CSV**: Decodes Base64 payloads into formatted tabular data.

### 6. Developer & Inspection Utilities (5 Tools)
- **Data URI Generator**: Configurable MIME type header prepend (`data:<mime>;base64,<payload>`).
- **MIME Magic Byte Detector**: Inspects raw leading hexadecimal magic bytes (e.g. `89 50 4E 47`, `FF D8 FF`, `25 50 44 46`).
- **Base64 Validator**: Deep validation of character sets, padding constraints, and byte boundary rules.
- **Size & Inflation Calculator**: Detailed metrics analyzing 4/3 (+33.34%) memory expansion.
- **Base64 Diff Tool**: Side-by-side payload comparison highlighting character deviations and exact match percentages.

### 7. Security & Cryptography (3 Tools)
- **JWT Token Inspector**: Decodes header, payload, expiration dates, and claims without remote signature transmission.
- **Basic Auth Header Generator**: Generates RFC 7617 `Authorization: Basic <credentials>` headers.
- **Base64 + Hash Digest**: Computes cryptographic fingerprints (SHA-256, SHA-512, SHA-1) using Web Crypto API.

### 8. Byte & Bit Level Utilities (6 Tools)
- **Bulk Encoder**: Multi-row batch encoder with delimiter controls.
- **Bulk Decoder**: Multi-row batch decoder.
- **Base64 to Hex**: Translates base64 characters into hexadecimal byte notations.
- **Hex to Base64**: Converts hexadecimal byte streams into Base64 strings.
- **Binary to Base64**: Encodes raw 8-bit binary bits (`01001000...`) to Base64.
- **Base64 to Binary**: Decodes Base64 into formatted 8-bit binary octets.

---

## Practitioner Engineering Guide

The suite includes an interactive 6-part manual designed for software engineers and cybersecurity specialists:

1. **Field Guide**: Core fundamentals of binary chunking (24 bits into four 6-bit index values) and when to inline vs. link assets.
2. **The 33% Inflation Rule**: Exact mathematical calculations for transport overhead, GZIP interaction, and bandwidth cost mitigation.
3. **MIME Magic Signatures**: Table of magic byte hexadecimal signatures (`PNG`, `JPEG`, `GIF`, `WebP`, `PDF`, `ZIP`, `Wasm`, `MP3`, `MP4`, `WOFF2`).
4. **Security & JWT Privacy**: Deep dive into why Base64 is encoding rather than encryption, token leak prevention, and client-side memory safety.
5. **URL-Safe RFC 4648 §5**: Detailed specification differences for query parameters and headers.
6. **Developer FAQ**: Authoritative answers regarding file limits, padding repairs, and CSS inlining.

---

## Keyboard Navigation & Productivity

| Key Combination | Action Description |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Global fuzzy search across all 40 tools |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | Trigger primary execution action (Encode / Decode) |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | Copy active output payload to system clipboard |
| <kbd>Ctrl</kbd> + <kbd>D</kbd> | Toggle light and dark theme mode |
| <kbd>Ctrl</kbd> + <kbd>L</kbd> | Clear active input and output fields |
| <kbd>Escape</kbd> | Close active modal dialog or return to tool grid |
| <kbd>?</kbd> | Open keyboard shortcut reference modal |

---

## RFC 4648 Engineering Standards

Base64 Tools Studio adheres strictly to the Internet Engineering Task Force (IETF) specification **RFC 4648**:

$$\text{Original Size} = N \text{ bytes} \implies \text{Encoded Size} = 4 \times \left\lceil \frac{N}{3} \right\rceil \text{ bytes}$$

$$\text{Inflation Factor} = \frac{4 - 3}{3} \times 100\% = 33.333\%$$

- **Alphabet 0–61**: `[A-Za-z0-9]`
- **RFC 4648 §4 (Standard)**: Index 62 = `+`, Index 63 = `/`, Pad = `=`
- **RFC 4648 §5 (URL & Filename Safe)**: Index 62 = `-`, Index 63 = `_`, Unpadded

---

## Ecosystem Links

- **Main Developer Portfolio**: [oathanrex.github.io](https://oathanrex.github.io)
- **JavaScript Unpacker Studio**: [oathanrex.github.io/jsUnpacker](https://oathanrex.github.io/jsUnpacker/)
- **Technical Articles & Publications**: [oathanrex.blogspot.com](https://oathanrex.blogspot.com)
- **Developer Vault**: [github.com/oathanrex/developer-vault](https://github.com/oathanrex/developer-vault)

---

## License

Licensed under the [MIT License](LICENSE). Copyright © 2024–2026 Oathan Rex. All rights reserved.
