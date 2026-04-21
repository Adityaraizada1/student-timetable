/* ═══════════════════════════════════════════════════════════
   WEEKLY TIMETABLE VIEWER — MAIN SCRIPT
   Pure vanilla JS • Modular • Student-friendly
   ═══════════════════════════════════════════════════════════ */

// ────────────────────────────────────────────────
// 1. TIMETABLE DATA
//    Hardcoded sample data — easy to modify
// ────────────────────────────────────────────────

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TIME_SLOTS = [
    '8:00 - 8:50',
    '9:00 - 9:50',
    '10:00 - 10:50',
    '11:00 - 11:50',
    '12:00 - 12:50',
    '1:00 - 1:50',
    '2:00 - 2:50',
    '3:00 - 3:50',
];

/**
 * Subject color palette — soft, student-friendly pastels.
 * Each subject maps to { bg, border, text } for light readability.
 */
const SUBJECT_COLORS = {
    'Mathematics':       { bg: '#eef0ff', border: '#6366f1', text: '#4338ca' },
    'Physics':           { bg: '#ecfdf5', border: '#10b981', text: '#047857' },
    'Chemistry':         { bg: '#fff7ed', border: '#f97316', text: '#c2410c' },
    'English':           { bg: '#fdf2f8', border: '#ec4899', text: '#be185d' },
    'Computer Science':  { bg: '#f0f9ff', border: '#0ea5e9', text: '#0369a1' },
    'History':           { bg: '#fefce8', border: '#eab308', text: '#a16207' },
    'Biology':           { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
    'Art':               { bg: '#faf5ff', border: '#a855f7', text: '#7e22ce' },
    'Physical Education':{ bg: '#fff1f2', border: '#f43f5e', text: '#be123c' },
    'Library':           { bg: '#f5f3ff', border: '#8b5cf6', text: '#6d28d9' },
    'Lunch Break':       { bg: '#f0fdfa', border: '#14b8a6', text: '#0f766e' },
};

/**
 * Timetable data as a nested object:
 *   timetableData[day][timeSlotIndex] = { subject, teacher, room } | null
 */
let timetableData = {
    Monday: [
        { subject: 'Mathematics',      teacher: 'Dr. Sharma',     room: 'A-101' },
        { subject: 'Physics',          teacher: 'Prof. Verma',    room: 'B-203' },
        { subject: 'English',          teacher: 'Ms. Kapoor',     room: 'C-305' },
        { subject: 'Chemistry',        teacher: 'Dr. Patel',      room: 'Lab-1' },
        { subject: 'Lunch Break',      teacher: '',               room: 'Cafeteria' },
        { subject: 'Computer Science', teacher: 'Mr. Iyer',       room: 'Lab-3' },
        { subject: 'History',          teacher: 'Dr. Singh',      room: 'D-102' },
        { subject: 'Art',              teacher: 'Ms. Reddy',      room: 'Art Room' },
    ],
    Tuesday: [
        { subject: 'Biology',          teacher: 'Dr. Nair',       room: 'Lab-2' },
        { subject: 'Mathematics',      teacher: 'Dr. Sharma',     room: 'A-101' },
        { subject: 'Physics',          teacher: 'Prof. Verma',    room: 'B-203' },
        { subject: 'English',          teacher: 'Ms. Kapoor',     room: 'C-305' },
        { subject: 'Lunch Break',      teacher: '',               room: 'Cafeteria' },
        { subject: 'History',          teacher: 'Dr. Singh',      room: 'D-102' },
        { subject: 'Computer Science', teacher: 'Mr. Iyer',       room: 'Lab-3' },
        { subject: 'Physical Education', teacher: 'Coach Das',    room: 'Ground' },
    ],
    Wednesday: [
        { subject: 'Chemistry',        teacher: 'Dr. Patel',      room: 'Lab-1' },
        { subject: 'English',          teacher: 'Ms. Kapoor',     room: 'C-305' },
        { subject: 'Mathematics',      teacher: 'Dr. Sharma',     room: 'A-101' },
        { subject: 'Computer Science', teacher: 'Mr. Iyer',       room: 'Lab-3' },
        { subject: 'Lunch Break',      teacher: '',               room: 'Cafeteria' },
        { subject: 'Physics',          teacher: 'Prof. Verma',    room: 'B-203' },
        { subject: 'Art',              teacher: 'Ms. Reddy',      room: 'Art Room' },
        { subject: 'Library',          teacher: 'Ms. Joshi',      room: 'Library' },
    ],
    Thursday: [
        { subject: 'English',          teacher: 'Ms. Kapoor',     room: 'C-305' },
        { subject: 'Biology',          teacher: 'Dr. Nair',       room: 'Lab-2' },
        { subject: 'Chemistry',        teacher: 'Dr. Patel',      room: 'Lab-1' },
        { subject: 'Mathematics',      teacher: 'Dr. Sharma',     room: 'A-101' },
        { subject: 'Lunch Break',      teacher: '',               room: 'Cafeteria' },
        { subject: 'History',          teacher: 'Dr. Singh',      room: 'D-102' },
        { subject: 'Physical Education', teacher: 'Coach Das',    room: 'Ground' },
        { subject: 'Computer Science', teacher: 'Mr. Iyer',       room: 'Lab-3' },
    ],
    Friday: [
        { subject: 'Physics',          teacher: 'Prof. Verma',    room: 'B-203' },
        { subject: 'Chemistry',        teacher: 'Dr. Patel',      room: 'Lab-1' },
        { subject: 'Biology',          teacher: 'Dr. Nair',       room: 'Lab-2' },
        { subject: 'English',          teacher: 'Ms. Kapoor',     room: 'C-305' },
        { subject: 'Lunch Break',      teacher: '',               room: 'Cafeteria' },
        { subject: 'Mathematics',      teacher: 'Dr. Sharma',     room: 'A-101' },
        { subject: 'Art',              teacher: 'Ms. Reddy',      room: 'Art Room' },
        null,
    ],
    Saturday: [
        { subject: 'Mathematics',      teacher: 'Dr. Sharma',     room: 'A-101' },
        { subject: 'Computer Science', teacher: 'Mr. Iyer',       room: 'Lab-3' },
        { subject: 'Library',          teacher: 'Ms. Joshi',      room: 'Library' },
        { subject: 'Physical Education', teacher: 'Coach Das',    room: 'Ground' },
        null,
        null,
        null,
        null,
    ],
};

// ────────────────────────────────────────────────
// 2. DOM REFERENCES
// ────────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const els = {
    body:           document.documentElement,
    themeToggle:    $('#themeToggle'),
    themeIcon:      $('#themeIcon'),
    searchInput:    $('#searchInput'),
    dayFilter:      $('#dayFilter'),
    subjectFilter:  $('#subjectFilter'),
    resetFilters:   $('#resetFilters'),
    timetableHead:  $('#timetableHead'),
    timetableBody:  $('#timetableBody'),
    legendItems:    $('#legendItems'),
    currentSlot:    $('#currentSlot'),
    currentSlotText:$('#currentSlotText'),
    liveTime:       $('#liveTime'),
    liveDate:       $('#liveDate'),
    addEditBtn:     $('#addEditBtn'),
    modalOverlay:   $('#modalOverlay'),
    modalClose:     $('#modalClose'),
    modalCancel:    $('#modalCancel'),
    modalTitle:     $('#modalTitle'),
    classForm:      $('#classForm'),
    formDay:        $('#formDay'),
    formTime:       $('#formTime'),
    formSubject:    $('#formSubject'),
    formTeacher:    $('#formTeacher'),
    formRoom:       $('#formRoom'),
    exportBtn:      $('#exportBtn'),
    exportMenu:     $('#exportMenu'),
    exportPNG:      $('#exportPNG'),
    exportPDF:      $('#exportPDF'),
    toastContainer: $('#toastContainer'),
    tableWrapper:   $('#tableWrapper'),
};

