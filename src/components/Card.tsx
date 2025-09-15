import Image from "next/image";
import Link from "next/link";
import RiyalSymbol from "./RiyalSymbol";
import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

export type BadgeTone = "red" | "green" | "orange";

export interface CardProps {
  title: string;
  description?: string;
  subtitle?: string;
  meta?: string | string[];
  imageSrc: string;
  imageAlt?: string;
  price?: string | number;
  href?: string;
  badge?: { label: string; tone?: BadgeTone };
  className?: string;
  dictionary?: Dictionary;
  lang?: Locale;
}

export default function Card({
  title,
  description,
  subtitle,
  meta,
  imageSrc,
  imageAlt = title,
  price,
  href,
  className = "",
  dictionary,
  lang,
}: CardProps) {
  const displayPrice =
    price === undefined ? undefined : typeof price === "number" ? (
      <span className="flex items-center gap-1">
        <RiyalSymbol size={14} />
        {price.toFixed(2)}
      </span>
    ) : price;
  const content = (
    <article
      className={`group rounded-xl bg-light-100 ${className}`}
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-light-200">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-dark-900 mb-2">{title}</h3>
        {displayPrice && (
          <div className="text-body-medium text-dark-900 mb-2">{displayPrice}</div>
        )}
        {description && (
          <p className="text-sm text-dark-700">
            {dictionary && lang === 'ar' ? 'أحذية رياضية عالية الجودة' : description}
          </p>
        )}
        {subtitle && !description && (
          <p className="text-sm text-dark-700">
            {dictionary && lang === 'ar' ? 'تصميم عصري ومريح' : subtitle}
          </p>
        )}
        {meta && (
          <p className="mt-1 text-caption text-dark-700">
            {Array.isArray(meta) ? meta.join(" • ") : meta}
          </p>
        )}
      </div>
    </article>
  );

  return href ? (
    <Link
      href={href}
      aria-label={title}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
    >
      {content}
    </Link>
  ) : (
    content
  );
}
