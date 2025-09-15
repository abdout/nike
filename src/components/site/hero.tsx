import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

interface HeroProps {
  dictionary: Dictionary;
  lang: Locale;
}

export default function Hero({ dictionary, lang }: HeroProps) {
  const isRTL = lang === 'ar';

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: isRTL ? 'scaleX(-1)' : 'none'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            {/* Hero Shoe Image - Right for both AR and EN */}
            <div className={`flex justify-center ${isRTL ? 'lg:order-2 lg:justify-end' : 'lg:order-2 lg:justify-end'}`}>
              <img
                src="/hero-shoe.png"
                alt="Nike Air Jordan Sneaker"
                className="w-full max-w-lg h-auto"
              />
            </div>

            {/* Text Content - Left for both AR and EN */}
            <div className={`max-w-2xl ${isRTL ? 'lg:order-1' : 'lg:order-1'}`}>
              <div className="text-[#d33918] text-xs font-semibold tracking-wide uppercase mb-4">
                {dictionary.home.heroTagline}
              </div>
              <h1 className="text-[#111111] text-3xl lg:text-5xl font-bold leading-tight mb-4">
                {dictionary.home.heroMainTitle}
              </h1>
              <p className="text-[#111111] text-base leading-relaxed max-w-lg mb-6">
                {dictionary.home.heroDescription}
              </p>
              <button className="bg-[#111111] text-[#ffffff] hover:bg-[#757575] px-8 py-3 rounded-full transition-colors text-base font-medium">
                {dictionary.home.findYourShoe}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}