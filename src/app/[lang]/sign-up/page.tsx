import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/auth/actions";
import { getDictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <AuthForm mode="sign-up" onSubmit={signUp} dictionary={dictionary} lang={lang} />;
}