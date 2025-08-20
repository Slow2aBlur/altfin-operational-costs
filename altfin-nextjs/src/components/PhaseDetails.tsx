'use client';

export default function PhaseDetails() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Phase Details & Explanations</h2>
        <p className="text-gray-600">
          Detailed breakdown of each phase, including costs, activities, and key milestones.
        </p>
      </div>

      {/* Phase 1 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Phase 1: Setup & Launch (Months 1-3)</h3>
          <p className="text-green-100 mt-1">Foundation & Regulatory Setup</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Key Activities
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Company incorporation and legal entity setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>NCR licensing application and approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Compliance oversight and regulatory framework establishment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Basic administrative infrastructure setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Core technology platform deployment</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Cost Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Compliance Oversight</span>
                  <span className="font-semibold text-green-600">R15,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Admin Assistant</span>
                  <span className="font-semibold text-green-600">R8,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">One-time Setup Costs</span>
                  <span className="font-semibold text-green-600">R25,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Technology Infrastructure</span>
                  <span className="font-semibold text-green-600">R800/month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">Phase 1 Notes:</h5>
            <p className="text-blue-800 text-sm">
              This phase focuses on establishing the legal and regulatory foundation. All one-time costs are incurred in Month 1, 
              while ongoing compliance and administrative costs continue throughout the phase. Technology costs are minimal as the 
              platform is in basic deployment mode.
            </p>
          </div>
        </div>
      </div>

      {/* Phase 2 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Phase 2: Market Entry (Months 4-6)</h3>
          <p className="text-blue-100 mt-1">Operational Launch & Customer Acquisition</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Key Activities
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Credit committee formation and operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Customer service team establishment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Merchant success management implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Audit and insurance coverage activation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Office setup and IT infrastructure expansion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Initial marketing and business development activities</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Cost Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Credit Committee</span>
                  <span className="font-semibold text-blue-600">R4,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Customer Service</span>
                  <span className="font-semibold text-blue-600">R24,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Merchant Success</span>
                  <span className="font-semibold text-blue-600">R18,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Audit & Insurance</span>
                  <span className="font-semibold text-blue-600">R2,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Office & IT</span>
                  <span className="font-semibold text-blue-600">R3,500/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Variable Costs</span>
                  <span className="font-semibold text-blue-600">Volume-based</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">Phase 2 Notes:</h5>
            <p className="text-blue-800 text-sm">
              This phase represents the operational launch with full customer-facing capabilities. Variable costs scale with transaction 
              volume, including API queries, credit scoring, and collections activities. Marketing and travel costs support business 
              development efforts.
            </p>
          </div>
        </div>
      </div>

      {/* Phase 3 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Phase 3: Scale (Months 7-24)</h3>
          <p className="text-orange-100 mt-1">Growth & Operational Excellence</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Key Activities
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Collections department establishment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Enhanced customer service operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Advanced technology platform enhancements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Regulatory reporting and governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Merchant team expansion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Operational support and process optimization</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Cost Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Collections Department</span>
                  <span className="font-semibold text-orange-600">R25,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Customer Service P3</span>
                  <span className="font-semibold text-orange-600">R30,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Technology P3</span>
                  <span className="font-semibold text-orange-600">R500/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Regulatory & Governance</span>
                  <span className="font-semibold text-orange-600">R8,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Merchant Team</span>
                  <span className="font-semibold text-orange-600">R40,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Operational Support</span>
                  <span className="font-semibold text-orange-600">R15,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Platform Enhancements</span>
                  <span className="font-semibold text-orange-600">R50,000 (M7)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h5 className="font-semibold text-orange-900 mb-2">Phase 3 Notes:</h5>
            <p className="text-orange-800 text-sm">
              This phase focuses on scaling operations and achieving operational excellence. The collections department handles 
              credit risk management, while enhanced technology supports higher transaction volumes. One-time platform enhancements 
              in Month 7 enable advanced features and scalability.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Cost Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Additional Cost Items (All Phases)</h3>
          <p className="text-purple-100 mt-1">Ongoing Operational Costs</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Credit & Risk Management
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Cost of Capital</span>
                  <span className="font-semibold text-purple-600">Volume-based</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Credit Insurance</span>
                  <span className="font-semibold text-purple-600">R5,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Credit Losses</span>
                  <span className="font-semibold text-purple-600">Volume-based</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Operational Support
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Legal & Collections</span>
                  <span className="font-semibold text-purple-600">R8,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Recovery Agency</span>
                  <span className="font-semibold text-purple-600">R5,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Enhanced Technology</span>
                  <span className="font-semibold text-purple-600">R10,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Marketing & Acquisition</span>
                  <span className="font-semibold text-purple-600">R15,000/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Compliance & Regulatory</span>
                  <span className="font-semibold text-purple-600">R12,000/month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h5 className="font-semibold text-purple-900 mb-2">Additional Costs Notes:</h5>
            <p className="text-purple-800 text-sm">
              These costs apply across all phases and scale with business volume. Cost of capital and credit losses are directly 
              proportional to credit transaction volume. All costs include a general contingency factor to account for unexpected 
              expenses and market fluctuations.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Phase Cost Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Key Focus</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Major Costs</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">Phase 1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">M1-3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">Setup & Compliance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">Legal, NCR, Compliance</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">Phase 2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">M4-6</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">Launch & Operations</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">Staff, Office, Marketing</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-900">Phase 3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">M7-24</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">Scale & Optimize</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">Collections, Tech, Growth</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
