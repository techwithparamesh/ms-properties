import React, { useState } from 'react';
import './HomeLoanSection.css';

// Real data for banks (Oct 2025)
const banks = [
    { name: 'SBI', rate: 8.40, tenure: '5-30 years', fee: '₹8,000', logo: '/public/icons/sbi.png' },
    { name: 'HDFC', rate: 8.75, tenure: '5-30 years', fee: '₹10,000', logo: '/public/icons/hdfc.png' },
    { name: 'AXIS', rate: 8.70, tenure: '5-30 years', fee: '₹9,000', logo: '/public/icons/axis.png' },
    { name: 'ICICI', rate: 8.75, tenure: '5-30 years', fee: '₹9,500', logo: '/public/icons/icici.png' },
    { name: 'IDFC', rate: 8.85, tenure: '5-30 years', fee: '₹8,500', logo: '/public/icons/idfc.png' },
    { name: 'CANARA', rate: 8.60, tenure: '5-30 years', fee: '₹8,000', logo: '/public/icons/canara.png' },
    { name: 'KOTAK', rate: 8.70, tenure: '5-30 years', fee: '₹9,000', logo: '/public/icons/kotak.png' },
];

function calculateEMI(P: number, R: number, N: number) {
    const r = R / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    return emi;
}

function calculateEligibility(income: number, otherEmi: number, rate: number, tenure: number) {
    // FOIR: 50% of income can go to EMIs
    const maxEmi = (income * 0.5) - otherEmi;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return maxEmi * n;
    const loan = maxEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    return loan;
}

const faqs = [
    { q: 'What is the minimum down payment?', a: 'Usually 10-20% of property value.' },
    { q: 'Can I add a co-applicant?', a: 'Yes, adding a co-applicant can increase eligibility.' },
    { q: 'How is EMI calculated?', a: 'EMI is calculated using principal, interest rate, and tenure.' },
];

export default function HomeLoanSection() {
    // EMI Calculator State
    const [amount, setAmount] = useState(5000000);
    const [tenure, setTenure] = useState(20);
    const [bank, setBank] = useState(banks[0].name);
    // Interest rate auto-fills based on selected bank
    const selectedBank = banks.find(b => b.name === bank);
    const [rate, setRate] = useState(selectedBank?.rate || 8.5);

    // Eligibility Checker State
    const [income, setIncome] = useState(100000);
    const [otherEmi, setOtherEmi] = useState(0);
    const [eligibleLoan, setEligibleLoan] = useState(0);

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Update rate when bank changes
    React.useEffect(() => {
        if (selectedBank) setRate(selectedBank.rate);
    }, [bank]);

    // EMI Calculation
    const emi = calculateEMI(amount, rate, tenure * 12);
    const totalInterest = emi * tenure * 12 - amount;
    const totalRepayment = emi * tenure * 12;
    const processingFee = selectedBank?.fee || '₹0';

    // Eligibility Calculation
    const handleEligibility = () => {
        setEligibleLoan(Math.round(calculateEligibility(income, otherEmi, rate, tenure)));
    };

    return (
        <section className="home-loan-section">
            {/* Hero Section */}
            <div className="hero">
                <h1>Home Loan – Compare Lowest Rates, Instant EMI</h1>
                <p>Find the best home loan offers, calculate your EMI, and check your eligibility instantly. Trusted by thousands of happy homeowners!</p>
            </div>

            {/* EMI Calculator */}
            <div className="emi-calculator">
                <h2>EMI Calculator</h2>
                <div className="inputs">
                    <select value={bank} onChange={e => setBank(e.target.value)}>
                        {banks.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                    </select>
                    <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} placeholder="Loan Amount (₹)" />
                    <input type="number" value={tenure} onChange={e => setTenure(+e.target.value)} placeholder="Tenure (years)" />
                    <input type="number" value={rate} onChange={e => setRate(+e.target.value)} placeholder="Interest Rate (%)" />
                </div>
                <div className="results">
                    <div>Monthly EMI: <strong>₹{emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                    <div>Total Interest: ₹{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <div>Total Repayment: ₹{totalRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <div>Processing Fee: {processingFee}</div>
                </div>
            </div>

            {/* Bank Comparison Grid */}
            <div className="bank-comparison">
                <h2>Compare Bank Offers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Bank</th>
                            <th>Interest Rate (%)</th>
                            <th>Tenure</th>
                            <th>Processing Fee</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks.map(b => (
                            <tr key={b.name}>
                                <td><img src={b.logo} alt={b.name} style={{ width: 32, marginRight: 8 }} />{b.name}</td>
                                <td>{b.rate}</td>
                                <td>{b.tenure}</td>
                                <td>{b.fee}</td>
                                <td>
                                    <button>Apply</button>
                                    <button>Know More</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Eligibility Checker */}
            <div className="eligibility-checker">
                <h2>Eligibility Checker</h2>
                <div className="inputs">
                    <input type="number" value={income} onChange={e => setIncome(+e.target.value)} placeholder="Monthly Income (₹)" />
                    <input type="number" value={otherEmi} onChange={e => setOtherEmi(+e.target.value)} placeholder="Other EMIs (₹)" />
                    <input type="number" value={tenure} onChange={e => setTenure(+e.target.value)} placeholder="Tenure (years)" />
                    <input type="number" value={rate} onChange={e => setRate(+e.target.value)} placeholder="Interest Rate (%)" />
                    <button onClick={handleEligibility}>Check Eligibility</button>
                </div>
                {eligibleLoan > 0 && (
                    <div className="results">
                        <div>Max Eligible Loan Amount: <strong>₹{eligibleLoan.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                    </div>
                )}
            </div>

            {/* Loan Process Steps */}
            <div className="loan-process">
                <h2>Loan Process</h2>
                <ol>
                    <li>Application: Fill out the online form and submit documents.</li>
                    <li>Approval: Bank reviews your application and eligibility.</li>
                    <li>Disbursal: Funds are transferred to your account for property purchase.</li>
                </ol>
            </div>

            {/* Documents & Fees */}
            <div className="documents-fees">
                <h2>Documents & Fees</h2>
                <ul>
                    <li>Salaried: PAN, Aadhaar, Salary Slips, Bank Statement, Property Papers</li>
                    <li>Self-Employed: PAN, Aadhaar, ITR, Business Proof, Property Papers</li>
                    <li>Processing Fee: ₹8,000 – ₹10,000 (varies by bank)</li>
                </ul>
            </div>

            {/* Tips to Improve Eligibility */}
            <div className="tips-eligibility">
                <h2>Tips to Improve Eligibility</h2>
                <ul>
                    <li>Add a co-applicant</li>
                    <li>Clear existing EMIs</li>
                    <li>Increase down payment</li>
                </ul>
            </div>

            {/* Testimonials & Trust Signals */}
            <div className="testimonials">
                <h2>What Our Customers Say</h2>
                <blockquote>“DreamDwellings helped me find the best home loan and made the process super easy!” – Priya S.</blockquote>
                <blockquote>“Quick EMI calculation and transparent comparison. Highly recommended!” – Rajesh K.</blockquote>
                <div className="partner-logos">
                    {banks.map(b => <img key={b.name} src={b.logo} alt={b.name} style={{ width: 48, margin: 8 }} />)}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <h2>FAQs</h2>
                {faqs.map((faq, idx) => (
                    <div key={faq.q} className="faq-item">
                        <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>{faq.q}</button>
                        {openFaq === idx && <div className="faq-answer">{faq.a}</div>}
                    </div>
                ))}
            </div>
        </section>
    );
}