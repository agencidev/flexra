import { NextResponse } from "next/server";

/**
 * Cloudflare Turnstile verification endpoint
 *
 * Verifierar Turnstile-token på serversidan för att förhindra spam.
 * Kräver TURNSTILE_SECRET_KEY i environment variables.
 *
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token saknas" },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not configured");
      // I development, tillåt alla requests om secret key saknas
      if (process.env.NODE_ENV === "development") {
        console.warn("Turnstile verification skipped in development mode");
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verifiera token med Cloudflare
    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Turnstile verification failed:", verifyData["error-codes"]);
      return NextResponse.json(
        {
          success: false,
          error: "Verifieringen misslyckades",
          codes: verifyData["error-codes"],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return NextResponse.json(
      { success: false, error: "Ett fel uppstod vid verifiering" },
      { status: 500 }
    );
  }
}
