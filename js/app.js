/**
 * Base64 Tools Hub - Main Application
 * Author: OathanRex
 * Version: 2.0.0 - Reviewed & Fixed
 * 
 * Features:
 * - 35+ Base64 encoding/decoding tools
 * - Dark/Light theme support
 * - History tracking
 * - Keyboard shortcuts
 * - File handling with progress
 * - Mobile responsive
 * - Accessibility compliant
 */

'use strict';

// ============================================
// Configuration & Constants
// ============================================

const CONFIG = {
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    MAX_HISTORY_ITEMS: 20,
    TOAST_DURATION: 4000,
    DEBOUNCE_DELAY: 150,
    CHUNK_SIZE: 64 * 1024, // 64KB for chunked processing
    STORAGE_KEYS: {
        THEME: 'base64-tools-theme',
        HISTORY: 'base64-tools-history'
    }
};

// Tool definitions (38 Production-Grade Client-Side Tools)
const TOOLS = Object.freeze([
    // Text Tools
    {
        id: 'text-to-base64',
        name: 'Text to Base64',
        description: 'Convert plain text to Base64 encoded string',
        category: 'text',
        icon: 'text'
    },
    {
        id: 'base64-to-text',
        name: 'Base64 to Text',
        description: 'Decode Base64 string back to plain text',
        category: 'text',
        icon: 'text'
    },
    {
        id: 'url-safe-encode',
        name: 'URL-Safe Base64 Encoder',
        description: 'Encode text with URL-safe Base64 characters',
        category: 'text',
        icon: 'link'
    },
    {
        id: 'url-safe-decode',
        name: 'URL-Safe Base64 Decoder',
        description: 'Decode URL-safe Base64 string',
        category: 'text',
        icon: 'link'
    },
    {
        id: 'live-encoder',
        name: 'Live Encoder/Decoder',
        description: 'Real-time Base64 encode/decode as you type',
        category: 'text',
        icon: 'zap'
    },

    // File Tools
    {
        id: 'file-to-base64',
        name: 'File to Base64',
        description: 'Convert any file to Base64 string',
        category: 'file',
        icon: 'file'
    },
    {
        id: 'base64-to-file',
        name: 'Base64 to File',
        description: 'Convert Base64 string to downloadable file',
        category: 'file',
        icon: 'download'
    },
    {
        id: 'pdf-to-base64',
        name: 'PDF to Base64',
        description: 'Convert PDF documents to Base64 Data URI',
        category: 'file',
        icon: 'file'
    },
    {
        id: 'base64-to-pdf',
        name: 'Base64 to PDF',
        description: 'Preview and download PDF documents from Base64',
        category: 'file',
        icon: 'download'
    },
    {
        id: 'batch-file-encoder',
        name: 'Batch File Encoder',
        description: 'Encode multiple files simultaneously',
        category: 'file',
        icon: 'files'
    },

    // Image Tools
    {
        id: 'font-to-base64',
        name: 'Font to Base64 & Specimen',
        description: 'Encode WOFF2, TTF, OTF to Base64 with live interactive typography specimen',
        category: 'image',
        icon: 'text'
    },
    {
        id: 'image-to-base64',
        name: 'Image to Base64',
        description: 'Convert image to Base64 data URI',
        category: 'image',
        icon: 'image'
    },
    {
        id: 'base64-to-image',
        name: 'Base64 to Image',
        description: 'Preview and download image from Base64',
        category: 'image',
        icon: 'image'
    },
    {
        id: 'image-to-css',
        name: 'Image to CSS Background',
        description: 'Generate CSS background-image code',
        category: 'image',
        icon: 'code'
    },
    {
        id: 'image-to-html',
        name: 'Image to HTML IMG Tag',
        description: 'Generate HTML img tag with Base64 source',
        category: 'image',
        icon: 'code'
    },
    {
        id: 'batch-image-encoder',
        name: 'Batch Image Encoder',
        description: 'Encode multiple image assets at once',
        category: 'image',
        icon: 'files'
    },

    // Audio/Video Tools
    {
        id: 'audio-to-base64',
        name: 'Audio to Base64',
        description: 'Convert audio files (MP3, WAV, OGG) to Base64',
        category: 'audio',
        icon: 'music'
    },
    {
        id: 'base64-to-audio',
        name: 'Base64 to Audio',
        description: 'Play and download audio from Base64 string',
        category: 'audio',
        icon: 'music'
    },
    {
        id: 'video-to-base64',
        name: 'Video to Base64',
        description: 'Convert video files (MP4, WebM) to Base64',
        category: 'audio',
        icon: 'video'
    },
    {
        id: 'base64-to-video',
        name: 'Base64 to Video',
        description: 'Play and download video from Base64 string',
        category: 'audio',
        icon: 'video'
    },

    // Document Tools
    {
        id: 'json-to-base64',
        name: 'JSON to Base64',
        description: 'Encode formatted JSON data to Base64',
        category: 'document',
        icon: 'braces'
    },
    {
        id: 'base64-to-json',
        name: 'Base64 to JSON',
        description: 'Decode Base64 to formatted, prettified JSON',
        category: 'document',
        icon: 'braces'
    },
    {
        id: 'xml-to-base64',
        name: 'XML to Base64',
        description: 'Encode XML documents to Base64',
        category: 'document',
        icon: 'code'
    },
    {
        id: 'base64-to-xml',
        name: 'Base64 to XML',
        description: 'Decode Base64 to formatted XML document',
        category: 'document',
        icon: 'code'
    },
    {
        id: 'csv-to-base64',
        name: 'CSV to Base64',
        description: 'Encode CSV spreadsheet text to Base64',
        category: 'document',
        icon: 'file'
    },
    {
        id: 'base64-to-csv',
        name: 'Base64 to CSV',
        description: 'Decode Base64 to tabular CSV spreadsheet',
        category: 'document',
        icon: 'file'
    },

    // Developer Tools
    {
        id: 'data-uri-generator',
        name: 'Data URI Generator',
        description: 'Generate complete data URIs with custom MIME types',
        category: 'developer',
        icon: 'link'
    },
    {
        id: 'mime-detector',
        name: 'MIME Type Detector',
        description: 'Auto-detect MIME type & magic bytes from Base64',
        category: 'developer',
        icon: 'search'
    },
    {
        id: 'base64-validator',
        name: 'Base64 Validator',
        description: 'Inspect Base64 validity, alphabet, & padding',
        category: 'developer',
        icon: 'check-circle'
    },
    {
        id: 'length-calculator',
        name: 'Size Calculator',
        description: 'Calculate encoded/decoded size & 33% inflation',
        category: 'developer',
        icon: 'calculator'
    },
    {
        id: 'base64-diff',
        name: 'Base64 Diff Tool',
        description: 'Compare two Base64 payloads with mismatch detection',
        category: 'developer',
        icon: 'layers'
    },

    // Security Tools
    {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        description: 'Decode JWT token parts (Header, Payload, Claims)',
        category: 'security',
        icon: 'key'
    },
    {
        id: 'basic-auth-generator',
        name: 'Basic Auth Generator',
        description: 'Create HTTP Basic Authorization headers',
        category: 'security',
        icon: 'lock'
    },
    {
        id: 'base64-hash',
        name: 'Base64 + Hash Digest',
        description: 'Calculate SHA-256, SHA-512, SHA-1 & MD5 hashes',
        category: 'security',
        icon: 'lock'
    },

    // Utility Tools
    {
        id: 'bulk-encoder',
        name: 'Bulk Encoder',
        description: 'Encode multiple strings or lines at once',
        category: 'utility',
        icon: 'layers'
    },
    {
        id: 'bulk-decoder',
        name: 'Bulk Decoder',
        description: 'Decode multiple Base64 strings or lines at once',
        category: 'utility',
        icon: 'layers'
    },
    {
        id: 'base64-to-hex',
        name: 'Base64 to Hex',
        description: 'Convert Base64 string to Hexadecimal bytes',
        category: 'utility',
        icon: 'hash'
    },
    {
        id: 'hex-to-base64',
        name: 'Hex to Base64',
        description: 'Convert Hexadecimal bytes to Base64 string',
        category: 'utility',
        icon: 'hash'
    },
    {
        id: 'binary-to-base64',
        name: 'Binary to Base64',
        description: 'Convert 8-bit binary bits (0100...) to Base64',
        category: 'utility',
        icon: 'code'
    },
    {
        id: 'base64-to-binary',
        name: 'Base64 to Binary',
        description: 'Convert Base64 string to 8-bit binary bits',
        category: 'utility',
        icon: 'code'
    }
]);

// SVG Icons
const ICONS = Object.freeze({
    text: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
    link: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    file: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>',
    download: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    files: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
    image: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    music: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
    video: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
    braces: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"></path><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path></svg>',
    search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
    'check-circle': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    calculator: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="8" y2="10"></line><line x1="12" y1="10" x2="12" y2="10"></line><line x1="16" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="8" y2="14"></line><line x1="12" y1="14" x2="12" y2="14"></line><line x1="16" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="8" y2="18"></line><line x1="12" y1="18" x2="12" y2="18"></line><line x1="16" y1="18" x2="16" y2="18"></line></svg>',
    key: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>',
    lock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    layers: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    hash: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    paste: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>',
    clear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    swap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>',
    upload: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
});

// ============================================
// Application State
// ============================================

const state = {
    currentCategory: 'all',
    currentTool: null,
    history: [],
    theme: 'dark',
    isProcessing: false
};

// ============================================
// DOM Elements Cache
// ============================================

const elements = {};

function cacheElements() {
    elements.loadingOverlay = document.getElementById('loadingOverlay');
    elements.toolsGrid = document.getElementById('toolsGrid');
    elements.workspace = document.getElementById('workspace');
    elements.workspaceContent = document.getElementById('workspaceContent');
    elements.currentToolName = document.getElementById('currentToolName');
    elements.currentToolDescription = document.getElementById('currentToolDescription');
    elements.backToTools = document.getElementById('backToTools');
    elements.navTabs = document.querySelectorAll('.nav-tab');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.searchToggle = document.getElementById('searchToggle');
    elements.searchModal = document.getElementById('searchModal');
    elements.searchInput = document.getElementById('searchInput');
    elements.searchResults = document.getElementById('searchResults');
    elements.historyToggle = document.getElementById('historyToggle');
    elements.historyBadge = document.getElementById('historyBadge');
    elements.historySidebar = document.getElementById('historySidebar');
    elements.historyList = document.getElementById('historyList');
    elements.clearHistory = document.getElementById('clearHistory');
    elements.shortcutsModal = document.getElementById('shortcutsModal');
    elements.showShortcuts = document.getElementById('showShortcuts');
    elements.toastContainer = document.getElementById('toastContainer');
    elements.currentYear = document.getElementById('currentYear');
}

// ============================================
// Utility Functions
// ============================================

/**
 * Sanitize HTML to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait = CONFIG.DEBOUNCE_DELAY) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');

    const iconName = type === 'success' ? 'check' : type;
    const icon = ICONS[iconName] || ICONS.info;

    toast.innerHTML = `
        <div class="toast-icon" aria-hidden="true">${icon}</div>
        <span class="toast-message">${sanitizeHTML(message)}</span>
        <button class="btn-icon btn-sm toast-close" type="button" aria-label="Dismiss notification">
            ${ICONS.clear}
        </button>
    `;

    elements.toastContainer.appendChild(toast);

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    // Auto remove
    const timeoutId = setTimeout(() => removeToast(toast), CONFIG.TOAST_DURATION);

    // Clear timeout if manually closed
    toast.dataset.timeoutId = timeoutId;
}

/**
 * Remove toast notification
 * @param {HTMLElement} toast - Toast element
 */
function removeToast(toast) {
    if (!toast || toast.classList.contains('toast-exit')) return;

    clearTimeout(parseInt(toast.dataset.timeoutId));
    toast.classList.add('toast-exit');

    toast.addEventListener('animationend', () => {
        toast.remove();
    }, { once: true });
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
    if (!text) {
        showToast('Nothing to copy', 'warning');
        return false;
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            const success = document.execCommand('copy');
            document.body.removeChild(textarea);

            if (!success) throw new Error('execCommand failed');
        }

        showToast('Copied to clipboard!', 'success');
        return true;
    } catch (err) {
        console.error('Copy failed:', err);
        showToast('Failed to copy to clipboard', 'error');
        return false;
    }
}

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    if (typeof bytes !== 'number' || isNaN(bytes)) return 'Unknown';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
    const index = Math.min(i, sizes.length - 1);

    return `${parseFloat((bytes / Math.pow(k, index)).toFixed(2))} ${sizes[index]}`;
}

/**
 * Get text statistics
 * @param {string} text - Text to analyze
 * @returns {Object} Statistics
 */
function getStats(text) {
    if (typeof text !== 'string') text = '';

    const chars = text.length;
    const bytes = new Blob([text]).size;
    const lines = text ? text.split('\n').length : 0;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    return { chars, bytes, lines, words };
}

/**
 * Format relative time
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time
 */
function formatTimeAgo(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 0) return 'Just now';
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

        return date.toLocaleDateString();
    } catch (e) {
        return 'Unknown';
    }
}

// ============================================
// Base64 Core Functions
// ============================================

/**
 * Validate Base64 string
 * @param {string} str - String to validate
 * @returns {boolean} Is valid
 */
function isValidBase64(str) {
    if (!str || typeof str !== 'string') return false;

    try {
        // Remove whitespace and newlines
        const cleaned = str.replace(/[\s\n\r]/g, '');

        // Check for valid Base64 characters
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(cleaned)) return false;

        // Check length is multiple of 4 (with padding)
        if (cleaned.length % 4 !== 0) return false;

        // Try to decode
        atob(cleaned);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Encode text to Base64
 * @param {string} text - Text to encode
 * @returns {string} Encoded string
 */
function encodeBase64(text) {
    if (typeof text !== 'string') {
        throw new Error('Input must be a string');
    }

    try {
        // Handle Unicode characters
        const utf8Bytes = encodeURIComponent(text).replace(
            /%([0-9A-F]{2})/g,
            (_, p1) => String.fromCharCode(parseInt(p1, 16))
        );
        return btoa(utf8Bytes);
    } catch (e) {
        throw new Error('Failed to encode: Invalid characters in input');
    }
}

/**
 * Decode Base64 to text
 * @param {string} base64 - Base64 string to decode
 * @returns {string} Decoded string
 */
function decodeBase64(base64) {
    if (typeof base64 !== 'string') {
        throw new Error('Input must be a string');
    }

    try {
        // Remove whitespace
        const cleaned = base64.replace(/[\s\n\r]/g, '');

        // Decode and handle Unicode
        const utf8Bytes = atob(cleaned);
        return decodeURIComponent(
            utf8Bytes.split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
    } catch (e) {
        throw new Error('Failed to decode: Invalid Base64 string');
    }
}

/**
 * Encode to URL-safe Base64
 * @param {string} text - Text to encode
 * @returns {string} URL-safe encoded string
 */
function encodeUrlSafeBase64(text) {
    return encodeBase64(text)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/**
 * Decode URL-safe Base64
 * @param {string} base64 - URL-safe Base64 string
 * @returns {string} Decoded string
 */
function decodeUrlSafeBase64(base64) {
    if (typeof base64 !== 'string') {
        throw new Error('Input must be a string');
    }

    let str = base64
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    // Add padding if needed
    const pad = str.length % 4;
    if (pad) {
        str += '='.repeat(4 - pad);
    }

    return decodeBase64(str);
}

/**
 * Convert file to Base64 with progress
 * @param {File} file - File to convert
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string>} Base64 data URI
 */
function fileToBase64(file, onProgress = null) {
    return new Promise((resolve, reject) => {
        if (!(file instanceof File) && !(file instanceof Blob)) {
            reject(new Error('Invalid file'));
            return;
        }

        if (file.size > CONFIG.MAX_FILE_SIZE) {
            reject(new Error(`File is too large. Maximum size is ${formatFileSize(CONFIG.MAX_FILE_SIZE)}`));
            return;
        }

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));

        if (onProgress && typeof onProgress === 'function') {
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    onProgress(Math.round((event.loaded / event.total) * 100));
                }
            };
        }

        reader.readAsDataURL(file);
    });
}

