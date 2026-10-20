import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesTable } from "./services-table";

export async function Services() {
  const t = await getTranslations("home.services");
  return (
    <section aria-labelledby="services-title">
      <Container className="section-y">
        <div className="mb-12 flex flex-wrap justify-between gap-6">
          <SectionHeading id="services-title" index={t("index")} title={t("title")} />
          <p className="max-w-[380px] self-end text-[17px] leading-relaxed text-text-2">
            {t("intro")}
          </p>
        </div>
        <ServicesTable />
      </Container>
    </section>
  );
}
