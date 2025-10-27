import { useUserStore } from "../../store/user";


const WelcomeSection = () => {
  const { user } = useUserStore();

  return (
    <div className="mx-auto">
      <h2 className="text-3xl font-bold mb-6">Welcome back, {user?.fullName}!</h2>
    </div>
  );
};

export default WelcomeSection;