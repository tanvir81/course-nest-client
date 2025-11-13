import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  // Fetch course by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => toast.error("Failed to load course"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { _id, ...safeCourse } = course;

    try {
      await axios.patch(`http://localhost:3000/courses/${id}`, safeCourse);
      toast.success("Course updated successfully!");
      navigate("/my-courses");
    } catch (err) {
      toast.error("Update failed");
      console.error("PATCH error:", err);
    }
  };

  if (!course) return <Spinner />;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Update Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={course.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          placeholder="Duration (e.g. 6 weeks)"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={course.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={course.description || ""}
          onChange={handleChange}
          placeholder="Course Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={course.isFeatured || false}
            onChange={handleChange}
          />
          Mark as Featured
        </label>
        <button
          type="submit"
          className="btn text-black  bg-yellow-400 rounded-lg hover:bg-yellow-600 w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
