/**
 * This file defines the routes for the application, including public and authentication routes.
 * It also specifies the API authentication prefix for backend routes.
 * The routes are used in middleware to determine access control and redirection logic.
 */

/**
 * Array of public routes that do not require authentication.
 */
export const publicRoutes: string[] = [
    "/",
    "/listings",
];

/**
 * Array of public authentication routes that provide aunthenication services.
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * Prefix for API authentication routes.
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Default redirection paths based on user roles.
 * Used to redirect users after login based on their assigned role.
 */
// export enum UserRole {
//   ADMIN = "ADMIN",
//   TEACHER = "TEACHER",
// }

// export const ROLE_REDIRECTS: Record<UserRole, string> = {
//   [UserRole.ADMIN]: "/admin/dashboard",
//   [UserRole.TEACHER]: "/teacher/dashboard",
// };

/**
 * deault route for logged-in users.
 * This is the route to which users will be redirected after successful login.
*/
export const defaultLoggedInRoute: string = "/";