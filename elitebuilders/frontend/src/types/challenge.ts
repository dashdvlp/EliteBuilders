export interface Challenge {
  id: number;
  title: string;
  description: string;
  mock_deadline: string;
  mock_data_pack_url: string | null;
  mock_rubric_url: string | null;
  category: string | null;
}

export type ChallengeCategory = 'NLP' | 'Computer Vision' | 'Robotics' | 'Generative AI' | 'Other'; 