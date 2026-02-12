import React from "react";
import { ShieldCheck } from "lucide-react";

function SectionBadge({ number }: { number: string }) {
    return (
        <span className="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-2.5 py-0.5 text-sm font-bold text-emerald-800 mr-3 shrink-0">
            {number}
        </span>
    );
}

export default function PrivacyPolicyContent() {
    return (
        <div className="space-y-10">
            {/* Header Card */}
            <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                            PRIVACY POLICY
                        </h1>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shrink-0">
                        <ShieldCheck className="h-5 w-5 text-slate-900" />
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="space-y-2 text-sm text-slate-600">
                        <p><span className="font-semibold text-slate-900">O'Shea Systems</span></p>
                        <p>ABN: 90 414 617 370</p>
                        <p>Brunswick, Victoria, Australia</p>
                        <p>Email: <a href="mailto:paddy@osheasystems.com" className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium transition-colors duration-200">paddy@osheasystems.com</a></p>
                        <p className="pt-2"><span className="font-semibold text-slate-900">Effective Date:</span> 12 February 2026</p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-slate-700 leading-relaxed">
                {/* Section 1 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="1" />
                        Introduction
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            O'Shea Systems ("we", "us", "our") is a sole trader business operating in Victoria, Australia.
                        </p>
                        <p>
                            We are committed to protecting your privacy in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
                        </p>
                        <p>
                            This Privacy Policy explains how we collect, use, disclose and store your personal information when you visit osheasystems.com or engage our services.
                        </p>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="2" />
                        What Personal Information We Collect
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>We collect the following types of personal information:</p>

                        <div className="space-y-6 mt-4">
                            <div>
                                <h3 className="text-base font-semibold text-slate-800 mb-2">2.1 Information You Provide</h3>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Business name</li>
                                    <li>Information submitted via booking forms</li>
                                    <li>Information entered into our website calculator</li>
                                    <li>Communications sent to us</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold text-slate-800 mb-2">2.2 Automatically Collected Information</h3>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>IP address</li>
                                    <li>Device and browser information</li>
                                    <li>Website usage data</li>
                                    <li>Cookies and tracking technologies</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold text-slate-800 mb-2">2.3 Client Data (Service Delivery)</h3>
                                <p className="mb-2">Where you become a client, we may store business-related contact data inside:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>GoHighLevel (GHL)</li>
                                    <li>Integrated communication systems (SMS, email automation)</li>
                                </ul>
                            </div>
                        </div>

                        <p className="mt-4 italic text-slate-500">
                            We do not collect sensitive information unless voluntarily provided.
                        </p>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="3" />
                        Call Recording Disclosure (Victoria Compliance)
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            Phone calls may be recorded for quality assurance, training, and service optimisation purposes.
                        </p>
                        <p>
                            By continuing a call after being notified of recording, you consent to the recording in accordance with the <em>Surveillance Devices Act 1999 (Vic)</em>.
                        </p>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="4" />
                        Cookies & Tracking Technologies
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>We use cookies and tracking tools including:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                            {['Google Analytics', 'Meta Pixel', 'LinkedIn Pixel'].map((item) => (
                                <li key={item} className="flex items-center text-sm bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>These tools help us analyse traffic and improve marketing performance.</p>
                        <p>You may disable cookies via your browser settings.</p>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="5" />
                        How We Use Your Information
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>We use personal information to:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>Provide automation and AI services</li>
                            <li>Respond to enquiries</li>
                            <li>Send marketing communications (where you opt in)</li>
                            <li>Improve website performance</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </div>
                </section>

                {/* Section 6 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="6" />
                        Direct Marketing (Spam Act Compliance)
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>We may send marketing emails or SMS only where:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>You have opted in, or</li>
                            <li>You are an existing client and communication relates to similar services.</li>
                        </ul>
                        <p>You may unsubscribe at any time.</p>
                    </div>
                </section>

                {/* Section 7 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="7" />
                        Overseas Disclosure (APP 8 Compliance)
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>We use third-party service providers which may store data overseas, including:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                            {['GoHighLevel (USA)', 'Stripe (USA)', 'Google Workspace (Global infrastructure)'].map((item) => (
                                <li key={item} className="flex items-center text-sm bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>
                            By providing your information, you acknowledge that overseas storage may occur.
                        </p>
                        <p>We take reasonable steps to ensure overseas providers protect data appropriately.</p>
                    </div>
                </section>

                {/* Section 8 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="8" />
                        Data Security
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            We take reasonable technical and organisational measures to protect personal information.
                        </p>
                        <p>
                            However, no online system is completely secure. We cannot guarantee absolute security.
                        </p>
                    </div>
                </section>

                {/* Section 9 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="9" />
                        Access and Correction
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            You may request access to or correction of your personal information by emailing: <a href="mailto:paddy@osheasystems.com" className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium transition-colors duration-200">paddy@osheasystems.com</a>
                        </p>
                        <p>
                            We will respond within a reasonable timeframe.
                        </p>
                    </div>
                </section>

                {/* Section 10 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="10" />
                        Data Retention
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            We retain personal information only as long as reasonably necessary for business or legal purposes.
                        </p>
                    </div>
                </section>

                {/* Section 11 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="11" />
                        Complaints
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            If you believe we have breached the Privacy Act, please contact us first.
                        </p>
                        <p>
                            If unresolved, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
