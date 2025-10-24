import PageTitle from "../../../components/shared/PageTitle";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-32">
      <PageTitle breadcrumb="Not Found" />
      <div className=" text-primary flex justify-center items-center h-full text-center">
        <div className="h-full my-auto w-xl">
          <h2 className="text-9xl text-secondary/20 font-medium">404</h2>
          <div className="space-y-2 flex flex-col items-center justify-center">
            <span className="font-semibold text-2xl">Page Not Found</span>
            <p>
              Oops! The page you're looking for doesn't exist. It may have been
              moved or deleted, or you may have entered an incorrect URL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
