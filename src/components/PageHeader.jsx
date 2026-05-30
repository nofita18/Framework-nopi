export default function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <div className="mb-6">
      {breadcrumb.length > 0 && (
        <p className="text-xs text-gray-400 mb-1">
          {breadcrumb.join(" / ")}
        </p>
      )}
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
