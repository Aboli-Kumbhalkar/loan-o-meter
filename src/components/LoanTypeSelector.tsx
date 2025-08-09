'use client';

interface LoanTypeSelectorProps {
  selectedType: 'personal' | 'vehicle' | 'home' | 'business';
  onTypeChange: (type: 'personal' | 'vehicle' | 'home' | 'business') => void;
}

export default function LoanTypeSelector({ selectedType, onTypeChange }: LoanTypeSelectorProps) {
  const loanTypes = [
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'vehicle', label: 'Vehicle', icon: '🚗' },
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'business', label: 'Business', icon: '💼' }
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-3">
      {loanTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          className={`flex flex-col items-center justify-center h-20 rounded-lg transition-all duration-300 ${
            selectedType === type.id
              ? 'bg-white/20 outline outline-1 outline-white/50 text-white scale-105'
              : 'bg-white/10 outline outline-1 outline-white/20 text-white/70 hover:bg-white/15 hover:scale-105'
          }`}
        >
          <div className="text-lg mb-1">{type.icon}</div>
          <span className="text-xs font-medium">{type.label}</span>
          {selectedType === type.id && (
            <div className="w-2 h-2 rounded-full bg-green-400 mt-1" />
          )}
        </button>
      ))}
    </div>
  );
}