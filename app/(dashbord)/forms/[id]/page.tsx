export default function FormsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Forms page {id}</div>;
}
