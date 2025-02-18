import Link from "next/link";
import DecoratedTile from "@/components/(shared)/common/decoratedTile";
import LineSeparator from "@/components/(shared)/common/lineSeparator";

export default function ProfileStats() {
  const moments = [
    { description: "Мат в 7 ходов", href: "/" },
    { description: "Блестящий эндшпиль ", href: "/" },
  ];

  const stats = [
    { title: "Маты", value: 50 },
    { title: "Паты", value: 2 },
    { title: "Поражения матом", value: 10 },
    { title: "Поражения патом", value: 1 },
    { title: "Ничьи", value: 25 },
  ];

  return (
    <div className="flex gap-5">
      <div className="w-full">
        <LineSeparator direction="left" width={100} />

        <div className="font-montserrat font-semibold text-3xl text-foreground mb-9">
          Лучшие моменты партий:
        </div>

        <div className="font-roboto text-xl text-foreground mb-7">
          Всего интересных моментов: {moments.length}
        </div>

        <div className="flex flex-col gap-6">
          {moments.map((e, index) => (
            <Link href={e.href} key={`stats_best_moment_${index}`}>
              <DecoratedTile className="h-20 w-full">
                <div className="h-full flex items-center box-border pl-8 font-main text-background text-xl">
                  {e.description}
                </div>
              </DecoratedTile>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        <LineSeparator direction="left" width={100} />
        <div className="w-2/3 mx-auto">
          <div className="font-montserrat font-semibold text-3xl text-foreground mb-9">
            Статистика игр:
          </div>

          <ul className="list-disc list-inside">
            {stats.map((e, index) => (
              <li
                key={`stats_item_${index}`}
                className="font-roboto text-xl text-foreground mb-2"
              >
                {e.title}: {e.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
