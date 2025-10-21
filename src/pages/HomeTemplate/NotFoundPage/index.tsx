const NotFoundPage = () => {
  return (
    <div className="space-y-4.5 h-full">
      <img src="/images/GreenwichLogo.svg" height={900} className="relative top-1/2 left-0 bg-no-repeat opacity-25 bg-contain size-96 m-auto"/>
      <p className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-5xl whitespace-nowrap text-gray-900">
        Page Not Found
      </p>

      <div className="w-fit mx-auto">
        <span className="font-medium text-2xl">Call the support if needed</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
