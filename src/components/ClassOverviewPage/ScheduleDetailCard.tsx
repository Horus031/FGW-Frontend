
const ScheduleDetailCard = () => {
    return (
        <div className="grid grid-cols-2 gap-27 w-9/12 font-medium text-sm">
            <div className="w-10/12">
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Class</span>
                    <span>TDS1502.1</span>
                </div>
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Instructor</span>
                    <span className="text-secondary">SonND24</span>
                </div>
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Slot & Room</span>
                    <span>3 | F.304</span>
                </div>
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Attendance</span>
                    <span className="text-secondary">Attended</span>
                </div>
            </div>

            <div className="">
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Programe</span>
                    <span>UoG</span>
                </div>
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Course</span>
                    <span>Design Research Project (DESI1219.3)</span>
                </div>
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Booker</span>
                    <span className="text-secondary">daona</span>
                </div>
                <div className="flex w-full items-center justify-between border-b-1 border-gray-300 py-2">
                    <span className="text-gray-400">Booking time</span>
                    <span>Dec 12, 2024 5:12:00 PM</span>
                </div>
            </div>
        </div>
    )
}

export default ScheduleDetailCard