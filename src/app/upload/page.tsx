import { UploadForm } from "~/app/upload/upload-form";

export default async function UploadPage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-32 max-md:pt-10">
      <h1 className="text-2xl font-medium tracking-tighter">PDF → Test</h1>
      <section className="mt-8">
        <UploadForm />
      </section>
    </main>
  );
}
