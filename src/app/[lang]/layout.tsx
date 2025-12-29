import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import { type Locale, localeConfig } from "@/components/internationalization/config";
import { Footer, Navbar, LocaleProvider } from "@/components";
import "../globals.css";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    other: {
      'accept-language': lang,
    },
    alternates: {
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <LocaleProvider>
      <Navbar dictionary={dictionary} lang={lang} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer dictionary={dictionary} lang={lang} />
    </LocaleProvider>
  );
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return Object.keys(localeConfig).map((lang) => ({ lang }));
}