export interface Question {
  readonly id?: string;
  testId?: string;
  quizId?: string;
  question: string;
  imageUrl?: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD?: string;
  optionE?: string;
  correctOption: "optionA" | "optionB" | "optionC" | "optionD" | "optionE";
  createdAt: Date;
  deletedAt?: Date;
}
