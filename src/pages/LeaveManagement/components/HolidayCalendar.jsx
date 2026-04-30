import { HOLIDAYS } from '../constants';

const HolidayCalendar = () => {
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = HOLIDAYS.filter((h) => h.date >= today);
  const past = HOLIDAYS.filter((h) => h.date < today);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Holiday Calendar</h3>
          <p className="text-sm text-gray-500 mt-0.5">Public holidays are excluded from leave day count.</p>
        </div>
        <span className="text-sm text-gray-400">{upcoming.length} upcoming holiday{upcoming.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="mb-5">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Upcoming</h4>
          <ul className="space-y-2">
            {upcoming.map((h) => {
              const isToday = h.date === today;
              return (
                <li
                  key={h.date}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                    isToday ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isToday ? 'bg-blue-500' : 'bg-green-400'}`}
                    />
                    <span className="font-medium text-gray-800 text-sm">{h.name}</span>
                  </div>
                  <span className={`text-xs font-medium ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                    {formatDate(h.date)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Past This Year</h4>
          <ul className="space-y-2">
            {past.map((h) => (
              <li
                key={h.date}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />
                  <span className="font-medium text-gray-600 text-sm">{h.name}</span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(h.date)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default HolidayCalendar;
