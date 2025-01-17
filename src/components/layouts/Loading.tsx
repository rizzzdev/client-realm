import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center fixed z-[99] bg-background text-color5">
      <Image
        src="/spinner-loading.gif"
        alt="spinner-loading"
        width={100}
        height={100}
        unoptimized
        priority
      />
    </div>
  );
}
