'use client';

import { useMemo } from 'react';

interface Assumptions {
  [key: string]: number;
}

interface DashboardProps {
  assumptions: Assumptions;
}

export default function Dashboard({ assumptions }: DashboardProps) {
  // Helper functions defined at the top
  function formatCurrency(amount: number): string {
    // Use a consistent number formatting approach that works the same on server and client
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return amount < 0 ? `-R${formatted}` : `R${formatted}`;
  }

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
    
    // Ongoing costs (all phases)
    totalCosts += (assumptions.saasSubscriptionMonthly || 0);
    totalCosts += (assumptions.hostingSecurityP1Monthly || 0);
    
    // Phase 1 costs (M1-3)
    if (month >= 1 && month <= 3) {
      totalCosts += (assumptions.complianceOversightSalary || 0);
      totalCosts += (assumptions.adminAssistantSalary || 0);
      
      if (month === 1) {
        totalCosts += (assumptions.ncrLicenceOneoff || 0);
        totalCosts += (assumptions.legalSetupOneoff || 0);
        totalCosts += (assumptions.incorporationOneoff || 0);
      }
    }
    
    // Phase 2 costs (M4-6)
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
    
    // Phase 3 costs (M7-24)
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
    
    // Additional cost items (all phases) - ONLY transaction-dependent costs grow due to volume
    const baseTransactions = assumptions.startingTransactions || 100;
    const growthRate = (assumptions.quarterlyGrowth || 3) / 100;
    const quarterlyGrowth = Math.pow(1 + growthRate, Math.floor((month - 1) / 3));
    const monthlyTransactions = baseTransactions * quarterlyGrowth;
    
    // Transaction-dependent costs that grow with volume - FIXED: No double-counting
    const avgOrderValue = assumptions.averageOrderValue || 3000;
    const easyNowMix = (assumptions.easyNowMix || 30) / 100;
    const flexLineMix = (assumptions.flexLineMix || 15) / 100;
    const creditTransactions = monthlyTransactions * (easyNowMix + flexLineMix);
    const avgCreditAmount = avgOrderValue * 0.8;
    
    // DEBUG: Log the values for months 7+ to see what's exploding
    if (month >= 7) {
      console.log(`Month ${month} Debug:`);
      console.log(`  baseTransactions: ${baseTransactions}`);
      console.log(`  growthRate: ${growthRate}`);
      console.log(`  quarterlyGrowth: ${quarterlyGrowth}`);
      console.log(`  monthlyTransactions: ${monthlyTransactions}`);
      console.log(`  creditTransactions: ${creditTransactions}`);
      console.log(`  avgCreditAmount: ${avgCreditAmount}`);
    }
    
    // Cost of capital - FIXED: Use the total credit transactions directly
    const costOfCapitalRate = (assumptions.costOfCapitalRate || 12) / 100 / 12;
    const costOfCapital = creditTransactions * avgCreditAmount * costOfCapitalRate;
    
    if (month >= 7) {
      console.log(`  costOfCapitalRate: ${costOfCapitalRate}`);
      console.log(`  costOfCapital: ${costOfCapital}`);
    }
    
    totalCosts += costOfCapital;
    
    // Fixed costs that do NOT grow
    totalCosts += (assumptions.creditInsurancePremium || 0);
    totalCosts += (assumptions.legalCollectionsMonthly || 0);
    totalCosts += (assumptions.recoveryAgencyMonthly || 0);
    totalCosts += (assumptions.enhancedTechMonthly || 0);
    totalCosts += (assumptions.marketingAcquisitionMonthly || 0);
    totalCosts += (assumptions.complianceRegulatoryMonthly || 0);
    
    // Credit losses - FIXED: Use the total credit transactions directly
    const creditLossRate = (assumptions.creditLossRate || 3) / 100;
    const creditLosses = creditTransactions * avgCreditAmount * creditLossRate;
    
    if (month >= 7) {
      console.log(`  creditLossRate: ${creditLossRate}`);
      console.log(`  creditLosses: ${creditLosses}`);
      console.log(`  totalCosts before contingency: ${totalCosts}`);
    }
    
    totalCosts += creditLosses;
    
    totalCosts *= (1 + (assumptions.generalContingency || 5) / 100);
    
    if (month >= 7) {
      console.log(`  final totalCosts: ${totalCosts}`);
      console.log('---');
    }
    
    return totalCosts;
  }

  function calculatePhaseRevenue(startMonth: number, endMonth: number, assumptions: Assumptions): number {
    let totalRevenue = 0;
    for (let month = startMonth; month <= endMonth; month++) {
      totalRevenue += calculateMonthlyRevenue(month, assumptions);
    }
    return totalRevenue;
  }

  function calculatePhaseCosts(startMonth: number, endMonth: number, assumptions: Assumptions): number {
    let totalCosts = 0;
    console.log(`\n=== Phase ${startMonth}-${endMonth} Cost Calculation ===`);
    for (let month = startMonth; month <= endMonth; month++) {
      const monthlyCost = calculateMonthlyCosts(month, assumptions);
      console.log(`Month ${month}: ${monthlyCost} (running total: ${totalCosts + monthlyCost})`);
      totalCosts += monthlyCost;
    }
    console.log(`Final Phase ${startMonth}-${endMonth} Total: ${totalCosts}\n`);
    return totalCosts;
  }

  function calculateMonthlyVolume(month: number, assumptions: Assumptions) {
    // Volume grows ONLY due to transaction volume growth at 3% per quarter
    const baseVolume = {
      apiQueries: assumptions.startVolApiQueries || 100,
      scoringQueries: assumptions.startVolScoringQueries || 100,
      bureauChecks: assumptions.startVolBureauChecks || 100,
      collectionsCases: assumptions.startVolCollectionsCases || 5,
      notifications: assumptions.startVolNotifications || 300
    };
    
    // Apply the SAME growth rate as transactions (3% per quarter)
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

  const calculations = useMemo(() => {
    // Calculate phase-specific metrics
    const phase1Revenue = calculatePhaseRevenue(1, 3, assumptions);
    const phase2Revenue = calculatePhaseRevenue(4, 6, assumptions);
    const phase3Revenue = calculatePhaseRevenue(7, 24, assumptions);
    
    const phase1Costs = calculatePhaseCosts(1, 3, assumptions);
    const phase2Costs = calculatePhaseCosts(4, 6, assumptions);
    const phase3Costs = calculatePhaseCosts(7, 24, assumptions);
    
    const phase1Profit = phase1Revenue - phase1Costs;
    const phase2Profit = phase2Revenue - phase2Costs;
    const phase3Profit = phase3Revenue - phase3Costs;
    
    return {
      phase1: { revenue: phase1Revenue, costs: phase1Costs, profit: phase1Profit },
      phase2: { revenue: phase2Revenue, costs: phase2Costs, profit: phase2Profit },
      phase3: { revenue: phase3Revenue, costs: phase3Costs, profit: phase3Profit },
      total: {
        revenue: phase1Revenue + phase2Revenue + phase3Revenue,
        costs: phase1Costs + phase2Costs + phase3Costs,
        profit: phase1Profit + phase2Profit + phase3Profit
      }
    };
  }, [assumptions]);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phase 1: Setup & Launch</h3>
          <p className="text-sm text-gray-600 mb-4">Months 1-3 (Aug-Oct)</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-semibold text-green-600">{formatCurrency(calculations.phase1.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Costs:</span>
              <span className="font-semibold text-red-600">{formatCurrency(calculations.phase1.costs)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-800 font-semibold">Profit:</span>
              <span className={`font-bold text-lg ${calculations.phase1.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(calculations.phase1.profit)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phase 2: Market Entry</h3>
          <p className="text-sm text-gray-600 mb-4">Months 4-6 (Nov-Jan)</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-semibold text-green-600">{formatCurrency(calculations.phase2.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Costs:</span>
              <span className="font-semibold text-red-600">{formatCurrency(calculations.phase2.costs)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-800 font-semibold">Profit:</span>
              <span className={`font-bold text-lg ${calculations.phase2.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(calculations.phase2.profit)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phase 3: Scale</h3>
          <p className="text-sm text-gray-600 mb-4">Months 7-24 (Feb+)</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-semibold text-green-600">{formatCurrency(calculations.phase3.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Costs:</span>
              <span className="font-semibold text-red-600">{(() => {
                console.log('Phase 3 costs before formatting:', calculations.phase3.costs);
                const formatted = formatCurrency(calculations.phase3.costs);
                console.log('Phase 3 costs after formatting:', formatted);
                return formatted;
              })()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-800 font-semibold">Profit:</span>
              <span className={`font-bold text-lg ${calculations.phase3.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(calculations.phase3.profit)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total 24-Month</h3>
          <p className="text-sm text-gray-600 mb-4">Complete Projection</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-semibold text-green-600">{formatCurrency(calculations.total.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Costs:</span>
              <span className="font-semibold text-red-600">{formatCurrency(calculations.total.costs)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-800 font-semibold">Profit:</span>
              <span className={`font-bold text-lg ${calculations.total.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(calculations.total.profit)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Phase Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase / Metric</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Costs</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Margin %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">Phase 1: Setup & Launch (M1-3)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-semibold">{formatCurrency(calculations.phase1.revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 font-semibold">{formatCurrency(calculations.phase1.costs)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">{formatCurrency(calculations.phase1.profit)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                  {calculations.phase1.revenue > 0 ? ((calculations.phase1.profit / calculations.phase1.revenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">Phase 2: Market Entry (M4-6)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-semibold">{formatCurrency(calculations.phase2.revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 font-semibold">{formatCurrency(calculations.phase2.costs)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">{formatCurrency(calculations.phase2.profit)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                  {calculations.phase2.revenue > 0 ? ((calculations.phase2.profit / calculations.phase2.revenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr className="bg-orange-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-900">Phase 3: Scale (M7-24)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-semibold">{formatCurrency(calculations.phase3.revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 font-semibold">{formatCurrency(calculations.phase3.costs)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">{formatCurrency(calculations.phase3.profit)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                  {calculations.phase3.revenue > 0 ? ((calculations.phase3.profit / calculations.phase3.revenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr className="bg-gray-900 text-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">TOTAL 24-MONTH PROJECTION</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-400 font-bold">{formatCurrency(calculations.total.revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-400 font-bold">{formatCurrency(calculations.total.costs)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">{formatCurrency(calculations.total.profit)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-300">
                  {calculations.total.revenue > 0 ? ((calculations.total.profit / calculations.total.revenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


