import { WhatsappError } from "../Error";
import PHONENUMBER_MCC from "@whiskeysockets/baileys";

const isPhoneNumberValidCountry = (phone: string) => {
  return Object.keys(PHONENUMBER_MCC).some((key) => {
    return phone.startsWith(key);
  });
};

export const phoneToJid = ({
  to,
  isGroup = false,
}: {
  to: string | number;
  isGroup?: boolean;
}): string => {
  if (!to) throw new WhatsappError('parameter "to" is required');
  let number = to.toString();
  if (isGroup) {
    // Remove minus [-], karena ada beberapa group ID menggunakan tanda minus : 23321xxx-232xxx@g.us
    number = number.replace(/\s|[+]/gim, "");
    if (!number.includes("@g.us")) number = number + "@g.us";
  } else {
    number = number.replace(/\s|[+]|[-]/gim, "");
    if (!number.includes("@s.whatsapp.net"))
      number = number + "@s.whatsapp.net";
  }

  return number;
};
