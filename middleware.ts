import { clerkMiddleware,  createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/api/edgestore/health",
  "/api/edgestore/init"

]);

export default clerkMiddleware((auth, req, next )=>{
  if(isPublicRoute(req)) next;
  else auth().protect()
  

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