/**
 * Convert Base64 to Blob
 * @param {string} base64 - Base64 string
 * @param {string} mimeType - MIME type
 * @returns {Blob} Blob object
 */
function base64ToBlob(base64, mimeType = 'application/octet-stream') {
    try {
        // Extract base64 data from data URI if present
        let base64Data = base64;

        if (base64.includes(',')) {
            const parts = base64.split(',');
            base64Data = parts[1];

            // Extract MIME type from data URI if not provided
            if (mimeType === 'application/octet-stream') {
                const mimeMatch = parts[0].match(/data:([^;]+)/);
                if (mimeMatch) mimeType = mimeMatch[1];
            }
        }

        // Decode Base64
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteNumbers], { type: mimeType });
    } catch (e) {
        throw new Error('Invalid Base64 string');
    }
}

/**
 * Detect MIME type from Base64
 * @param {string} base64 - Base64 string
 * @returns {string} MIME type
 */
function detectMimeType(base64) {
    if (!base64 || typeof base64 !== 'string') {
        return 'application/octet-stream';
    }

    // Check for data URI
    if (base64.startsWith('data:')) {
        const match = base64.match(/data:([^;,]+)/);
        if (match) return match[1];
    }

    // Check magic bytes signatures
    const signatures = {
        'JVBERi0': 'application/pdf',
        'R0lGODlh': 'image/gif',
        'R0lGODdh': 'image/gif',
        'iVBORw0KGgo': 'image/png',
        '/9j/': 'image/jpeg',
        'UklGR': 'audio/wav',
        'SUQz': 'audio/mpeg',
        'T2dnUw': 'audio/ogg',
        'AAAA': 'video/mp4',
        'GkXfo': 'video/webm',
        'PD94bWw': 'application/xml',
        'eyJ': 'application/json',
        'H4sI': 'application/gzip',
        'UEsD': 'application/zip'
    };

    // Get first part of base64 (remove data URI prefix if present)
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

    for (const [sig, mime] of Object.entries(signatures)) {
        if (base64Data.startsWith(sig)) {
            return mime;
        }
    }

    return 'application/octet-stream';
}

/**
 * Download data as file
 * @param {Blob|string} data - Data to download
 * @param {string} filename - Filename
 * @param {string} mimeType - MIME type
 */
function downloadFile(data, filename, mimeType = 'application/octet-stream') {
    try {
        const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        showToast('File downloaded!', 'success');
    } catch (e) {
        showToast('Failed to download file', 'error');
        console.error('Download error:', e);
    }
}

/**
 * Convert Hex to Base64
 * @param {string} hex - Hexadecimal string
 * @returns {string} Base64 string
 */
function hexToBase64(hex) {
    if (typeof hex !== 'string') {
        throw new Error('Input must be a string');
    }

    const hexString = hex.replace(/[\s\n\r]/g, '').replace(/^0x/i, '');

    if (!/^[0-9A-Fa-f]*$/.test(hexString)) {
        throw new Error('Invalid hexadecimal string');
    }

    if (hexString.length % 2 !== 0) {
        throw new Error('Hex string must have even length');
    }

    let binary = '';
    for (let i = 0; i < hexString.length; i += 2) {
        binary += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
    }

    return btoa(binary);
}

/**
 * Convert Base64 to Hex
 * @param {string} base64 - Base64 string
 * @returns {string} Hexadecimal string
 */
function base64ToHex(base64) {
    if (!isValidBase64(base64)) {
        throw new Error('Invalid Base64 string');
    }

    const binary = atob(base64.replace(/[\s\n\r]/g, ''));
    let hex = '';

    for (let i = 0; i < binary.length; i++) {
        hex += binary.charCodeAt(i).toString(16).padStart(2, '0');
    }

    return hex.toUpperCase();
}

/**
 * Decode JWT token
 * @param {string} token - JWT token
 * @returns {Object} Decoded JWT
 */
function decodeJWT(token) {
    if (typeof token !== 'string') {
        throw new Error('Token must be a string');
    }

    const parts = token.trim().split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
    }

    const decodePart = (str) => {
        try {
            const decoded = decodeUrlSafeBase64(str);
            return JSON.parse(decoded);
        } catch (e) {
            return null;
        }
    };

    const header = decodePart(parts[0]);
    const payload = decodePart(parts[1]);

    if (!header || !payload) {
        throw new Error('Failed to decode JWT parts');
    }

    return {
        header,
        payload,
        signature: parts[2]
    };
}

// ============================================
// History Management
// ============================================

/**
 * Load history from localStorage
 */
function loadHistory() {
    try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY);
        state.history = saved ? JSON.parse(saved) : [];

        // Validate and clean history
        state.history = state.history.filter(item =>
            item &&
            typeof item === 'object' &&
            item.id &&
            item.toolId &&
            item.timestamp
        ).slice(0, CONFIG.MAX_HISTORY_ITEMS);

        updateHistoryBadge();
        renderHistory();
    } catch (e) {
        console.error('Failed to load history:', e);
        state.history = [];
    }
}

/**
 * Save history to localStorage
 */
function saveHistory() {
    try {
        localStorage.setItem(
            CONFIG.STORAGE_KEYS.HISTORY,
            JSON.stringify(state.history.slice(0, CONFIG.MAX_HISTORY_ITEMS))
        );
        updateHistoryBadge();
    } catch (e) {
        console.error('Failed to save history:', e);
    }
}

/**
 * Add item to history
 * @param {string} toolId - Tool ID
 * @param {string} input - Input value
 * @param {string} output - Output value
 */
function addToHistory(toolId, input, output) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool || !input || !output) return;

    const entry = {
        id: Date.now(),
        toolId,
        toolName: tool.name,
        input: String(input).substring(0, 100),
        output: String(output).substring(0, 100),
        timestamp: new Date().toISOString()
    };

    state.history.unshift(entry);
    state.history = state.history.slice(0, CONFIG.MAX_HISTORY_ITEMS);

    saveHistory();
    renderHistory();
}

/**
 * Clear all history
 */
function clearHistoryData() {
    state.history = [];
    saveHistory();
    renderHistory();
    showToast('History cleared', 'success');
}

/**
 * Update history badge count
 */
function updateHistoryBadge() {
    if (!elements.historyBadge) return;

    const count = state.history.length;

    if (count > 0) {
        elements.historyBadge.textContent = count > 99 ? '99+' : count;
        elements.historyBadge.classList.add('visible');
    } else {
        elements.historyBadge.classList.remove('visible');
    }
}

/**
 * Render history list
 */
function renderHistory() {
    if (!elements.historyList) return;

    if (state.history.length === 0) {
        elements.historyList.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p>No history yet</p>
                <span>Your recent operations will appear here</span>
            </div>
        `;
        return;
    }

    elements.historyList.innerHTML = state.history.map(entry => `
        <div class="history-item" data-id="${entry.id}" role="listitem" tabindex="0">
            <div class="history-item-header">
                <span class="history-item-tool">${sanitizeHTML(entry.toolName)}</span>
                <span class="history-item-time">${formatTimeAgo(entry.timestamp)}</span>
            </div>
            <div class="history-item-preview">${sanitizeHTML(entry.output)}</div>
        </div>
    `).join('');

    // Add click handlers
    elements.historyList.querySelectorAll('.history-item').forEach(item => {
        const handler = () => {
            const id = parseInt(item.dataset.id);
            const entry = state.history.find(h => h.id === id);
            if (entry) {
                openTool(entry.toolId);
                closeSidebar();
            }
        };

        item.addEventListener('click', handler);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handler();
            }
        });
    });
}

// ============================================
// Theme Management
// ============================================

/**
 * Load theme from storage or system preference
 */
function loadTheme() {
    try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);

        if (saved && (saved === 'light' || saved === 'dark')) {
            state.theme = saved;
        } else {
            // Use system preference
            state.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        applyTheme();
    } catch (e) {
        state.theme = 'dark';
        applyTheme();
    }
}

/**
 * Toggle theme between light and dark
 */
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';

    try {
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, state.theme);
    } catch (e) {
        console.error('Failed to save theme:', e);
    }

    applyTheme();
    showToast(`${state.theme === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'info');
}

/**
 * Apply current theme to document
 */
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);

    // Update theme-color meta tag
    const themeColor = state.theme === 'dark' ? '#0b1114' : '#f8fafc';
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute('content', themeColor);
    }
}

// ============================================
// Tools Grid Rendering
// ============================================

/**
 * Render tools grid
 * @param {string} category - Category filter
 */
function renderToolsGrid(category = 'all') {
    state.currentCategory = category;

    const filteredTools = category === 'all'
        ? TOOLS
        : TOOLS.filter(tool => tool.category === category);

    if (!elements.toolsGrid) return;

    if (filteredTools.length === 0) {
        elements.toolsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
                    ${ICONS.search}
                </svg>
                <p>No tools found</p>
                <span>Try a different category</span>
            </div>
        `;
        return;
    }

    elements.toolsGrid.innerHTML = filteredTools.map(tool => `
        <article class="tool-card" data-tool-id="${tool.id}" tabindex="0" role="button" aria-label="Open ${sanitizeHTML(tool.name)}">
            <div class="tool-card-header">
                <div class="tool-icon" aria-hidden="true">
                    ${ICONS[tool.icon] || ICONS.file}
                </div>
                <div class="tool-info">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h3 class="tool-name">${sanitizeHTML(tool.name)}</h3>
                        <button class="tool-star-btn ${(OMNI_STATE && OMNI_STATE.pinnedTools && OMNI_STATE.pinnedTools.includes(tool.id)) ? 'starred' : ''}" onclick="event.stopPropagation(); togglePinTool('${tool.id}')" title="Pin / Unpin">★</button>
                    </div>
                    <p class="tool-description">${sanitizeHTML(tool.description)}</p>
                </div>
            </div>
            <div class="tool-card-footer">
                <span class="tool-category">${sanitizeHTML(tool.category)}</span>
                <span class="tool-arrow" aria-hidden="true">${ICONS.arrow}</span>
            </div>
        </article>
    `).join('');

    // Add click and keyboard handlers
    elements.toolsGrid.querySelectorAll('.tool-card').forEach(card => {
        const handler = () => openTool(card.dataset.toolId);

        card.addEventListener('click', handler);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handler();
            }
        });
    });
}

// ============================================
// Tool Templates
// ============================================

/**
 * Get tool template HTML
 * @param {string} toolId - Tool ID
 * @returns {string} HTML template
 */
function getToolTemplate(toolId) {
    const templates = {
        'text-to-base64': createTextEncoderTemplate('encode'),
        'base64-to-text': createTextEncoderTemplate('decode'),
        'url-safe-encode': createUrlSafeTemplate('encode'),
        'url-safe-decode': createUrlSafeTemplate('decode'),
        'live-encoder': createLiveEncoderTemplate(),
        'file-to-base64': createFileEncoderTemplate(),
        'base64-to-file': createFileDecoderTemplate(),
        'pdf-to-base64': createPdfEncoderTemplate(),
        'base64-to-pdf': createPdfDecoderTemplate(),
        'batch-file-encoder': createBatchFileTemplate(),
        'font-to-base64': createFontEncoderTemplate(),
        'image-to-base64': createImageEncoderTemplate(),
        'base64-to-image': createImageDecoderTemplate(),
        'image-to-css': createImageToCssTemplate(),
        'image-to-html': createImageToHtmlTemplate(),
        'batch-image-encoder': createBatchImageTemplate(),
        'audio-to-base64': createAudioEncoderTemplate(),
        'base64-to-audio': createAudioDecoderTemplate(),
        'video-to-base64': createVideoEncoderTemplate(),
        'base64-to-video': createVideoDecoderTemplate(),
        'json-to-base64': createJsonEncoderTemplate(),
        'base64-to-json': createJsonDecoderTemplate(),
        'xml-to-base64': createXmlEncoderTemplate(),
        'base64-to-xml': createXmlDecoderTemplate(),
        'csv-to-base64': createCsvEncoderTemplate(),
        'base64-to-csv': createCsvDecoderTemplate(),
        'data-uri-generator': createDataUriTemplate(),
        'mime-detector': createMimeDetectorTemplate(),
        'base64-validator': createValidatorTemplate(),
        'length-calculator': createCalculatorTemplate(),
        'base64-diff': createDiffTemplate(),
        'jwt-decoder': createJwtDecoderTemplate(),
        'basic-auth-generator': createBasicAuthTemplate(),
        'base64-hash': createHashTemplate(),
        'bulk-encoder': createBulkTemplate('encode'),
        'bulk-decoder': createBulkTemplate('decode'),
        'base64-to-hex': createHexConverterTemplate('base64-to-hex'),
        'hex-to-base64': createHexConverterTemplate('hex-to-base64'),
        'binary-to-base64': createBinaryTemplate('encode'),
        'base64-to-binary': createBinaryTemplate('decode')
    };

    return templates[toolId] || createDefaultTemplate();
}

function createTextEncoderTemplate(mode) {
    const isEncode = mode === 'encode';
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.text} ${isEncode ? 'Input Text' : 'Base64 Input'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste" aria-label="Paste from clipboard">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear" aria-label="Clear input">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="${isEncode ? 'Enter text to encode to Base64...' : 'Enter Base64 string to decode...'}" aria-label="${isEncode ? 'Text input' : 'Base64 input'}"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} ${isEncode ? 'Base64 Output' : 'Decoded Text'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy" aria-label="Copy to clipboard">${ICONS.copy}</button>
                        <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download" aria-label="Download as file">${ICONS.download}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="${isEncode ? 'Base64 encoded result will appear here...' : 'Decoded text will appear here...'}" readonly aria-label="${isEncode ? 'Base64 output' : 'Decoded text output'}"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="${isEncode ? 'encode' : 'decode'}" type="button">
                ${ICONS.zap} ${isEncode ? 'Encode to Base64' : 'Decode from Base64'}
            </button>
            <button class="btn btn-secondary" data-action="swap" type="button">
                ${ICONS.swap} Swap
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createUrlSafeTemplate(mode) {
    const isEncode = mode === 'encode';
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.text} ${isEncode ? 'Input Text' : 'URL-Safe Base64 Input'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="${isEncode ? 'Enter text to encode...' : 'Enter URL-safe Base64 string...'}"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.link} ${isEncode ? 'URL-Safe Base64 Output' : 'Decoded Text'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Result will appear here..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="${isEncode ? 'encode-url-safe' : 'decode-url-safe'}" type="button">
                ${ICONS.zap} ${isEncode ? 'Encode URL-Safe' : 'Decode URL-Safe'}
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createLiveEncoderTemplate() {
    return `
        <div class="options-panel" style="margin-bottom: var(--spacing-4);">
            <div class="options-title">Mode</div>
            <div class="options-grid">
                <div class="option-item">
                    <input type="radio" name="liveMode" id="liveEncode" value="encode" checked>
                    <label for="liveEncode">Encode (Text → Base64)</label>
                </div>
                <div class="option-item">
                    <input type="radio" name="liveMode" id="liveDecode" value="decode">
                    <label for="liveDecode">Decode (Base64 → Text)</label>
                </div>
            </div>
        </div>
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.text} Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Start typing... conversion happens in real-time"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.zap} Live Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Output will appear here as you type..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
    `;
}

function createFileEncoderTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0" aria-label="Click or drag file to upload">
            <div class="file-upload-icon">${ICONS.upload}</div>
            <p class="file-upload-text">Drag & drop a file here or click to browse</p>
            <p class="file-upload-hint">Maximum file size: ${formatFileSize(CONFIG.MAX_FILE_SIZE)}</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" aria-hidden="true">
        </div>
        <div id="filePreviewContainer"></div>
        <div id="progressContainer" hidden>
            <div class="progress-wrapper">
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progressBar" style="width: 0%"></div>
                </div>
                <p class="progress-text" id="progressText">Processing...</p>
            </div>
        </div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Output</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="Base64 encoded file will appear here..." readonly></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="options-panel" style="margin-top: var(--spacing-4);">
            <div class="options-title">Output Options</div>
            <div class="options-grid">
                <div class="option-item">
                    <input name="includeDataUri" type="checkbox" id="includeDataUri" checked>
                    <label for="includeDataUri">Include Data URI prefix</label>
                </div>
            </div>
        </div>
    `;
}

function createFileDecoderTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste Base64 string here (with or without data URI prefix)..."></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="options-panel" style="margin-top: var(--spacing-4);">
            <div class="options-title">File Options</div>
            <div class="options-grid">
                <div class="option-item">
                    <label for="fileName">Filename:</label>
                    <input name="fileName" type="text" id="fileName" value="download" placeholder="filename">
                </div>
                <div class="option-item">
                    <label for="mimeType">MIME Type:</label>
                    <select name="mimeType" id="mimeType">
                        <option value="auto">Auto-detect</option>
                        <option value="application/octet-stream">Binary</option>
                        <option value="text/plain">Text (.txt)</option>
                        <option value="image/png">PNG Image</option>
                        <option value="image/jpeg">JPEG Image</option>
                        <option value="image/gif">GIF Image</option>
                        <option value="image/webp">WebP Image</option>
                        <option value="application/pdf">PDF</option>
                        <option value="application/json">JSON</option>
                        <option value="application/xml">XML</option>
                        <option value="audio/mpeg">MP3 Audio</option>
                        <option value="video/mp4">MP4 Video</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="filePreviewContainer" style="margin-top: var(--spacing-4);"></div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="convert-to-file" type="button">
                ${ICONS.download} Convert & Download
            </button>
            <button class="btn btn-secondary" data-action="preview-file" type="button">
                ${ICONS.search} Preview
            </button>
        </div>
    `;
}

function createImageEncoderTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0">
            <div class="file-upload-icon">${ICONS.upload}</div>
            <p class="file-upload-text">Drag & drop an image here or click to browse</p>
            <p class="file-upload-hint">Supports: PNG, JPEG, GIF, WebP, SVG</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept="image/*">
        </div>
        <div id="imagePreviewContainer"></div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Output</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="Base64 encoded image will appear here..." readonly></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters | 0 bytes</span>
            </div>
        </div>
    `;
}

function createImageDecoderTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste Base64 image string here..."></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div id="imagePreviewContainer" style="margin-top: var(--spacing-4);"></div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="preview-image" type="button">
                ${ICONS.image} Preview Image
            </button>
            <button class="btn btn-secondary" data-action="download-image" type="button">
                ${ICONS.download} Download Image
            </button>
        </div>
    `;
}

function createImageToCssTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0">
            <div class="file-upload-icon">${ICONS.upload}</div>
            <p class="file-upload-text">Drag & drop an image here or click to browse</p>
            <p class="file-upload-hint">Supports: PNG, JPEG, GIF, WebP, SVG</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept="image/*">
        </div>
        <div id="imagePreviewContainer"></div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} CSS Code</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="CSS background-image code will appear here..." readonly></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters</span>
            </div>
        </div>
    `;
}

function createImageToHtmlTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0">
            <div class="file-upload-icon">${ICONS.upload}</div>
            <p class="file-upload-text">Drag & drop an image here or click to browse</p>
            <p class="file-upload-hint">Supports: PNG, JPEG, GIF, WebP, SVG</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept="image/*">
        </div>
        <div id="imagePreviewContainer"></div>
        <div class="options-panel" style="margin-top: var(--spacing-4);">
            <div class="options-title">HTML Options</div>
            <div class="options-grid">
                <div class="option-item">
                    <label for="imgAlt">Alt Text:</label>
                    <input name="imgAlt" type="text" id="imgAlt" value="Image" placeholder="Image description">
                </div>
                <div class="option-item">
                    <label for="imgClass">CSS Class:</label>
                    <input name="imgClass" type="text" id="imgClass" value="" placeholder="optional">
                </div>
                <div class="option-item">
                    <label for="imgId">ID:</label>
                    <input name="imgId" type="text" id="imgId" value="" placeholder="optional">
                </div>
            </div>
        </div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} HTML Code</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="HTML img tag will appear here..." readonly></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters</span>
            </div>
        </div>
    `;
}

function createJsonEncoderTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.braces} JSON Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="format-json" type="button" title="Format JSON">${ICONS.code}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder='{"key": "value", "array": [1, 2, 3]}'></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                    <span id="jsonStatus"></span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Base64 encoded JSON will appear here..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="encode" type="button">
                ${ICONS.zap} Encode to Base64
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createJsonDecoderTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Paste Base64 encoded JSON here..."></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.braces} JSON Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Decoded and formatted JSON will appear here..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="decode-json" type="button">
                ${ICONS.zap} Decode to JSON
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createValidatorTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste Base64 string to validate..."></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div id="validationResult"></div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="validate" type="button">
                ${ICONS['check-circle']} Validate Base64
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createCalculatorTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.text} Input Text</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Enter text or Base64 to calculate sizes..."></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.calculator} Size Information</span>
                </div>
                <div class="panel-body" style="padding: var(--spacing-4); overflow-y: auto;">
                    <div id="sizeInfo">
                        <p style="color: var(--text-tertiary); text-align: center; padding: var(--spacing-8);">
                            Enter text to see size calculations...
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="calculate" type="button">
                ${ICONS.calculator} Calculate Sizes
            </button>
        </div>
    `;
}

function createJwtDecoderTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.key} JWT Token Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste your JWT token here (eyJ...)"></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters</span>
            </div>
        </div>
        <div id="jwtResult"></div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="decode-jwt" type="button">
                ${ICONS.key} Decode JWT
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createBasicAuthTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.lock} Credentials</span>
            </div>
            <div class="panel-body" style="padding: var(--spacing-4);">
                <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
                    <div>
                        <label for="authUsername" style="display: block; margin-bottom: var(--spacing-1); font-size: var(--font-size-sm); color: var(--text-secondary);">Username</label>
                        <input name="authUsername" type="text" id="authUsername" placeholder="Enter username" style="width: 100%; padding: var(--spacing-3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-primary); color: var(--text-primary); font-size: var(--font-size-base);">
                    </div>
                    <div>
                        <label for="authPassword" style="display: block; margin-bottom: var(--spacing-1); font-size: var(--font-size-sm); color: var(--text-secondary);">Password</label>
                        <input name="authPassword" type="password" id="authPassword" placeholder="Enter password" style="width: 100%; padding: var(--spacing-3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-primary); color: var(--text-primary); font-size: var(--font-size-base);">
                    </div>
                </div>
            </div>
        </div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Authorization Header</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="Authorization header will appear here..." readonly></textarea>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="generate-auth" type="button">
                ${ICONS.lock} Generate Auth Header
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createHexConverterTemplate(mode) {
    const isBase64ToHex = mode === 'base64-to-hex';
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${isBase64ToHex ? ICONS.code : ICONS.hash} ${isBase64ToHex ? 'Base64 Input' : 'Hexadecimal Input'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="${isBase64ToHex ? 'Enter Base64 string...' : 'Enter hexadecimal string (e.g., 48656C6C6F)...'}"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${isBase64ToHex ? ICONS.hash : ICONS.code} ${isBase64ToHex ? 'Hexadecimal Output' : 'Base64 Output'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Result will appear here..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="${mode}" type="button">
                ${ICONS.zap} Convert to ${isBase64ToHex ? 'Hex' : 'Base64'}
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createBulkTemplate(mode) {
    const isEncode = mode === 'encode';
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.layers} Input (one item per line)</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Enter multiple items, one per line..."></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 lines</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} ${isEncode ? 'Encoded' : 'Decoded'} Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Results will appear here, one per line..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 lines</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="bulk-${mode}" type="button">
                ${ICONS.zap} ${isEncode ? 'Encode' : 'Decode'} All
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}


function createPdfEncoderTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0" aria-label="Drop PDF document here or click to browse">
            <div class="file-upload-icon">${ICONS.file}</div>
            <p class="file-upload-text">Drag & drop a PDF file here or click to browse</p>
            <p class="file-upload-hint">Supports: .pdf documents up to ${formatFileSize(CONFIG.MAX_FILE_SIZE)}</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept="application/pdf" aria-hidden="true">
        </div>
        <div id="filePreviewContainer"></div>
        <div id="progressContainer" hidden>
            <div class="progress-wrapper">
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progressBar" style="width: 0%"></div>
                </div>
                <p class="progress-text" id="progressText">Processing PDF...</p>
            </div>
        </div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Data URI Output</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy" aria-label="Copy to clipboard">${ICONS.copy}</button>
                    <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download" aria-label="Download as text file">${ICONS.download}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="Base64 Data URI for PDF will appear here..." readonly aria-label="Base64 PDF Output"></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters | 0 bytes</span>
            </div>
        </div>
    `;
}

function createPdfDecoderTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} PDF Base64 Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste" aria-label="Paste from clipboard">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear" aria-label="Clear input">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste Base64 encoded PDF string (with or without data:application/pdf;base64, prefix)..." aria-label="PDF Base64 Input"></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="preview-pdf" type="button">
                ${ICONS.search} Preview PDF Document
            </button>
            <button class="btn btn-secondary" data-action="download-pdf" type="button">
                ${ICONS.download} Download as .pdf File
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
        <div id="pdfPreviewContainer"></div>
    `;
}

function createAudioEncoderTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0" aria-label="Drop audio file here or click to browse">
            <div class="file-upload-icon">${ICONS.music}</div>
            <p class="file-upload-text">Drag & drop an Audio file here or click to browse</p>
            <p class="file-upload-hint">Supports: MP3, WAV, OGG, AAC, FLAC (Max: ${formatFileSize(CONFIG.MAX_FILE_SIZE)})</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept="audio/*" aria-hidden="true">
        </div>
        <div id="filePreviewContainer"></div>
        <div id="progressContainer" hidden>
            <div class="progress-wrapper">
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progressBar" style="width: 0%"></div>
                </div>
                <p class="progress-text" id="progressText">Processing Audio...</p>
            </div>
        </div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Audio Output</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="Base64 encoded audio string will appear here..." readonly aria-label="Base64 Audio Output"></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters | 0 bytes</span>
            </div>
        </div>
    `;
}

function createAudioDecoderTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Audio Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste" aria-label="Paste from clipboard">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear" aria-label="Clear input">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste Base64 audio string (or data:audio/mp3;base64,...)..." aria-label="Base64 Audio Input"></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="play-audio" type="button">
                ${ICONS.music} Decode &amp; Play Audio
            </button>
            <button class="btn btn-secondary" data-action="download-audio" type="button">
                ${ICONS.download} Download Audio (.mp3)
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
        <div id="audioPreviewContainer"></div>
    `;
}

function createVideoEncoderTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0" aria-label="Drop video file here or click to browse">
            <div class="file-upload-icon">${ICONS.video}</div>
            <p class="file-upload-text">Drag & drop a Video file here or click to browse</p>
            <p class="file-upload-hint">Supports: MP4, WebM, OGG (Max: ${formatFileSize(CONFIG.MAX_FILE_SIZE)})</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept="video/*" aria-hidden="true">
        </div>
        <div id="filePreviewContainer"></div>
        <div id="progressContainer" hidden>
            <div class="progress-wrapper">
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progressBar" style="width: 0%"></div>
                </div>
                <p class="progress-text" id="progressText">Processing Video...</p>
            </div>
        </div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Video Output</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="Base64 encoded video string will appear here..." readonly aria-label="Base64 Video Output"></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters | 0 bytes</span>
            </div>
        </div>
    `;
}

function createVideoDecoderTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} Base64 Video Input</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste" aria-label="Paste from clipboard">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear" aria-label="Clear input">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste Base64 video string (or data:video/mp4;base64,...)..." aria-label="Base64 Video Input"></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="play-video" type="button">
                ${ICONS.video} Decode &amp; Play Video
            </button>
            <button class="btn btn-secondary" data-action="download-video" type="button">
                ${ICONS.download} Download Video (.mp4)
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
        <div id="videoPreviewContainer"></div>
    `;
}

function createXmlEncoderTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} XML Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="<?xml version=\"1.0\"?>\n<root>\n  <item>Data</item>\n</root>" aria-label="XML Input"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                        <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Base64 encoded XML will appear here..." readonly aria-label="Base64 Output"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="encode" type="button">
                ${ICONS.zap} Encode XML to Base64
            </button>
            <button class="btn btn-secondary" data-action="format-xml" type="button">
                ${ICONS.braces} Format XML
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createXmlDecoderTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 XML Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Enter Base64 encoded XML string..." aria-label="Base64 XML Input"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Formatted XML Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                        <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Decoded XML will appear here..." readonly aria-label="XML Output"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="decode-xml" type="button">
                ${ICONS.zap} Decode to Formatted XML
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createCsvEncoderTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.file} CSV Data Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="id,name,role\n1,Oathan,Engineer\n2,Rex,Architect" aria-label="CSV Input"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                        <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Base64 encoded CSV will appear here..." readonly aria-label="Base64 CSV Output"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="encode" type="button">
                ${ICONS.zap} Encode CSV to Base64
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createCsvDecoderTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 CSV Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Paste Base64 encoded CSV string..." aria-label="Base64 CSV Input"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.file} Decoded CSV Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                        <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Decoded CSV will appear here..." readonly aria-label="Decoded CSV Output"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="decode" type="button">
                ${ICONS.zap} Decode from Base64
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createDataUriTemplate() {
    return `
        <div class="options-panel" style="margin-bottom: var(--spacing-4);">
            <div class="options-title">MIME &amp; Format Configuration</div>
            <div class="options-grid">
                <div class="option-item">
                    <label for="dataUriMimeSelect">Media Type:</label>
                    <select name="dataUriMimeSelect" id="dataUriMimeSelect">
                        <option value="image/png">image/png (PNG Image)</option>
                        <option value="image/jpeg">image/jpeg (JPEG Image)</option>
                        <option value="image/svg+xml">image/svg+xml (SVG Vector)</option>
                        <option value="image/webp">image/webp (WebP Image)</option>
                        <option value="application/pdf">application/pdf (PDF Document)</option>
                        <option value="application/json">application/json (JSON)</option>
                        <option value="text/plain;charset=utf-8">text/plain (Plain Text)</option>
                        <option value="text/html;charset=utf-8">text/html (HTML Document)</option>
                        <option value="audio/mpeg">audio/mpeg (MP3 Audio)</option>
                        <option value="video/mp4">video/mp4 (MP4 Video)</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Raw Base64 Payload</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Paste raw Base64 payload (without data: prefix)..." aria-label="Raw Base64 Payload"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.link} Formatted Data URI</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="data:image/png;base64,iVBORw0K... will appear here" readonly aria-label="Formatted Data URI"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="generate-data-uri" type="button">
                ${ICONS.zap} Generate Data URI
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

function createMimeDetectorTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.search} Base64 String to Inspect</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Paste any Base64 encoded string here (e.g. /9j/4..., iVBORw..., JVBERi...)..." aria-label="Base64 String for MIME Inspection"></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="detect-mime" type="button">
                ${ICONS.search} Inspect Magic Bytes &amp; MIME
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear
            </button>
        </div>
        <div id="mimeInspectionResult"></div>
    `;
}

function createBatchFileTemplate() {
    return `
        <div class="file-upload-area" id="batchDropZone" role="button" tabindex="0" aria-label="Drop multiple files here">
            <div class="file-upload-icon">${ICONS.files}</div>
            <p class="file-upload-text">Drag & drop multiple files here or click to browse</p>
            <p class="file-upload-hint">Upload multiple files simultaneously for batch Base64 encoding</p>
            <input name="batchFileInput" type="file" id="batchFileInput" class="file-upload-input" multiple aria-hidden="true">
        </div>
        <div id="batchTableResult"></div>
    `;
}

function createBatchImageTemplate() {
    return `
        <div class="file-upload-area" id="batchDropZone" role="button" tabindex="0" aria-label="Drop multiple images here">
            <div class="file-upload-icon">${ICONS.image}</div>
            <p class="file-upload-text">Drag & drop multiple images here or click to browse</p>
            <p class="file-upload-hint">Supports: PNG, JPG, GIF, WebP, SVG for batch processing</p>
            <input name="batchFileInput" type="file" id="batchFileInput" class="file-upload-input" multiple accept="image/*" aria-hidden="true">
        </div>
        <div id="batchTableResult"></div>
    `;
}

function createDiffTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 String A</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Paste first Base64 string..." aria-label="First Base64 string"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Base64 String B</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" id="clearInputB" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputTextB" id="inputTextB" placeholder="Paste second Base64 string..." aria-label="Second Base64 string"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="compute-diff" type="button">
                ${ICONS.layers} Compare Base64 Payloads
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
        <div id="diffResultContainer"></div>
    `;
}

function createHashTemplate() {
    return `
        <div class="tool-panel">
            <div class="panel-header">
                <span class="panel-title">${ICONS.lock} Input Text or Base64 Payload</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                    <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="inputText" id="inputText" placeholder="Enter text or Base64 string to compute cryptographic digests..." aria-label="Input for Hashes"></textarea>
            </div>
            <div class="panel-footer">
                <span id="inputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="tool-actions" style="margin-top: var(--spacing-4);">
            <button class="btn btn-primary" data-action="compute-hashes" type="button">
                ${ICONS.lock} Calculate Cryptographic Digests
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear
            </button>
        </div>
        <div id="hashResultContainer"></div>
    `;
}

function createBinaryTemplate(mode) {
    const isEncode = mode === 'encode';
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} ${isEncode ? 'Binary Bits Input (0100...)' : 'Base64 Input'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="${isEncode ? 'Enter 8-bit binary numbers (e.g. 01001000 01101111)...' : 'Enter Base64 string to convert to binary bits...'}" aria-label="Binary / Base64 Input"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} ${isEncode ? 'Base64 Output' : 'Binary Bits Output'}</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                        <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="${isEncode ? 'Base64 output will appear here...' : '01001000 01101111... binary bits will appear here...'}" readonly aria-label="Binary / Base64 Output"></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="${isEncode ? 'binary-to-base64' : 'base64-to-binary'}" type="button">
                ${ICONS.zap} ${isEncode ? 'Convert Binary to Base64' : 'Convert Base64 to Binary'}
            </button>
            <button class="btn btn-secondary" data-action="swap" type="button">
                ${ICONS.swap} Swap
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}


function createFontEncoderTemplate() {
    return `
        <div class="file-upload-area" id="fileDropZone" role="button" tabindex="0" aria-label="Drop font file here or click to browse">
            <div class="file-upload-icon">${ICONS.text}</div>
            <p class="file-upload-text">Drag & drop a Font file here (WOFF2, WOFF, TTF, OTF)</p>
            <p class="file-upload-hint">Generates CSS @font-face and launches live interactive typography tester</p>
            <input name="fileInput" type="file" id="fileInput" class="file-upload-input" accept=".woff2,.woff,.ttf,.otf" aria-hidden="true">
        </div>
        <div id="filePreviewContainer"></div>
        <div class="tool-panel" style="margin-top: var(--spacing-4);">
            <div class="panel-header">
                <span class="panel-title">${ICONS.code} CSS @font-face &amp; Data URI</span>
                <div class="panel-actions">
                    <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy" aria-label="Copy CSS">${ICONS.copy}</button>
                    <button class="btn-icon btn-sm" data-action="download-text" type="button" title="Download">${ICONS.download}</button>
                </div>
            </div>
            <div class="panel-body">
                <textarea name="outputText" id="outputText" placeholder="CSS @font-face snippet will appear here upon font upload..." readonly aria-label="CSS font-face Output"></textarea>
            </div>
        </div>
        <div class="font-specimen-box" id="fontSpecimenBox" style="display: none;">
            <div class="options-title">Interactive Font Specimen Sandbox</div>
            <p style="font-size: var(--font-size-xs); color: var(--text-tertiary);">Edit text below to test your decoded font in real time:</p>
            <div contenteditable="true" class="font-preview-editable" id="fontSpecimenEditable">
                Sphinx of black quartz, judge my vow. 1234567890
            </div>
        </div>
    `;
}

function createDefaultTemplate() {
    return `
        <div class="tool-panels">
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.text} Input</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="paste" type="button" title="Paste">${ICONS.paste}</button>
                        <button class="btn-icon btn-sm" data-action="clear-input" type="button" title="Clear">${ICONS.clear}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="inputText" id="inputText" placeholder="Enter input..."></textarea>
                </div>
                <div class="panel-footer">
                    <span id="inputStats">0 characters | 0 bytes</span>
                </div>
            </div>
            <div class="tool-panel">
                <div class="panel-header">
                    <span class="panel-title">${ICONS.code} Output</span>
                    <div class="panel-actions">
                        <button class="btn-icon btn-sm" data-action="copy" type="button" title="Copy">${ICONS.copy}</button>
                    </div>
                </div>
                <div class="panel-body">
                    <textarea name="outputText" id="outputText" placeholder="Output will appear here..." readonly></textarea>
                </div>
                <div class="panel-footer">
                    <span id="outputStats">0 characters | 0 bytes</span>
                </div>
            </div>
        </div>
        <div class="tool-actions">
            <button class="btn btn-primary" data-action="encode" type="button">
                ${ICONS.zap} Process
            </button>
            <button class="btn btn-secondary" data-action="clear-all" type="button">
                ${ICONS.clear} Clear All
            </button>
        </div>
    `;
}

// ============================================
// Tool Actions Handler
// ============================================

/**
 * Handle tool action
 * @param {string} action - Action name
 */
async function handleToolAction(action) {
    if (state.isProcessing) {
        showToast('Please wait, processing...', 'warning');
        return;
    }

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    try {
        switch (action) {
            case 'encode':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Input text');
                    const encoded = encodeBase64(inputText.value);
                    outputText.value = encoded;
                    updateStats();
                    addToHistory(state.currentTool, inputText.value, encoded);
                    showToast('Encoded successfully!', 'success');
                }
                break;

            case 'decode':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Base64 input');
                    const decoded = decodeBase64(inputText.value.trim());
                    outputText.value = decoded;
                    updateStats();
                    addToHistory(state.currentTool, inputText.value, decoded);
                    showToast('Decoded successfully!', 'success');
                }
                break;

            case 'encode-url-safe':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Input text');
                    const encoded = encodeUrlSafeBase64(inputText.value);
                    outputText.value = encoded;
                    updateStats();
                    addToHistory(state.currentTool, inputText.value, encoded);
                    showToast('Encoded to URL-safe Base64!', 'success');
                }
                break;

            case 'decode-url-safe':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'URL-safe Base64 input');
                    const decoded = decodeUrlSafeBase64(inputText.value.trim());
                    outputText.value = decoded;
                    updateStats();
                    addToHistory(state.currentTool, inputText.value, decoded);
                    showToast('Decoded from URL-safe Base64!', 'success');
                }
                break;

            case 'copy':
                if (outputText?.value) {
                    await copyToClipboard(outputText.value);
                } else {
                    showToast('Nothing to copy', 'warning');
                }
                break;

            case 'paste':
                try {
                    const text = await navigator.clipboard.readText();
                    if (inputText) {
                        inputText.value = text;
                        inputText.dispatchEvent(new Event('input'));
                        updateStats();
                    }
                } catch (err) {
                    showToast('Failed to paste. Please use Ctrl+V', 'error');
                }
                break;

            case 'clear-input':
                if (inputText) {
                    inputText.value = '';
                    inputText.focus();
                    updateStats();
                }
                break;

            case 'clear-all':
                clearAllFields();
                break;

            case 'swap':
                if (inputText && outputText && outputText.value) {
                    const temp = inputText.value;
                    inputText.value = outputText.value;
                    outputText.value = temp;
                    updateStats();
                }
                break;

            case 'download-text':
                if (outputText?.value) {
                    downloadFile(outputText.value, 'base64-output.txt', 'text/plain');
                } else {
                    showToast('Nothing to download', 'warning');
                }
                break;

            case 'play-audio':
                if (inputText) {
                    validateInput(inputText.value, 'Audio Base64 input');
                    let raw = inputText.value.trim();
                    if (!raw.startsWith('data:')) {
                        raw = 'data:audio/mp3;base64,' + raw;
                    }
                    const container = document.getElementById('audioPreviewContainer');
                    if (container) {
                        container.innerHTML = `
                            <div class="media-preview-wrapper">
                                <audio controls autoplay src="${raw}"></audio>
                                <p style="font-size: var(--font-size-xs); color: var(--text-tertiary);">In-Browser HTML5 Audio Playback</p>
                            </div>
                        `;
                    }
                    showToast('Audio decoded & playback active!', 'success');
                }
                break;

            case 'download-audio':
                if (inputText) {
                    validateInput(inputText.value, 'Audio Base64 input');
                    let raw = inputText.value.trim();
                    let b64 = raw.includes(',') ? raw.split(',')[1] : raw;
                    const blob = base64ToBlob(b64, 'audio/mpeg');
                    downloadBlob(blob, 'decoded-audio.mp3');
                    showToast('Downloaded decoded audio!', 'success');
                }
                break;

            case 'play-video':
                if (inputText) {
                    validateInput(inputText.value, 'Video Base64 input');
                    let raw = inputText.value.trim();
                    if (!raw.startsWith('data:')) {
                        raw = 'data:video/mp4;base64,' + raw;
                    }
                    const container = document.getElementById('videoPreviewContainer');
                    if (container) {
                        container.innerHTML = `
                            <div class="media-preview-wrapper">
                                <video controls autoplay src="${raw}"></video>
                                <p style="font-size: var(--font-size-xs); color: var(--text-tertiary);">In-Browser HTML5 Video Playback</p>
                            </div>
                        `;
                    }
                    showToast('Video decoded & playback active!', 'success');
                }
                break;

            case 'download-video':
                if (inputText) {
                    validateInput(inputText.value, 'Video Base64 input');
                    let raw = inputText.value.trim();
                    let b64 = raw.includes(',') ? raw.split(',')[1] : raw;
                    const blob = base64ToBlob(b64, 'video/mp4');
                    downloadBlob(blob, 'decoded-video.mp4');
                    showToast('Downloaded decoded video!', 'success');
                }
                break;

            case 'preview-pdf':
                if (inputText) {
                    validateInput(inputText.value, 'PDF Base64 input');
                    let raw = inputText.value.trim();
                    if (!raw.startsWith('data:')) {
                        raw = 'data:application/pdf;base64,' + raw;
                    }
                    const container = document.getElementById('pdfPreviewContainer');
                    if (container) {
                        container.innerHTML = `
                            <div class="media-preview-wrapper">
                                <iframe src="${raw}" title="PDF Document Preview"></iframe>
                            </div>
                        `;
                    }
                    showToast('PDF loaded for preview!', 'success');
                }
                break;

            case 'download-pdf':
                if (inputText) {
                    validateInput(inputText.value, 'PDF Base64 input');
                    let raw = inputText.value.trim();
                    let b64 = raw.includes(',') ? raw.split(',')[1] : raw;
                    const blob = base64ToBlob(b64, 'application/pdf');
                    downloadBlob(blob, 'document.pdf');
                    showToast('Downloaded decoded PDF document!', 'success');
                }
                break;

            case 'format-xml':
                if (inputText) {
                    validateInput(inputText.value, 'XML input');
                    try {
                        let formatted = inputText.value.replace(/>\s*</g, '>\n<');
                        inputText.value = formatted;
                        updateStats();
                        showToast('XML formatted cleanly!', 'success');
                    } catch (e) {
                        showToast('Could not format XML', 'warning');
                    }
                }
                break;

            case 'decode-xml':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Base64 input');
                    const decoded = decodeBase64(inputText.value.trim());
                    outputText.value = decoded.replace(/>\s*</g, '>\n<');
                    updateStats();
                    showToast('Decoded to formatted XML!', 'success');
                }
                break;

            case 'generate-data-uri':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Base64 payload');
                    const mime = document.getElementById('dataUriMimeSelect')?.value || 'image/png';
                    let payload = inputText.value.trim();
                    if (payload.startsWith('data:')) {
                        payload = payload.split(',')[1] || payload;
                    }
                    outputText.value = `data:${mime};base64,${payload}`;
                    updateStats();
                    showToast('Data URI generated!', 'success');
                }
                break;

            case 'detect-mime':
                if (inputText) {
                    validateInput(inputText.value, 'Base64 string');
                    const clean = inputText.value.trim().replace(/^data:[^;]+;base64,/, '');
                    const detected = detectMimeType(clean);
                    const container = document.getElementById('mimeInspectionResult');
                    if (container) {
                        container.innerHTML = `
                            <div class="mime-inspect-box">
                                <h3 style="font-size: var(--font-size-base); color: var(--text-primary); margin-bottom: var(--spacing-2);">MIME Inspection Findings</h3>
                                <div class="mime-detail-grid">
                                    <div class="mime-detail-card">
                                        <div class="mime-detail-label">Detected MIME Type</div>
                                        <div class="mime-detail-value">${detected}</div>
                                    </div>
                                    <div class="mime-detail-card">
                                        <div class="mime-detail-label">Magic Byte Prefix</div>
                                        <div class="mime-detail-value">${clean.substring(0, 8)}</div>
                                    </div>
                                    <div class="mime-detail-card">
                                        <div class="mime-detail-label">Valid Base64 Format</div>
                                        <div class="mime-detail-value" style="color: ${isValidBase64(clean) ? 'var(--primary)' : 'var(--error-500)'};">${isValidBase64(clean) ? 'YES (RFC 4648 Compliant)' : 'NO (Invalid Padding/Chars)'}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    showToast('Magic bytes inspected!', 'success');
                }
                break;

            case 'compute-diff':
                const textA = document.getElementById('inputText')?.value || '';
                const textB = document.getElementById('inputTextB')?.value || '';
                const diffBox = document.getElementById('diffResultContainer');
                if (diffBox) {
                    const lenA = textA.length;
                    const lenB = textB.length;
                    let matches = 0;
                    const maxLen = Math.max(lenA, lenB);
                    for (let i = 0; i < Math.min(lenA, lenB); i++) {
                        if (textA[i] === textB[i]) matches++;
                    }
                    const matchPercent = maxLen > 0 ? ((matches / maxLen) * 100).toFixed(2) : 100;
                    diffBox.innerHTML = `
                        <div class="diff-container">
                            <div class="diff-stats-banner">
                                <span class="diff-stat-badge">${ICONS.layers} Match: ${matchPercent}%</span>
                                <span>Length A: <strong>${lenA.toLocaleString()}</strong> chars</span>
                                <span>Length B: <strong>${lenB.toLocaleString()}</strong> chars</span>
                                <span>Delta: <strong>${Math.abs(lenA - lenB).toLocaleString()}</strong> chars</span>
                            </div>
                        </div>
                    `;
                }
                showToast('Diff analysis completed!', 'success');
                break;

            case 'compute-hashes':
                if (inputText) {
                    validateInput(inputText.value, 'Input');
                    const textVal = inputText.value;
                    const hashBox = document.getElementById('hashResultContainer');
                    const enc = new TextEncoder();
                    const data = enc.encode(textVal);

                    // Web Crypto Digests
                    Promise.all([
                        crypto.subtle.digest('SHA-256', data),
                        crypto.subtle.digest('SHA-512', data),
                        crypto.subtle.digest('SHA-1', data)
                    ]).then(([sha256Buf, sha512Buf, sha1Buf]) => {
                        const toHex = (buffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
                        const sha256 = toHex(sha256Buf);
                        const sha512 = toHex(sha512Buf);
                        const sha1 = toHex(sha1Buf);

                        if (hashBox) {
                            hashBox.innerHTML = `
                                <div class="hash-result-grid">
                                    <div class="hash-row">
                                        <span class="hash-label">SHA-256</span>
                                        <span class="hash-val">${sha256}</span>
                                    </div>
                                    <div class="hash-row">
                                        <span class="hash-label">SHA-512</span>
                                        <span class="hash-val">${sha512}</span>
                                    </div>
                                    <div class="hash-row">
                                        <span class="hash-label">SHA-1</span>
                                        <span class="hash-val">${sha1}</span>
                                    </div>
                                </div>
                            `;
                        }
                        showToast('Cryptographic hashes calculated!', 'success');
                    }).catch(e => {
                        showToast('Failed to calculate hashes: ' + e.message, 'error');
                    });
                }
                break;

            case 'binary-to-base64':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Binary input');
                    const cleanBin = inputText.value.replace(/[^01]/g, '');
                    if (cleanBin.length % 8 !== 0) {
                        showToast('Warning: Binary bit count is not a multiple of 8', 'warning');
                    }
                    let bytes = [];
                    for (let i = 0; i < cleanBin.length; i += 8) {
                        bytes.push(parseInt(cleanBin.substring(i, i + 8), 2));
                    }
                    const binaryString = String.fromCharCode.apply(null, bytes);
                    outputText.value = btoa(binaryString);
                    updateStats();
                    showToast('Converted 8-bit binary to Base64!', 'success');
                }
                break;

            case 'base64-to-binary':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Base64 input');
                    const decoded = atob(inputText.value.trim().replace(/^data:[^;]+;base64,/, ''));
                    let binOutput = [];
                    for (let i = 0; i < decoded.length; i++) {
                        binOutput.push(decoded.charCodeAt(i).toString(2).padStart(8, '0'));
                    }
                    outputText.value = binOutput.join(' ');
                    updateStats();
                    showToast('Converted Base64 to 8-bit binary sequence!', 'success');
                }
                break;

            case 'convert-to-file':
                await handleConvertToFile();
                break;

            case 'preview-file':
                handlePreviewFile();
                break;

            case 'preview-image':
                handlePreviewImage();
                break;

            case 'download-image':
                handleDownloadImage();
                break;

            case 'format-json':
                if (inputText) {
                    try {
                        const parsed = JSON.parse(inputText.value);
                        inputText.value = JSON.stringify(parsed, null, 2);
                        updateStats();
                        showToast('JSON formatted!', 'success');
                    } catch (e) {
                        showToast('Invalid JSON format', 'error');
                    }
                }
                break;

            case 'decode-json':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Base64 input');
                    const decoded = decodeBase64(inputText.value.trim());
                    try {
                        const parsed = JSON.parse(decoded);
                        outputText.value = JSON.stringify(parsed, null, 2);
                        updateStats();
                        showToast('Decoded to JSON!', 'success');
                    } catch (e) {
                        throw new Error('Decoded content is not valid JSON');
                    }
                }
                break;

            case 'validate':
                handleValidateBase64();
                break;

            case 'calculate':
                handleCalculateSizes();
                break;

            case 'decode-jwt':
                handleDecodeJWT();
                break;

            case 'generate-auth':
                handleGenerateAuth();
                break;

            case 'base64-to-hex':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Base64 input');
                    const hex = base64ToHex(inputText.value.trim());
                    outputText.value = hex;
                    updateStats();
                    showToast('Converted to Hex!', 'success');
                }
                break;

            case 'hex-to-base64':
                if (inputText && outputText) {
                    validateInput(inputText.value, 'Hex input');
                    const base64 = hexToBase64(inputText.value.trim());
                    outputText.value = base64;
                    updateStats();
                    showToast('Converted to Base64!', 'success');
                }
                break;

            case 'bulk-encode':
                handleBulkOperation('encode');
                break;

            case 'bulk-decode':
                handleBulkOperation('decode');
                break;

            default:
                console.warn('Unknown action:', action);
        }
    } catch (error) {
        showToast(error.message || 'An error occurred', 'error');
        console.error('Action error:', error);
    }
}