// ────────────────────────────────────────────────
// 3. THEME MANAGEMENT
// ────────────────────────────────────────────────

/**
 * Initialize theme from localStorage, defaulting to light.
 */
function initTheme() {
    const saved = localStorage.getItem('timetable-theme') || 'light';
    applyTheme(saved);
}

function applyTheme(theme) {
    els.body.setAttribute('data-theme', theme);
    els.themeIcon.className = theme === 'dark' ? 'ph ph-moon' : 'ph ph-sun';
    localStorage.setItem('timetable-theme', theme);
}

function toggleTheme() {
    const current = els.body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
    showToast('info', current === 'dark' ? 'Switched to Light Mode' : 'Switched to Dark Mode');
}

// ────────────────────────────────────────────────
// 4. LIVE CLOCK & DATE
// ────────────────────────────────────────────────

function updateClock() {
    const now = new Date();

    // Time
    els.liveTime.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    // Date
    els.liveDate.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

// ────────────────────────────────────────────────
// 5. DETERMINE CURRENT DAY & TIME SLOT
// ────────────────────────────────────────────────

/**
 * Returns the JS day name mapped to our DAYS array, or null if Sunday.
 */
function getTodayName() {
    const jsDay = new Date().getDay(); // 0=Sun, 1=Mon, …
    if (jsDay === 0) return null; // Sunday not in our schedule
    return DAYS[jsDay - 1];
}

/**
 * Find which time-slot index the current time falls into.
 * Returns -1 if outside school hours.
 */
function getCurrentSlotIndex() {
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < TIME_SLOTS.length; i++) {
        const [startStr] = TIME_SLOTS[i].split(' - ');
        const [endStr]   = [TIME_SLOTS[i].split(' - ')[1]];
        const startMins  = parseTimeToMins(startStr);
        const endMins    = parseTimeToMins(endStr);
        if (mins >= startMins && mins < endMins) return i;
    }
    return -1;
}

