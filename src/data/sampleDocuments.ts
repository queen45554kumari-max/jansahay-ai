import { SampleDocumentItem } from '../types';

export const SAMPLE_DOCUMENTS: SampleDocumentItem[] = [
  {
    id: 'doc-income-guideline',
    title: 'Income Certificate Guidelines for Central Schemes (FY 2024-25)',
    category: 'Revenue & Eligibility',
    description: 'Official notification describing calculation of gross annual family income, competent authority signatures, and non-creamy layer validation.',
    content: `GOVERNMENT OF INDIA / STATE REVENUE DEPARTMENT
CIRCULAR NO: REV/2024/INC-892
SUBJECT: MANDATORY NORMS FOR ISSUANCE & VERIFICATION OF ANNUAL HOUSEHOLD INCOME CERTIFICATES FOR CENTRAL SCHOLARSHIP AND WELFARE SCHEMES

1. JURISDICTION & COMPETENT AUTHORITY:
An Income Certificate shall be deemed valid only if issued under the seal and digital signature of an officer not below the rank of Tehsildar / Sub-Divisional Magistrate (SDM) / Revenue Officer (Grade-I). Certificates issued by Notary Public, Municipal Ward Members, or Village Sarpanch alone shall NOT be accepted as statutory proof of income.

2. COMPUTATION OF FAMILY INCOME:
The 'Annual Family Income' must comprise the aggregate gross income accrued from all legitimate sources including:
(a) Basic salary, allowances, and professional fees of parents/guardians.
(b) Agricultural proceeds from cultivable landholdings as per revenue records.
(c) Rental yields, commercial profits, trade turnover, and interest dividends.
(d) Exclusions: Standard educational scholarships and disability pensions shall not be aggregated under taxable gross income.

3. FINANCIAL YEAR APPLICABILITY & VALIDITY PERIOD:
(i) For the academic session 2024-25, the income certificate must strictly reflect the earnings for the preceding Financial Year (i.e., FY 2023-24 / Assessment Year 2024-25).
(ii) The validity of an Income Certificate issued by the Revenue Authority shall be valid for a period of one (1) financial year ending on 31st March, unless otherwise specified by state statutory rules.

4. MANDATORY CLAUSES FOR NON-CREAMY LAYER (OBC-NCL) & EWS:
Applicants seeking reservation or fee waivers under OBC-NCL or Economically Weaker Sections (EWS) must furnish certificates containing the specific statutory declaration that the candidate's family does not fall in the Creamy Layer / exceeds the ₹8,00,000 gross annual ceiling.

5. SCRUTINY & REJECTION WARNING:
Any application detected with mismatched income amounts between the self-declaration affidavit and the digital Tehsildar database shall be summarily classified as 'Defective' with a strict 7-day correction cure period, failing which the benefit shall be revoked permanently.`,
  },
  {
    id: 'doc-scholarship-circular',
    title: 'National Scholarship Portal (NSP) Aadhaar & DBT Directive',
    category: 'Education & DBT',
    description: 'Ministry guidelines on mandatory Aadhaar seeding with bank accounts via NPCI mapper for direct benefit disbursement.',
    content: `MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT
NATIONAL SCHOLARSHIP PORTAL NOTIFICATION - DBT MANDATE

ATTENTION: ALL POST-MATRIC AND PRE-MATRIC SCHOLARSHIP APPLICANTS

It is hereby notified to all students applying for Central and Centrally Sponsored Scholarship Schemes on the National Scholarship Portal (NSP) for the academic cycle:

1. MANDATORY ONE-TIME REGISTRATION (OTR):
All applicants must complete One-Time Registration (OTR) using Aadhaar-based Face Authentication or Aadhaar OTP via the NSP OTR Mobile App. No application will be entertained without an active 14-digit OTR reference number.

2. DIRECT BENEFIT TRANSFER (DBT) & NPCI MAPPING:
(a) Scholarship disbursements will be routed EXCLUSIVELY through the Aadhaar Payment Bridge (APB) system to the beneficiary's Aadhaar-seeded bank account.
(b) Mere linkage of Aadhaar number to the bank account for KYC purposes is NOT sufficient. The bank account must be actively seeded and mapped on the National Payments Corporation of India (NPCI) mapper server.
(c) Joint bank accounts, minor accounts with transaction caps, or dormant accounts will lead to transaction failures on the Public Financial Management System (PFMS).

3. INSTITUTIONAL LEVEL SCRUTINY TIMELINES:
(i) Final date for online submission by student: 30th November.
(ii) Final date for verification by Institutional Nodal Officer (INO): 15th December.
(iii) Final date for verification by District Nodal Officer (DNO): 31st December.

4. DEFECT NOTICE PROCEDURE:
If an INO or DNO identifies an unreadable document scan, incorrect caste category, or mismatch in course duration, the application will be pushed to "Defective" status. The student will receive an automated SMS alert and must re-upload the valid document within seven (7) calendar days.`,
  },
  {
    id: 'doc-pmkisan-ekyc',
    title: 'PM-Kisan Land Seeding & Mandatory e-KYC Compliance Circular',
    category: 'Agriculture',
    description: 'Guidelines regarding mandatory land record verification (RoR), Aadhaar e-KYC, and bank DBT status for PM-Kisan installments.',
    content: `DEPARTMENT OF AGRICULTURE & FARMERS WELFARE
OFFICE MEMORANDUM: PM-KISAN 16TH/17TH INSTALLMENT RELEASE PREREQUISITES

To ensure that direct benefit transfer benefits under Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) reach genuine eligible landholder farmers, the following three compliance checkpoints are mandatory:

1. AADHAAR e-KYC COMPLETION:
Every registered farmer must complete biometric or OTP-based e-KYC. This can be performed either on the PM-Kisan portal using Aadhaar OTP, through the PM-Kisan mobile app using face authentication, or at nearest CSC centers via biometric scan.

2. LAND RECORD SEEDING (भूलेख अंकन):
State revenue departments must verify that the applicant's cultivable land holding is actively seeded against the PM-Kisan portal database. In cases where status shows "Land Seeding: NO", the farmer must submit a certified copy of the Record of Rights (RoR / Khatauni) to the local Circle Officer / Agriculture Coordinator for physical upload on the state nodal portal.

3. NPCI DIRECT BENEFIT TRANSFER (DBT) BANK SEEDING:
All installments are credited via Aadhaar-based payment. If the status reflects "Aadhaar Bank Account Seeding: NO", the beneficiary must visit their bank branch immediately and submit the DBT Aadhaar Mandate Consent Form. Alternatively, opening an account with India Post Payments Bank (IPPB) automatically enables instant DBT seeding.`,
  },
];
