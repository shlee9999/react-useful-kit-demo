export default function Title({ title, icon }: { title: React.ReactNode; icon: React.ReactNode }) {
  return (
    <h2 className="mb-10 flex items-center justify-center gap-2 text-center text-3xl font-bold tracking-tight md:text-4xl">
      <span className="text-4xl">{icon}</span>
      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{title}</span>
    </h2>
  );
}
