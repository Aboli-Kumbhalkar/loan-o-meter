'use client';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: 'currency' | 'months' | 'percentage';
  onChange: (value: number) => void;
}

export default function SliderInput({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  format, 
  onChange 
}: SliderInputProps) {
  
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'months':
        return `${val} Month${val !== 1 ? 's' : ''}`;
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return val.toString();
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      {/* Label and Value with Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-white text-sm font-normal">{label}</div>
        <div className="flex items-center space-x-0.5">
          {/* Minus Button */}
          <button
            onClick={() => onChange(Math.max(min, value - step))}
            disabled={value <= min}
            className="w-6 h-6 bg-white/20 rounded text-white text-sm font-bold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            −
          </button>
          
          {/* Value Display */}
          <div className="text-white text-lg font-semibold min-w-[120px] text-center">
            {formatValue(value)}
          </div>
          
          {/* Plus Button */}
          <button
            onClick={() => onChange(Math.min(max, value + step))}
            disabled={value >= max}
            className="w-6 h-6 bg-white/20 rounded text-white text-sm font-bold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Slider Track */}
        <div className="w-full h-2 bg-white/10 rounded-lg relative backdrop-blur-sm border border-white/20">
          {/* Progress Fill */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400/40 to-blue-600/40 rounded-lg transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Slider Thumb */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer transition-all hover:scale-110 z-10"
            style={{ left: `calc(${percentage}% - 12px)` }}
          />
          
          {/* Hidden Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

      </div>
    </div>
  );
}