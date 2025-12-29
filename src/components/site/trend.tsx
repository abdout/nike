import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

interface TrendProps {
  dictionary: Dictionary;
  lang: Locale;
}

export default function Trend({ dictionary, lang }: TrendProps) {
  return (
    <section className="py-12 bg-light-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-dark-900 text-2xl font-bold mb-12">
          {dictionary.home.trending}
        </h2>

        {/* First Row - React Presto */}
        <div className="mb-8">
          <div className="relative bg-dark-900 rounded-lg overflow-hidden h-96">
            <img src="/trending-1.png" alt="Nike React Presto Collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-8 start-8 text-light-100">
              <h3 className="text-4xl font-bold mb-2">
                {dictionary.home.reactPresto}
              </h3>
              <p className="text-base mb-4 opacity-90">
                {dictionary.home.reactPrestoDesc}
              </p>
              <button className="bg-light-100 text-dark-900 hover:bg-light-200 px-6 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-light-100 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900">
                {dictionary.home.shopNow}
              </button>
            </div>
          </div>
        </div>

        {/* Second Row - Summer Must-Haves and Air Jordan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="relative bg-light-300 rounded-lg overflow-hidden h-64">
            <img
              src="/trending-2.png"
              alt="Summer Must-Haves: Air Max Dia"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 start-4 text-light-100">
              <h4 className="text-xl font-semibold">
                {dictionary.home.summerMustHaves}
              </h4>
            </div>
          </div>

          <div className="relative bg-light-300 rounded-lg overflow-hidden h-64">
            <img
              src="/trending-3.png"
              alt="Air Jordan 11 Retro Low LE"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 start-4 text-light-100">
              <h4 className="text-xl font-semibold">
                {dictionary.home.airJordan11}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
