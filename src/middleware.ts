import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const url = request.nextUrl;

  if (url.pathname.startsWith("/user_panel")) {
    if (!token)
      return NextResponse.redirect(new URL("/authentication", request.url));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/users/is_user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!result.is_user) {
        return NextResponse.redirect(new URL("/authentication", request.url));
      }

      if (url.pathname === "/user_panel") {
        return NextResponse.redirect(new URL("/user_panel/counter", request.url));
      }
    } catch (err) {
      console.error("error:", err);
      return NextResponse.redirect(new URL("/authentication", request.url));
    }
  }

  if (url.pathname.startsWith("/admin_panel")) {
    if (!token)
      return NextResponse.redirect(new URL("/authentication", request.url));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/users/is_admin`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!result.is_admin) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (url.pathname === "/admin_panel") {
        return NextResponse.redirect(new URL("/admin_panel/counter", request.url));
      }
    } catch (err) {
      console.error("error:", err);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (url.pathname.startsWith("/cart")) {
    console.log("cart");

    if (!token)
      return NextResponse.redirect(new URL("/authentication", request.url));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/users/is_user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      if (!result.is_user) {
        return NextResponse.redirect(new URL("/", request.url));
      }

    } catch (err) {
      console.error("error:", err);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/user_panel/:path*", "/admin_panel/:path*", "/cart/:path*"],
};
