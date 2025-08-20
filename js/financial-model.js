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
    updateRevenueCalculator();
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
    
    // Ongoing costs section (all phases)
    addOngoingCostsSection(table);
    
    // Additional cost items section (all phases)
    addAdditionalCostsSection(table);
    
    // Cost sections
    addCostSection(table, 'Phase 1: Setup & Launch', 1, 3);
    addCostSection(table, 'Phase 2: Market Entry', 4, 6);
    addCostSection(table, 'Phase 3: Scale', 7, 24);
    
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
    
    // Base transaction revenue
    const baseRevenueRow = table.insertRow();
    baseRevenueRow.insertCell(0).textContent = 'Base Transaction Revenue';
    baseRevenueRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const avgOrderValue = assumptions.averageOrderValue || 3000;
        const baseRevenue = monthlyTransactions * avgOrderValue;
        
        const cell = baseRevenueRow.insertCell();
        cell.textContent = formatRevenue(baseRevenue);
        cell.className = 'revenue';
    }
    
    // Initiation fees
    const initiationFeesRow = table.insertRow();
    initiationFeesRow.insertCell(0).textContent = 'Initiation Fees';
    initiationFeesRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const newCustomers = Math.round(monthlyTransactions * 0.2);
        const initiationFee = assumptions.initiationFee || 150;
        const initiationRevenue = newCustomers * initiationFee;
        
        const cell = initiationFeesRow.insertCell();
        cell.textContent = formatRevenue(initiationRevenue);
        cell.className = 'revenue';
    }
    
    // Service fees
    const serviceFeesRow = table.insertRow();
    serviceFeesRow.insertCell(0).textContent = 'Monthly Service Fees';
    serviceFeesRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const newCustomers = Math.round(monthlyTransactions * 0.2);
        const existingCustomers = monthlyTransactions - newCustomers;
        const monthlyServiceFee = assumptions.monthlyServiceFee || 25;
        const serviceRevenue = existingCustomers * monthlyServiceFee;
        
        const cell = serviceFeesRow.insertCell();
        cell.textContent = formatRevenue(serviceRevenue);
        cell.className = 'revenue';
    }
    
    // Merchant commission
    const merchantCommissionRow = table.insertRow();
    merchantCommissionRow.insertCell(0).textContent = 'Merchant Commission';
    merchantCommissionRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const avgOrderValue = assumptions.averageOrderValue || 3000;
        const merchantCommissionRate = (assumptions.merchantCommissionRate || 1.5) / 100;
        const commissionRevenue = (monthlyTransactions * avgOrderValue) * merchantCommissionRate;
        
        const cell = merchantCommissionRow.insertCell();
        cell.textContent = formatRevenue(commissionRevenue);
        cell.className = 'revenue';
    }
    
    // Interest income
    const interestIncomeRow = table.insertRow();
    interestIncomeRow.insertCell(0).textContent = 'Interest Income';
    interestIncomeRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const easyNowMix = (assumptions.easyNowMix || 30) / 100;
        const flexLineMix = (assumptions.flexLineMix || 15) / 100;
        const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
        const avgCreditAmount = (assumptions.averageOrderValue || 3000) * 0.8;
        const easyNowRate = (assumptions.easyNowRate || 24) / 100 / 12;
        const flexLineRate = (assumptions.flexLineRate || 22) / 100 / 12;
        
        const interestRevenue = (creditTransactions * easyNowMix * avgCreditAmount * easyNowRate) +
                               (creditTransactions * flexLineMix * avgCreditAmount * flexLineRate);
        
        const cell = interestIncomeRow.insertCell();
        cell.textContent = formatRevenue(interestRevenue);
        cell.className = 'revenue';
    }
    
    // Penalty and default charges
    const penaltyChargesRow = table.insertRow();
    penaltyChargesRow.insertCell(0).textContent = 'Penalty & Default Charges';
    penaltyChargesRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const lateDefaultRate = (assumptions.expectedLateDefaultRate || 8) / 100;
        const latePaymentPenalty = assumptions.latePaymentPenalty || 100;
        const defaultCharge = assumptions.defaultCharge || 250;
        const penaltyRevenue = monthlyTransactions * lateDefaultRate * (latePaymentPenalty + defaultCharge);
        
        const cell = penaltyChargesRow.insertCell();
        cell.textContent = formatRevenue(penaltyRevenue);
        cell.className = 'revenue';
    }
    
    // Total revenue row
    const totalRevenueRow = table.insertRow();
    totalRevenueRow.className = 'subtotal-row';
    totalRevenueRow.insertCell(0).textContent = 'Total Revenue';
    totalRevenueRow.insertCell(0).className = 'row-label';
    
    for (let month = 1; month <= 24; month++) {
        const revenue = calculateMonthlyRevenue(month);
        const cell = totalRevenueRow.insertCell();
        cell.textContent = formatRevenue(revenue);
        cell.className = 'revenue';
    }
}

