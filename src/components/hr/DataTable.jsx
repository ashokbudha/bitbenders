export default function DataTable({ columns, rows, rowKey, loading, error, emptyTitle, emptyDescription }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-gray/20 bg-brand-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-brand-neutral text-xs uppercase tracking-wider text-brand-gray">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={`px-5 py-3 font-semibold ${column.headerClassName || ''}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-gray/10">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-6 text-brand-gray">
                Loading data...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-6 text-red-600">
                {error}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-6 text-brand-gray">
                <p className="font-semibold text-brand-black">{emptyTitle}</p>
                <p className="mt-1 text-sm text-brand-gray">{emptyDescription}</p>
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={typeof rowKey === 'function' ? rowKey(row, index) : row[rowKey]}>
                {columns.map((column) => (
                  <td key={`${column.key}-${index}`} className={`px-5 py-4 ${column.cellClassName || ''}`}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
