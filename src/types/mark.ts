export interface Mark {
  readonly id?: string;
  userId: string;
  testId?: string;
  quizId?: string;
  mark: number;
  markedAt: Date;
}
