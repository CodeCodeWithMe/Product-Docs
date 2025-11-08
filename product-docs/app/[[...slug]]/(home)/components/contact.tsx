import { Badge } from "@/components/ui/badge";

export default function Contact() {
  return (
    <section id="contact" className="">
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
        <div className="space-y-3">
          <Badge variant="secondary" className="mb-4">
            Contact
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Want to chat? Just shoot me a dm{" "}
            <a
              href="mailto:hello@codecode.me"
              className="text-blue-500 hover:underline"
            >
              with a direct question on email
            </a>{" "}
            and I&apos;ll respond whenever I can.
          </p>
        </div>
      </div>
    </section>
  );
}
