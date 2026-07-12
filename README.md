# mcpcn

Composition-first React blocks for [MCP Apps](https://modelcontextprotocol.io/), distributed as a shadcn-compatible registry.

The shared UI primitives use [Base UI](https://base-ui.com/) as their accessible, unstyled foundation.

mcpcn starts from the visual language and responsive JSX patterns of [Manifest UI](https://github.com/mnfst/manifest-ui), then turns fixed widgets into compound components. Factual data stays close to the subcomponent that renders it, shared behavior flows through context, and replaceable interface elements are expressed as children.

## Why compound components?

An MCP App rarely knows every interface requirement ahead of time. A fixed `data` and `actions` object can expose only the extension points its author predicted. Compound components keep the useful default design while letting consumers rearrange, omit, or extend any section with ordinary JSX.

```tsx
<EventConfirmation
  onViewTickets={() => openTickets()}
  onFollowOrganizer={() => followOrganizer()}
  onShare={(platform) => share(platform)}
>
  <EventConfirmation.Header orderNumber="#14040333743" />
  <EventConfirmation.Details
    eventTitle="A night under the stars"
    ticketCount={2}
    recipientEmail="hello@example.com"
    eventDate="Friday, Feb 6 · 8pm"
    eventLocation="Los Angeles, CA"
  />
  <EventConfirmation.Organizer name="Manifest Events">
    <VerifiedBadge />
  </EventConfirmation.Organizer>
  <EventConfirmation.Share>
    <MyShareMenu />
  </EventConfirmation.Share>
</EventConfirmation>
```

Each root owns a typed provider. Subcomponents consume shared callbacks and formatting automatically, throw a clear error when used outside their root, accept `className`, and accept arbitrary children. Passing no children renders a polished quick-start composition.

## Registry

The registry contains 21 blocks across payment, events, social, form, blogging, list, status, and miscellaneous categories. Browse their source in [`registry`](./registry) and both quick-start and composed examples in [`examples`](./examples).

Install a block from a deployed registry:

```bash
npx shadcn@latest add https://mcpcn.dev/r/event-confirmation.json
```

## Development

```bash
pnpm install
pnpm typecheck
pnpm registry:build
pnpm dev
```

Run `pnpm build` for the full registry and Next.js production build.

## Design rules

- Preserve a single responsive JSX tree; do not duplicate mobile and desktop markup.
- Use props for factual values, context for shared behavior, and children for replaceable UI.
- Prefer optional callbacks so blocks remain useful in read-only previews.
- Merge `className` with `cn()` and use Tailwind core utilities plus semantic color variables.
- Keep every compound subcomponent inside its root provider.

## License

[MIT](./LICENSE)
