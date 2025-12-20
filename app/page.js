import { Navbar1 } from "../components/Navbar1";
import { Header23 } from "../components/Header23";
import { Layout396 } from "../components/Layout396";
import { Logo3 } from "../components/Logo3";
import { Layout29 } from "../components/Layout29";
import { Layout442 } from "../components/Layout442";
import { BlogCarousel } from "../components/blocks/BlogCarousel";
import { Cta7 } from "../components/Cta7";
import { Footer1 } from "../components/Footer1";
import { ContactFormWizard, IntegrationBuilderInline } from "../components/blocks";
import { getAllPosts } from "../lib/posts";

export const revalidate = 3600; // Revalidera varje timme

export default async function Page() {
  // Hämta senaste blogginlägg från AITable
  const posts = await getAllPosts({ limit: 6 });

  return (
    <div>
      <Navbar1 />
      <Header23 />
      <Layout396 />
      <Logo3 />
      <IntegrationBuilderInline />
      <Layout29 />
      <Layout442 />

      <ContactFormWizard />

      <BlogCarousel
        posts={posts}
        title="Senaste insikter och trender"
        badge="Blogg och artiklar"
      />
      <Cta7 />
      <Footer1 />
    </div>
  );
}
