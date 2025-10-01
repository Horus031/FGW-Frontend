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

const NewsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: '#00033D', fontSize: '25px' }}>News</h3>
          <button className="cursor-pointer font-semibold hover:opacity-50 transition-opacity" style={{ color: '#005EB8', fontSize: '14px' }}>
            See more
          </button>
        </div>
        <div className="space-y-0">
          {newsItems.map((item, index) => (
            <div key={item.id} className={`flex gap-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${index < newsItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  {item.author && <span className="font-semibold" style={{ color: '#005EB8', fontSize: '14px' }}>{item.author}</span>}
                </div>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2 min-w-0">
                  {item.date && <span className="flex-shrink-0">{item.date}</span>}
                  <span className="flex-shrink-0">•</span>
                  <h4 className="font-semibold text-sm truncate flex-1 min-w-0">
                    {item.title}
                  </h4>
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
  );
};

export default NewsSection;