export const Address = ({ label, addressUrl }: { label: string; addressUrl: string; }) => {
  return <a target="_blank" href={addressUrl}>{label}</a>;
};