/** Convert "8:00" or "1:50" (12-h without AM/PM) to minutes since midnight.
 *  Assume 8–12 = AM, 1–7 = PM to match school schedule. */
function parseTimeToMins(str) {
    let [h, m] = str.trim().split(':').map(Number);
    if (h >= 1 && h <= 7) h += 12; // PM assumption for school times
    return h * 60 + m;
}

/**
 * Update the "current slot" banner.
 */
function updateCurrentSlotBanner() {
    const today  = getTodayName();
    const slotIdx = getCurrentSlotIndex();

    if (!today || slotIdx === -1 || !timetableData[today]) {
        els.currentSlot.style.display = 'none';
        return;
    }

    const entry = timetableData[today][slotIdx];
    if (!entry) {
        els.currentSlot.style.display = 'none';
        return;
    }

    els.currentSlot.style.display = 'flex';
    const roomStr = entry.room ? ` — Room ${entry.room}` : '';
    els.currentSlotText.textContent = `Right now: ${entry.subject}${entry.teacher ? ` with ${entry.teacher}` : ''}${roomStr}`;
}

// ────────────────────────────────────────────────
// 6. RENDER TABLE
// ────────────────────────────────────────────────

function renderTable() {
    const todayName   = getTodayName();
    const dayFilter   = els.dayFilter.value;
    const subFilter   = els.subjectFilter.value;
    const searchTerm  = els.searchInput.value.trim().toLowerCase();

    // Determine which days to show
    const visibleDays = dayFilter === 'all'
        ? DAYS
        : DAYS.filter(d => d === dayFilter);

    // ── Build <thead> ──
    let headHTML = '<tr><th><i class="ph ph-clock"></i> Time</th>';
    visibleDays.forEach(day => {
        const isToday = day === todayName;
        headHTML += `<th class="${isToday ? 'is-today' : ''}">${day}</th>`;
    });
    headHTML += '</tr>';
    els.timetableHead.innerHTML = headHTML;

    // ── Build <tbody> ──
    let bodyHTML = '';
    TIME_SLOTS.forEach((slot, si) => {
        bodyHTML += '<tr>';
        bodyHTML += `<td>${slot}</td>`;

        visibleDays.forEach(day => {
            const entry   = timetableData[day]?.[si] || null;
            const isToday = day === todayName;
            let tdClass   = isToday ? 'is-today' : '';

            if (!entry) {
                bodyHTML += `<td class="${tdClass}"><span class="cell-empty">—</span></td>`;
                return;
            }

            // Subject filtering
            const matchesSubject = subFilter === 'all' || entry.subject === subFilter;

            // Search filtering
            const matchesSearch  = !searchTerm ||
                entry.subject.toLowerCase().includes(searchTerm) ||
                (entry.teacher && entry.teacher.toLowerCase().includes(searchTerm)) ||
                (entry.room && entry.room.toLowerCase().includes(searchTerm));

            const colors = SUBJECT_COLORS[entry.subject] || { bg: '#f3f4f6', border: '#9ca3af', text: '#6b7280' };

            let cardClass = 'cell-card';
            if (!matchesSubject || !matchesSearch) {
                cardClass += ' cell-card--dim';
            } else if (searchTerm && matchesSearch) {
                cardClass += ' cell-card--highlight';
            }

            const metaParts = [];
            if (entry.teacher) metaParts.push(`<i class="ph ph-chalkboard-teacher"></i> ${entry.teacher}`);
            if (entry.room)    metaParts.push(`<i class="ph ph-map-pin"></i> ${entry.room}`);

            bodyHTML += `
                <td class="${tdClass}">
                    <div class="${cardClass}"
                         style="background:${colors.bg}; border-left-color:${colors.border};"
                         data-day="${day}" data-slot="${si}">
                        <span class="cell-card__subject" style="color:${colors.text}">
                            ${entry.subject}
                        </span>
                        ${metaParts.length ? `<span class="cell-card__meta">${metaParts.join(' &bull; ')}</span>` : ''}
                    </div>
                </td>`;
        });

        bodyHTML += '</tr>';
    });

    els.timetableBody.innerHTML = bodyHTML;

    // Apply fade-in animation
    els.timetableBody.classList.remove('fade-in');
    void els.timetableBody.offsetWidth; // force reflow
    els.timetableBody.classList.add('fade-in');
}

