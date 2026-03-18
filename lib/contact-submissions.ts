import { mkdir, appendFile } from "fs/promises";
import path from "path";

export type ContactSubmissionRecord = {
  name: string;
  email: string;
  phone: string;
  message: string;
  smsMarketingConsent: boolean;
  smsNonMarketingConsent: boolean;
  timestamp: string;
  sourceUrl: string;
  ipAddress: string;
  userAgent: string;
  company?: string;
};

const CONTACT_SUBMISSIONS_DIR = path.join(process.cwd(), "data");
const CONTACT_SUBMISSIONS_FILE = path.join(
  CONTACT_SUBMISSIONS_DIR,
  "contact-submissions.jsonl"
);

export async function storeContactSubmission(
  record: ContactSubmissionRecord
) {
  await mkdir(CONTACT_SUBMISSIONS_DIR, { recursive: true });
  await appendFile(
    CONTACT_SUBMISSIONS_FILE,
    `${JSON.stringify(record)}\n`,
    "utf8"
  );
}
