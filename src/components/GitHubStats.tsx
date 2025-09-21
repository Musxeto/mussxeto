import { motion } from 'framer-motion'

export default function GitHubStats() {
  const cards = [
    {
      alt: 'GitHub Stats',
      src: 'https://github-readme-stats.vercel.app/api?username=musxeto&theme=dark&hide_border=false&include_all_commits=false&count_private=false',
    },
    {
      alt: 'Streak Stats',
      src: 'https://nirzak-streak-stats.vercel.app/?user=musxeto&theme=dark&hide_border=false',
    },
    {
      alt: 'Top Languages',
      src: 'https://github-readme-stats.vercel.app/api/top-langs/?username=musxeto&theme=dark&hide_border=false&include_all_commits=false&count_private=false&layout=compact',
    },
  ]

  return (
    <section aria-labelledby="github-stats" className="relative w-full py-12">
      <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-5 pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <h2 id="github-stats" className="font-mono text-sm text-[#9ddfbe]"># 📊 GitHub Stats</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.alt}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-lg border border-[#16b88533] bg-[#0a1313]/70 p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_28px_rgba(22,184,133,0.22)]"
            >
              <img
                src={c.src}
                alt={c.alt}
                className="w-full h-auto rounded"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
