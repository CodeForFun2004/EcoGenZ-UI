import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createActivity,
  clearErrors,
} from "../../redux/features/activities/activityThunk";
import type { RootState, AppDispatch } from "../../redux/store";
import type { ActivityFormData } from "../../redux/features/activities/activityTypes";
import "./CreateActivity.css";
import { toast } from "react-toastify";

const CreateActivity: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { createLoading, createError } = useSelector(
    (state: RootState) => state.activityCreate
  );

  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    description: "",
    location: "",
    amountOfPeople: 1,
    date: "",
    imageFile: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [userError, setUserError] = useState<string>("");

  // Clear errors khi component mount
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Clear create error khi unmount
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amountOfPeople" ? parseInt(value) || 1 : value,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length > 100) {
      errors.title = "Title can't exceed 100 characters";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length > 1000) {
      errors.description = "Description can't exceed 1000 characters";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    } else if (formData.location.length > 200) {
      errors.location = "Location can't exceed 200 characters";
    }

    if (formData.amountOfPeople < 1) {
      errors.amountOfPeople = "Amount of people must be at least 1";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now) {
        errors.date = "Date must be in the future";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError("");

    if (!validateForm()) {
      return;
    }

    // Kiểm tra userId hợp lệ
    const userId = localStorage.getItem("userId");
    if (!userId || userId.length < 10) {
      // GUID tối thiểu 10 ký tự
      setUserError("Bạn cần đăng nhập với tài khoản công ty để tạo activity.");
      return;
    }

    try {
      await dispatch(
        createActivity({ ...formData, createdByCompanyId: userId })
      ).unwrap();

      toast.success("Activity created successfully!");
      navigate("/blog-page");
    } catch (error) {
      // Error will be handled by Redux state
      console.error("Failed to create activity:", error);
      toast.error("Failed to create activity. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      amountOfPeople: 1,
      date: "",
      imageFile: undefined,
    });
    setImagePreview("");
    setFormErrors({});
    setUserError("");
    dispatch(clearErrors());
  };

  return (
    <div className="create-activity-container">
      <div className="create-activity-header">
        <h1>Create New Activity</h1>
        <p>Share your environmental initiative with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="create-activity-form">
        {/* Hiển thị lỗi userId nếu có */}
        {userError && (
          <div className="error-banner">
            <p>{userError}</p>
          </div>
        )}

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Activity Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={formErrors.title ? "error" : ""}
            placeholder="Enter activity title..."
            maxLength={100}
          />
          {formErrors.title && (
            <span className="error-message">{formErrors.title}</span>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={formErrors.description ? "error" : ""}
            placeholder="Describe your activity..."
            maxLength={1000}
            rows={5}
          />
          {formErrors.description && (
            <span className="error-message">{formErrors.description}</span>
          )}
          <span className="char-count">{formData.description.length}/1000</span>
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={formErrors.location ? "error" : ""}
            placeholder="Enter location..."
            maxLength={200}
          />
          {formErrors.location && (
            <span className="error-message">{formErrors.location}</span>
          )}
        </div>

        {/* Amount of People & Date */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amountOfPeople">Number of Participants *</label>
            <input
              type="number"
              id="amountOfPeople"
              name="amountOfPeople"
              value={formData.amountOfPeople}
              onChange={handleInputChange}
              className={formErrors.amountOfPeople ? "error" : ""}
              min="1"
            />
            {formErrors.amountOfPeople && (
              <span className="error-message">{formErrors.amountOfPeople}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Activity Date *</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={formErrors.date ? "error" : ""}
            />
            {formErrors.date && (
              <span className="error-message">{formErrors.date}</span>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="imageFile">Activity Image</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        {/* Error Display */}
        {createError && (
          <div className="error-banner">
            <p>Error: {createError}</p>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            disabled={createLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={createLoading}
          >
            {createLoading ? "Creating..." : "Create Activity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;
