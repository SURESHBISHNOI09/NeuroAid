// NeuroAid Professional Website with Enhanced Analytics Dashboard - FIXED

// Global state management
let currentPage = 'home';
let isDemoRecording = false;
let demoTimer = null;
let demoAnimationId = null;
let demoTimeLeft = 30;

// Dashboard data and charts
let dashboardCharts = {};
let dashboardData = {
    overview: {
        totalRecordings: 1247,
        avgRiskScore: 28,
        improvementRate: 15.3,
        streakDays: 12
    },
    voiceMetrics: {
        pitch: { current: 180, baseline: 175 },
        volume: { current: 72, baseline: 70 },
        clarity: { current: 85, baseline: 82 },
        stability: { current: 78, baseline: 75 }
    },
    trendData: [
        { date: '2024-08-01', riskScore: 35, confidence: 0.82 },
        { date: '2024-08-08', riskScore: 32, confidence: 0.85 },
        { date: '2024-08-15', riskScore: 28, confidence: 0.87 },
        { date: '2024-08-22', riskScore: 25, confidence: 0.89 }
    ]
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('NeuroAid: Initializing enhanced professional website...');
    initializeApp();
});

function initializeApp() {
    try {
        setupNavigation();
        setupThemeToggle();
        setupEventListeners();
        setupScrollAnimations();
        initializePage();
        
        console.log('NeuroAid: Website initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// Navigation Management - FIXED
function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Setup main navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = href.substring(1);
                console.log('Nav link clicked:', pageName);
                showPage(pageName);
            });
        }
    });
    
    // Setup dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = href.substring(1);
                console.log('Dropdown link clicked:', pageName);
                showPage(pageName);
            });
        }
    });
    
    // Setup footer navigation
    const footerLinks = document.querySelectorAll('.footer-column a[href^="#"]');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = href.substring(1);
                console.log('Footer link clicked:', pageName);
                showPage(pageName);
            });
        }
    });
    
    // Setup feature links
    const featureLinks = document.querySelectorAll('.feature-link');
    featureLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = href.substring(1);
                console.log('Feature link clicked:', pageName);
                showPage(pageName);
            });
        }
    });
    
    // Setup logo click
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            console.log('Logo clicked, navigating to home');
            showPage('home');
        });
    }
    
    // Setup all CTA buttons - FIXED
    setupAllButtons();
}

function setupAllButtons() {
    console.log('Setting up all buttons...');
    
    // Get all buttons and add proper event listeners
    const allButtons = document.querySelectorAll('button');
    
    allButtons.forEach(button => {
        const text = button.textContent.toLowerCase();
        const onclick = button.getAttribute('onclick');
        
        // Remove existing onclick attribute to prevent conflicts
        if (onclick) {
            button.removeAttribute('onclick');
        }
        
        // Add click listener based on button text
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (text.includes('dashboard') || text.includes('analytics') || text.includes('explore')) {
                console.log('Dashboard button clicked:', text);
                showPage('dashboard');
            } else if (text.includes('demo') || text.includes('try free') || text.includes('start demo')) {
                console.log('Demo button clicked:', text);
                showPage('demo');
            } else if (text.includes('get started') || text.includes('start free trial') || text.includes('start trial')) {
                console.log('Get started button clicked:', text);
                showPage('demo');
            } else if (text.includes('learn more')) {
                console.log('Learn more button clicked:', text);
                showPage('platform');
            } else if (text.includes('contact sales') || text.includes('contact')) {
                console.log('Contact button clicked:', text);
                showPage('contact');
            } else if (text.includes('apply now')) {
                console.log('Apply now button clicked');
                const jobIndex = Array.from(document.querySelectorAll('.job-card')).findIndex(card => card.contains(button));
                handleJobApplication(jobIndex);
            } else if (button.id === 'theme-toggle') {
                console.log('Theme toggle clicked');
                toggleTheme();
            } else if (button.id === 'demo-record-btn') {
                console.log('Demo record button clicked');
                toggleDemoRecording();
            } else if (button.id === 'exportData') {
                console.log('Export data button clicked');
                openExportModal();
            } else if (text.includes('export data')) {
                console.log('Export modal button clicked');
                exportData();
            } else if (text.includes('cancel')) {
                console.log('Cancel button clicked');
                closeExportModal();
            } else if (text.includes('send message')) {
                console.log('Send message button clicked');
                const form = button.closest('form');
                if (form) {
                    handleContactSubmission({ target: form, preventDefault: () => {} });
                }
            } else {
                console.log('Generic button clicked:', text);
            }
        });
    });
    
    console.log(`Set up ${allButtons.length} buttons`);
}

