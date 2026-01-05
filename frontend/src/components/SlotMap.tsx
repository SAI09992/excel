import React from 'react';
import { Slot } from '../types';

interface SlotMapProps {
    slots: Slot[];
    onSlotSelect?: (slot: Slot) => void;
}

const SlotMap: React.FC<SlotMapProps> = ({ slots, onSlotSelect }) => {
    if (!slots || slots.length === 0) {
        return <div className="text-gray-500 text-center py-8">No slots available</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-xl">
            {slots.map((slot) => {
                let colorClass = 'bg-gray-800 border-gray-700 text-gray-500';
                let statusText = 'Unknown';

                if (slot.status === 'AVAILABLE') {
                    colorClass = 'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30 cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.1)]';
                    statusText = slot.slotNumber;
                }
                if (slot.status === 'OCCUPIED') {
                    colorClass = 'bg-red-500/20 border-red-500/50 text-red-400 opacity-60';
                    statusText = 'Occupied';
                }
                if (slot.status === 'RESERVED') {
                    colorClass = 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 opacity-80';
                    statusText = 'Reserved';
                }

                return (
                    <div
                        key={slot._id}
                        onClick={() => slot.status === 'AVAILABLE' && onSlotSelect?.(slot)}
                        className={`${colorClass} border h-28 rounded-2xl flex flex-col items-center justify-center font-bold text-xl transition-all transform hover:scale-105 relative overflow-hidden group`}
                    >
                        {/* Status Indicator Dot */}
                        <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${slot.status === 'AVAILABLE' ? 'bg-green-500 animate-pulse' : slot.status === 'OCCUPIED' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>

                        <span className="text-2xl mb-1">{slot.slotNumber}</span>
                        <span className="text-xs font-normal uppercase tracking-wider opacity-70">{slot.status}</span>

                        {slot.status === 'AVAILABLE' && (
                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SlotMap;
