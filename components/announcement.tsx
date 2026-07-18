import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export const Announcement = () => (
  <Badge
    variant="secondary"
    className="bg-transparent"
    render={
      <Link href="https://ui.shadcn.com" target="_blank" rel="noreferrer" />
    }
  >
    <span className="flex size-2 rounded-full bg-blue-500" title="New" />
    Built with shadcn registry <ArrowRightIcon />
  </Badge>
);
