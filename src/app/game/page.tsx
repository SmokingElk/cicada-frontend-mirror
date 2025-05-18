import { authOptions } from "@/lib/next-auth/nextAuthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import GamePage from "@/components/(shared)/game/gamePage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Game({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  return <GamePage id={id} session={session} />;
}