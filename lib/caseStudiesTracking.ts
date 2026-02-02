import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const KpiSchema = z.object({
  title: z.string().min(1),
  number: z.number(),
  afterNumber: z.string().optional().default(""),
});

const ItemSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().min(1), // "/images/.."
  kpis: z.array(KpiSchema).max(6).default([]),
});

const ArchiveSchema = z.object({
  title: z.string().min(1).default("Tracking Success Stories"),
  items: z.array(ItemSchema).default([]),
});

export type TrackingCaseStudyArchive = z.infer<typeof ArchiveSchema>;

export async function getTrackingCaseStudiesArchive(): Promise<TrackingCaseStudyArchive> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "case-studies",
    "tracking",
    "archive.md",
  );
  const raw = await fs.readFile(filePath, "utf8");

  const { data } = matter(raw);

  // gray-matter returns unknown; validate hard so content can’t break builds silently
  return ArchiveSchema.parse(data);
}
