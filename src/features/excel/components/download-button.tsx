import { Button } from "@/components/ui";
import { Download } from "lucide-react";
import { downloadXLSFile } from "../api";

type DownloadButtonProps = {
  url: string;
};

export const DownloadButton = ({ url }: DownloadButtonProps) => {
  const name = url.split("/").pop();

  const handleDownload = () => {
    downloadXLSFile(url, name);
  };
  return (
    <Button onClick={handleDownload} variant={"outline"}>
      <Download />
      <span>გადმოწერა (.xlsx)</span>
    </Button>
  );
};
