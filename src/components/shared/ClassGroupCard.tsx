
type ClassGroupProps = {
    data: string[];
}

const ClassGroupCard = (props: ClassGroupProps) => {
    const { data } = props;

    const renderClassGroup = () => {
        return data.map((item) => {
            return (
                <button key={item} className="text-gray-800 font-medium justify-self-start cursor-pointer active:scale-95">{item.trim()}</button>
            )
        })
    }
  return (
    <div className="border-1 border-gray-400 p-6 rounded-lg flex-1 h-55.5">
      <div className="grid text-left grid-cols-4 gap-x-3 gap-y-2 h-full">
        {renderClassGroup()}
      </div>
    </div>
  )
}

export default ClassGroupCard