// ────────────────────────────────────────────────
// 7. LEGEND
// ────────────────────────────────────────────────

function renderLegend() {
    const subjects = Object.keys(SUBJECT_COLORS);
    els.legendItems.innerHTML = subjects.map(sub => {
        const c = SUBJECT_COLORS[sub];
        return `
            <span class="legend-item" data-subject="${sub}">
                <span class="legend-item__dot" style="background:${c.border}"></span>
                ${sub}
            </span>`;
    }).join('');

    // Click legend item to filter
    els.legendItems.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', () => {
            const sub = item.dataset.subject;
            els.subjectFilter.value = sub;
            renderTable();
            showToast('info', `Filtered: ${sub}`);
        });
    });
}

// ────────────────────────────────────────────────
// 8. POPULATE FILTER DROPDOWNS
// ────────────────────────────────────────────────

function populateFilters() {
    // Day filter
    DAYS.forEach(day => {
        const opt = document.createElement('option');
        opt.value = day;
        opt.textContent = day;
        els.dayFilter.appendChild(opt);
    });

    // Subject filter
    const subjects = new Set();
    Object.values(timetableData).forEach(slots => {
        slots.forEach(entry => {
            if (entry && entry.subject) subjects.add(entry.subject);
        });
    });
    [...subjects].sort().forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.textContent = sub;
        els.subjectFilter.appendChild(opt);
    });

    // Form dropdowns
    DAYS.forEach(day => {
        const opt = document.createElement('option');
        opt.value = day;
        opt.textContent = day;
        els.formDay.appendChild(opt);
    });

    TIME_SLOTS.forEach((slot, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = slot;
        els.formTime.appendChild(opt);
    });
}

