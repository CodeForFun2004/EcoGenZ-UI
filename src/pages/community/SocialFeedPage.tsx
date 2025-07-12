
import CreatePost from '../../component/social-feed/CreatePost';  
import Post from '../../component/social-feed/Post';
import { dummyPosts } from '../../data/dummy-posts';
import './SocialFeedPage.css';

const SocialFeedPage = () => {
  return (
      <div className="social-feed-wrapper">
        <div className="feed-column">
          <CreatePost />
          {dummyPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div className="widgets-column">
            <div className="widget">
                <h4>Upcoming Events</h4>
                <ul>
                <li>🌱 Tree Planting Day - March 15</li>
                <li>🌊 Beach Cleanup - March 22</li>
                <li>♻️ Recycling Workshop - March 29</li>
                </ul>
            </div>
          <div className="widget">
            <h4>Trending Topics</h4>
            <ul>
              <li>#SaveThePlanet</li>
              <li>#RecycleChallenge</li>
              <li>#GreenLiving</li>
            </ul>
          </div>
          <div className="widget">
                <h4>Eco Tips</h4>
                <ul>
                <li>Use reusable bags and bottles</li>
                <li>Reduce, Reuse, Recycle</li>
                <li>Switch to energy-efficient appliances</li>
                </ul>
            </div>
            <div className="widget">
                <h4>Join Our Community</h4>
                <p>Connect with like-minded individuals and make a difference!</p>
                <button className="join-button">Join Now</button>
                </div>
        </div>
      </div>
  );
};

export default SocialFeedPage;