// Add ongoing costs section to the table
function addOngoingCostsSection(table) {
    const ongoingCostsHeader = table.insertRow();
    ongoingCostsHeader.className = 'phase-header';
    ongoingCostsHeader.insertCell(0).textContent = 'ONGOING COSTS';
    ongoingCostsHeader.insertCell(0).className = 'row-label';

    const ongoingCostsRow = table.insertRow();
    ongoingCostsRow.insertCell(0).textContent = 'SaaS Subscription';
    ongoingCostsRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const saasCost = (assumptions.saasSubscriptionMonthly || 0);
        const cell = ongoingCostsRow.insertCell();
        cell.textContent = formatCurrency(saasCost);
        cell.className = 'negative';
    }

    const hostingCostsRow = table.insertRow();
    hostingCostsRow.insertCell(0).textContent = 'Hosting & Security';
    hostingCostsRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const hostingCost = (assumptions.hostingSecurityP1Monthly || 0);
        const cell = hostingCostsRow.insertCell();
        cell.textContent = formatCurrency(hostingCost);
        cell.className = 'negative';
    }
}

// Add additional cost items section to the table
function addAdditionalCostsSection(table) {
    const additionalCostsHeader = table.insertRow();
    additionalCostsHeader.className = 'phase-header';
    additionalCostsHeader.insertCell(0).textContent = 'ADDITIONAL COST ITEMS';
    additionalCostsHeader.insertCell(0).className = 'row-label';

    // Cost of capital
    const costOfCapitalRow = table.insertRow();
    costOfCapitalRow.insertCell(0).textContent = 'Cost of Capital';
    costOfCapitalRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const easyNowMix = (assumptions.easyNowMix || 30) / 100;
        const flexLineMix = (assumptions.flexLineMix || 15) / 100;
        const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
        const avgCreditAmount = (assumptions.averageOrderValue || 3000) * 0.8;
        const costOfCapitalRate = (assumptions.costOfCapitalRate || 12) / 100 / 12;
        const costOfCapital = creditTransactions * avgCreditAmount * costOfCapitalRate;
        
        const cell = costOfCapitalRow.insertCell();
        cell.textContent = formatCurrency(costOfCapital);
        cell.className = 'negative';
    }

    // Credit insurance premium
    const creditInsuranceRow = table.insertRow();
    creditInsuranceRow.insertCell(0).textContent = 'Credit Insurance Premium';
    creditInsuranceRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const insuranceCost = (assumptions.creditInsurancePremium || 0);
        const cell = creditInsuranceRow.insertCell();
        cell.textContent = formatCurrency(insuranceCost);
        cell.className = 'negative';
    }

    // Legal and collections costs
    const legalCollectionsRow = table.insertRow();
    legalCollectionsRow.insertCell(0).textContent = 'Legal & Collections';
    legalCollectionsRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const legalCost = (assumptions.legalCollectionsMonthly || 0);
        const cell = legalCollectionsRow.insertCell();
        cell.textContent = formatCurrency(legalCost);
        cell.className = 'negative';
    }

    // Recovery agency costs
    const recoveryAgencyRow = table.insertRow();
    recoveryAgencyRow.insertCell(0).textContent = 'Recovery Agency Costs';
    recoveryAgencyRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const recoveryCost = (assumptions.recoveryAgencyMonthly || 0);
        const cell = recoveryAgencyRow.insertCell();
        cell.textContent = formatCurrency(recoveryCost);
        cell.className = 'negative';
    }

    // Enhanced technology costs
    const enhancedTechRow = table.insertRow();
    enhancedTechRow.insertCell(0).textContent = 'Enhanced Technology';
    enhancedTechRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const techCost = (assumptions.enhancedTechMonthly || 0);
        const cell = enhancedTechRow.insertCell();
        cell.textContent = formatCurrency(techCost);
        cell.className = 'negative';
    }

    // Marketing and acquisition costs
    const marketingAcquisitionRow = table.insertRow();
    marketingAcquisitionRow.insertCell(0).textContent = 'Marketing & Acquisition';
    marketingAcquisitionRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const marketingCost = (assumptions.marketingAcquisitionMonthly || 0);
        const cell = marketingAcquisitionRow.insertCell();
        cell.textContent = formatCurrency(marketingCost);
        cell.className = 'negative';
    }

    // Compliance and regulatory costs
    const complianceRegulatoryRow = table.insertRow();
    complianceRegulatoryRow.insertCell(0).textContent = 'Compliance & Regulatory';
    complianceRegulatoryRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const complianceCost = (assumptions.complianceRegulatoryMonthly || 0);
        const cell = complianceRegulatoryRow.insertCell();
        cell.textContent = formatCurrency(complianceCost);
        cell.className = 'negative';
    }

    // Credit losses
    const creditLossesRow = table.insertRow();
    creditLossesRow.insertCell(0).textContent = 'Credit Losses / Bad Debt';
    creditLossesRow.insertCell(0).className = 'row-label';

    for (let month = 1; month <= 24; month++) {
        const baseTransactions = assumptions.startingTransactions || 100;
        const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
        const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
        const monthlyTransactions = baseTransactions * quarterlyGrowth;
        const easyNowMix = (assumptions.easyNowMix || 30) / 100;
        const flexLineMix = (assumptions.flexLineMix || 15) / 100;
        const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
        const avgCreditAmount = (assumptions.averageOrderValue || 3000) * 0.8;
        const creditLossRate = (assumptions.creditLossRate || 3) / 100;
        const creditLosses = creditTransactions * avgCreditAmount * creditLossRate;
        
        const cell = creditLossesRow.insertCell();
        cell.textContent = formatCurrency(creditLosses);
        cell.className = 'negative';
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
    
    // Base transaction revenue
    let totalRevenue = monthlyTransactions * avgOrderValue;
    
    // Additional revenue streams
    // 1. Initiation fees (only for new customers - assume 20% of transactions are new customers)
    const newCustomers = Math.round(monthlyTransactions * 0.2);
    const initiationFee = assumptions.initiationFee || 150;
    totalRevenue += newCustomers * initiationFee;
    
    // 2. Monthly service fees (for existing customers)
    const existingCustomers = monthlyTransactions - newCustomers;
    const monthlyServiceFee = assumptions.monthlyServiceFee || 25;
    totalRevenue += existingCustomers * monthlyServiceFee;
    
    // 3. Merchant commission (based on transaction volume)
    const merchantCommissionRate = (assumptions.merchantCommissionRate || 1.5) / 100;
    totalRevenue += (monthlyTransactions * avgOrderValue) * merchantCommissionRate;
    
    // 4. Penalty and default charges
    const lateDefaultRate = (assumptions.expectedLateDefaultRate || 8) / 100;
    const latePaymentPenalty = assumptions.latePaymentPenalty || 100;
    const defaultCharge = assumptions.defaultCharge || 250;
    const penaltyRevenue = monthlyTransactions * lateDefaultRate * (latePaymentPenalty + defaultCharge);
    totalRevenue += penaltyRevenue;
    
    // 5. Interest income (for credit products)
    const easyNowMix = (assumptions.easyNowMix || 30) / 100;
    const flexLineMix = (assumptions.flexLineMix || 15) / 100;
    const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
    const avgCreditAmount = avgOrderValue * 0.8; // Assume 80% of order value is credit
    const easyNowRate = (assumptions.easyNowRate || 24) / 100 / 12; // Monthly rate
    const flexLineRate = (assumptions.flexLineRate || 22) / 100 / 12; // Monthly rate
    
    const interestRevenue = (creditTransactions * easyNowMix * avgCreditAmount * easyNowRate) +
                           (creditTransactions * flexLineMix * avgCreditAmount * flexLineRate);
    totalRevenue += interestRevenue;
    
    return totalRevenue;
}

