import { Fragment } from "react";
import { Head } from "../seo";

type TContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: TContentLayoutProps) => {
  return (
    <Fragment>
      <Head title={title} />
      <div className="flex w-full flex-col items-start justify-between gap-16 pl-2">
        {/* Page Title */}

        <h1 className="text-2xl font-semibold">{title}</h1>

        {/* Page Content */}
        <div className="w-full">{children}</div>
      </div>
    </Fragment>
  );
};
