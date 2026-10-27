import type { ReactNode } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmissionResultProps = {
  title: string;
  reference: string;
  /** Whether the submission was stored server-side */
  recorded: boolean;
  whatsappUrl: string;
  /** What the WhatsApp step does, e.g. "confirm your order" */
  whatsappPurpose: string;
  children?: ReactNode;
};

/**
 * Confirmation panel shared by checkout, wholesale and contact forms. When
 * nothing was recorded server-side, the WhatsApp hand-off is the only channel,
 * so it is presented as the required next step.
 */
export function SubmissionResult({
  title,
  reference,
  recorded,
  whatsappUrl,
  whatsappPurpose,
  children,
}: SubmissionResultProps) {
  return (
    <div className="rounded-md border border-line bg-white p-6 sm:p-8" role="status" aria-live="polite">
      <CheckCircle2 className="h-8 w-8 text-forest" strokeWidth={1.5} aria-hidden />
      <h2 className="mt-4 text-2xl text-ink sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-muted">
        Reference <span className="font-medium tabular-nums text-ink">{reference}</span>
      </p>
      {children}
      <div className="mt-6 rounded-md bg-paper p-4 text-sm leading-relaxed text-ink">
        {recorded ? (
          <p>
            We&rsquo;ve received your details and will contact you shortly. For a
            faster reply you can also message us on WhatsApp.
          </p>
        ) : (
          <p>
            <strong className="font-medium">One last step:</strong> send the
            prepared message on WhatsApp to {whatsappPurpose}. We reply during
            business hours.
          </p>
        )}
      </div>
      <Button asChild size="lg" className="mt-5 w-full sm:w-auto">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle />
          {recorded ? "Message us on WhatsApp" : "Send on WhatsApp"}
        </a>
      </Button>
    </div>
  );
}
