import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  FileText,
  Info,
  Cookie,
  ArrowLeft,
  CheckCircle,
  Copy,
  Check,
  Lock,
  ExternalLink,
  Send,
  AlertCircle
} from 'lucide-react';

export type PolicyPageType = 'privacy' | 'terms' | 'about' | 'contact' | 'cookies';

interface PolicyPagesProps {
  page: PolicyPageType;
  onNavigateHome: () => void;
  onNavigatePage: (page: PolicyPageType) => void;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({
  page,
  onNavigateHome,
  onNavigatePage,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const supportEmail = 'support.jpgconverter@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-neutral-900 dark:text-neutral-100">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to JPG Converter</span>
        </button>

        {/* Policy & Documentation Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {[
            { id: 'about', label: 'About Us' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms' },
            { id: 'cookies', label: 'Cookies' },
            { id: 'contact', label: 'Contact Us' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigatePage(item.id as PolicyPageType)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                page === item.id
                  ? 'bg-red-600 text-white font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ABOUT US PAGE */}
      {page === 'about' && (
        <article className="space-y-6 leading-relaxed">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>About JPGConverterTool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
              About JPGConverterTool
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
              Built for privacy, speed, and standard-compliant image conversions — right in your browser.
            </p>
          </header>

          <div className="p-4 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm space-y-1">
            <span className="font-semibold block text-emerald-800 dark:text-emerald-200">Our Core Privacy Commitment</span>
            <p>
              Unlike conventional converters that upload your confidential files to remote servers, JPGConverterTool executes 100% locally in your web browser. Your images and documents never leave your computer or phone.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Our Mission</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Every day, millions of people need to convert photos for passport applications, government forms, job portals, school submissions, and web publishing. Most online tools force users to upload sensitive personal documents to third-party cloud servers, impose restrictive 10-file daily quotas, hide paywalls, or alter colors.
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              JPGConverterTool was created to offer a better way: a completely free, lightning-fast utility that processes everything locally using modern client-side web technologies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">How Our Tool Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-900 dark:text-white block">Instant On-Device Processing</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Converts pictures instantly using your device's built-in speed, preserving true colors and sharp photo details without distortion.
                </p>
              </div>
              <div className="p-3.5 rounded bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-900 dark:text-white block">Modern Photo Support</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Easily opens and converts modern camera formats including Apple iPhone HEIC and AVIF photos directly on your phone or computer.
                </p>
              </div>
              <div className="p-3.5 rounded bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-900 dark:text-white block">Smooth Batch Conversions</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Converts multi-file queues smoothly one by one to keep your phone running fast without freezing or crashing.
                </p>
              </div>
              <div className="p-3.5 rounded bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-900 dark:text-white block">Standard Universally Accepted JPG</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Produces authentic JPG files guaranteed to be accepted by visa applications, government forms, job portals, and school systems.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Development &amp; Team</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              JPGConverterTool is designed, built, and maintained by our{' '}
              <a
                href="https://www.linkedin.com/in/wordpress-seo-specialist-abhi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 dark:text-red-400 font-semibold hover:underline"
              >
                developer
              </a>{' '}
              with a commitment to privacy, open web standards, and high-speed in-browser conversion utilities.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Contact &amp; Inquiries</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              For support, feature suggestions, or questions, contact our team directly at{' '}
              <a href={`mailto:${supportEmail}`} className="text-red-600 dark:text-red-400 font-mono font-semibold hover:underline">
                {supportEmail}
              </a>.
            </p>
          </section>
        </article>
      )}

      {/* 2. PRIVACY POLICY (MANDATORY GOOGLE ADSENSE COMPLIANCE) */}
      {page === 'privacy' && (
        <article className="space-y-6 leading-relaxed">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Legal Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-neutral-500 font-mono">
              Last Updated: October 24, 2026 · Effective Immediately
            </p>
          </header>

          <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
            <p className="font-semibold text-neutral-900 dark:text-white">
              Summary for Users:
            </p>
            <p>
              JPGConverterTool is designed with a <strong>Zero-Server-Upload Architecture</strong>. When you select or drop images and documents into our converter, they are processed solely within your browser’s memory. We do not transmit, copy, log, or store your photos or documents on any server.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">1. Information We Do NOT Collect</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              We never collect, transmit, or store:
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Your uploaded images, photos, videos, or documents.</li>
              <li>EXIF or GPS location metadata from your photos (you can also strip EXIF in our tool).</li>
              <li>Names, biometric data, or face data contained in photos.</li>
              <li>Personal accounts, passwords, or credit card information.</li>
            </ul>
          </section>

          {/* MANDATORY GOOGLE ADSENSE DISCLOSURE SECTION */}
          <section className="space-y-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-500" />
              <span>2. Advertising &amp; Third-Party Cookies (Google AdSense Policy Disclosure)</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              To keep JPGConverterTool 100% free for everyone without subscription fees, we may display advertising from third-party networks, including <strong>Google AdSense</strong>.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 pl-2 border-l-2 border-neutral-300 dark:border-neutral-700">
              <p>
                <strong>Google AdSense &amp; DoubleClick Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites across the Internet.
              </p>
              <p>
                <strong>Personalized Advertising:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and other sites on the Internet.
              </p>
              <p>
                <strong>Opt-Out Options:</strong> Users may opt out of personalized advertising at any time by visiting{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 dark:text-red-400 underline font-medium inline-flex items-center gap-0.5"
                >
                  Google Ads Settings <ExternalLink className="w-3 h-3" />
                </a>.
                Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 dark:text-red-400 underline font-medium inline-flex items-center gap-0.5"
                >
                  AboutAds.info Choices <ExternalLink className="w-3 h-3" />
                </a>{' '}
                or the{' '}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 dark:text-red-400 underline font-medium inline-flex items-center gap-0.5"
                >
                  Network Advertising Initiative (NAI) <ExternalLink className="w-3 h-3" />
                </a>.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">3. Local Browser Storage</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              We use standard browser localStorage only to remember your interface preferences (such as Light/Dark theme mode and your selected language). This information is saved solely on your device and is never shared.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">4. GDPR and CCPA / CPRA Rights</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              Under the European Union General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have rights regarding your personal information. Because our architecture does not transmit or store personal data, we do not sell, rent, or share personal user data with any party.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">5. Children's Online Privacy (COPPA)</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              Our service does not knowingly collect or solicit any personal information from children under the age of 13.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">6. Privacy Inquiries</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              If you have any questions or concerns regarding our privacy practices, please contact our Data Protection Officer at:{' '}
              <a href={`mailto:${supportEmail}`} className="text-red-600 dark:text-red-400 font-mono font-semibold hover:underline">
                {supportEmail}
              </a>.
            </p>
          </section>
        </article>
      )}

      {/* 3. TERMS OF SERVICE */}
      {page === 'terms' && (
        <article className="space-y-6 leading-relaxed">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>User Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-xs text-neutral-500 font-mono">
              Last Updated: October 24, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              By accessing and using JPGConverterTool (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">2. Permissible Use &amp; License</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              JPGConverterTool is provided completely free of charge for both personal and commercial use. You may convert unlimited images, documents, and media files without restriction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">3. Intellectual Property Rights</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              You retain 100% full ownership, copyright, and intellectual property rights to all files you convert using the Service. Because all conversion occurs on your local device, we obtain no license, title, or interest in any of your content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">4. Disclaimer of Warranties</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              The Service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. While we strive for maximum compatibility and accuracy with all image formats, we make no guarantees that conversion will be error-free or uninterrupted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">5. Limitation of Liability</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              In no event shall JPGConverterTool, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of or inability to use this Service.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">6. Questions Regarding Terms</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              For any questions regarding these Terms, contact us at:{' '}
              <a href={`mailto:${supportEmail}`} className="text-red-600 dark:text-red-400 font-mono font-semibold hover:underline">
                {supportEmail}
              </a>.
            </p>
          </section>
        </article>
      )}

      {/* 4. COOKIE POLICY */}
      {page === 'cookies' && (
        <article className="space-y-6 leading-relaxed">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Cookie className="w-4 h-4" />
              <span>Cookie Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
              Cookie &amp; Tracking Policy
            </h1>
            <p className="text-xs text-neutral-500 font-mono">
              Last Updated: October 24, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">What Are Cookies?</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              Cookies are small text files stored on your browser or device by websites you visit. They are widely used to make websites work efficiently, remember user preferences, and provide analytical information to site operators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">Cookies We Use</h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-neutral-900 dark:text-white block">1. Essential Functional Local Storage</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  We use browser local storage to remember your preferred visual theme (Light / Dark mode) and your interface language. These are strictly functional and do not track you across other websites.
                </p>
              </div>

              <div className="p-3.5 rounded bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-neutral-900 dark:text-white block">2. Google AdSense Advertising Cookies</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Google AdSense uses cookies to serve relevant advertisements to users based on their prior visits to this and other websites. These cookies allow Google and its partners to serve ads that match user interests.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">How You Can Manage or Opt-Out of Cookies</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              You can control and disable cookies at any time:
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>
                <strong>Google Personalized Ads Opt-Out:</strong> Visit{' '}
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline font-medium">
                  Google Ads Settings
                </a>.
              </li>
              <li>
                <strong>Industry Opt-Out Tools:</strong> Opt out through the{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline font-medium">
                  Digital Advertising Alliance (AboutAds)
                </a>{' '}
                or the{' '}
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 underline font-medium">
                  Network Advertising Initiative
                </a>.
              </li>
              <li>
                <strong>Browser Settings:</strong> You can configure your browser (Chrome, Safari, Firefox, Edge) to block or delete third-party cookies.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">Contact Us</h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              If you have any questions regarding our use of cookies, contact us at:{' '}
              <a href={`mailto:${supportEmail}`} className="text-red-600 dark:text-red-400 font-mono font-semibold hover:underline">
                {supportEmail}
              </a>.
            </p>
          </section>
        </article>
      )}

      {/* 5. CONTACT US PAGE (WITH EXPLICIT EMAIL: support.jpgconverter@gmail.com) */}
      {page === 'contact' && (
        <article className="space-y-6 leading-relaxed">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
              Contact Us
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
              Have questions, feedback, bug reports, or feature requests? We're here to help.
            </p>
          </header>

          {/* Primary Contact Card */}
          <div className="p-6 rounded-lg bg-neutral-100/80 dark:bg-[#09090b] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Official Support Email</span>
                <div className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-white">
                  {supportEmail}
                </div>
                <p className="text-xs text-neutral-500">
                  Response time: Typically within 24 to 48 business hours.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-colors min-h-[38px]"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                </button>
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-xs transition-colors min-h-[38px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <span className="font-bold text-neutral-900 dark:text-white block">Bug Reports &amp; Errors</span>
              <p className="text-neutral-600 dark:text-neutral-400">
                If a specific image format or batch size fails, please send us the format type, browser version, and error message.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <span className="font-bold text-neutral-900 dark:text-white block">Format &amp; Feature Requests</span>
              <p className="text-neutral-600 dark:text-neutral-400">
                Need a new camera RAW profile, document conversion, or custom size preset? Let us know and we'll add it.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <span className="font-bold text-neutral-900 dark:text-white block">Legal &amp; Privacy Queries</span>
              <p className="text-neutral-600 dark:text-neutral-400">
                For DMCA notifications, privacy audits, or compliance disclosures, write to our designated contact point.
              </p>
            </div>
          </div>

          {/* Direct Feedback Form */}
          <div className="p-6 rounded-lg bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Send Us a Direct Message
            </h2>

            {contactSubmitted ? (
              <div className="p-4 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Thank you for reaching out!</span>
                  <span>We have received your message and will review it promptly at <code className="font-mono">{supportEmail}</code>.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-neutral-600 dark:text-neutral-400 block font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-red-600 min-h-[38px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-neutral-600 dark:text-neutral-400 block font-medium">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-red-600 min-h-[38px]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-600 dark:text-neutral-400 block font-medium">Subject / Category</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-red-600 min-h-[38px]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Format Request">New Format Request</option>
                    <option value="Privacy Question">Privacy Question</option>
                    <option value="Business / AdSense">Business / AdSense Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-600 dark:text-neutral-400 block font-medium">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry, request, or issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-semibold shadow-xs transition-colors min-h-[40px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message to Support</span>
                </button>
              </form>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

