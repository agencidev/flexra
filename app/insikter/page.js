import { PageLayout } from "../../components/PageLayout";
import { BlogGrid } from "../../components/blocks/BlogGrid";
import { getAllPosts } from "../../lib/posts";

export const metadata = {
  title: "Insikter | Flexra",
  description: "Senaste insikter och trender inom AI och automation. Läs våra artiklar om processautomation, AI-integration och digital transformation."
};

// Revalidera varje timme för att hämta nya inlägg
export const revalidate = 3600;

export default async function InsikterPage() {
  const posts = await getAllPosts();

  return (
    <PageLayout
      title="Senaste insikter och trender inom AI och automation"
      subtitle="Insikter"
    >
      <BlogGrid
        posts={posts}
        columns={3}
        showAuthor={true}
        showDate={true}
        showDescription={true}
        background="white"
      />

      {posts.length === 0 && (
        <section className="px-[5%] py-16 md:py-24">
          <div className="container text-center">
            <p className="text-gray-500">
              Inga inlägg hittades. Kom tillbaka snart för nya insikter!
            </p>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
