'use client';

interface ResultDisplayProps {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  loanAmount: number;
}

export default function ResultDisplay({ 
  emi, 
  totalAmount, 
  totalInterest, 
  loanAmount 
}: ResultDisplayProps) {
  
  const formatCurrency = (amount: number) => {
    return `$${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Main EMI Display */}
      <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
        <div className="text-center">
          <div className="text-white/70 text-sm font-normal mb-2">Monthly EMI</div>
          <div className="text-white text-4xl font-bold">{formatCurrency(emi)}</div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
          <div className="text-white/70 text-xs font-normal mb-1">Principal Amount</div>
          <div className="text-white text-lg font-semibold">{formatCurrency(loanAmount)}</div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
          <div className="text-white/70 text-xs font-normal mb-1">Total Interest</div>
          <div className="text-white text-lg font-semibold">{formatCurrency(totalInterest)}</div>
        </div>
      </div>
      
      <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
        <div className="text-white/70 text-xs font-normal mb-1">Total Amount Payable</div>
        <div className="text-white text-2xl font-semibold">{formatCurrency(totalAmount)}</div>
      </div>

      {/* Visual breakdown bar */}
      <div className="space-y-2">
        <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
            style={{ width: `${totalAmount > 0 ? (loanAmount / totalAmount) * 100 : 0}%` }}
          />
          <div 
            className="bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
            style={{ width: `${totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>Principal: {totalAmount > 0 ? ((loanAmount / totalAmount) * 100).toFixed(1) : 0}%</span>
          <span>Interest: {totalAmount > 0 ? ((totalInterest / totalAmount) * 100).toFixed(1) : 0}%</span>
        </div>
      </div>
    </div>
  );
}