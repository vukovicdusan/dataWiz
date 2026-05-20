import { getAllCaseStudies } from "@/lib/caseStudies";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  const caseStudy = (await getAllCaseStudies()).find((item) => item.slug === params.slug);

  if (!caseStudy?.caseStudyFile) {
    return new NextResponse("Case study PDF not found.", { status: 404 });
  }

  const pdfPath = path.join(
    process.cwd(),
    "content",
    "case-studies",
    "tracking",
    caseStudy.caseStudyFile,
  );

  try {
    const pdfBuffer = await fs.readFile(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${caseStudy.caseStudyFile}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Case study PDF not found.", { status: 404 });
  }
}
