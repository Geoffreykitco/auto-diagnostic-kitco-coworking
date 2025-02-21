
export interface Option {
  readonly label: string;
  readonly points: number;
}

export type QuestionType = 'single' | 'multiple' | 'text';

export interface Question {
  readonly question: string;
  readonly tooltip: string;
  readonly type: QuestionType;
  readonly options: readonly Option[];
  readonly isInformative?: boolean;
}

export interface QuestionItemProps {
  question: Question;
  questionIndex: number;
  onSelect: (value: string | number | number[] | null) => void;
  selectedValue?: string | number | number[] | null;
}

export interface Answer {
  value: string | number | number[] | null;
  score: number; // Le score calculé pour cette réponse
}
