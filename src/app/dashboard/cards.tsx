import { getCardData } from "@/lib/data";
import { auth } from "@clerk/nextjs";
import { Card } from "@nextui-org/react";

export default async function CardWrapper() {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const {
    totalApplications,
    totalApplied,
    totalInterviews,
    totalOffers,
    totalRejected,
  } = await getCardData(userId);
  return (
    <section className="flex flex-row justify-center gap-4 w-100 p-4">
      <StatCards title="Total Applications" stat={totalApplications} />
      <StatCards title="Applied" stat={totalApplied} />
      <StatCards title="Interviewing" stat={totalInterviews} />
      <StatCards title="Offers" stat={totalOffers} />
      <StatCards title="Rejections" stat={totalRejected} />
    </section>
  );
}

export function StatCards({
  title,
  stat,
}: {
  title:
    | "Total Applications"
    | "Applied"
    | "Interviewing"
    | "Offers"
    | "Rejections";
  stat: number;
}) {
  return (
    <Card className="w-[200px] space-y-1 p-4 text-center" radius="lg">
      <h1 className="text-4xl font-bold">{stat}</h1>
      <h2 className="text-xl">{title}</h2>
    </Card>
  );
}