/**
 * Validate input is not empty
 * @param {string} value - Value to validate
 * @param {string} name - Field name for error message
 */
function validateInput(value, name = 'Input') {
    if (!value || !value.trim()) {
        throw new Error(`${name} cannot be empty`);
    }
}

/**
 * Clear all input/output fields
 */
function clearAllFields() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    if (inputText) inputText.value = '';
    if (outputText) outputText.value = '';

    // Clear preview containers
    ['filePreviewContainer', 'imagePreviewContainer', 'validationResult', 'jwtResult', 'sizeInfo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    // Clear additional inputs
    ['authUsername', 'authPassword', 'fileName'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = el.defaultValue || '';
    });

    updateStats();
}

/**
 * Handle file to Base64 conversion
 */
async function handleConvertToFile() {
    const inputText = document.getElementById('inputText');
    const fileName = document.getElementById('fileName');
    const mimeTypeSelect = document.getElementById('mimeType');

    validateInput(inputText?.value, 'Base64 input');

    let base64Data = inputText.value.trim();
    let mimeType = mimeTypeSelect?.value || 'auto';

    if (mimeType === 'auto') {
        mimeType = detectMimeType(base64Data);
    }

    // Get file extension
    const extensions = {
        'application/pdf': '.pdf',
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'application/json': '.json',
        'application/xml': '.xml',
        'text/plain': '.txt',
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'video/mp4': '.mp4',
        'application/octet-stream': '.bin'
    };

    const ext = extensions[mimeType] || '.bin';
    const name = (fileName?.value || 'download') + ext;

    const blob = base64ToBlob(base64Data, mimeType);
    downloadFile(blob, name, mimeType);
}

/**
 * Handle file preview
 */
function handlePreviewFile() {
    const inputText = document.getElementById('inputText');
    const previewContainer = document.getElementById('filePreviewContainer');

    validateInput(inputText?.value, 'Base64 input');

    let base64Data = inputText.value.trim();
    const mimeType = detectMimeType(base64Data);

    // Ensure data URI format
    if (!base64Data.startsWith('data:')) {
        base64Data = `data:${mimeType};base64,${base64Data.includes(',') ? base64Data.split(',')[1] : base64Data}`;
    }

    if (mimeType.startsWith('image/')) {
        previewContainer.innerHTML = `
            <div class="image-preview-wrapper">
                <img src="${base64Data}" alt="Preview" class="image-preview" onerror="this.parentElement.innerHTML='<p style=\\'color: var(--error-500);\\'>Failed to load image</p>'">
            </div>
        `;
    } else if (mimeType === 'application/pdf') {
        previewContainer.innerHTML = `
            <div style="margin-top: var(--spacing-4);">
                <embed src="${base64Data}" type="application/pdf" width="100%" height="400px" style="border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <p style="margin-top: var(--spacing-2); font-size: var(--font-size-xs); color: var(--text-tertiary);">
                    If preview doesn't load, your browser may not support embedded PDFs. Use the download button instead.
                </p>
            </div>
        `;
    } else if (mimeType.startsWith('text/') || mimeType === 'application/json') {
        try {
            const decoded = decodeBase64(base64Data.split(',')[1] || base64Data);
            previewContainer.innerHTML = `
                <div class="tool-panel" style="margin-top: var(--spacing-4);">
                    <div class="panel-header">
                        <span class="panel-title">Text Preview</span>
                    </div>
                    <div class="panel-body" style="max-height: 300px; overflow: auto;">
                        <pre style="padding: var(--spacing-4); white-space: pre-wrap; font-family: var(--font-mono); font-size: var(--font-size-sm); margin: 0;">${sanitizeHTML(decoded)}</pre>
                    </div>
                </div>
            `;
        } catch (e) {
            previewContainer.innerHTML = `<p style="color: var(--error-500); padding: var(--spacing-4);">Failed to decode content</p>`;
        }
    } else {
        previewContainer.innerHTML = `
            <div style="margin-top: var(--spacing-4); padding: var(--spacing-4); background: var(--bg-tertiary); border-radius: var(--radius-lg); text-align: center;">
                <p style="color: var(--text-secondary);">Preview not available for this file type</p>
                <p style="color: var(--text-tertiary); font-size: var(--font-size-sm); margin-top: var(--spacing-2);">Detected MIME type: ${mimeType}</p>
            </div>
        `;
    }

    showToast('Preview generated!', 'success');
}

/**
 * Handle image preview
 */
function handlePreviewImage() {
    const inputText = document.getElementById('inputText');
    const previewContainer = document.getElementById('imagePreviewContainer');

    validateInput(inputText?.value, 'Base64 input');

    let base64Data = inputText.value.trim();

    // Ensure data URI format
    if (!base64Data.startsWith('data:')) {
        const mimeType = detectMimeType(base64Data);
        base64Data = `data:${mimeType};base64,${base64Data}`;
    }

    previewContainer.innerHTML = `
        <div class="image-preview-wrapper">
            <img src="${base64Data}" alt="Preview" class="image-preview" onerror="this.onerror=null; this.parentElement.innerHTML='<p style=\\'color: var(--error-500); padding: var(--spacing-4);\\'>Failed to load image. Please check if the Base64 data is valid.</p>'">
        </div>
    `;

    showToast('Image preview generated!', 'success');
}

/**
 * Handle image download
 */
function handleDownloadImage() {
    const inputText = document.getElementById('inputText');

    validateInput(inputText?.value, 'Base64 input');

    let base64Data = inputText.value.trim();
    const mimeType = detectMimeType(base64Data);

    const extensions = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg'
    };

    const ext = extensions[mimeType] || '.png';
    const blob = base64ToBlob(base64Data, mimeType);
    downloadFile(blob, 'image' + ext, mimeType);
}

/**
 * Handle Base64 validation
 */
function handleValidateBase64() {
    const inputText = document.getElementById('inputText');
    const resultContainer = document.getElementById('validationResult');

    validateInput(inputText?.value, 'Base64 input');

    const base64String = inputText.value.trim();
    const isValid = isValidBase64(base64String);

    let detailsHtml = '';

    if (isValid) {
        try {
            const cleaned = base64String.replace(/[\s\n\r]/g, '');
            const decoded = atob(cleaned);
            const mimeType = detectMimeType(base64String);
            const padding = base64String.match(/=+$/) || ['None'];

            detailsHtml = `
                <div class="result-details">
                    <div class="result-detail-item">
                        <span class="result-detail-label">Encoded Length</span>
                        <span class="result-detail-value">${cleaned.length.toLocaleString()} characters</span>
                    </div>
                    <div class="result-detail-item">
                        <span class="result-detail-label">Decoded Size</span>
                        <span class="result-detail-value">${formatFileSize(decoded.length)}</span>
                    </div>
                    <div class="result-detail-item">
                        <span class="result-detail-label">Detected MIME Type</span>
                        <span class="result-detail-value">${mimeType}</span>
                    </div>
                    <div class="result-detail-item">
                        <span class="result-detail-label">Padding</span>
                        <span class="result-detail-value">${padding[0]}</span>
                    </div>
                </div>
            `;
        } catch (e) {
            // Keep details empty on error
        }
    }

    resultContainer.innerHTML = `
        <div class="result-panel ${isValid ? 'success' : 'error'}" style="margin-top: var(--spacing-4);">
            <div class="result-panel-header">
                <div class="result-panel-icon">
                    ${isValid ? ICONS.check : ICONS.error}
                </div>
                <div>
                    <h3 class="result-panel-title">${isValid ? 'Valid Base64' : 'Invalid Base64'}</h3>
                    <p class="result-panel-text">
                        ${isValid ? 'The input is a valid Base64 encoded string.' : 'The input contains invalid Base64 characters or format.'}
                    </p>
                </div>
            </div>
            ${detailsHtml}
        </div>
    `;
}

/**
 * Handle size calculation
 */
function handleCalculateSizes() {
    const inputText = document.getElementById('inputText');
    const sizeInfo = document.getElementById('sizeInfo');

    validateInput(inputText?.value, 'Input');

    const text = inputText.value;
    const originalBytes = new Blob([text]).size;

    let encodedSize, decodedSize, isBase64Input;

    // Check if input is already Base64
    if (isValidBase64(text.trim())) {
        isBase64Input = true;
        try {
            const decoded = atob(text.replace(/[\s\n\r]/g, ''));
            decodedSize = decoded.length;
            encodedSize = text.replace(/[\s\n\r]/g, '').length;
        } catch (e) {
            isBase64Input = false;
        }
    }

    if (!isBase64Input) {
        isBase64Input = false;
        const encoded = encodeBase64(text);
        encodedSize = encoded.length;
        decodedSize = originalBytes;
    }

    const ratio = ((encodedSize / decodedSize) * 100 - 100).toFixed(1);
    const overhead = encodedSize - decodedSize;

    sizeInfo.innerHTML = `
        <div class="size-grid">
            <div class="size-card highlight">
                <div class="size-card-label">Input Type</div>
                <div class="size-card-value">${isBase64Input ? 'Base64' : 'Plain Text'}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">
                <div class="size-card">
                    <div class="size-card-label">Original Size</div>
                    <div class="size-card-value">${formatFileSize(decodedSize)}</div>
                    <div class="size-card-sub">${decodedSize.toLocaleString()} bytes</div>
                </div>
                <div class="size-card">
                    <div class="size-card-label">Base64 Size</div>
                    <div class="size-card-value">${formatFileSize(encodedSize)}</div>
                    <div class="size-card-sub">${encodedSize.toLocaleString()} characters</div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">
                <div class="size-card warning">
                    <div class="size-card-label">Size Increase</div>
                    <div class="size-card-value">+${ratio}%</div>
                </div>
                <div class="size-card">
                    <div class="size-card-label">Overhead</div>
                    <div class="size-card-value">+${formatFileSize(overhead)}</div>
                </div>
            </div>
            <div style="padding: var(--spacing-3); background: var(--bg-tertiary); border-radius: var(--radius-lg); font-size: var(--font-size-sm); color: var(--text-secondary);">
                <strong>Note:</strong> Base64 encoding increases data size by approximately 33% because it represents 3 bytes of binary data as 4 ASCII characters.
            </div>
        </div>
    `;
}

/**
 * Handle JWT decoding
 */
