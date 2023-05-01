export interface ITriviaColumnValue {
  id: string;
  value: string;
}

export interface ITriviaColumn {
  id: string;
  label: string;
  isValueMasked: boolean;
  values: ITriviaColumnValue[];
}

export interface ITrivia {
  id: string;
  title: string;
  questionsAmount: number;
  content: ITriviaColumn[];
}
