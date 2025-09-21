import About from '../components/About'

export default function AboutPage() {
  return (
    <main className="min-h-[60vh]">
      <About
        fullContent={(
          <>
            <p>
              I’m Ghulam Mustafa — though online you’ll often see me as <span className="font-semibold">musxeto</span>. I’m a final year Computer Science student and developer who enjoys building efficient systems, scalable APIs, and user-friendly applications. Currently, I work as a <span className="font-semibold">Junior Backend Developer</span> at <a href="#" className="underline text-[#9ff1c9]">Smart Computing SMC Pvt Ltd</a>.This role builds on my internship at the same company, where I worked across the stack — from securing authentication to integrating AWS S3 and implementing multiple modules of the company's core projects.
            </p>
            <p>
              My journey has been shaped by diverse experiences. At <span className="font-semibold">Chelan Technologies (Remote)</span>, I’ve been building mobile apps with React Native and Firebase, collaborating with an international team. At <span className="font-semibold">Salvo Integrated Solutions</span>, I explored full-stack development with Django and React, and even worked on a facial recognition attendance system with computer vision. Before that, my first hands-on exposure came at <span className="font-semibold">GCS Pvt Ltd</span>, where I contributed to company's web attendance portal using Flask, MySQL, and JavaScript. Each of these roles has pushed me to adapt quickly, pick up new technologies, and ship features in real-world environments.
            </p>
            <p>
              Outside of coding, I’m disciplined about fitness, reading, and caffeine-fueled problem-solving. A few years ago, I dropped over 20kg through consistent training, and I’ve carried that same drive into my work — setting ambitious goals, breaking them into achievable steps, and following through until results show. Whether I’m writing clean backend logic, experimenting with new frameworks, or just sketching ideas for my next project, I bring both focus and curiosity to the table. My aim is simple: work on stuff that meaningful to me and solves a problem for others.
            </p>
          </>
        )}
      />
    </main>
  )
}
