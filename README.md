<div align="center">

# Base64 Tools Studio
**High-Performance Client-Side Encoding, Decoding, and Cryptographic Analysis Hub**

[![Tools](https://img.shields.io/badge/Tools-38_Tools-10b981?style=for-the-badge&logoColor=white)](https://oathanrex.github.io/base64-tools/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-059669?style=for-the-badge)](https://oathanrex.github.io/base64-tools/)
[![RFC 4648](https://img.shields.io/badge/Standard-RFC_4648_Compliant-0d9488?style=for-the-badge)](https://oathanrex.github.io/base64-tools/)
[![License](https://img.shields.io/badge/License-MIT-047857?style=for-the-badge)](LICENSE)

*Engineered by [Oathan Rex](https://oathanrex.github.io)*

---

[Launch Application](https://oathanrex.github.io/base64-tools/) • [Architecture Overview](#system-architecture) • [Tool Catalog](#production-tool-catalog) • [RFC 4648 Specifications](#rfc-4648-engineering-standards)

</div>

---

## Executive Overview

**Base64 Tools Studio** is an offline-first single-page engineering workbench providing **38 client-side conversion, inspection, and cryptographic digest tools** for raw data, multimedia, documents, and web protocols.

Built from first principles with zero external runtime dependencies, the suite processes all transformations directly inside the browser's JavaScript V8 engine (Web Workers, `FileReader`, Web Crypto API `crypto.subtle`, and `TextEncoder`), ensuring complete data confidentiality and zero data leakage.

---

## Architectural Principles

```
  ┌────────────────────────────────────────────────────────┐
  │              Client-Side Browser Sandbox               │
  ├───────────────────┬───────────────────┬────────────────┤
  │   Text & Data     │    Media Stream   │  Crypto & AST  │
  ├───────────────────┼───────────────────┼────────────────┤
  │ • UTF-8 Encoder   │ • Audio Playback  │ • SHA-256 / 512│
  │ • URL-Safe Engine │ • Video Canvas    │ • JWT Claims   │
  │ • JSON/XML/CSV    │ • PDF Frame View  │ • Magic Bytes  │
  └───────────────────┴───────────────────┴────────────────┘
            │                   │                  │
            ▼                   ▼                  ▼
    [ Memory Array ]    [ Blob URL Cache ]   [ SubtleDigest ]
```

1. **Zero-Telemetry Confidentiality**: No payloads, images, tokens, or audio/video files ever leave the user's workstation. 100% memory isolation.
2. **Chunked Streaming Pipeline**: Large file transformations utilize asynchronous chunking to prevent thread blocking and UI stutter.
3. **Drafting Emerald & Mineral Slate Design**: Harmonized with the unified Oathan Rex ecosystem palette, featuring OKLCH contrast ratios meeting WCAG AAA accessibility criteria.
4. **Offline Resilience**: Instantaneous execution with zero CDN runtime reliance and persistent local configuration.

---

## Production Tool Catalog

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

### 3. Image Studio (4 Tools)
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

### 8. Byte & Bit Level Utilities (5 Tools)
- **Bulk Encoder**: Multi-row batch encoder with delimiter controls.
- **Bulk Decoder**: Multi-row batch decoder.
- **Base64 to Hex**: Translates base64 characters into hexadecimal byte notations.
- **Hex to Base64**: Converts hexadecimal byte streams into Base64 strings.
- **Binary to Base64 & Inverse**: Bidirectional conversion between raw 8-bit binary bits (`01001000...`) and Base64.

---

## Keyboard Navigation & Productivity

| Key Combination | Action Description |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Global fuzzy search across all 38 tools |
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

## Verified Browser Compatibility

- **Google Chrome**: 88+
- **Mozilla Firefox**: 85+
- **Apple Safari**: 14+
- **Microsoft Edge**: 88+
- **Mobile Browsers**: Chrome Mobile, Mobile Safari, Samsung Internet

---

## Ecosystem Links

- **Main Developer Portfolio**: [oathanrex.github.io](https://oathanrex.github.io)
- **JavaScript Unpacker Studio**: [oathanrex.github.io/jsUnpacker](https://oathanrex.github.io/jsUnpacker/)
- **Technical Articles & Publications**: [oathanrex.blogspot.com](https://oathanrex.blogspot.com)
- **Developer Vault**: [github.com/oathanrex/developer-vault](https://github.com/oathanrex/developer-vault)

---

## License

Licensed under the [MIT License](LICENSE). Copyright © 2024–2026 Oathan Rex. All rights reserved.
