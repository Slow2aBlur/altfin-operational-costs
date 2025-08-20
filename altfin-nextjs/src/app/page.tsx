'use client';

import { useState } from 'react';
import FinancialModel from '../components/FinancialModel';
import Dashboard from '../components/Dashboard';
import Assumptions from '../components/Assumptions';
import PhaseDetails from '../components/PhaseDetails';
import ReferenceGuide from '../components/ReferenceGuide';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assumptions, setAssumptions] = useState({
    // Revenue assumptions
    startingTransactions: 100,
    quarterlyGrowth: 3,
    averageOrderValue: 3000,
    initiationFee: 150,
    monthlyServiceFee: 25,
    merchantCommissionRate: 1.5,
    easyNowMix: 30,
    flexLineMix: 15,
    easyNowRate: 24,
    flexLineRate: 22,
    expectedLateDefaultRate: 8,
    latePaymentPenalty: 100,
    defaultCharge: 250,
    
    // Cost assumptions
    saasSubscriptionMonthly: 500,
    hostingSecurityP1Monthly: 300,
    hostingSecurityP3Monthly: 500,
    complianceOversightSalary: 15000,
    adminAssistantSalary: 8000,
    ncrLicenceOneoff: 5000,
    legalSetupOneoff: 15000,
    incorporationOneoff: 5000,
    creditCommitteeMemberStipend: 2000,
    csAgentSalary: 12000,
    csAgentsCountP2: 2,
    merchantSuccessManagerSalary: 18000,
    auditInsuranceMonthly: 2000,
    officeP2Monthly: 3000,
    officeItSuppliesMonthly: 500,
    collectionsDeptMonthly: 25000,
    customerServicePhase3Monthly: 30000,
    regReportingGovMonthly: 8000,
    merchantTeamMonthly: 40000,
    officeP3Monthly: 5000,
    operationalSupportMonthly: 15000,
    platformEnhancementsOneoff: 50000,
    
    // Variable costs
    startVolApiQueries: 100,
    startVolScoringQueries: 100,
    startVolBureauChecks: 100,
    startVolCollectionsCases: 5,
    startVolNotifications: 300,
    unitCostApiQuery: 0.50,
    unitCostScoringQuery: 2.00,
    unitCostBureauCheck: 15.00,
    unitCostCollectionsCase: 50.00,
    unitCostNotification: 0.10,
    marketingBaseline: 1,
    unitCostMarketing: 5000,
    travelBaseline: 1,
    unitCostTravel: 3000,
    
    // Additional costs
    costOfCapitalRate: 12,
    creditInsurancePremium: 5000,
    legalCollectionsMonthly: 8000,
    recoveryAgencyMonthly: 5000,
    enhancedTechMonthly: 10000,
    marketingAcquisitionMonthly: 15000,
    complianceRegulatoryMonthly: 12000,
    creditLossRate: 3,
    generalContingency: 5
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'assumptions', label: 'Assumptions', icon: '⚙️' },
    { id: 'financial-model', label: 'Financial Model', icon: '💰' },
    { id: 'phase-details', label: 'Phase Details', icon: '📋' },
    { id: 'reference', label: 'Reference Guide', icon: '📚' }
  ];

  const handleAssumptionChange = (key: string, value: number) => {
    setAssumptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const loadScenario = (scenario: string) => {
    const scenarios = {
      conservative: {
        quarterlyGrowth: 10,
        startingTransactions: 80,
        averageOrderValue: 2500,
        generalContingency: 8
      },
      aggressive: {
        quarterlyGrowth: 8,
        startingTransactions: 120,
        averageOrderValue: 3500,
        generalContingency: 3
      },
      market: {
        quarterlyGrowth: 3,
        startingTransactions: 100,
        averageOrderValue: 3000,
        generalContingency: 5
      }
    };
    
    const selectedScenario = scenarios[scenario as keyof typeof scenarios];
    if (selectedScenario) {
      setAssumptions(prev => ({
        ...prev,
        ...selectedScenario
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center">AltFin Operational Costs Dashboard</h1>
          <p className="text-center mt-2 opacity-90">24-Month Financial Projection & Analysis Tool</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard assumptions={assumptions} />
        )}
        
        {activeTab === 'assumptions' && (
          <Assumptions 
            assumptions={assumptions} 
            onAssumptionChange={handleAssumptionChange}
            onScenarioLoad={loadScenario}
          />
        )}
        
        {activeTab === 'financial-model' && (
          <FinancialModel assumptions={assumptions} />
        )}
        
        {activeTab === 'phase-details' && (
          <PhaseDetails />
        )}
        
        {activeTab === 'reference' && (
          <ReferenceGuide />
        )}
      </main>
    </div>
  );
}
