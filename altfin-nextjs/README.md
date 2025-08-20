# AltFin Operational Costs Dashboard

A comprehensive Next.js application for modeling and analyzing operational costs for a financial services company over a 24-month period.

## 🚀 Features

- **Interactive Dashboard**: Real-time KPI cards showing revenue, costs, and profit for each phase
- **Financial Model**: Detailed 24-month financial projections with monthly breakdowns
- **Assumptions Management**: Comprehensive input forms for all financial parameters
- **Phase Details**: Detailed explanations of each operational phase
- **Reference Guide**: Complete documentation of calculations and methodology
- **Scenario Planning**: Pre-built conservative, market, and aggressive scenarios

## 🏗️ Architecture

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4 with custom components
- **State Management**: React hooks with local state
- **TypeScript**: Full type safety throughout the application

## 📊 Application Structure

### Dashboard Tab
- Phase 1: Setup & Launch (Months 1-3)
- Phase 2: Market Entry (Months 4-6)  
- Phase 3: Scale (Months 7-24)
- Total 24-month projection
- Summary table with profit margins

### Assumptions Tab
- Revenue assumptions (growth rates, fees, etc.)
- Cost assumptions (salaries, infrastructure, etc.)
- Variable costs (API, scoring, collections)
- Additional costs (risk, compliance, etc.)
- Quick scenario selection (Conservative, Market, Aggressive)

### Financial Model Tab
- Complete 24-month breakdown
- Revenue streams by category
- Cost allocation by phase
- Monthly profit/loss calculations
- Summary statistics

### Phase Details Tab
- Detailed explanation of each phase
- Key activities and milestones
- Cost breakdowns
- Operational considerations

### Reference Guide Tab
- Calculation methodology
- Formula explanations
- Key assumptions
- Examples and disclaimers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd altfin-operational-costs/altfin-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💰 Key Financial Concepts

### Revenue Streams
- **Base Transaction Revenue**: Core business volume × average order value
- **Initiation Fees**: One-time fees for new customers
- **Service Fees**: Monthly recurring fees for existing customers
- **Merchant Commission**: Percentage of transaction volume
- **Interest Income**: Credit product interest earnings
- **Penalty Charges**: Late payment and default fees

### Cost Categories
- **Phase 1**: Legal setup, compliance, basic infrastructure
- **Phase 2**: Staff expansion, office setup, marketing
- **Phase 3**: Collections, enhanced technology, scaling operations
- **Ongoing**: SaaS, hosting, insurance, regulatory costs
- **Variable**: Volume-based costs (API, scoring, collections)

### Growth Model
- Quarterly growth rate applied to transaction volume
- All variable costs scale proportionally
- Staff and infrastructure costs phased by operational needs

## 🔧 Customization

### Adding New Assumptions
1. Update the `assumptions` state in `src/app/page.tsx`
2. Add input fields in `src/components/Assumptions.tsx`
3. Update calculation functions in `src/components/Dashboard.tsx` and `src/components/FinancialModel.tsx`

### Modifying Calculations
1. Edit the calculation functions in the component files
2. Update the `generateFinancialModel` function for table changes
3. Modify the `calculateMonthlyRevenue` and `calculateMonthlyCosts` functions

### Styling Changes
1. Modify `src/app/globals.css` for global styles
2. Update `tailwind.config.ts` for theme customization
3. Use Tailwind classes directly in components

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- Print layouts

## 🖨️ Print Support

The application includes print-optimized styles for:
- Financial model tables
- Dashboard summaries
- Phase details
- Reference documentation

## 🔒 Security Notes

- This is a client-side application for planning purposes
- No sensitive data is stored or transmitted
- All calculations happen locally in the browser
- No authentication or user management required

## 📈 Business Use Cases

- **Financial Planning**: 24-month operational cost projections
- **Scenario Analysis**: Conservative, market, and aggressive planning
- **Stakeholder Communication**: Clear visualization of financial impact
- **Budget Planning**: Detailed cost allocation by phase
- **Risk Assessment**: Credit risk and contingency planning

## 🚨 Important Disclaimers

- **Planning Tool Only**: This application is for planning purposes and should not be considered as financial advice
- **Assumptions**: All projections are based on user-defined assumptions
- **Market Conditions**: Actual results may vary significantly from projections
- **Validation**: Users should validate all assumptions with relevant stakeholders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
1. Check the Reference Guide tab in the application
2. Review the calculation examples
3. Validate your assumptions
4. Contact the development team

---

**Built with ❤️ for AltFin Financial Services**
