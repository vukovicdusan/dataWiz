import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { getTrackingCaseStudiesArchive } from "./caseStudiesTracking";

const contentDirectory = path.join(process.cwd(), "content", "case-studies");

const KpiSchema = z.object({
  title: z.string().min(1),
  number: z.number(),
  beforeNumber: z.string().optional(),
  afterNumber: z.string().optional(),
});

const ContentItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const TableCellSchema = z.union([
  z.string(),
  z.number(),
  z.object({
    value: z.union([z.string(), z.number()]),
    tone: z.enum(["default", "red", "green"]).optional(),
  }),
]);

const TableSchema = z.object({
  columns: z.array(z.string().min(1)).default([]),
  rows: z.array(z.object({ cells: z.array(TableCellSchema).default([]) })).default([]),
  footer: z
    .object({
      label: z.string().min(1),
      value: z.string().min(1),
      labelColSpan: z.number().int().positive().optional(),
      valueColSpan: z.number().int().positive().optional(),
    })
    .optional(),
});

const ChartSchema = z.object({
  labels: z.array(z.string().min(1)).default([]),
  values: z.array(z.number()).default([]),
  colors: z.array(z.string().min(1)).optional(),
  offsets: z.array(z.number()).optional(),
  cutout: z.string().optional(),
});

const ResultSectionSchema = z.object({
  title: z.string().min(1),
  items: z.array(ContentItemSchema).default([]),
  visual: z
    .enum(["table", "chart", "awesomeBooksTable1", "awesomeBooksTable2", "doughnutAB"])
    .optional(),
  table: TableSchema.optional(),
  chart: ChartSchema.optional(),
  reverse: z.boolean().optional(),
  note: z.string().optional(),
});

const TestimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().optional(),
  title: z.string().optional(),
});

const CaseStudySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().default("tracking"),
  logo: z.string().min(1),
  website: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  caseStudyFile: z.string().optional(),
  featuredKpis: z.array(KpiSchema).default([]),
  projectStats: z.array(KpiSchema).default([]),
  intro: z.string().optional(),
  challenges: z.array(ContentItemSchema).default([]),
  objectives: z.array(ContentItemSchema).default([]),
  initialSetup: z.array(ContentItemSchema).default([]),
  solutions: z.array(ContentItemSchema).default([]),
  results: z.array(ResultSectionSchema).default([]),
  testimonial: TestimonialSchema.optional(),
});

export type CaseStudyKpi = z.infer<typeof KpiSchema>;
export type CaseStudyContentItem = z.infer<typeof ContentItemSchema>;
export type CaseStudyTableData = z.infer<typeof TableSchema>;
export type CaseStudyChartData = z.infer<typeof ChartSchema>;
export type CaseStudyResultSection = z.infer<typeof ResultSectionSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema> & {
  content: string;
  sourcePath: string;
};

export type CaseStudyListItem = Pick<
  CaseStudy,
  | "name"
  | "slug"
  | "category"
  | "logo"
  | "website"
  | "metaTitle"
  | "metaDescription"
  | "caseStudyFile"
  | "featuredKpis"
> & {
  legacyPdfOnly?: boolean;
};

async function getMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getMarkdownFiles(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

async function readCaseStudyFile(filePath: string): Promise<CaseStudy | null> {
  if (path.basename(filePath) === "archive.md") {
    return null;
  }

  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);
  const parsed = CaseStudySchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      `Invalid case study frontmatter in ${filePath}: ${parsed.error.message}`,
    );
  }

  return {
    ...parsed.data,
    content,
    sourcePath: filePath,
  };
}

async function getMarkdownCaseStudies(): Promise<CaseStudy[]> {
  const files = await getMarkdownFiles(contentDirectory);
  const caseStudies = await Promise.all(files.map(readCaseStudyFile));

  return caseStudies
    .filter((caseStudy): caseStudy is CaseStudy => Boolean(caseStudy))
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function getLegacyTrackingCaseStudies(): Promise<CaseStudyListItem[]> {
  const archive = await getTrackingCaseStudiesArchive();

  return archive.items.map((item) => ({
    name: item.name,
    slug: item.slug,
    category: "tracking",
    logo: item.logo,
    caseStudyFile: item.case_study,
    featuredKpis: item.kpis,
    legacyPdfOnly: true,
  }));
}

export async function getAllCaseStudies(): Promise<CaseStudyListItem[]> {
  const [markdownCaseStudies, legacyCaseStudies] = await Promise.all([
    getMarkdownCaseStudies(),
    getLegacyTrackingCaseStudies(),
  ]);

  const markdownItems = markdownCaseStudies.map((caseStudy) => ({
    name: caseStudy.name,
    slug: caseStudy.slug,
    category: caseStudy.category,
    logo: caseStudy.logo,
    website: caseStudy.website,
    metaTitle: caseStudy.metaTitle,
    metaDescription: caseStudy.metaDescription,
    caseStudyFile: caseStudy.caseStudyFile,
    featuredKpis: caseStudy.featuredKpis,
  }));

  const markdownSlugs = new Set(markdownItems.map((item) => item.slug));
  const legacyItems = legacyCaseStudies.filter((item) => !markdownSlugs.has(item.slug));

  return [...markdownItems, ...legacyItems];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const caseStudies = await getMarkdownCaseStudies();

  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export async function getCaseStudyListByCategory(
  category: string,
): Promise<CaseStudyListItem[]> {
  const caseStudies = await getAllCaseStudies();

  return caseStudies.filter((caseStudy) => caseStudy.category === category);
}

export async function generateCaseStudyStaticParams(): Promise<Array<{ slug: string }>> {
  const caseStudies = await getAllCaseStudies();

  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}
