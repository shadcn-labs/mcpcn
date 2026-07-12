// Demo data for List category components
// This file contains sample data used for component previews and documentation

import type { Product } from "../types";

// Default products for ProductList
export const demoProducts: Product[] = [
  {
    badge: "New",
    description: "Nike",
    image: "https://ui.manifest.build/demo/shoe-1.png",
    inStock: true,
    name: "Air Force 1 '07",
    price: 119,
    rating: 4.9,
  },
  {
    description: "Nike",
    image: "https://ui.manifest.build/demo/shoe-2.png",
    inStock: true,
    name: "Air Max 90",
    price: 140,
    rating: 4.8,
  },
  {
    badge: "-10%",
    description: "Nike",
    image: "https://ui.manifest.build/demo/shoe-4.png",
    inStock: true,
    name: "Air Max Plus",
    originalPrice: 190,
    price: 170,
    rating: 4.7,
  },
  {
    description: "Nike",
    image: "https://ui.manifest.build/demo/shoe-3.png",
    inStock: true,
    name: "Dunk Low",
    price: 115,
    rating: 4.6,
  },
  {
    description: "Nike",
    image: "https://ui.manifest.build/demo/shoe-1.png",
    inStock: true,
    name: "Jordan 1 Low",
    price: 135,
    rating: 4.8,
  },
  {
    description: "Nike",
    image: "https://ui.manifest.build/demo/shoe-2.png",
    inStock: true,
    name: "Blazer Mid",
    price: 105,
    rating: 4.5,
  },
];

// Table columns
export const demoTableColumns = [
  { accessor: "name", header: "Name" },
  { accessor: "email", header: "Email" },
  { accessor: "status", header: "Status" },
];

// Table rows
export const demoTableRows = [
  { email: "john@example.com", name: "John Doe", status: "Active" },
  { email: "jane@example.com", name: "Jane Smith", status: "Pending" },
  { email: "bob@example.com", name: "Bob Johnson", status: "Active" },
];

// Table variant: API Usage (default)
export const demoApiUsageColumns = [
  { accessor: "model", header: "Model", sortable: true },
  {
    accessor: "totalTokens",
    align: "right" as const,
    header: "Total Tokens",
    sortable: true,
  },
];

export const demoApiUsageRows = [
  { model: "gpt-5", totalTokens: 2_267_482 },
  { model: "claude-3.5-sonnet", totalTokens: 647_528 },
  { model: "gemini-pro", totalTokens: 428_190 },
  { model: "llama-3", totalTokens: 312_475 },
];

// Table variant: Models (single select)
export const demoModelsColumns = [
  { accessor: "model", header: "Model", sortable: true },
  { accessor: "provider", header: "Provider", sortable: true },
  {
    accessor: "contextWindow",
    align: "right" as const,
    header: "Context Window",
    sortable: true,
  },
];

export const demoModelsRows = [
  { contextWindow: "128K", model: "GPT-5", provider: "OpenAI" },
  { contextWindow: "200K", model: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { contextWindow: "1M", model: "Gemini Pro", provider: "Google" },
  { contextWindow: "128K", model: "Llama 3", provider: "Meta" },
];

// Table variant: Export Data (multi select)
export const demoExportColumns = [
  { accessor: "date", header: "Date", sortable: true },
  { accessor: "event", header: "Event", sortable: true },
  {
    accessor: "users",
    align: "right" as const,
    header: "Users",
    sortable: true,
  },
];

export const demoExportRows = [
  { date: "2025-01-15", event: "Page View", users: 1243 },
  { date: "2025-01-15", event: "Sign Up", users: 87 },
  { date: "2025-01-14", event: "Page View", users: 1105 },
  { date: "2025-01-14", event: "Purchase", users: 42 },
];
