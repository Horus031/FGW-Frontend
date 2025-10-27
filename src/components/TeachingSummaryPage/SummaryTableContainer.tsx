import MainSummaryTable from "./MainSummaryTable"
import SubTableDetails from "./SubTableDetails"

const SummaryTableContainer = () => {
  return (
    <div className="flex flex-col gap-10">
        <SubTableDetails/>

        <MainSummaryTable/>
    </div>
  )
}

export default SummaryTableContainer
