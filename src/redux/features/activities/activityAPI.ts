import type {
  CreateActivityRequest,
  ActivitySearchRequest,
  ActivityFormData,
} from "./activityTypes";

// Sử dụng cùng biến môi trường với BlogPage
const COMPANY_FORM_URL = import.meta.env.VITE_ACTIVITY_URL;

// Debug để kiểm tra giá trị
console.log("VITE_ACTIVITY_URL from env:", import.meta.env.VITE_ACTIVITY_URL);
console.log("COMPANY_FORM_URL:", COMPANY_FORM_URL);

// Lấy tất cả activities
export const fetchAllActivities = async () => {
  const res = await fetch(`${COMPANY_FORM_URL}/get-all-activities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch activities");
  const json = await res.json();
  return json;
};

// Tìm kiếm activities
export const searchActivities = async (
  searchRequest: ActivitySearchRequest
) => {
  const queryParams = new URLSearchParams();

  if (searchRequest.searchTerm)
    queryParams.append("searchTerm", searchRequest.searchTerm);
  if (searchRequest.location)
    queryParams.append("location", searchRequest.location);
  if (searchRequest.dateFrom)
    queryParams.append("dateFrom", searchRequest.dateFrom);
  if (searchRequest.dateTo) queryParams.append("dateTo", searchRequest.dateTo);
  if (searchRequest.sortBy) queryParams.append("sortBy", searchRequest.sortBy);
  if (searchRequest.sortDirection)
    queryParams.append("sortDirection", searchRequest.sortDirection);
  if (searchRequest.page)
    queryParams.append("page", searchRequest.page.toString());
  if (searchRequest.pageSize)
    queryParams.append("pageSize", searchRequest.pageSize.toString());

  const res = await fetch(
    `${COMPANY_FORM_URL}/search-activities?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      },
    }
  );

  if (!res.ok) throw new Error("Failed to search activities");
  const json = await res.json();
  return json;
};

// Lấy activity theo ID
export const fetchActivityById = async (activityId: string) => {
  const res = await fetch(`${COMPANY_FORM_URL}/get-activity/${activityId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch activity");
  const json = await res.json();
  return json;
};

// Tạo activity mới với FormData để support upload file
export const createActivity = async (activityData: ActivityFormData) => {
  const formData = new FormData();

  formData.append("title", activityData.title);
  formData.append("description", activityData.description);
  formData.append("location", activityData.location);
  formData.append("amountOfPeople", activityData.amountOfPeople.toString());
  formData.append("date", activityData.date);

  // Ưu tiên lấy createdByCompanyId từ activityData, fallback về localStorage
  const userId =
    activityData.createdByCompanyId || localStorage.getItem("userId") || "";
  if (!userId) {
    throw new Error("User ID is required to create activity");
  }
  formData.append("createdByCompanyId", userId);
  formData.append("isApproved", "false");

  if (activityData.imageFile) {
    formData.append("imageFile", activityData.imageFile);
  }

  const res = await fetch(`${COMPANY_FORM_URL}/create-activity`, {
    method: "POST",
    headers: {
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create activity: ${errorText}`);
  }

  const json = await res.json();
  return json;
};

// Cập nhật activity
export const updateActivity = async (
  activityData: CreateActivityRequest & { activityId: string }
) => {
  const res = await fetch(`${COMPANY_FORM_URL}/update-activity`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
    body: JSON.stringify(activityData),
  });

  if (!res.ok) throw new Error("Failed to update activity");
  const json = await res.json();
  return json;
};

// Xóa activity
export const deleteActivity = async (activityId: string) => {
  const res = await fetch(`${COMPANY_FORM_URL}/delete-activity/${activityId}`, {
    method: "DELETE",
    headers: {
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
  });

  if (!res.ok) throw new Error("Failed to delete activity");
  return { activityId };
};
