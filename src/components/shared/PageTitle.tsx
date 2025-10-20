import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Home, User } from "lucide-react";

type PageTitleProps = {
  title?: string;
  breadcrumb: string;
  subtitle?: string;
};

const PageTitle = (props: PageTitleProps) => {
  const { title, breadcrumb, subtitle } = props;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-fit">
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem onClick={() => navigate("/")}>
              <span className="text-sm flex gap-1 items-center text-primary hover:underline hover:cursor-pointer">
                <Home size={16} /> Home
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-sm flex gap-1 items-center text-secondary text-capitalize">
                <User size={16} /> {breadcrumb}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {title && (
          <div className="space-y-2">
            <h2 className="text-3xl text-primary font-bold text-capitalize">
              {title}
            </h2>
            {subtitle && <p className="text-gray-400">{subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
