"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "./login_schema";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("email:", data.email);
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SECTION */}
      <section className="flex flex-col justify-center px-10 md:px-24">
        <div className="max-w-md">

          {/* Avatar */}
          <div className="mb-10">
            <Image
              src="/1.png"
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full w-25 h-25 grayscale"
            />
          </div>

          {/* Heading */}
          <h1 className="text-xl font-serif mb-6">
            What Should We Call You, Chad?
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
              <Link href={"/signup"}>Signup from here</Link>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-sm mt-6"
            >
             Login
            </button>
          </form>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="relative hidden md:block">
        <Image
          src="/1.png"
          alt="Gym Dumbbell"
          fill
          priority
          className="object-cover"
        />

        {/* soft fade bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>
    </main>
  );
}
