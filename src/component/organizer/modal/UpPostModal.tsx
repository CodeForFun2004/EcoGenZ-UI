import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createActivity,
  clearErrors,
} from "../../../redux/features/activities/activityThunk";
import type { RootState, AppDispatch } from "../../../redux/store";
import type { ActivityFormData } from "../../../redux/features/activities/activityTypes";
import "../../activity/CreateActivity.css"; // Import your custom styles
import "./UpPostModal.css";
import { toast } from "react-toastify";

interface ModalUpPostProps {
  show: boolean;
  handleClose: () => void;
}

export function ModalUpPost({ show, handleClose }: ModalUpPostProps) {
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
  const [provinces, setProvinces] = useState<string[]>([]);
  const [provinceLoading, setProvinceLoading] = useState(false);
  const [provinceError, setProvinceError] = useState("");

  useEffect(() => {
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchProvinces = async () => {
      setProvinceLoading(true);
      setProvinceError("");
      try {
        const res = await fetch("https://vietnamlabs.com/api/vietnamprovince");
        if (!res.ok) throw new Error("Failed to fetch provinces");
        const data = await res.json();
        setProvinces(
          Array.isArray(data.data) ? data.data.map((p: any) => p.province) : []
        );
      } catch (err: any) {
        setProvinceError(err.message || "Failed to fetch provinces");
      } finally {
        setProvinceLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amountOfPeople" ? parseInt(value) || 1 : value,
    }));

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
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    else if (formData.title.length > 100)
      errors.title = "Title can't exceed 100 characters";

    if (!formData.description.trim()) errors.description = "Description is required";
    else if (formData.description.length > 1000)
      errors.description = "Description can't exceed 1000 characters";

    if (!formData.location.trim()) errors.location = "Location is required";

    if (formData.amountOfPeople < 1)
      errors.amountOfPeople = "Amount of people must be at least 1";

    if (!formData.date) errors.date = "Date is required";
    else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now) errors.date = "Date must be in the future";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError("");

    if (!validateForm()) return;

    const userId = localStorage.getItem("userId");
    if (!userId || userId.length < 10) {
      setUserError("Bạn cần đăng nhập với tài khoản công ty để tạo activity.");
      return;
    }

    try {
      await dispatch(
        createActivity({ ...formData, createdByCompanyId: userId })
      ).unwrap();

      toast.success("Activity created successfully!");
      handleReset();
      handleClose();
      navigate("/blog-page");
    } catch (error) {
      toast.error("Failed to create activity. Please try again.");
      console.error("Create activity error:", error);
      if (error instanceof Error) {
        setUserError(error.message);
      } else {
        setUserError("An unexpected error occurred. Please try again.");
      }
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
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
      dialogClassName="up-post-modal-centered"
    >
      <Modal.Body>
        <div className="create-activity-container">
          <div className="create-activity-header">
            <h1>Create New Activity</h1>
            <p>Share your environmental initiative with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="create-activity-form">
            {userError && <div className="error-banner"><p>{userError}</p></div>}

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
              />
              {formErrors.title && <span className="error-message">{formErrors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={formErrors.description ? "error" : ""}
                placeholder="Describe your activity..."
                rows={5}
              />
              {formErrors.description && <span className="error-message">{formErrors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) =>
                  handleInputChange({ target: { name: "location", value: e.target.value } } as any)
                }
                className={formErrors.location ? "error" : ""}
                disabled={provinceLoading}
              >
                <option value="">-- Select province --</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {provinceLoading && <span>Loading provinces...</span>}
              {provinceError && <span className="error-message">{provinceError}</span>}
            </div>

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

            {createError && (
              <div className="error-banner">
                <p>Error: {createError}</p>
              </div>
            )}

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
      </Modal.Body>
    </Modal>
  );
}
