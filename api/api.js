import { env } from "./../env/env";

const api = {
  devBaseUrl: "http://203.122.46.189:8061/",
  routes: {
    authenticate: {
      devUrl: "api/jwt/v1/authenticate",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { clientId: "leadgenerateapi", clientSecret: "mmm@2O!9" }
    },
    masters: {
      devUrl: "masters/api/master/v1/masters",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { }
    },
    generateOtp: {
      devUrl: "notification/api/notification/v1/sms/otp",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { mobileNo: '' },
    },
    verifyOtp: {
      devUrl: "notification/api/notification/v1/sms/otp/verify",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: { mobileNo: '', otp: '', otpId: '' }
    },
    sendNotification: {
      devUrl: "notification/api/notification/v1/sms-email/send",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { actionName: '', leadId: '' }
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
      body: { name: "" }
    },
    company: {
      devUrl: "masters/api/master/v1/company",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    cities: {
      devUrl: "masters/api/master/v1/cities",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    pincode: {
      devUrl: "masters/api/master/v2/pincode",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    designation: {
      devUrl: "masters/api/master/v1/designation",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    qualification: {
      devUrl: "masters/api/master/v1/qualification",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    project : {
      devUrl: "masters/api/master/v1/project",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    occupancyStatus: {
      devUrl: "masters/api/master/v1/occupancyStatus",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    purposeOfLoan: {
      devUrl: "masters/api/master/v1/purpose-of-loan",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { name: "" }
    },
    leadProductDecision: {
      devUrl: "lead/api/lead/v1/product/decision",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { leadId: '', bankId: '', productId: '', productTypeId: '' }
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
      }
    },
    orchestration: {
      devUrl: "lead/api/lead/v1/generate",
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
        utmCampaign: '',
        utmMedium: '',
        utmSource: '',
        utmRemark: '',
        subQueue: '',
        source: '',
        existingFacility: [
          {
            "exisTenorBalMonths": "",
            "exisfacility": "",
            "exisBankId": "",
            "exisLoanAmount": "",
            "exisEmi": "",
            "exisRemark": ""
          }],
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
          }
        ]
      },
    },
    viewOffers: {
      devUrl: "customer/api/customer/v1/view-offers",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {  customerId: '', productId: '' }
    },
    saveOffers: {
      devUrl: "customer/api/customer/v1/profile/save-offers",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { customerId: '', offerId: '' }
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
      devUrl: 'customer/api/blog/v1/shared',
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: { blogId: "", customerId: "", shared: "" },
    }
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
