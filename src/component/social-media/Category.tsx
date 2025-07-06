

const Category = () => {
  return (
    <aside className="single_sidebar_widget post_category_widget">
                  <h4 className="widget_title">Category</h4>
                  <ul className="list cat-list">
                    {["Resaurant food (37)", "Travel news (10)", "Modern technology (03)", "Product (11)", "Inspiration (21)", "Health Care (21)"]
                      .map((cat, idx) => (
                        <li key={idx}>
                        <a href="#" className="d-flex">
                          <p>{cat.split('(')[0]}</p>
                          <p>({cat.match(/\((\d+)\)/)?.[1] ?? "0"})</p>
                        </a>
                      </li>
                      
                      ))}
                  </ul>
                </aside>
  )
}

export default Category