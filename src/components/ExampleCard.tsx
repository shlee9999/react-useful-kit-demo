export default function ExampleCard({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div
      className="group shadow-soft hover:shadow-colored-lg hover:border-primary-300 relative transform cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Background Color on Hover */}
      <div className="bg-primary-50 absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display group-hover:text-primary-700 mb-4 text-2xl font-bold text-slate-800 transition-colors duration-300">
          {title}
        </h3>
        <p className="mb-6 text-lg leading-relaxed text-slate-600">{description}</p>
        <button
          className="bg-primary-600 shadow-colored hover:shadow-colored-lg hover:bg-primary-700 focus:ring-primary-200 w-full transform rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 focus:ring-4 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {buttonText}
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="bg-primary-200 absolute top-4 right-4 h-8 w-8 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-60"></div>
      <div className="bg-secondary-200 absolute bottom-4 left-4 h-6 w-6 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-60"></div>
    </div>
  );
}
