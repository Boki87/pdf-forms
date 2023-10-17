export default function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Builder page {id}</div>;
}