// Calculate monthly costs
function calculateMonthlyCosts(month) {
    let totalCosts = 0;
    
    // Ongoing costs (all phases)
    totalCosts += (assumptions.saasSubscriptionMonthly || 0);
    totalCosts += (assumptions.hostingSecurityP1Monthly || 0);
    
    // Phase 1 costs (M1-3)
    if (month >= 1 && month <= 3) {
        totalCosts += (assumptions.complianceOversightSalary || 0);
        totalCosts += (assumptions.adminAssistantSalary || 0);
        
        // One-time costs in first month
        if (month === 1) {
            totalCosts += (assumptions.ncrLicenceOneoff || 0);
            totalCosts += (assumptions.legalSetupOneoff || 0);
            totalCosts += (assumptions.incorporationOneoff || 0);
        }
    }
    
    // Phase 2 costs (M4-6)
    if (month >= 4 && month <= 6) {
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
    
    // Phase 3 costs (M7-24)
    if (month >= 7 && month <= 24) {
        totalCosts += (assumptions.collectionsDeptMonthly || 0);
        totalCosts += (assumptions.customerServicePhase3Monthly || 0);
        totalCosts += (assumptions.hostingSecurityP3Monthly || 0);
        totalCosts += (assumptions.regReportingGovMonthly || 0);
        totalCosts += (assumptions.merchantTeamMonthly || 0);
        totalCosts += (assumptions.officeP3Monthly || 0);
        totalCosts += (assumptions.operationalSupportMonthly || 0);
        
        // One-time costs in month 7 (start of Phase 3)
        if (month === 7) {
            totalCosts += (assumptions.platformEnhancementsOneoff || 0);
        }
    }
    
    // Additional cost items (all phases)
    // Cost of capital (based on outstanding credit)
    const baseTransactions = assumptions.startingTransactions || 100;
    const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
    const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
    const monthlyTransactions = baseTransactions * quarterlyGrowth;
    const avgOrderValue = assumptions.averageOrderValue || 3000;
    const easyNowMix = (assumptions.easyNowMix || 30) / 100;
    const flexLineMix = (assumptions.flexLineMix || 15) / 100;
    const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
    const avgCreditAmount = avgOrderValue * 0.8; // Assume 80% of order value is credit
    const costOfCapitalRate = (assumptions.costOfCapitalRate || 12) / 100 / 12; // Monthly rate
    const costOfCapital = creditTransactions * avgCreditAmount * costOfCapitalRate;
    totalCosts += costOfCapital;
    
    // Credit insurance premium
    totalCosts += (assumptions.creditInsurancePremium || 0);
    
    // Legal and collections costs
    totalCosts += (assumptions.legalCollectionsMonthly || 0);
    
    // Recovery agency costs
    totalCosts += (assumptions.recoveryAgencyMonthly || 0);
    
    // Enhanced technology costs
    totalCosts += (assumptions.enhancedTechMonthly || 0);
    
    // Marketing and acquisition costs
    totalCosts += (assumptions.marketingAcquisitionMonthly || 0);
    
    // Compliance and regulatory costs
    totalCosts += (assumptions.complianceRegulatoryMonthly || 0);
    
    // Credit losses (based on credit loss rate)
    const creditLossRate = (assumptions.creditLossRate || 3) / 100;
    const creditLosses = creditTransactions * avgCreditAmount * creditLossRate;
    totalCosts += creditLosses;
    
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
    generatePhaseBreakdowns();
}

// Generate phase breakdowns (now only examples and summary)
function generatePhaseBreakdowns() {
    generatePhaseSummaryTable();
}

// Phase 1 breakdown function removed - now using examples instead

// Generate KPI cards
function generateKPICards() {
    const dashboard = document.getElementById('dashboardKPIs');
    if (!dashboard) return;
    
    dashboard.innerHTML = '';
    
    // Calculate phase-specific metrics
    const phase1Revenue = calculatePhaseRevenue(1, 3);
    const phase2Revenue = calculatePhaseRevenue(4, 6);
    const phase3Revenue = calculatePhaseRevenue(7, 24);
    
    const phase1Costs = calculatePhaseCosts(1, 3);
    const phase2Costs = calculatePhaseCosts(4, 6);
    const phase3Costs = calculatePhaseCosts(7, 24);
    
    const phase1Profit = phase1Revenue - phase1Costs;
    const phase2Profit = phase2Revenue - phase2Costs;
    const phase3Profit = phase3Revenue - phase3Costs;
    
    const kpis = [
        {
            title: 'Phase 1: Setup & Launch',
            subtitle: 'Months 1-3 (Aug-Oct)',
            revenue: formatRevenue(phase1Revenue),
            costs: formatCurrency(phase1Costs),
            profit: formatCurrency(phase1Profit),
            status: phase1Profit >= 0 ? 'Positive' : 'Negative'
        },
        {
            title: 'Phase 2: Market Entry',
            subtitle: 'Months 4-6 (Nov-Jan)',
            revenue: formatRevenue(phase2Revenue),
            costs: formatCurrency(phase2Costs),
            profit: formatCurrency(phase2Profit),
            status: phase2Profit >= 0 ? 'Positive' : 'Negative'
        },
        {
            title: 'Phase 3: Scale',
            subtitle: 'Months 7-24 (Feb+)',
            revenue: formatRevenue(phase3Revenue),
            costs: formatCurrency(phase3Costs),
            profit: formatCurrency(phase3Profit),
            status: phase3Profit >= 0 ? 'Positive' : 'Negative'
        },
        {
            title: 'Total 24-Month',
            subtitle: 'Complete Projection',
            revenue: formatRevenue(phase1Revenue + phase2Revenue + phase3Revenue),
            costs: formatCurrency(phase1Costs + phase2Costs + phase3Costs),
            profit: formatCurrency(phase1Profit + phase2Profit + phase3Profit),
            status: (phase1Profit + phase2Profit + phase3Profit) >= 0 ? 'Positive' : 'Negative'
        }
    ];
    
    kpis.forEach(kpi => {
        const card = document.createElement('div');
        card.className = 'kpi-card phase-card';
        card.innerHTML = `
            <h4>${kpi.title}</h4>
            <div class="subtitle">${kpi.subtitle}</div>
            <div class="metrics">
                <div class="metric">
                    <span class="label">Revenue:</span>
                    <span class="value revenue">${kpi.revenue}</span>
                </div>
                <div class="metric">
                    <span class="label">Costs:</span>
                    <span class="value costs">${kpi.costs}</span>
                </div>
                <div class="metric">
                    <span class="label">Profit:</span>
                    <span class="value profit ${kpi.status.toLowerCase()}">${kpi.profit}</span>
                </div>
            </div>
        `;
        dashboard.appendChild(card);
    });
}

// Calculate revenue for a specific phase
function calculatePhaseRevenue(startMonth, endMonth) {
    let totalRevenue = 0;
    for (let month = startMonth; month <= endMonth; month++) {
        totalRevenue += calculateMonthlyRevenue(month);
    }
    return totalRevenue;
}

// Calculate costs for a specific phase
function calculatePhaseCosts(startMonth, endMonth) {
    let totalCosts = 0;
    for (let month = startMonth; month <= endMonth; month++) {
        totalCosts += calculateMonthlyCosts(month);
    }
    return totalCosts;
}

// Generate summary table
function generateSummaryTable() {
    const table = document.getElementById('summaryTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Header
    const headerRow = table.insertRow();
    headerRow.className = 'category-header';
    headerRow.insertCell(0).textContent = 'Phase / Metric';
    headerRow.insertCell(0).className = 'row-label';
    headerRow.insertCell(1).textContent = 'Revenue';
    headerRow.insertCell(2).textContent = 'Costs';
    headerRow.insertCell(3).textContent = 'Profit';
    headerRow.insertCell(4).textContent = 'Profit Margin %';
    
    // Phase 1 Summary
    const phase1Revenue = calculatePhaseRevenue(1, 3);
    const phase1Costs = calculatePhaseCosts(1, 3);
    const phase1Profit = phase1Revenue - phase1Costs;
    const phase1Margin = phase1Revenue > 0 ? ((phase1Profit / phase1Revenue) * 100) : 0;
    
    const phase1Row = table.insertRow();
    phase1Row.className = 'phase-summary-row';
    phase1Row.insertCell(0).textContent = 'Phase 1: Setup & Launch (M1-3)';
    phase1Row.insertCell(0).className = 'row-label phase-label';
    phase1Row.insertCell(1).textContent = formatRevenue(phase1Revenue);
    phase1Row.insertCell(2).textContent = formatCurrency(phase1Costs);
    phase1Row.insertCell(3).textContent = formatCurrency(phase1Profit);
    phase1Row.insertCell(4).textContent = `${phase1Margin.toFixed(1)}%`;
    
    // Phase 2 Summary
    const phase2Revenue = calculatePhaseRevenue(4, 6);
    const phase2Costs = calculatePhaseCosts(4, 6);
    const phase2Profit = phase2Revenue - phase2Costs;
    const phase2Margin = phase2Revenue > 0 ? ((phase2Profit / phase2Revenue) * 100) : 0;
    
    const phase2Row = table.insertRow();
    phase2Row.className = 'phase-summary-row';
    phase2Row.insertCell(0).textContent = 'Phase 2: Market Entry (M4-6)';
    phase2Row.insertCell(0).className = 'row-label phase-label';
    phase2Row.insertCell(1).textContent = formatRevenue(phase2Revenue);
    phase2Row.insertCell(2).textContent = formatCurrency(phase2Costs);
    phase2Row.insertCell(3).textContent = formatCurrency(phase2Profit);
    phase2Row.insertCell(4).textContent = `${phase2Margin.toFixed(1)}%`;
    
    // Phase 3 Summary
    const phase3Revenue = calculatePhaseRevenue(7, 24);
    const phase3Costs = calculatePhaseCosts(7, 24);
    const phase3Profit = phase3Revenue - phase3Costs;
    const phase3Margin = phase3Revenue > 0 ? ((phase3Profit / phase3Revenue) * 100) : 0;
    
    const phase3Row = table.insertRow();
    phase3Row.className = 'phase-summary-row';
    phase3Row.insertCell(0).textContent = 'Phase 3: Scale (M7-24)';
    phase3Row.insertCell(0).className = 'row-label phase-label';
    phase3Row.insertCell(1).textContent = formatRevenue(phase3Revenue);
    phase3Row.insertCell(2).textContent = formatCurrency(phase3Costs);
    phase3Row.insertCell(3).textContent = formatCurrency(phase3Profit);
    phase3Row.insertCell(4).textContent = `${phase3Margin.toFixed(1)}%`;
    
    // Total Summary
    const totalRevenue = phase1Revenue + phase2Revenue + phase3Revenue;
    const totalCosts = phase1Costs + phase2Costs + phase3Costs;
    const totalProfit = totalRevenue - totalCosts;
    const totalMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100) : 0;
    
    const totalRow = table.insertRow();
    totalRow.className = 'total-row';
    totalRow.insertCell(0).textContent = 'TOTAL 24-MONTH PROJECTION';
    totalRow.insertCell(0).className = 'row-label total-label';
    totalRow.insertCell(1).textContent = formatRevenue(totalRevenue);
    totalRow.insertCell(2).textContent = formatCurrency(totalCosts);
    totalRow.insertCell(3).textContent = formatCurrency(totalProfit);
    totalRow.insertCell(4).textContent = `${totalMargin.toFixed(1)}%`;
}

// Phase 2 breakdown function removed - now using examples instead

// Phase 3 breakdown function removed - now using examples instead

// Generate Phase Summary Table
function generatePhaseSummaryTable() {
    const table = document.getElementById('phaseSummaryTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Header
    const headerRow = table.insertRow();
    headerRow.className = 'category-header';
    headerRow.insertCell(0).textContent = 'Phase / Metric';
    headerRow.insertCell(0).className = 'row-label';
    headerRow.insertCell(1).textContent = 'Revenue';
    headerRow.insertCell(2).textContent = 'Costs';
    headerRow.insertCell(3).textContent = 'Profit';
    headerRow.insertCell(4).textContent = 'Profit Margin %';
    
    // Phase 1 Summary
    const phase1Revenue = calculatePhaseRevenue(1, 3);
    const phase1Costs = calculatePhaseCosts(1, 3);
    const phase1Profit = phase1Revenue - phase1Costs;
    const phase1Margin = phase1Revenue > 0 ? ((phase1Profit / phase1Revenue) * 100) : 0;
    
    const phase1Row = table.insertRow();
    phase1Row.className = 'phase-summary-row';
    phase1Row.insertCell(0).textContent = 'Phase 1: Setup & Launch (M1-3)';
    phase1Row.insertCell(0).className = 'row-label phase-label';
    phase1Row.insertCell(1).textContent = formatRevenue(phase1Revenue);
    phase1Row.insertCell(2).textContent = formatCurrency(phase1Costs);
    phase1Row.insertCell(3).textContent = formatCurrency(phase1Profit);
    phase1Row.insertCell(4).textContent = `${phase1Margin.toFixed(1)}%`;
    
    // Phase 2 Summary
    const phase2Revenue = calculatePhaseRevenue(4, 6);
    const phase2Costs = calculatePhaseCosts(4, 6);
    const phase2Profit = phase2Revenue - phase2Costs;
    const phase2Margin = phase2Revenue > 0 ? ((phase2Profit / phase2Revenue) * 100) : 0;
    
    const phase2Row = table.insertRow();
    phase2Row.className = 'phase-summary-row';
    phase2Row.insertCell(0).textContent = 'Phase 2: Market Entry (M4-6)';
    phase2Row.insertCell(0).className = 'row-label phase-label';
    phase2Row.insertCell(1).textContent = formatRevenue(phase2Revenue);
    phase2Row.insertCell(2).textContent = formatCurrency(phase2Costs);
    phase2Row.insertCell(3).textContent = formatCurrency(phase2Profit);
    phase2Row.insertCell(4).textContent = `${phase2Margin.toFixed(1)}%`;
    
    // Phase 3 Summary
    const phase3Revenue = calculatePhaseRevenue(7, 24);
    const phase3Costs = calculatePhaseCosts(7, 24);
    const phase3Profit = phase3Revenue - phase3Costs;
    const phase3Margin = phase3Revenue > 0 ? ((phase3Profit / phase3Revenue) * 100) : 0;
    
    const phase3Row = table.insertRow();
    phase3Row.className = 'phase-summary-row';
    phase3Row.insertCell(0).textContent = 'Phase 3: Scale (M7-24)';
    phase3Row.insertCell(0).className = 'row-label phase-label';
    phase3Row.insertCell(1).textContent = formatRevenue(phase3Revenue);
    phase3Row.insertCell(2).textContent = formatCurrency(phase3Costs);
    phase3Row.insertCell(3).textContent = formatCurrency(phase3Profit);
    phase3Row.insertCell(4).textContent = `${phase3Margin.toFixed(1)}%`;
    
    // Total Summary
    const totalRevenue = phase1Revenue + phase2Revenue + phase3Revenue;
    const totalCosts = phase1Costs + phase2Costs + phase3Costs;
    const totalProfit = totalRevenue - totalCosts;
    const totalMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100) : 0;
    
    const totalRow = table.insertRow();
    totalRow.className = 'total-row';
    totalRow.insertCell(0).textContent = 'TOTAL 24-MONTH PROJECTION';
    totalRow.insertCell(0).className = 'row-label total-label';
    totalRow.insertCell(1).textContent = formatRevenue(totalRevenue);
    totalRow.insertCell(2).textContent = formatCurrency(totalCosts);
    totalRow.insertCell(3).textContent = formatCurrency(totalProfit);
    totalRow.insertCell(4).textContent = `${totalMargin.toFixed(1)}%`;
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
    if (amount === 0) return '0';
    if (amount < 0) return `-${Math.abs(amount).toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    return `${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatRevenue(amount) {
    if (amount === 0) return '0';
    if (amount < 0) return `-${Math.abs(amount).toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    return `${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModel);

// Update revenue calculator display
function updateRevenueCalculator() {
    const startingTransactions = assumptions.startingTransactions || 100;
    const growthRate = (assumptions.quarterlyGrowth || 15) / 100;
    const avgOrderValue = assumptions.averageOrderValue || 3000;
    
    // Calculate transactions for each phase
    const phase1Transactions = startingTransactions;
    const phase2Transactions = Math.round(startingTransactions * Math.pow(1 + growthRate, 1));
    const phase3Transactions = Math.round(startingTransactions * Math.pow(1 + growthRate, 2));
    const phase3bTransactions = Math.round(startingTransactions * Math.pow(1 + growthRate, 3));
    
    // Calculate base revenue for each phase
    const phase1BaseRevenue = phase1Transactions * avgOrderValue;
    const phase2BaseRevenue = phase2Transactions * avgOrderValue;
    const phase3BaseRevenue = phase3Transactions * avgOrderValue;
    const phase3bBaseRevenue = phase3bTransactions * avgOrderValue;
    
    // Calculate additional revenue streams
    const initiationFee = assumptions.initiationFee || 150;
    const monthlyServiceFee = assumptions.monthlyServiceFee || 25;
    const merchantCommissionRate = (assumptions.merchantCommissionRate || 1.5) / 100;
    const lateDefaultRate = (assumptions.expectedLateDefaultRate || 8) / 100;
    const latePaymentPenalty = assumptions.latePaymentPenalty || 100;
    const defaultCharge = assumptions.defaultCharge || 250;
    
    // Calculate total revenue including all streams
    const phase1Revenue = calculateMonthlyRevenue(1);
    const phase2Revenue = calculateMonthlyRevenue(4);
    const phase3Revenue = calculateMonthlyRevenue(7);
    const phase3bRevenue = calculateMonthlyRevenue(13);
    
    // Update display elements
    const elements = {
        'phase1Transactions': phase1Transactions,
        'phase2Transactions': phase2Transactions,
        'phase3Transactions': phase3Transactions,
        'phase3bTransactions': phase3bTransactions,
        'phase1Revenue': formatRevenue(phase1Revenue),
        'phase2Revenue': formatRevenue(phase2Revenue),
        'phase3Revenue': formatRevenue(phase3Revenue),
        'phase3bRevenue': formatRevenue(phase3bRevenue),
        'currentOrderValue': avgOrderValue.toLocaleString('en-ZA'),
        'currentGrowthRate': (growthRate * 100).toFixed(0)
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

// Add event listeners for input changes
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('change', updateModel);
        input.addEventListener('input', updateModel);
    });
});