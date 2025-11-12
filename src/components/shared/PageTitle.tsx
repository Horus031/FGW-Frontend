import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type PageTitleProps = {
  title?: string;
  breadcrumb: string | string[]; // 👈 accept both
  subtitle?: string;
};

const PageTitle = ({ title, breadcrumb, subtitle }: PageTitleProps) => {
  const navigate = useNavigate();

  // Normalize to an array for easier handling
  const breadcrumbList = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <div className="flex flex-col h-fit">
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home */}
            <BreadcrumbItem onClick={() => navigate("/")}>
              <span className="text-sm flex gap-1 items-center text-primary hover:underline hover:cursor-pointer">
                <Home size={16} /> Home
              </span>
            </BreadcrumbItem>

            {/* Dynamically render the rest */}
            {breadcrumbList.map((item, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span
                    className={`text-sm flex gap-1 items-center capitalize ${index === breadcrumbList.length - 1
                      ? "text-secondary"
                      : "text-primary hover:underline hover:cursor-pointer"
                      }`}
                    onClick={() =>
                      index < breadcrumbList.length - 1
                        ? navigate(`/${item.toLowerCase()}`)
                        : undefined
                    }
                  >
                    {item}
                  </span>
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {title && (
          <div className="space-y-2">
            <h2 className="text-3xl text-primary font-bold capitalize">
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
