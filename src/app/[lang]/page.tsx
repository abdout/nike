import React from "react";
import { Card } from "@/components";
import Hero from "@/components/site/hero";
import Trend from "@/components/site/trend";
import BottomHero from "@/components/site/bottom-hero";
import { getCurrentUser } from "@/lib/auth/actions";
import { getAllProducts } from "@/lib/actions/product";
import { getDictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const user = await getCurrentUser();
  const dictionary = await getDictionary(lang);
  const { products } = await getAllProducts({
    page: 1,
    limit: 4,
    sort: "newest",
    search: "",
    genderSlugs: [],
    brandSlugs: [],
    categorySlugs: [],
    sizeSlugs: [],
    colorSlugs: [],
    priceRanges: []
  });

  console.log('USER:', user);

  return (
    <>
      <Hero dictionary={dictionary} lang={lang} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="latest" className="pb-12 pt-12">
          <h2 id="latest" className="mb-6 text-heading-3 text-dark-900">
            {dictionary.product.latestShoes}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Card
                key={p.id}
                title={p.name}
                subtitle={p.subtitle ?? undefined}
                imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                price={p.minPrice !== null ? p.minPrice : undefined}
                href={`/${lang}/products/${p.id}`}
                dictionary={dictionary}
                lang={lang}
              />
            ))}
          </div>
        </section>
      </main>
      <Trend dictionary={dictionary} lang={lang} />
      <BottomHero />
    </>
  );
}