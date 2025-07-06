import '../../App.css'

const NewsLetter = () => {
  return (
    <aside className="single_sidebar_widget newsletter_widget">
                  <h4 className="widget_title">Newsletter</h4>
                  <form action="#">
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder='Enter email' required />
                    </div>
                    <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn mt-3" type="submit">Subscribe</button>
                  </form>
                </aside>
  )
}

export default NewsLetter