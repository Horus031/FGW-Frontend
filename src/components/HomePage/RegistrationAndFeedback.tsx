import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/user";
const RegistrationAndFeedback = () => {
  const { user } = useUserStore();
  return (
    <div>
      {user?.role?.name === "Student" ? (
        // Student Layout
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-semibold pt-6 pb-3 text-primary text-3xl">
              Registration
            </h5>
            <div className="w-full h-1 bg-[#3ABFF0] mb-4"></div>
            <div className="text-secondary font-medium text-xl">
              <button className="hover:opacity-50  cursor-pointer block  hover:text-secondary/80 transition-colors text-left py-2 justify-center items-center">
                Course Re-registration
              </button>
              <NavLink
                to="/request/document"
                className="hover:opacity-50  cursor-pointer block hover:text-secondary/80 transition-colors text-left py-2 justify-center items-center"
              >
                Document Requests
              </NavLink>
              <NavLink
                to="/request/verification"
                className="hover:opacity-50  cursor-pointer block hover:text-secondary/80 transition-colors text-left py-2 justify-center items-center"
              >
                Student Status Verification
              </NavLink>
              <NavLink
                to="/req-status"
                className="hover:opacity-50  cursor-pointer block hover:text-secondary/80 transition-colors text-left py-2 justify-center items-center"
              >
                View My Requests
              </NavLink>
            </div>
          </div>

          <div>
            <h5 className="font-semibold pt-6 pb-3 text-primary text-3xl">
              Feedback
            </h5>
            <div className="w-full h-1 bg-[#3ABFF0] mb-4"></div>
            <div className="font-medium text-xl">
              <NavLink
                to="/feedback"
                className="hover:opacity-50  cursor-pointer block text-secondary hover:text-secondary/80 transition-colors text-left"
              >
                Feedback on teaching quality
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        // Teacher Layout
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-semibold pt-6 pb-3 text-primary text-3xl">
              Registration
            </h5>
            <div className="w-full h-1 bg-[#3ABFF0] mb-4"></div>
            <div className="text-secondary font-medium text-xl">
              <NavLink to="/booking" className="hover:opacity-50  cursor-pointer block  hover:text-secondary/80 transition-colors text-left">
                Room Booking
              </NavLink>
            </div>
          </div>

          <div>
            <h5 className="font-semibold pt-6 pb-3 text-primary text-3xl">
              Feedback
            </h5>
            <div className="w-full h-1 bg-[#3ABFF0] mb-4"></div>
            <div className="font-medium text-xl">
              <NavLink
                to="/feedback"
                className="hover:opacity-50  cursor-pointer block text-secondary hover:text-secondary/80 transition-colors text-left"
              >
                View student's feedback for teaching activity
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationAndFeedback;
