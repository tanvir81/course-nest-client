import React, { useEffect, useState } from "react";
import useAxios from "../../api/useAxios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { HiPlus, HiPencil, HiTrash, HiStar, HiEye, HiChartBar } from "react-icons/hi";
import GlobalLoader from "../Shared/GlobalLoader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Swal from "sweetalert2";

const MyCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyCourses();
    }
  }, [user]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/courses?owner=${user.email}`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: "This action will permanently remove the course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/courses/${id}`);
        toast.success("Course removed!");
        setCourses(courses.filter((c) => c._id !== id));
      } catch (err) {
        toast.error("Failed to delete course");
      }
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await axiosSecure.patch(`/courses/${id}`, {
          isFeatured: !currentStatus,
      });
      toast.success("Visibility updated!");
      setCourses(courses.map((c) => c._id === id ? { ...c, isFeatured: !currentStatus } : c));
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const totalRevenue = courses.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  const featuredCount = courses.filter(c => c.isFeatured).length;

  const chartData = courses.slice(0, 10).map(c => ({
    name: c.title.substring(0, 12) + "...",
    price: c.price
  }));

  const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#14b8a6"];

  if (loading) return <GlobalLoader message="Loading your courses..." />;

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Dashboard Header */}
      <div className="section-banner py-24 text-white">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
           <div>
              <h1 className="text-5xl font-black mb-4 tracking-tighter">Instructor <span className="italic text-[#8B5CF6]">Workspace.</span></h1>
              <p className="text-neutral-400 font-medium text-lg">Manage your curriculum and monitor performance metrics.</p>
           </div>
           <Link to="/add-course" className="px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-2xl shadow-white/5 flex items-center gap-3">
              <HiPlus className="text-lg" /> Publish Course
           </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 flex items-center gap-8 group hover:border-black transition-all">
               <div className="w-20 h-20 bg-neutral-50 text-black rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:bg-black group-hover:text-white transition-all"><HiStar /></div>
               <div>
                  <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">Total Published</div>
                  <div className="text-4xl font-black tracking-tighter">{courses.length}</div>
               </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 flex items-center gap-8 group hover:border-black transition-all">
               <div className="w-20 h-20 bg-neutral-50 text-black rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:bg-black group-hover:text-white transition-all"><HiEye /></div>
               <div>
                  <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">Featured Elite</div>
                  <div className="text-4xl font-black tracking-tighter">{featuredCount}</div>
               </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 flex items-center gap-8 group hover:border-black transition-all">
               <div className="w-20 h-20 bg-neutral-50 text-black rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:bg-black group-hover:text-white transition-all">$</div>
               <div>
                  <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">Market Value</div>
                  <div className="text-4xl font-black tracking-tighter">${totalRevenue.toFixed(2)}</div>
               </div>
            </div>
         </div>

         {/* Chart & Table */}
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5">
                <div className="flex items-center justify-between mb-12">
                   <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                     <HiChartBar className="text-neutral-300" /> Valuation.
                   </h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full">Top 10 Courses</span>
                </div>
                <div className="h-[350px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={chartData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0001" />
                       <XAxis dataKey="name" hide />
                       <YAxis stroke="#000" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                       <Tooltip 
                         cursor={{ fill: '#f9f9f9' }}
                         contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "1.5rem", color: "#fff", padding: "1.5rem" }}
                         itemStyle={{ color: "#fff", fontWeight: "900", fontSize: "0.8rem" }}
                         labelStyle={{ display: "none" }}
                       />
                       <Bar dataKey="price" radius={[12, 12, 12, 12]}>
                         {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                       </Bar>
                     </BarChart>
                   </ResponsiveContainer>
                </div>
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-neutral-300 mt-10">Market value distribution per unit.</p>
            </div>

            {/* Table */}
            <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 overflow-hidden">
               <div className="p-10 border-b border-black/5 bg-neutral-50/50 flex justify-between items-center">
                  <h3 className="text-2xl font-black tracking-tighter">Inventory.</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{courses.length} entries</span>
               </div>
               <div className="overflow-x-auto">
                  <table className="table w-full border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-neutral-50/30">
                        <th className="py-8 px-10 font-black uppercase tracking-[0.2em] text-[10px] text-neutral-400 border-b border-black/5">Course</th>
                        <th className="py-8 font-black uppercase tracking-[0.2em] text-[10px] text-neutral-400 text-center border-b border-black/5">Price</th>
                        <th className="py-8 font-black uppercase tracking-[0.2em] text-[10px] text-neutral-400 text-center border-b border-black/5">Tier</th>
                        <th className="py-8 px-10 font-black uppercase tracking-[0.2em] text-[10px] text-neutral-400 text-right border-b border-black/5">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course._id} className="hover:bg-neutral-50 transition-colors group">
                          <td className="py-8 px-10 border-b border-black/5">
                            <div className="flex items-center gap-6">
                              <img src={course.imageUrl} className="w-16 h-16 rounded-[1rem] object-cover transition-all duration-500 shadow-xl" alt="" />
                              <div>
                                <div className="font-black text-lg tracking-tight mb-1">{course.title}</div>
                                <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">{course.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center font-black py-8 border-b border-black/5 text-xl tracking-tighter">${course.price}</td>
                          <td className="text-center py-8 border-b border-black/5">
                             <button 
                                onClick={() => handleToggleFeatured(course._id, course.isFeatured)}
                                className={`px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all ${course.isFeatured ? "bg-black text-white border-black" : "bg-white text-neutral-300 border-black/5 hover:border-black hover:text-black"}`}
                             >
                                {course.isFeatured ? "Featured" : "Elite"}
                             </button>
                          </td>
                          <td className="py-8 px-10 text-right space-x-3 border-b border-black/5">
                             <Link to={`/update-course/${course._id}`} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-neutral-100 text-black hover:bg-black hover:text-white transition-all">
                                <HiPencil />
                             </Link>
                             <button onClick={() => handleDelete(course._id)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-neutral-100 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <HiTrash />
                             </button>
                          </td>
                        </tr>
                      ))}
                      {courses.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-32 opacity-30 font-black uppercase tracking-widest text-[10px]">No publications found in the vault.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MyCourses;
