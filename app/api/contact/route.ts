import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, comment } = body;

    // Validate inputs
    if (!fullName || !email || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Here you can:
    // 1. Save to a database
    // 2. Send an email
    // 3. Call an external service
    // For now, we'll just log the data

    console.log("Contact form submission:", {
      fullName,
      email,
      comment,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email (you would need to configure your email service)
    // await sendEmail({
    //   to: "your-email@example.com",
    //   subject: "New Contact Form Submission",
    //   html: `<p>From: ${fullName} (${email})</p><p>Message: ${comment}</p>`,
    // });

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
