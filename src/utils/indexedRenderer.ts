export const getSessionIndex = <T extends { id?: string }>(
  id: string | undefined,
  list?: T[]
): number => {
  if (!id) return -1;
  return (list ?? []).findIndex((s) => s.id === id);
};
