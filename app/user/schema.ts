import z from 'zod';

// ─── Body Metric ──────────────────────────────────────────────────────────────
export const bodyMetricSchema = z.object({
    weightKg:       z.coerce.number().min(1, { message: 'Enter a valid weight' }),
    bodyFatPercent: z.coerce.number().min(1).max(100).optional().or(z.literal('')),
    waistCm:        z.coerce.number().min(1).optional().or(z.literal('')),
    hipsCm:         z.coerce.number().min(1).optional().or(z.literal('')),
    chestCm:        z.coerce.number().min(1).optional().or(z.literal('')),
});
export type BodyMetricData = z.infer<typeof bodyMetricSchema>;

// ─── Fitness Profile ──────────────────────────────────────────────────────────
export const fitnessProfileSchema = z.object({
    heightCm:            z.coerce.number().min(50).max(300).optional().or(z.literal('')),
    gender:              z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
    dateOfBirth:         z.string().optional(),
    fitnessLevel:        z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    activityLevel:       z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']).optional(),
    preferredWeightUnit: z.enum(['kg', 'lbs']).optional(),
    bio:                 z.string().max(300).optional(),
});
export type FitnessProfileData = z.infer<typeof fitnessProfileSchema>;

// ─── Goal ─────────────────────────────────────────────────────────────────────
export const createGoalSchema = z.object({
    type:        z.enum(['weight', 'body_fat', 'workout_frequency', 'custom']),
    title:       z.string().min(2, { message: 'Minimum 2 characters' }),
    description: z.string().max(300).optional(),
    targetValue: z.coerce.number().optional().or(z.literal('')),
    direction:   z.enum(['decrease', 'increase']).optional(),
    deadline:    z.string().optional(),
});
export type CreateGoalData = z.infer<typeof createGoalSchema>;

// ─── Workout Plan ─────────────────────────────────────────────────────────────
export const createWorkoutPlanSchema = z.object({
    name:          z.string().min(2, { message: 'Minimum 2 characters' }),
    description:   z.string().max(500).optional(),
    difficulty:    z.enum(['beginner', 'intermediate', 'advanced']),
    durationWeeks: z.coerce.number().min(1).max(52).optional().or(z.literal('')),
    isPublic:      z.boolean().default(false),
});
export type CreateWorkoutPlanData = z.infer<typeof createWorkoutPlanSchema>;