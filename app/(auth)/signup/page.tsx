"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "./signup_schema";
import Link from "next/link";



export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    window.location.href="/home";
    // this of for 3 rd commit

  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SECTION */}
      <section className="flex flex-col justify-center my-10 px-10 md:px-24">
        <div className="max-w-md space-y-8">

          {/* Intro */}
          <p className="text-lg font-serif leading-snug">
            ‘Let us get to know you better to personalize your journey'
          </p>

          {/* Gender */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg">What's your Gender?</h2>

            <div className="flex items-center gap-10">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  className="accent-black w-5 h-5"
                />
                <span>Male</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="female"
                  {...register("gender")}
                  className="accent-black w-5 h-5"
                />
                <span>Female</span>
              </label>
            </div>

            {errors.gender && (
              <p className="text-xs text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <h2 className="font-serif mb-2">What's your Height in cm?</h2>
            <input
              type="number"
              placeholder="Enter your Height"
              {...register("height", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black"
            />
            {errors.height && (
              <p className="text-xs text-red-500 mt-1">
                {errors.height.message}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <h2 className="font-serif mb-2">What's your Weight?</h2>
            <input
              type="number"
              placeholder="Enter your Weight"
              {...register("weight", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black"
            />
            {errors.weight && (
              <p className="text-xs text-red-500 mt-1">
                {errors.weight.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <h2 className="font-serif mb-2">Username</h2>
            <input
              type="text"
              placeholder="Enter your Username"
              {...register("username")}
              className="w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black"
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

            <Link href={"/login"}>Login from here</Link>
      
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-black text-white py-3 text-sm mt-6"
          >
            Signup
          </button>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="relative hidden md:block">
        <Image
          src="/1.png"
          alt="Track Stadium"
          fill
          priority
          className="object-cover"
        />

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>
    </main>
  );
}
