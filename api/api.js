import { env } from "./../env/env";

const api = {
  devBaseUrl: "http://203.122.46.189:8061/",
  routes: {
    authenticate: {
      devUrl: "api/jwt/v1/authenticate",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { clientId: "leadgenerateapi", clientSecret: "mmm@2O!9" },
    },
    masters: {
      devUrl: "masters/api/master/v1/masters",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: {},
    },
    generateOtp: {
      devUrl: "notification/api/notification/v1/sms/otp",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { mobileNo: "" },
    },
    verifyOtp: {
      devUrl: "notification/api/notification/v1/sms/otp/verify",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { mobileNo: "", otp: "", otpId: "" },
    },
    sendNotification: {
      devUrl: "notification/api/notification/v1/sms-email/send",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { actionName: "", leadId: "" },
    },
    offers: {
      devUrl: "api/customer/v1/profile/",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { mobileNo: "9999000090", customerId: "9999000090" },
        },
      },
    },
    bank: {
      devUrl: "masters/api/master/v1/bank",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    company: {
      devUrl: "masters/api/master/v1/company",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    cities: {
      devUrl: "masters/api/master/v1/cities",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    pincode: {
      devUrl: "masters/api/master/v2/pincode",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "", bankId: "" },
    },
    designation: {
      devUrl: "masters/api/master/v1/designation",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "", bankId: "", productId: "" },
    },
    qualification: {
      devUrl: "masters/api/master/v1/qualification",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    project: {
      devUrl: "masters/api/master/v1/project",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    occupancyStatus: {
      devUrl: "masters/api/master/v1/occupancyStatus",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    purposeOfLoan: {
      devUrl: "masters/api/master/v1/purpose-of-loan",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "", productId: "" },
    },
    profession: {
      devUrl: "masters/api/master/v1/profession",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" },
    },
    leadProductDecision: {
      devUrl: "lead/api/lead/v1/product/decision",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { leadId: "", bankId: "", productId: "", productTypeId: "" },
    },
    documentUpload: {
      devUrl: "utility/api/utility/document/v1/savedocument",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        channelName: "MOBILEAPP",
        caseId: "1001013258",
        insertFlag: "Y",
        docList: [],
      },
    },
    orchestration: {
      devUrl: "orchestration/api/v1/lead",
      uatUrl: "api/lead/v1/",
      prodUrl: "api/master/v1/",
      body: {
        personal: {
          title: "",
          fullName: "",
          middleName: "",
          dob: "",
          gender: "",
          maritalStatus: "",
          nationality: "",
          dependents: "",
          pan: "",
        },
        contact: {
          mobile: [
            {
              addressTypeMasterId: "1",
              mobile: "",
              isDefault: "Y",
            },
          ],
          email: [
            {
              addressTypeMasterId: "5",
              email: "",
              isDefault: "Y",
            },
            {
              addressTypeMasterId: "6",
              email: "",
              isDefault: "N",
            },
          ],
          keyContact: [],
        },
        work: {
          applicantType: "",
          otherCompany: "",
          nature: "",
          companyId: "",
          typeOfCompaY: "",
          netMonthlyIncome: "",
          grossMonthlyIncome: "100000",
          modeOfSalary: "",
          yearsCurrentJob: "",
          totalWorkExp: "",
          annualTurnover: "",
          annualIncome: "",
          monthlyRental: "",
          designation: "",
          qualification: "",
          profession: "",
        },
        requestedLoanamount: "",
        requestedTenor: "",
        purposeOfLoan: "",
        bankId: "",
        leadId: "",
        productId: "",
        cardAge: "",
        cardType: "",
        loanStartYear: "",
        totalExisTenor: "",
        offerId: "",
        utmCampaign: "",
        utmMedium: "",
        utmSource: "",
        utmRemark: "",
        subQueue: "",
        source: "",
        existingFacility: [
          {
            exisTenorBalMonths: "",
            exisfacility: "",
            exisBankId: "",
            exisLoanAmount: "",
            exisEmi: "",
            exisRemark: "",
          },
        ],
        address: [
          {
            addressTypeMasterId: "1000000001",
            addressline1: "",
            addressline2: "",
            addressline3: "",
            city: "",
            state: "",
            pincode: "",
            occupancyStatus: "",
            livingSince: "",
            stdCode: "",
            landline: "",
            landmark: "",
            livingSinceMM: "",
            isMaillingAddress: "",
            propertyName: "",
            developerName: "",
            projectrName: "",
            remarks: "",
            otherDeveloperName: "",
            otherProjectName: "",
            propertyValue: "",
          },
        ],
      },
    },
    viewOffers: {
      devUrl: "customer/api/customer/v1/view-offers",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { customerId: "9999000090", productId: "" },
    },
    saveOffers: {
      devUrl: "customer/api/customer/v1/profile/save-offers",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { customerId: "9999000090", offerId: "" },
    },
    blogLikeDislike: {
      devUrl: "customer/api/blog/v1/blog-sentiment",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { blogId: "", customerId: "", sentiment: "" },
    },
    getBlogs: {
      devUrl: "customer/api/blog/v1/blog",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {},
    },
    commentLikeDislike: {
      devUrl: "customer/api/blog/v1/comment-sentiment",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { blogId: "", customerId: "", commentId: "", sentiment: "" },
    },
    addComment: {
      devUrl: "customer/api/blog/v1/comment",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { blogId: "", customerId: "", comment: "" },
    },
    shareBlog: {
      devUrl: "customer/api/blog/v1/shared",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { blogId: "", customerId: "", shared: "" },
    },
    login: {
      devUrl: "customer/api/profile/v1/login",
      uatUrl: "customer/api/profile/v1/login",
      prodUrl: "customer/api/profile/v1/login",
      body: {
        mobileNo: null,
      },
    },

    signUp: {
      devUrl: "customer/api/profile/v1/sign-up",
      uatUrl: "customer/api/profile/v1/sign-up",
      prodUrl: "customer/api/profile/v1/sign-up",
      body: {
        firstName: "",
        lastName: "",
        gender: null,
        martialStatus: null,
        panNo: "",
        mobileNo: null,
        emailId: "",
        token: "",
        tokenType: "",
      },
    },
    socialLogin: {
      devUrl: "customer/api/profile/v1/social-login",
      uatUrl: "customer/api/profile/v1/social-login",
      prodUrl: "customer/api/profile/v1/social-login",
      body: {
        emailId: "",
        token: "",
        tokenType: "",
      },
    },
    loginOtpVerify: {
      devUrl: "customer/api/profile/v1/otp-verify",
      uatUrl: "customer/api/profile/v1/otp-verify",
      prodUrl: "customer/api/profile/v1/otp-verify",
      body: {
        mobileNo: "",
        otp: "",
        otpId: "",
      },
    },

    getPersonalInfo: {
      devUrl: "customer/api/profile/v1/personal-info",
      uatUrl: "customer/api/profile/v1/personal-info",
      prodUrl: "customer/api/profile/v1/personal-info",
      body: {},
    },
    contactProfile: {
      devUrl: "customer/api/profile/v1/contact-Info",
      uatUrl: "customer/api/profile/v1/contact-Info",
      prodUrl: "customer/api/profile/v1/contact-Info",
      body: {
        customerId: null,
        mobileNo: null,
        emailId: "",
        address: null,
      },
    },
    workProfile: {
      devUrl: "customer/api/profile/v1/work-info",
      uatUrl: "customer/api/profile/v1/work-info",
      prodUrl: "customer/api/profile/v1/work-info",
      body: {
        customerId: null,
        employedType: null,
        companyId: null,
        netMonthlyIncome: null,
        bankName: null,
        accountNo: null,
        ifscCode: null,
      },
    },
    savePersonalInfo: {
      devUrl: "customer/api/profile/v1/personal-info",
      uatUrl: "customer/api/profile/v1/personal-info",
      prodUrl: "customer/api/profile/v1/personal-info",
      body: {
        customerId: null,
        firstName: null,
        lastName: null,
        gender: null,
        martialStatus: null,
        panNo: null,
        dob: null,
      },
    },
    creditProfileScore: {
      devUrl: "utility/api/credit-profile/v1/score",
      uatUrl: "utility/api/credit-profile/v1/score",
      prodUrl: "utility/api/credit-profile/v1/score",
      body: {
        customerId: null,
      },
    },
    creditProfileAccounts: {
      devUrl: "utility/api/credit-profile/v1/credit-account",
      uatUrl: "utility/api/credit-profile/v1/credit-account",
      prodUrl: "utility/api/credit-profile/v1/credit-account",
      body: {
        customerId: null,
      },
    },
    creditProfileAge: {
      devUrl: "utility/api/credit-profile/v1/credit-age",
      uatUrl: "utility/api/credit-profile/v1/credit-age",
      prodUrl: "utility/api/credit-profile/v1/credit-age",
      body: {
        customerId: null,
      },
    },
    creditProfileEnquiries: {
      devUrl: "utility/api/credit-profile/v1/credit-enquiries",
      uatUrl: "utility/api/credit-profile/v1/credit-enquiries",
      prodUrl: "utility/api/credit-profile/v1/credit-enquiries",
      body: {
        customerId: null,
      },
    },
    creditProfileRank: {
      devUrl: "utility/api/credit-profile/v1/credit-rank",
      uatUrl: "utility/api/credit-profile/v1/credit-rank",
      prodUrl: "utility/api/credit-profile/v1/credit-rank",
      body: {
        customerId: null,
      },
    },
    creditProfileUtilization: {
      devUrl: "utility/api/credit-profile/v1/utilization",
      uatUrl: "utility/api/credit-profile/v1/utilization",
      prodUrl: "utility/api/credit-profile/v1/utilization",
      body: {
        customerId: null,
      },
    },
    allDocument: {
      devUrl: "/customer/api/profile/v1/all-docs",
      uatUrl: "/customer/api/profile/v1/all-docs",
      prodUrl: "/customer/api/profile/v1/all-docs",
      body: {},
    },
    getDocument:{
      devUrl:'/customer/api/profile/v1/doc',
      uatUrl:'/customer/api/profile/v1/doc',
      prodUrl:'/customer/api/profile/v1/doc',
      body:{}
    },
    getApplications:{
      devUrl:'/customer/api/profile/v1/cust-app',
      uatUrl:'/customer/api/profile/v1/cust-app',
      prodUrl:'/customer/api/profile/v1/cust-app',
      body:{}
    },
      uploadDocument: {
        devUrl: "/customer/api/profile/v1/doc-upload",
        uatUrl: "/customer/api/profile/v1/doc-upload",
        prodUrl: "/customer/api/profile/v1/doc-upload",
        body: {
          docBytes: null,
          documentName: null,
          documentExtension: null,
          documentNo: null,
          documentTypeId: null,
          customerId: null,
          documentId:''
        },
      
    },
  },
};

const getUrl = (route) => {
  const baseUrl = api[`${env}BaseUrl`];
  const pathUrl = `${env}Url`;
  return `${baseUrl}${api["routes"][route][pathUrl]}`;
};

const getBody = (route) => {
  return api["routes"][route]["body"];
};

export const getApiData = (route) => {
  const url = getUrl(route);
  const body = getBody(route);
  return { url, body };
};
