import { AxiosRequestConfig } from "axios";

import { api, handleAxiosError } from "@/lib";
import { toast } from "sonner";

export const downloadXLSFile = async (
  url: string,
  name: string | undefined,
) => {
  const headers = { "Content-Type": "blob" };
  const config: AxiosRequestConfig = {
    method: "GET",
    url: url,
    responseType: "arraybuffer",
    headers,
  };

  try {
    const response = await api(config);

    if (response.status === 204) {
      toast.message("მონაცემები გადმოსაწერად არ მოიძებნა");
      return null;
    }

    const outputFileName = name + ".xlsx";

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", outputFileName);
    document.body.appendChild(link);
    link.click();

    // Clean up the URL object after the download
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};
