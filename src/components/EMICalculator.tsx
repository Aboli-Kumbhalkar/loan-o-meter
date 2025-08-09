'use client';

import { useState, useEffect } from 'react';
import LoanTypeCarousel from './LoanTypeCarousel';
import SliderInput from './SliderInput';
import ResultDisplay from './ResultDisplay';

type LoanType = 'personal' | 'vehicle' | 'home' | 'business';

interface LoanTypeData {
  annualIncome: number;
  loanAmount: number;
  downPayment: number;
  tenure: number; // in months
  interestRate: number;
}

interface LoanCalculation {
  emi: number;
  totalAmount: number;
  totalInterest: number;
}

interface EMICalculatorProps {
  onLogout?: () => void;
}

export default function EMICalculator({ onLogout }: EMICalculatorProps) {
  // Current active loan type
  const [currentLoanType, setCurrentLoanType] = useState<LoanType>('vehicle');

  // Separate state for each loan type with different default values
  const [loanDataByType, setLoanDataByType] = useState<Record<LoanType, LoanTypeData>>({
    personal: {
      annualIncome: 600000,
      loanAmount: 500000,
      downPayment: 50000,
      tenure: 24, // 2 years for personal loans
      interestRate: 12.0, // Higher rate for personal loans
    },
    vehicle: {
      annualIncome: 950000,
      loanAmount: 950000,
      downPayment: 150000,
      tenure: 60, // 5 years for vehicle loans
      interestRate: 8.5, // Moderate rate for vehicle loans
    },
    home: {
      annualIncome: 1200000,
      loanAmount: 5000000,
      downPayment: 1000000,
      tenure: 240, // 20 years for home loans
      interestRate: 7.5, // Lower rate for home loans
    },
    business: {
      annualIncome: 2000000,
      loanAmount: 2000000,
      downPayment: 200000,
      tenure: 84, // 7 years for business loans
      interestRate: 10.0, // Variable rate for business loans
    },
  });

  // Separate calculations for each loan type
  const [calculationsByType, setCalculationsByType] = useState<Record<LoanType, LoanCalculation>>({
    personal: { emi: 0, totalAmount: 0, totalInterest: 0 },
    vehicle: { emi: 0, totalAmount: 0, totalInterest: 0 },
    home: { emi: 0, totalAmount: 0, totalInterest: 0 },
    business: { emi: 0, totalAmount: 0, totalInterest: 0 },
  });

  // Get current loan data for the active loan type
  const currentLoanData = loanDataByType[currentLoanType];
  const currentCalculation = calculationsByType[currentLoanType];

  // Calculate EMI for a specific loan type
  const calculateEMI = (loanType: LoanType, data: LoanTypeData) => {
    const { loanAmount, downPayment, tenure, interestRate } = data;
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = tenure;

    let emi: number, totalAmount: number, totalInterest: number;

    if (monthlyRate === 0) {
      emi = principal / numberOfPayments;
      totalAmount = principal;
      totalInterest = 0;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      totalAmount = emi * numberOfPayments;
      totalInterest = totalAmount - principal;
    }

    // Update calculations for this specific loan type
    setCalculationsByType(prev => ({
      ...prev,
      [loanType]: { emi, totalAmount, totalInterest }
    }));
  };

  // Calculate EMI for current loan type whenever its data changes
  useEffect(() => {
    calculateEMI(currentLoanType, currentLoanData);
  }, [currentLoanType, currentLoanData]);

  // Calculate EMI for all loan types on initial load
  useEffect(() => {
    Object.entries(loanDataByType).forEach(([loanType, data]) => {
      calculateEMI(loanType as LoanType, data);
    });
  }, []); // Only run once on mount

  // Update loan data for the current loan type
  const updateLoanData = (key: keyof LoanTypeData, value: number) => {
    setLoanDataByType(prev => ({
      ...prev,
      [currentLoanType]: {
        ...prev[currentLoanType],
        [key]: value
      }
    }));
  };

  // Handle loan type change
  const handleLoanTypeChange = (newLoanType: LoanType) => {
    setCurrentLoanType(newLoanType);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black min-h-screen relative overflow-hidden">
      {/* Background Circles - More Prominent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient circle - top right */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/40 via-teal-500/35 to-cyan-600/30 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        
        {/* Medium gradient circle - middle right */}
        <div className="absolute top-1/3 -right-16 w-56 h-56 bg-gradient-to-br from-green-400/45 via-emerald-500/40 to-teal-600/35 rounded-full blur-xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        {/* Prominent circle - bottom right */}
        <div className="absolute bottom-32 right-4 w-40 h-40 bg-gradient-to-br from-cyan-400/50 via-teal-500/45 to-emerald-600/40 rounded-full blur-lg animate-pulse" 
             style={{ animationDuration: '3s', animationDelay: '2s' }} />
        
        {/* Enhanced circle - top left */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-blue-400/25 via-indigo-500/20 to-purple-600/15 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '8s', animationDelay: '0.5s' }} />
        
        {/* Bottom accent circle - larger and more visible */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-t from-orange-400/35 via-amber-500/30 to-yellow-600/25 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '3s' }} />
        
        {/* Additional floating circle - middle left */}
        <div className="absolute top-2/3 -left-12 w-48 h-48 bg-gradient-to-br from-pink-400/30 via-rose-500/25 to-red-600/20 rounded-full blur-xl animate-pulse" 
             style={{ animationDuration: '7s', animationDelay: '4s' }} />
        
        {/* Small accent circle - top center */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-violet-400/35 via-purple-500/30 to-indigo-600/25 rounded-full blur-lg animate-pulse" 
             style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
      </div>

      {/* Main Content - with enhanced backdrop */}
      <div className="relative z-10 p-6 space-y-8 backdrop-blur-[1px]">
        {/* Header with Logout Button */}
        <div className="pt-4 relative">
          {/* Back/Logout Button - Fixed */}
          {onLogout && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Back button clicked'); // Debug log
                onLogout();
              }}
              className="absolute left-0 top-4 w-12 h-12 bg-white/15 border border-white/25 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/25 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 group shadow-lg cursor-pointer z-50"
            >
              <svg 
                className="w-6 h-6 text-white group-hover:text-white transition-colors pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
            </button>
          )}
          
          {/* Title */}
          <div className="text-center pt-2">
            <h1 className="text-neutral-100 text-3xl font-semibold mb-2 drop-shadow-lg">Loan-o-Meter</h1>
            <p className="text-neutral-100 text-base font-normal drop-shadow-md">See Your Payments Before They See You!</p>
          </div>
        </div>

        {/* Loan Type Selection - Swipeable Carousel */}
        <LoanTypeCarousel 
          selectedType={currentLoanType}
          onTypeChange={handleLoanTypeChange}
        />

        {/* Input Fields Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-xl font-semibold drop-shadow-md">Add following details</h2>
            <div className="text-white/50 text-sm">
              {currentLoanType.charAt(0).toUpperCase() + currentLoanType.slice(1)} Loan
            </div>
          </div>
          
          {/* Annual Income */}
          <SliderInput
            label="Annual Income"
            value={currentLoanData.annualIncome}
            min={100000}
            max={10000000}
            step={10000}
            format="currency"
            onChange={(value) => updateLoanData('annualIncome', value)}
          />

          {/* Loan Amount */}
          <SliderInput
            label="Loan Amount"
            value={currentLoanData.loanAmount}
            min={50000}
            max={currentLoanType === 'home' ? 20000000 : 10000000}
            step={10000}
            format="currency"
            onChange={(value) => updateLoanData('loanAmount', value)}
          />

          {/* Down Payment */}
          <SliderInput
            label="Down payment"
            value={currentLoanData.downPayment}
            min={0}
            max={currentLoanData.loanAmount * 0.8}
            step={5000}
            format="currency"
            onChange={(value) => updateLoanData('downPayment', value)}
          />

          {/* Tenure */}
          <SliderInput
            label="Tenure"
            value={currentLoanData.tenure}
            min={6}
            max={currentLoanType === 'home' ? 360 : currentLoanType === 'personal' ? 60 : 120}
            step={1}
            format="months"
            onChange={(value) => updateLoanData('tenure', value)}
          />

          {/* Interest Rate */}
          <SliderInput
            label="Interest rate"
            value={currentLoanData.interestRate}
            min={1.0}
            max={25.0}
            step={0.1}
            format="percentage"
            onChange={(value) => updateLoanData('interestRate', value)}
          />
        </div>

        {/* Results Display */}
        <div className="pb-8">
          <ResultDisplay 
            emi={currentCalculation.emi}
            totalAmount={currentCalculation.totalAmount}
            totalInterest={currentCalculation.totalInterest}
            loanAmount={currentLoanData.loanAmount - currentLoanData.downPayment}
          />
        </div>
      </div>
    </div>
  );
}