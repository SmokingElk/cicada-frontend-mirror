import RhombusDecor from '@/components/(shared)/common/rhombusDecor'

interface Props {
	rating: number
}

export default function LobbyRating({rating}: Props) {
	const display = rating > 999 ? '1k+' : rating

	return (
		<div className="flex flex-row items-center gap-4">
      <span className="font-montserrat text-2xl mr-2 font-semibold">
        Ваш рейтинг:
      </span>

			<div className="relative w-16 h-16">
				<RhombusDecor className="w-full h-full border-4 border-primary bg-background rotate-45"/>
				<span
					className="absolute inset-0 flex items-center justify-center text-foreground font-montserrat font-bold text-2xl">
          {display}
        </span>
			</div>
		</div>
	)
}
