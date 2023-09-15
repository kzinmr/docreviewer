export type OperationType = 'insert' | 'delete' | 'modify';

export type Operation = {
  type: OperationType;
  position?: number;
  newContent?: string;
  oldContent?: string;
};

export type ReviewPoint = {
  name: string;
  description: string;
  level: string;
};

export type Review = {
  status: string;
  level: string;
  reviewPointId: number;
  reviewPoint: ReviewPoint;
  targetPassageId: number;
};

export type ReviewSessionFull = {
  id: number;
  createdAt: Date;
  reviews: Review[];
};

export type Passage = {
  id: number;
  order: number;
  documentId: number;
  lines: {
    id: number;
    text: string;
    order: number;
  }[];
};

export type Document = {
  id: number;
  type: string;
  knowledgeId: number | null;
  passages: Passage[];
};
