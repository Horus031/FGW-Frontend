const RegistrationAndFeedback = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        {/* Registration Section */}
        <div>
          <h5 className="font-semibold mb-2 text-primary text-2xl">
            Registration
          </h5>
          <div className="w-full h-1 bg-[#3ABFF0] mb-4"></div>
          <div className="space-y-3">
            <button className="hover:opacity-50  cursor-pointer block text-blue-600 hover:text-blue-700 transition-colors text-left">
              Course Re-registration
            </button>
            <button className="hover:opacity-50  cursor-pointer block text-blue-600 hover:text-blue-700 transition-colors text-left">
              Document Requests
            </button>
            <button className="hover:opacity-50  cursor-pointer block text-blue-600 hover:text-blue-700 transition-colors text-left">
              Student Status Verification
            </button>
            <button className="hover:opacity-50  cursor-pointer block text-blue-600 hover:text-blue-700 transition-colors text-left">
              View My Requests
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <div>
          <h5
            className="font-semibold mb-2 text-primary text-2xl"
          >
            Feedback
          </h5>
          <div className="w-full h-1 bg-[#3ABFF0] mb-4"></div>
          <div className="space-y-3">
            <button className="hover:opacity-50  cursor-pointer block text-blue-600 hover:text-blue-700 transition-colors text-left">
              Feedback on teaching quality
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAndFeedback;
