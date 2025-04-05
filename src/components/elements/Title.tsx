import Link from "next/link";

export default function Title({
  className,
  reverse,
}: {
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`w-full flex md:flex-1 items-center ${className}`}>
      <h3
        className={`text-3xl font-bold ${
          !reverse ? "text-primary" : "text-white"
        }`}
      >
        <Link href="/" className="">
          Rea
          <span
            className={`${
              !reverse ? "text-white bg-primary" : "text-primary bg-white"
            }`}
          >
            lm.
          </span>
        </Link>
      </h3>
    </div>
  );
}
