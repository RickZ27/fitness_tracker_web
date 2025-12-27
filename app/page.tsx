import Image from "next/image";
import Link from "next/link";

export default function GetStarted() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SECTION */}
      <section className="flex flex-col justify-center px-10 md:px-20">
        <div className="max-w-md">
          <p className="text-lg text-black mb-4">Hello,</p>

          <h1 className="text-3xl font-serif font-medium leading-snug mb-3">
            Welcome to the journey to your dream body
          </h1>

          <p className="text-sm text-gray-600 mb-6">
            Your strongest self starts here
          </p>

          <p className="text-xs text-gray-500 mb-10">
            Consistency creates results.{" "}
            <span className="text-blue-500 cursor-pointer">
              Let's begin.
            </span>
          </p>

          <Link
            href="/login"
            className="inline-block bg-black text-white text-sm px-10 py-3"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="relative hidden md:block">
        <Image
          src="/1.png"
          alt="Fitness gym equipment"
          fill
          priority
          className="object-cover grayscale"
        />
      </section>
    </main>
  );
}
