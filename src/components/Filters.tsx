"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getArrayParam, removeParams, toggleArrayParam } from "@/lib/utils/query";
import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

interface FiltersProps {
  dictionary: Dictionary;
  lang?: Locale;
}

type GroupKey = "gender" | "size" | "color" | "price";

export default function Filters({ dictionary, lang = 'en' }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);

  const GENDERS = [
    { id: "men", label: dictionary.filters.genderMen },
    { id: "women", label: dictionary.filters.genderWomen },
    { id: "unisex", label: dictionary.filters.genderUnisex },
  ] as const;

  const SIZES = ["XS", "S", "M", "L", "XL"] as const;

  const COLORS = [
    { id: "black", label: dictionary.filters.colorBlack },
    { id: "white", label: dictionary.filters.colorWhite },
    { id: "red", label: dictionary.filters.colorRed },
    { id: "green", label: dictionary.filters.colorGreen },
    { id: "blue", label: dictionary.filters.colorBlue },
    { id: "grey", label: dictionary.filters.colorGrey },
  ] as const;

  const PRICES = [
    { id: "0-50", label: `0 - 50 ${dictionary.common.currency}` },
    { id: "50-100", label: `50 - 100 ${dictionary.common.currency}` },
    { id: "100-150", label: `100 - 150 ${dictionary.common.currency}` },
    { id: "150-", label: `${dictionary.filters.over} 150 ${dictionary.common.currency}` },
  ] as const;

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<GroupKey, boolean>>({
    gender: true,
    size: true,
    color: true,
    price: true,
  });

  const activeCounts = {
    gender: getArrayParam(search, "gender").length,
    size: getArrayParam(search, "size").length,
    color: getArrayParam(search, "color").length,
    price: getArrayParam(search, "price").length,
  };

  useEffect(() => {
    setOpen(false);
  }, [search]);

  const onToggle = (key: GroupKey, value: string) => {
    const url = toggleArrayParam(pathname, search, key, value);
    router.push(url, { scroll: false });
  };

  const clearAll = () => {
    const url = removeParams(pathname, search, ["gender", "size", "color", "price", "page"]);
    router.push(url, { scroll: false });
  };

  const Group = ({
    title,
    children,
    k,
  }: {
    title: string;
    children: import("react").ReactNode;
    k: GroupKey;
  }) => (
    <div className="border-b border-light-300 py-4">
      <button
        className="flex w-full items-center justify-between text-body-medium text-dark-900"
        onClick={() => setExpanded((s) => ({ ...s, [k]: !s[k] }))}
        aria-expanded={expanded[k]}
        aria-controls={`${k}-section`}
      >
        <span>{title}</span>
        <span className="text-caption text-dark-700">{expanded[k] ? "−" : "+"}</span>
      </button>
      <div id={`${k}-section`} className={`${expanded[k] ? "mt-3 block" : "hidden"}`}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          className="rounded-md border border-light-300 px-3 py-2 text-body-medium"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          {dictionary.filters.title}
        </button>
        <button className="text-caption text-dark-700 underline" onClick={clearAll}>
          {dictionary.filters.clearAll}
        </button>
      </div>

      <aside className="sticky top-20 hidden h-fit min-w-60 rounded-lg border border-light-300 bg-light-100 p-4 md:block">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-body-medium text-dark-900">{dictionary.filters.title}</h3>
          <button className="text-caption text-dark-700 underline" onClick={clearAll}>
            {dictionary.filters.clearAll}
          </button>
        </div>

        <Group title={`${dictionary.filters.gender} ${activeCounts.gender ? `(${activeCounts.gender})` : ""}`} k="gender">
          <ul className="space-y-2">
            {GENDERS.map((g) => {
              const checked = getArrayParam(search, "gender").includes(g.id);
              return (
                <li key={g.id} className="flex items-center gap-2">
                  <input
                    id={`gender-${g.id}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("gender" as GroupKey, g.id)}
                  />
                  <label htmlFor={`gender-${g.id}`} className="text-body text-dark-900">
                    {g.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group title={`${dictionary.filters.size} ${activeCounts.size ? `(${activeCounts.size})` : ""}`} k="size">
          <ul className="grid grid-cols-5 gap-2">
            {SIZES.map((s) => {
              const checked = getArrayParam(search, "size").includes(s);
              return (
                <li key={s}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-dark-900"
                      checked={checked}
                      onChange={() => onToggle("size", s)}
                    />
                    <span className="text-body">{s}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group title={`${dictionary.filters.color} ${activeCounts.color ? `(${activeCounts.color})` : ""}`} k="color">
          <ul className="grid grid-cols-2 gap-2">
            {COLORS.map((c) => {
              const checked = getArrayParam(search, "color").includes(c.id);
              return (
                <li key={c.id} className="flex items-center gap-2">
                  <input
                    id={`color-${c.id}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("color", c.id)}
                  />
                  <label htmlFor={`color-${c.id}`} className="text-body capitalize">
                    {c.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group title={`${dictionary.filters.price} ${activeCounts.price ? `(${activeCounts.price})` : ""}`} k="price">
          <ul className="space-y-2">
            {PRICES.map((p) => {
              const checked = getArrayParam(search, "price").includes(p.id);
              return (
                <li key={p.id} className="flex items-center gap-2">
                  <input
                    id={`price-${p.id}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("price", p.id)}
                  />
                  <label htmlFor={`price-${p.id}`} className="text-body">
                    {p.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[80%] overflow-auto bg-light-100 p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-body-medium">{dictionary.filters.title}</h3>
              <button className="text-caption text-dark-700 underline" onClick={clearAll}>
                {dictionary.filters.clearAll}
              </button>
            </div>
            {/* Reuse the same desktop content by rendering the component again */}
            <div className="md:hidden">
              <Group title={dictionary.filters.gender} k="gender">
                <ul className="space-y-2">
                  {GENDERS.map((g) => {
                    const checked = getArrayParam(search, "gender").includes(g.id);
                    return (
                      <li key={g.id} className="flex items-center gap-2">
                        <input
                          id={`m-gender-${g.id}`}
                          type="checkbox"
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("gender", g.id)}
                        />
                        <label htmlFor={`m-gender-${g.id}`} className="text-body">
                          {g.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>

              <Group title={dictionary.filters.size} k="size">
                <ul className="grid grid-cols-4 gap-2">
                  {SIZES.map((s) => {
                    const checked = getArrayParam(search, "size").includes(s);
                    return (
                      <li key={s}>
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-dark-900"
                            checked={checked}
                            onChange={() => onToggle("size", s)}
                          />
                          <span className="text-body">{s}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>

              <Group title={dictionary.filters.color} k="color">
                <ul className="grid grid-cols-2 gap-2">
                  {COLORS.map((c) => {
                    const checked = getArrayParam(search, "color").includes(c.id);
                    return (
                      <li key={c.id} className="flex items-center gap-2">
                        <input
                          id={`m-color-${c.id}`}
                          type="checkbox"
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("color", c.id)}
                        />
                        <label htmlFor={`m-color-${c.id}`} className="text-body capitalize">
                          {c.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>

              <Group title={dictionary.filters.price} k="price">
                <ul className="space-y-2">
                  {PRICES.map((p) => {
                    const checked = getArrayParam(search, "price").includes(p.id);
                    return (
                      <li key={p.id} className="flex items-center gap-2">
                        <input
                          id={`m-price-${p.id}`}
                          type="checkbox"
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("price", p.id)}
                        />
                        <label htmlFor={`m-price-${p.id}`} className="text-body">
                          {p.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>
            </div>
          </div>
        </div>
      )}
    </>
  );
}