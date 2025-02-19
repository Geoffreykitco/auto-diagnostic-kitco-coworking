
export interface Option {
  label: string;
  points: number;
}

export interface Question {
  question: string;
  tooltip: string;
  type: 'single' | 'multiple' | 'text';
  options: Option[];
}

export interface QuestionItemProps {
  question: Question;
  questionIndex: number;
  onSelect: (points: number) => void;
  selectedValue?: number;
}
