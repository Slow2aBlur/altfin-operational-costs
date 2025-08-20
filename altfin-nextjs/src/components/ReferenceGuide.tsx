'use client';

export default function ReferenceGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reference Guide</h2>
        <p className="text-gray-600">
          Comprehensive guide to calculations, methodology, and key concepts used in the operational costs model.
        </p>
      </div>

      {/* Revenue Calculations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Revenue Calculations
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Base Transaction Revenue</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Formula:</strong> Monthly Transactions × Average Order Value
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Growth:</strong> Quarterly growth rate applied to starting transaction volume
              </p>
              <p className="text-gray-700">
                <strong>Example:</strong> Starting with 100 transactions, 15% quarterly growth, R3,000 average order value
              </p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>• Q1 (M1-3): 100 × R3,000 = R300,000/month</li>
                <li>• Q2 (M4-6): 115 × R3,000 = R345,000/month</li>
                <li>• Q3 (M7-9): 132 × R3,000 = R396,000/month</li>
                <li>• Q4 (M10-12): 152 × R3,000 = R456,000/month</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Revenue Streams</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Initiation Fees</h5>
                <p className="text-sm text-blue-800">
                  <strong>Formula:</strong> New Customers × Initiation Fee<br/>
                  <strong>Assumption:</strong> 20% of transactions are new customers<br/>
                  <strong>Example:</strong> 20 new customers × R150 = R3,000/month
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-900 mb-2">Service Fees</h5>
                <p className="text-sm text-green-800">
                  <strong>Formula:</strong> Existing Customers × Monthly Service Fee<br/>
                  <strong>Assumption:</strong> 80% of transactions are existing customers<br/>
                  <strong>Example:</strong> 80 existing customers × R25 = R2,000/month
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Merchant Commission</h5>
                <p className="text-sm text-purple-800">
                  <strong>Formula:</strong> Transaction Volume × Commission Rate<br/>
                  <strong>Example:</strong> R300,000 × 1.5% = R4,500/month
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-900 mb-2">Interest Income</h5>
                <p className="text-sm text-orange-800">
                  <strong>Formula:</strong> Credit Transactions × Credit Amount × Interest Rate<br/>
                  <strong>Products:</strong> EasyNow (30% mix, 24% annual) + FlexLine (15% mix, 22% annual)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Calculations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Cost Calculations
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase-Based Cost Allocation</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3">
                Costs are allocated based on the operational phase and specific month requirements:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Phase 1 (M1-3)</h5>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Compliance oversight: R15,000/month</li>
                    <li>• Admin assistant: R8,000/month</li>
                    <li>• One-time costs: R25,000 (M1 only)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Phase 2 (M4-6)</h5>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Credit committee: R4,000/month</li>
                    <li>• Customer service: R24,000/month</li>
                    <li>• Merchant success: R18,000/month</li>
                    <li>• Variable costs: Volume-based</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Phase 3 (M7-24)</h5>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Collections: R25,000/month</li>
                    <li>• Customer service: R30,000/month</li>
                    <li>• Merchant team: R40,000/month</li>
                    <li>• Platform: R50,000 (M7 only)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Variable Costs</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3">
                Variable costs scale with transaction volume and include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">API & Scoring</h5>
                  <ul className="text-gray-600 space-y-1">
                    <li>• API queries: R0.50 per query</li>
                    <li>• Scoring queries: R2.00 per query</li>
                    <li>• Bureau checks: R15.00 per check</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Collections & Notifications</h5>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Collections cases: R50.00 per case</li>
                    <li>• Notifications: R0.10 per notification</li>
                    <li>• Marketing: R5,000 baseline</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Credit Risk Costs</h4>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 mb-3">
                <strong>Cost of Capital:</strong> Based on outstanding credit volume and capital cost rate
              </p>
              <p className="text-red-800 mb-2">
                <strong>Credit Losses:</strong> Expected default rate applied to credit transaction volume
              </p>
              <p className="text-red-800">
                <strong>Example:</strong> R100,000 credit volume × 3% loss rate = R3,000/month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Calculations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Growth & Volume Calculations
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Quarterly Growth Formula</h4>
            <p className="text-blue-800 text-sm mb-2">
              <strong>Formula:</strong> Base Volume × (1 + Growth Rate)^Quarter
            </p>
            <p className="text-blue-800 text-sm">
              <strong>Example:</strong> Starting with 100 transactions, 15% quarterly growth
            </p>
            <div className="mt-2 text-xs text-blue-700 space-y-1">
              <div>Q1: 100 × (1 + 0.15)⁰ = 100 transactions</div>
              <div>Q2: 100 × (1 + 0.15)¹ = 115 transactions</div>
              <div>Q3: 100 × (1 + 0.15)² = 132 transactions</div>
              <div>Q4: 100 × (1 + 0.15)³ = 152 transactions</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Volume Scaling</h4>
            <p className="text-green-800 text-sm">
              All variable costs (API queries, scoring, collections, notifications) scale proportionally 
              with transaction volume using the same quarterly growth formula.
            </p>
          </div>
        </div>
      </div>

      {/* Key Assumptions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Key Assumptions & Methodology
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Customer Mix</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• New customers: 20% of monthly transactions</li>
                <li>• Existing customers: 80% of monthly transactions</li>
                <li>• Credit product mix: EasyNow 30%, FlexLine 15%</li>
                <li>• Cash transactions: 55%</li>
              </ul>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-2">Risk Parameters</h4>
              <ul className="text-indigo-800 text-sm space-y-1">
                <li>• Late/default rate: 8% of transactions</li>
                <li>• Credit loss rate: 3% of credit volume</li>
                <li>• Cost of capital: 12% annual rate</li>
                <li>• General contingency: 5% of all costs</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Contingency & Buffer</h4>
            <p className="text-gray-700 text-sm">
              A 5% general contingency is applied to all operational costs to account for unexpected expenses, 
              market fluctuations, and implementation challenges. This provides a realistic buffer for planning purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Calculation Examples */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Detailed Calculation Examples
        </h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Month 1 Revenue Calculation</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div><strong>Base Revenue:</strong> 100 transactions × R3,000 = R300,000</div>
              <div><strong>Initiation Fees:</strong> 20 new customers × R150 = R3,000</div>
              <div><strong>Service Fees:</strong> 80 existing customers × R25 = R2,000</div>
              <div><strong>Merchant Commission:</strong> R300,000 × 1.5% = R4,500</div>
              <div><strong>Penalty Revenue:</strong> 100 × 8% × (R100 + R250) = R2,800</div>
              <div><strong>Interest Income:</strong> 45 credit transactions × R2,400 × 2.2% = R2,376</div>
              <div className="font-semibold text-lg border-t pt-2">
                <strong>Total Month 1 Revenue: R314,676</strong>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Month 1 Cost Calculation</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div><strong>Ongoing Costs:</strong> R500 + R300 = R800</div>
              <div><strong>Phase 1 Staff:</strong> R15,000 + R8,000 = R23,000</div>
              <div><strong>One-time Setup:</strong> R5,000 + R15,000 + R5,000 = R25,000</div>
              <div><strong>Credit Risk:</strong> R1,440 + R3,000 + R576 = R5,016</div>
              <div><strong>Additional Costs:</strong> R5,000 + R8,000 + R5,000 + R10,000 + R15,000 + R12,000 = R55,000</div>
              <div className="font-semibold text-lg border-t pt-2">
                <strong>Total Month 1 Costs: R108,816</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Disclaimers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Important Notes & Disclaimers
        </h3>
        
        <div className="space-y-4 text-sm text-gray-700">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Model Limitations</h4>
            <ul className="text-red-800 space-y-1">
              <li>• This model is for planning purposes only and should not be considered as financial advice</li>
              <li>• Actual results may vary significantly from projections</li>
              <li>• Market conditions, regulatory changes, and operational challenges may impact actual costs</li>
              <li>• Revenue projections assume successful market penetration and customer acquisition</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Key Considerations</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• All costs are in South African Rands (R)</li>
              <li>• Monthly calculations assume 30-day periods</li>
              <li>• Growth rates are applied quarterly, not monthly</li>
              <li>• Credit risk calculations are simplified and may not reflect actual portfolio performance</li>
              <li>• Technology costs may vary based on vendor pricing and service requirements</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Recommendations</h4>
            <ul className="text-green-800 space-y-1">
              <li>• Review and validate all assumptions with relevant stakeholders</li>
              <li>• Consider multiple scenarios (conservative, market, aggressive)</li>
              <li>• Update assumptions regularly as market conditions change</li>
              <li>• Build additional contingency for high-risk areas</li>
              <li>• Monitor actual vs. projected performance monthly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
