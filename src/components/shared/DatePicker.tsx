import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '../ui/select'
import type { Weeks } from '../../hooks/useWeeksInYear'

type DatePickerProps = {
    weeksInYear?: Weeks[]
    selectedWeek?: Weeks | null
    handleWeekChange?: (value: string) => void;
    renderWeeks?: () => React.ReactNode;
}

const DatePicker = (props: DatePickerProps) => {
    const { selectedWeek, handleWeekChange, renderWeeks } = props
  return (
    <div className="flex border border-black/30 rounded-md">
        <Button className="rounded-r-none bg-white hover:bg-black/10 cursor-pointer">
          <ChevronLeft color="gray" />
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

        <Button className="rounded-l-none bg-white hover:bg-black/10 cursor-pointer">
          <ChevronRight color="gray" />
        </Button>
      </div>
  )
}

export default DatePicker
