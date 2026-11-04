document.addEventListener('DOMContentLoaded', () => {
    // Restore Theme State
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
    // Restore RTL State
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    initSiteLayout();
});

function initSiteLayout() {
    injectHeaderAndFooter();
    initGlobalInteractions();
}

// Dynamic Header & Footer Injection with Primary Sign In CTA & Clean RTL Toggle
function injectHeaderAndFooter() {
    const headerContainer = document.getElementById('siteHeaderContainer');
    const footerContainer = document.getElementById('siteFooterContainer');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isDarkMode = document.documentElement.classList.contains('dark');
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';

    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 shadow-sm" style="background-color: var(--card-bg); border-bottom: 1px solid var(--border-color);">
                <div class="volt-container h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
                    <!-- Brand Logo -->
                    <a href="index.html" class="flex items-center gap-2.5 font-black text-base sm:text-lg tracking-tight shrink-0" style="color: var(--text-main);">
                        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg"  color: white;">
                            <img src="./logo.png" alt="logo" class="w-8 h-8 rounded-xl">
                        </div>
                        <span>Inspecta<span style="color: var(--primary-color);">Pro</span></span>
                    </a>

                    <!-- Desktop Navigation Links -->
                    <nav class="hidden xl:flex items-center gap-6 text-[13px] font-bold uppercase tracking-wider" style="color: var(--text-muted);">
                        <div class="relative group py-2">
                            <button id="homeDropdownBtn" class="flex items-center gap-1 transition-colors cursor-pointer focus:outline-none" style="color: ${currentPath === 'index.html' || currentPath === '' ? 'var(--primary-color)' : 'var(--text-muted)'};">
                                Home <i class="fa-solid fa-chevron-down text-[9px] transition-transform group-hover:rotate-180"></i>
                            </button>
                            <div class="absolute top-full left-0 mt-1 w-48 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border" style="background-color: var(--card-bg); border-color: var(--border-color);">
                                <a href="index.html" class="block px-5 py-3 transition-colors text-xs font-bold" style="color: var(--text-main);">Home 1 (Standard)</a>
                                <a href="home2.html" class="block px-5 py-3 transition-colors text-xs font-bold" style="color: var(--text-main);">Home 2 (SaaS Hub)</a>
                            </div>
                        </div>
                        <a href="services.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'services.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">Services</a>
                        <a href="locations.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'locations.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">Locations</a>
                        <a href="pricing.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'pricing.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">Pricing</a>
                        <a href="about.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'about.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">About</a>
                        <a href="blog.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'blog.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">Blog</a>
                        <a href="contact.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'contact.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">Contact</a>
                        <a href="dashboard.html" class="transition-colors hover:opacity-80" style="color: ${currentPath === 'dashboard.html' ? 'var(--primary-color)' : 'var(--text-muted)'};">Dashboard</a>
                    </nav>

                    <!-- Right Controls: Sign In as Primary CTA -->
                    <div class="flex items-center gap-2 sm:gap-3 shrink-0">
                        <button onclick="toggleTheme()" id="themeToggleBtn" class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border flex items-center justify-center shadow-sm transition-all cursor-pointer hover:opacity-80" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);" title="Toggle Theme">
                            <i id="themeIcon" class="fa-solid ${isDarkMode ? 'fa-sun text-amber-400' : 'fa-moon'} text-xs"></i>
                        </button>

                        <button onclick="toggleRTL()" id="rtlToggleBtn" class="hidden min-[500px]:flex px-3 h-9 sm:h-10 rounded-2xl border items-center gap-1.5 shadow-sm font-bold text-[11px] transition-all cursor-pointer hover:opacity-80" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);" title="Toggle Direction">
                            
                            <span>${currentDir === 'ltr' ? 'RTL' : 'LTR'}</span>
                        </button>

                        <button type="button" id="navBookSlotBtn" class="hidden sm:inline-flex px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs uppercase tracking-wider border shadow-sm transition-all hover:opacity-80 cursor-pointer" style="background-color: var(--card-bg); border-color: var(--border-color); color: var(--text-main);">
                            Book Slot
                        </button>

                        <!-- Sign In as Primary CTA in Header -->
                        <a href="login.html" class="px-5 sm:px-6 py-2.5 sm:py-3 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:opacity-90 text-center" style="background-color: var(--primary-color);">
                            Sign In
                        </a>

                        <!-- Hamburger Button -->
                        <button id="mobileMenuToggle" class="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border flex items-center justify-center shadow-sm cursor-pointer" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);" aria-label="Toggle Mobile Menu">
                            <i class="fa-solid fa-bars text-xs sm:text-sm"></i>
                        </button>
                    </div>
                </div>

                <!-- Responsive Mobile Menu Drawer -->
                <div id="mobileMenuDrawer" class="hidden xl:hidden border-t px-4 sm:px-6 py-6 space-y-4 shadow-xl transition-all max-h-[80vh] overflow-y-auto" style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <div class="flex min-[500px]:hidden items-center justify-between gap-2 pb-3 border-b" style="border-color: var(--border-color);">
                        <button onclick="toggleRTL()" class="flex-1 py-2.5 rounded-2xl border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);">
                            <i class="fa-solid fa-language" style="color: var(--primary-color);"></i>
                            <span>${currentDir === 'ltr' ? 'RTL' : 'LTR'}</span>
                        </button>
                        <a href="login.html" class="flex-1 py-2.5 text-center text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md" style="background-color: var(--primary-color);">
                            Sign In
                        </a>
                        <button type="button" id="mobileBookSlotBtn" class="flex-1 py-2.5 text-center rounded-2xl font-bold text-xs uppercase tracking-wider border shadow-sm cursor-pointer" style="background-color: var(--card-bg); border-color: var(--border-color); color: var(--text-main);">
                            Book Slot
                        </button>
                    </div>
                    <div class="space-y-2">
                        <p class="text-[10px] font-bold uppercase tracking-widest" style="color: var(--text-muted);">Home Pages</p>
                        <a href="index.html" class="block pl-3 py-2 text-xs font-bold uppercase tracking-wider" style="color: var(--text-main);">Home 1 (Standard)</a>
                        <a href="home2.html" class="block pl-3 py-2 text-xs font-bold uppercase tracking-wider" style="color: var(--text-main);">Home 2 (SaaS Hub)</a>
                    </div>
                    <hr style="border-color: var(--border-color);">
                    <div class="grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wider">
                        <a href="services.html" class="py-2" style="color: var(--text-main);">Services</a>
                        <a href="locations.html" class="py-2" style="color: var(--text-main);">Locations</a>
                        <a href="pricing.html" class="py-2" style="color: var(--text-main);">Pricing</a>
                        <a href="about.html" class="py-2" style="color: var(--text-main);">About</a>
                        <a href="blog.html" class="py-2" style="color: var(--text-main);">Blog</a>
                        <a href="contact.html" class="py-2" style="color: var(--text-main);">Contact</a>
                        <a href="dashboard.html" class="py-2" style="color: var(--text-main);">Dashboard</a>
                    </div>
                </div>
            </header>
        `;
    }

    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="pt-12 sm:pt-16 pb-10 sm:pb-12 transition-colors duration-300" style="background-color: var(--card-bg); color: var(--text-main); border-top: 1px solid var(--border-color);">
                <div class="volt-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
                    <div class="space-y-4">
                        <div class="flex items-center gap-3 font-black text-lg">
                            <a href="index.html" class="flex items-center gap-2.5 font-black text-lg tracking-tight" style="color: var(--text-main);">
                                <div class="w-9 h-9 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg" style=" color: white;">
                                    <img src="./logo.png" alt="logo" class="w-8 h-8 rounded-xl">
                                </div>
                                <span>Inspecta<span style="color: var(--primary-color);">Pro</span></span>
                            </a>
                        </div>
                        <p class="text-xs font-medium leading-relaxed" style="color: var(--text-muted);">State-certified vehicle inspections & emissions testing with express 15-minute turnarounds.</p>
                        
                        <!-- Social Media Icons -->
                        <div class="flex items-center gap-3 pt-1">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-2xl flex items-center justify-center text-white transition-colors hover:opacity-80 shadow-sm" style="background-color: var(--primary-color);" aria-label="Facebook"><i class="fa-brands fa-facebook-f text-xs"></i></a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-2xl flex items-center justify-center text-white transition-colors hover:opacity-80 shadow-sm" style="background-color: #1e293b;" aria-label="Twitter"><i class="fa-brands fa-x-twitter text-xs"></i></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-2xl flex items-center justify-center text-white transition-colors hover:opacity-80 shadow-sm" style="background-color: var(--secondary-color);" aria-label="Instagram"><i class="fa-brands fa-instagram text-xs"></i></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-2xl flex items-center justify-center text-white transition-colors hover:opacity-80 shadow-sm" style="background-color: var(--primary-color);" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in text-xs"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-xs uppercase tracking-widest mb-4" style="color: var(--primary-color);">Quick Links</h4>
                        <ul class="space-y-2 text-xs font-medium" style="color: var(--text-muted);">
                            <li><a href="services.html" class="transition-colors hover:opacity-80">Inspection Services</a></li>
                            <li><a href="pricing.html" class="transition-colors hover:opacity-80">Pricing Plans</a></li>
                            <li><a href="locations.html" class="transition-colors hover:opacity-80">Center Locations</a></li>
                            <li><a href="dashboard.html" class="transition-colors hover:opacity-80">Customer Portal</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-xs uppercase tracking-widest mb-4" style="color: var(--primary-color);">Legal & Compliance</h4>
                        <ul class="space-y-2 text-xs font-medium" style="color: var(--text-muted);">
                            <li><a href="terms.html" class="transition-colors hover:opacity-80">Terms & Conditions</a></li>
                            <li><a href="privacy.html" class="transition-colors hover:opacity-80">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-xs uppercase tracking-widest mb-4" style="color: var(--primary-color);">Contact Hub</h4>
                        <p class="text-xs font-medium leading-relaxed mb-2" style="color: var(--text-muted);">24, Jawahar Bazaar, Karur Central Testing Yard, Tamil Nadu[cite: 3].</p>
                        <p class="text-xs font-mono font-bold" style="color: var(--primary-color);">+91 98765 43210[cite: 3]</p>
                    </div>
                </div>
                <div class="volt-container pt-8 text-center text-[11px] font-medium" style="border-top: 1px solid var(--border-color); color: var(--text-muted);">
                    &copy; 2026 Inspecta Pro Testing Center. All rights reserved.
                </div>
            </footer>
        `;
    }

    // Global Modal Setup for Express Booking
    if (!document.getElementById('globalBookingModal')) {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'globalBookingModal';
        modalDiv.className = 'fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/70 opacity-0 pointer-events-none transition-all duration-300';
        modalDiv.innerHTML = `
            <div class="max-w-md w-full p-6 sm:p-8 rounded-[2.5rem] border text-left space-y-5 shadow-2xl transition-colors duration-300 relative scale-95 transition-transform duration-300 mx-auto my-auto" id="modalCardBox" style="background-color: var(--card-bg); border-color: var(--border-color);">
                <div class="flex items-center justify-between pb-3 border-b" style="border-color: var(--border-color);">
                    <h3 class="text-lg font-black" style="color: var(--text-main);">Express Inspection Slot Booking</h3>
                    <button type="button" id="closeGlobalModal" class="w-8 h-8 rounded-2xl border flex items-center justify-center text-xs cursor-pointer" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <form id="globalBookingForm" class="space-y-4" novalidate>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style="color: var(--text-muted);">Registration Number</label>
                        <input type="text" id="modalCarReg" placeholder="e.g. TN49BB9012" class="w-full px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider outline-none border transition-all" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);" required>
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-widest mb-1.5" style="color: var(--text-muted);">Mobile Number</label>
                        <input type="tel" id="modalPhone" placeholder="9876543210" maxlength="10" class="w-full px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider outline-none border transition-all" style="background-color: var(--bg-color); border-color: var(--border-color); color: var(--text-main);" required>
                    </div>
                    <button type="submit" class="w-full py-4 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all hover:opacity-90 cursor-pointer" style="background-color: var(--primary-color);">
                        Confirm Appointment Slot
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }
}

function initGlobalInteractions() {
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#mobileMenuToggle');
        if (toggleBtn) {
            const drawer = document.getElementById('mobileMenuDrawer');
            if (drawer) drawer.classList.toggle('hidden');
            return;
        }

        const faqHeader = e.target.closest('.faq-item .flex');
        if (faqHeader) {
            const item = faqHeader.closest('.faq-item');
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon');
            if (content) {
                content.classList.toggle('hidden');
                if (icon) icon.classList.toggle('rotate-180');
            }
        }
    });

    setTimeout(() => {
        const bookBtn = document.getElementById('navBookSlotBtn');
        const mobileBookBtn = document.getElementById('mobileBookSlotBtn');
        const modal = document.getElementById('globalBookingModal');
        const modalCard = document.getElementById('modalCardBox');
        const closeBtn = document.getElementById('closeGlobalModal');
        const bookForm = document.getElementById('globalBookingForm');
        const drawer = document.getElementById('mobileMenuDrawer');

        const openModal = (e) => {
            if (e) e.preventDefault();
            if (modal && modalCard) {
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modalCard.classList.remove('scale-95');
                modalCard.classList.add('scale-100');
                if (drawer) drawer.classList.add('hidden');
            }
        };

        if (bookBtn) bookBtn.onclick = openModal;
        if (mobileBookBtn) mobileBookBtn.onclick = openModal;

        const closeModal = () => {
            if (modal && modalCard) {
                modal.classList.add('opacity-0', 'pointer-events-none');
                modalCard.classList.remove('scale-100');
                modalCard.classList.add('scale-95');
            }
        };

        if (closeBtn) closeBtn.onclick = closeModal;
        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) closeModal();
            };
        }

        if (bookForm) {
            bookForm.onsubmit = (e) => {
                e.preventDefault();
                const regInput = document.getElementById('modalCarReg');
                if (regInput && regInput.value.trim()) {
                    alert(`Slot booked successfully for vehicle ${regInput.value.toUpperCase()}!`);
                    closeModal();
                    bookForm.reset();
                } else {
                    alert('Please enter a valid registration number.');
                }
            };
        }
    }, 100);
}

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const themeIcon = document.getElementById('themeIcon');
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-amber-400 text-xs';
    } else {
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon text-xs';
    }
}

function toggleRTL() {
    const html = document.documentElement;
    const currentDir = html.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    localStorage.setItem('dir', newDir);
    window.location.reload();
}