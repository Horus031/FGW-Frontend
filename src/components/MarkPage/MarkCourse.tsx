import { Badge } from "../ui/badge"

const MarkCourse = () => {
  return (
    <div className="flex gap-3 px-4 py-6 bg-white border-1 border-black rounded-lg cursor-pointer active:scale-98">
      <div className="flex flex-col flex-1">
        <span className="font-medium text-base text-gray-400">TDS1502</span>
        <span className="font-semibold text-xl text-primary">Design Research Project</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-base">0/100</span>
        <Badge className="bg-approve">Passed</Badge>
      </div>
    </div>
  )
}

export default MarkCourse
