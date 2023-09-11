export type OperationType = 'insert' | 'delete' | 'modify';

export type Operation = {
  type: OperationType;
  position?: number;
  newContent?: string;
  oldContent?: string;
};
