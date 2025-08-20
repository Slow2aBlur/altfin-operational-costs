'use client';

import { useMemo } from 'react';

interface Assumptions {
  [key: string]: number;
}

interface FinancialModelProps {
  assumptions: Assumptions;
}

export default function FinancialModel({ assumptions }: FinancialModelProps) {
  // Helper functions defined at the top
  function formatCurrency(amount: number): string {
    // Use a consistent number formatting approach that works the same on server and client
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return amount < 0 ? `-R${formatted}` : `R${formatted}`;
  }

  function calculateSum(values: (string | number)[]): number {
    return values.reduce((sum: number, val: string | number) => {
      if (typeof val === 'string') {
        return sum + (parseFloat(val.replace(/[^\d.-]/g, '')) || 0);
      }
      return sum + val;
    }, 0);
  }

  const financialModel = useMemo(() => {
    return generateFinancialModel(assumptions);
  }, [assumptions]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">24-Month Financial Model</h2>
        <p className="text-gray-600">
          Detailed monthly breakdown of revenue, costs, and profit projections based on current assumptions.
        </p>
      </div>

      {/* Financial Model Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Financial Projections</h3>
          <p className="text-sm text-gray-600 mt-1">Scroll horizontally to view all 24 months</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Category
                </th>
                {Array.from({ length: 24 }, (_, i) => (
                  <th key={i + 1} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    M{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialModel.map((row, rowIndex) => (
                <tr key={rowIndex} className={row.className}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium sticky left-0 z-10 ${
                    row.className === 'bg-blue-600 text-white' ? 'bg-blue-600 text-white' : 'bg-white'
                  }`}>
                    {row.label}
                  </td>
                  {row.values.map((value, colIndex) => (
                    <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-center min-w-[100px] ${
                      row.className === 'bg-blue-600 text-white' ? 'text-white' :
                      (typeof value === 'number' && value < 0) ? 'text-red-600' :
                      row.label.includes('Revenue') || row.label.includes('Total Revenue') ? 'text-green-600' :
                      'text-gray-900'
                    }`}>
                      {typeof value === 'number' ? formatCurrency(value) : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Revenue:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(calculateSum(financialModel.find(row => row.label === 'Total Revenue')?.values || []))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Monthly:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(calculateSum(financialModel.find(row => row.label === 'Total Revenue')?.values || []) / 24)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Costs:</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(calculateSum(financialModel.find(row => row.label === 'Total Costs')?.values || []))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Monthly:</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(calculateSum(financialModel.find(row => row.label === 'Total Costs')?.values || []) / 24)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Profit Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Profit:</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(calculateSum(financialModel.find(row => row.label === 'Net Profit')?.values || []))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Monthly:</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(calculateSum(financialModel.find(row => row.label === 'Net Profit')?.values || []) / 24)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function generateFinancialModel(assumptions: Assumptions) {
  const model: Array<{
    label: string;
    values: (string | number)[];
    className: string;
  }> = [];

  // Revenue section
  model.push({
    label: 'REVENUE',
    values: Array(24).fill(''),
    className: 'bg-blue-600 text-white'
  });

  // Base transaction revenue
  const baseRevenueRow = {
    label: 'Base Transaction Revenue',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const avgOrderValue = assumptions.averageOrderValue || 3000;
      return monthlyTransactions * avgOrderValue;
    }),
    className: 'bg-white'
  };
  model.push(baseRevenueRow);

  // Initiation fees
  const initiationFeesRow = {
    label: 'Initiation Fees',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const newCustomers = Math.round(monthlyTransactions * 0.2);
      const initiationFee = assumptions.initiationFee || 150;
      return newCustomers * initiationFee;
    }),
    className: 'bg-white'
  };
  model.push(initiationFeesRow);

  // Service fees
  const serviceFeesRow = {
    label: 'Monthly Service Fees',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const newCustomers = Math.round(monthlyTransactions * 0.2);
      const existingCustomers = monthlyTransactions - newCustomers;
      const monthlyServiceFee = assumptions.monthlyServiceFee || 25;
      return existingCustomers * monthlyServiceFee;
    }),
    className: 'bg-white'
  };
  model.push(serviceFeesRow);

  // Merchant commission
  const merchantCommissionRow = {
    label: 'Merchant Commission',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const avgOrderValue = assumptions.averageOrderValue || 3000;
      const merchantCommissionRate = (assumptions.merchantCommissionRate || 1.5) / 100;
      return (monthlyTransactions * avgOrderValue) * merchantCommissionRate;
    }),
    className: 'bg-white'
  };
  model.push(merchantCommissionRow);

  // Interest income
  const interestIncomeRow = {
    label: 'Interest Income',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const easyNowMix = (assumptions.easyNowMix || 30) / 100;
      const flexLineMix = (assumptions.flexLineMix || 15) / 100;
      const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
      const avgCreditAmount = (assumptions.averageOrderValue || 3000) * 0.8;
      const easyNowRate = (assumptions.easyNowRate || 24) / 100 / 12;
      const flexLineRate = (assumptions.flexLineRate || 22) / 100 / 12;
      
      return (creditTransactions * easyNowMix * avgCreditAmount * easyNowRate) +
             (creditTransactions * flexLineMix * avgCreditAmount * flexLineRate);
    }),
    className: 'bg-white'
  };
  model.push(interestIncomeRow);

  // Penalty and default charges
  const penaltyChargesRow = {
    label: 'Penalty & Default Charges',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const lateDefaultRate = (assumptions.expectedLateDefaultRate || 8) / 100;
      const latePaymentPenalty = assumptions.latePaymentPenalty || 100;
      const defaultCharge = assumptions.defaultCharge || 250;
      return monthlyTransactions * lateDefaultRate * (latePaymentPenalty + defaultCharge);
    }),
    className: 'bg-white'
  };
  model.push(penaltyChargesRow);

  // Total revenue
  const totalRevenueRow = {
    label: 'Total Revenue',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return calculateMonthlyRevenue(monthNum, assumptions);
    }),
    className: 'bg-gray-100 font-semibold'
  };
  model.push(totalRevenueRow);

  // Ongoing costs section
  model.push({
    label: 'ONGOING COSTS',
    values: Array(24).fill(''),
    className: 'bg-blue-600 text-white'
  });

  // SaaS subscription
  const saasRow = {
    label: 'SaaS Subscription',
    values: Array(24).fill(assumptions.saasSubscriptionMonthly || 0),
    className: 'bg-white'
  };
  model.push(saasRow);

  // Hosting & security
  const hostingRow = {
    label: 'Hosting & Security',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum <= 3 ? (assumptions.hostingSecurityP1Monthly || 0) : (assumptions.hostingSecurityP3Monthly || 0);
    }),
    className: 'bg-white'
  };
  model.push(hostingRow);

  // Additional cost items section
  model.push({
    label: 'ADDITIONAL COST ITEMS',
    values: Array(24).fill(''),
    className: 'bg-blue-600 text-white'
  });

  // Cost of capital
  const costOfCapitalRow = {
    label: 'Cost of Capital',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const easyNowMix = (assumptions.easyNowMix || 30) / 100;
      const flexLineMix = (assumptions.flexLineMix || 15) / 100;
      const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
      const avgCreditAmount = (assumptions.averageOrderValue || 3000) * 0.8;
      const costOfCapitalRate = (assumptions.costOfCapitalRate || 12) / 100 / 12;
      return creditTransactions * avgCreditAmount * costOfCapitalRate;
    }),
    className: 'bg-white'
  };
  model.push(costOfCapitalRow);

  // Credit insurance premium
  const creditInsuranceRow = {
    label: 'Credit Insurance Premium',
    values: Array(24).fill(assumptions.creditInsurancePremium || 0),
    className: 'bg-white'
  };
  model.push(creditInsuranceRow);

  // Legal and collections
  const legalCollectionsRow = {
    label: 'Legal & Collections',
    values: Array(24).fill(assumptions.legalCollectionsMonthly || 0),
    className: 'bg-white'
  };
  model.push(legalCollectionsRow);

  // Recovery agency
  const recoveryAgencyRow = {
    label: 'Recovery Agency Costs',
    values: Array(24).fill(assumptions.recoveryAgencyMonthly || 0),
    className: 'bg-white'
  };
  model.push(recoveryAgencyRow);

  // Enhanced technology
  const enhancedTechRow = {
    label: 'Enhanced Technology',
    values: Array(24).fill(assumptions.enhancedTechMonthly || 0),
    className: 'bg-white'
  };
  model.push(enhancedTechRow);

  // Marketing and acquisition
  const marketingAcquisitionRow = {
    label: 'Marketing & Acquisition',
    values: Array(24).fill(assumptions.marketingAcquisitionMonthly || 0),
    className: 'bg-white'
  };
  model.push(marketingAcquisitionRow);

  // Compliance and regulatory
  const complianceRegulatoryRow = {
    label: 'Compliance & Regulatory',
    values: Array(24).fill(assumptions.complianceRegulatoryMonthly || 0),
    className: 'bg-white'
  };
  model.push(complianceRegulatoryRow);

  // Credit losses
  const creditLossesRow = {
    label: 'Credit Losses / Bad Debt',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const baseTransactions = assumptions.startingTransactions || 100;
      const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
      const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((monthNum - 1) / 3));
      const monthlyTransactions = baseTransactions * quarterlyGrowth;
      const easyNowMix = (assumptions.easyNowMix || 30) / 100;
      const flexLineMix = (assumptions.flexLineMix || 15) / 100;
      const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
      const avgCreditAmount = (assumptions.averageOrderValue || 3000) * 0.8;
      const creditLossRate = (assumptions.creditLossRate || 3) / 100;
      return creditTransactions * avgCreditAmount * creditLossRate;
    }),
    className: 'bg-white'
  };
  model.push(creditLossesRow);

  // Phase 1 costs
  model.push({
    label: 'Phase 1: Setup & Launch',
    values: Array(24).fill(''),
    className: 'bg-blue-600 text-white'
  });

  // Compliance oversight
  const complianceOversightRow = {
    label: 'Compliance Oversight',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 1 && monthNum <= 3 ? (assumptions.complianceOversightSalary || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(complianceOversightRow);

  // Admin assistant
  const adminAssistantRow = {
    label: 'Admin Assistant',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 1 && monthNum <= 3 ? (assumptions.adminAssistantSalary || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(adminAssistantRow);

  // One-time costs in month 1
  const oneTimeCostsRow = {
    label: 'One-time Setup Costs (M1)',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      if (monthNum === 1) {
        return (assumptions.ncrLicenceOneoff || 0) + (assumptions.legalSetupOneoff || 0) + (assumptions.incorporationOneoff || 0);
      }
      return 0;
    }),
    className: 'bg-white'
  };
  model.push(oneTimeCostsRow);

  // Phase 2 costs
  model.push({
    label: 'Phase 2: Market Entry',
    values: Array(24).fill(''),
    className: 'bg-blue-600 text-white'
  });

  // Credit committee
  const creditCommitteeRow = {
    label: 'Credit Committee',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 4 && monthNum <= 6 ? (assumptions.creditCommitteeMemberStipend || 0) * 2 : 0;
    }),
    className: 'bg-white'
  };
  model.push(creditCommitteeRow);

  // Customer service
  const customerServiceRow = {
    label: 'Customer Service',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 4 && monthNum <= 6 ? (assumptions.csAgentSalary || 0) * (assumptions.csAgentsCountP2 || 2) : 0;
    }),
    className: 'bg-white'
  };
  model.push(customerServiceRow);

  // Merchant success manager
  const merchantSuccessRow = {
    label: 'Merchant Success Manager',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 4 && monthNum <= 6 ? (assumptions.merchantSuccessManagerSalary || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(merchantSuccessRow);

  // Audit & insurance
  const auditInsuranceRow = {
    label: 'Audit & Insurance',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 4 && monthNum <= 6 ? (assumptions.auditInsuranceMonthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(auditInsuranceRow);

  // Office & IT
  const officeItRow = {
    label: 'Office & IT',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 4 && monthNum <= 6 ? (assumptions.officeP2Monthly || 0) + (assumptions.officeItSuppliesMonthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(officeItRow);

  // Variable costs
  const variableCostsRow = {
    label: 'Variable Costs (API, Scoring, etc.)',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      if (monthNum >= 4 && monthNum <= 6) {
        const volume = calculateMonthlyVolume(monthNum, assumptions);
        return volume.apiQueries * (assumptions.unitCostApiQuery || 0) +
               volume.scoringQueries * (assumptions.unitCostScoringQuery || 0) +
               volume.bureauChecks * (assumptions.unitCostBureauCheck || 0) +
               volume.collectionsCases * (assumptions.unitCostCollectionsCase || 0) +
               volume.notifications * (assumptions.unitCostNotification || 0);
      }
      return 0;
    }),
    className: 'bg-white'
  };
  model.push(variableCostsRow);

  // Marketing and travel
  const marketingTravelRow = {
    label: 'Marketing & Travel',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 4 && monthNum <= 6 ? 
        (assumptions.marketingBaseline || 0) * (assumptions.unitCostMarketing || 0) +
        (assumptions.travelBaseline || 0) * (assumptions.unitCostTravel || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(marketingTravelRow);

  // Phase 3 costs
  model.push({
    label: 'Phase 3: Scale',
    values: Array(24).fill(''),
    className: 'bg-blue-600 text-white'
  });

  // Collections department
  const collectionsDeptRow = {
    label: 'Collections Department',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 7 && monthNum <= 24 ? (assumptions.collectionsDeptMonthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(collectionsDeptRow);

  // Customer service P3
  const customerServiceP3Row = {
    label: 'Customer Service P3',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 7 && monthNum <= 24 ? (assumptions.customerServicePhase3Monthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(customerServiceP3Row);

  // Regulatory & governance
  const regReportingRow = {
    label: 'Regulatory & Governance',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 7 && monthNum <= 24 ? (assumptions.regReportingGovMonthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(regReportingRow);

  // Merchant team
  const merchantTeamRow = {
    label: 'Merchant Team',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 7 && monthNum <= 24 ? (assumptions.merchantTeamMonthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(merchantTeamRow);

  // Office P3
  const officeP3Row = {
    label: 'Office P3',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 7 && monthNum <= 24 ? (assumptions.officeP3Monthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(officeP3Row);

  // Operational support
  const operationalSupportRow = {
    label: 'Operational Support',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum >= 7 && monthNum <= 24 ? (assumptions.operationalSupportMonthly || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(operationalSupportRow);

  // Platform enhancements
  const platformEnhancementsRow = {
    label: 'Platform Enhancements (M7)',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return monthNum === 7 ? (assumptions.platformEnhancementsOneoff || 0) : 0;
    }),
    className: 'bg-white'
  };
  model.push(platformEnhancementsRow);

  // Total costs
  const totalCostsRow = {
    label: 'Total Costs',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      return calculateMonthlyCosts(monthNum, assumptions);
    }),
    className: 'bg-gray-100 font-semibold'
  };
  model.push(totalCostsRow);

  // Net profit
  const netProfitRow = {
    label: 'Net Profit',
    values: Array.from({ length: 24 }, (_, month) => {
      const monthNum = month + 1;
      const revenue = calculateMonthlyRevenue(monthNum, assumptions);
      const costs = calculateMonthlyCosts(monthNum, assumptions);
      return revenue - costs;
    }),
    className: 'bg-gray-900 text-white font-bold'
  };
  model.push(netProfitRow);

  return model;
}

// Helper functions (same as in Dashboard component)
function calculateMonthlyRevenue(month: number, assumptions: Assumptions): number {
  // ONLY the transaction volume grows at 3% per quarter
  const baseTransactions = assumptions.startingTransactions || 100;
  const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
  const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
  const monthlyTransactions = Math.round(baseTransactions * quarterlyGrowth);
  
  // All revenue components use the growing transaction count but have NO other growth
  const avgOrderValue = assumptions.averageOrderValue || 3000;
  
  // Base transaction revenue - grows only due to transaction volume
  let totalRevenue = monthlyTransactions * avgOrderValue;
  
  // Additional revenue streams - grow only due to transaction volume
  const newCustomers = Math.round(monthlyTransactions * 0.2);
  const initiationFee = assumptions.initiationFee || 150;
  totalRevenue += newCustomers * initiationFee;
  
  const existingCustomers = monthlyTransactions - newCustomers;
  const monthlyServiceFee = assumptions.monthlyServiceFee || 25;
  totalRevenue += existingCustomers * monthlyServiceFee;
  
  const merchantCommissionRate = (assumptions.merchantCommissionRate || 1.5) / 100;
  totalRevenue += (monthlyTransactions * avgOrderValue) * merchantCommissionRate;
  
  const lateDefaultRate = (assumptions.expectedLateDefaultRate || 8) / 100;
  const latePaymentPenalty = assumptions.latePaymentPenalty || 100;
  const defaultCharge = assumptions.defaultCharge || 250;
  const penaltyRevenue = monthlyTransactions * lateDefaultRate * (latePaymentPenalty + defaultCharge);
  totalRevenue += penaltyRevenue;
  
  // Interest income - FIXED: correctly calculate product mix
  const easyNowMix = (assumptions.easyNowMix || 30) / 100;
  const flexLineMix = (assumptions.flexLineMix || 15) / 100;
  const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
  const avgCreditAmount = avgOrderValue * 0.8;
  const easyNowRate = (assumptions.easyNowRate || 24) / 100 / 12;
  const flexLineRate = (assumptions.flexLineRate || 22) / 100 / 12;
  
  // CORRECT calculation: apply mix percentages to the total credit transactions
  const easyNowTransactions = Math.round(creditTransactions * (easyNowMix / (easyNowMix + flexLineMix)));
  const flexLineTransactions = Math.round(creditTransactions * (flexLineMix / (easyNowMix + flexLineMix)));
  
  const interestRevenue = (easyNowTransactions * avgCreditAmount * easyNowRate) +
                         (flexLineTransactions * avgCreditAmount * flexLineRate);
  
  totalRevenue += interestRevenue;
  
  return totalRevenue;
}

function calculateMonthlyCosts(month: number, assumptions: Assumptions): number {
  let totalCosts = 0;
  
  totalCosts += (assumptions.saasSubscriptionMonthly || 0);
  totalCosts += (assumptions.hostingSecurityP1Monthly || 0);
  
  if (month >= 1 && month <= 3) {
    totalCosts += (assumptions.complianceOversightSalary || 0);
    totalCosts += (assumptions.adminAssistantSalary || 0);
    
    if (month === 1) {
      totalCosts += (assumptions.ncrLicenceOneoff || 0);
      totalCosts += (assumptions.legalSetupOneoff || 0);
      totalCosts += (assumptions.incorporationOneoff || 0);
    }
  }
  
  if (month >= 4 && month <= 6) {
    totalCosts += (assumptions.creditCommitteeMemberStipend || 0) * 2;
    totalCosts += (assumptions.csAgentSalary || 0) * (assumptions.csAgentsCountP2 || 2);
    totalCosts += (assumptions.merchantSuccessManagerSalary || 0);
    totalCosts += (assumptions.auditInsuranceMonthly || 0);
    totalCosts += (assumptions.officeP2Monthly || 0);
    totalCosts += (assumptions.officeItSuppliesMonthly || 0);
    
    const volume = calculateMonthlyVolume(month, assumptions);
    totalCosts += volume.apiQueries * (assumptions.unitCostApiQuery || 0);
    totalCosts += volume.scoringQueries * (assumptions.unitCostScoringQuery || 0);
    totalCosts += volume.bureauChecks * (assumptions.unitCostBureauCheck || 0);
    totalCosts += volume.collectionsCases * (assumptions.unitCostCollectionsCase || 0);
    totalCosts += volume.notifications * (assumptions.unitCostNotification || 0);
    
    totalCosts += (assumptions.marketingBaseline || 0) * (assumptions.unitCostMarketing || 0);
    totalCosts += (assumptions.travelBaseline || 0) * (assumptions.unitCostTravel || 0);
  }
  
  if (month >= 7 && month <= 24) {
    totalCosts += (assumptions.collectionsDeptMonthly || 0);
    totalCosts += (assumptions.customerServicePhase3Monthly || 0);
    totalCosts += (assumptions.hostingSecurityP3Monthly || 0);
    totalCosts += (assumptions.regReportingGovMonthly || 0);
    totalCosts += (assumptions.merchantTeamMonthly || 0);
    totalCosts += (assumptions.officeP3Monthly || 0);
    totalCosts += (assumptions.operationalSupportMonthly || 0);
    
    if (month === 7) {
      totalCosts += (assumptions.platformEnhancementsOneoff || 0);
    }
  }
  
  // Additional cost items - FIXED: No double-counting
  const baseTransactions = assumptions.startingTransactions || 100;
  const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
  const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
  const monthlyTransactions = baseTransactions * quarterlyGrowth;
  const avgOrderValue = assumptions.averageOrderValue || 3000;
  const easyNowMix = (assumptions.easyNowMix || 30) / 100;
  const flexLineMix = (assumptions.flexLineMix || 15) / 100;
  const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
  const avgCreditAmount = avgOrderValue * 0.8;
  
  // Cost of capital - FIXED: Use the total credit transactions directly
  const costOfCapitalRate = (assumptions.costOfCapitalRate || 12) / 100 / 12;
  const costOfCapital = creditTransactions * avgCreditAmount * costOfCapitalRate;
  totalCosts += costOfCapital;
  
  totalCosts += (assumptions.creditInsurancePremium || 0);
  totalCosts += (assumptions.legalCollectionsMonthly || 0);
  totalCosts += (assumptions.recoveryAgencyMonthly || 0);
  totalCosts += (assumptions.enhancedTechMonthly || 0);
  totalCosts += (assumptions.marketingAcquisitionMonthly || 0);
  totalCosts += (assumptions.complianceRegulatoryMonthly || 0);
  
  // Credit losses - FIXED: Use the total credit transactions directly
  const creditLossRate = (assumptions.creditLossRate || 3) / 100;
  const creditLosses = creditTransactions * avgCreditAmount * creditLossRate;
  totalCosts += creditLosses;
  
  totalCosts *= (1 + (assumptions.generalContingency || 5) / 100);
  
  return totalCosts;
}

function calculateMonthlyVolume(month: number, assumptions: Assumptions) {
  const baseVolume = {
    apiQueries: assumptions.startVolApiQueries || 100,
    scoringQueries: assumptions.startVolScoringQueries || 100,
    bureauChecks: assumptions.startVolBureauChecks || 100,
    collectionsCases: assumptions.startVolCollectionsCases || 5,
    notifications: assumptions.startVolNotifications || 300
  };
  
  const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
  const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
  
  return {
    apiQueries: Math.round(baseVolume.apiQueries * quarterlyGrowth),
    scoringQueries: Math.round(baseVolume.scoringQueries * quarterlyGrowth),
    bureauChecks: Math.round(baseVolume.bureauChecks * quarterlyGrowth),
    collectionsCases: Math.round(baseVolume.collectionsCases * quarterlyGrowth),
    notifications: Math.round(baseVolume.notifications * quarterlyGrowth)
  };
}