// ────────────────────────────────────────────────
// 9. FILTER & SEARCH HANDLERS
// ────────────────────────────────────────────────

function handleFilterChange() {
    renderTable();
}

function handleSearch() {
    renderTable();
}

function resetAllFilters() {
    els.dayFilter.value     = 'all';
    els.subjectFilter.value = 'all';
    els.searchInput.value   = '';
    renderTable();
    showToast('success', 'Filters reset');
}

// ────────────────────────────────────────────────
// 10. ADD / EDIT MODAL
// ────────────────────────────────────────────────

let editingCell = null; // { day, slotIndex } or null for adding new

function openModal(day = null, slot = null) {
    if (day !== null && slot !== null) {
        // Edit mode
        editingCell = { day, slot };
        els.modalTitle.innerHTML = '<i class="ph ph-pencil-simple-line"></i> Edit Class';
        const entry = timetableData[day]?.[slot];
        if (entry) {
            els.formDay.value     = day;
            els.formTime.value    = slot;
            els.formSubject.value = entry.subject;
            els.formTeacher.value = entry.teacher || '';
            els.formRoom.value    = entry.room || '';
        }
    } else {
        // Add mode
        editingCell = null;
        els.modalTitle.innerHTML = '<i class="ph ph-plus-circle"></i> Add New Class';
        els.classForm.reset();
    }

    els.modalOverlay.classList.add('open');
}

function closeModal() {
    els.modalOverlay.classList.remove('open');
    editingCell = null;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const day     = els.formDay.value;
    const slot    = parseInt(els.formTime.value);
    const subject = els.formSubject.value.trim();
    const teacher = els.formTeacher.value.trim();
    const room    = els.formRoom.value.trim();

    if (!subject) {
        showToast('error', 'Subject is required');
        return;
    }

    // Ensure day array exists
    if (!timetableData[day]) {
        timetableData[day] = new Array(TIME_SLOTS.length).fill(null);
    }

    // Auto-assign color if new subject
    if (!SUBJECT_COLORS[subject]) {
        const hue = (Object.keys(SUBJECT_COLORS).length * 47) % 360;
        SUBJECT_COLORS[subject] = {
            bg: `hsl(${hue}, 80%, 95%)`,
            border: `hsl(${hue}, 65%, 50%)`,
            text: `hsl(${hue}, 70%, 30%)`,
        };
        // Re-render legend & subject filter
        renderLegend();
        const opt = document.createElement('option');
        opt.value = subject;
        opt.textContent = subject;
        els.subjectFilter.appendChild(opt);
    }

    timetableData[day][slot] = { subject, teacher, room };

    closeModal();
    renderTable();
    showToast('success', editingCell ? 'Class updated!' : 'Class added!');
}

// ────────────────────────────────────────────────
// 11. EXPORT FUNCTIONALITY
// ────────────────────────────────────────────────

let exportMenuOpen = false;

function toggleExportMenu() {
    exportMenuOpen = !exportMenuOpen;

    if (exportMenuOpen) {
        const rect = els.exportBtn.getBoundingClientRect();
        els.exportMenu.style.top  = `${rect.bottom + 8}px`;
        els.exportMenu.style.left = `${rect.left}px`;
        els.exportMenu.classList.add('open');
    } else {
        els.exportMenu.classList.remove('open');
    }
}

function closeExportMenu() {
    exportMenuOpen = false;
    els.exportMenu.classList.remove('open');
}

