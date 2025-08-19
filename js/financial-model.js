// Global variables to store model data
let modelData = {};
let assumptions = {};

// Initialize the model
function initializeModel() {
    loadAssumptions();
    updateModel();
    setupTabNavigation();
}

// Setup tab navigation
function setupTabNavigation() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
}

// Show specific tab
function showTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Load assumptions from input fields
function loadAssumptions() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        assumptions[input.id] = parseFloat(input.value) || 0;
    });
}

// Update model when assumptions change
function updateModel() {
    loadAssumptions();
    generateFinancialModel();
    generateDashboard();
}

// Generate the 24-month financial model
function generateFinancialModel() {
    const table = document.getElementById('financialModel');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Create header row
    const headerRow = table.insertRow();
    headerRow.className = 'category-header';
    headerRow.insertCell(0).textContent = 'Category';
    headerRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const cell = headerRow.insertCell();
        cell.textContent = `M${month}`;
        cell.style.textAlign = 'center';
    }
    
    // Revenue section
    addRevenueSection(table);
    
    // Cost sections
    addCostSection(table, 'Phase 1: Setup & Launch', 1, 6);
    addCostSection(table, 'Phase 2: Market Entry', 7, 18);
    addCostSection(table, 'Phase 3: Scale', 19, 24);
    
    // Summary rows
    addSummaryRows(table);
}

// Add revenue section to the table
function addRevenueSection(table) {
    // Revenue header
    const revenueHeader = table.insertRow();
    revenueHeader.className = 'phase-header';
    revenueHeader.insertCell(0).textContent = 'REVENUE';
    revenueHeader.insertCell(0).className = 'row-label';
    
    // Revenue calculations for each month
    const revenueRow = table.insertRow();
    revenueRow.insertCell(0).textContent = 'Total Revenue';
    revenueRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const revenue = calculateMonthlyRevenue(month);
        const cell = revenueRow.insertCell();
        cell.textContent = formatCurrency(revenue);
        cell.className = 'currency';
    }
}

// Add cost section to the table
function addCostSection(table, title, startMonth, endMonth) {
    // Section header
    const sectionHeader = table.insertRow();
    sectionHeader.className = 'phase-header';
    sectionHeader.insertCell(0).textContent = title;
    sectionHeader.insertCell(0).className = 'row-label';
    
    // Get costs for this phase
    const costs = getPhaseCosts(title);
    
    costs.forEach(cost => {
        const costRow = table.insertRow();
        costRow.insertCell(0).textContent = cost.label;
        costRow.insertCell(0).className = 'row-label';
        
        for (let month = 1; month <= 24; month++) {
            const amount = cost.calculate(month, startMonth, endMonth);
            const cell = costRow.insertCell();
            cell.textContent = formatCurrency(amount);
            if (amount > 0) cell.className = 'negative';
        }
    });
}

// Add summary rows to the table
function addSummaryRows(table) {
    // Total costs row
    const totalCostsRow = table.insertRow();
    totalCostsRow.className = 'subtotal-row';
    totalCostsRow.insertCell(0).textContent = 'Total Costs';
    totalCostsRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const totalCosts = calculateMonthlyCosts(month);
        const cell = totalCostsRow.insertCell();
        cell.textContent = formatCurrency(totalCosts);
        cell.className = 'negative';
    }
    
    // Net profit row
    const netProfitRow = table.insertRow();
    netProfitRow.className = 'total-row';
    netProfitRow.insertCell(0).textContent = 'Net Profit';
    netProfitRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const revenue = calculateMonthlyRevenue(month);
        const costs = calculateMonthlyCosts(month);
        const profit = revenue - costs;
        const cell = netProfitRow.insertCell();
        cell.textContent = formatCurrency(profit);
        cell.className = profit >= 0 ? 'currency' : 'negative';
    }
}

