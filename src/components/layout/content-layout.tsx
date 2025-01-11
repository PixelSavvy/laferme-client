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
      <div className="mt-6 flex w-full flex-col items-start justify-between gap-8 pl-2">
        {/* Page Title */}
        <div>
          <h1 className="typo-desktop-h4">{title}</h1>
        </div>
        {/* Page Content */}
        <div className="w-full">{children}</div>
      </div>
    </Fragment>
  );
};
