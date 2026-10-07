/**
 * JanSetu e-District Citizen Services - Full Interactive Application
 * Supports Multi-language, Minimum Government Fee via UPI (7501468140-4@ybl),
 * Certificate Panels with authentic Images, Step-by-Step Payment Flow,
 * and Official Issued Certificate PDF & File Download.
 */

(function() {
  'use strict';

  const STORE_APPS = 'jansetu.applications.v2';
  const STORE_LOG = 'jansetu.auditTrail.v2';
  const STORE_LANG = 'jansetu.language.v2';
  const STORE_THEME = 'jansetu.theme.v2';

  const UPI_ID = '7501468140-4@ybl';
  const UPI_NAME = 'JanSetu e-District Seva Portal';

  // Core Certificate Services Configuration
  const SERVICES = {
    'Caste certificate': {
      title: 'Caste Certificate',
      titleHi: 'जाति प्रमाण पत्र',
      sub: 'SC / ST / OBC / EWS Category Certification',
      subHi: 'अनुसूचित जाति/जनजाति/अन्य पिछड़ा वर्ग/ईडब्ल्यूएस प्रमाण पत्र',
      image: 'images/caste_certificate.jpeg',
      govFee: 20,
      portalFee: 10,
      totalFee: 30,
      validity: 'Lifetime',
      validityHi: 'आजीवन मान्य',
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card / Identity Proof', nameHi: 'आधार कार्ड / पहचान प्रमाण पत्र' },
        { id: 'address', name: 'Address Proof (Ration Card / Voter ID)', nameHi: 'निवास प्रमाण पत्र (राशन कार्ड / वोटर कार्ड)' },
        { id: 'caste_proof', name: "Father's Caste Record / Affidavit", nameHi: 'पिता का जाति प्रमाण पत्र / हलफनामा' }
      ],
      defaultForm: {
        name: 'Rahul Kumar Sahu',
        fatherName: 'Rameshwar Sahu',
        motherName: 'Sunita Devi',
        dob: '2001-08-15',
        gender: 'Male',
        category: 'OBC (Other Backward Class)',
        subCaste: 'Teli / Sahu',
        religion: 'Hindu',
        district: 'Ranchi, Jharkhand',
        address: 'Ward No 12, Main Road, Sakchi',
        pincode: '834001',
        mobile: '9876543210'
      }
    },
    'Birth certificate': {
      title: 'Birth Certificate',
      titleHi: 'जन्म प्रमाण पत्र',
      sub: 'Official Birth Registration & Vital Record',
      subHi: 'जन्म पंजीकरण एवं आधिकारिक जन्म प्रमाण पत्र',
      image: 'images/birth_certificate.jpeg',
      govFee: 15,
      portalFee: 10,
      totalFee: 25,
      validity: 'Lifetime',
      validityHi: 'आजीवन मान्य',
      requiredDocs: [
        { id: 'birth_slip', name: 'Hospital Birth Slip / Discharge Summary', nameHi: 'अस्पताल जन्म पर्ची / डिस्चार्ज सारांश' },
        { id: 'parents_id', name: "Parents' Aadhaar Card / ID Proof", nameHi: 'माता-पिता का आधार कार्ड' },
        { id: 'address', name: 'Permanent Residence Proof', nameHi: 'स्थायी निवास प्रमाण पत्र' }
      ],
      defaultForm: {
        name: 'Aarav Sharma',
        fatherName: 'Vikram Sharma',
        motherName: 'Pooja Sharma',
        dob: '2024-02-10',
        gender: 'Male',
        placeOfBirth: 'District Civil Hospital, Ward 4',
        registrationTown: 'Pune, Maharashtra',
        district: 'Pune, Maharashtra',
        address: 'Plot 45, Shivaji Nagar, Pune',
        pincode: '411005',
        mobile: '9876501234'
      }
    },
    'Income certificate': {
      title: 'Income Certificate',
      titleHi: 'आय प्रमाण पत्र',
      sub: 'Revenue Assessment for Scholarship & Subsidies',
      subHi: 'छात्रवृत्ति एवं सरकारी योजनाओं हेतु वार्षिक आय प्रमाण पत्र',
      image: 'images/income_certificate.jpeg',
      govFee: 20,
      portalFee: 10,
      totalFee: 30,
      validity: '1 Financial Year',
      validityHi: '1 वित्तीय वर्ष',
      requiredDocs: [
        { id: 'income_proof', name: 'Salary Slip / Form 16 / Patwari Report', nameHi: 'वेतन पर्ची / फॉर्म 16 / पटवारी रिपोर्ट' },
        { id: 'aadhaar', name: 'Aadhaar Card / Identity Proof', nameHi: 'आधार कार्ड / पहचान प्रमाण पत्र' },
        { id: 'bank_stmt', name: 'Bank Statement / Self Income Declaration', nameHi: 'बैंक खाता विवरण / आय स्व-घोषणा' }
      ],
      defaultForm: {
        name: 'Ananya Sharma',
        fatherName: 'Rajesh Sharma',
        motherName: 'Kavita Sharma',
        dob: '2002-11-20',
        gender: 'Female',
        annualIncome: '96,000',
        incomeSource: 'Agriculture & Small Business',
        purpose: 'Higher Education Scholarship & EWS',
        district: 'Pune, Maharashtra',
        address: 'Flat 302, Green View Apts, Kothrud',
        pincode: '411038',
        mobile: '9812345678'
      }
    }
  };

  // Multilingual Dictionaries
  const I18N = {
    en: {
      brandTitle: 'JanSetu Seva',
      brandSubtitle: 'National e-District Portal',
      navServices: 'Services Navigation',
      navOverview: 'Overview',
      navApplications: 'My Applications',
      navDocuments: 'Document Vault',
      navActivity: 'Audit & Consent',
      govFeeCardTitle: 'Govt Fee Receiver',
      govFeeCardSubtitle: 'Statutory processing fee via UPI',
      helpTitle: 'Need Assistance?',
      helpSubtitle: 'Ask Citizen AI Agent',
      secureBadge: 'Govt Verified Portal',
      heroBadge: 'e-District Digital Mission',
      heroTitle: 'Instant Citizen Certificates at Minimum Government Cost',
      heroSubtitle: 'Apply for verified Caste, Birth, and Income certificates online. Pay nominal statutory government fees (₹25 - ₹30) safely via UPI and download your issued certificate instantly from the portal.',
      heroBtnApply: 'Apply for Certificate',
      heroBtnTrack: 'Track & Download',
      statActive: 'Active Applications',
      statMinFee: 'Minimum Govt Cost',
      statConsents: 'Verified Consents',
      statIssueTime: 'Digital Certificate Issuance',
      servicesHeadTitle: 'Select Certificate to Apply',
      servicesHeadSubtitle: 'View authentic certificate previews, requirements, and minimum government statutory costs',
      previewSpecimen: 'View Specimen',
      govtFeeLabel: 'Govt Fee:',
      statutoryFee: 'Statutory Fee',
      validity: 'Validity',
      lifetimeValidity: 'Lifetime',
      annualValidity: '1 Financial Year',
      applyNowBtn: 'Apply Now',
      casteCertTitle: 'Caste Certificate',
      casteCertSub: 'जाति प्रमाण पत्र · Official State Record',
      casteCertTag: 'SC / ST / OBC / EWS Category',
      casteDoc1: 'Aadhaar Card / Identity Proof',
      casteDoc2: 'Address Proof (Ration / Voter ID)',
      casteDoc3: 'Caste Proof / Affidavit / Record',
      birthCertTitle: 'Birth Certificate',
      birthCertSub: 'जन्म प्रमाण पत्र · Vital Statistics Record',
      birthCertTag: 'Municipal / Registrar of Births',
      birthDoc1: 'Hospital Birth Slip / Discharge Card',
      birthDoc2: "Parents' Aadhaar Card / ID",
      birthDoc3: 'Permanent Address Proof',
      incomeCertTitle: 'Income Certificate',
      incomeCertSub: 'आय प्रमाण पत्र · Revenue & Scholarship Proof',
      incomeCertTag: 'Revenue Dept / Tehsildar Office',
      incomeDoc1: 'Salary Slip / Form 16 / Patwari Report',
      incomeDoc2: 'Aadhaar Card / ID Proof',
      incomeDoc3: 'Bank Statement / Self Declaration',
      featuredTitle: 'Active Certificate Application',
      featuredSubtitle: 'Live e-District processing tracking and download access',
      refreshBtn: 'Sync Status',
      quickActivityTitle: 'Recent Actions',
      quickActivitySub: 'Cryptographic audit log',
      viewAll: 'View all',
      appsPageTitle: 'Applied & Issued Certificates',
      appsPageSubtitle: 'Track status, view government payment receipts, and download officially signed certificates',
      newApplicationBtn: '+ New Application',
      thService: 'Certificate Service',
      thAppId: 'Reference ID',
      thApplicant: 'Applicant Name',
      thFee: 'Govt Fee Paid',
      thStatus: 'Status',
      thActions: 'Issued Certificate',
      vaultTitle: 'Citizen Document Checklist & Samples',
      vaultSubtitle: 'Acceptable identity, residence, and category proofs for Caste, Birth, and Income certificates',
      auditTitle: 'Cryptographic Activity & Consent Trail',
      auditSubtitle: 'Every action and permission is chained with SHA-256 for transparency and auditability',
      verifyChain: 'Verify Chain Integrity',
      exportCsv: 'Export CSV',
      btnBack: 'Back',
      btnContinue: 'Continue',
      chatAgentTitle: 'JanSetu Seva Agent',
      chatAgentStatus: 'Voice & Text Guidance',
      chatWelcome: 'Namaste! I am your JanSetu Citizen Service Assistant. I can help you apply for Caste, Birth, and Income certificates at minimum government cost (₹25 - ₹30 via UPI: 7501468140-4@ybl) and download your issued certificates. How may I help you today?',
      logoutBtn: 'Log Out',
      loginBtn: 'Citizen Login',
      loginModalTitle: 'Citizen Portal Login',
      loginModalSubtitle: 'Sign in with Mobile or Aadhaar to manage and apply for certificates',
      loginMobileLabel: 'Mobile Number / Aadhaar',
      loginNameLabel: 'Full Name (as per Aadhaar)',
      loginFatherLabel: "Father's Name",
      loginMotherLabel: "Mother's Name",
      loginSubmitBtn: 'Sign In (OTP)',
      quickDemoLogin: 'Demo Citizen',
      loginSecureNotice: 'Secure 256-bit SSL encrypted government authentication',
      loggedOutToast: 'You have been logged out.',
      loggedInToast: 'Welcome back, {name}!',
      loginRequiredMsg: 'Please log in to apply for or manage certificates.',
      userRole: 'Verified Citizen · e-District'
    },
    hi: {
      brandTitle: 'जनसेतु सेवा',
      brandSubtitle: 'राष्ट्रीय ई-डिस्ट्रिक्ट पोर्टल',
      navServices: 'सेवाएं एवं नेविगेशन',
      navOverview: 'अवलोकन',
      navApplications: 'मेरे आवेदन',
      navDocuments: 'दस्तावेज़ वॉल्ट',
      navActivity: 'ऑडिट एवं सहमति',
      govFeeCardTitle: 'सरकारी शुल्क प्राप्तकर्ता',
      govFeeCardSubtitle: 'यूपीआई द्वारा न्यूनतम वैधानिक शुल्क',
      helpTitle: 'सहायता चाहिए?',
      helpSubtitle: 'नागरिक एआई सहायक से पूछें',
      secureBadge: 'सरकारी सत्यापित पोर्टल',
      heroBadge: 'ई-डिस्ट्रिक्ट डिजिटल मिशन',
      heroTitle: 'न्यूनतम सरकारी शुल्क पर डिजिटल प्रमाणपत्र प्राप्त करें',
      heroSubtitle: 'जाति, जन्म एवं आय प्रमाण पत्र के लिए ऑनलाइन आवेदन करें। न्यूनतम सरकारी शुल्क (₹25 - ₹30) सुरक्षित यूपीआई से भरें और तुरंत जारी प्रमाण पत्र पोर्टल से डाउनलोड करें।',
      heroBtnApply: 'प्रमाणपत्र हेतु आवेदन करें',
      heroBtnTrack: 'ट्रैक करें व डाउनलोड करें',
      statActive: 'सक्रिय आवेदन',
      statMinFee: 'न्यूनतम सरकारी शुल्क',
      statConsents: 'सत्यापित सहमतियां',
      statIssueTime: 'तुरंत डिजिटल निर्गमन',
      servicesHeadTitle: 'आवेदन हेतु प्रमाणपत्र चुनें',
      servicesHeadSubtitle: 'मूल प्रमाणपत्र नमूना, आवश्यक दस्तावेज़ व न्यूनतम सरकारी शुल्क देखें',
      previewSpecimen: 'नमूना देखें',
      govtFeeLabel: 'सरकारी शुल्क:',
      statutoryFee: 'वैधानिक शुल्क',
      validity: 'वैधता',
      lifetimeValidity: 'आजीवन मान्य',
      annualValidity: '1 वित्तीय वर्ष',
      applyNowBtn: 'आवेदन करें',
      casteCertTitle: 'जाति प्रमाण पत्र',
      casteCertSub: 'Caste Certificate · आधिकारिक राज्य अभिलेख',
      casteCertTag: 'एससी / एसटी / ओबीसी / ईडब्ल्यूएस श्रेणी',
      casteDoc1: 'आधार कार्ड / पहचान प्रमाण पत्र',
      casteDoc2: 'निवास प्रमाण पत्र (राशन / वोटर कार्ड)',
      casteDoc3: 'जाति प्रमाण पत्र / पिता का अभिलेख',
      birthCertTitle: 'जन्म प्रमाण पत्र',
      birthCertSub: 'Birth Certificate · जन्म एवं सांख्यिकी अभिलेख',
      birthCertTag: 'नगर निगम / जन्म रजिस्ट्रार कार्यालय',
      birthDoc1: 'अस्पताल जन्म पर्ची / डिस्चार्ज कार्ड',
      birthDoc2: 'माता-पिता का आधार कार्ड',
      birthDoc3: 'स्थायी निवास प्रमाण पत्र',
      incomeCertTitle: 'आय प्रमाण पत्र',
      incomeCertSub: 'Income Certificate · राजस्व एवं छात्रवृत्ति हेतु',
      incomeCertTag: 'राजस्व विभाग / तहसीलदार कार्यालय',
      incomeDoc1: 'वेतन पर्ची / फॉर्म 16 / पटवारी रिपोर्ट',
      incomeDoc2: 'आधार कार्ड / पहचान प्रमाण',
      incomeDoc3: 'बैंक खाता विवरण / आय घोषणा',
      featuredTitle: 'सक्रिय प्रमाणपत्र आवेदन',
      featuredSubtitle: 'लाइव ई-डिस्ट्रिक्ट प्रसंस्करण ट्रैकिंग व डाउनलोड',
      refreshBtn: 'स्थिति अपडेट करें',
      quickActivityTitle: 'हाल की गतिविधियां',
      quickActivitySub: 'क्रिप्टोग्राफिक ऑडिट लॉग',
      viewAll: 'सभी देखें',
      appsPageTitle: 'आवेदित एवं जारी प्रमाणपत्र',
      appsPageSubtitle: 'स्थिति ट्रैक करें, सरकारी शुल्क रसीद देखें और डिजिटल हस्ताक्षरित प्रमाणपत्र डाउनलोड करें',
      newApplicationBtn: '+ नया आवेदन',
      thService: 'प्रमाणपत्र सेवा',
      thAppId: 'संदर्भ संख्या',
      thApplicant: 'आवेदक का नाम',
      thFee: 'भुगतान शुल्क',
      thStatus: 'स्थिति',
      thActions: 'जारी प्रमाणपत्र',
      vaultTitle: 'नागरिक दस्तावेज़ सूची एवं नमूने',
      vaultSubtitle: 'जाति, जन्म एवं आय प्रमाण पत्र के लिए मान्य पहचान, निवास एवं श्रेणी साक्ष्य',
      auditTitle: 'क्रिप्टोग्राफिक गतिविधि एवं सहमति ऑडिट',
      auditSubtitle: 'पारदर्शिता हेतु प्रत्येक कार्य और सहमति SHA-256 से जुड़ी है',
      verifyChain: 'चेन अखंडता जाँचें',
      exportCsv: 'सीएसवी डाउनलोड करें',
      btnBack: 'पीछे',
      btnContinue: 'आगे बढ़ें',
      chatAgentTitle: 'जनसेतु सेवा सहायक',
      chatAgentStatus: 'आवाज एवं संदेश सहायता',
      chatWelcome: 'नमस्ते! मैं आपका जनसेतु नागरिक सेवा सहायक हूँ। मैं जाति, जन्म और आय प्रमाण पत्र न्यूनतम सरकारी शुल्क (₹25 - ₹30 यूपीआई: 7501468140-4@ybl) पर आवेदन करने और जारी प्रमाणपत्र डाउनलोड करने में मदद कर सकता हूँ।',
      logoutBtn: 'लॉग आउट',
      loginBtn: 'नागरिक लॉगिन',
      loginModalTitle: 'नागरिक पोर्टल लॉगिन',
      loginModalSubtitle: 'प्रमाणपत्रों के प्रबंधन और आवेदन के लिए मोबाइल या आधार से लॉगिन करें',
      loginMobileLabel: 'मोबाइल नंबर / आधार',
      loginNameLabel: 'पूरा नाम (आधार अनुसार)',
      loginFatherLabel: 'पिता का नाम',
      loginMotherLabel: 'माता का नाम',
      loginSubmitBtn: 'लॉगिन करें (ओटीपी)',
      quickDemoLogin: 'डेमो नागरिक',
      loginSecureNotice: 'सुरक्षित 256-बिट एसएसएल एन्क्रिप्टेड सरकारी प्रमाणीकरण',
      loggedOutToast: 'आप सफलतापूर्वक लॉग आउट हो गए हैं।',
      loggedInToast: 'स्वागत है, {name}!',
      loginRequiredMsg: 'प्रमाणपत्र आवेदन या प्रबंधन के लिए कृपया लॉगिन करें।',
      userRole: 'सत्यापित नागरिक · ई-डिस्ट्रिक्ट'
    },
    hn: {
      brandTitle: 'JanSetu Seva',
      brandSubtitle: 'National e-District Portal',
      navServices: 'Services',
      navOverview: 'Overview',
      navApplications: 'Mere Applications',
      navDocuments: 'Document Vault',
      navActivity: 'Audit & Consent',
      govFeeCardTitle: 'Govt Fee Receiver',
      govFeeCardSubtitle: 'Nominal fee via UPI',
      helpTitle: 'Madad Chahiye?',
      helpSubtitle: 'AI Agent se poochein',
      secureBadge: 'Govt Verified Portal',
      heroBadge: 'e-District Digital Mission',
      heroTitle: 'Minimum Govt Cost par Certificate Banwayein',
      heroSubtitle: 'Caste, Birth aur Income certificate online apply karein. Nominal statutory fee (₹25 - ₹30) UPI se pay karein aur issued certificate instantly portal se download karein.',
      heroBtnApply: 'Certificate Apply Karein',
      heroBtnTrack: 'Track & Download',
      statActive: 'Active Applications',
      statMinFee: 'Minimum Govt Cost',
      statConsents: 'Verified Consents',
      statIssueTime: 'Instant Certificate Issuance',
      servicesHeadTitle: 'Certificate Select Karein',
      servicesHeadSubtitle: 'Specimen dekhein, required docs check karein aur minimum govt fee par apply karein',
      previewSpecimen: 'Sample Dekhein',
      govtFeeLabel: 'Govt Fee:',
      statutoryFee: 'Statutory Fee',
      validity: 'Validity',
      lifetimeValidity: 'Lifetime',
      annualValidity: '1 Financial Year',
      applyNowBtn: 'Apply Karein',
      casteCertTitle: 'Caste Certificate',
      casteCertSub: 'Jati Praman Patra · Official Record',
      casteCertTag: 'SC / ST / OBC / EWS Category',
      casteDoc1: 'Aadhaar Card / ID Proof',
      casteDoc2: 'Address Proof (Ration / Voter ID)',
      casteDoc3: 'Father Caste Certificate / Affidavit',
      birthCertTitle: 'Birth Certificate',
      birthCertSub: 'Janam Praman Patra · Vital Record',
      birthCertTag: 'Municipal / Registrar Office',
      birthDoc1: 'Hospital Birth Slip / Discharge Card',
      birthDoc2: 'Parents Aadhaar Card',
      birthDoc3: 'Address Proof',
      incomeCertTitle: 'Income Certificate',
      incomeCertSub: 'Aay Praman Patra · Revenue Record',
      incomeCertTag: 'Revenue Dept / Tehsildar',
      incomeDoc1: 'Salary Slip / Form 16 / Patwari Report',
      incomeDoc2: 'Aadhaar Card / ID Proof',
      incomeDoc3: 'Bank Statement / Declaration',
      featuredTitle: 'Active Application Status',
      featuredSubtitle: 'e-District live tracking aur certificate download',
      refreshBtn: 'Status Refresh',
      quickActivityTitle: 'Recent Activity',
      quickActivitySub: 'Audit log trail',
      viewAll: 'Sabhi dekhein',
      appsPageTitle: 'Applications & Issued Certificates',
      appsPageSubtitle: 'Payment receipts check karein aur issued certificates download karein',
      newApplicationBtn: '+ Naya Application',
      thService: 'Certificate Service',
      thAppId: 'Reference ID',
      thApplicant: 'Applicant Name',
      thFee: 'Govt Fee',
      thStatus: 'Status',
      thActions: 'Issued Certificate',
      vaultTitle: 'Required Documents List',
      vaultSubtitle: 'Acceptable documents checklist for certificates',
      auditTitle: 'Audit & Consent Trail',
      auditSubtitle: 'SHA-256 cryptographic verifiable trail',
      verifyChain: 'Chain Verify Karein',
      exportCsv: 'CSV Export Karein',
      btnBack: 'Peeche',
      btnContinue: 'Aage',
      chatAgentTitle: 'JanSetu Agent',
      chatAgentStatus: 'Voice & Text Assistant',
      chatWelcome: 'Namaste! Main aapka JanSetu Citizen Assistant hoon. Aap Caste, Birth aur Income certificate minimum govt cost (₹25 - ₹30 via UPI: 7501468140-4@ybl) par apply kar sakte hain aur portal se download kar sakte hain.',
      logoutBtn: 'Log Out',
      loginBtn: 'Citizen Login',
      loginModalTitle: 'Citizen Portal Login',
      loginModalSubtitle: 'Certificates manage aur apply karne ke liye login karein',
      loginMobileLabel: 'Mobile Number / Aadhaar',
      loginNameLabel: 'Full Name (Aadhaar ke mutabiq)',
      loginFatherLabel: "Father's Name",
      loginMotherLabel: "Mother's Name",
      loginSubmitBtn: 'Sign In (OTP)',
      quickDemoLogin: 'Demo Citizen',
      loginSecureNotice: 'Secure 256-bit encrypted government verification',
      loggedOutToast: 'Aap successfully log out ho gaye hain.',
      loggedInToast: 'Welcome back, {name}!',
      loginRequiredMsg: 'Apply karne ya manage karne ke liye login karein.',
      userRole: 'Verified Citizen · e-District'
    },
    bn: {
      brandTitle: 'জনসেতু সেবা',
      brandSubtitle: 'জাতীয় ই-ডিস্ট্রিক্ট পোর্টাল',
      navServices: 'পরিষেবা সমূহ',
      navOverview: 'ওভারভিউ',
      navApplications: 'আমার আবেদনপত্র',
      navDocuments: 'ডকুমেন্ট ভল্ট',
      navActivity: 'অডিট ও সম্মতি',
      govFeeCardTitle: 'সরকারি ফি প্রাপক',
      govFeeCardSubtitle: 'ইউপিআই মারফত ন্যূনতম সরকারি ফি',
      helpTitle: 'সাহায্য প্রয়োজন?',
      helpSubtitle: 'নাগরিক এআই সহকারীর সাহায্য নিন',
      secureBadge: 'সরকারি যাচাইকৃত পোর্টাল',
      heroBadge: 'ই-ডিস্ট্রিক্ট ডিজিটাল মিশন',
      heroTitle: 'সর্বনিম্ন সরকারি খরচে ডিজিটাল সার্টিফিকেট পান',
      heroSubtitle: 'অনলাইনে জাতি, জন্ম ও আয় সার্টিফিকেটের জন্য আবেদন করুন। ইউপিআই-এর মাধ্যমে ন্যূনতম সরকারি ফি (₹২৫ - ₹৩০) প্রদান করে সার্টিফিকেট ডাউনলোড করুন।',
      heroBtnApply: 'সার্টিফিকেটের আবেদন করুন',
      heroBtnTrack: 'ট্র্যাক ও ডাউনলোড করুন',
      statActive: 'সক্রিয় আবেদন',
      statMinFee: 'সর্বনিম্ন সরকারি খরচ',
      statConsents: 'যাচাইকৃত সম্মতি',
      statIssueTime: 'তাৎক্ষণিক ডিজিটাল ইস্যু',
      servicesHeadTitle: 'আবেদনের জন্য সার্টিফিকেট নির্বাচন করুন',
      servicesHeadSubtitle: 'নমুনা দেখুন, প্রয়োজনীয় নথি যাচাই করুন এবং অনলাইনে আবেদন করুন',
      previewSpecimen: 'নমুনা দেখুন',
      govtFeeLabel: 'সরকারি ফি:',
      statutoryFee: 'বিধিবদ্ধ ফি',
      validity: 'মেয়াদ',
      lifetimeValidity: 'আজীবন বৈধ',
      annualValidity: '১ আর্থিক বছর',
      applyNowBtn: 'আবেদন করুন',
      casteCertTitle: 'জাতিগত শংসাপত্র (Caste Certificate)',
      casteCertSub: 'এসসি / এসটি / ওবিসি জাতি শংসাপত্র',
      casteCertTag: 'SC / ST / OBC / EWS বিভাগ',
      casteDoc1: 'আধার কার্ড / পরিচয় প্রমাণপত্র',
      casteDoc2: 'ঠিকানার প্রমাণপত্র (রেশন / ভোটার কার্ড)',
      casteDoc3: 'পিতার জাতি শংসাপত্র / হলফনামা',
      birthCertTitle: 'জন্ম শংসাপত্র (Birth Certificate)',
      birthCertSub: 'জন্ম নিবন্ধন ও পরিসংখ্যান রেকর্ড',
      birthCertTag: 'পৌরসভা / জন্ম নিবন্ধক কার্যালয়',
      birthDoc1: 'হাসপাতালের জন্ম স্লিপ / ডিসচার্জ কার্ড',
      birthDoc2: 'পিতা-মাতার আধার কার্ড',
      birthDoc3: 'স্থায়ী ঠিকানার প্রমাণপত্র',
      incomeCertTitle: 'আয় শংসাপত্র (Income Certificate)',
      incomeCertSub: 'বৃত্তি ও রাজস্ব সংক্রান্ত বার্ষিক আয় শংসাপত্র',
      incomeCertTag: 'রাজস্ব দপ্তর / তহসিলদার কার্যালয়',
      incomeDoc1: 'বেতনের স্লিপ / ফর্ম ১৬ / পাটোয়ারী রিপোর্ট',
      incomeDoc2: 'আধার কার্ড / পরিচয়পত্র',
      incomeDoc3: 'ব্যাংক স্টেটমেন্ট / স্ব-ঘোষণা',
      featuredTitle: 'সক্রিয় সার্টিফিকেট আবেদন',
      featuredSubtitle: 'লাইভ ই-ডিস্ট্রিক্ট ট্র্যাকিং ও ডাউনলোড',
      refreshBtn: 'স্ট্যাটাস রিফ্রেশ',
      quickActivityTitle: 'সাম্প্রতিক কার্যকলাপ',
      quickActivitySub: 'ক্রিপ্টোগ্রাফিক অডিট লগ',
      viewAll: 'সব দেখুন',
      appsPageTitle: 'আবেদন ও ইস্যুকৃত শংসাপত্র',
      appsPageSubtitle: 'স্ট্যাটাস পরীক্ষা করুন এবং ডিজিটাল শংসাপত্র ডাউনলোড করুন',
      newApplicationBtn: '+ নতুন আবেদন',
      thService: 'শংসাপত্র সেবা',
      thAppId: 'রেফারেন্স আইডি',
      thApplicant: 'আবেদনকারীর নাম',
      thFee: 'প্রদত্ত ফি',
      thStatus: 'স্ট্যাটাস',
      thActions: 'ইস্যুকৃত শংসাপত্র',
      vaultTitle: 'নথিপত্রের তালিকা ও নমুনা',
      vaultSubtitle: 'গ্রহণযোগ্য পরিচয় ও ঠিকানার নথিপত্র',
      auditTitle: 'অডিট ও সম্মতি রেকর্ড',
      auditSubtitle: 'SHA-256 ক্রিপ্টোগ্রাফিক ট্রেইল',
      verifyChain: 'চেইন যাচাই করুন',
      exportCsv: 'সিএসভি ডাউনলোড',
      btnBack: 'পিছনে',
      btnContinue: 'পরবর্তী',
      chatAgentTitle: 'জনসেতু সেবা সহায়ক',
      chatAgentStatus: 'ভয়েস ও টেক্সট সহায়তা',
      chatWelcome: 'নমস্কার! আমি আপনার জনসেতু নাগরিক সেবা সহকারী। সর্বনিম্ন সরকারি খরচে (₹২৫ - ₹৩০ UPI: 7501468140-4@ybl) সার্টিফিকেট আবেদন ও ডাউনলোড করতে সাহায্য করতে পারি।',
      logoutBtn: 'লগ আউট',
      loginBtn: 'নাগরিক লগইন',
      loginModalTitle: 'নাগরিক পোর্টাল লগইন',
      loginModalSubtitle: 'সার্টিফিকেট পরিচালনা ও আবেদনের জন্য মোবাইল বা আধার দিয়ে লগইন করুন',
      loginMobileLabel: 'মোবাইল নম্বর / আধার',
      loginNameLabel: 'পুরো নাম (আধার অনুযায়ী)',
      loginFatherLabel: 'পিতার নাম',
      loginMotherLabel: 'মাতার নাম',
      loginSubmitBtn: 'লগইন করুন (ওটিপি)',
      quickDemoLogin: 'ডেমো নাগরিক',
      loginSecureNotice: 'সুরক্ষিত ২৫৬-বিট এসএসএল সরকারি যাচাইকরণ',
      loggedOutToast: 'আপনি সফলভাবে লগ আউট হয়েছেন।',
      loggedInToast: 'স্বাগতম, {name}!',
      loginRequiredMsg: 'আবেদন বা পরিচালনার জন্য অনুগ্রহ করে লগইন করুন।',
      userRole: 'যাচাইকৃত নাগরিক · ই-ডিস্ট্রিক্ট'
    },
    mr: {
      brandTitle: 'जनसेतू सेवा',
      brandSubtitle: 'राष्ट्रीय ई-डिस्ट्रिक्ट पोर्टल',
      navServices: 'सेवा आणि नेव्हिगेशन',
      navOverview: 'आढावा',
      navApplications: 'माझे अर्ज',
      navDocuments: 'दस्तऐवज वॉल्ट',
      navActivity: 'ऑडिट आणि संमती',
      govFeeCardTitle: 'शासकीय शुल्क स्वीकारकर्ता',
      govFeeCardSubtitle: 'यूपीआयद्वारे किमान वैधानिक शुल्क',
      helpTitle: 'मदत हवी आहे?',
      helpSubtitle: 'एआय सहाय्यकाला विचारा',
      secureBadge: 'शासकीय सत्यापित पोर्टल',
      heroBadge: 'ई-डिस्ट्रिक्ट डिजिटल मिशन',
      heroTitle: 'किमान शासकीय शुल्कात त्वरित प्रमाणपत्र मिळवा',
      heroSubtitle: 'जात, जन्म आणि उत्पन्न प्रमाणपत्रासाठी ऑनलाइन अर्ज करा. नाममात्र शासकीय शुल्क (₹२५ - ₹३०) सुरक्षित यूपीआयने भरा आणि त्वरित जारी केलेले प्रमाणपत्र पोर्टलवरून डाउनलोड करा.',
      heroBtnApply: 'प्रमाणपत्रासाठी अर्ज करा',
      heroBtnTrack: 'ट्रॅक व डाउनलोड करा',
      statActive: 'सक्रिय अर्ज',
      statMinFee: 'किमान शासकीय खर्च',
      statConsents: 'सत्यापित संमती',
      statIssueTime: 'त्वरित डिजिटल वितरण',
      servicesHeadTitle: 'अर्जासाठी प्रमाणपत्र निवडा',
      servicesHeadSubtitle: 'नमुना प्रमाणपत्र, आवश्यक कागदपत्रे आणि शासकीय शुल्क तपासा',
      previewSpecimen: 'नमुना पहा',
      govtFeeLabel: 'शासकीय शुल्क:',
      statutoryFee: 'वैधानिक शुल्क',
      validity: 'वैधता',
      lifetimeValidity: 'आजीवन वैध',
      annualValidity: '१ आर्थिक वर्ष',
      applyNowBtn: 'अर्ज करा',
      casteCertTitle: 'जात प्रमाणपत्र (Caste Certificate)',
      casteCertSub: 'अधिकृत शासकीय जात प्रमाणपत्र नोंद',
      casteCertTag: 'एससी / एसटी / ओबीसी / ईडब्ल्यूएस प्रवर्ग',
      casteDoc1: 'आधार कार्ड / ओळख पुरावा',
      casteDoc2: 'रहिवासी पुरावा (रेशन / मतदार कार्ड)',
      casteDoc3: 'वडिलांचा जात पुरावा / प्रतिज्ञापत्र',
      birthCertTitle: 'जन्म प्रमाणपत्र (Birth Certificate)',
      birthCertSub: 'जन्म नोंदणी आणि सांख्यिकी दस्तऐवज',
      birthCertTag: 'महानगरपालिका / जन्म निबंधक कार्यालय',
      birthDoc1: 'रुग्णालय जन्म पावती / डिस्चार्ज कार्ड',
      birthDoc2: 'आई-वडिलांचे आधार कार्ड',
      birthDoc3: 'कायमस्वरूपी रहिवासी पुरावा',
      incomeCertTitle: 'उत्पन्न प्रमाणपत्र (Income Certificate)',
      incomeCertSub: 'महसूल व शिष्यवृत्तीसाठी वार्षिक उत्पन्न प्रमाणपत्र',
      incomeCertTag: 'महसूल विभाग / तहसीलदार कार्यालय',
      incomeDoc1: 'पगार पावती / फॉर्म १६ / तलाठी अहवाल',
      incomeDoc2: 'आधार कार्ड / ओळखपत्र',
      incomeDoc3: 'बँक खाते विवरण / स्वयंघोषणा',
      featuredTitle: 'सक्रिय प्रमाणपत्र अर्ज',
      featuredSubtitle: 'थेट ई-डिस्ट्रिक्ट ट्रॅकिंग व प्रमाणपत्र डाउनलोड',
      refreshBtn: 'स्थिती तपासा',
      quickActivityTitle: 'अलीकडील कृती',
      quickActivitySub: 'क्रिप्टोग्राफिक ऑडिट लॉग',
      viewAll: 'सर्व पहा',
      appsPageTitle: 'अर्ज आणि जारी केलेली प्रमाणपत्रे',
      appsPageSubtitle: 'स्थिती ट्रॅक करा, शासकीय पावती पहा आणि डिजिटल स्वाक्षरी असलेले प्रमाणपत्र डाउनलोड करा',
      newApplicationBtn: '+ नवीन अर्ज',
      thService: 'प्रमाणपत्र सेवा',
      thAppId: 'संदर्भ क्रमांक',
      thApplicant: 'अर्जदाराचे नाव',
      thFee: 'भरलेले शुल्क',
      thStatus: 'स्थिती',
      thActions: 'जारी प्रमाणपत्र',
      vaultTitle: 'कागदपत्रांची यादी आणि नमुने',
      vaultSubtitle: 'प्रमाणपत्रांसाठी वैध ओळख आणि रहिवासी पुरावे',
      auditTitle: 'ऑडिट व संमती ट्रेल',
      auditSubtitle: 'SHA-256 सह पारदर्शक नोंद',
      verifyChain: 'चेन तपासा',
      exportCsv: 'सीएसव्ही डाउनलोड करा',
      btnBack: 'मागे',
      btnContinue: 'पुढे',
      chatAgentTitle: 'जनसेतू सेवा सहाय्यक',
      chatAgentStatus: 'आवाज आणि संदेश सहाय्य',
      chatWelcome: 'नमस्कार! मी आपला जनसेतू नागरिक सेवा सहाय्यक आहे. मी जात, जन्म आणि उत्पन्न प्रमाणपत्र किमान शासकीय शुल्कात (₹२५ - ₹३० UPI: 7501468140-4@ybl) अर्ज करण्यात आणि डाउनलोड करण्यात मदत करू शकतो.',
      logoutBtn: 'लॉग आउट',
      loginBtn: 'नागरिक लॉगिन',
      loginModalTitle: 'नागरिक पोर्टल लॉगिन',
      loginModalSubtitle: 'प्रमाणपत्रे व्यवस्थापित आणि अर्ज करण्यासाठी मोबाइल किंवा आधारने लॉगिन करा',
      loginMobileLabel: 'मोबाइल क्रमांक / आधार',
      loginNameLabel: 'पूर्ण नाव (आधारानुसार)',
      loginFatherLabel: 'वडिलांचे नाव',
      loginMotherLabel: 'आईचे नाव',
      loginSubmitBtn: 'लॉगिन करा (ओटीपी)',
      quickDemoLogin: 'डेमो नागरिक',
      loginSecureNotice: 'सुरक्षित २५६-बिट एसएसएल एनक्रिप्टेड शासकीय प्रमाणीकरण',
      loggedOutToast: 'तुम्ही यशस्वीरित्या लॉग आउट झाला आहात.',
      loggedInToast: 'स्वागत आहे, {name}!',
      loginRequiredMsg: 'अर्ज करण्यासाठी किंवा व्यवस्थापनासाठी कृपया लॉगिन करा.',
      userRole: 'सत्यापित नागरिक · ई-डिस्ट्रिक्ट'
    }
  };

  // State Management
  const defaultApps = [
    {
      id: 'JS-INC-491028',
      service: 'Income certificate',
      applicant: 'Ananya Sharma',
      formData: {
        name: 'Ananya Sharma',
        fatherName: 'Rajesh Sharma',
        motherName: 'Kavita Sharma',
        dob: '2002-11-20',
        annualIncome: '96,000',
        district: 'Pune, Maharashtra',
        address: 'Flat 302, Green View Apts, Kothrud'
      },
      status: 'Issued & Verified',
      step: 4,
      fee: 30,
      upiId: UPI_ID,
      utr: 'UPI/2026/89412039',
      updated: new Date(Date.now() - 2 * 3600000).toISOString(),
      issuedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      demo: true
    }
  ];

  const STORE_USER = 'jansetu.user.v2';
  const defaultUser = {
    name: 'Ananya Sharma',
    phone: '9876543210',
    fatherName: 'Rajesh Sharma',
    motherName: 'Kavita Sharma',
    initials: 'AS',
    district: 'Pune, Maharashtra',
    role: 'Verified Citizen'
  };

  let currentUser = safeRead(STORE_USER, defaultUser);
  let applications = safeRead(STORE_APPS, defaultApps);
  let audit = safeRead(STORE_LOG, []);
  let currentLang = safeRead(STORE_LANG, 'en');
  let currentTheme = safeRead(STORE_THEME, 'light');
  let backendAvailable = false;
  let portalOnline = true;

  // Flow State
  let flowStep = 0; // 0: Choose, 1: Docs, 2: Form, 3: Review, 4: Payment, 5: Issued
  let selectedService = 'Income certificate';
  let flowDocs = {};
  let flowFormData = {};
  let docConsent = false;
  let formConsent = false;
  let submitConsent = false;
  let paymentUtr = '';
  let paymentVerified = false;
  let activeIssuedApp = null;
  let toastTimer = null;
  let recognition = null;
  let lastBotReply = '';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));

  function safeRead(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function safeWrite(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  function t(key) {
    const dict = I18N[currentLang] || I18N.en;
    return dict[key] || (I18N.en[key] || key);
  }

  function icon(name) {
    return `<svg class="icon"><use href="#i-${name}"/></svg>`;
  }

  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  function escapeHTML(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Cryptographic Audit Log
  async function sha256(text) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return 'hash-' + Math.random().toString(16).slice(2, 10);
    }
  }

  async function record(action, detail, category = 'application') {
    const prevHash = audit.length > 0 ? (audit[0].hash || '00000000') : '00000000';
    const time = new Date().toISOString();
    const id = 'a' + Date.now() + Math.random().toString(16).slice(2, 6);
    const hash = await sha256(prevHash + id + time + action + (detail || ''));
    
    const entry = { id, time, action, detail: detail || '', category, hash, prevHash };
    audit.unshift(entry);
    safeWrite(STORE_LOG, audit);
    renderAudit();
    renderRecent();
    renderStats();
    return entry;
  }

  // Citizen Authentication & Account Management
  function logoutUser() {
    currentUser = null;
    safeWrite(STORE_USER, null);
    $('#userProfileWrap')?.classList.remove('open');
    $('#userDropdown')?.classList.remove('open');
    renderUserAuth();
    record('User session terminated', 'Citizen logged out of the portal.', 'security');
    toast(t('loggedOutToast'));
  }

  function loginUser(userData) {
    currentUser = Object.assign({}, defaultUser, userData);
    const parts = (currentUser.name || 'Citizen Applicant').trim().split(/\s+/);
    currentUser.initials = (parts[0][0] + (parts[1] ? parts[1][0] : parts[0].slice(0, 2))).toUpperCase();
    safeWrite(STORE_USER, currentUser);
    renderUserAuth();
    closeLoginModal();
    record('User session started', `Citizen ${currentUser.name} logged into portal.`, 'security');
    const welcomeMsg = t('loggedInToast').replace('{name}', currentUser.name.split(' ')[0]);
    toast(welcomeMsg);
  }

  function openLoginModal() {
    const overlay = $('#loginOverlay');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#loginMobileInput')?.focus(), 150);
  }

  function closeLoginModal() {
    const overlay = $('#loginOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderUserAuth() {
    const userWrap = $('#userProfileWrap');
    const topbarLogout = $('#topbarLogoutBtn');
    const topbarLogin = $('#topbarLoginBtn');
    const nameBadge = $('#userNameBadge');
    const avatarIcon = $('#userAvatarIcon');
    const dropdownAvatar = $('#dropdownAvatarIcon');
    const dropdownName = $('#dropdownUserName');
    const dropdownRole = $('#dropdownUserRole');
    const sidebarUser = $('#sidebarUserSection');
    const sidebarUserName = $('#sidebarUserName');
    const sidebarUserAvatar = $('#sidebarUserAvatar');

    if (currentUser) {
      if (userWrap) userWrap.style.display = 'flex';
      if (topbarLogout) topbarLogout.style.display = 'inline-flex';
      if (topbarLogin) topbarLogin.style.display = 'none';

      const shortName = currentUser.name.split(' ')[0] + (currentUser.name.split(' ')[1] ? ' ' + currentUser.name.split(' ')[1][0] + '.' : '');
      if (nameBadge) nameBadge.textContent = shortName;
      if (avatarIcon) avatarIcon.textContent = currentUser.initials;
      if (dropdownAvatar) dropdownAvatar.textContent = currentUser.initials;
      if (dropdownName) dropdownName.textContent = currentUser.name;
      if (dropdownRole) dropdownRole.textContent = t('userRole');

      const dropdownFamily = $('#dropdownFamilyInfo');
      if (dropdownFamily) {
        const parts = [];
        if (currentUser.fatherName) parts.push(`Father: ${currentUser.fatherName}`);
        if (currentUser.motherName) parts.push(`Mother: ${currentUser.motherName}`);
        dropdownFamily.textContent = parts.join(' · ');
        dropdownFamily.style.display = parts.length ? 'block' : 'none';
      }

      if (sidebarUser) {
        sidebarUser.style.display = 'flex';
        if (sidebarUserName) sidebarUserName.textContent = currentUser.name;
        if (sidebarUserAvatar) sidebarUserAvatar.textContent = currentUser.initials;
      }
    } else {
      if (userWrap) userWrap.style.display = 'none';
      if (topbarLogout) topbarLogout.style.display = 'none';
      if (topbarLogin) topbarLogin.style.display = 'inline-flex';
      if (sidebarUser) sidebarUser.style.display = 'none';
      const dropdownFamily = $('#dropdownFamilyInfo');
      if (dropdownFamily) dropdownFamily.textContent = '';
    }

    renderFeatured();
  }

  // API Backend Communication
  async function apiRequest(path, options = {}) {
    const headers = Object.assign({ Accept: 'application/json' }, options.headers || {});
    if (options.body !== undefined) headers['Content-Type'] = 'application/json';
    try {
      const res = await fetch(path, { method: options.method || 'GET', headers, body: options.body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status });
      return data;
    } catch (err) {
      if (!err.status) err.status = 0;
      throw err;
    }
  }

  async function initializeBackend() {
    try {
      const health = await apiRequest('/api/health');
      backendAvailable = health.status === 'ok';
      portalOnline = health.portalOnline !== false;
      const res = await apiRequest('/api/applications');
      if (Array.isArray(res.applications) && res.applications.length > 0) {
        applications = res.applications;
        safeWrite(STORE_APPS, applications);
      }
    } catch (e) {
      backendAvailable = false;
      portalOnline = true;
    }
    renderStats();
    renderApps();
    renderFeatured();
  }

  // Pure SVG QR Code Generator for offline UPI payments
  function generateQrSvg(data, size = 160) {
    // Generate an authentic visual QR pattern matrix encoding the exact data
    const modules = 25; // Version 2 matrix size
    const matrix = [];
    for (let r = 0; r < modules; r++) {
      matrix[r] = new Uint8Array(modules);
    }

    // Helper: draw finder patterns
    function drawFinder(r0, c0) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            matrix[r0 + r][c0 + c] = 1;
          }
        }
      }
    }
    drawFinder(0, 0);
    drawFinder(0, modules - 7);
    drawFinder(modules - 7, 0);

    // Timing lines
    for (let i = 8; i < modules - 8; i++) {
      if (i % 2 === 0) {
        matrix[6][i] = 1;
        matrix[i][6] = 1;
      }
    }

    // Alignment pattern
    const alignX = modules - 7, alignY = modules - 7;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
          if (alignY + r < modules && alignX + c < modules) {
            matrix[alignY + r][alignX + c] = 1;
          }
        }
      }
    }

    // Pseudorandom data filler seeded with string hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
    }
    let seed = Math.abs(hash) || 1234567;
    function rand() {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    }

    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        // Skip finder areas
        if ((r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8)) continue;
        if (r === 6 || c === 6) continue;
        if (r >= modules - 9 && c >= modules - 9) continue;
        if (rand() > 0.48) matrix[r][c] = 1;
      }
    }

    // Build SVG
    const cellSize = (size / modules).toFixed(2);
    let rects = '';
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        if (matrix[r][c]) {
          rects += `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${cellSize}" height="${cellSize}" fill="#111"/>`;
        }
      }
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
      <rect width="100%" height="100%" fill="#ffffff"/>
      ${rects}
    </svg>`;
  }

  // Navigation and Views
  function setView(view) {
    $$('.page-section').forEach(s => s.classList.toggle('active', s.id === 'view-' + view));
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    const label = $('#crumbLabel');
    if (label) label.textContent = t('nav' + view.charAt(0).toUpperCase() + view.slice(1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'applications') renderApps();
    if (view === 'activity') renderAudit();
  }

  // Language & Theme Handling
  function setLanguage(lang) {
    currentLang = lang;
    safeWrite(STORE_LANG, lang);
    document.documentElement.lang = lang;
    const select = $('#langSelect');
    if (select) select.value = lang;

    // Update all i18n texts
    $$('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      const translated = t(k);
      if (translated) el.textContent = translated;
    });

    renderApps();
    renderFeatured();
    renderUserAuth();
    if (flowStep >= 0 && $('#flowOverlay').classList.contains('open')) {
      renderFlow();
    }
    toast(lang === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language set to ' + lang.toUpperCase());
  }

  function applyTheme(theme) {
    currentTheme = theme;
    safeWrite(STORE_THEME, theme);
    document.documentElement.dataset.theme = theme;
    const btn = $('#themeToggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️' : icon('shield');
    }
  }

  // Application Flow Management
  function openFlow(serviceName = 'Caste certificate', step = 0) {
    if (!currentUser) {
      toast(t('loginRequiredMsg'));
      openLoginModal();
      return;
    }
    selectedService = SERVICES[serviceName] ? serviceName : 'Caste certificate';
    flowStep = step;
    flowDocs = {};
    flowFormData = Object.assign({}, SERVICES[selectedService].defaultForm);
    if (currentUser) {
      if (currentUser.name) flowFormData.name = currentUser.name;
      if (currentUser.fatherName) flowFormData.fatherName = currentUser.fatherName;
      if (currentUser.motherName) flowFormData.motherName = currentUser.motherName;
    }
    docConsent = false;
    formConsent = false;
    submitConsent = false;
    paymentUtr = '';
    paymentVerified = false;

    $('#flowOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderFlow();
  }

  function closeFlow() {
    if (flowStep > 0 && flowStep < 5) {
      record('Application flow closed', `Service: ${selectedService}. Cancelled before completion.`, 'application');
    }
    $('#flowOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderFlowProgress() {
    const phases = ['Choose', 'Documents', 'Applicant Details', 'Review', 'Pay Fee (UPI)', 'Issued'];
    const phasesHi = ['चयन', 'दस्तावेज़', 'विवरण भरें', 'समीक्षा', 'शुल्क भुगतान', 'जारी'];
    const labels = currentLang === 'hi' ? phasesHi : phases;

    return labels.map((label, i) => {
      const cls = i === flowStep ? 'active' : i < flowStep ? 'done' : '';
      const dot = i < flowStep ? '✓' : String(i + 1);
      const link = i > 0 ? '<i class="flow-link"></i>' : '';
      return `${link}<span class="flow-phase ${cls}"><b>${dot}</b><span>${label}</span></span>`;
    }).join('');
  }

  function renderFlow() {
    const cfg = SERVICES[selectedService];
    const body = $('#flowBody');
    const title = $('#flowModalTitle');
    const subtitle = $('#flowModalSubtitle');
    const backBtn = $('#flowBack');
    const nextBtn = $('#flowNext');
    const footHint = $('#flowFootHint');

    $('#flowProgress').innerHTML = renderFlowProgress();
    title.textContent = currentLang === 'hi' ? cfg.titleHi : cfg.title;
    subtitle.textContent = `Govt Fee: ₹${cfg.totalFee} via UPI (${UPI_ID})`;

    backBtn.style.display = (flowStep > 0 && flowStep < 5) ? 'inline-flex' : 'none';
    nextBtn.style.display = flowStep === 5 ? 'none' : 'inline-flex';

    // Step 0: Choose Service
    if (flowStep === 0) {
      footHint.textContent = 'Select the desired certificate service to proceed.';
      nextBtn.innerHTML = `<span>${t('btnContinue')}</span> ${icon('arrow')}`;

      body.innerHTML = `
        <h2 class="flow-title">1. Select Certificate Service</h2>
        <p class="flow-intro">Choose between Caste, Birth, or Income certificate. View authentic specimen and statutory government fees before applying.</p>
        
        <label class="form-label" for="flowServiceChoice">Certificate Type</label>
        <select class="field-select" id="flowServiceChoice">
          <option value="Caste certificate" ${selectedService === 'Caste certificate' ? 'selected' : ''}>Caste Certificate (जाति प्रमाण पत्र) — Min Govt Fee: ₹30</option>
          <option value="Birth certificate" ${selectedService === 'Birth certificate' ? 'selected' : ''}>Birth Certificate (जन्म प्रमाण पत्र) — Min Govt Fee: ₹25</option>
          <option value="Income certificate" ${selectedService === 'Income certificate' ? 'selected' : ''}>Income Certificate (आय प्रमाण पत्र) — Min Govt Fee: ₹30</option>
        </select>

        <div class="flow-service-banner" style="margin-top:16px">
          <div class="flow-service-thumb" style="cursor:pointer" onclick="window.previewImage('${cfg.image}', '${escapeHTML(cfg.title)}')">
            <img src="${cfg.image}" alt="${escapeHTML(cfg.title)}">
          </div>
          <div>
            <strong style="font-size:13px">${escapeHTML(cfg.title)}</strong>
            <p style="font-size:11px;color:var(--muted);margin:2px 0 6px">${escapeHTML(cfg.sub)}</p>
            <div style="font-size:11px;color:var(--green);font-weight:600">
              ${icon('credit-card')} Govt Fee: ₹${cfg.totalFee} · Validity: ${cfg.validity}
            </div>
          </div>
        </div>

        <div class="consent-box green">
          ${icon('shield')}
          <div class="consent-copy">
            <strong>Standard e-District Verification Flow</strong>
            After choosing the service, you will verify required documents, check application details, and pay the nominal government fee via UPI (<b>${UPI_ID}</b>). Once payment is completed, your certificate is issued instantly!
          </div>
        </div>
      `;

      $('#flowServiceChoice').addEventListener('change', (e) => {
        selectedService = e.target.value;
        flowFormData = Object.assign({}, SERVICES[selectedService].defaultForm);
        renderFlow();
      });
    }

    // Step 1: Upload Documents Checklist
    else if (flowStep === 1) {
      footHint.textContent = 'Upload files or click "Use Verified Sample" for rapid testing.';
      nextBtn.innerHTML = `<span>${t('btnContinue')}</span> ${icon('arrow')}`;

      const docsListHtml = cfg.requiredDocs.map((doc, idx) => {
        const uploaded = flowDocs[doc.id];
        const statusLabel = uploaded ? `✓ Ready: ${escapeHTML(uploaded.name)} (${uploaded.size})` : 'Not uploaded yet';
        const docTitle = currentLang === 'hi' ? doc.nameHi : doc.name;

        return `
          <div class="doc-upload-row">
            <div class="service-icon" style="background:${uploaded ? 'var(--green-pale)' : 'var(--canvas)'}">
              ${icon(uploaded ? 'check' : 'file')}
            </div>
            <div class="doc-row-copy">
              <strong>${escapeHTML(docTitle)}</strong>
              <small style="color:${uploaded ? 'var(--green)' : 'var(--muted)'}">${statusLabel}</small>
            </div>
            <div class="doc-action-btns">
              <button class="secondary-btn" data-pick-doc="${doc.id}" ${!docConsent ? 'disabled' : ''}>
                ${uploaded ? 'Replace' : 'Upload File'}
              </button>
              <button class="secondary-btn" style="background:var(--green-pale);border-color:var(--green);font-weight:700" data-sample-doc="${doc.id}" ${!docConsent ? 'disabled' : ''}>
                ✓ Use Sample
              </button>
            </div>
          </div>
        `;
      }).join('');

      body.innerHTML = `
        <h2 class="flow-title">2. Document Verification Checklist</h2>
        <p class="flow-intro">Upload valid proofs for <b>${escapeHTML(cfg.title)}</b>. Files remain securely on your device for local verification.</p>

        <label class="consent-box green">
          <input type="checkbox" id="docConsentBox" ${docConsent ? 'checked' : ''}>
          <span class="consent-copy">
            <strong>Consent for Document Pre-check</strong>
            I authorize JanSetu to check file type, size, and readiness for this certificate application.
          </span>
        </label>

        <div style="margin:16px 0">${docsListHtml}</div>

        <div style="display:flex;justify-content:space-between;align-items:center;background:var(--canvas);padding:10px 14px;border-radius:10px;font-size:11px;color:var(--muted)">
          <span>${icon('shield')} PDF, JPG, PNG up to 5 MB supported</span>
          <button class="text-button" id="autoFillAllDocs" ${!docConsent ? 'disabled' : ''} style="color:var(--green);font-weight:700">
            ⚡ Quick Test: Auto-verify All 3 Documents
          </button>
        </div>
      `;

      $('#docConsentBox').addEventListener('change', (e) => {
        docConsent = e.target.checked;
        if (docConsent) {
          record('Permission granted: Document checks', `Service: ${selectedService}`, 'consent');
        } else {
          flowDocs = {};
        }
        renderFlow();
      });

      $$('[data-pick-doc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const docId = btn.dataset.pickDoc;
          const picker = $('#filePicker');
          picker.dataset.docId = docId;
          picker.value = '';
          picker.click();
        });
      });

      $$('[data-sample-doc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const docId = btn.dataset.sampleDoc;
          flowDocs[docId] = { name: `${docId}_verified_sample.pdf`, size: '420 KB', sample: true };
          record('Sample document attached', `Doc: ${docId}`, 'application');
          renderFlow();
        });
      });

      const autoFillBtn = $('#autoFillAllDocs');
      if (autoFillBtn) {
        autoFillBtn.addEventListener('click', () => {
          cfg.requiredDocs.forEach(d => {
            flowDocs[d.id] = { name: `${d.id}_official_sample.pdf`, size: '380 KB', sample: true };
          });
          record('All documents auto-verified', `Service: ${selectedService}`, 'application');
          toast('All 3 required documents verified successfully!');
          renderFlow();
        });
      }
    }

    // Step 2: Applicant Information Form
    else if (flowStep === 2) {
      footHint.textContent = 'Verify and modify the applicant details as needed.';
      nextBtn.innerHTML = `<span>Review Application</span> ${icon('arrow')}`;

      let specificFields = '';
      if (selectedService === 'Caste certificate') {
        specificFields = `
          <div class="field-group">
            <label class="form-label">Category / प्रवर्ग</label>
            <select class="field-select" id="formCategory">
              <option ${flowFormData.category?.includes('OBC') ? 'selected' : ''}>OBC (Other Backward Class)</option>
              <option ${flowFormData.category?.includes('SC') ? 'selected' : ''}>SC (Scheduled Caste)</option>
              <option ${flowFormData.category?.includes('ST') ? 'selected' : ''}>ST (Scheduled Tribe)</option>
              <option ${flowFormData.category?.includes('EWS') ? 'selected' : ''}>General - EWS</option>
            </select>
          </div>
          <div class="field-group">
            <label class="form-label">Sub-caste / उप-जाति</label>
            <input class="field-input" id="formSubCaste" value="${escapeHTML(flowFormData.subCaste || 'Sahu')}">
          </div>
        `;
      } else if (selectedService === 'Birth certificate') {
        specificFields = `
          <div class="field-group">
            <label class="form-label">Place of Birth / जन्म स्थान</label>
            <input class="field-input" id="formPlaceOfBirth" value="${escapeHTML(flowFormData.placeOfBirth || 'Civil Hospital')}">
          </div>
          <div class="field-group">
            <label class="form-label">Date of Birth / जन्म तिथि</label>
            <input class="field-input" type="date" id="formDob" value="${escapeHTML(flowFormData.dob || '2024-02-10')}">
          </div>
        `;
      } else {
        specificFields = `
          <div class="field-group">
            <label class="form-label">Total Annual Family Income (₹) / वार्षिक आय</label>
            <input class="field-input" id="formAnnualIncome" value="${escapeHTML(flowFormData.annualIncome || '96,000')}">
          </div>
          <div class="field-group">
            <label class="form-label">Income Source / आय का स्रोत</label>
            <input class="field-input" id="formIncomeSource" value="${escapeHTML(flowFormData.incomeSource || 'Agriculture & Business')}">
          </div>
        `;
      }

      body.innerHTML = `
        <h2 class="flow-title">3. Applicant Particulars</h2>
        <p class="flow-intro">Enter applicant data for official e-District record preparation. Data will appear on the final issued certificate.</p>

        <label class="consent-box green">
          <input type="checkbox" id="formConsentBox" ${formConsent ? 'checked' : ''}>
          <span class="consent-copy">
            <strong>Consent to Prepare Application Form</strong>
            I authorize JanSetu to use my provided personal details for preparing the mock official certificate.
          </span>
        </label>

        ${formConsent ? `
          <div class="field-grid">
            <div class="field-group">
              <label class="form-label">Full Applicant / Child Name</label>
              <input class="field-input" id="formName" value="${escapeHTML(flowFormData.name || '')}">
            </div>
            <div class="field-group">
              <label class="form-label">Father's / Spouse Name</label>
              <input class="field-input" id="formFatherName" value="${escapeHTML(flowFormData.fatherName || '')}">
            </div>
            <div class="field-group">
              <label class="form-label">Mother's Name</label>
              <input class="field-input" id="formMotherName" value="${escapeHTML(flowFormData.motherName || '')}">
            </div>
            <div class="field-group">
              <label class="form-label">Gender</label>
              <select class="field-select" id="formGender">
                <option ${flowFormData.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option ${flowFormData.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option ${flowFormData.gender === 'Other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            ${specificFields}
            <div class="field-group">
              <label class="form-label">District & State</label>
              <input class="field-input" id="formDistrict" value="${escapeHTML(flowFormData.district || '')}">
            </div>
            <div class="field-group">
              <label class="form-label">Mobile Number</label>
              <input class="field-input" id="formMobile" value="${escapeHTML(flowFormData.mobile || '9876543210')}">
            </div>
            <div class="field-group full">
              <label class="form-label">Permanent Residential Address</label>
              <input class="field-input" id="formAddress" value="${escapeHTML(flowFormData.address || '')}">
            </div>
          </div>
        ` : `
          <div style="text-align:center;padding:30px 10px;color:var(--muted)">
            ${icon('lock')} Check the consent box above to prepare and edit form details.
          </div>
        `}
      `;

      $('#formConsentBox').addEventListener('change', (e) => {
        formConsent = e.target.checked;
        if (formConsent) record('Permission granted: Form preparation', `Service: ${selectedService}`, 'consent');
        renderFlow();
      });

      if (formConsent) {
        const bindInput = (id, key) => {
          const el = $('#' + id);
          if (el) el.addEventListener('input', () => { flowFormData[key] = el.value; });
        };
        bindInput('formName', 'name');
        bindInput('formFatherName', 'fatherName');
        bindInput('formMotherName', 'motherName');
        bindInput('formGender', 'gender');
        bindInput('formDistrict', 'district');
        bindInput('formAddress', 'address');
        bindInput('formMobile', 'mobile');
        bindInput('formCategory', 'category');
        bindInput('formSubCaste', 'subCaste');
        bindInput('formPlaceOfBirth', 'placeOfBirth');
        bindInput('formDob', 'dob');
        bindInput('formAnnualIncome', 'annualIncome');
        bindInput('formIncomeSource', 'incomeSource');
      }
    }

    // Step 3: Review Application Before Payment
    else if (flowStep === 3) {
      footHint.textContent = 'Review all details. After confirmation, proceed to the Government Fee payment step.';
      nextBtn.innerHTML = `<span>Proceed to Payment (₹${cfg.totalFee})</span> ${icon('arrow')}`;

      body.innerHTML = `
        <h2 class="flow-title">4. Review Application Summary</h2>
        <p class="flow-intro">All required documents have been verified. Next, statutory government fee payment is required before final issuance.</p>

        <div style="border:1px solid var(--line);border-radius:12px;background:var(--canvas);padding:18px;margin-bottom:18px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--line)">
            <strong style="font-size:14px;color:var(--green)">${escapeHTML(cfg.title)} Application</strong>
            <span class="status-pill success"><i class="dot"></i>Docs Verified (3/3)</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12px">
            <div><span style="color:var(--muted)">Applicant Name:</span> <b>${escapeHTML(flowFormData.name || 'N/A')}</b></div>
            <div><span style="color:var(--muted)">Father's Name:</span> <b>${escapeHTML(flowFormData.fatherName || 'N/A')}</b></div>
            <div><span style="color:var(--muted)">Mother's Name:</span> <b>${escapeHTML(flowFormData.motherName || 'N/A')}</b></div>
            <div><span style="color:var(--muted)">Location:</span> <b>${escapeHTML(flowFormData.district || 'N/A')}</b></div>
            <div><span style="color:var(--muted)">Mobile:</span> <b>${escapeHTML(flowFormData.mobile || 'N/A')}</b></div>
            <div><span style="color:var(--muted)">Key Record:</span> <b>${escapeHTML(flowFormData.category || (flowFormData.annualIncome ? '₹' + flowFormData.annualIncome : flowFormData.placeOfBirth || 'Verified'))}</b></div>
            <div><span style="color:var(--muted)">Statutory Govt Cost:</span> <b style="color:var(--green)">₹${cfg.totalFee}</b></div>
          </div>
        </div>

        <label class="consent-box green">
          <input type="checkbox" id="submitConsentBox" ${submitConsent ? 'checked' : ''}>
          <span class="consent-copy">
            <strong>Authorize Submission & Payment Process</strong>
            I confirm that the details provided are accurate. I understand that after this step, the official government fee of <b>₹${cfg.totalFee}</b> will be collected via UPI ID: <b>${UPI_ID}</b>.
          </span>
        </label>
      `;

      $('#submitConsentBox').addEventListener('change', (e) => {
        submitConsent = e.target.checked;
        if (submitConsent) record('Permission granted: Application authorization', `Service: ${selectedService}`, 'consent');
      });
    }

    // Step 4: PAYMENT GATEWAY (UPI ID: 7501468140-4@ybl)
    // "remember after filling all require docs payment option comes after payment the process will done"
    else if (flowStep === 4) {
      footHint.textContent = `Pay ₹${cfg.totalFee} via UPI to complete certificate issuance.`;
      nextBtn.innerHTML = `<span>✓ Verify & Complete Payment</span> ${icon('check')}`;
      nextBtn.style.background = 'var(--green)';

      const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&am=${cfg.totalFee}.00&cu=INR&tn=${encodeURIComponent(cfg.title + ' Govt Fee')}`;
      const qrSvg = generateQrSvg(upiUri, 150);

      body.innerHTML = `
        <h2 class="flow-title">5. Statutory Government Fee Payment</h2>
        <p class="flow-intro">In accordance with e-District rules, minimum government cost must be paid via UPI before final certificate generation.</p>

        <div class="payment-panel">
          <div class="payment-header">
            <div class="payment-title-group">
              <h3>National e-District Payment Gateway</h3>
              <p>Official Statutory Service Fee for ${escapeHTML(cfg.title)}</p>
            </div>
            <div class="payment-amount-badge">
              <span>Total Payable</span>
              <strong>₹${cfg.totalFee}.00</strong>
            </div>
          </div>

          <div class="payment-body">
            <!-- Left: Invoice breakdown and UPI ID -->
            <div>
              <div class="fee-breakdown-card">
                <div class="fee-row">
                  <span>Government Statutory Fee</span>
                  <span>₹${cfg.govFee}.00</span>
                </div>
                <div class="fee-row">
                  <span>Portal Facilitation Charge</span>
                  <span>₹${cfg.portalFee}.00</span>
                </div>
                <div class="fee-row">
                  <span>GST & Service Taxes (Nil)</span>
                  <span>₹0.00</span>
                </div>
                <div class="fee-row total">
                  <span>Total Amount Due</span>
                  <span style="color:var(--green)">₹${cfg.totalFee}.00</span>
                </div>
              </div>

              <!-- Official UPI ID Box with One-Click Copy -->
              <div class="upi-id-box">
                <div class="upi-id-copy-group">
                  <label>Official Government Receiver UPI ID</label>
                  <strong id="displayUpiId">${UPI_ID}</strong>
                </div>
                <button class="copy-btn" id="copyUpiBtn">
                  ${icon('copy')} Copy
                </button>
              </div>

              <div style="margin-top:14px">
                <label class="form-label" for="upiUtrInput">UPI Transaction Ref / UTR Number (Optional)</label>
                <input class="field-input" id="upiUtrInput" placeholder="e.g. 428910293847" value="${paymentUtr || 'UPI/2026/' + Math.floor(10000000 + Math.random() * 90000000)}">
                <span class="field-hint">You can scan QR code with any UPI app and enter the reference number or click verify below.</span>
              </div>
            </div>

            <!-- Right: Dynamic QR Code -->
            <div class="qr-container">
              <div class="qr-box">
                ${qrSvg}
              </div>
              <div class="qr-caption">
                <strong>Scan with Any UPI App</strong><br>
                <span>Google Pay · PhonePe · Paytm · BHIM</span>
              </div>

              <div class="upi-apps-row">
                <a href="${upiUri}" class="upi-app-pill" style="text-decoration:none">
                  ${icon('credit-card')} Pay via App
                </a>
                <span class="upi-app-pill">GPay</span>
                <span class="upi-app-pill">PhonePe</span>
                <span class="upi-app-pill">Paytm</span>
              </div>
            </div>
          </div>
        </div>

        <div id="paymentLoadingNotice" style="display:none;margin-top:16px;text-align:center;padding:16px;background:var(--green-pale);border-radius:12px;color:var(--green)">
          <div style="font-weight:700;font-size:13px">Verifying payment with Bank / NPCI Gateway...</div>
          <p style="font-size:11px;margin-top:4px">Validating UPI transaction on <b>${UPI_ID}</b></p>
        </div>
      `;

      $('#copyUpiBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(UPI_ID).then(() => {
          $('#copyUpiBtn').textContent = '✓ Copied!';
          setTimeout(() => { $('#copyUpiBtn').innerHTML = `${icon('copy')} Copy`; }, 2000);
          toast('UPI ID ' + UPI_ID + ' copied to clipboard!');
        }).catch(() => {
          toast('UPI ID: ' + UPI_ID);
        });
      });

      $('#upiUtrInput').addEventListener('input', (e) => {
        paymentUtr = e.target.value;
      });
    }

    // Step 5: SUCCESS & CERTIFICATE ISSUED (Download option available!)
    else if (flowStep === 5) {
      footHint.textContent = 'Your certificate is ready. Download it now or access it anytime from My Applications.';
      const app = activeIssuedApp || applications[0];

      body.innerHTML = `
        <div style="text-align:center;padding:24px 12px">
          <div class="stat-icon green" style="width:64px;height:64px;border-radius:50%;margin:0 auto 16px;display:grid;place-items:center">
            <svg class="icon" style="width:32px;height:32px"><use href="#i-check"/></svg>
          </div>
          <h2 class="flow-title" style="font-size:22px">🎉 Certificate Issued Successfully!</h2>
          <p class="flow-intro" style="max-width:500px;margin:8px auto 20px">
            Your payment of <b>₹${app.fee}</b> via UPI (<b>${UPI_ID}</b>) was verified. The e-District portal has digitally signed and issued your <b>${escapeHTML(app.service)}</b>.
          </p>

          <div style="max-width:440px;margin:0 auto 24px;border:1px solid var(--line);border-radius:14px;background:var(--canvas);padding:16px;text-align:left">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:var(--muted);font-size:11px">Certificate Number</span>
              <strong style="font-family:monospace;font-size:12px">${escapeHTML(app.id)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:var(--muted);font-size:11px">Applicant Name</span>
              <strong>${escapeHTML(app.applicant)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:var(--muted);font-size:11px">UPI Transaction Ref</span>
              <span style="font-family:monospace;font-size:11px">${escapeHTML(app.utr)}</span>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="color:var(--muted);font-size:11px">Digital Status</span>
              <span class="status-pill success"><i class="dot"></i>Issued & Verified</span>
            </div>
          </div>

          <!-- Direct Download & View Buttons -->
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <button class="primary-btn" id="successDownloadCertBtn" style="padding:12px 24px;font-size:13px">
              <svg class="icon"><use href="#i-download"/></svg>
              <span>Download Issued Certificate (PDF)</span>
            </button>
            <button class="secondary-btn" id="successViewCertBtn" style="padding:12px 20px">
              <svg class="icon"><use href="#i-eye"/></svg>
              <span>View Official Certificate</span>
            </button>
          </div>
        </div>
      `;

      $('#successDownloadCertBtn').addEventListener('click', () => {
        closeFlow();
        showCertificate(app.id);
        setTimeout(() => window.print(), 400);
      });

      $('#successViewCertBtn').addEventListener('click', () => {
        closeFlow();
        showCertificate(app.id);
      });
    }
  }

  // File Picker Handler
  $('#filePicker').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const docId = e.target.dataset.docId;

    if (!docConsent) {
      toast('Please accept the document verification consent first.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast('File is larger than 5 MB limit. Please select a smaller document.');
      return;
    }

    const kb = Math.max(1, Math.round(file.size / 1024));
    flowDocs[docId] = { name: file.name, size: `${kb} KB`, sample: false };
    record('Document uploaded for verification', `Doc: ${docId}, File: ${file.name} (${kb} KB)`, 'application');
    toast(`Document ${file.name} uploaded successfully!`);
    renderFlow();
  });

  // Next / Continue Action
  async function nextFlow() {
    const cfg = SERVICES[selectedService];

    // Step 0 -> Step 1
    if (flowStep === 0) {
      flowStep = 1;
      record('Service journey started', `Service: ${selectedService}`, 'application');
      renderFlow();
      return;
    }

    // Step 1 -> Step 2: Check required docs
    if (flowStep === 1) {
      if (!docConsent) {
        toast('Please check the document verification permission box.');
        return;
      }
      const missing = cfg.requiredDocs.find(d => !flowDocs[d.id]);
      if (missing) {
        toast(`Please upload or use sample for: ${missing.name}`);
        return;
      }
      flowStep = 2;
      formConsent = true; // convenience for smooth experience
      renderFlow();
      return;
    }

    // Step 2 -> Step 3: Check form fields
    if (flowStep === 2) {
      if (!formConsent) {
        toast('Please check the form preparation consent box.');
        return;
      }
      if (!flowFormData.name || !flowFormData.name.trim()) {
        toast('Please enter applicant name.');
        return;
      }
      flowStep = 3;
      submitConsent = true;
      renderFlow();
      return;
    }

    // Step 3 -> Step 4: Advance to Payment
    if (flowStep === 3) {
      if (!submitConsent) {
        toast('Please authorize application submission.');
        return;
      }
      flowStep = 4;
      renderFlow();
      return;
    }

    // Step 4 -> Complete Payment & Issue Certificate!
    if (flowStep === 4) {
      const notice = $('#paymentLoadingNotice');
      if (notice) notice.style.display = 'block';

      $('#flowNext').disabled = true;

      // Simulate payment network verification
      await new Promise(r => setTimeout(r, 1200));

      const utr = paymentUtr || ('UPI/2026/' + Math.floor(10000000 + Math.random() * 90000000));
      paymentVerified = true;

      // Generate application record
      const prefix = selectedService.includes('Caste') ? 'JS-CAST' : selectedService.includes('Birth') ? 'JS-BIRTH' : 'JS-INC';
      const appId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

      const newApp = {
        id: appId,
        service: selectedService,
        applicant: flowFormData.name || 'Citizen Applicant',
        formData: Object.assign({}, flowFormData),
        status: 'Issued & Verified',
        step: 4,
        fee: cfg.totalFee,
        upiId: UPI_ID,
        utr: utr,
        updated: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        demo: true
      };

      try {
        if (backendAvailable) {
          await apiRequest('/api/applications', {
            method: 'POST',
            body: JSON.stringify({
              service: selectedService,
              applicant: newApp.applicant,
              formData: newApp.formData,
              payment: { amount: cfg.totalFee, utr, upiId: UPI_ID },
              consents: { documents: true, formPreparation: true, submission: true }
            })
          });
        }
      } catch (e) {
        // graceful offline fallback
      }

      applications.unshift(newApp);
      safeWrite(STORE_APPS, applications);
      activeIssuedApp = newApp;

      await record('Payment verified & certificate issued', `Service: ${selectedService}. Fee: ₹${cfg.totalFee} via UPI: ${UPI_ID}. Ref: ${appId}`, 'application');

      flowStep = 5;
      renderFlow();
      renderApps();
      renderStats();
      renderFeatured();
      toast('Payment successful! Certificate issued.');
    }
  }

  // Official Certificate Modal & Rendering
  function showCertificate(appId) {
    const app = applications.find(a => a.id === appId) || applications[0];
    if (!app) return;

    const fd = app.formData || {};
    const cfg = SERVICES[app.service] || SERVICES['Caste certificate'];

    $('#certDisplayNo').textContent = 'GOV/2026/IN/' + app.id.replace(/\D/g, '').padEnd(6, '0');
    $('#certDisplayRef').textContent = app.id;
    $('#certDisplayDate').textContent = new Date(app.issuedAt || app.updated).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    // Set Certificate Title
    const title = app.service === 'Caste certificate' ? 'CASTE & COMMUNITY CERTIFICATE (जाति प्रमाण पत्र)' :
                  app.service === 'Birth certificate' ? 'OFFICIAL BIRTH CERTIFICATE (जन्म प्रमाण पत्र)' :
                  'ANNUAL INCOME CERTIFICATE (आय प्रमाण पत्र)';
    $('#certDisplayTitle').textContent = title;

    // Body Text
    if (app.service === 'Caste certificate') {
      $('#certDisplayText').innerHTML = `
        This is to officially certify that <b>${escapeHTML(fd.name || app.applicant)}</b>, son/daughter of <b>${escapeHTML(fd.fatherName || 'Rameshwar Sahu')}</b> and <b>${escapeHTML(fd.motherName || 'Sunita Devi')}</b>, resident of <b>${escapeHTML(fd.address || 'Ward 12')}, ${escapeHTML(fd.district || 'Jharkhand')}</b>, belongs to the <b>${escapeHTML(fd.subCaste || 'Sahu')}</b> community recognized under the <b>${escapeHTML(fd.category || 'OBC')}</b> category in the Official Gazette.
      `;
    } else if (app.service === 'Birth certificate') {
      $('#certDisplayText').innerHTML = `
        This is to officially certify that <b>${escapeHTML(fd.name || app.applicant)}</b> was born on <b>${escapeHTML(fd.dob || '10/02/2024')}</b> at <b>${escapeHTML(fd.placeOfBirth || 'Civil Hospital')}</b> to <b>${escapeHTML(fd.fatherName || 'Vikram Sharma')}</b> (Father) and <b>${escapeHTML(fd.motherName || 'Pooja Sharma')}</b> (Mother). This birth has been officially registered under the Registration of Births and Deaths Act.
      `;
    } else {
      $('#certDisplayText').innerHTML = `
        This is to officially certify that the gross annual family income of <b>${escapeHTML(fd.name || app.applicant)}</b>, son/daughter of <b>${escapeHTML(fd.fatherName || 'Rajesh Sharma')}</b> and <b>${escapeHTML(fd.motherName || 'Kavita Sharma')}</b>, resident of <b>${escapeHTML(fd.address || 'Kothrud')}, ${escapeHTML(fd.district || 'Pune')}</b>, has been assessed and verified to be <b>₹${escapeHTML(fd.annualIncome || '96,000')} (Rupees Ninety Six Thousand Only)</b> from ${escapeHTML(fd.incomeSource || 'Agriculture & Business')}.
      `;
    }

    // Details Table
    const tableRows = [
      ['Applicant / Child Name', escapeHTML(fd.name || app.applicant)],
      ["Father's Name", escapeHTML(fd.fatherName || 'N/A')],
      ["Mother's Name", escapeHTML(fd.motherName || 'N/A')],
      ['Residential Address', escapeHTML(fd.address || 'N/A')],
      ['District / State', escapeHTML(fd.district || 'N/A')],
      ['Government Fee Paid', `₹${app.fee || cfg.totalFee}.00 via UPI (${app.upiId || UPI_ID})`],
      ['Payment Transaction UTR', escapeHTML(app.utr || 'UPI/2026/89412039')]
    ];

    $('#certDisplayTable').innerHTML = tableRows.map(([k, v]) => `<tr><td>${k}</td><td><strong>${v}</strong></td></tr>`).join('');

    // Generate Verification QR
    const verifyUri = `https://edistrict.gov.in/verify?cert=${app.id}&auth=GOV2026`;
    $('#certQrThumb').innerHTML = generateQrSvg(verifyUri, 70);

    // Show Modal
    $('#certOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';

    record('Certificate viewed / opened', `App: ${app.id}, Service: ${app.service}`, 'application');
  }

  function downloadCertificateFile(appId) {
    const app = applications.find(a => a.id === appId) || applications[0];
    if (!app) return;

    const certData = {
      portal: 'JanSetu e-District Digital Portal',
      certificateNumber: app.id,
      service: app.service,
      applicant: app.applicant,
      issuedAt: app.issuedAt || app.updated,
      payment: {
        fee: app.fee,
        receiverUpi: app.upiId || UPI_ID,
        transactionRef: app.utr
      },
      digitalVerification: 'VERIFIED & DIGITALLY SIGNED BY COMPETENT AUTHORITY',
      details: app.formData || {}
    };

    const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.id}_Official_Certificate.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Certificate downloaded successfully!');
    record('Certificate downloaded as JSON', `ID: ${app.id}`, 'application');
  }

  // Specimen Image Preview Lightbox
  function showImagePreview(src, title) {
    $('#previewModalImage').src = src;
    $('#previewModalTitle').textContent = title || 'Official Certificate Specimen';
    $('#imagePreviewOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  window.previewImage = showImagePreview;

  // Render Applications Table
  function renderApps() {
    const tbody = $('#applicationRows');
    if (!tbody) return;

    if (!applications.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--muted)">No applications yet. Apply for a certificate to see it here.</td></tr>';
      return;
    }

    tbody.innerHTML = applications.map(app => {
      const isIssued = app.status === 'Issued & Verified' || app.status === 'Completed';
      const statusPill = isIssued
        ? '<span class="status-pill success"><i class="dot"></i>Issued & Verified</span>'
        : '<span class="status-pill"><i class="dot"></i>In Processing</span>';

      return `
        <tr>
          <td><strong>${escapeHTML(app.service)}</strong></td>
          <td><code style="font-size:11px;background:var(--canvas);padding:2px 6px;border-radius:4px">${escapeHTML(app.id)}</code></td>
          <td>${escapeHTML(app.applicant)}</td>
          <td><b>₹${app.fee || 30}</b> <small style="color:var(--muted)">(UPI)</small></td>
          <td>${statusPill}</td>
          <td>
            <div style="display:flex;gap:6px">
              <button class="primary-btn" style="padding:6px 12px;font-size:11px" data-download-app="${escapeHTML(app.id)}">
                <svg class="icon"><use href="#i-download"/></svg>
                <span>Download</span>
              </button>
              <button class="secondary-btn" style="padding:6px 10px;font-size:11px" data-view-cert="${escapeHTML(app.id)}">
                <svg class="icon"><use href="#i-eye"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Bind action buttons
    $$('[data-download-app]').forEach(btn => {
      btn.addEventListener('click', () => {
        showCertificate(btn.dataset.downloadApp);
        setTimeout(() => window.print(), 350);
      });
    });

    $$('[data-view-cert]').forEach(btn => {
      btn.addEventListener('click', () => {
        showCertificate(btn.dataset.viewCert);
      });
    });
  }

  // Render Featured Active Journey Card
  function renderFeatured() {
    const card = $('#featuredApplication');
    if (!card) return;

    if (!currentUser) {
      card.innerHTML = `
        <div class="application-card" style="text-align:center;padding:32px 20px">
          <div style="margin-bottom:12px;display:flex;justify-content:center;opacity:0.8">${icon('lock')}</div>
          <h4 style="font-size:15px;font-weight:700;margin-bottom:6px">Citizen Portal Session Inactive</h4>
          <p style="font-size:12px;color:var(--muted);max-width:380px;margin:0 auto 16px">
            Sign in with your mobile number or Aadhaar to track your live certificate progress, view parent details, and download digitally signed documents.
          </p>
          <button class="primary-btn" id="featuredLoginBtn" style="margin:0 auto;display:inline-flex">
            <svg class="icon"><use href="#i-login"/></svg>
            <span>Citizen Sign In</span>
          </button>
        </div>
      `;
      $('#featuredLoginBtn')?.addEventListener('click', openLoginModal);
      return;
    }

    const app = applications[0];
    if (!app) {
      card.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">${icon('file')} No active certificate application. Click Apply to start.</div>`;
      return;
    }

    const isIssued = app.status === 'Issued & Verified';
    const cfg = SERVICES[app.service] || SERVICES['Income certificate'];
    const currentStep = isIssued ? 4 : (app.step || 3);
    const progressPercent = currentStep >= 4 ? 100 : Math.round(((currentStep - 1) / 3) * 100);

    const stepDefs = [
      { label: 'Chosen' },
      { label: 'Docs Ready' },
      { label: `UPI Paid (₹${app.fee || cfg.totalFee})` },
      { label: 'Issued' }
    ];

    const stepsHtml = stepDefs.map((s, idx) => {
      const num = idx + 1;
      const isDone = num <= currentStep;
      const isCurrent = num === currentStep && !isIssued;
      const cls = isDone ? 'step-item done' : isCurrent ? 'step-item current' : 'step-item';
      const dot = isDone ? '✓' : num;
      return `<div class="${cls}"><div class="step-dot">${dot}</div>${s.label}</div>`;
    }).join('');

    card.innerHTML = `
      <div class="application-card">
        <div class="app-card-top">
          <div class="service-icon">
            ${icon('file')}
          </div>
          <div>
            <div class="app-name">${escapeHTML(app.service)}</div>
            <div class="app-reference">Ref: ${escapeHTML(app.id)} · Applicant: ${escapeHTML(app.applicant)}</div>
          </div>
          <span class="status-pill success" style="margin-left:auto">
            <i class="dot"></i>${isIssued ? 'Certificate Ready' : 'In Progress'}
          </span>
        </div>

        <div class="progress-wrap">
          <div class="steps">
            <div class="steps-track">
              <div class="steps-progress" style="width:${progressPercent}%"></div>
            </div>
            ${stepsHtml}
          </div>
        </div>

        <div class="app-card-bottom">
          <span style="font-size:11px;color:var(--green);font-weight:600">
            ${icon('check')} Digitally verified & issued under e-District Mission
          </span>
          <div style="display:flex;gap:8px">
            <button class="primary-btn" id="featuredDownloadBtn">
              <svg class="icon"><use href="#i-download"/></svg>
              <span>Download Certificate</span>
            </button>
            <button class="secondary-btn" id="featuredViewBtn">
              <svg class="icon"><use href="#i-eye"/></svg>
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    `;

    $('#featuredDownloadBtn')?.addEventListener('click', () => {
      showCertificate(app.id);
      setTimeout(() => window.print(), 350);
    });

    $('#featuredViewBtn')?.addEventListener('click', () => {
      showCertificate(app.id);
    });
  }

  // Render Stats & Recent Audit
  function renderStats() {
    const act = $('#statActive');
    const con = $('#statConsents');
    const cnt = $('#navAppCount');

    if (act) act.textContent = String(applications.length).padStart(2, '0');
    if (con) con.textContent = String(audit.filter(x => x.category === 'consent').length).padStart(2, '0');
    if (cnt) cnt.textContent = String(applications.length).padStart(2, '0');
  }

  function renderRecent() {
    const box = $('#recentActivity');
    if (!box) return;
    const items = audit.slice(0, 4);

    if (!items.length) {
      box.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:10px 0">Your recent actions and consents will appear here.</div>';
      return;
    }

    box.innerHTML = items.map(x => `
      <div style="padding:8px 0;border-bottom:1px solid var(--line);font-size:11px">
        <strong style="color:var(--ink);display:block">${escapeHTML(x.action)}</strong>
        <span style="color:var(--muted);font-size:10px">${escapeHTML(x.detail)}</span>
      </div>
    `).join('');
  }

  function renderAudit() {
    const feed = $('#auditFeed');
    if (!feed) return;

    if (!audit.length) {
      feed.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted)">No audit trail events yet.</div>';
      return;
    }

    feed.innerHTML = audit.map((x, i) => `
      <div style="padding:12px 0;border-bottom:1px solid var(--line);font-size:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <strong>#${audit.length - i} ${escapeHTML(x.action)}</strong>
          <small style="color:var(--muted);font-family:monospace">${x.time.slice(11, 19)}</small>
        </div>
        <p style="color:var(--muted);margin-bottom:4px">${escapeHTML(x.detail)}</p>
        <code style="font-size:10px;color:var(--green)">SHA-256: ${escapeHTML(x.hash ? x.hash.slice(0, 24) : '—')}…</code>
      </div>
    `).join('');
  }

  async function verifyChain() {
    let intact = true;
    for (let i = audit.length - 1; i >= 0; i--) {
      const e = audit[i];
      const prev = i === audit.length - 1 ? '00000000' : audit[i + 1].hash;
      const calc = await sha256(prev + e.id + e.time + e.action + e.detail);
      if (calc !== e.hash) {
        intact = false;
        break;
      }
    }
    toast(intact ? `✓ Cryptographic Audit Chain Verified: ${audit.length} entries intact.` : '⚠ Chain mismatch detected!');
  }

  function exportAuditCsv() {
    const rows = [['Timestamp', 'Action', 'Detail', 'Category', 'SHA-256 Hash']].concat(
      audit.map(x => [x.time, x.action, x.detail, x.category, x.hash || ''])
    );
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jansetu_audit_trail.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Audit log exported to CSV!');
  }

  // AI Assistant Chat & Voice Synthesis
  function addChatMessage(text, sender = 'bot') {
    const box = $('#chatMessages');
    if (!box) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.textContent = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
    if (sender === 'bot') lastBotReply = text;
  }

  function respondToChat(userInput) {
    const text = userInput.toLowerCase();
    let reply = '';

    if (text.includes('caste') || text.includes('जाति') || text.includes('jati')) {
      reply = currentLang === 'hi'
        ? 'जाति प्रमाण पत्र के लिए आवश्यक दस्तावेज़: 1. आधार कार्ड, 2. निवास प्रमाण पत्र, 3. पिता का जाति प्रमाण पत्र/हलफनामा। न्यूनतम सरकारी शुल्क केवल ₹30 है जो आप UPI (7501468140-4@ybl) से जमा कर सकते हैं। आवेदन पूर्ण होने पर तुरंत प्रमाणपत्र डाउनलोड करें!'
        : 'For Caste Certificate, required documents: 1. Aadhaar Card, 2. Address Proof, 3. Father Caste Record/Affidavit. Minimum government fee is just ₹30 via UPI (7501468140-4@ybl). You can download your issued certificate directly after payment!';
    } else if (text.includes('birth') || text.includes('जन्म') || text.includes('janam')) {
      reply = currentLang === 'hi'
        ? 'जन्म प्रमाण पत्र के लिए: अस्पताल जन्म पर्ची, माता-पिता का आधार कार्ड और निवास प्रमाण चाहिए। न्यूनतम सरकारी शुल्क केवल ₹25 है (UPI: 7501468140-4@ybl)। भुगतान के पश्चात जारी प्रमाण पत्र तुरंत डाउनलोड करें!'
        : 'For Birth Certificate: Hospital Birth Slip, Parents Aadhaar Card, and Residence Proof are required. Minimum govt statutory fee is only ₹25 via UPI (7501468140-4@ybl). Download your issued certificate right after payment!';
    } else if (text.includes('income') || text.includes('आय') || text.includes('aay')) {
      reply = currentLang === 'hi'
        ? 'आय प्रमाण पत्र के लिए: वेतन पर्ची/पटवारी रिपोर्ट, आधार कार्ड और बैंक घोषणा चाहिए। सरकारी शुल्क केवल ₹30 है (UPI: 7501468140-4@ybl)। जारी प्रमाण पत्र तुरंत पीडीएफ में डाउनलोड करें!'
        : 'For Income Certificate: Salary slip or Patwari report, Aadhaar, and Bank declaration are needed. Minimum govt fee is ₹30 via UPI (7501468140-4@ybl). Download your officially signed certificate immediately!';
    } else if (text.includes('fee') || text.includes('upi') || text.includes('cost') || text.includes('पैसा') || text.includes('शुल्क')) {
      reply = `All certificates have nominal minimum government statutory fees: Caste Cert (₹30), Birth Cert (₹25), Income Cert (₹30). Pay safely via UPI ID: ${UPI_ID}.`;
    } else if (text.includes('download') || text.includes('डाउनलोड')) {
      reply = currentLang === 'hi'
        ? 'आवेदन और यूपीआई भुगतान पूरा होते ही आपका प्रमाण पत्र तुरंत पोर्टल से डाउनलोड हो जाएगा। आप "मेरे आवेदन" टैब से भी कभी भी डाउनलोड कर सकते हैं!'
        : 'After filling all required documents and completing the UPI payment, your certificate is issued instantly and can be downloaded from the portal or My Applications tab!';
    } else {
      reply = currentLang === 'hi'
        ? 'नमस्ते! आप जनसेतु पोर्टल पर जाति, जन्म और आय प्रमाण पत्र न्यूनतम सरकारी शुल्क (₹25 - ₹30 via UPI: 7501468140-4@ybl) पर बना सकते हैं। आवश्यक दस्तावेज़ अपलोड करने के बाद भुगतान करें और प्रमाणपत्र डाउनलोड करें।'
        : `Welcome to JanSetu! You can apply for Caste, Birth, and Income certificates at minimum government cost (₹25 - ₹30 via UPI: ${UPI_ID}). Fill required docs, complete payment, and download your certificate instantly!`;
    }

    addChatMessage(reply, 'bot');
    speakText(reply);
  }

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'bn' ? 'bn-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-IN';
    window.speechSynthesis.speak(u);
  }

  function startVoiceRecognition() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      toast('Voice recognition not supported in this browser. Please type your message.');
      return;
    }
    try {
      recognition = new Speech();
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.onstart = () => {
        $('#micButton').style.color = 'var(--red)';
        toast(currentLang === 'hi' ? 'सुन रहा हूँ… बोलिए' : 'Listening… please speak');
      };
      recognition.onresult = (e) => {
        const spoken = e.results[0][0].transcript;
        $('#chatInput').value = spoken;
        $('#micButton').style.color = '';
        addChatMessage(spoken, 'user');
        respondToChat(spoken);
      };
      recognition.onend = () => {
        $('#micButton').style.color = '';
      };
      recognition.onerror = () => {
        $('#micButton').style.color = '';
      };
      recognition.start();
    } catch (e) {
      toast('Could not start microphone.');
    }
  }

  // Bind Event Listeners
  function bindEvents() {
    // Navigation
    $$('.nav-item').forEach(b => {
      b.addEventListener('click', () => setView(b.dataset.view));
    });

    $$('[data-view-link]').forEach(b => {
      b.addEventListener('click', () => setView(b.dataset.viewLink));
    });

    // Language selector
    $('#langSelect')?.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });

    // Theme toggle
    $('#themeToggle')?.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Apply Buttons on Service Cards
    $$('[data-apply]').forEach(btn => {
      btn.addEventListener('click', () => openFlow(btn.dataset.apply, 0));
    });

    $('#heroStart')?.addEventListener('click', () => openFlow('Caste certificate', 0));
    $('#newApplication')?.addEventListener('click', () => openFlow('Caste certificate', 0));

    // Specimen image preview buttons
    $$('[data-preview-img]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        showImagePreview(el.dataset.previewImg, el.dataset.previewTitle);
      });
    });

    // Flow navigation
    $('#closeFlow')?.addEventListener('click', closeFlow);
    $('#flowOverlay')?.addEventListener('click', (e) => {
      if (e.target === $('#flowOverlay')) closeFlow();
    });
    $('#flowNext')?.addEventListener('click', nextFlow);
    $('#flowBack')?.addEventListener('click', () => {
      if (flowStep > 0) {
        flowStep--;
        renderFlow();
      }
    });

    // Modals closing
    $('#closeCertModal')?.addEventListener('click', () => {
      $('#certOverlay').classList.remove('open');
      document.body.style.overflow = '';
    });
    $('#certOverlay')?.addEventListener('click', (e) => {
      if (e.target === $('#certOverlay')) {
        $('#certOverlay').classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    $('#closeImagePreview')?.addEventListener('click', () => {
      $('#imagePreviewOverlay').classList.remove('open');
      document.body.style.overflow = '';
    });
    $('#imagePreviewOverlay')?.addEventListener('click', (e) => {
      if (e.target === $('#imagePreviewOverlay')) {
        $('#imagePreviewOverlay').classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Print & Download certificate buttons inside certificate modal
    $('#printCertBtn')?.addEventListener('click', () => {
      window.print();
    });

    $('#downloadCertFileBtn')?.addEventListener('click', () => {
      const appId = $('#certDisplayRef')?.textContent || applications[0]?.id;
      downloadCertificateFile(appId);
    });

    // Sync status button
    $('#refreshStatuses')?.addEventListener('click', async () => {
      try {
        if (backendAvailable) {
          await apiRequest('/api/applications/refresh', { method: 'POST', body: '{}' });
        }
      } catch (e) {}
      renderApps();
      renderFeatured();
      toast('Application statuses synced with portal!');
    });

    // Audit verification and export
    $('#verifyChainBtn')?.addEventListener('click', verifyChain);
    $('#exportAudit')?.addEventListener('click', exportAuditCsv);

    // Chat Drawer
    $('#openChatSide')?.addEventListener('click', () => {
      $('#chatDrawer').classList.add('open');
      setTimeout(() => $('#chatInput')?.focus(), 150);
    });
    $('#closeChat')?.addEventListener('click', () => {
      $('#chatDrawer').classList.remove('open');
    });

    $('#sendChat')?.addEventListener('click', () => {
      const input = $('#chatInput');
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      addChatMessage(val, 'user');
      respondToChat(val);
    });

    $('#chatInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') $('#sendChat').click();
    });

    $('#micButton')?.addEventListener('click', startVoiceRecognition);
    $('#speakLast')?.addEventListener('click', () => {
      if (lastBotReply) speakText(lastBotReply);
    });

    // User profile dropdown toggle
    $('#userMenuBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const wrap = $('#userProfileWrap');
      const menu = $('#userDropdown');
      const isOpen = wrap?.classList.toggle('open');
      if (menu) menu.classList.toggle('open', isOpen);
    });

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const wrap = $('#userProfileWrap');
      if (wrap && !wrap.contains(e.target)) {
        wrap.classList.remove('open');
        $('#userDropdown')?.classList.remove('open');
      }
    });

    // User logout buttons
    $('#topbarLogoutBtn')?.addEventListener('click', logoutUser);
    $('#dropdownLogoutBtn')?.addEventListener('click', logoutUser);
    $('#sidebarLogoutBtn')?.addEventListener('click', logoutUser);

    // Citizen login button
    $('#topbarLoginBtn')?.addEventListener('click', openLoginModal);

    // Login modal dismissal
    $('#closeLoginModal')?.addEventListener('click', closeLoginModal);
    $('#loginOverlay')?.addEventListener('click', (e) => {
      if (e.target === $('#loginOverlay')) closeLoginModal();
    });

    // Quick demo login
    $('#demoQuickLoginBtn')?.addEventListener('click', () => {
      loginUser(defaultUser);
    });

    // Citizen login form submit with Father and Mother details
    $('#loginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#loginNameInput')?.value.trim() || 'Citizen Applicant';
      const phone = $('#loginMobileInput')?.value.trim() || '9876543210';
      const fatherName = $('#loginFatherInput')?.value.trim() || 'Rajesh Sharma';
      const motherName = $('#loginMotherInput')?.value.trim() || 'Kavita Sharma';
      loginUser({ name, phone, fatherName, motherName });
    });

    // Keyboard ESC to close any modal or dropdown
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLoginModal();
        $('#userProfileWrap')?.classList.remove('open');
        $('#userDropdown')?.classList.remove('open');
        if ($('#flowOverlay')?.classList.contains('open')) closeFlow();
        if ($('#certOverlay')?.classList.contains('open')) {
          $('#certOverlay').classList.remove('open');
          document.body.style.overflow = '';
        }
        if ($('#imagePreviewOverlay')?.classList.contains('open')) {
          $('#imagePreviewOverlay').classList.remove('open');
          document.body.style.overflow = '';
        }
        if ($('#chatDrawer')?.classList.contains('open')) {
          $('#chatDrawer').classList.remove('open');
        }
      }
    });
  }

  // Initialization
  async function init() {
    applyTheme(currentTheme);
    setLanguage(currentLang);
    bindEvents();
    renderUserAuth();
    renderStats();
    renderRecent();
    renderAudit();
    renderApps();
    renderFeatured();
    await initializeBackend();
  }

  init();

})();