// Calculate monthly revenue
function calculateMonthlyRevenue(month) {
    const baseTransactions = assumptions.startingTransactions || 100;
    const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
    const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
    const monthlyTransactions = baseTransactions * quarterlyGrowth;
    const avgOrderValue = assumptions.averageOrderValue || 3000;
    
    return monthlyTransactions * avgOrderValue;
}

// Calculate monthly costs
function calculateMonthlyCosts(month) {
    let totalCosts = 0;
    
    // Phase 1 costs (M1-6)
    if (month >= 1 && month <= 6) {
        totalCosts += (assumptions.complianceOversightSalary || 0);
        totalCosts += (assumptions.adminAssistantSalary || 0);
        totalCosts += (assumptions.saasSubscriptionMonthly || 0);
        totalCosts += (assumptions.hostingSecurityP1Monthly || 0);
        
        // One-time costs in first month
        if (month === 1) {
            totalCosts += (assumptions.ncrLicenceOneoff || 0);
            totalCosts += (assumptions.legalSetupOneoff || 0);
            totalCosts += (assumptions.incorporationOneoff || 0);
        }
    }
    
    // Phase 2 costs (M7-18)
    if (month >= 7 && month <= 18) {
        totalCosts += (assumptions.creditCommitteeMemberStipend || 0) * 2; // Assuming 2 members
        totalCosts += (assumptions.csAgentSalary || 0) * (assumptions.csAgentsCountP2 || 2);
        totalCosts += (assumptions.merchantSuccessManagerSalary || 0);
        totalCosts += (assumptions.auditInsuranceMonthly || 0);
        totalCosts += (assumptions.officeP2Monthly || 0);
        totalCosts += (assumptions.officeItSuppliesMonthly || 0);
        
        // Variable costs based on volume
        const volume = calculateMonthlyVolume(month);
        totalCosts += volume.apiQueries * (assumptions.unitCostApiQuery || 0);
        totalCosts += volume.scoringQueries * (assumptions.unitCostScoringQuery || 0);
        totalCosts += volume.bureauChecks * (assumptions.unitCostBureauCheck || 0);
        totalCosts += volume.collectionsCases * (assumptions.unitCostCollectionsCase || 0);
        totalCosts += volume.notifications * (assumptions.unitCostNotification || 0);
        
        // Marketing and travel
        totalCosts += (assumptions.marketingBaseline || 0) * (assumptions.unitCostMarketing || 0);
        totalCosts += (assumptions.travelBaseline || 0) * (assumptions.unitCostTravel || 0);
    }
    
    // Phase 3 costs (M19-24)
    if (month >= 19 && month <= 24) {
        totalCosts += (assumptions.collectionsDeptMonthly || 0);
        totalCosts += (assumptions.customerServicePhase3Monthly || 0);
        totalCosts += (assumptions.hostingSecurityP3Monthly || 0);
        totalCosts += (assumptions.regReportingGovMonthly || 0);
        totalCosts += (assumptions.merchantTeamMonthly || 0);
        totalCosts += (assumptions.officeP3Monthly || 0);
        totalCosts += (assumptions.operationalSupportMonthly || 0);
        
        // One-time costs in month 19
        if (month === 19) {
            totalCosts += (assumptions.platformEnhancementsOneoff || 0);
        }
    }
    
    // Apply contingency
    totalCosts *= (1 + (assumptions.generalContingency || 5) / 100);
    
    return totalCosts;
}

// Calculate monthly volume for variable costs
function calculateMonthlyVolume(month) {
    const baseVolume = {
        apiQueries: assumptions.startVolApiQueries || 100,
        scoringQueries: assumptions.startVolScoringQueries || 100,
        bureauChecks: assumptions.startVolBureauChecks || 100,
        collectionsCases: assumptions.startVolCollectionsCases || 5,
        notifications: assumptions.startVolNotifications || 300
    };
    
    const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
    const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
    
    return {
        apiQueries: Math.round(baseVolume.apiQueries * quarterlyGrowth),
        scoringQueries: Math.round(baseVolume.scoringQueries * quarterlyGrowth),
        bureauChecks: Math.round(baseVolume.bureauChecks * quarterlyGrowth),
        collectionsCases: Math.round(baseVolume.collectionsCases * quarterlyGrowth),
        notifications: Math.round(baseVolume.notifications * quarterlyGrowth)
    };
}

