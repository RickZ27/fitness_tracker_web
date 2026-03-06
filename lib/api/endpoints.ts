export const API = {
    AUTH: {
        LOGIN:                  '/api/auth/login',
        REGISTER:               '/api/auth/register',
        WHOAMI:                 '/api/auth/whoami',
        UPDATEPROFILE:          '/api/auth/update-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
        REFRESH:                '/api/auth/refresh',
        LOGOUT:                 '/api/auth/logout',
    },

    PROFILE: {
        GET:              '/api/profile/me',
        UPDATE:           '/api/profile/me',
        DASHBOARD:        '/api/profile/me/dashboard',
        BODY_METRICS:     '/api/profile/me/body-metrics',
        LATEST_METRIC:    '/api/profile/me/body-metrics/latest',
        DELETE_METRIC: (id: string) => `/api/profile/me/body-metrics/${id}`,
    },

    WORKOUT: {
        // Exercises — read-only for users
        GET_EXERCISES:    '/api/workouts/exercises',
        GET_EXERCISE: (id: string) => `/api/workouts/exercises/${id}`,
        // Plans
        CREATE_PLAN:      '/api/workouts/plans',
        MY_PLANS:         '/api/workouts/plans/my',
        PUBLIC_PLANS:     '/api/workouts/plans/public',
        GET_PLAN: (id: string) => `/api/workouts/plans/${id}`,
        UPDATE_PLAN: (id: string) => `/api/workouts/plans/${id}`,
        DELETE_PLAN: (id: string) => `/api/workouts/plans/${id}`,
    },

    GOALS: {
        CREATE:           '/api/goals',
        GET_ALL:          '/api/goals',
        SUMMARY:          '/api/goals/summary',
        GET_ONE: (id: string) => `/api/goals/${id}`,
        UPDATE: (id: string) => `/api/goals/${id}`,
        DELETE: (id: string) => `/api/goals/${id}`,
        COMPLETE: (id: string) => `/api/goals/${id}/complete`,
        ABANDON: (id: string) => `/api/goals/${id}/abandon`,
    },

    ANALYTICS: {
        DASHBOARD:    '/api/analytics/dashboard',
        BODY:         '/api/analytics/body',
        MEASUREMENTS: '/api/analytics/measurements',
        GOALS:        '/api/analytics/goals',
        WORKOUTS:     '/api/analytics/workouts',
    },

    ADMIN: {
        USER: {
            CREATE:       '/api/admin/users/',
            GET_ALL:      '/api/admin/users/',
            GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
            UPDATE: (userId: string) => `/api/admin/users/${userId}`,
            DELETE: (userId: string) => `/api/admin/users/${userId}`,
        },
        EXERCISE: {
            CREATE:       '/api/admin/exercises',
            GET_ALL:      '/api/admin/exercises',
            UPDATE: (id: string) => `/api/admin/exercises/${id}`,
            DELETE: (id: string) => `/api/admin/exercises/${id}`,
        },
    },
};
