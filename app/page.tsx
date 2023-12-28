import { trpc } from "~/trpc/server";
import { SettingsForm } from "./_components/settings-form";

export default async function HomePage() {
  const settings = await trpc.app.info.query();

  return (
    <section className="container py-8">
      <SettingsForm initialSettings={settings} />
    </section>
  );
}
