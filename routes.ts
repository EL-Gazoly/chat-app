/**
 * An array of route that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
]

/**
 * An array of route that are used for authentication
 * these routes will redirect the user to private routes
 * @type {string[]}
 */

export const authRoutes = [
    "/sign-in",
    "sign-up",
]


/**
 * the deafult redirect route for authenticated users
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/"


