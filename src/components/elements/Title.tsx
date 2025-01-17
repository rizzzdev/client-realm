import Link from "next/link";

export default function Title({ className }: { className?: string }) {
  return (
    <div className={`w-full flex md:flex-1 items-center ${className}`}>
      <h3 className="text-4xl font-bold text-secondary">
        <Link href="/" className="">
          Real<span className="text-white">m.</span>
        </Link>
      </h3>
    </div>
  );
}