function handleDecodeJWT() {
    const inputText = document.getElementById('inputText');
    const resultContainer = document.getElementById('jwtResult');

    validateInput(inputText?.value, 'JWT token');

    try {
        const jwt = decodeJWT(inputText.value.trim());

        resultContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: var(--spacing-4); margin-top: var(--spacing-4);">
                <div class="jwt-section">
                    <div class="jwt-section-header">
                        <span class="jwt-section-title header">${ICONS.code} Header (Algorithm & Token Type)</span>
                        <button class="btn-icon btn-sm" type="button" onclick="copyToClipboard(JSON.stringify(${JSON.stringify(jwt.header)}, null, 2))" title="Copy header">${ICONS.copy}</button>
                    </div>
                    <div class="jwt-content">${sanitizeHTML(JSON.stringify(jwt.header, null, 2))}</div>
                </div>
                <div class="jwt-section">
                    <div class="jwt-section-header">
                        <span class="jwt-section-title payload">${ICONS.braces} Payload (Data)</span>
                        <button class="btn-icon btn-sm" type="button" onclick="copyToClipboard(JSON.stringify(${JSON.stringify(jwt.payload)}, null, 2))" title="Copy payload">${ICONS.copy}</button>
                    </div>
                    <div class="jwt-content">${sanitizeHTML(JSON.stringify(jwt.payload, null, 2))}</div>
                </div>
                <div class="jwt-section">
                    <div class="jwt-section-header">
                        <span class="jwt-section-title signature">${ICONS.lock} Signature</span>
                    </div>
                    <div class="jwt-content" style="font-size: var(--font-size-xs);">${sanitizeHTML(jwt.signature)}</div>
                    <p class="jwt-signature-note">Note: Signature verification requires the secret key and is not performed here.</p>
                </div>
            </div>
        `;

        showToast('JWT decoded successfully!', 'success');
    } catch (error) {
        resultContainer.innerHTML = `
            <div class="result-panel error" style="margin-top: var(--spacing-4);">
                <div class="result-panel-header">
                    <div class="result-panel-icon">${ICONS.error}</div>
                    <div>
                        <h3 class="result-panel-title">Invalid JWT Token</h3>
                        <p class="result-panel-text">${sanitizeHTML(error.message)}</p>
                    </div>
                </div>
            </div>
        `;
        showToast('Invalid JWT token', 'error');
    }
}

/**
 * Handle Basic Auth generation
 */
function handleGenerateAuth() {
    const username = document.getElementById('authUsername');
    const password = document.getElementById('authPassword');
    const outputText = document.getElementById('outputText');

    if (!username?.value?.trim()) {
        showToast('Please enter a username', 'warning');
        username?.focus();
        return;
    }

    const credentials = `${username.value}:${password?.value || ''}`;
    const encoded = encodeBase64(credentials);

    outputText.value = `Authorization: Basic ${encoded}`;

    showToast('Authorization header generated!', 'success');
}

/**
 * Handle bulk encode/decode
 * @param {string} mode - 'encode' or 'decode'
 */
function handleBulkOperation(mode) {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    validateInput(inputText?.value, 'Input');

    const lines = inputText.value.split('\n');
    let successCount = 0;
    let errorCount = 0;

    const results = lines.map(line => {
        if (!line.trim()) return '';

        try {
            const result = mode === 'encode'
                ? encodeBase64(line)
                : decodeBase64(line.trim());
            successCount++;
            return result;
        } catch (e) {
            errorCount++;
            return `[ERROR: ${e.message}]`;
        }
    });

    outputText.value = results.join('\n');
    updateStats();

    const totalProcessed = successCount + errorCount;
    if (errorCount > 0) {
        showToast(`Processed ${totalProcessed} items: ${successCount} success, ${errorCount} errors`, 'warning');
    } else {
        showToast(`Successfully ${mode}d ${successCount} items!`, 'success');
    }
}

// ============================================
// File Upload Handlers
// ============================================

/**
 * Setup file upload functionality
 */
function setupFileUpload() {
    const fileDropZone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('fileInput');

    if (!fileDropZone || !fileInput) return;

    // Click to upload
    const handleClick = () => fileInput.click();
    fileDropZone.addEventListener('click', handleClick);
    fileDropZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // Drag and drop
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileDropZone.addEventListener(eventName, preventDefaults);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        fileDropZone.addEventListener(eventName, () => {
            fileDropZone.classList.add('drag-over');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileDropZone.addEventListener(eventName, () => {
            fileDropZone.classList.remove('drag-over');
        });
    });

    fileDropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
}

/**
 * Handle file selection
 * @param {File} file - Selected file
 */
async function handleFileSelect(file) {
    if (!file) return;

    const outputText = document.getElementById('outputText');
    const includeDataUri = document.getElementById('includeDataUri');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const filePreviewContainer = document.getElementById('filePreviewContainer');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // Validate file size
    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showToast(`File is too large. Maximum size is ${formatFileSize(CONFIG.MAX_FILE_SIZE)}`, 'error');
        return;
    }

    state.isProcessing = true;

    // Show progress
    if (progressContainer) {
        progressContainer.hidden = false;
        progressBar.style.width = '0%';
        progressText.textContent = 'Reading file...';
    }

    try {
        const base64 = await fileToBase64(file, (progress) => {
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `Processing... ${progress}%`;
        });

        // Generate output based on tool type
        let output = base64;

        if (includeDataUri && !includeDataUri.checked) {
            output = base64.split(',')[1] || base64;
        }

        // Handle specific tool types
        if (state.currentTool === 'image-to-css') {
            output = `.element {
    background-image: url('${base64}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}`;
        } else if (state.currentTool === 'image-to-html') {
            const alt = document.getElementById('imgAlt')?.value || 'Image';
            const cssClass = document.getElementById('imgClass')?.value;
            const id = document.getElementById('imgId')?.value;

            let attrs = `src="${base64}" alt="${sanitizeHTML(alt)}"`;
            if (cssClass) attrs += ` class="${sanitizeHTML(cssClass)}"`;
            if (id) attrs += ` id="${sanitizeHTML(id)}"`;

            output = `<img ${attrs}>`;
        } else if (state.currentTool === 'font-to-base64') {
            const ext = file.name.split('.').pop().toLowerCase();
            const format = ext === 'woff2' ? 'woff2' : (ext === 'woff' ? 'woff' : (ext === 'otf' ? 'opentype' : 'truetype'));
            const cleanFamilyName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_") || 'CustomFont';
            output = `@font-face {\n    font-family: '${cleanFamilyName}';\n    src: url('${base64}') format('${format}');\n    font-weight: normal;\n    font-style: normal;\n    font-display: swap;\n}\n\n/* Example CSS Usage */\n.custom-typography {\n    font-family: '${cleanFamilyName}', sans-serif;\n}`;

            // Inject dynamic style rule for interactive font preview sandbox
            let dynamicStyle = document.getElementById('dynamicFontSpecimenStyle');
            if (!dynamicStyle) {
                dynamicStyle = document.createElement('style');
                dynamicStyle.id = 'dynamicFontSpecimenStyle';
                document.head.appendChild(dynamicStyle);
            }
            dynamicStyle.textContent = `@font-face { font-family: '${cleanFamilyName}'; src: url('${base64}') format('${format}'); }`;

            const fontSpecimenBox = document.getElementById('fontSpecimenBox');
            const fontSpecimenEditable = document.getElementById('fontSpecimenEditable');
            if (fontSpecimenBox && fontSpecimenEditable) {
                fontSpecimenBox.style.display = 'block';
                fontSpecimenEditable.style.fontFamily = `'${cleanFamilyName}', sans-serif`;
            }
        }

        if (outputText) outputText.value = output;

        // Show preview
        const previewContainer = imagePreviewContainer || filePreviewContainer;
        if (previewContainer && file.type.startsWith('image/')) {
            previewContainer.innerHTML = `
                <div class="image-preview-wrapper">
                    <img src="${base64}" alt="Preview" class="image-preview">
                    <div class="file-preview">
                        <div class="file-preview-icon">${ICONS.image}</div>
                        <div class="file-preview-info">
                            <div class="file-preview-name">${sanitizeHTML(file.name)}</div>
                            <div class="file-preview-size">${formatFileSize(file.size)} | ${file.type}</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (previewContainer && file.type.startsWith('audio/')) {
            previewContainer.innerHTML = `
                <div class="media-preview-wrapper">
                    <audio controls src="${base64}"></audio>
                    <div class="file-preview-info" style="margin-top: var(--spacing-2);">
                        <div class="file-preview-name">${sanitizeHTML(file.name)}</div>
                        <div class="file-preview-size">${formatFileSize(file.size)} | ${file.type}</div>
                    </div>
                </div>
            `;
        } else if (previewContainer && file.type.startsWith('video/')) {
            previewContainer.innerHTML = `
                <div class="media-preview-wrapper">
                    <video controls src="${base64}"></video>
                    <div class="file-preview-info" style="margin-top: var(--spacing-2);">
                        <div class="file-preview-name">${sanitizeHTML(file.name)}</div>
                        <div class="file-preview-size">${formatFileSize(file.size)} | ${file.type}</div>
                    </div>
                </div>
            `;
        } else if (previewContainer && file.type === 'application/pdf') {
            previewContainer.innerHTML = `
                <div class="media-preview-wrapper">
                    <iframe src="${base64}" title="PDF Preview"></iframe>
                    <div class="file-preview-info" style="margin-top: var(--spacing-2);">
                        <div class="file-preview-name">${sanitizeHTML(file.name)}</div>
                        <div class="file-preview-size">${formatFileSize(file.size)} | ${file.type}</div>
                    </div>
                </div>
            `;
        } else if (filePreviewContainer) {
            filePreviewContainer.innerHTML = `
                <div class="file-preview">
                    <div class="file-preview-icon">${ICONS.file}</div>
                    <div class="file-preview-info">
                        <div class="file-preview-name">${sanitizeHTML(file.name)}</div>
                        <div class="file-preview-size">${formatFileSize(file.size)} | ${file.type || 'Unknown type'}</div>
                    </div>
                </div>
            `;
        }

        updateStats();
        addToHistory(state.currentTool, file.name, output.substring(0, 100) + '...');
        showToast('File converted successfully!', 'success');

    } catch (error) {
        showToast(error.message || 'Failed to process file', 'error');
    } finally {
        state.isProcessing = false;
        if (progressContainer) progressContainer.hidden = true;
    }
}

// ============================================
// Live Encoder Setup
// ============================================

/**
 * Setup live encoder functionality
 */
function setupLiveEncoder() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encodeRadio = document.getElementById('liveEncode');
    const decodeRadio = document.getElementById('liveDecode');

    if (!inputText || !outputText) return;

    const processLive = debounce(() => {
        const mode = encodeRadio?.checked ? 'encode' : 'decode';
        const input = inputText.value;

        if (!input) {
            outputText.value = '';
            updateStats();
            return;
        }

        try {
            outputText.value = mode === 'encode'
                ? encodeBase64(input)
                : decodeBase64(input);
            outputText.style.color = '';
        } catch (e) {
            outputText.value = `Error: ${e.message}`;
            outputText.style.color = 'var(--error-500)';
        }

        updateStats();
    }, 100);

    inputText.addEventListener('input', processLive);
    encodeRadio?.addEventListener('change', processLive);
    decodeRadio?.addEventListener('change', processLive);
}

// ============================================
// Stats Update
// ============================================

/**
 * Update input/output statistics
 */
function updateStats() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const inputStats = document.getElementById('inputStats');
    const outputStats = document.getElementById('outputStats');

    if (inputText && inputStats) {
        const stats = getStats(inputText.value);
        const isBulk = state.currentTool?.includes('bulk');

        inputStats.textContent = isBulk
            ? `${inputText.value.split('\n').filter(l => l.trim()).length} lines`
            : `${stats.chars.toLocaleString()} characters | ${formatFileSize(stats.bytes)}`;
    }

    if (outputText && outputStats) {
        const stats = getStats(outputText.value);
        const isBulk = state.currentTool?.includes('bulk');

        outputStats.textContent = isBulk
            ? `${outputText.value.split('\n').filter(l => l.trim()).length} lines`
            : `${stats.chars.toLocaleString()} characters | ${formatFileSize(stats.bytes)}`;
    }
}

// ============================================
// Tool Navigation
// ============================================

/**
 * Open a tool
 * @param {string} toolId - Tool ID
 */
function openTool(toolId) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) {
        showToast('Tool not found', 'error');
        return;
    }

    state.currentTool = toolId;

    // Update UI
    if (elements.currentToolName) {
        elements.currentToolName.textContent = tool.name;
    }
    if (elements.currentToolDescription) {
        elements.currentToolDescription.textContent = tool.description;
    }

    // Load template
    if (elements.workspaceContent) {
        elements.workspaceContent.innerHTML = getToolTemplate(toolId);
    }

    // Show workspace, hide grid
    if (elements.toolsGrid) elements.toolsGrid.hidden = true;
    if (elements.workspace) elements.workspace.hidden = false;

    // Setup tool-specific features
    setupFileUpload();

    if (toolId === 'live-encoder') {
        setupLiveEncoder();
    }

    // Setup action buttons
    elements.workspaceContent?.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleToolAction(btn.dataset.action);
        });
    });

    // Setup input listeners
    const inputText = document.getElementById('inputText');
    if (inputText) {
        inputText.addEventListener('input', updateStats);
        setTimeout(() => inputText.focus(), 100);
    }

    // Update URL hash
    history.pushState({ tool: toolId }, '', `#${toolId}`);
}

/**
 * Close current tool
 */
function closeTool() {
    state.currentTool = null;

    if (elements.workspace) elements.workspace.hidden = true;
    if (elements.toolsGrid) elements.toolsGrid.hidden = false;

    // Clear URL hash
    history.pushState({}, '', window.location.pathname);
}

// ============================================
// Search Functionality
// ============================================

/**
 * Open search modal
 */
function openSearch() {
    if (!elements.searchModal) return;

    elements.searchModal.hidden = false;
    elements.searchModal.classList.add('active');
    elements.searchToggle?.setAttribute('aria-expanded', 'true');

    if (elements.searchInput) {
        elements.searchInput.value = '';
        elements.searchInput.focus();
    }

    renderSearchResults('');

    // Trap focus in modal
    document.body.style.overflow = 'hidden';
}

/**
 * Close search modal
 */
function closeSearch() {
    if (!elements.searchModal) return;

    elements.searchModal.classList.remove('active');
    elements.searchToggle?.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
        elements.searchModal.hidden = true;
    }, 200);

    document.body.style.overflow = '';
}

/**
 * Render search results
 * @param {string} query - Search query
 */
function renderSearchResults(query) {
    if (!elements.searchResults) return;

    const normalizedQuery = query.toLowerCase().trim();

    const filtered = normalizedQuery
        ? TOOLS.filter(tool =>
            tool.name.toLowerCase().includes(normalizedQuery) ||
            tool.description.toLowerCase().includes(normalizedQuery) ||
            tool.category.toLowerCase().includes(normalizedQuery)
        )
        : TOOLS.slice(0, 8);

    if (filtered.length === 0) {
        elements.searchResults.innerHTML = `
            <div class="search-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>No tools found for "${sanitizeHTML(query)}"</p>
            </div>
        `;
        return;
    }

    elements.searchResults.innerHTML = filtered.map((tool, index) => `
        <div class="search-result-item ${index === 0 ? 'selected' : ''}" 
             data-tool-id="${tool.id}" 
             role="option"
             tabindex="0"
             aria-selected="${index === 0}">
            <div class="search-result-icon" aria-hidden="true">
                ${ICONS[tool.icon] || ICONS.file}
            </div>
            <div class="search-result-info">
                <div class="search-result-name">${sanitizeHTML(tool.name)}</div>
                <div class="search-result-category">${sanitizeHTML(tool.category)}</div>
            </div>
        </div>
    `).join('');

    // Add click and keyboard handlers
    elements.searchResults.querySelectorAll('.search-result-item').forEach(item => {
        const handler = () => {
            openTool(item.dataset.toolId);
            closeSearch();
        };

        item.addEventListener('click', handler);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handler();
            }
        });
    });
}

/**
 * Handle search keyboard navigation
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleSearchKeyboard(e) {
    const items = elements.searchResults?.querySelectorAll('.search-result-item');
    if (!items || items.length === 0) return;

    const currentIndex = Array.from(items).findIndex(item =>
        item.classList.contains('selected')
    );

    let newIndex = currentIndex;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            newIndex = Math.min(currentIndex + 1, items.length - 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            newIndex = Math.max(currentIndex - 1, 0);
            break;
        case 'Enter':
            e.preventDefault();
            if (currentIndex >= 0) {
                openTool(items[currentIndex].dataset.toolId);
                closeSearch();
            }
            return;
        default:
            return;
    }

    // Update selection
    items.forEach((item, index) => {
        item.classList.toggle('selected', index === newIndex);
        item.setAttribute('aria-selected', index === newIndex);
    });

    // Scroll into view
    items[newIndex]?.scrollIntoView({ block: 'nearest' });
}

// ============================================
// Sidebar (History)
// ============================================

/**
 * Toggle history sidebar
 */
function toggleSidebar() {
    if (!elements.historySidebar) return;

    const isActive = elements.historySidebar.classList.contains('active');

    if (isActive) {
        closeSidebar();
    } else {
        elements.historySidebar.hidden = false;
        elements.historySidebar.classList.add('active');
        elements.historyToggle?.setAttribute('aria-expanded', 'true');
    }
}

/**
 * Close history sidebar
 */
function closeSidebar() {
    if (!elements.historySidebar) return;

    elements.historySidebar.classList.remove('active');
    elements.historyToggle?.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
        if (!elements.historySidebar.classList.contains('active')) {
            elements.historySidebar.hidden = true;
        }
    }, 300);
}

// ============================================
// Modal Helpers
// ============================================

/**
 * Close all modals
 */
function closeAllModals() {
    closeSearch();
    closeSidebar();
    closeShortcutsModal();
}

/**
 * Open shortcuts modal
 */