function showPage(pageName) {
    console.log('Navigating to page:', pageName);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        updateNavigationState(pageName);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Page-specific initialization
        setTimeout(() => {
            initializePageContent(pageName);
        }, 100);
        
        // Update URL hash
        history.replaceState(null, null, `#${pageName}`);
        
        console.log('Successfully navigated to:', pageName);
        showSuccessMessage(`Navigated to ${pageName.charAt(0).toUpperCase() + pageName.slice(1)} page`);
    } else {
        console.warn('Page not found:', pageName);
        showErrorMessage(`Page "${pageName}" not found. Redirecting to home.`);
        if (pageName !== 'home') {
            showPage('home');
        }
    }
}

function updateNavigationState(activePage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${activePage}`) {
            link.classList.add('active');
        }
    });
}

function initializePage() {
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`${hash}-page`)) {
        showPage(hash);
    } else {
        showPage('home');
    }
}

// Page-specific content initialization
function initializePageContent(pageName) {
    console.log('Initializing content for page:', pageName);
    
    switch (pageName) {
        case 'dashboard':
            initializeDashboard();
            break;
        case 'demo':
            initializeDemoPage();
            break;
        case 'home':
            initializeHomePage();
            break;
        case 'careers':
            initializeCareersPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'pricing':
            initializePricingPage();
            break;
        default:
            break;
    }
}

// Enhanced Dashboard Functionality
function initializeDashboard() {
    console.log('Initializing analytics dashboard...');
    
    // Setup dashboard event listeners
    setupDashboardControls();
    
    // Initialize all charts
    setTimeout(() => {
        initializeCharts();
        updateDashboardData();
        generateHeatmap();
        drawVoiceQualityGauge();
        startRealTimeUpdates();
    }, 100);
    
    showSuccessMessage('Analytics dashboard loaded! Explore comprehensive voice health insights.');
}

function setupDashboardControls() {
    // Time filter
    const timeFilter = document.getElementById('timeFilter');
    if (timeFilter) {
        timeFilter.addEventListener('change', (e) => {
            console.log('Time filter changed:', e.target.value);
            updateDashboardData(e.target.value);
            showSuccessMessage(`Dashboard updated for ${e.target.value} period`);
        });
    }
    
    // Chart control buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            e.target.parentElement.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update chart based on period
            const period = e.target.getAttribute('data-period');
            updateRiskTrendChart(period);
        });
    });
}

function initializeCharts() {
    console.log('Initializing dashboard charts...');
    
    // Risk Trends Line Chart
    const riskCtx = document.getElementById('riskTrendChart');
    if (riskCtx) {
        dashboardCharts.riskTrend = new Chart(riskCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Risk Score',
                    data: [35, 32, 28, 25],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Confidence',
                    data: [82, 85, 87, 89],
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    pointBackgroundColor: '#FFC185',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }
    
    // Voice Biomarkers Radar Chart
    const biomarkersCtx = document.getElementById('biomarkersChart');
    if (biomarkersCtx) {
        dashboardCharts.biomarkers = new Chart(biomarkersCtx, {
            type: 'radar',
            data: {
                labels: ['Pitch', 'Volume', 'Clarity', 'Stability', 'Jitter', 'Shimmer'],
                datasets: [{
                    label: 'Current',
                    data: [75, 82, 85, 78, 88, 80],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointRadius: 4
                }, {
                    label: 'Baseline',
                    data: [70, 78, 82, 75, 85, 77],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#B4413C',
                    pointBorderColor: '#ffffff',
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    console.log('Charts initialized successfully');
}

function drawVoiceQualityGauge() {
    const canvas = document.getElementById('qualityGauge');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.25 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw gauge progress (85%)
    const scorePercentage = 85 / 100;
    const endAngle = 0.75 * Math.PI + (scorePercentage * 1.5 * Math.PI);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, endAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#1FB8CD';
    ctx.fill();
}

function generateHeatmap() {
    const heatmapContainer = document.getElementById('recordingHeatmap');
    if (!heatmapContainer) return;
    
    heatmapContainer.innerHTML = '';
    
    // Generate 4 weeks of data (28 days)
    const days = 28;
    for (let i = 0; i < days; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        
        // Random intensity (0-4)
        const intensity = Math.floor(Math.random() * 5);
        const colors = [
            'var(--color-bg-1)',
            'var(--color-bg-2)',
            'var(--color-bg-3)', 
            'var(--neuro-primary)',
            'var(--neuro-accent)'
        ];
        
        cell.style.backgroundColor = colors[intensity];
        cell.title = `${intensity} recordings on day ${i + 1}`;
        
        heatmapContainer.appendChild(cell);
    }
}

function updateDashboardData(period = '30d') {
    console.log('Updating dashboard data for period:', period);
    
    // Simulate data updates based on period
    const periodMultipliers = {
        '7d': { recordings: 0.25, risk: 0.95, improvement: 1.2 },
        '30d': { recordings: 1, risk: 1, improvement: 1 },
        '90d': { recordings: 3.2, risk: 1.05, improvement: 0.8 },
        '1y': { recordings: 12, risk: 1.1, improvement: 0.6 }
    };
    
    const multiplier = periodMultipliers[period] || periodMultipliers['30d'];
    
    // Update overview cards
    updateOverviewCard('totalRecordings', Math.floor(dashboardData.overview.totalRecordings * multiplier.recordings));
    updateOverviewCard('avgRiskScore', Math.floor(dashboardData.overview.avgRiskScore * multiplier.risk));
    updateOverviewCard('improvementRate', (dashboardData.overview.improvementRate * multiplier.improvement).toFixed(1) + '%');
    
    // Update charts if they exist
    if (dashboardCharts.riskTrend) {
        updateRiskTrendChart(period);
    }
}

function updateOverviewCard(id, value) {
    const element = document.getElementById(id);
    if (element) {
        // Animate the value change
        element.style.transform = 'scale(1.1)';
        element.style.color = 'var(--neuro-primary)';
        
        setTimeout(() => {
            element.textContent = value;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 150);
        }, 100);
    }
}

function updateRiskTrendChart(period) {
    if (!dashboardCharts.riskTrend) return;
    
    const periodData = {
        '7d': {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            risk: [30, 29, 28, 27, 26, 25, 24],
            confidence: [85, 86, 87, 88, 89, 90, 91]
        },
        '30d': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            risk: [35, 32, 28, 25],
            confidence: [82, 85, 87, 89]
        },
        '90d': {
            labels: ['Month 1', 'Month 2', 'Month 3'],
            risk: [40, 32, 25],
            confidence: [78, 85, 89]
        }
    };
    
    const data = periodData[period] || periodData['30d'];
    
    dashboardCharts.riskTrend.data.labels = data.labels;
    dashboardCharts.riskTrend.data.datasets[0].data = data.risk;
    dashboardCharts.riskTrend.data.datasets[1].data = data.confidence;
    dashboardCharts.riskTrend.update('active');
}

function startRealTimeUpdates() {
    console.log('Starting real-time dashboard updates...');
    
    // Update metrics every 10 seconds
    setInterval(() => {
        updateVoiceMetrics();
    }, 10000);
    
    // Update overview stats every 30 seconds
    setInterval(() => {
        simulateRealTimeData();
    }, 30000);
}

function updateVoiceMetrics() {
    const metrics = document.querySelectorAll('.metric-progress');
    metrics.forEach(metric => {
        // Simulate slight variations in real-time
        const currentWidth = parseFloat(metric.style.width) || 75;
        const variation = (Math.random() - 0.5) * 10; // ±5% variation
        const newWidth = Math.max(0, Math.min(100, currentWidth + variation));
        
        metric.style.width = newWidth + '%';
    });
}

function simulateRealTimeData() {
    // Simulate new recordings
    const currentRecordings = parseInt(document.getElementById('totalRecordings')?.textContent || 1247);
    const newRecordings = currentRecordings + Math.floor(Math.random() * 3);
    updateOverviewCard('totalRecordings', newRecordings);
    
    // Update streak days occasionally
    if (Math.random() < 0.3) {
        const currentStreak = parseInt(document.getElementById('streakDays')?.textContent || 12);
        updateOverviewCard('streakDays', currentStreak + 1);
    }
}

// Export Modal Functions
function openExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.classList.remove('hidden');
        showSuccessMessage('Choose your export format from the options below.');
    }
}

function closeExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function exportData() {
    const selectedFormat = document.querySelector('input[name="format"]:checked')?.value;
    
    if (!selectedFormat) {
        showErrorMessage('Please select an export format.');
        return;
    }
    
    console.log('Exporting data as:', selectedFormat);
    
    showLoadingMessage(`Preparing ${selectedFormat.toUpperCase()} export...`);
    
    setTimeout(() => {
        hideLoadingMessage();
        closeExportModal();
        
        switch (selectedFormat) {
            case 'pdf':
                generatePDFReport();
                break;
            case 'csv':
                generateCSVExport();
                break;
            case 'json':
                generateJSONExport();
                break;
            case 'png':
                generateChartImages();
                break;
        }
        
        showSuccessMessage(`${selectedFormat.toUpperCase()} export completed! Download started.`);
    }, 2000);
}

function generatePDFReport() {
    console.log('Generating PDF report...');
    // Simulate PDF generation
    const pdfContent = '%PDF-1.4\nNeuroAid Voice Analysis Report\n' + new Date().toISOString();
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NeuroAid_Voice_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
}

function generateCSVExport() {
    console.log('Generating CSV export...');
    const csvData = [
        ['Date', 'Risk Score', 'Confidence', 'Pitch', 'Volume', 'Clarity', 'Stability'],
        ['2024-08-01', '35', '0.82', '175', '68', '80', '72'],
        ['2024-08-08', '32', '0.85', '178', '70', '82', '75'],
        ['2024-08-15', '28', '0.87', '180', '72', '85', '78'],
        ['2024-08-22', '25', '0.89', '182', '74', '87', '82']
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NeuroAid_Voice_Data_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
}

function generateJSONExport() {
    console.log('Generating JSON export...');
    const jsonData = {
        exportDate: new Date().toISOString(),
        patient: {
            id: 'demo-patient',
            recordings: dashboardData.overview.totalRecordings,
            avgRiskScore: dashboardData.overview.avgRiskScore
        },
        trends: dashboardData.trendData,
        metrics: dashboardData.voiceMetrics
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NeuroAid_Voice_Analytics_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
}

function generateChartImages() {
    console.log('Generating chart images...');
    
    // Create a simple chart image as PNG
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple chart
    ctx.fillStyle = '#1FB8CD';
    ctx.fillRect(50, 50, 700, 300);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText('NeuroAid Voice Analytics Chart', 250, 200);
    
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NeuroAid_Analytics_Chart.png';
    link.click();
}

// Demo Page Functionality - FIXED
function initializeDemoPage() {
    console.log('Initializing demo page...');
    
    const recordBtn = document.getElementById('demo-record-btn');
    const timer = document.getElementById('demo-timer');
    const canvas = document.getElementById('demo-waveform');
    const results = document.getElementById('demo-results');
    
    if (canvas) {
        initializeDemoCanvas();
    }
    
    if (results) {
        results.classList.add('hidden');
    }
    
    // Reset demo state
    isDemoRecording = false;
    demoTimeLeft = 30;
    if (timer) {
        timer.textContent = '0:30';
    }
    
    if (recordBtn) {
        recordBtn.style.background = '#0EA5E9';
        recordBtn.style.animation = 'none';
        const recordText = recordBtn.querySelector('.record-text');
        if (recordText) {
            recordText.textContent = 'Start Demo Recording';
        }
    }
    
    showSuccessMessage('Demo page loaded! Click the record button to try voice analysis.');
}

function toggleDemoRecording() {
    console.log('Demo recording toggle clicked, current state:', isDemoRecording);
    
    if (!isDemoRecording) {
        startDemoRecording();
    } else {
        stopDemoRecording();
    }
}

function startDemoRecording() {
    console.log('Starting demo recording...');
    isDemoRecording = true;
    demoTimeLeft = 30;
    
    const recordBtn = document.getElementById('demo-record-btn');
    const recordText = recordBtn ? recordBtn.querySelector('.record-text') : null;
    const timer = document.getElementById('demo-timer');
    const results = document.getElementById('demo-results');
    
    // Update UI
    if (recordBtn) {
        recordBtn.style.background = '#EF4444';
        recordBtn.style.animation = 'pulse 1s infinite';
    }
    if (recordText) {
        recordText.textContent = 'Recording...';
    }
    if (results) {
        results.classList.add('hidden');
    }
    
    // Start timer
    demoTimer = setInterval(() => {
        demoTimeLeft--;
        if (timer) {
            const minutes = Math.floor(demoTimeLeft / 60);
            const seconds = demoTimeLeft % 60;
            timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (demoTimeLeft <= 0) {
            stopDemoRecording();
        }
    }, 1000);
    
    // Start waveform animation
    startDemoWaveform();
    
    showSuccessMessage('Demo recording started! Read the phrase aloud.');
}

function stopDemoRecording() {
    console.log('Stopping demo recording...');
    isDemoRecording = false;
    
    const recordBtn = document.getElementById('demo-record-btn');
    const recordText = recordBtn ? recordBtn.querySelector('.record-text') : null;
    
    // Clear timer
    if (demoTimer) {
        clearInterval(demoTimer);
        demoTimer = null;
    }
    
    // Stop waveform animation
    stopDemoWaveform();
    
    // Reset UI
    if (recordBtn) {
        recordBtn.style.background = '#0EA5E9';
        recordBtn.style.animation = 'none';
    }
    if (recordText) {
        recordText.textContent = 'Start Demo Recording';
    }
    
    // Show processing message
    showLoadingMessage('Analyzing voice patterns with AI...');
    
    // Show results after processing delay
    setTimeout(() => {
        hideLoadingMessage();
        showDemoResults();
    }, 3000);
}

function startDemoWaveform() {
    const canvas = document.getElementById('demo-waveform');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function animate() {
        if (!isDemoRecording) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1FB8CD';
        
        const time = Date.now() * 0.002;
        for (let x = 0; x < canvas.width; x += 4) {
            const amplitude = Math.sin(time + x * 0.02) * Math.random() * 30;
            const y = canvas.height / 2 + amplitude;
            ctx.fillRect(x, y, 2, 4);
        }
        
        demoAnimationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopDemoWaveform() {
    if (demoAnimationId) {
        cancelAnimationFrame(demoAnimationId);
        demoAnimationId = null;
    }
}

function initializeDemoCanvas() {
    const canvas = document.getElementById('demo-waveform');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#666';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Click record to start demo', canvas.width / 2, canvas.height / 2);
}

function showDemoResults() {
    const results = document.getElementById('demo-results');
    const scoreValue = document.getElementById('demo-score');
    
    if (!results) return;
    
    // Generate demo score
    const demoScore = Math.floor(Math.random() * 20) + 75; // 75-95 range
    
    if (scoreValue) {
        scoreValue.textContent = demoScore;
    }
    
    // Update features list with random values
    const featuresList = document.getElementById('demo-features-list');
    if (featuresList) {
        featuresList.innerHTML = `
            <li>Voice Clarity: ${Math.floor(Math.random() * 15) + 80}%</li>
            <li>Pitch Stability: ${Math.floor(Math.random() * 15) + 75}%</li>
            <li>Voice Energy: ${Math.floor(Math.random() * 10) + 85}%</li>
            <li>Articulation: ${Math.floor(Math.random() * 12) + 82}%</li>
            <li>Vocal Smoothness: ${Math.floor(Math.random() * 18) + 78}%</li>
        `;
    }
    
    // Show results with animation
    results.classList.remove('hidden');
    results.style.animation = 'fadeInUp 0.6s ease-out';
    
    showSuccessMessage(`Demo analysis complete! Health score: ${demoScore}/100. View the full dashboard for comprehensive analytics.`);
}

// Home Page Functionality
function initializeHomePage() {
    setupHeroAnimations();
    setupCounterAnimations();
}

function setupHeroAnimations() {
    // Animate hero elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-badge, .hero h1, .hero-description, .hero-actions, .hero-stats').forEach(el => {
        observer.observe(el);
    });
}

function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = new Set(); // Track which counters have been animated
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated.has(entry.target)) {
                hasAnimated.add(entry.target);
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isNumber = target.includes('+') || target.includes(',');
    
    if (isNumber || isPercentage) {
        const finalValue = parseInt(target.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            
            if (target.includes('+')) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (target.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    }
}

// Theme Management - FIXED
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    console.log('Setting up theme toggle...');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('neuroaid-theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeToggleIcon(savedTheme);
    
    console.log('Theme toggle listener added');
}

function toggleTheme() {
    console.log('Theme toggle clicked');
    
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('neuroaid-theme', newTheme);
    updateThemeToggleIcon(newTheme);
    
    // Re-render dashboard elements if on dashboard page
    if (currentPage === 'dashboard') {
        setTimeout(() => {
            drawVoiceQualityGauge();
        }, 100);
    }
    
    showSuccessMessage(`Switched to ${newTheme} theme`);
    console.log('Theme changed to:', newTheme);
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Contact Page Functionality
function initializeContactPage() {
    console.log('Initializing contact page...');
    showSuccessMessage('Contact page loaded! Fill out the form to get in touch.');
}

function handleContactSubmission(e) {
    e.preventDefault();
    console.log('Contact form submitted');
    
    const inputs = e.target.querySelectorAll('input, textarea');
    const firstName = inputs[0]?.value || 'User';
    const lastName = inputs[1]?.value || '';
    const email = inputs[2]?.value || '';
    const organization = inputs[3]?.value || '';
    const message = inputs[4]?.value || '';
    
    console.log('Form data:', { firstName, lastName, email, organization, message });
    
    // Simulate form submission
    showLoadingMessage('Sending message...');
    
    setTimeout(() => {
        hideLoadingMessage();
        showSuccessMessage(`Thank you ${firstName}! Your message has been sent. We'll get back to you at ${email} soon.`);
        e.target.reset();
    }, 2000);
}

