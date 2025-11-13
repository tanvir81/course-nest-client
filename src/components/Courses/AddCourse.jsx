// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../contexts/AuthProvider";
// import { toast } from "react-hot-toast";

// const AddCourse = () => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     title: "",
//     imageUrl: "",
//     price: "",
//     duration: "",
//     category: "",
//     description: "",
//     isFeatured: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataImg = new FormData();
//     formDataImg.append("image", file);

//     try {
//       const res = await axios.post(
//         `https://api.imgbb.com/1/upload?key=51cf2af8b48eb5d916dd2d4dd09b0a3f`,
//         formDataImg
//       );
//       const url = res.data.data.display_url;
//       setFormData((prev) => ({ ...prev, imageUrl: url }));
//       toast.success("Image uploaded successfully!");
//     } catch (err) {
//       console.log(err);
//       toast.error("Image upload failed");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newCourse = {
//       ...formData,
//       price: Number(formData.price),
//       owner: user?.email,
//       ownerName: user?.displayName || "Anonymous",
//       ownerPhoto: user?.photoURL || "https://i.ibb.co/placeholder.png",
//     };

//     try {
//       await axios.post("http://localhost:3000/courses", newCourse);
//       toast.success("Course added successfully!");
//       setFormData({
//         title: "",
//         imageUrl: "",
//         price: "",
//         duration: "",
//         category: "",
//         description: "",
//         isFeatured: false,
//       });
//     } catch (err) {
//       toast.error("Failed to add course: " + err.message);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Add New Course</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/*  Instructor  auto-filled Info from Firebase */}
//         <div className="space-y-2 border p-4 rounded-md bg-base-200">
//           <h2 className="font-semibold mb-2">Instructor Details</h2>
//           <input
//             type="text"
//             value={user?.displayName || "Anonymous"}
//             readOnly
//             className="input input-bordered w-full"
//           />
//           <input
//             type="email"
//             value={user?.email || ""}
//             readOnly
//             className="input input-bordered w-full"
//           />
//           <div className="flex items-center gap-3">
//             <img
//               src={
//                 user?.photoURL || "https://i.postimg.cc/3x3QzSGq/profile.png"
//               }
//               alt="Instructor"
//               referrerPolicy="no-referrer"
//               className="w-12 h-12 rounded-full border object-cover"
//               onError={(e) => {
//                 e.currentTarget.src =
//                   "https://i.postimg.cc/3x3QzSGq/profile.png";
//               }}
//             />
//             <span className="text-sm text-gray-600">Instructor Photo</span>
//           </div>
//         </div>

//         {/*Course Fields */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Course Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="file-input file-input-bordered w-full"
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <input
//           type="text"
//           name="duration"
//           placeholder="Duration (e.g. 6h)"
//           value={formData.duration}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//           required
//         />

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="isFeatured"
//             checked={formData.isFeatured}
//             onChange={handleChange}
//           />
//           <span>Mark as Featured</span>
//         </label>

//         <button type="submit" className="btn btn-primary w-full">
//           Add Course
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCourse;

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const AddCourse = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=51cf2af8b48eb5d916dd2d4dd09b0a3f`,
        formDataImg
      );
      const url = res.data.data.display_url;
      setFormData((prev) => ({ ...prev, imageUrl: url }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...formData,
      price: Number(formData.price),
      owner: user?.email,
      ownerName: user?.displayName || "Anonymous",
      ownerPhoto: user?.photoURL || "https://i.ibb.co/placeholder.png",
    };

    try {
      await axios.post("http://localhost:3000/courses", newCourse);
      toast.success("Course added successfully!");
      setFormData({
        title: "",
        imageUrl: "",
        price: "",
        duration: "",
        category: "",
        description: "",
        isFeatured: false,
      });
    } catch (err) {
      toast.error("Failed to add course: " + err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/pattern.jpg')" }}
    >
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Add New Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Instructor Info */}
          <div className="space-y-2 border p-4 rounded-md bg-white">
            <h2 className="font-semibold mb-2">Instructor Details</h2>
            <input
              type="text"
              value={user?.displayName || "Anonymous"}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
            <div className="flex items-center gap-3">
              <img
                src={
                  user?.photoURL || "https://i.postimg.cc/3x3QzSGq/profile.png"
                }
                alt="Instructor"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full border object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://i.postimg.cc/3x3QzSGq/profile.png";
                }}
              />
              <span className="text-sm text-gray-600">Instructor Photo</span>
            </div>
          </div>

          {/* Course Fields */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 6h)"
            value={formData.duration}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <span>Mark as Featured</span>
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
