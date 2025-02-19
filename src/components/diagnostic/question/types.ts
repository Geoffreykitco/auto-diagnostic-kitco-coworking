
export interface Option {
  readonly label: string;
  readonly points: number;
}

export interface Question {
  readonly question: string;
  readonly tooltip: string;
  readonly type: 'single' | 'multiple' | 'text';
  readonly options: readonly Option[];
}

export interface QuestionItemProps {
  question: Question;
  questionIndex: number;
  onSelect: (points: number) => void;
  selectedValue?: number;
}