// Careers Page Functionality
function initializeCareersPage() {
    console.log('Initializing careers page...');
    showSuccessMessage('Careers page loaded! Click any "Apply Now" button to start your application.');
}

function handleJobApplication(jobIndex) {
    const jobTitles = [
        'Senior ML Engineer - Voice AI',
        'Clinical Research Scientist',
        'Senior Product Manager',
        'Senior Frontend Engineer'
    ];
    
    const jobTitle = jobTitles[jobIndex] || 'Position';
    
    showLoadingMessage(`Processing application for ${jobTitle}...`);
    
    setTimeout(() => {
        hideLoadingMessage();
        showSuccessMessage(`Thank you for your interest in the ${jobTitle} position! Please send your resume to gyanshri68@gmail.com with "${jobTitle} Application" in the subject line.`);
    }, 2000);
}

// Pricing Page Functionality
function initializePricingPage() {
    console.log('Initializing pricing page...');
    showSuccessMessage('Pricing page loaded! Choose a plan that fits your needs.');
}

function handlePricingAction(planIndex) {
    const plans = ['Personal', 'Professional', 'Enterprise'];
    const actions = ['Get Started Free', 'Start Trial', 'Contact Sales'];
    
    const planName = plans[planIndex] || 'Plan';
    const actionText = actions[planIndex] || 'Action';
    
    console.log(`Pricing action: ${planName} - ${actionText}`);
    
    if (planIndex === 0) {
        // Personal plan - free signup
        showPage('demo');
        showSuccessMessage('Welcome to NeuroAid Personal! Try our demo to get started.');
    } else if (planIndex === 1) {
        // Professional plan - trial
        showSuccessMessage(`Starting ${planName} trial! Contact gyanshri68@gmail.com to complete setup.`);
    } else {
        // Enterprise plan - contact sales
        showPage('contact');
        showSuccessMessage('Redirected to contact page for Enterprise consultation.');
    }
}

// Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up global event listeners...');
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any modals or stop recording
            if (isDemoRecording) {
                stopDemoRecording();
            }
            closeExportModal();
        }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        initializePage();
    });
    
    console.log('Global event listeners setup complete');
}

// Scroll Animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .job-card, .resource-card, .team-card, .platform-feature, .overview-card, .chart-card');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showSuccessMessage(message) {
    // Remove any existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function showErrorMessage(message) {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #EF4444;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.25);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function showLoadingMessage(message) {
    // Remove existing loading
    const existingLoading = document.querySelector('.loading-overlay');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        backdrop-filter: blur(4px);
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: var(--color-surface);
        color: var(--color-text);
        padding: 32px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        max-width: 300px;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid var(--color-border);
        border-top: 3px solid #1FB8CD;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px auto;
    `;
    
    const text = document.createElement('p');
    text.textContent = message;
    text.style.cssText = `
        margin: 0;
        color: var(--color-text);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
    `;
    
    content.appendChild(spinner);
    content.appendChild(text);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add spinner animation if not exists
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoadingMessage() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Export functions for global access
window.showPage = showPage;
window.showSuccessMessage = showSuccessMessage;
window.showErrorMessage = showErrorMessage;
window.toggleTheme = toggleTheme;
window.openExportModal = openExportModal;
window.closeExportModal = closeExportModal;
window.exportData = exportData;

// Performance monitoring
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

try {
    observer.observe({ entryTypes: ['navigation'] });
} catch (e) {
    console.log('Performance Observer not supported');
}

console.log('NeuroAid: Enhanced JavaScript loaded successfully with comprehensive analytics dashboard - ALL NAVIGATION FIXED');