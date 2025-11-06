export type ClassGroup = {
  id: string;
  name: string;
  capacity: string;
  status?: string;
};

export type ClassState = {
  index: number | undefined;
  id: string | "";
  name: string | "";
};