// Get phase costs configuration
function getPhaseCosts(phaseTitle) {
    const costs = [];
    
    if (phaseTitle.includes('Phase 1')) {
        costs.push({
            label: 'Compliance Oversight',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.complianceOversightSalary || 0) : 0
        });
        costs.push({
            label: 'Admin Assistant',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.adminAssistantSalary || 0) : 0
        });
        costs.push({
            label: 'SaaS Subscription',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.saasSubscriptionMonthly || 0) : 0
        });
        costs.push({
            label: 'Hosting & Security',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.hostingSecurityP1Monthly || 0) : 0
        });
    }
    
    if (phaseTitle.includes('Phase 2')) {
        costs.push({
            label: 'Credit Committee',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.creditCommitteeMemberStipend || 0) * 2 : 0
        });
        costs.push({
            label: 'Customer Service',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.csAgentSalary || 0) * (assumptions.csAgentsCountP2 || 2) : 0
        });
        costs.push({
            label: 'Merchant Success Manager',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.merchantSuccessManagerSalary || 0) : 0
        });
        costs.push({
            label: 'Audit & Insurance',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.auditInsuranceMonthly || 0) : 0
        });
        costs.push({
            label: 'Office & IT',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.officeP2Monthly || 0) + (assumptions.officeItSuppliesMonthly || 0) : 0
        });
    }
    
    if (phaseTitle.includes('Phase 3')) {
        costs.push({
            label: 'Collections Department',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.collectionsDeptMonthly || 0) : 0
        });
        costs.push({
            label: 'Customer Service P3',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.customerServicePhase3Monthly || 0) : 0
        });
        costs.push({
            label: 'Hosting & Security P3',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.hostingSecurityP3Monthly || 0) : 0
        });
        costs.push({
            label: 'Regulatory & Governance',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.regReportingGovMonthly || 0) : 0
        });
        costs.push({
            label: 'Merchant Team',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.merchantTeamMonthly || 0) : 0
        });
        costs.push({
            label: 'Office P3',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.officeP3Monthly || 0) : 0
        });
        costs.push({
            label: 'Operational Support',
            calculate: (month, start, end) => month >= start && month <= end ? (assumptions.operationalSupportMonthly || 0) : 0
        });
    }
    
    return costs;
}

// Generate dashboard KPIs
function generateDashboard() {
    generateKPICards();
    generateSummaryTable();
}

// Generate KPI cards
function generateKPICards() {
    const dashboard = document.getElementById('dashboardKPIs');
    if (!dashboard) return;
    
    dashboard.innerHTML = '';
    
    // Calculate key metrics
    const month12Revenue = calculateMonthlyRevenue(12);
    const month24Revenue = calculateMonthlyRevenue(24);
    const month12Costs = calculateMonthlyCosts(12);
    const month24Costs = calculateMonthlyCosts(24);
    const month12Profit = month12Revenue - month12Costs;
    const month24Profit = month24Revenue - month24Costs;
    
    const kpis = [
        {
            title: 'Month 12 Revenue',
            value: formatCurrency(month12Revenue),
            change: 'Baseline'
        },
        {
            title: 'Month 24 Revenue',
            value: formatCurrency(month24Revenue),
            change: `${formatCurrency(month24Revenue - month12Revenue)}`
        },
        {
            title: 'Month 12 Profit',
            value: formatCurrency(month12Profit),
            change: month12Profit >= 0 ? 'Positive' : 'Negative'
        },
        {
            title: 'Month 24 Profit',
            value: formatCurrency(month24Profit),
            change: month24Profit >= 0 ? 'Positive' : 'Negative'
        }
    ];
    
    kpis.forEach(kpi => {
        const card = document.createElement('div');
        card.className = 'kpi-card';
        card.innerHTML = `
            <h4>${kpi.title}</h4>
            <div class="value">${kpi.value}</div>
            <div class="change">${kpi.change}</div>
        `;
        dashboard.appendChild(card);
    });
}

