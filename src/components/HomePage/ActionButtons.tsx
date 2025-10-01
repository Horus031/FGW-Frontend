import { ArrowRight } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <button className="cursor-pointer text-white p-6 rounded-xl transition-colors flex items-center justify-between group col-span-2 hover:opacity-80" style={{ backgroundColor: '#00033D', width: '600px', height: '100px' }}>
          <span className="font-semibold text-left" style={{ fontFamily: 'var(--font-public)', fontSize: '28px', lineHeight: '1.1' }}>Attendance<br />Report</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" style={{ color: '#FFFFFF', strokeWidth: 4 }}  />
        </button>

        <button className="cursor-pointer bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group" style={{ width: '292px', height: '100px' }}>
          <span className="font-semibold text-left" style={{ fontFamily: 'var(--font-public)', fontSize: '28px', lineHeight: '1.1' }}>Mark<br />Report</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" style={{ color: '#00033D', strokeWidth: 4 }} />
        </button>

        <button
          className="cursor-pointer bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
          onClick={() => console.log('Room Booking clicked')}
          style={{ width: '292px', height: '100px' }}
        >
          <span className="font-semibold text-left" style={{ fontFamily: 'var(--font-public)', fontSize: '28px', lineHeight: '1.1' }}>Room<br />Booking</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" style={{ color: '#00033D', strokeWidth: 4 }} />
        </button>

        <button
          className="cursor-pointer bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
          onClick={() => console.log('Wallet clicked')}
          style={{ width: '292px', height: '100px' }}
        >
          <span className="font-semibold text-left" style={{ fontFamily: 'var(--font-public)', fontSize: '28px' }}>Wallet</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" style={{ color: '#00033D', strokeWidth: 4 }} />
        </button>

        <button
          className="cursor-pointer bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
          onClick={() => console.log('See all clicked')}
          style={{ width: '292px', height: '100px' }}
        >
          <span className="font-semibold text-left" style={{ fontFamily: 'var(--font-public)', fontSize: '28px' }}>See all</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" style={{ color: '#00033D', strokeWidth: 4 }} />
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;