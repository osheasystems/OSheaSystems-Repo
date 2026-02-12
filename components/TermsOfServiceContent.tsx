import React from "react";
import { FileText } from "lucide-react";

function SectionBadge({ number }: { number: string }) {
    return (
        <span className="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-2.5 py-0.5 text-sm font-bold text-emerald-800 mr-3 shrink-0">
            {number}
        </span>
    );
}

function SubItem({ num, children }: { num: string; children: React.ReactNode }) {
    return (
        <div className="flex items-start">
            <span className="font-mono text-emerald-600 font-semibold mr-3 mt-1 text-sm shrink-0">{num}</span>
            <div>{children}</div>
        </div>
    );
}

export default function TermsOfServiceContent() {
    return (
        <div className="space-y-10">
            {/* Header Card */}
            <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                            Terms of Service
                        </h1>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shrink-0">
                        <FileText className="h-5 w-5 text-slate-900" />
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                        <div>
                            <span className="font-semibold text-slate-900 block">Organization</span>
                            O'Shea Systems
                        </div>
                        <div>
                            <span className="font-semibold text-slate-900 block">ABN</span>
                            90 414 617 370
                        </div>
                        <div>
                            <span className="font-semibold text-slate-900 block">Governing Law</span>
                            Victoria, Australia
                        </div>
                        <div>
                            <span className="font-semibold text-slate-900 block">Last Updated</span>
                            October 2025
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-slate-700 leading-relaxed">
                {/* Section 1 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="1" />
                        Acceptance of Terms
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            By accessing or using osheasystems.com, you agree to these Terms of Use.
                        </p>
                        <p className="font-medium text-red-500">
                            If you do not agree, you must not use this website.
                        </p>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="2" />
                        Nature of Services
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <p>
                            O'Shea Systems provides automation, AI workflow configuration, CRM implementation, and communication system optimisation services.
                        </p>
                        <p className="italic text-slate-500">
                            We do not provide legal, financial, or business advice.
                        </p>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="3" />
                        No Revenue Guarantee
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="3.1">
                            <p>We do not guarantee increased revenue, profits, or business growth.</p>
                        </SubItem>
                        <SubItem num="3.2">
                            <p>Lead conversion improvements are performance-based and defined during onboarding.</p>
                        </SubItem>
                        <SubItem num="3.3">
                            <div>
                                <p className="mb-2">Outcomes depend on:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>Client implementation</li>
                                    <li>Sales ability</li>
                                    <li>Market conditions</li>
                                    <li>Third-party systems</li>
                                </ul>
                            </div>
                        </SubItem>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="4" />
                        Third-Party Platforms
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="4.1">
                            <div>
                                <p className="mb-2">Our services rely on third-party systems including:</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                    {['GoHighLevel', 'SMS providers', 'Email platforms', 'Cloud hosting services'].map((item) => (
                                        <li key={item} className="flex items-center text-sm bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SubItem>
                        <SubItem num="4.2">
                            <p>We are not liable for outages, interruptions, or failures caused by third-party providers.</p>
                        </SubItem>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="5" />
                        Intellectual Property
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="5.1">
                            <p>All automation systems, workflows, prompts, scripts, and configurations remain the intellectual property of O'Shea Systems.</p>
                        </SubItem>
                        <SubItem num="5.2">
                            <p>Clients are granted a non-exclusive licence to use systems during an active subscription.</p>
                        </SubItem>
                        <SubItem num="5.3">
                            <div>
                                <p className="mb-2">Upon cancellation:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>Licence rights may cease</li>
                                    <li>Access may be revoked</li>
                                </ul>
                            </div>
                        </SubItem>
                    </div>
                </section>

                {/* Section 6 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="6" />
                        Payments & Cancellation
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="6.1">
                            <p>Minimum term: 1 month.</p>
                        </SubItem>
                        <SubItem num="6.2">
                            <p>Cancellation requires 30 days written notice.</p>
                        </SubItem>
                        <SubItem num="6.3">
                            <p>No refunds are provided.</p>
                        </SubItem>
                        <SubItem num="6.4">
                            <p>The 30-Day Optimisation Guarantee is void if the client cancels before the agreed go-live date.</p>
                        </SubItem>
                        <SubItem num="6.5">
                            <p>Recurring fees overdue by 7 days may result in suspension or termination of services.</p>
                        </SubItem>
                    </div>
                </section>

                {/* Section 7 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="7" />
                        Limitation of Liability (ACL Compliant)
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="7.1">
                            <p>Nothing in these Terms excludes rights under the Australian Consumer Law.</p>
                        </SubItem>
                        <SubItem num="7.2">
                            <p>To the maximum extent permitted by law, our total liability is limited to the amount paid by the client in the preceding 3 months.</p>
                        </SubItem>
                        <SubItem num="7.3">
                            <div>
                                <p className="mb-2">We are not liable for:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>Indirect loss</li>
                                    <li>Loss of profit</li>
                                    <li>Business interruption</li>
                                    <li>Data loss</li>
                                    <li>Third-party outages</li>
                                </ul>
                            </div>
                        </SubItem>
                    </div>
                </section>

                {/* Section 8 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="8" />
                        AI & Automation Disclaimer
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="8.1">
                            <div>
                                <p className="mb-2">Clients acknowledge that:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>AI systems operate probabilistically</li>
                                    <li>Automated responses may contain errors</li>
                                    <li>Monitoring and supervision remain the client's responsibility</li>
                                </ul>
                            </div>
                        </SubItem>
                        <SubItem num="8.2">
                            <p>We are not liable for losses caused by unsupervised automation behaviour.</p>
                        </SubItem>
                    </div>
                </section>

                {/* Section 9 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="9" />
                        Indemnity
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-3">
                        <SubItem num="9.1">
                            <div>
                                <p className="mb-2">You agree to indemnify O'Shea Systems against claims arising from:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>Misuse of automation systems</li>
                                    <li>Breach of laws (including spam laws)</li>
                                    <li>Unlawful marketing practices</li>
                                </ul>
                            </div>
                        </SubItem>
                    </div>
                </section>

                {/* Section 10 */}
                <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)]">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <SectionBadge number="10" />
                        Governing Law
                    </h2>
                    <div className="pl-4 border-l-2 border-emerald-200 ml-2 space-y-4">
                        <SubItem num="10.1">
                            <p>These Terms are governed by the laws of Victoria, Australia.</p>
                        </SubItem>
                        <SubItem num="10.2">
                            <p>You submit to the exclusive jurisdiction of Victorian courts.</p>
                        </SubItem>
                    </div>
                </section>
            </div>
        </div>
    );
}
