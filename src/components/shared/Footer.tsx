const Footer = () => {
  return (
    <div className="py-5 border-t-1 border-gray-300 text-primary">
      <div className="px-20 mx-auto max-w-[calc(100%-160px)] md:max-w-screen-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 text-sm">
            <span>
              <span className="font-semibold">
                For any comments or questions, please contact:
              </span>{" "}
              Greenwich Viet Nam, Ho Chi Minh campus
            </span>
            <span>Address: 20 Cong Hoa , Bay Ho Ward, Ho Chi Minh City</span>
          </div>

          <div className="text-sm flex items-center gap-15">
            <div className="">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">
                  Training & Operation Office
                </span>

                <div className="flex flex-col gap-1">
                  <span>Email: acad.gre.hcm@fe.edu.vn</span>
                  <span>Hotline: 028.7300.6622 (press 3)</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">
                  Finance Office
                </span>

                <div className="flex flex-col gap-1">
                  <span>Email: ctsvfgwhcm@fe.edu.vn</span>
                  <span>Hotline: 028.7300.6622 (press 5)</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">
                  Student Front Office:
                </span>

                <div className="flex flex-col gap-1">
                  <span>Email: ctsvfgwhcm@fe.edu.vn</span>
                  <span>Hotline: 028.7300.6622 (press 0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xs text-center text-gray-400">
          &copy; Powered by{" "}
          <span className="text-blue-500 underline">Greenwich Vietnam</span> |{" "}
          <span className="text-blue-500 underline">CMS</span>{" "}
        </h3>
      </div>
    </div>
  );
};

export default Footer;
