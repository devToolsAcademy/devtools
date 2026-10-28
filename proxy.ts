import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16: `middleware` was renamed to `proxy`.
export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals and any path with a file extension (images, frames, favicon...)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
