import { NextResponse } from "next/server";
import getResend from "../../libs/resend";
import ProjectBrief from "../../models/ProjectBrief";
import { generateBriefNotificationEmail } from "../../libs/email-templates";
import connectDB from "../../libs/db";


export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      type,
      fullName,
      email,
      phone,
      companyName,
      projectName,
      businessDescription,
      targetAudience,
      projectPurpose,
      style,
      existingAssets,
      brandGuidelines,
      creativeFreedom,
      brandPerception,
      voicePersonality,
      websitesLiked,
      pagesNeeded,
      features,
      contentReady,
      mediaReady,
      animations,
      domainOwned,
      domainDetails,
      timeline,
      budget,
      additionalNotes,
    } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const brief = new ProjectBrief({
      type,
      fullName,
      email,
      phone,
      companyName,
      projectName,
      businessDescription,
      targetAudience,
      projectPurpose,
      style,
      existingAssets,
      brandGuidelines,
      creativeFreedom,
      brandPerception,
      voicePersonality,
      websitesLiked,
      pagesNeeded,
      features,
      contentReady,
      mediaReady,
      animations,
      domainOwned,
      domainDetails,
      timeline,
      budget,
      additionalNotes,
    });

    await brief.save();

    const typeLabels = {
      website: "Website Design",
      branding: "Branding",
      "ui-ux": "UI/UX Design",
    };

    const adminEmail = process.env.ADMIN_EMAIL || "owendigitals@gmail.com";
    
    await getResend().emails.send({
      from: "Project Briefs <official@owendigitals.work>",
      to: adminEmail,
      reply_to: email,
      subject: `New ${typeLabels[type]} Brief - ${fullName}`,
      html: generateBriefNotificationEmail({ brief, type }),
    });

    return NextResponse.json(
      { success: true, message: "Brief submitted successfully", id: brief._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting brief:", error);
    return NextResponse.json(
      { error: "Failed to submit brief" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    let query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const briefs = await ProjectBrief.find(query).sort({ createdAt: -1 }).lean();

    const serialized = briefs.map((brief) => ({
      ...brief,
      _id: brief._id.toString(),
      createdAt: brief.createdAt.toISOString(),
      updatedAt: brief.updatedAt.toISOString(),
    }));

    return NextResponse.json({ briefs: serialized });
  } catch (error) {
    console.error("Error fetching briefs:", error);
    return NextResponse.json(
      { error: "Failed to fetch briefs" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const brief = await ProjectBrief.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!brief) {
      return NextResponse.json(
        { error: "Brief not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      brief: {
        ...brief.toObject(),
        _id: brief._id.toString(),
        createdAt: brief.createdAt.toISOString(),
        updatedAt: brief.updatedAt.toISOString(),
      }
    });
  } catch (error) {
    console.error("Error updating brief:", error);
    return NextResponse.json(
      { error: "Failed to update brief" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const brief = await ProjectBrief.findByIdAndDelete(id);

    if (!brief) {
      return NextResponse.json(
        { error: "Brief not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Brief deleted" });
  } catch (error) {
    console.error("Error deleting brief:", error);
    return NextResponse.json(
      { error: "Failed to delete brief" },
      { status: 500 }
    );
  }
}
