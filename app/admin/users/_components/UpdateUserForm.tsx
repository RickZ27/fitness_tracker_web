"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";
import Image from "next/image";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const updateUserSchema = z.object({
    fullName: z.string().min(2, { message: "Minimum 2 characters" }).optional(),
    email:    z.string().email({ message: "Enter a valid email" }).optional(),
    username: z.string().min(3, { message: "Minimum 3 characters" }).optional(),
    image:    z.instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, { message: "Max file size is 5MB" })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Only .jpg, .jpeg, .png and .webp" }),
});

type UpdateUserData = z.infer<typeof updateUserSchema>;

export default function UpdateUserForm({ user }: { user: any }) {
    const [pending, startTransition] = useTransition();
    const [error, setError]          = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } =
        useForm<UpdateUserData>({
            resolver: zodResolver(updateUserSchema),
            defaultValues: {
                fullName: user.fullName || '',
                email:    user.email    || '',
                username: user.username || '',
                image:    undefined,
            },
        });

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
        onChange(file);
    };

    const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
        setPreviewImage(null);
        onChange?.(undefined);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const onSubmit = async (data: UpdateUserData) => {
        setError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();
                if (data.fullName) formData.append('fullName', data.fullName);
                if (data.email)    formData.append('email',    data.email);
                if (data.username) formData.append('username', data.username);
                if (data.image)    formData.append('image',    data.image);

                const response = await handleUpdateUser(user._id, formData);
                if (!response.success) throw new Error(response.message || 'Update failed');

                reset();
                handleDismissImage();
                toast.success('User updated successfully');
            } catch (err: Error | any) {
                toast.error(err.message || 'Update failed');
                setError(err.message || 'Update failed');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Image Preview */}
            <div className="mb-4">
                {previewImage ? (
                    <div className="relative w-24 h-24">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <Controller
                            name="image"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <button
                                    type="button"
                                    onClick={() => handleDismissImage(onChange)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            )}
                        />
                    </div>
                ) : user.imageUrl ? (
                    <div className="relative w-24 h-24">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
                            alt="Profile Image"
                            className="w-24 h-24 rounded-full object-cover"
                            width={96}
                            height={96}
                        />
                    </div>
                ) : (
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600">No Image</span>
                    </div>
                )}
            </div>

            {/* Image Input */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Profile Image</label>
                <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                            accept=".jpg,.jpeg,.png,.webp"
                        />
                    )}
                />
                {errors.image && <p className="text-xs text-red-600">{errors.image.message}</p>}
            </div>

            {/* Full Name */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("fullName")}
                    placeholder="Jane Doe"
                />
                {errors.fullName?.message && (
                    <p className="text-xs text-red-600">{errors.fullName.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("email")}
                    placeholder="you@example.com"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
            </div>

            {/* Username */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("username")}
                    placeholder="janedoe"
                />
                {errors.username?.message && (
                    <p className="text-xs text-red-600">{errors.username.message}</p>
                )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? "Updating..." : "Update User"}
            </button>
        </form>
    );
}