import '../../App.css'
import logo from '../../assets/img/logo.png'

const Header = () => {
  return (
    <header>
    <div className="header-area ">
        <div className="header-top_area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-md-12 col-lg-8">
                        <div className="short_contact_list">
                            <ul>
                                <li><a href="#"> <i className="fa fa-phone"></i> +1 (454) 556-5656</a></li>
                                <li><a href="#"> <i className="fa fa-envelope"></i>Yourmail@gmail.com</a></li>
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
                            <a href="index.html">
                                <img src={logo} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9">
                        <div className="main-menu">
                            <nav>
                                <ul id="navigation">
                                    <li><a href="index.html">home</a></li>
                                    <li><a href="About.html">About</a></li>
                                    <li><a href="#">blog <i className="ti-angle-down"></i></a>
                                        <ul className="submenu">
                                            <li><a href="blog.html">blog</a></li>
                                            <li><a href="single-blog.html">single-blog</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">pages <i className="ti-angle-down"></i></a>
                                        <ul className="submenu">
                                            <li><a href="elements.html">elements</a></li>
                                            <li><a href="Cause.html">Cause</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </nav>
                            <div className="Appointment">
                                <div className="book_btn d-none d-lg-block">
                                    <a data-scroll-nav='1' href="#">Make a Donate</a>
                                </div>
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
  )
}

export default Header