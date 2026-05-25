import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../libs/db";
import Subscriber from "../../../models/Subscriber";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET(request) {
  try {
    const session = await checkAuth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "active";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query = status === "all" ? {} : { status };

    const skip = (page - 1) * limit;
    const total = await Subscriber.countDocuments(query);

    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("email name subscribedAt unsubscribedAt status")
      .lean();

    const serialized = subscribers.map((sub) => ({
      ...sub,
      _id: sub._id.toString(),
      subscribedAt: sub.subscribedAt?.toISOString(),
      unsubscribedAt: sub.unsubscribedAt?.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        subscribers: serialized,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });

  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}