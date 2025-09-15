import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

interface TrendProps {
  dictionary?: Dictionary;
  lang?: Locale;
}

export default function Trend({ dictionary, lang }: TrendProps) {
  const isRTL = lang === 'ar';

  return (
    <section className="py-12 bg-[#f5f5f5]">
      <div className="w-full px-4 sm:px-6 lg:px-8 rtl:pr-4 rtl:pl-4">
        <h2 className="text-[#111111] text-2xl font-bold mb-12">
          {dictionary ? dictionary.home.trending : "Trending Now"}
        </h2>

        {/* First Row - React Presto */}
        <div className="mb-8">
          <div className="relative bg-[#111111] rounded-lg overflow-hidden h-96">
            <img src="/trending-1.png" alt="Nike React Presto Collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} text-[#ffffff]`}>
              <h3 className="text-4xl font-bold mb-2">
                {isRTL ? "رياكت بريستو" : "REACT PRESTO"}
              </h3>
              <p className="text-base mb-4 opacity-90">
                {isRTL ? "مع رغوة React للحصول على أكثر برستو راحة على الإطلاق." : "With React foam for the most comfortable Presto ever."}
              </p>
              <button className="bg-[#ffffff] text-[#111111] hover:bg-[#f0f0f0] px-6 py-2 rounded-full transition-colors">
                {dictionary ? dictionary.home.shopNow : "Shop Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Second Row - Summer Must-Haves and Air Jordan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="relative bg-[#e5e5e5] rounded-lg overflow-hidden h-64">
            <img
              src="/trending-2.png"
              alt="Summer Must-Haves: Air Max Dia"
              className="w-full h-full object-cover"
            />
            <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-[#ffffff]`}>
              <h4 className="text-xl font-semibold">
                {isRTL ? "ضروريات الصيف: إير ماكس ديا" : "Summer Must-Haves: Air Max Dia"}
              </h4>
            </div>
          </div>

          <div className="relative bg-[#e5e5e5] rounded-lg overflow-hidden h-64">
            <img
              src="/trending-3.png"
              alt="Air Jordan 11 Retro Low LE"
              className="w-full h-full object-cover"
            />
            <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-[#ffffff]`}>
              <h4 className="text-xl font-semibold">
                {isRTL ? "إير جوردان 11 ريترو لو LE" : "Air Jordan 11 Retro Low LE"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}