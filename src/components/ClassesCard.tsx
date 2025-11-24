// ClassesCard.tsx
export default function ClassesCard({
  classes,
}: {
  classes: { id: string; title: string; schedule: string }[];
}) {
  if (!classes.length)
    return <p className="text-gray-400">No enrolled classes.</p>;

  return (
    <div className="space-y-3">
      {classes.map((c) => (
        <div
          key={c.id}
          className="bg-gray-700 rounded px-3 py-2 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{c.title}</p>
            <p className="text-xs text-gray-300">{c.schedule}</p>
          </div>
          <div className="text-gray-400">…</div>
        </div>
      ))}
    </div>
  );
}
