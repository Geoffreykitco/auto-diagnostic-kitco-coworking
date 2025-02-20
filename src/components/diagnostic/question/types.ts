
export interface Option {
  readonly label: string;
  readonly points?: number; // On garde points optionnel pour la compatibilité mais on ne l'utilise plus
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
  onSelect: (value: string | number | number[] | null) => void;
  selectedValue?: string | number | number[] | null;
}
