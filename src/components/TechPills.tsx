export default function TechPills({ tech }: { tech: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="text-[10px] uppercase tracking-wide bg-black/30 border border-[#2fd89a22] text-[#b7f5d9] px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
  )
}
