import { Button } from "@/components/ui";
import { Download } from "lucide-react";
import { downloadXLSFile } from "../api";

type DownloadButtonProps = {
  url: string;
  className?: string;
};

export const DownloadButton = ({ url, className }: DownloadButtonProps) => {
  const name = url.split("/").pop();

  const handleDownload = () => {
    downloadXLSFile(url, name);
  };

  return (
    <Button
      onClick={handleDownload}
      variant={"outline"}
      size={"default"}
      className={className}
    >
      <Download />
      <span>გადმოწერე CSV</span>
    </Button>
  );
};
