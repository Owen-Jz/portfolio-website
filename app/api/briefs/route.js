import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Resend } from "resend";
import ProjectBrief from "../../models/ProjectBrief";

const resend = new Resend(process.env.RESEND_API_KEY);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
}

function generateBriefEmailHTML(brief, type) {
  const typeLabels = {
    website: "Website Design",
    branding: "Branding",
    "ui-ux": "UI/UX Design",
  };

  let fields = `
    <p><strong>Name:</strong> ${brief.fullName}</p>
    <p><strong>Email:</strong> ${brief.email}</p>
    <p><strong>Company:</strong> ${brief.companyName || "Not provided"}</p>
    <p><strong>Project Type:</strong> ${typeLabels[type]}</p>
    <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
  `;

  const fieldMappings = [
    ["businessDescription", "Business Description"],
    ["projectPurpose", "Project Purpose"],
    ["targetAudience", "Target Audience"],
    ["style", "Preferred Style"],
    ["websitesLiked", "Websites Liked"],
    ["brandPerception", "Brand Perception"],
    ["voicePersonality", "Voice/Personality"],
    ["existingAssets", "Existing Assets"],
    ["brandGuidelines", "Brand Guidelines"],
    ["creativeFreedom", "Creative Freedom"],
    ["pagesNeeded", "Pages Needed"],
    ["features", "Features Required"],
    ["contentReady", "Content Ready"],
    ["mediaReady", "Media Ready"],
    ["animations", "Animations"],
    ["domainOwned", "Domain Owned"],
    ["domainDetails", "Domain Details"],
    ["timeline", "Timeline"],
    ["budget", "Budget"],
    ["additionalNotes", "Additional Notes"],
  ];

  fieldMappings.forEach(([key, label]) => {
    if (brief[key]) {
      fields += `<p><strong>${label}:</strong> ${brief[key]}</p>`;
    }
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
      <div style="background-color: #b02222; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New ${typeLabels[type]} Brief Submission</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        ${fields}
      </div>
      <div style="text-align: center; padding: 20px; color: #888888; font-size: 12px;">
        <p style="margin: 0;">From Owen Digitals Portfolio Website</p>
      </div>
    </div>
  `;
}

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
    
    await resend.emails.send({
      from: "Project Briefs <noreply@owendigitals.work>",
      to: adminEmail,
      reply_to: email,
      subject: `New ${typeLabels[type]} Brief - ${fullName}`,
      html: generateBriefEmailHTML(brief, type),
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
