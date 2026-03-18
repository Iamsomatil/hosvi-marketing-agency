export type SmsPermissions = {
  allowMarketingSms: boolean;
  allowServiceRelatedSms: boolean;
  allowAnySms: boolean;
};

export function getSmsPermissions({
  smsMarketingConsent,
  smsNonMarketingConsent,
}: {
  smsMarketingConsent: boolean;
  smsNonMarketingConsent: boolean;
}): SmsPermissions {
  const allowMarketingSms = smsMarketingConsent === true;
  const allowServiceRelatedSms = smsNonMarketingConsent === true;

  return {
    allowMarketingSms,
    allowServiceRelatedSms,
    allowAnySms: allowMarketingSms || allowServiceRelatedSms,
  };
}

export async function sendAllowedSmsMessages({
  phone,
  permissions,
}: {
  phone: string;
  permissions: SmsPermissions;
}) {
  if (!phone || !permissions.allowAnySms) {
    return {
      marketingSent: false,
      serviceRelatedSent: false,
      skipped: true,
      reason: "No SMS may be sent for this submission.",
    };
  }

  return {
    marketingSent: false,
    serviceRelatedSent: false,
    skipped: true,
    reason: "No SMS provider is configured in this application.",
  };
}
