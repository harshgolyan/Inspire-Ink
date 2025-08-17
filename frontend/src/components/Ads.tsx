export default function Ads() {
  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-accent px-12 py-16 mt-32 shadow-lg">
      <h2 className="text-4xl font-extrabold text-primary text-center">
        ✨ Words Build Worlds
      </h2>
      <p className="mt-4 text-lg text-primary/70 text-center italic">
        A reminder of why reading and writing matter.
      </p>

      <div className="mt-10 space-y-8">
        <blockquote className="text-xl text-primary/90 text-center font-medium">
          “Reading is essential for those who seek to rise above the ordinary.”  
          <span className="block mt-2 text-primary/60 text-sm">– Jim Rohn</span>
        </blockquote>
      </div>
    </div>
  );
}
