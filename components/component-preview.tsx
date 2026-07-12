import type { ReactNode } from "react";

import { ComponentPreviewFrame } from "@/components/component-preview-frame";
import { ComponentSource } from "@/components/component-source";
import AmountInputDemo from "@/examples/amount-input-demo";
import ChatConversationDemo from "@/examples/chat-conversation-demo";
import ContactFormDemo from "@/examples/contact-form-demo";
import DateTimePickerDemo from "@/examples/date-time-picker-demo";
import EventCardDemo from "@/examples/event-card-demo";
import EventConfirmationDemo from "@/examples/event-confirmation-demo";
import EventDetailDemo from "@/examples/event-detail-demo";
import EventListDemo from "@/examples/event-list-demo";
import HeroDemo from "@/examples/hero-demo";
import InstagramPostDemo from "@/examples/instagram-post-demo";
import IssueReportFormDemo from "@/examples/issue-report-form-demo";
import LinkedInPostDemo from "@/examples/linkedin-post-demo";
import MapCarouselDemo from "@/examples/map-carousel-demo";
import MessageBubbleDemo from "@/examples/message-bubble-demo";
import OptionListDemo from "@/examples/option-list-demo";
import OrderConfirmDemo from "@/examples/order-confirm-demo";
import PaymentConfirmedDemo from "@/examples/payment-confirmed-demo";
import PostCardDemo from "@/examples/post-card-demo";
import PostDetailDemo from "@/examples/post-detail-demo";
import PostListDemo from "@/examples/post-list-demo";
import ProductListDemo from "@/examples/product-list-demo";
import ProgressStepsDemo from "@/examples/progress-steps-demo";
import QuickReplyDemo from "@/examples/quick-reply-demo";
import StatCardDemo from "@/examples/stat-card-demo";
import StatusBadgeDemo from "@/examples/status-badge-demo";
import TableDemo from "@/examples/table-demo";
import TagSelectDemo from "@/examples/tag-select-demo";
import TicketTierSelectDemo from "@/examples/ticket-tier-select-demo";
import XPostDemo from "@/examples/x-post-demo";
import YouTubePostDemo from "@/examples/youtube-post-demo";
import { cn } from "@/lib/utils";

const demos = {
  "amount-input": AmountInputDemo,
  "chat-conversation": ChatConversationDemo,
  "contact-form": ContactFormDemo,
  "date-time-picker": DateTimePickerDemo,
  "event-card": EventCardDemo,
  "event-confirmation": EventConfirmationDemo,
  "event-detail": EventDetailDemo,
  "event-list": EventListDemo,
  hero: HeroDemo,
  "instagram-post": InstagramPostDemo,
  "issue-report-form": IssueReportFormDemo,
  "linkedin-post": LinkedInPostDemo,
  "map-carousel": MapCarouselDemo,
  "message-bubble": MessageBubbleDemo,
  "option-list": OptionListDemo,
  "order-confirm": OrderConfirmDemo,
  "payment-confirmed": PaymentConfirmedDemo,
  "post-card": PostCardDemo,
  "post-detail": PostDetailDemo,
  "post-list": PostListDemo,
  "product-list": ProductListDemo,
  "progress-steps": ProgressStepsDemo,
  "quick-reply": QuickReplyDemo,
  "stat-card": StatCardDemo,
  "status-badge": StatusBadgeDemo,
  table: TableDemo,
  "tag-select": TagSelectDemo,
  "ticket-tier-select": TicketTierSelectDemo,
  "x-post": XPostDemo,
  "youtube-post": YouTubePostDemo,
} as const;

export const ComponentPreview = ({
  name,
  src,
  title,
  showCode = false,
  variant = "default",
  children,
}: {
  name?: string;
  src?: string;
  title?: string;
  showCode?: boolean;
  variant?: "default" | "composed";
  children?: ReactNode;
}) => {
  const Demo = name ? demos[name as keyof typeof demos] : undefined;

  if (!(children || Demo)) {
    return null;
  }

  return (
    <>
      <ComponentPreviewFrame>
        {children ??
          (Demo ? (
            <div
              className={cn(
                "[&>div]:!grid-cols-1",
                variant === "default"
                  ? "[&>div>*:nth-child(2)]:hidden"
                  : "[&>div>*:first-child]:hidden"
              )}
            >
              <Demo />
            </div>
          ) : null)}
      </ComponentPreviewFrame>
      {showCode && src ? (
        <ComponentSource src={src} title={title ?? src.split("/").at(-1)} />
      ) : null}
    </>
  );
};
