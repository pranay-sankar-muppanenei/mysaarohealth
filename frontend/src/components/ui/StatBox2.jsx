export default function StatBox({ stats = [] }) {
  return (
    <div className="space-y-2">
      {stats.map(({ label, value }, idx) => (
        <div key={idx} className="border rounded-xl px-4 py-3">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}