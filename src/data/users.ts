// src/data/users.ts

// Định nghĩa lại interface Participant để dùng chung
export interface Participant {
  id: string;
  avatar: string;
  name: string;
  email: string;
  activity: string;
  status: 'pending' | 'approved' | 'rejected';
  enrollDate: string;
  eventDate: string;
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
  };
});