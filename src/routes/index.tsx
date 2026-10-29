import { createFileRoute } from "@tanstack/react-router";
import { DungeonSite } from "@/components/dungeon-site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <DungeonSite />;
}
