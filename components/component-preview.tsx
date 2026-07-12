import type { ReactNode } from "react";

import { ComponentPreviewFrame } from "@/components/component-preview-frame";
import { ComponentSource } from "@/components/component-source";
import AddressFormDemo from "@/examples/address-form-demo";
import ArticlePreviewDemo from "@/examples/article-preview-demo";
import DeliveryStatusDemo from "@/examples/delivery-status-demo";
import EmailInputDemo from "@/examples/email-input-demo";
import EventConfirmationDemo from "@/examples/event-confirmation-demo";
import InstagramPostDemo from "@/examples/instagram-post-demo";
import OrderConfirmDemo from "@/examples/order-confirm-demo";
import OrderStatusDemo from "@/examples/order-status-demo";
import OrderTimelineDemo from "@/examples/order-timeline-demo";
import PayConfirmDemo from "@/examples/pay-confirm-demo";
import PaymentMethodSelectDemo from "@/examples/payment-method-select-demo";
import PhoneInputDemo from "@/examples/phone-input-demo";
import ProductListDemo from "@/examples/product-list-demo";
import RatingCardDemo from "@/examples/rating-card-demo";
import RefundStatusDemo from "@/examples/refund-status-demo";
import SeatSelectorDemo from "@/examples/seat-selector-demo";
import TestimonialCardDemo from "@/examples/testimonial-card-demo";
import TicketTierSelectDemo from "@/examples/ticket-tier-select-demo";
import TodoListDemo from "@/examples/todo-list-demo";
import TwitterPostDemo from "@/examples/twitter-post-demo";
import YoutubeEmbedDemo from "@/examples/youtube-embed-demo";

const demos = {
  "address-form": AddressFormDemo,
  "article-preview": ArticlePreviewDemo,
  "delivery-status": DeliveryStatusDemo,
  "email-input": EmailInputDemo,
  "event-confirmation": EventConfirmationDemo,
  "instagram-post": InstagramPostDemo,
  "order-confirm": OrderConfirmDemo,
  "order-status": OrderStatusDemo,
  "order-timeline": OrderTimelineDemo,
  "pay-confirm": PayConfirmDemo,
  "payment-method-select": PaymentMethodSelectDemo,
  "phone-input": PhoneInputDemo,
  "product-list": ProductListDemo,
  "rating-card": RatingCardDemo,
  "refund-status": RefundStatusDemo,
  "seat-selector": SeatSelectorDemo,
  "testimonial-card": TestimonialCardDemo,
  "ticket-tier-select": TicketTierSelectDemo,
  "todo-list": TodoListDemo,
  "twitter-post": TwitterPostDemo,
  "youtube-embed": YoutubeEmbedDemo,
} as const;

export const ComponentPreview = ({
  name,
  src,
  title,
  children,
}: {
  name?: string;
  src?: string;
  title?: string;
  children?: ReactNode;
}) => {
  const Demo = name ? demos[name as keyof typeof demos] : undefined;

  return (
    <>
      {children || Demo ? (
        <ComponentPreviewFrame>
          {children ?? (Demo ? <Demo /> : null)}
        </ComponentPreviewFrame>
      ) : null}
      <ComponentSource name={name} src={src} title={title} />
    </>
  );
};
