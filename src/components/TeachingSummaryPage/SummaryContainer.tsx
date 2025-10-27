import { majorData } from "../../constants/temp"
import MajorSelectCard from "../shared/MajorSelectCard"
import SummaryTableContainer from "./SummaryTableContainer"

const SummaryContainer = () => {
  return (
    <div>
        <MajorSelectCard isSummary data={majorData}/>
      
        <SummaryTableContainer/>
    </div>
  )
}

export default SummaryContainer
