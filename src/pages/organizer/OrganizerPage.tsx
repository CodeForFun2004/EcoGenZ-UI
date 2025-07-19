
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Col, Alert } from "react-bootstrap";
import { AppSidebar } from "../../component/organizer/AppSidebar";
import { PageHeader } from "../../component/organizer/PageHeader";
import { CategorySearch } from "../../component/organizer/CategorySearch";
import { PostCard } from "../../component/organizer/PostCard";
import { useRequireCompanyRole, useAuth } from "../../hooks/useAuth";
import { fetchOrganizerActivities } from "../../redux/features/organizerActivities/organizerActivitiesThunk";
import type { RootState } from "../../redux/store";
import type { AppDispatch } from "../../redux/store";

export default function OrganizationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isCompany } = useRequireCompanyRole();
  const { user } = useAuth();
  const { activities, loading, error } = useSelector(
    (state: RootState) => state.organizerActivities
  );

  useEffect(() => {
    if (user && isAuthenticated && isCompany) {
      dispatch(fetchOrganizerActivities(user.userId));
    }
  }, [dispatch, user, isAuthenticated, isCompany]);

  if (!isAuthenticated) {
    return (
      <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
        <Col className="d-flex flex-column ms-16">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Alert variant="info">
              Please log in to access the organizer dashboard.
            </Alert>
          </div>
        </Col>
      </Container>
    );
  }

  if (!isCompany) {
    return (
      <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
        <Col className="d-flex flex-column ms-16">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Alert variant="warning">
              You don't have permission to access the organizer dashboard.
            </Alert>
          </div>
        </Col>
      </Container>
    );
  }

  // Convert activities to PostCard format
  const convertActivityToPostCard = (activity: any) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    };

    return {
      organizationName:
        activity.companyUser?.userName || "Unknown Organization",
      organizationAvatar:
        activity.companyUser?.profilePhotoUrl ||
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery.svg?height=40&width=40",
      timeAgo: formatDate(activity.date),
      postImage:
        activity.mediaUrl ||
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1IsNDV.img?w=1080&h=607&m=4&q=91",
      title: activity.title,
      hashtag: "#environment #community #volunteer",
      description: activity.description,
      likes: "0",
      comments: activity.comments?.length || 0,
      shares: 0,
      members: activity.amountOfPeople,
      activityId: activity.activityId,
      isApproved: activity.isApproved,
      activityDate: activity.date,
    };
  };


  return (
    <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
      <AppSidebar />

      {/* Leave ms-16 for Col to create spacing with sidebar */}
      <Col className="d-flex flex-column ms-16 flex-grow-1"> {/* Add flex-grow-1 for Col to take remaining space */}
        
        <main className="flex-grow-1 p-4 p-md-6 p-lg-8 overflow-auto">
          {/* Wrap h3 and CategorySearch in a div for alignment */}
          <div className="content-header-area"> {/* Add new class for styling */}
            <h3 className="page-title mb-4">Manage Post</h3> {/* Add class and mb-4 */}
            <CategorySearch userId={user?.userId} />
          </div>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {loading && activities.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted">No activities found</h5>
              <p className="text-muted">
                Start by creating your first activity.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-6 w-100">
              {activities.map((activity: any) => {
                const postData = convertActivityToPostCard(activity);
                return <PostCard key={activity.activityId} {...postData} />;
              })}
            </div>
          )}
          

        </main>
      </Col>
    </Container>
  );
}
