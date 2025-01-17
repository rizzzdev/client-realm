export interface Material<ActivityType, QuizType> {
  readonly id: string;
  title: string;
  description: string;
  imageUrl: string;
  materialString: string;
  createdAt: Date;
  deletedAt?: Date | undefined;
  activities?: ActivityType[];
  quiz: QuizType;
}
