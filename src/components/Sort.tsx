"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setParam } from "@/lib/utils/query";
import { useMemo } from "react";
import { type Dictionary } from "@/components/internationalization/dictionaries";

interface SortProps {
  dictionary: Dictionary;
}

export default function Sort({ dictionary }: SortProps) {
  const OPTIONS = [
    { label: dictionary.sort.featured, value: "featured" },
    { label: dictionary.sort.newest, value: "newest" },
    { label: dictionary.sort.priceHighToLow, value: "price_desc" },
    { label: dictionary.sort.priceLowToHigh, value: "price_asc" },
  ] as const;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);
  const selected = searchParams.get("sort") ?? "featured";

  const onChange = (value: string) => {
    const withSort = setParam(pathname, search, "sort", value);
    const withPageReset = setParam(pathname, new URL(withSort, "http://dummy").search, "page", "1");
    router.push(withPageReset, { scroll: false });
  };

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-body text-dark-900">{dictionary.sort.title}</span>
      <select
        className="rounded-md border border-light-300 bg-light-100 py-2 text-body pl-2 pr-10 rtl:pl-10 rtl:pr-2"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort products"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
