export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-5 py-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
}
