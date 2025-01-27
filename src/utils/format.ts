import { format } from "date-fns";
import { ka } from "date-fns/locale";
import "dayjs/locale/en"; // import default locale as fallback
import "dayjs/locale/ka"; // Georgian locale example

// Helper function to format date based on HTML lang attribute
export const formatDate = (
  date: string | Date,
  pattern: string = "d MMM y",
) => {
  // Get locale from the <html> lang attribute
  const locale = ka;

  // Format the date
  const formattedDate = format(date, pattern, { locale });

  // Return the formatted date
  return formattedDate;
};

export const formatCurrency = (price: number) => {
  const locale = document.documentElement.lang;

  const localeToCurrency: { [key: string]: string } = {
    "ka-GE": "GEL",
    "en-US": "USD",
    "ru-RU": "RUB",
  };

  const currency =
    localeToCurrency[locale as keyof typeof localeToCurrency] ?? "GEL";

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

  const formattedPrice = formatter.format(price);

  if (locale === "ka-GE") return formattedPrice.replace("GEL", "₾");

  return formattedPrice;
};

export const formatNumber = (phone: string): string => {
  const cleaned = phone.replace(/[^\d+]/g, ""); // Remove non-numeric characters except "+"

  // Mobile numbers with and without country code
  if (/^\+9955\d{8}$/.test(cleaned)) {
    return cleaned.replace(
      /^\+995(5\d{2})(\d{2})(\d{2})(\d{2})$/,
      "+995 $1 $2 $3 $4",
    );
  } else if (/^5\d{8}$/.test(cleaned)) {
    return cleaned.replace(/^(5\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4");
  }

  // Landline numbers with and without country code
  else if (/^\+9950322\d{6}$/.test(cleaned)) {
    return cleaned.replace(
      /^\+995(0322)(\d{2})(\d{2})(\d{2})$/,
      "+995 $1 $2 $3 $4",
    );
  } else if (/^0322\d{6}$/.test(cleaned)) {
    return cleaned.replace(/^(0322)(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4");
  }

  // Local landline numbers without country code
  else if (/^2\d{6}$/.test(cleaned)) {
    return cleaned.replace(/^(2\d{2})(\d{2})(\d{2})$/, "$1 $2 $3");
  }

  // If no pattern matches, return original input (can add further validation)
  return phone;
};
