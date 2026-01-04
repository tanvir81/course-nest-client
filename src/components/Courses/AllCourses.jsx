import React, { useEffect, useState } from "react";
import useAxios from "../api/useAxios";
import CourseCard from "../Shared/CourseCard";
import SectionHeader from "../Shared/SectionHeader";
import CourseGridSkeleton from "../Shared/CourseGridSkeleton";
import { HiSearch, HiFilter, HiSortAscending, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxios();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [priceRange, setPriceRange] = useState(1000);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/courses");
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...courses];
    if (search) {
      result = result.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== "All") {
      result = result.filter(c => c.category === category);
    }
    result = result.filter(c => c.price <= priceRange);
    if (sort === "Price Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Price High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "Latest") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, category, priceRange, sort, courses]);

  const categories = ["All", ...new Set(courses.map(c => c.category))];

  // Pagination calculations
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white pb-32 font-['Outfit'] antialiased">
      {/* Banner */}
      <div className="section-banner py-24 text-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Explore Our <span className="italic text-[#8B5CF6]">Catalog.</span></h1>
           <p className="text-neutral-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Choose from our curated collection of online creative courses with new additions every month.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white border border-black/5 shadow-2xl rounded-[2.5rem] p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center">
           {/* Search */}
           <div className="relative w-full lg:w-1/3">
             <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 text-xl" />
             <input 
               type="text" 
               placeholder="Search courses..." 
               className="w-full h-16 pl-14 pr-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all font-medium"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>

           {/* Filter Group */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:flex-1">
              {/* Category */}
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1 flex items-center gap-2">
                   <HiFilter /> Category
                 </label>
                 <select 
                    className="w-full h-16 px-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all font-bold appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                 >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                 </select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1">Max Price: ${priceRange}</label>
                 <div className="h-16 flex items-center px-4 bg-neutral-50 rounded-[1.5rem] border border-black/5">
                   <input 
                    type="range" min="0" max="1000" 
                    className="w-full accent-black h-1"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                   />
                 </div>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-neutral-400 ml-1 flex items-center gap-2">
                   <HiSortAscending /> Sort By
                 </label>
                 <select 
                    className="w-full h-16 px-6 rounded-[1.5rem] bg-neutral-50 border border-black/5 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all font-bold appearance-none cursor-pointer"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                 >
                    <option value="Latest">Latest Additions</option>
                    <option value="Price Low to High">Low to High</option>
                    <option value="Price High to Low">High to Low</option>
                 </select>
              </div>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        {loading ? (
          <CourseGridSkeleton />
        ) : (
          <>
            <div className="mb-10 flex justify-between items-end px-2 border-b border-black/5 pb-6">
               <h2 className="font-black text-3xl tracking-tighter">Showing <span className="text-neutral-400">{filteredCourses.length}</span> Results</h2>
               <button className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors" onClick={() => {
                 setSearch(""); setCategory("All"); setPriceRange(1000); setSort("Latest");
               }}>Reset All Filters</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {currentCourses.map((course, idx) => (
                <div key={course._id} data-aos="fade-up" data-aos-delay={idx * 50}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-32 bg-neutral-50 rounded-[3rem] border border-black/5 mt-10">
                <div className="text-8xl mb-8 opacity-20 group-hover:scale-110 transition-transform duration-700">🔍</div>
                <h3 className="text-3xl font-black tracking-tighter">No courses found.</h3>
                <p className="text-neutral-500 font-medium mt-4 max-w-md mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearch(""); setCategory("All"); setPriceRange(1000); }}
                  className="mt-10 px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all"
                >
                  Reset Pursuit
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {filteredCourses.length > coursesPerPage && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  <HiChevronLeft className="text-xl" />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-12 h-12 rounded-full font-black text-sm transition-all ${
                            currentPage === pageNumber
                              ? "bg-black text-white"
                              : "border border-black/10 hover:bg-neutral-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="w-12 h-12 flex items-center justify-center text-neutral-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  <HiChevronRight className="text-xl" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