function openShortcutsModal() {
    if (!elements.shortcutsModal) return;

    elements.shortcutsModal.hidden = false;
    elements.shortcutsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close shortcuts modal
 */
function closeShortcutsModal() {
    if (!elements.shortcutsModal) return;

    elements.shortcutsModal.classList.remove('active');

    setTimeout(() => {
        elements.shortcutsModal.hidden = true;
    }, 200);

    document.body.style.overflow = '';
}

// ============================================
// Keyboard Shortcuts
// ============================================

/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Check if user is typing in an input field
        const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
            document.activeElement?.tagName
        );

        // Ctrl/Cmd + K: Open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (elements.searchModal?.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
            return;
        }

        // Ctrl/Cmd + D: Toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
            return;
        }

        // Escape: Close modals or go back
        if (e.key === 'Escape') {
            if (elements.searchModal?.classList.contains('active')) {
                closeSearch();
            } else if (elements.shortcutsModal?.classList.contains('active')) {
                closeShortcutsModal();
            } else if (elements.historySidebar?.classList.contains('active')) {
                closeSidebar();
            } else if (state.currentTool) {
                closeTool();
            }
            return;
        }

        // ? : Show shortcuts (when not typing)
        if (e.key === '?' && !isTyping) {
            e.preventDefault();
            openShortcutsModal();
            return;
        }

        // Handle search modal keyboard navigation
        if (elements.searchModal?.classList.contains('active')) {
            handleSearchKeyboard(e);
            return;
        }

        // The following shortcuts only work when in a tool workspace
        if (!state.currentTool) return;

        // Ctrl/Cmd + Enter: Execute primary action
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            const primaryBtn = elements.workspaceContent?.querySelector('.btn-primary');
            if (primaryBtn && !primaryBtn.disabled) {
                primaryBtn.click();
            }
            return;
        }

        // Ctrl/Cmd + Shift + C: Copy output
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            handleToolAction('copy');
            return;
        }

        // Ctrl/Cmd + L: Clear all (when not typing or with modifier)
        if ((e.ctrlKey || e.metaKey) && e.key === 'l' && !isTyping) {
            e.preventDefault();
            handleToolAction('clear-all');
            return;
        }
    });
}

// ============================================
// Event Listeners Setup
// ============================================

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Navigation tabs
    elements.navTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            elements.navTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Render tools for category
            renderToolsGrid(tab.dataset.category);

            // Close tool if open
            if (state.currentTool) {
                closeTool();
            }
        });
    });

    // Back button
    elements.backToTools?.addEventListener('click', closeTool);

    // Theme toggle
    elements.themeToggle?.addEventListener('click', toggleTheme);

    // Search
    elements.searchToggle?.addEventListener('click', openSearch);

    elements.searchInput?.addEventListener('input', debounce((e) => {
        renderSearchResults(e.target.value);
    }, 150));

    elements.searchModal?.querySelector('.modal-backdrop')?.addEventListener('click', closeSearch);

    // History
    elements.historyToggle?.addEventListener('click', toggleSidebar);
    elements.clearHistory?.addEventListener('click', clearHistoryData);

    // Shortcuts modal
    elements.showShortcuts?.addEventListener('click', openShortcutsModal);

    elements.shortcutsModal?.querySelector('.modal-backdrop')?.addEventListener('click', closeShortcutsModal);
    elements.shortcutsModal?.querySelector('.modal-close')?.addEventListener('click', closeShortcutsModal);

    // Click outside sidebar to close
    document.addEventListener('click', (e) => {
        if (elements.historySidebar?.classList.contains('active')) {
            const isOutside = !elements.historySidebar.contains(e.target) &&
                !elements.historyToggle?.contains(e.target);
            if (isOutside) {
                closeSidebar();
            }
        }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        if (e.state?.tool) {
            openTool(e.state.tool);
        } else if (state.currentTool) {
            closeTool();
        }
    });

    // Handle initial hash
    const hash = window.location.hash.slice(1);
    if (hash && TOOLS.find(t => t.id === hash)) {
        setTimeout(() => openTool(hash), 100);
    }

    // Listen for system theme changes
    const themeMediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (themeMediaQuery) {
        const handleThemeChange = (e) => {
            if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
                state.theme = e.matches ? 'dark' : 'light';
                applyTheme();
            }
        };
        if (themeMediaQuery.addEventListener) {
            themeMediaQuery.addEventListener('change', handleThemeChange);
        } else if (themeMediaQuery.addListener) {
            themeMediaQuery.addListener(handleThemeChange);
        }
    }

    // Update current year in footer
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }
}

// ============================================
// Service Worker Registration (Optional PWA)
// ============================================

/**
 * Register service worker for offline support
 */
async function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('ServiceWorker registered with scope:', reg.scope);
            const statusText = document.getElementById('pwaStatusText');
            if (statusText) statusText.textContent = 'Offline Ready';
        }).catch(err => {
            console.warn('ServiceWorker registration error:', err);
        });
    }
}

// ============================================
// Error Handling
// ============================================

/**
 * Global error handler
 */
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        // Don't show toast for every error to avoid spam
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// ============================================
// Performance Monitoring
// ============================================

/**
 * Log performance metrics
 */
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);

                // Log to analytics if available
                if (typeof gtag === 'function') {
                    gtag('event', 'timing_complete', {
                        name: 'load',
                        value: loadTime
                    });
                }
            }, 0);
        });
    }
}

// ============================================
// Initialization
// ============================================

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    if (elements.loadingOverlay) {
        elements.loadingOverlay.classList.add('hidden');

        // Remove from DOM after animation
        setTimeout(() => {
            elements.loadingOverlay.remove();
        }, 500);
    }
}

/**
 * Initialize the application
 */
function init() {
    try {
        // Cache DOM elements
        cacheElements();

        setupGuideTabs();
        setupBatchUpload();
// Load saved preferences
        loadTheme();
        loadHistory();

        // Render initial tools grid
        renderToolsGrid('all');

        // Setup event listeners
        setupEventListeners();
        setupKeyboardShortcuts();
        setupErrorHandling();
        setupOmniWorkbench();
        setupSettingsModal();

        // Hide loading overlay
        hideLoadingOverlay();

        // Optional: Register service worker
        registerServiceWorker();

        // Log performance
        logPerformance();

        // Log ready message
        console.log('%c Base64 Tools Hub ',
            'background: linear-gradient(135deg, #4361ee, #3f37c9); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
        );
        console.log('Press ? for keyboard shortcuts');

    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Failed to initialize application', 'error');
        hideLoadingOverlay();
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        encodeBase64,
        decodeBase64,
        encodeUrlSafeBase64,
        decodeUrlSafeBase64,
        isValidBase64,
        detectMimeType,
        base64ToBlob,
        hexToBase64,
        base64ToHex,
        decodeJWT
    };
}

