import { PageLayout } from "../../components/PageLayout";
import { getAllCaseStudies } from "../../lib/case-studies";
import CaseStudyList from "./CaseStudyList";

export const metadata = {
  title: "Case Studies | Flexra",
  description: "Se hur vi hjälpt andra företag att växa med AI och automation. Verkliga exempel på processautomation, AI-integration och systemintegration."
};

// Revalidera varje timme för att hämta nya case studies
export const revalidate = 3600;

export default async function CaseStudiesPage() {
  // Hämta case studies från AITable (filtreras automatiskt på company)
  const caseStudies = await getAllCaseStudies();

  // Hämta unika kategorier och branscher för filter
  const categories = [...new Set(caseStudies.map(cs => cs.category).filter(Boolean))];
  const industries = [...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))];

  return (
    <PageLayout
      title="Se hur vi hjälpt andra företag att växa"
      subtitle="Case studies"
    >
      <CaseStudyList
        caseStudies={caseStudies}
        categories={categories}
        industries={industries}
      />

      {caseStudies.length === 0 && (
        <section className="px-[5%] py-16 md:py-24">
          <div className="container text-center">
            <p className="text-gray-500">
              Inga case studies hittades. Kom tillbaka snart för nya exempel!
            </p>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
