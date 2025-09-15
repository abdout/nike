"use client";

import { useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";
import { useRouter } from "next/navigation";
import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

type Props = {
  mode: "sign-in" | "sign-up";
  onSubmit: (formData: FormData) => Promise<{ ok: boolean; userId?: string } | void>;
  dictionary: Dictionary;
  lang: Locale;
};

export default function AuthForm({ mode, onSubmit, dictionary, lang }: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const result = await onSubmit(formData);

      if(result?.ok) router.push(`/${lang}`);
    } catch (e) {
      console.log("error", e);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-caption text-dark-700">
          {mode === "sign-in" ? dictionary.auth.dontHaveAccount : dictionary.auth.alreadyHaveAccount}
          <Link href={`/${lang}/${mode === "sign-in" ? "sign-up" : "sign-in"}`} className="underline">
            {mode === "sign-in" ? dictionary.auth.signUp : dictionary.auth.signIn}
          </Link>
        </p>
        <h1 className="mt-3 text-heading-3 text-dark-900">
          {mode === "sign-in" ? dictionary.auth.signIn : dictionary.auth.signUp}
        </h1>
        <p className="mt-1 text-body text-dark-700">
          {mode === "sign-in"
            ? dictionary.auth.dontHaveAccount
            : dictionary.auth.alreadyHaveAccount}
        </p>
      </div>

      <SocialProviders variant={mode} dictionary={dictionary} />

      <div className="flex items-center gap-4">
        <hr className="h-px w-full border-0 bg-light-300" />
        <span className="shrink-0 text-caption text-dark-700">
          {lang === 'ar' ? 'أو' : 'OR'}
        </span>
        <hr className="h-px w-full border-0 bg-light-300" />
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        {mode === "sign-up" && (
          <div className="space-y-1">
            <label htmlFor="name" className="text-caption text-dark-900">
              {dictionary.auth.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={dictionary.auth.name}
              className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
              autoComplete="name"
            />
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="text-caption text-dark-900">
            {dictionary.auth.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={dictionary.auth.email}
            className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-caption text-dark-900">
            {dictionary.auth.password}
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              placeholder={dictionary.auth.password}
              className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 pr-12 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              minLength={8}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-caption text-dark-700"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-dark-900/20"
        >
          {mode === "sign-in" ? dictionary.auth.signIn : dictionary.auth.signUp}
        </button>

        {mode === "sign-up" && (
          <p className="text-center text-footnote text-dark-700">
            {lang === 'ar' ? 'بالتسجيل، فإنك توافق على' : 'By signing up, you agree to our'}{" "}
            <a href={`/${lang}`} className="underline">
              {lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </a>{" "}
            {lang === 'ar' ? 'و' : 'and'}{" "}
            <a href={`/${lang}`} className="underline">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
          </p>
        )}
      </form>
    </div>
  );
}