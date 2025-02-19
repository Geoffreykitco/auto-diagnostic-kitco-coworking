
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
}

export interface QuestionItemProps {
  question: Question;
  questionIndex: number;
  onSelect: (points: number) => void;
  selectedValue?: number;
}
