import { Montserrat, Montserrat_Alternates } from "next/font/google";

// Heading, button label and language text (Figma: Montserrat 700).
// Vietnamese subset is required for the page copy (e.g. "Bắt đầu hành trình").
export const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  display: "swap",
});

// Footer copyright line (Figma: Montserrat Alternates 700).
export const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  display: "swap",
});
