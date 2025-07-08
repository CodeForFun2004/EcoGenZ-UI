export interface Comment {
  author: string;
  avatar: string;
  text: string;
}

export interface PostData {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export const dummyPosts: PostData[] = [
  {
    id: 1,
    author: "Đạt cute 1",
    avatar: "https://i.imgur.com/jCVN75w.jpeg",
    timestamp: "2 hours ago",
    content: "Vừa tham gia hoạt động trồng cây tại Vườn quốc gia Cúc Phương. Một trải nghiệm thật tuyệt vời và ý nghĩa! 🌳💚 #EcoGenZ #ProtectNature",
    imageUrl: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=500",
    likes: 125,
    comments: [
      { author: "John Smith", avatar: "https://i.pravatar.cc/150?u=john_smith", text: "Tuyệt vời quá bạn ơi!" },
      { author: "Alice", avatar: "https://i.pravatar.cc/150?u=alice", text: "Mình cũng muốn tham gia lần tới." }
    ],
    shares: 12
  },
  {
    id: 2,
    author: "Đạt cute yêu quá đi thôi",
    avatar: "https://i.imgur.com/jCVN75w.jpeg",
    timestamp: "5 hours ago",
    content: "Buổi dọn dẹp bãi biển cuối tuần qua đã thu gom được hơn 50kg rác thải nhựa. Cảm ơn tất cả các tình nguyện viên!",
    imageUrl: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/485769125_1066821202146020_2389957101680408367_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGuHmzpv07D3ne4deHoaL0Jh-XTEVkQTt-H5dMRWRBO37josPwni2I04-nAJO_t-nBCIE8QkVvTNzbtl_qBn-Q7&_nc_ohc=eBm_9FygtIUQ7kNvwFEP7N9&_nc_oc=AdnSkQyj3LRE_ZuvIlOOG2i9kTqrYV3vrDWBPo3ecC4IIonen4VA8mLyD_4d548YQ2I&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=dA8FTlaqTupkL0FLzjw3sw&oh=00_AfRZ8LqoMv678CAIQ-dG40ChHHF2oP6MZa1dSK3lnTOzaA&oe=6872809B",
    likes: 98,
    comments: [],
    shares: 5
  }
];