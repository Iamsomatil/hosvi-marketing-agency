import { mkdir, appendFile } from "fs/promises";
import os from "os";
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
const FALLBACK_CONTACT_SUBMISSIONS_DIR = path.join(os.tmpdir(), "hosvi");
const CONTACT_SUBMISSIONS_FILE = "contact-submissions.jsonl";

const isReadonlyFilesystemError = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error ? error.code : undefined;
  return code === "EROFS" || code === "EPERM" || code === "EACCES";
};

const appendSubmissionToDir = async (
  directory: string,
  record: ContactSubmissionRecord
) => {
  await mkdir(directory, { recursive: true });
  await appendFile(
    path.join(directory, CONTACT_SUBMISSIONS_FILE),
    `${JSON.stringify(record)}\n`,
    "utf8"
  );
};

export async function storeContactSubmission(
  record: ContactSubmissionRecord
) {
  try {
    await appendSubmissionToDir(CONTACT_SUBMISSIONS_DIR, record);
  } catch (error) {
    if (!isReadonlyFilesystemError(error)) {
      throw error;
    }

    await appendSubmissionToDir(FALLBACK_CONTACT_SUBMISSIONS_DIR, record);
  }
}
