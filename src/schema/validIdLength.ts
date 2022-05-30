export default (id: string) => {
  if (id.length !== 24) return false;

  return true;
};