async function exportAsPNG() {
    try {
        showToast('info', 'Generating PNG…');
        const canvas = await html2canvas(els.tableWrapper, {
            backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-secondary').trim() || '#ffffff',
            scale: 2,
        });
        const link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('success', 'PNG downloaded!');
    } catch (err) {
        console.error(err);
        showToast('error', 'Export failed');
    }
    closeExportMenu();
}

async function exportAsPDF() {
    try {
        showToast('info', 'Generating PDF…');
        const canvas = await html2canvas(els.tableWrapper, {
            backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-secondary').trim() || '#ffffff',
            scale: 2,
        });
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf  = new jsPDF('landscape', 'mm', 'a4');
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = (canvas.height * pdfW) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
        pdf.save('timetable.pdf');
        showToast('success', 'PDF downloaded!');
    } catch (err) {
        console.error(err);
        showToast('error', 'Export failed');
    }
    closeExportMenu();
}

// ────────────────────────────────────────────────
// 12. TOAST NOTIFICATIONS
// ────────────────────────────────────────────────

function showToast(type = 'info', message = '') {
    const iconMap = {
        success: 'ph-check-circle',
        error:   'ph-warning-circle',
        info:    'ph-info',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<i class="ph ${iconMap[type] || iconMap.info}"></i> <span>${message}</span>`;
    els.toastContainer.appendChild(toast);

    // Remove after animation
    setTimeout(() => toast.remove(), 3000);
}

// ────────────────────────────────────────────────
// 13. KEYBOARD SHORTCUTS
// ────────────────────────────────────────────────

function handleKeyboard(e) {
    // Cmd/Ctrl + K → focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        els.searchInput.focus();
    }

    // Escape → close modals/menus
    if (e.key === 'Escape') {
        closeModal();
        closeExportMenu();
    }
}

// ────────────────────────────────────────────────
// 14. CELL CLICK → EDIT
// ────────────────────────────────────────────────

function handleTableClick(e) {
    const card = e.target.closest('.cell-card');
    if (!card) return;

    const day  = card.dataset.day;
    const slot = parseInt(card.dataset.slot);
    openModal(day, slot);
}

// ────────────────────────────────────────────────
// 15. INITIALIZATION
// ────────────────────────────────────────────────

function init() {
    // Theme
    initTheme();

    // Clock
    updateClock();
    setInterval(updateClock, 1000);

    // Populate
    populateFilters();
    renderLegend();
    renderTable();

    // Current slot banner
    updateCurrentSlotBanner();
    setInterval(updateCurrentSlotBanner, 60000); // check every minute

    // ── Event Listeners ──

    // Theme toggle
    els.themeToggle.addEventListener('click', toggleTheme);

    // Filters
    els.dayFilter.addEventListener('change', handleFilterChange);
    els.subjectFilter.addEventListener('change', handleFilterChange);
    els.resetFilters.addEventListener('click', resetAllFilters);

    // Search (debounced)
    let searchDebounce;
    els.searchInput.addEventListener('input', () => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(handleSearch, 200);
    });

    // Add/Edit modal
    els.addEditBtn.addEventListener('click', () => openModal());
    els.modalClose.addEventListener('click', closeModal);
    els.modalCancel.addEventListener('click', closeModal);
    els.modalOverlay.addEventListener('click', (e) => {
        if (e.target === els.modalOverlay) closeModal();
    });
    els.classForm.addEventListener('submit', handleFormSubmit);

    // Cell click
    els.timetableBody.addEventListener('click', handleTableClick);

    // Export
    els.exportBtn.addEventListener('click', toggleExportMenu);
    els.exportPNG.addEventListener('click', exportAsPNG);
    els.exportPDF.addEventListener('click', exportAsPDF);

    // Close export menu on outside click
    document.addEventListener('click', (e) => {
        if (!els.exportMenu.contains(e.target) && !els.exportBtn.contains(e.target)) {
            closeExportMenu();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    console.log('✅ Timetable Viewer initialized');
}

// Fire when DOM is ready
document.addEventListener('DOMContentLoaded', init);
