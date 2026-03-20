import { getTrackingCaseStudyBySlug } from "@/lib/caseStudiesTracking";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  const caseStudy = await getTrackingCaseStudyBySlug(params.slug);

  if (!caseStudy?.case_study) {
    return new NextResponse("Case study PDF not found.", { status: 404 });
  }

  const pdfPath = path.join(
    process.cwd(),
    "content",
    "case-studies",
    "tracking",
    caseStudy.case_study,
  );

  try {
    const pdfBuffer = await fs.readFile(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${caseStudy.case_study}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Case study PDF not found.", { status: 404 });
  }
}