function setupGuideTabs() {
    const tabs = [
        { id: 'field-guide', name: 'Field Guide' },
        { id: 'inflation-math', name: 'Inflation Math' },
        { id: 'mime-signatures', name: 'MIME Signatures' },
        { id: 'security-privacy', name: 'Security & Privacy' },
        { id: 'url-safe', name: 'URL-Safe RFC 4648' },
        { id: 'faq', name: 'Developer FAQ' }
    ];

    let currentIdx = 0;

    function switchGuideTab(idx, scroll) {
        if (idx < 0 || idx >= tabs.length) return;
        currentIdx = idx;
        const target = tabs[currentIdx];

        // Update nav buttons
        document.querySelectorAll('.guide-nav-btn').forEach((b, i) => {
            const isActive = b.dataset.guideTab === target.id;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update panes
        document.querySelectorAll('.guide-pane').forEach(p => {
            p.classList.toggle('active', p.id === `pane-${target.id}`);
        });

        // Update dots
        document.querySelectorAll('.guide-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIdx);
        });

        // Update counter
        const counter = document.getElementById('guideCounter');
        if (counter) counter.textContent = `${currentIdx + 1} / ${tabs.length}`;

        // Update prev/next button labels & visibility
        const prevBtn = document.getElementById('guidePrevBtn');
        const nextBtn = document.getElementById('guideNextBtn');
        const prevLabel = document.getElementById('guidePrevLabel');
        const nextLabel = document.getElementById('guideNextLabel');

        if (prevBtn) {
            prevBtn.disabled = currentIdx === 0;
            prevBtn.style.opacity = currentIdx === 0 ? '0.4' : '1';
            prevBtn.style.pointerEvents = currentIdx === 0 ? 'none' : 'auto';
            if (prevLabel && currentIdx > 0) {
                prevLabel.textContent = `← ${tabs[currentIdx - 1].name}`;
            } else if (prevLabel) {
                prevLabel.textContent = 'Previous Section';
            }
        }

        if (nextBtn) {
            nextBtn.disabled = currentIdx === tabs.length - 1;
            nextBtn.style.opacity = currentIdx === tabs.length - 1 ? '0.4' : '1';
            nextBtn.style.pointerEvents = currentIdx === tabs.length - 1 ? 'none' : 'auto';
            if (nextLabel && currentIdx < tabs.length - 1) {
                nextLabel.textContent = `${tabs[currentIdx + 1].name} →`;
            } else if (nextLabel) {
                nextLabel.textContent = 'Next Section';
            }
        }

        if (scroll) {
            const guideCard = document.querySelector('.guide-card');
            if (guideCard) {
                guideCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Attach click to nav buttons
    document.querySelectorAll('.guide-nav-btn').forEach((btn, idx) => {
        btn.addEventListener('click', () => switchGuideTab(idx, false));
    });

    // Attach click to prev/next buttons
    document.getElementById('guidePrevBtn')?.addEventListener('click', () => {
        if (currentIdx > 0) switchGuideTab(currentIdx - 1, true);
    });

    document.getElementById('guideNextBtn')?.addEventListener('click', () => {
        if (currentIdx < tabs.length - 1) switchGuideTab(currentIdx + 1, true);
    });

    // Attach click to dots
    document.querySelectorAll('.guide-dot').forEach((dot, idx) => {
        dot.addEventListener('click', () => switchGuideTab(idx, false));
    });

    // Initialize state
    switchGuideTab(0, false);
}

function setupBatchUpload() {
    document.addEventListener('change', (e) => {
        if (e.target && e.target.id === 'batchFileInput') {
            const files = Array.from(e.target.files);
            const container = document.getElementById('batchTableResult');
            if (!container || files.length === 0) return;

            container.innerHTML = `
                <div class="batch-table-container">
                    <table class="batch-table">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Size</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="batchTableBody"></tbody>
                    </table>
                </div>
            `;

            const tbody = document.getElementById('batchTableBody');
            files.forEach((file, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${sanitizeHTML(file.name)}</strong></td>
                    <td>${formatFileSize(file.size)}</td>
                    <td><code>${file.type || 'unknown'}</code></td>
                    <td id="batchStatus-${idx}">Processing...</td>
                    <td id="batchAction-${idx}">-</td>
                `;
                tbody.appendChild(tr);

                const reader = new FileReader();
                reader.onload = () => {
                    const b64 = reader.result;
                    const statusCell = document.getElementById(`batchStatus-${idx}`);
                    const actionCell = document.getElementById(`batchAction-${idx}`);
                    if (statusCell) statusCell.innerHTML = '<span style="color: var(--primary); font-weight: bold;">Ready</span>';
                    if (actionCell) {
                        actionCell.innerHTML = `
                            <button class="btn btn-sm btn-primary" onclick="copyToClipboard('${b64}')">Copy</button>
                        `;
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    });
}


// ============================================
// Google-Grade Omni-Studio Architecture
// ============================================

const OMNI_STATE = {
    detectedType: 'plaintext',
    activeCodeLang: 'javascript',
    liveEnabled: true,
    telemetry: {
        throughput: 0,
        ops: 0,
        lastDuration: 0
    },
    settings: {
        lineWrap: 'none',
        padding: 'standard',
        charset: 'utf-8'
    },
    pinnedTools: ['image-to-base64', 'base64-to-image', 'jwt-decoder', 'url-safe-encode']
};

/**
 * Universal Input Format Detector
 */
function detectInputFormat(str) {
    if (!str || !str.trim()) return { type: 'plaintext', label: 'Plain Text' };
    const s = str.trim();

    if (/^data:[a-zA-Z0-9\/+\-\.]+;base64,/i.test(s)) {
        return { type: 'data-uri', label: 'Data URI' };
    }
    if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(s)) {
        return { type: 'jwt', label: 'JWT Token' };
    }
    if (/^[01\s]{8,}$/.test(s) && !/[2-9a-zA-Z]/.test(s)) {
        return { type: 'binary', label: '8-Bit Binary' };
    }
    const cleanHex = s.replace(/\s+/g, '');
    if (/^[0-9a-fA-F]+$/.test(cleanHex) && cleanHex.length >= 4 && cleanHex.length % 2 === 0 && !/[g-zG-Z]/.test(s)) {
        return { type: 'hex', label: 'Hexadecimal' };
    }
    if (isValidBase64(s)) {
        if (/[-_]/.test(s)) return { type: 'base64-url', label: 'Base64 (URL-Safe)' };
        return { type: 'base64', label: 'Base64 (Standard)' };
    }
    return { type: 'plaintext', label: 'Plain Text (UTF-8)' };
}

/**
 * Update Session Telemetry HUD
 */
function recordTelemetry(bytesAdded, durationMs) {
    OMNI_STATE.telemetry.throughput += bytesAdded;
    OMNI_STATE.telemetry.ops += 1;
    OMNI_STATE.telemetry.lastDuration = durationMs;

    const elThroughput = document.getElementById('hudThroughput');
    const elOps = document.getElementById('hudOpsCount');
    const elLatency = document.getElementById('hudLatency');

    if (elThroughput) elThroughput.textContent = formatFileSize(OMNI_STATE.telemetry.throughput);
    if (elOps) elOps.textContent = `${OMNI_STATE.telemetry.ops} ops`;
    if (elLatency) elLatency.textContent = `${durationMs < 1 ? '< 1' : durationMs.toFixed(1)} ms`;
}

/**
 * Generate Multi-Language Code Snippets
 */
function generateCodeSnippet(lang, data, isDecode) {
    const cleanData = (data || '').replace(/'/g, "\\'");
    const previewData = cleanData.length > 80 ? cleanData.substring(0, 80) + '...' : cleanData;

    switch (lang) {
        case 'javascript':
            return isDecode
                ? `// Decode Base64 in JavaScript / TypeScript\nconst b64 = '${previewData}';\nconst decoded = decodeURIComponent(escape(atob(b64)));\nconsole.log(decoded);`
                : `// Encode to Base64 in JavaScript / TypeScript\nconst text = '${previewData}';\nconst b64 = btoa(unescape(encodeURIComponent(text)));\nconsole.log(b64);`;

        case 'python':
            return isDecode
                ? `# Decode Base64 in Python\nimport base64\n\nb64 = '${previewData}'\ndecoded = base64.b64decode(b64).decode('utf-8')\nprint(decoded)`
                : `# Encode to Base64 in Python\nimport base64\n\ntext = '${previewData}'\nb64 = base64.b64encode(text.encode('utf-8')).decode('ascii')\nprint(b64)`;

        case 'go':
            return isDecode
                ? `// Decode Base64 in Go\npackage main\nimport (\n    "encoding/base64"\n    "fmt"\n)\nfunc main() {\n    raw, _ := base64.StdEncoding.DecodeString("${previewData}")\n    fmt.Println(string(raw))\n}`
                : `// Encode to Base64 in Go\npackage main\nimport (\n    "encoding/base64"\n    "fmt"\n)\nfunc main() {\n    encoded := base64.StdEncoding.EncodeToString([]byte("${previewData}"))\n    fmt.Println(encoded)\n}`;

        case 'rust':
            return isDecode
                ? `// Decode Base64 in Rust\nuse base64::{Engine as _, engine::general_purpose::STANDARD};\n\nfn main() {\n    let bytes = STANDARD.decode("${previewData}").unwrap();\n    println!("{}", String::from_utf8(bytes).unwrap());\n}`
                : `// Encode to Base64 in Rust\nuse base64::{Engine as _, engine::general_purpose::STANDARD};\n\nfn main() {\n    let encoded = STANDARD.encode("${previewData}");\n    println!("{}", encoded);\n}`;

        case 'php':
            return isDecode
                ? `<?php\n$b64 = '${previewData}';\n$decoded = base64_decode($b64);\necho $decoded;\n?>`
                : `<?php\n$text = '${previewData}';\n$b64 = base64_encode($text);\necho $b64;\n?>`;

        case 'bash':
            return isDecode
                ? `# Decode in Bash / Terminal\necho -n "${previewData}" | base64 --decode`
                : `# Encode in Bash / Terminal\necho -n "${previewData}" | base64`;

        case 'html':
            return cleanData.startsWith('data:image/')
                ? `<!-- Inlined HTML Image Tag -->\n<img src="${previewData}" alt="Base64 Inlined Asset" width="auto" height="auto" />\n\n/* CSS Background Declaration */\n.element {\n    background-image: url('${previewData}');\n}`
                : `<!-- HTML Download Link -->\n<a href="data:application/octet-stream;base64,${previewData}" download="asset.bin">Download Decoded Asset</a>`;

        default:
            return `// Code snippet for ${lang}`;
    }
}

/**
 * Setup Omni-Workbench Handlers
 */
function setupOmniWorkbench() {
    const omniInput = document.getElementById('omniInput');
    const omniOutput = document.getElementById('omniOutput');
    const omniDetectedBadge = document.getElementById('omniDetectedBadge');
    const omniDetectedType = document.getElementById('omniDetectedType');
    const omniInputStats = document.getElementById('omniInputStats');
    const omniOutputStats = document.getElementById('omniOutputStats');
    const omniInflationStats = document.getElementById('omniInflationStats');
    const omniCodeSnippet = document.getElementById('omniCodeSnippet');
    const omniPreviewContainer = document.getElementById('omniPreviewContainer');
    const omniSmartActionBtn = document.getElementById('omniSmartActionBtn');
    const omniSmartActionText = document.getElementById('omniSmartActionText');
    const omniSampleSelect = document.getElementById('omniSampleSelect');

    if (!omniInput || !omniOutput) return;

    // Load persisted settings
    try {
        const savedSettings = localStorage.getItem('b64-settings');
        if (savedSettings) {
            Object.assign(OMNI_STATE.settings, JSON.parse(savedSettings));
        }
    } catch(e) {}

    // Load pinned tools
    try {
        const savedPinned = localStorage.getItem('b64-pinned-tools');
        if (savedPinned) {
            OMNI_STATE.pinnedTools = JSON.parse(savedPinned);
        }
    } catch(e) {}

    renderPinnedTools();

    function executeOmniConvert(targetAction) {
        const t0 = performance.now();
        const val = omniInput.value;
        if (!val || !val.trim()) {
            omniOutput.value = '';
            if (omniPreviewContainer) {
                omniPreviewContainer.style.display = 'none';
                omniPreviewContainer.innerHTML = '';
            }
            updateOmniStats();
            return;
        }

        const format = detectInputFormat(val);
        OMNI_STATE.detectedType = format.type;

        if (omniDetectedBadge) {
            omniDetectedBadge.textContent = format.label;
            omniDetectedBadge.className = `format-badge ${format.type}`;
        }
        if (omniDetectedType) {
            omniDetectedType.textContent = `Detected: ${format.label}`;
        }

        // Determine action if auto
        let action = targetAction;
        if (!action || action === 'auto') {
            if (format.type === 'base64' || format.type === 'base64-url' || format.type === 'data-uri') {
                action = 'decode';
            } else if (format.type === 'jwt') {
                action = 'jwt';
            } else if (format.type === 'hex') {
                action = 'hex-to-b64';
            } else if (format.type === 'binary') {
                action = 'bin-to-b64';
            } else {
                action = 'encode';
            }
        }

        let res = '';
        let isDec = false;

        try {
            if (action === 'encode') {
                res = encodeBase64(val);
                // Apply line wrapping setting
                if (OMNI_STATE.settings.lineWrap === '64') {
                    res = res.replace(/(.{64})/g, '$1\n');
                } else if (OMNI_STATE.settings.lineWrap === '76') {
                    res = res.replace(/(.{76})/g, '$1\r\n');
                }
                // Apply padding setting
                if (OMNI_STATE.settings.padding === 'unpadded') {
                    res = res.replace(/=+$/, '');
                }
                isDec = false;
            } else if (action === 'decode') {
                let clean = val.trim().replace(/^data:[^;]+;base64,/, '');
                res = decodeBase64(clean);
                isDec = true;
            } else if (action === 'url-safe-encode') {
                res = encodeUrlSafeBase64(val);
                isDec = false;
            } else if (action === 'url-safe-decode') {
                res = decodeUrlSafeBase64(val.trim());
                isDec = true;
            } else if (action === 'to-hex') {
                const b64 = format.type === 'base64' ? val.trim() : encodeBase64(val);
                res = base64ToHex(b64);
                isDec = false;
            } else if (action === 'hex-to-b64') {
                res = hexToBase64(val.trim());
                isDec = true;
            } else if (action === 'to-binary') {
                const b64 = format.type === 'base64' ? val.trim() : encodeBase64(val);
                const decoded = atob(b64);
                let bin = [];
                for (let i = 0; i < decoded.length; i++) {
                    bin.push(decoded.charCodeAt(i).toString(2).padStart(8, '0'));
                }
                res = bin.join(' ');
                isDec = false;
            } else if (action === 'bin-to-b64') {
                const cleanBin = val.replace(/[^01]/g, '');
                let bytes = [];
                for (let i = 0; i < cleanBin.length; i += 8) {
                    bytes.push(parseInt(cleanBin.substring(i, i + 8), 2));
                }
                res = btoa(String.fromCharCode.apply(null, bytes));
                isDec = false;
            } else if (action === 'sha256') {
                const enc = new TextEncoder();
                crypto.subtle.digest('SHA-256', enc.encode(val)).then(buf => {
                    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
                    omniOutput.value = hex;
                    updateOmniStats();
                });
                return;
            } else if (action === 'jwt') {
                const parts = val.trim().split('.');
                if (parts.length === 3) {
                    try {
                        const h = JSON.parse(decodeBase64(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
                        const p = JSON.parse(decodeBase64(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
                        res = JSON.stringify({ Header: h, Payload: p }, null, 2);
                        
                        // Render visual JWT view
                        if (omniPreviewContainer) {
                            const expTime = p.exp ? new Date(p.exp * 1000).toLocaleString() : 'Never';
                            const isExpired = p.exp ? (Date.now() > p.exp * 1000) : false;
                            omniPreviewContainer.style.display = 'block';
                            omniPreviewContainer.innerHTML = `
                                <div class="jwt-viewer-container">
                                    <div class="jwt-token-strip">
                                        <span class="jwt-part-header">${sanitizeHTML(parts[0])}</span>.<span class="jwt-part-payload">${sanitizeHTML(parts[1])}</span>.<span class="jwt-part-sig">${sanitizeHTML(parts[2])}</span>
                                    </div>
                                    <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
                                        <span class="jwt-status-badge ${isExpired ? 'expired' : 'active'}">
                                            ${isExpired ? 'EXPIRED' : 'ACTIVE TOKEN'}
                                        </span>
                                        <span style="font-size: var(--font-size-xs); color: var(--text-secondary);">Expires: ${expTime}</span>
                                    </div>
                                </div>
                            `;
                        }
                    } catch(e) {
                        res = 'Invalid JWT payload';
                    }
                }
            }

            omniOutput.value = res;

            // Visual media preview in omni output if Data URI
            if (format.type === 'data-uri' || val.trim().startsWith('data:image/')) {
                if (omniPreviewContainer) {
                    omniPreviewContainer.style.display = 'block';
                    omniPreviewContainer.innerHTML = `
                        <div class="media-preview-wrapper">
                            <img src="${val.trim()}" alt="Visual Preview" style="max-height: 200px; max-width: 100%; border-radius: 8px;">
                        </div>
                    `;
                }
            } else if (action !== 'jwt' && omniPreviewContainer) {
                omniPreviewContainer.style.display = 'none';
            }

            const t1 = performance.now();
            recordTelemetry(new Blob([val]).size, t1 - t0);
            updateOmniStats();

            // Update code snippet
            if (omniCodeSnippet) {
                omniCodeSnippet.textContent = generateCodeSnippet(OMNI_STATE.activeCodeLang, res || val, isDec);
            }

            // Update smart action text
            if (omniSmartActionText) {
                omniSmartActionText.textContent = isDec ? 'Encode' : 'Decode';
            }

        } catch (err) {
            omniOutput.value = `Error: ${err.message}`;
        }
    }

    function updateOmniStats() {
        const inBytes = new Blob([omniInput.value]).size;
        const outBytes = new Blob([omniOutput.value]).size;

        if (omniInputStats) {
            omniInputStats.textContent = `${omniInput.value.length.toLocaleString()} chars | ${formatFileSize(inBytes)}`;
        }
        if (omniOutputStats) {
            omniOutputStats.textContent = `${omniOutput.value.length.toLocaleString()} chars | ${formatFileSize(outBytes)}`;
        }
        if (omniInflationStats && inBytes > 0 && outBytes > 0) {
            const ratio = (outBytes / inBytes).toFixed(2);
            const deltaPercent = (((outBytes - inBytes) / inBytes) * 100).toFixed(1);
            omniInflationStats.textContent = `Ratio: ${ratio}x (${deltaPercent >= 0 ? '+' : ''}${deltaPercent}%)`;
        }
    }

    // Input events
    omniInput.addEventListener('input', () => {
        if (OMNI_STATE.liveEnabled) {
            executeOmniConvert('auto');
        } else {
            const format = detectInputFormat(omniInput.value);
            if (omniDetectedBadge) {
                omniDetectedBadge.textContent = format.label;
                omniDetectedBadge.className = `format-badge ${format.type}`;
            }
            updateOmniStats();
        }
    });

    // Sample Selector
    if (omniSampleSelect) {
        omniSampleSelect.addEventListener('change', () => {
            const val = omniSampleSelect.value;
            const samples = {
                text: "Sphinx of black quartz, judge my vow! 🚀 Engineering by Oathan Rex.",
                base64: "U3BoaW54IG9mIGJsYWNrIHF1YXJ0eiwganVkZ2UgbXkgdm93ISDwn5mpIEVuZ2luZWVyaW5nIGJ5IE9hdGhhbiBSZXgu",
                jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik9hdGhhbiBSZXgiLCJyb2xlIjoiQXJjaGl0ZWN0IiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4z7y6_P4qVf66Hl3pYj6iU8XWwL8Y4z0_QW5iX_Z5bE",
                'data-uri': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                hex: "4f 61 74 68 61 6e 20 52 65 78 20 53 74 75 64 69 6f",
                binary: "01001111 01100001 01110100 01101000 01100001 01101110"
            };
            if (samples[val]) {
                omniInput.value = samples[val];
                executeOmniConvert('auto');
            }
            omniSampleSelect.selectedIndex = 0;
        });
    }

    // Button Click Handlers
    document.getElementById('omniSmartActionBtn')?.addEventListener('click', () => executeOmniConvert('auto'));
    document.getElementById('omniEncodeBtn')?.addEventListener('click', () => executeOmniConvert('encode'));
    document.getElementById('omniDecodeBtn')?.addEventListener('click', () => executeOmniConvert('decode'));
    document.getElementById('omniUrlSafeEncodeBtn')?.addEventListener('click', () => executeOmniConvert('url-safe-encode'));
    document.getElementById('omniToHexBtn')?.addEventListener('click', () => executeOmniConvert('to-hex'));
    document.getElementById('omniToBinaryBtn')?.addEventListener('click', () => executeOmniConvert('to-binary'));
    document.getElementById('omniSha256Btn')?.addEventListener('click', () => executeOmniConvert('sha256'));

    document.getElementById('omniLiveToggle')?.addEventListener('change', (e) => {
        OMNI_STATE.liveEnabled = e.target.checked;
        if (OMNI_STATE.liveEnabled) executeOmniConvert('auto');
    });

    document.getElementById('omniClearBtn')?.addEventListener('click', () => {
        omniInput.value = '';
        omniOutput.value = '';
        if (omniPreviewContainer) {
            omniPreviewContainer.style.display = 'none';
            omniPreviewContainer.innerHTML = '';
        }
        updateOmniStats();
    });

    document.getElementById('omniCopyBtn')?.addEventListener('click', () => {
        if (omniOutput.value) {
            copyToClipboard(omniOutput.value);
            showToast('Result copied to clipboard!', 'success');
        } else {
            showToast('Nothing to copy', 'warning');
        }
    });

    document.getElementById('omniDownloadBtn')?.addEventListener('click', () => {
        if (omniOutput.value) {
            downloadFile(omniOutput.value, 'base64-result.txt', 'text/plain');
        }
    });

    document.getElementById('omniSwapBtn')?.addEventListener('click', () => {
        const temp = omniInput.value;
        omniInput.value = omniOutput.value;
        omniOutput.value = temp;
        executeOmniConvert('auto');
    });

    document.getElementById('omniPasteBtn')?.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            omniInput.value = text;
            executeOmniConvert('auto');
        } catch(e) {
            showToast('Please use Ctrl+V to paste', 'info');
        }
    });

    // File Upload in Omni
    const omniUploadBtn = document.getElementById('omniUploadBtn');
    const omniFileInput = document.getElementById('omniFileInput');
    if (omniUploadBtn && omniFileInput) {
        omniUploadBtn.addEventListener('click', () => omniFileInput.click());
        omniFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    omniInput.value = reader.result;
                    executeOmniConvert('auto');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Code Snippet Tabs
    document.querySelectorAll('.code-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            OMNI_STATE.activeCodeLang = btn.dataset.codeLang;
            if (omniCodeSnippet) {
                omniCodeSnippet.textContent = generateCodeSnippet(OMNI_STATE.activeCodeLang, omniOutput.value || omniInput.value, false);
            }
        });
    });

    document.getElementById('omniCopyCodeBtn')?.addEventListener('click', () => {
        if (omniCodeSnippet?.textContent) {
            copyToClipboard(omniCodeSnippet.textContent);
            showToast('Code snippet copied!', 'success');
        }
    });
}

/**
 * Render Pinned Tools Section
 */
function renderPinnedTools() {
    const container = document.getElementById('pinnedGrid');
    if (!container) return;

    const pinnedList = TOOLS.filter(t => OMNI_STATE.pinnedTools.includes(t.id));
    if (pinnedList.length === 0) {
        container.innerHTML = '<p style="font-size: var(--font-size-xs); color: var(--text-tertiary); grid-column: 1 / -1;">No tools pinned yet. Click the star on any tool card below to pin it here.</p>';
        return;
    }

    container.innerHTML = pinnedList.map(t => `
        <div class="pinned-card" onclick="openTool('${t.id}')">
            <div class="pinned-card-info">
                <div class="tool-icon" style="width: 32px; height: 32px;">
                    ${ICONS[t.icon] || ICONS.file}
                </div>
                <div>
                    <h4 style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-primary);">${sanitizeHTML(t.name)}</h4>
                    <span style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">${t.category}</span>
                </div>
            </div>
            <button class="tool-star-btn starred" onclick="event.stopPropagation(); togglePinTool('${t.id}')" title="Unpin tool">★</button>
        </div>
    `).join('');
}

function togglePinTool(toolId) {
    if (OMNI_STATE.pinnedTools.includes(toolId)) {
        OMNI_STATE.pinnedTools = OMNI_STATE.pinnedTools.filter(id => id !== toolId);
    } else {
        OMNI_STATE.pinnedTools.push(toolId);
    }
    localStorage.setItem('b64-pinned-tools', JSON.stringify(OMNI_STATE.pinnedTools));
    renderPinnedTools();
    renderToolsGrid(state.currentCategory || 'all');
    showToast('Updated pinned tools', 'info');
}

/**
 * Preferences Modal Handlers
 */
function setupSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const toggle = document.getElementById('settingsToggle');
    const closeBtn = document.getElementById('closeSettingsModal');
    const saveBtn = document.getElementById('saveSettingsBtn');
    const wrapSel = document.getElementById('settingLineWrap');
    const padSel = document.getElementById('settingPadding');
    const charSel = document.getElementById('settingCharset');

    if (!modal || !toggle) return;

    toggle.addEventListener('click', () => {
        if (wrapSel) wrapSel.value = OMNI_STATE.settings.lineWrap;
        if (padSel) padSel.value = OMNI_STATE.settings.padding;
        if (charSel) charSel.value = OMNI_STATE.settings.charset;
        modal.hidden = false;
    });

    closeBtn?.addEventListener('click', () => modal.hidden = true);
    modal.querySelector('.modal-backdrop')?.addEventListener('click', () => modal.hidden = true);

    saveBtn?.addEventListener('click', () => {
        if (wrapSel) OMNI_STATE.settings.lineWrap = wrapSel.value;
        if (padSel) OMNI_STATE.settings.padding = padSel.value;
        if (charSel) OMNI_STATE.settings.charset = charSel.value;
        localStorage.setItem('b64-settings', JSON.stringify(OMNI_STATE.settings));
        modal.hidden = true;
        showToast('Preferences saved!', 'success');
    });
}
