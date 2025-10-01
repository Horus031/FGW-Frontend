import Logo from "../../../public/images/loading/greenwich.svg"; 

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={Logo} alt="Logo" className="w-20 h-20 animate-spin" />
    </div>
  );
};

export default LoadingPage;
