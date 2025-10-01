
import {  ArrowRight } from 'lucide-react';

      const newsItems = [
        {
          id: 1,
          title: '[PRE-GRADUATION PHOTOSHOOT] - 1 DAY TO GO',
          author: 'Ha Noi Campus',
          date: '04/01/2025',
          image: '/api/placeholder/80/80'
        },
        {
          id: 2,
          title: 'TẤN XUÂN HỘI 2025: #GreenWithU - CELEBRATING A GREEN, PEACEFUL TET WITH GREENWICH VIETNAM',
          author: 'Ho Chi Minh Campus',
          date: '04/01/2025',
          image: '/api/placeholder/80/80'
        },
        {
          id: 3,
          title: 'TET IS COMING, SO LET\'S TAKE GRADUATION PHOTOS',
          author: 'Can Tho Campus',
          date: '18/01/2025 19:01:2025',
          image: '/api/placeholder/80/80'
        },
        {
          id: 4,
          title: 'CAPTURE YOUR GRADUATION MEMORIES WITH GREENWICH STUDENTS',
          author: 'Ho Chi Minh Campus',
          date: '04/01/2025',
          image: '/api/placeholder/80/80'
        }
      ];



const HomePage = () => {
  return (
          <div className=" ">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Welcome Text */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-6">Welcome back, Vo Minh Nghia!</h2>
              </div>
              {/* Full Width Carousel */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2x1">
                  <img
                    src="/images/Homepage/Carousel.png"
                    alt="Greenwich University"
                    className="w-full h-96 object-cover object-right"
                  />
                  <div className="absolute"></div>
                </div>
              </div>
              {/* Two Column Grid Below */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* News Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">News</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        See more
                      </button>
                    </div>
                    <div className="space-y-4">
                      {newsItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                              {item.title}
                            </h4>
                            <div className="text-xs text-gray-500">
                              {item.author && <span>{item.author}</span>}
                              {item.date && <span className="ml-2">{item.date}</span>}
                            </div>
                          </div>
                          <img
                            src={item.image}
                            alt=""
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-8">
                  {/* Attendance Section */}
                  <div>
                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button className="text-white p-6 rounded-xl transition-colors flex items-center justify-between group col-span-2" style={{ backgroundColor: '#00033D' }}>
                        <span className="text-lg font-medium">Attendance<br />Report</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button className="bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group">
                        <span className="text-lg font-medium">Mark<br />Report</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        className="bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
                        onClick={() => console.log('Wallet clicked')}
                      >
                        <span className="text-lg font-medium">Wallet</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        className="bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
                        onClick={() => console.log('Room Booking clicked')}
                      >
                        <span className="text-lg font-medium">Room<br />Booking</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        className="bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
                        onClick={() => console.log('See all clicked')}
                      >
                        <span className="text-lg font-medium">See all</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Others Section */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Others</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-gray-200 text-gray-900 p-6 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-between group">
                        <span className="text-lg font-medium">Registration</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button className="bg-gray-200 text-gray-900 p-6 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-between group">
                        <span className="text-lg font-medium">Feedback</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
}

export default HomePage