// Generate summary table
function generateSummaryTable() {
    const table = document.getElementById('summaryTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Header
    const headerRow = table.insertRow();
    headerRow.className = 'category-header';
    headerRow.insertCell(0).textContent = 'Metric';
    headerRow.insertCell(0).className = 'row-label';
    headerRow.insertCell(1).textContent = 'Month 12';
    headerRow.insertCell(2).textContent = 'Month 24';
    headerRow.insertCell(3).textContent = 'Change';
    
    // Revenue
    const revenueRow = table.insertRow();
    revenueRow.insertCell(0).textContent = 'Revenue';
    revenueRow.insertCell(0).className = 'row-label';
    revenueRow.insertCell(1).textContent = formatCurrency(calculateMonthlyRevenue(12));
    revenueRow.insertCell(2).textContent = formatCurrency(calculateMonthlyRevenue(24));
    revenueRow.insertCell(3).textContent = formatCurrency(calculateMonthlyRevenue(24) - calculateMonthlyRevenue(12));
    
    // Costs
    const costsRow = table.insertRow();
    costsRow.insertCell(0).textContent = 'Total Costs';
    costsRow.insertCell(0).className = 'row-label';
    costsRow.insertCell(1).textContent = formatCurrency(calculateMonthlyCosts(12));
    costsRow.insertCell(2).textContent = formatCurrency(calculateMonthlyCosts(24));
    costsRow.insertCell(3).textContent = formatCurrency(calculateMonthlyCosts(24) - calculateMonthlyCosts(12));
    
    // Profit
    const profitRow = table.insertRow();
    profitRow.className = 'total-row';
    profitRow.insertCell(0).textContent = 'Net Profit';
    profitRow.insertCell(0).className = 'row-label';
    const profit12 = calculateMonthlyRevenue(12) - calculateMonthlyCosts(12);
    const profit24 = calculateMonthlyRevenue(24) - calculateMonthlyCosts(24);
    profitRow.insertCell(1).textContent = formatCurrency(profit12);
    profitRow.insertCell(2).textContent = formatCurrency(profit24);
    profitRow.insertCell(3).textContent = formatCurrency(profit24 - profit12);
}

// Load predefined scenarios
function loadScenario(scenario) {
    const scenarios = {
        conservative: {
            quarterlyGrowth: 10,
            startingTransactions: 80,
            averageOrderValue: 2500,
            generalContingency: 8
        },
        aggressive: {
            quarterlyGrowth: 25,
            startingTransactions: 120,
            averageOrderValue: 3500,
            generalContingency: 3
        },
        market: {
            quarterlyGrowth: 15,
            startingTransactions: 100,
            averageOrderValue: 3000,
            generalContingency: 5
        }
    };
    
    const selectedScenario = scenarios[scenario];
    if (!selectedScenario) return;
    
    Object.keys(selectedScenario).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = selectedScenario[key];
        }
    });
    
    updateModel();
}

// Print functions
function printTab(tabName) {
    const content = document.getElementById(tabName);
    if (!content) return;
    
    content.classList.add('printing');
    window.print();
    content.classList.remove('printing');
}

function printCompleteModel() {
    // Show all tabs for printing
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('printing');
    });
    window.print();
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('printing');
    });
}

// Utility functions
function formatCurrency(amount) {
    if (amount === 0) return 'R 0';
    if (amount < 0) return `-R ${Math.abs(amount).toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModel);

// Add event listeners for input changes
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('change', updateModel);
        input.addEventListener('input', updateModel);
    });
});