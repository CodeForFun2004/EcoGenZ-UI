// src/data/users.ts

// Định nghĩa lại interface Participant để dùng chung
export interface Participant {
  id: string;
  avatar: string;
  name: string;
  email: string;
  activity: string; // Hoạt động hiện tại/đã đăng ký
  status: 'pending' | 'approved' | 'rejected';
  enrollDate: string;
  eventDate: string;
  phone: string; // Thêm trường phone cho thông tin cá nhân
  address: string; // Thêm trường address cho thông tin cá nhân
  pastActivities: { // <--- THÊM TRƯỜNG NÀY
    name: string;
    date: string;
    role: string;
  }[];
}

const generateRandomDate = (start: Date, end: Date): string => {
  const diff = end.getTime() - start.getTime();
  const newDate = new Date(start.getTime() + Math.random() * diff);
  return newDate.toISOString();
};

const getRandomStatus = (): 'pending' | 'approved' | 'rejected' => {
  const statuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomActivity = (): string => {
  const activities = [
    'Workshop Frontend Development',
    'Hackathon AI/ML',
    'Design Thinking Sprint',
    'Digital Marketing Summit',
    'Product Management Masterclass',
    'Data Science & Analytics Meetup',
    'Cyber Security Conference',
    'Mobile App Development Bootcamp',
    'Cloud Computing Forum',
    'UI/UX Design Intensive',
    'Blockchain Innovation Hub',
    'Agile Scrum Workshop',
    'FinTech Solutions Expo',
    'Green Technology Symposium',
    'HealthTech Innovation Day',
  ];
  return activities[Math.floor(Math.random() * activities.length)];
};

const getRandomPhoneNumber = (): string => {
  const prefix = ['090', '091', '092', '093', '094', '096', '097', '098'];
  const num = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
  return prefix[Math.floor(Math.random() * prefix.length)] + num.toString();
};

const getRandomAddress = (): string => {
  const streets = ['Tran Phu', 'Le Loi', 'Nguyen Van Linh', 'Bach Dang', 'Hoang Dieu'];
  const districts = ['Hai Chau', 'Thanh Khe', 'Cam Le', 'Son Tra', 'Ngu Hanh Son'];
  const cities = ['Da Nang', 'Ha Noi', 'Ho Chi Minh City'];
  return `${Math.floor(Math.random() * 100) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${districts[Math.floor(Math.random() * districts.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`;
};

const generatePastActivities = (count: number): { name: string; date: string; role: string; }[] => {
  const pastActivityNames = [
    'IoT Challenge 2024', 'Startup Weekend 2023', 'Code Camp 2022',
    'Data Science Conference 2023', 'Fintech Summit 2024',
    'AI & Robotics Expo 2022', 'Game Dev Workshop 2023',
    'E-commerce Forum 2024', 'Cybersecurity Bootcamp 2023'
  ];
  const roles = ['Participant', 'Volunteer', 'Organizer', 'Speaker'];
  const activities: { name: string; date: string; role: string; }[] = [];
  for (let i = 0; i < count; i++) {
    activities.push({
      name: pastActivityNames[Math.floor(Math.random() * pastActivityNames.length)],
      date: generateRandomDate(new Date('2022-01-01'), new Date('2024-12-31')),
      role: roles[Math.floor(Math.random() * roles.length)],
    });
  }
  return activities;
};


export const mockParticipants: Participant[] = Array.from({ length: 50 }, (_, i) => {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const idNum = i + 1;
  const enrollDate = generateRandomDate(new Date('2025-01-01'), new Date('2025-07-18'));
  const eventDate = generateRandomDate(new Date('2025-08-01'), new Date('2025-12-31'));

  return {
    id: `P${String(idNum).padStart(3, '0')}`,
    avatar: `https://randomuser.me/api/portraits/${gender}/${idNum % 100}.jpg`,
    name: `User Name ${idNum}`,
    email: `user${idNum}@example.com`,
    activity: getRandomActivity(),
    status: getRandomStatus(),
    enrollDate: enrollDate,
    eventDate: eventDate,
    phone: getRandomPhoneNumber(), // <--- THÊM PHONE
    address: getRandomAddress(), // <--- THÊM ADDRESS
    pastActivities: generatePastActivities(Math.floor(Math.random() * 4)), // <--- THÊM PAST ACTIVITIES (0-3 hoạt động)
  };
});