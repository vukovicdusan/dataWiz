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

const TemplateToneSchema = z.enum(["default", "red", "green"]).optional();

const TemplateMetricSchema = z.object({
  data_accuracy: z.string().default(""),
  accuracy_improvement: z.string().default(""),
  attribution_improvement: z.string().default(""),
});

const TemplateOutcomeSchema = z.object({
  platform: z.string().default(""),
  health: z.string().optional(),
  baseline: z.string().default(""),
  baseline_tone: TemplateToneSchema,
  project_target: z.string().default(""),
  final_outcome: z.string().default(""),
  final_outcome_tone: TemplateToneSchema,
  uplift: z.string().default(""),
  uplift_tone: TemplateToneSchema,
});

const TemplateCaseStudySchema = z.object({
  client: z.string().min(1),
  slug: z.string().min(1),
  categories: z.array(z.string().min(1)).default(["Tracking"]),
  website: z.string().optional(),
  logo_file: z.string().min(1),
  top_metrics: TemplateMetricSchema.default({
    data_accuracy: "",
    accuracy_improvement: "",
    attribution_improvement: "",
  }),
  project_overview: z.object({
    meet_the_client: z.string().optional(),
    challenges: z.array(ContentItemSchema).default([]),
    objectives: z.array(ContentItemSchema).default([]),
    initial_setup: z.array(ContentItemSchema).default([]),
    solutions: z.array(ContentItemSchema).default([]),
  }),
  project_results: z.object({
    understanding_metrics: z.array(z.object({ description: z.string().default("") })).default([]),
    data_accuracy: z.object({
      project_outcomes: z.array(TemplateOutcomeSchema).default([]),
      industry_average_note: z.string().optional(),
      consent_note: z.string().optional(),
      business_impact: z.array(ContentItemSchema).default([]),
    }),
    attribution_improvement: z.object({
      project_outcomes: z.array(TemplateOutcomeSchema).default([]),
      consent_note: z.string().optional(),
      business_impact: z.array(ContentItemSchema).default([]),
    }),
    overcoming_tracking_restrictions: z.object({
      use_tracking_prevention: z.string().default(""),
      use_tracking_prevention_tone: TemplateToneSchema,
      other_tone: TemplateToneSchema,
    }),
  }),
  client_experience: z.object({
    review_text: z.string().optional(),
    client_name: z.string().optional(),
    client_position: z.string().optional(),
  }),
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

function normalizeLogoPath(logoFile: string): string {
  return logoFile.startsWith("/") ? logoFile : `/images/${logoFile}`;
}

function categoryFromTemplate(categories: string[]): string {
  return categories[0]?.toLowerCase().replace(/\s+/g, "-") ?? "tracking";
}

function metricToKpi(title: string, value: string): CaseStudyKpi | null {
  const match = value.match(/^([^0-9-]*)(-?\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    title,
    beforeNumber: match[1] || undefined,
    number: Number(match[2]),
    afterNumber: match[3] || undefined,
  };
}

function optionalItem(title: string, description?: string): CaseStudyContentItem | null {
  return description ? { title, description } : null;
}

function withTone(value: string, tone?: "default" | "red" | "green") {
  return tone && tone !== "default" ? { value, tone } : value;
}

function percentageValue(value: string): number {
  const match = value.match(/-?\d+(?:\.\d+)?/);

  return match ? Number(match[0]) : 0;
}

function normalizeTemplateCaseStudy(
  caseStudy: z.infer<typeof TemplateCaseStudySchema>,
): z.infer<typeof CaseStudySchema> {
  const understandingMetrics = caseStudy.project_results.understanding_metrics;
  const trackingPreventionValue =
    caseStudy.project_results.overcoming_tracking_restrictions.use_tracking_prevention;
  const trackingPrevention = percentageValue(trackingPreventionValue);

  const featuredKpis = [
    metricToKpi("Data Accuracy", caseStudy.top_metrics.data_accuracy),
    metricToKpi("Accuracy Improvement", caseStudy.top_metrics.accuracy_improvement),
    metricToKpi("Attribution Improvement", caseStudy.top_metrics.attribution_improvement),
  ].filter((kpi): kpi is CaseStudyKpi => Boolean(kpi));

  return {
    name: caseStudy.client,
    slug: caseStudy.slug,
    category: categoryFromTemplate(caseStudy.categories),
    logo: normalizeLogoPath(caseStudy.logo_file),
    website: caseStudy.website,
    metaTitle: `DataWiz - Success Stories - ${caseStudy.client}`,
    metaDescription: `How DataWiz helped ${caseStudy.client} improve tracking accuracy, attribution, and marketing data resilience.`,
    featuredKpis,
    projectStats: [],
    intro: caseStudy.project_overview.meet_the_client,
    challenges: caseStudy.project_overview.challenges,
    objectives: caseStudy.project_overview.objectives,
    initialSetup: caseStudy.project_overview.initial_setup,
    solutions: caseStudy.project_overview.solutions,
    results: [
      {
        title: "Data Accuracy",
        visual: "table",
        table: {
          columns: ["PLATFORM", "BASELINE", "PROJECT TARGET", "FINAL OUTCOME", "UPLIFT"],
          rows: caseStudy.project_results.data_accuracy.project_outcomes.map((outcome) => ({
            cells: [
              outcome.platform,
              withTone(outcome.baseline, outcome.baseline_tone),
              outcome.project_target,
              withTone(outcome.final_outcome, outcome.final_outcome_tone),
              withTone(outcome.uplift, outcome.uplift_tone),
            ],
          })),
        },
        items: [
          optionalItem("Understanding the Metric", understandingMetrics[0]?.description),
          optionalItem(
            "Industry Average",
            caseStudy.project_results.data_accuracy.industry_average_note,
          ),
          optionalItem("Consent Note", caseStudy.project_results.data_accuracy.consent_note),
          ...caseStudy.project_results.data_accuracy.business_impact,
        ].filter((item): item is CaseStudyContentItem => Boolean(item)),
      },
      {
        title: "Marketing Attribution",
        visual: "table",
        reverse: true,
        table: {
          columns: ["PLATFORM", "HEALTH", "BASELINE", "PROJECT TARGET", "FINAL OUTCOME", "UPLIFT"],
          rows: caseStudy.project_results.attribution_improvement.project_outcomes.map(
            (outcome) => ({
              cells: [
                outcome.platform,
                outcome.health ?? "",
                withTone(outcome.baseline, outcome.baseline_tone),
                outcome.project_target,
                withTone(outcome.final_outcome, outcome.final_outcome_tone),
                withTone(outcome.uplift, outcome.uplift_tone),
              ],
            }),
          ),
        },
        items: [
          optionalItem("Understanding the Metric", understandingMetrics[1]?.description),
          optionalItem("Consent Note", caseStudy.project_results.attribution_improvement.consent_note),
          ...caseStudy.project_results.attribution_improvement.business_impact,
        ].filter((item): item is CaseStudyContentItem => Boolean(item)),
      },
      ...(trackingPreventionValue
        ? [
            {
              title: "Overcoming Tracking Restrictions",
              visual: "chart" as const,
              chart: {
                labels: ["Normal Users", "Use Tracking Prevention"],
                values: [100 - trackingPrevention, trackingPrevention],
                colors: ["#3b82f6", "#ef4444"],
                offsets: [0, 50],
                cutout: "55%",
              },
              items: [
                optionalItem("Understanding the Metric", understandingMetrics[2]?.description),
              ].filter((item): item is CaseStudyContentItem => Boolean(item)),
            },
          ]
        : [
            {
              title: "Overcoming Tracking Restrictions",
              items: [
                optionalItem("Understanding the Metric", understandingMetrics[2]?.description),
                optionalItem(
                  "Tracking Accuracy",
                  "Server-side tracking bypasses current tracking restrictions, ensuring high data accuracy and attribution.",
                ),
                optionalItem(
                  "Future Resilience",
                  "As tracking prevention systems evolve, server-side tracking provides a future-proof solution.",
                ),
              ].filter((item): item is CaseStudyContentItem => Boolean(item)),
            },
          ]),
    ],
    testimonial: caseStudy.client_experience.review_text
      ? {
          quote: caseStudy.client_experience.review_text,
          name: caseStudy.client_experience.client_name,
          title: caseStudy.client_experience.client_position,
        }
      : undefined,
  };
}

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
  const templateParsed = TemplateCaseStudySchema.safeParse(data);
  const parsed = templateParsed.success
    ? CaseStudySchema.safeParse(normalizeTemplateCaseStudy(templateParsed.data))
    : CaseStudySchema.safeParse(data);

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
