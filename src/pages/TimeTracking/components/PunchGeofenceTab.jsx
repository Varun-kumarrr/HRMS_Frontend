import { Fingerprint, MapPin } from "lucide-react";

const PunchGeofenceTab = ({
  isPunchedIn,
  todayInTime,
  todayOutTime,
  workLocation,
  withinGeoFence,
  onPunch,
  onWorkLocationChange,
  onToggleGeoFence,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Punch In/Out</h3>
          <Fingerprint className="text-blue-500" size={20} />
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-600">
          <p>
            Current Status:{" "}
            <span className={isPunchedIn ? "text-green-600 font-semibold" : "text-gray-800 font-semibold"}>
              {isPunchedIn ? "Punched In" : "Punched Out"}
            </span>
          </p>
          <p>Today In: {todayInTime || "--"}</p>
          <p>Today Out: {todayOutTime || "--"}</p>
        </div>

        <button
          onClick={onPunch}
          className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition ${
            isPunchedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPunchedIn ? "Punch Out" : "Punch In"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Geofencing Check</h3>
          <MapPin className="text-blue-500" size={20} />
        </div>

        <div className="mt-5 space-y-4 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">Work Location</label>
            <select
              value={workLocation}
              onChange={(e) => onWorkLocationChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Head Office</option>
              <option>Branch Office</option>
              <option>Client Site</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-gray-600">Current Radius Policy</p>
            <p className="font-semibold text-gray-800 mt-1">Allowed within 300 meters</p>
          </div>

          <button
            onClick={onToggleGeoFence}
            className="w-full border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Simulate Location Check
          </button>

          <p className={`font-medium ${withinGeoFence ? "text-green-600" : "text-red-500"}`}>
            {withinGeoFence
              ? `Location verified for ${workLocation}. Punching allowed.`
              : `Outside geofence for ${workLocation}. Approval required.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PunchGeofenceTab;
