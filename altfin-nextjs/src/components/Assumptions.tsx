'use client';

import { formatNumber } from '../utils/format';

interface Assumptions {
  [key: string]: number;
}

interface AssumptionsProps {
  assumptions: Assumptions;
  onAssumptionChange: (key: string, value: number) => void;
  onScenarioLoad: (scenario: string) => void;
}

export default function Assumptions({ assumptions, onAssumptionChange, onScenarioLoad }: AssumptionsProps) {
  const assumptionGroups = [
    {
      title: 'Revenue Assumptions',
      fields: [
        { key: 'startingTransactions', label: 'Starting Monthly Transactions', tooltip: 'Initial number of transactions per month' },
        { key: 'quarterlyGrowth', label: 'Quarterly Growth Rate (%)', tooltip: 'Expected quarterly growth in transaction volume' },
        { key: 'averageOrderValue', label: 'Average Order Value (R)', tooltip: 'Average value per transaction' },
        { key: 'initiationFee', label: 'Initiation Fee (R)', tooltip: 'One-time fee for new customers' },
        { key: 'monthlyServiceFee', label: 'Monthly Service Fee (R)', tooltip: 'Recurring monthly fee for existing customers' },
        { key: 'merchantCommissionRate', label: 'Merchant Commission Rate (%)', tooltip: 'Percentage commission on transaction volume' },
        { key: 'easyNowMix', label: 'EasyNow Mix (%)', tooltip: 'Percentage of transactions using EasyNow credit product' },
        { key: 'flexLineMix', label: 'FlexLine Mix (%)', tooltip: 'Percentage of transactions using FlexLine credit product' },
        { key: 'easyNowRate', label: 'EasyNow Interest Rate (%)', tooltip: 'Annual interest rate for EasyNow credit' },
        { key: 'flexLineRate', label: 'FlexLine Interest Rate (%)', tooltip: 'Annual interest rate for FlexLine credit' },
        { key: 'expectedLateDefaultRate', label: 'Expected Late/Default Rate (%)', tooltip: 'Percentage of transactions with late payments or defaults' },
        { key: 'latePaymentPenalty', label: 'Late Payment Penalty (R)', tooltip: 'Penalty fee for late payments' },
        { key: 'defaultCharge', label: 'Default Charge (R)', tooltip: 'Additional charge for defaulted transactions' }
      ]
    },
    {
      title: 'Cost Assumptions',
      fields: [
        { key: 'saasSubscriptionMonthly', label: 'SaaS Subscription Monthly (R)', tooltip: 'Monthly software subscription costs' },
        { key: 'hostingSecurityP1Monthly', label: 'Hosting & Security P1 Monthly (R)', tooltip: 'Monthly hosting and security costs for Phase 1' },
        { key: 'hostingSecurityP3Monthly', label: 'Hosting & Security P3 Monthly (R)', tooltip: 'Monthly hosting and security costs for Phase 3' },
        { key: 'complianceOversightSalary', label: 'Compliance Oversight Salary (R)', tooltip: 'Monthly salary for compliance oversight role' },
        { key: 'adminAssistantSalary', label: 'Admin Assistant Salary (R)', tooltip: 'Monthly salary for administrative assistant' },
        { key: 'ncrLicenceOneoff', label: 'NCR Licence One-off (R)', tooltip: 'One-time NCR licensing cost' },
        { key: 'legalSetupOneoff', label: 'Legal Setup One-off (R)', tooltip: 'One-time legal setup costs' },
        { key: 'incorporationOneoff', label: 'Incorporation One-off (R)', tooltip: 'One-time incorporation costs' },
        { key: 'creditCommitteeMemberStipend', label: 'Credit Committee Member Stipend (R)', tooltip: 'Monthly stipend per credit committee member' },
        { key: 'csAgentSalary', label: 'Customer Service Agent Salary (R)', tooltip: 'Monthly salary per customer service agent' },
        { key: 'csAgentsCountP2', label: 'Customer Service Agents Count P2', tooltip: 'Number of customer service agents in Phase 2' },
        { key: 'merchantSuccessManagerSalary', label: 'Merchant Success Manager Salary (R)', tooltip: 'Monthly salary for merchant success manager' },
        { key: 'auditInsuranceMonthly', label: 'Audit & Insurance Monthly (R)', tooltip: 'Monthly audit and insurance costs' },
        { key: 'officeP2Monthly', label: 'Office P2 Monthly (R)', tooltip: 'Monthly office costs for Phase 2' },
        { key: 'officeItSuppliesMonthly', label: 'Office IT Supplies Monthly (R)', tooltip: 'Monthly IT supplies costs' },
        { key: 'collectionsDeptMonthly', label: 'Collections Department Monthly (R)', tooltip: 'Monthly collections department costs' },
        { key: 'customerServicePhase3Monthly', label: 'Customer Service P3 Monthly (R)', tooltip: 'Monthly customer service costs for Phase 3' },
        { key: 'regReportingGovMonthly', label: 'Regulatory & Governance Monthly (R)', tooltip: 'Monthly regulatory and governance costs' },
        { key: 'merchantTeamMonthly', label: 'Merchant Team Monthly (R)', tooltip: 'Monthly merchant team costs' },
        { key: 'officeP3Monthly', label: 'Office P3 Monthly (R)', tooltip: 'Monthly office costs for Phase 3' },
        { key: 'operationalSupportMonthly', label: 'Operational Support Monthly (R)', tooltip: 'Monthly operational support costs' },
        { key: 'platformEnhancementsOneoff', label: 'Platform Enhancements One-off (R)', tooltip: 'One-time platform enhancement costs' }
      ]
    },
    {
      title: 'Variable Costs',
      fields: [
        { key: 'startVolApiQueries', label: 'Starting Volume - API Queries', tooltip: 'Initial monthly API query volume' },
        { key: 'startVolScoringQueries', label: 'Starting Volume - Scoring Queries', tooltip: 'Initial monthly scoring query volume' },
        { key: 'startVolBureauChecks', label: 'Starting Volume - Bureau Checks', tooltip: 'Initial monthly bureau check volume' },
        { key: 'startVolCollectionsCases', label: 'Starting Volume - Collections Cases', tooltip: 'Initial monthly collections case volume' },
        { key: 'startVolNotifications', label: 'Starting Volume - Notifications', tooltip: 'Initial monthly notification volume' },
        { key: 'unitCostApiQuery', label: 'Unit Cost - API Query (R)', tooltip: 'Cost per API query' },
        { key: 'unitCostScoringQuery', label: 'Unit Cost - Scoring Query (R)', tooltip: 'Cost per scoring query' },
        { key: 'unitCostBureauCheck', label: 'Unit Cost - Bureau Check (R)', tooltip: 'Cost per bureau check' },
        { key: 'unitCostCollectionsCase', label: 'Unit Cost - Collections Case (R)', tooltip: 'Cost per collections case' },
        { key: 'unitCostNotification', label: 'Unit Cost - Notification (R)', tooltip: 'Cost per notification' },
        { key: 'marketingBaseline', label: 'Marketing Baseline Multiplier', tooltip: 'Baseline multiplier for marketing costs' },
        { key: 'unitCostMarketing', label: 'Unit Cost - Marketing (R)', tooltip: 'Base marketing cost per unit' },
        { key: 'travelBaseline', label: 'Travel Baseline Multiplier', tooltip: 'Baseline multiplier for travel costs' },
        { key: 'unitCostTravel', label: 'Unit Cost - Travel (R)', tooltip: 'Base travel cost per unit' }
      ]
    },
    {
      title: 'Additional Costs',
      fields: [
        { key: 'costOfCapitalRate', label: 'Cost of Capital Rate (%)', tooltip: 'Annual cost of capital rate' },
        { key: 'creditInsurancePremium', label: 'Credit Insurance Premium (R)', tooltip: 'Monthly credit insurance premium' },
        { key: 'legalCollectionsMonthly', label: 'Legal & Collections Monthly (R)', tooltip: 'Monthly legal and collections costs' },
        { key: 'recoveryAgencyMonthly', label: 'Recovery Agency Monthly (R)', tooltip: 'Monthly recovery agency costs' },
        { key: 'enhancedTechMonthly', label: 'Enhanced Technology Monthly (R)', tooltip: 'Monthly enhanced technology costs' },
        { key: 'marketingAcquisitionMonthly', label: 'Marketing & Acquisition Monthly (R)', tooltip: 'Monthly marketing and acquisition costs' },
        { key: 'complianceRegulatoryMonthly', label: 'Compliance & Regulatory Monthly (R)', tooltip: 'Monthly compliance and regulatory costs' },
        { key: 'creditLossRate', label: 'Credit Loss Rate (%)', tooltip: 'Expected credit loss rate' },
        { key: 'generalContingency', label: 'General Contingency (%)', tooltip: 'General contingency percentage applied to all costs' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Scenario Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center border-b border-gray-200 pb-3">
          Quick Scenario Selection
        </h3>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => onScenarioLoad('conservative')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Conservative
          </button>
          <button
            onClick={() => onScenarioLoad('market')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Market
          </button>
          <button
            onClick={() => onScenarioLoad('aggressive')}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Aggressive
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <strong className="text-purple-900">Conservative</strong><br />
            Lower growth, higher contingency
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <strong className="text-blue-900">Market</strong><br />
            Balanced approach, moderate growth
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <strong className="text-orange-900">Aggressive</strong><br />
            Higher growth, lower contingency
          </div>
        </div>
      </div>

      {/* Assumptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {assumptionGroups.map((group) => (
          <div key={group.title} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              {group.title}
            </h3>
            <div className="space-y-4">
              {group.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <div className="relative group">
                      <span className="text-blue-500 cursor-help text-sm">ⓘ</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {field.tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    id={field.key}
                    value={assumptions[field.key] || 0}
                    onChange={(e) => onAssumptionChange(field.key, parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="any"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Current Values Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center border-b border-gray-200 pb-3">
          Current Key Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(assumptions.startingTransactions || 0, {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="text-sm text-gray-600">Starting Transactions</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {(assumptions.quarterlyGrowth || 0).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Quarterly Growth Rate</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {formatNumber(assumptions.averageOrderValue || 0)}
            </div>
            <div className="text-sm text-gray-600">Average Order Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}
