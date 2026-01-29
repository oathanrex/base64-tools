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

// Tool definitions
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
        id: 'batch-file-encoder',
        name: 'Batch File Encoder',
        description: 'Encode multiple files at once',
        category: 'file',
        icon: 'files'
    },

    // Image Tools
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

    // Audio/Video Tools
    {
        id: 'audio-to-base64',
        name: 'Audio to Base64',
        description: 'Convert audio files (MP3, WAV) to Base64',
        category: 'audio',
        icon: 'music'
    },
    {
        id: 'video-to-base64',
        name: 'Video to Base64',
        description: 'Convert video files to Base64',
        category: 'audio',
        icon: 'video'
    },

    // Document Tools
    {
        id: 'json-to-base64',
        name: 'JSON to Base64',
        description: 'Encode JSON data to Base64',
        category: 'document',
        icon: 'braces'
    },
    {
        id: 'base64-to-json',
        name: 'Base64 to JSON',
        description: 'Decode Base64 to formatted JSON',
        category: 'document',
        icon: 'braces'
    },
    {
        id: 'xml-to-base64',
        name: 'XML to Base64',
        description: 'Encode XML data to Base64',
        category: 'document',
        icon: 'code'
    },

    // Developer Tools
    {
        id: 'data-uri-generator',
        name: 'Data URI Generator',
        description: 'Generate complete data URIs with MIME type',
        category: 'developer',
        icon: 'link'
    },
    {
        id: 'mime-detector',
        name: 'MIME Type Detector',
        description: 'Auto-detect MIME type from Base64',
        category: 'developer',
        icon: 'search'
    },
    {
        id: 'base64-validator',
        name: 'Base64 Validator',
        description: 'Check if string is valid Base64',
        category: 'developer',
        icon: 'check-circle'
    },
    {
        id: 'length-calculator',
        name: 'Size Calculator',
        description: 'Calculate encoded/decoded sizes',
        category: 'developer',
        icon: 'calculator'
    },

    // Security Tools
    {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        description: 'Decode JWT token parts (Header, Payload)',
        category: 'security',
        icon: 'key'
    },
    {
        id: 'basic-auth-generator',
        name: 'Basic Auth Generator',
        description: 'Create HTTP Basic Auth headers',
        category: 'security',
        icon: 'lock'
    },

    // Utility Tools
    {
        id: 'bulk-encoder',
        name: 'Bulk Encoder',
        description: 'Encode multiple strings at once',
        category: 'utility',
        icon: 'layers'
    },
    {
        id: 'bulk-decoder',
        name: 'Bulk Decoder',
        description: 'Decode multiple Base64 strings at once',
        category: 'utility',
        icon: 'layers'
    },
    {
        id: 'base64-to-hex',
        name: 'Base64 to Hex',
        description: 'Convert Base64 to Hexadecimal',
        category: 'utility',
        icon: 'hash'
    },
    {
        id: 'hex-to-base64',
        name: 'Hex to Base64',
        description: 'Convert Hexadecimal to Base64',
        category: 'utility',
        icon: 'hash'
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
    theme: 'light',
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
        state.theme = 'light';
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
    const themeColor = state.theme === 'dark' ? '#1a1a2e' : '#ffffff';
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
                    <h3 class="tool-name">${sanitizeHTML(tool.name)}</h3>
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
        'image-to-base64': createImageEncoderTemplate(),
        'base64-to-image': createImageDecoderTemplate(),
        'image-to-css': createImageToCssTemplate(),
        'image-to-html': createImageToHtmlTemplate(),
        'json-to-base64': createJsonEncoderTemplate(),
        'base64-to-json': createJsonDecoderTemplate(),
        'base64-validator': createValidatorTemplate(),
        'length-calculator': createCalculatorTemplate(),
        'jwt-decoder': createJwtDecoderTemplate(),
        'basic-auth-generator': createBasicAuthTemplate(),
        'base64-to-hex': createHexConverterTemplate('base64-to-hex'),
        'hex-to-base64': createHexConverterTemplate('hex-to-base64'),
        'bulk-encoder': createBulkTemplate('encode'),
        'bulk-decoder': createBulkTemplate('decode')
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
                    <textarea id="inputText" placeholder="${isEncode ? 'Enter text to encode to Base64...' : 'Enter Base64 string to decode...'}" aria-label="${isEncode ? 'Text input' : 'Base64 input'}"></textarea>
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
                    <textarea id="outputText" placeholder="${isEncode ? 'Base64 encoded result will appear here...' : 'Decoded text will appear here...'}" readonly aria-label="${isEncode ? 'Base64 output' : 'Decoded text output'}"></textarea>
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
                    <textarea id="inputText" placeholder="${isEncode ? 'Enter text to encode...' : 'Enter URL-safe Base64 string...'}"></textarea>
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
                    <textarea id="outputText" placeholder="Result will appear here..." readonly></textarea>
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
                    <textarea id="inputText" placeholder="Start typing... conversion happens in real-time"></textarea>
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
                    <textarea id="outputText" placeholder="Output will appear here as you type..." readonly></textarea>
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
            <input type="file" id="fileInput" class="file-upload-input" aria-hidden="true">
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
                <textarea id="outputText" placeholder="Base64 encoded file will appear here..." readonly></textarea>
            </div>
            <div class="panel-footer">
                <span id="outputStats">0 characters | 0 bytes</span>
            </div>
        </div>
        <div class="options-panel" style="margin-top: var(--spacing-4);">
            <div class="options-title">Output Options</div>
            <div class="options-grid">
                <div class="option-item">
                    <input type="checkbox" id="includeDataUri" checked>
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
                <textarea id="inputText" placeholder="Paste Base64 string here (with or without data URI prefix)..."></textarea>
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
                    <input type="text" id="fileName" value="download" placeholder="filename">
                </div>
                <div class="option-item">
                    <label for="mimeType">MIME Type:</label>
                    <select id="mimeType">
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
            <input type="file" id="fileInput" class="file-upload-input" accept="image/*">
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
                <textarea id="outputText" placeholder="Base64 encoded image will appear here..." readonly></textarea>
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
                <textarea id="inputText" placeholder="Paste Base64 image string here..."></textarea>
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
            <input type="file" id="fileInput" class="file-upload-input" accept="image/*">
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
                <textarea id="outputText" placeholder="CSS background-image code will appear here..." readonly></textarea>
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
            <input type="file" id="fileInput" class="file-upload-input" accept="image/*">
        </div>
        <div id="imagePreviewContainer"></div>
        <div class="options-panel" style="margin-top: var(--spacing-4);">
            <div class="options-title">HTML Options</div>
            <div class="options-grid">
                <div class="option-item">
                    <label for="imgAlt">Alt Text:</label>
                    <input type="text" id="imgAlt" value="Image" placeholder="Image description">
                </div>
                <div class="option-item">
                    <label for="imgClass">CSS Class:</label>
                    <input type="text" id="imgClass" value="" placeholder="optional">
                </div>
                <div class="option-item">
                    <label for="imgId">ID:</label>
                    <input type="text" id="imgId" value="" placeholder="optional">
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
                <textarea id="outputText" placeholder="HTML img tag will appear here..." readonly></textarea>
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
                    <textarea id="inputText" placeholder='{"key": "value", "array": [1, 2, 3]}'></textarea>
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
                    <textarea id="outputText" placeholder="Base64 encoded JSON will appear here..." readonly></textarea>
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
                    <textarea id="inputText" placeholder="Paste Base64 encoded JSON here..."></textarea>
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
                    <textarea id="outputText" placeholder="Decoded and formatted JSON will appear here..." readonly></textarea>
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
                <textarea id="inputText" placeholder="Paste Base64 string to validate..."></textarea>
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
                    <textarea id="inputText" placeholder="Enter text or Base64 to calculate sizes..."></textarea>
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
                <textarea id="inputText" placeholder="Paste your JWT token here (eyJ...)"></textarea>
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
                        <input type="text" id="authUsername" placeholder="Enter username" style="width: 100%; padding: var(--spacing-3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-primary); color: var(--text-primary); font-size: var(--font-size-base);">
                    </div>
                    <div>
                        <label for="authPassword" style="display: block; margin-bottom: var(--spacing-1); font-size: var(--font-size-sm); color: var(--text-secondary);">Password</label>
                        <input type="password" id="authPassword" placeholder="Enter password" style="width: 100%; padding: var(--spacing-3); border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-primary); color: var(--text-primary); font-size: var(--font-size-base);">
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
                <textarea id="outputText" placeholder="Authorization header will appear here..." readonly></textarea>
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
                    <textarea id="inputText" placeholder="${isBase64ToHex ? 'Enter Base64 string...' : 'Enter hexadecimal string (e.g., 48656C6C6F)...'}"></textarea>
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
                    <textarea id="outputText" placeholder="Result will appear here..." readonly></textarea>
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
                    <textarea id="inputText" placeholder="Enter multiple items, one per line..."></textarea>
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
                    <textarea id="outputText" placeholder="Results will appear here, one per line..." readonly></textarea>
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
                    <textarea id="inputText" placeholder="Enter input..."></textarea>
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
                    <textarea id="outputText" placeholder="Output will appear here..." readonly></textarea>
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
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if no saved preference
        if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
            state.theme = e.matches ? 'dark' : 'light';
            applyTheme();
        }
    });

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
    if ('serviceWorker' in navigator) {
        try {
            // Only register if sw.js exists
            const response = await fetch('sw.js', { method: 'HEAD' });
            if (response.ok) {
                await navigator.serviceWorker.register('sw.js');
                console.log('Service Worker registered');
            }
        } catch (e) {
            // Service worker not available, skip
        }
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

        // Load saved preferences
        loadTheme();
        loadHistory();

        // Render initial tools grid
        renderToolsGrid('all');

        // Setup event listeners
        setupEventListeners();
        setupKeyboardShortcuts();
        setupErrorHandling();

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