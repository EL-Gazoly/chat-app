import { clerkMiddleware,  createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
]);

export default clerkMiddleware((auth, req, next)=>{
  if(isPublicRoute(req)) next;
  else auth().protect()
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};