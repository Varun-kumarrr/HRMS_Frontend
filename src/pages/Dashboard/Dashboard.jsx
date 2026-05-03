import { useEffect } from "react";
import Layout from "../../components/Layout";
import { Users, Activity, Clock } from "lucide-react";

const Dashboard = () => {

useEffect(async ()=>{
     const data= await axios.get("/api/me/");
     console.log(data);
     
},[])

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">Total Employees</h3>
            <Users className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-4">120</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">Active Today</h3>
            <Activity className="text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-4">98</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">Pending Leaves</h3>
            <Clock className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold mt-4">12</p>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;