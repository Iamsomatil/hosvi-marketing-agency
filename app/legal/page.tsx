export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card-gradient p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy & Terms of Service</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Privacy Policy</h2>
              <div className="prose text-slate-700 space-y-4">
                <p>
                  At Hosvi, we take your privacy seriously. This Privacy Policy describes how we collect, 
                  use, and protect your personal information when you use our lead generation services.
                </p>
                
                <h3 className="text-lg font-semibold text-slate-900">Information We Collect</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Business information (practice name, location, industry)</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900">How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our lead generation services</li>
                  <li>Send you service updates and marketing communications</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900">Data Protection</h3>
                <p>
                  We implement industry-standard security measures to protect your data, including 
                  encryption, secure servers, and regular security audits.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Terms of Service</h2>
              <div className="prose text-slate-700 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Service Agreement</h3>
                <p>
                  By using Hosvi's services, you agree to these terms and conditions. Our lead generation 
                  services are provided on a subscription basis with a 30-day free trial period.
                </p>
                
                <h3 className="text-lg font-semibold text-slate-900">Trial Period</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>30-day free trial with full access to chosen plan features</li>
                  <li>Credit card required for automatic conversion after trial</li>
                  <li>Cancel anytime before day 31 to avoid charges</li>
                  <li>Renewal consultation call scheduled between days 25-27</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900">Pricing</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Basic Plan: $495/month</li>
                  <li>Premium Plan: $995/month</li>
                  <li>Prices subject to change with 30-day notice</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900">Cancellation</h3>
                <p>
                  You may cancel your subscription at any time. Cancellations take effect at the end 
                  of your current billing period.
                </p>
                
                <h3 className="text-lg font-semibold text-slate-900">Limitation of Liability</h3>
                <p>
                  Hosvi provides lead generation services on an "as-is" basis. While we strive for 
                  quality results, we cannot guarantee specific outcomes or lead conversion rates.
                </p>
              </div>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-slate-600 text-center">
              Last updated: January 1, 2025. For questions about these terms, contact us at legal@hosvi.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}