import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./Header.css";

import { useAppDispatch } from "../../redux/hook";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { getUserByIdThunk } from "../../redux/features/auth/authThunk";
const Header = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout());
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(getUserByIdThunk({ userId }));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const stickyHeader = document.getElementById("sticky-header");
      const backTop = document.getElementById("back-top");

      if (window.scrollY < 400) {
        stickyHeader?.classList.remove("sticky");
        backTop?.classList.remove("show");
      } else {
        stickyHeader?.classList.add("sticky");
        backTop?.classList.add("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <div className="header-area">
        <div className="header-top_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6 col-md-12 col-lg-8">
                <div className="short_contact_list">
                  <ul>
                    <li>
                      <a>
                        <i className="fa fa-phone"></i> 0828006916
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-envelope"></i> EcoGenz@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-lg-4">
                <div className="social_media_links d-none d-lg-block">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest-p"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="sticky-header" className="main-header-area">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="main-menu">
                  <nav>
                    <ul id="navigation">
                      <li>
                        <Link to="/">home</Link>
                      </li>
                      <li>
                        <Link to="/ranking-page">Ranking</Link>
                      </li>
                      <li>
                        <Link to="/blog-page">Activities</Link>
                      </li>
                      <li>
                        <Link to="/create-activity">Create Activities</Link>
                      </li>
                      <li>
                        <Link to="/organizer-post">Activities Management</Link>
                      </li>
                      <li>
                        <Link to="/social-feed-page">Community</Link>
                      </li>
                      <li>
                        <Link to="/media-text-page">Media </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="Appointment d-flex align-items-center gap-1">
                    {user ? (
                      (console.log("User found:", user),
                      (
                        <>
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <img
                              src={
                                user.profilePhotoUrl &&
                                user.profilePhotoUrl.trim() !== ""
                                  ? user.profilePhotoUrl
                                  : "https://i.pravatar.cc/40"
                              }
                              alt="avatar"
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                              }}
                            />
                            <span>{user.userName}</span>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="book_btn d-none d-lg-block mb-3"
                          >
                            Logout
                          </button>
                        </>
                      ))
                    ) : (
                      <>
                        <div className="book_btn d-none d-lg-block mb-3">
                          <Link to="/login-page">Login</Link>
                        </div>
                        <div className="book_btn d-none d-lg-block mb-3">
                          <Link to="/signup-page">Signup</Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
