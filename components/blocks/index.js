/**
 * Block-komponenter
 *
 * Återanvändbara sektioner som kan importeras på flera sidor.
 * Alla block följer samma mönster med konfigurerbara props och sensible defaults.
 *
 * @example
 * // Importera enskild komponent
 * import { FAQ } from "@/components/blocks";
 *
 * // Eller importera flera
 * import { FAQ, ContactForm, Testimonials } from "@/components/blocks";
 */

// FAQ Section
export { FAQ } from "./FAQ";

// Blog Sections
export { BlogGrid } from "./BlogGrid";
export { BlogCarousel } from "./BlogCarousel";
export { BlogListWithSearch } from "./BlogListWithSearch";

// Contact Forms
export { ContactForm } from "./ContactForm";
export { ContactFormWizard } from "./ContactFormWizard";

// Planerade komponenter (uncomment när de skapas):
// export { Testimonials } from "./Testimonials";
// export { Stats } from "./Stats";
// export { CTA } from "./CTA";
// export { PricingTable } from "./PricingTable";
// export { Team } from "./Team";
// export { LogoCloud } from "./LogoCloud";
// export { Newsletter } from "./Newsletter";
