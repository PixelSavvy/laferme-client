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

      {/* Page Content */}
      <div className="w-full">{children}</div>
    </Fragment>
  );
};
