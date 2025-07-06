const Tag = () => {
  return (
    <aside className="single_sidebar_widget tag_cloud_widget">
      <h4 className="widget_title">Tag Clouds</h4>
      <ul className="list">
        {[
          "project",
          "love",
          "technology",
          "travel",
          "restaurant",
          "life style",
          "design",
          "illustration",
        ].map((tag, i) => (
          <li key={i}>
            <a href="#">{tag}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Tag;
