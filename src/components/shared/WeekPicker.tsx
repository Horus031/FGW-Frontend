import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '../ui/select'
import type { Weeks } from '../../hooks/useWeeksInYear'

type WeekPickerProps = {
  weeksInYear?: Weeks[]
  selectedWeek?: Weeks | null
  handleWeekChange?: (value: string) => void
  renderWeeks?: () => React.ReactNode
  onPrevious?: () => void
  onNext?: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
}

const WeekPicker = (props: WeekPickerProps) => {
  const {
    selectedWeek,
    handleWeekChange,
    renderWeeks,
    onPrevious,
    onNext,
    canGoPrevious = true,
    canGoNext = true
  } = props;

  const handlePrevious = () => {
    if (onPrevious && canGoPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext && canGoNext) {
      onNext();
    }
  };

  return (
    <div className="flex border border-black/30 rounded-md">
      <Button
        className="rounded-r-none bg-white hover:bg-black/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={!canGoPrevious}
      >
        <ChevronLeft style={{ color: "var(--color-primary)" }} />

      </Button>

      <Select
        value={
          selectedWeek
            ? JSON.stringify({
              start: selectedWeek.start,
              end: selectedWeek.end,
            })
            : undefined
        }
        onValueChange={handleWeekChange}
      >
        <SelectTrigger
          noIcon
          className="rounded-none border-y-0 hover:bg-black/10 cursor-pointer border-black/30"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="-left-5">
          <SelectGroup className="text-center">{renderWeeks?.()}</SelectGroup>
        </SelectContent>
      </Select>

      <Button
        className="rounded-l-none bg-white hover:bg-black/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={!canGoNext}
      >
        <ChevronRight style={{ color: "var(--color-primary)" }} />

      </Button>
    </div>
  )
}

export default WeekPicker