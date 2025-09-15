import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

interface BottomHeroProps {
  dictionary: Dictionary;
  lang: Locale;
}

export default function BottomHero({ dictionary, lang }: BottomHeroProps) {
  const isRTL = lang === 'ar';
  return (
    <section className="relative bg-[#f5f5f5] overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="text-[#d33918] text-xs font-semibold tracking-wide uppercase">{dictionary.home.heroTagline}</div>
            <h1 className="text-[#111111] text-3xl lg:text-4xl font-bold leading-tight">
              {lang === 'ar' ? 'نايكي رياكت' : 'NIKE REACT'}
              <br />
              {lang === 'ar' ? 'بريستو من تصميمك' : 'PRESTO BY YOU'}
            </h1>
            <p className="text-[#757575] text-base leading-relaxed max-w-md">
              {lang === 'ar' ? 'استفد من تقنية التوسيد الجديدة والحصرية مع زوج جديد من أحذية نايكي رياكت.' : 'Take advantage of brand new, proprietary cushioning technology with a fresh pair of Nike react shoes.'}
            </p>
            <button className="bg-[#111111] text-[#ffffff] hover:bg-[#757575] px-8 py-3 rounded-full transition-colors">
              {dictionary.home.shopNow}
            </button>
          </div>

          {/* Bottom Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/feature.png"
              alt="Nike React Presto"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}