import { env } from "./../env/env";

const api = {
  devBaseUrl: "http://203.122.46.189:8060/",
  uatBaseUrl: "http://203.122.46.189:8060/masters/",
  prodBaseUrl: "http://203.122.46.189:8060/masters/",
  routes: {
    authenticate: {
      devUrl: "api/jwt/v1/authenticate",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { clientId: "leadgenerateapi", clientSecret: "mmm@2O!9" },
        },
      },
    },
    masters: {
      devUrl: "masters/api/master/v1/masters",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: {},
        },
      },
    },
    otp: {
      devUrl: "notification/api/notification/v1/sms/otp",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { mobileNo: "" },
        },
      },
    },
    otpverify: {
      devUrl: "notification/api/notification/v1/sms/otp/verify",
      uatUrl: "api/customer/v1/profile/",
      prodUrl: "api/customer/v1/profile/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { mobileNo: "" },
        },
      },
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
      devUrl: "masters/api/master/v1/bank			",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    company: {
      devUrl: "masters/api/master/v1/company",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    cities: {
      devUrl: "masters/api/master/v1/cities",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    pincode: {
      devUrl: "masters/api/master/v2/pincode",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    designation: {
      devUrl: "masters/api/master/v1/designation",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    qualification: {
      devUrl: "masters/api/master/v1/qualification",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    occupancyStatus: {
      devUrl: "masters/api/master/v1/occupancyStatus",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },
    purposeOfLoan: {
      devUrl: "masters/api/master/v1/purpose-of-loan",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: { name: "" },
        },
      },
    },

    leadProductDecision: {
      devUrl: "lead/api/lead/v1/product/decision",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: {
            correlationId: "NgZ2aK9emd",
            appId: "MMMWEBAPP",
          },
          payload: {
            leadId: "PR12344343",
            bankId: "10051",
            productId: "6",
            productTypeId: "fggfg",
          },
        },
      },
    },
    documentUpload: {
      devUrl: "utility/api/utility/document/v1/savedocument",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: {
            correlationId: "NgZ2aK9emd",
            appId: "MMMWEBAPP",
            msgVersion: "1.0",
          },
          payload: {
            channelName: "MOBILEAPP",
            caseId: "1001013258",
            insertFlag: "Y",
            docList: [
              // {
              //   documentId: "1000000290",
              //   documentTypeId: "1000000036",
              //   documentExtension: "",
              //   docBytes: "",
              // },
            ],
          },
        },
      },
    },
    orchestration: {
      devUrl: "orchestration/api/lead/v1/generate",
      uatUrl: "api/lead/v1/",
      prodUrl: "api/master/v1/",
      body: {
        personal: {
          title: "1000000002",
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
          keyContact: [
            {
              caseContactMasterId: "6",
              caseContactName: "",
              caseContactEmail: "",
              caseContactMobileNo: "",
            },
            {
              caseContactMasterId: "5",
              caseContactName: "",
              caseContactEmail: "",
              caseContactMobileNo: "",
            },
            {
              caseContactMasterId: "",
              caseContactName: "",
              caseContactEmail: "",
              caseContactMobileNo: "",
            },
          ],
        },
        work: {
          applicantType: "",
          otherCompany: "",
          nature: "",
          companyId: "",
          typeOfCompaY: "",
          netMonthlyIncome: "",
          grossMonthlyIncome: "",
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
        // exisEmi: "",
        // exisLoanAmount: "",
        loanStartYear: "",
        totalExisTenor: "",
        offerId: "",
        utmCampaign: "",
        utmMedium: "",
        utmSource: "",
        utmRemark: "",
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
          {
            addressTypeMasterId: "",
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
          {
            addressTypeMasterId: "",
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
            purposeOfLoan: "",
          },
          {
            addressTypeMasterId: "",
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
    customerOfferView: {
      devUrl: "customer/api/customer/v1/view/offers",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: {
            mobileNo: "9999000090",
            customerId: "9999000090",
            offerId: "9999000090",
          },
        },
      },
    },
    customerOffer: {
      devUrl: "customer/api/customer/v1/profile/offers",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: {
            mobileNo: "",
            customerId: "",
          },
        },
      },
    },

    sendNotification: {
      devUrl: "notification/api/notification/v1/sms-email/send",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: {
            actionName: "",
            leadId: "PR01019897",
          },
        },
      },
    },
    blogLikeDislike: {
      devUrl: "customer/api/blog/v1/blog-sentiment",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        // request: {
        //   header: { correlationId: "25478965874", appId: "MMMWEBAPP" },
        // },
        blogId: "3",
        customerId: "3",
        sentiment: "like",
      },
    },
    getBlogs: {
      devUrl: "customer/api/blog/v1/blog?blogId=",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        request: {
          header: { correlationId: "NgZ2aK9emd", appId: "MMMWEBAPP" },
          payload: {},
        },
      },
    },
    commentLikeDislike: {
      devUrl: "customer/api/blog/v1/comment-sentiment",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        // request: {
        //   header: { correlationId: "25478965874", appId: "MMMWEBAPP" },
        // },
        blogId: "3",
        customerId: "12345",
        commentId: "1",
        sentiment: "like",
      },
    },
    addComment: {
      devUrl: "customer/api/blog/v1/comment",
      uatUrl: "api/master/v1/",
      prodUrl: "api/master/v1/",
      body: {
        // request: {
        //   header: { correlationId: "25478965874", appId: "MMMWEBAPP" },
        // },
        blogId: "3",
        customerId: "12345",
        comment: "1",
      },
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
    
    getPersonalInfo:{
      devUrl:"customer/api/profile/v1/personal-info",
      uatUrl:"customer/api/profile/v1/personal-info",
      prodUrl:"customer/api/profile/v1/personal-info",
      body:{}
    },
    contactProfile:{
      devUrl:"customer/api/profile/v1/contact-Info",
      uatUrl:"customer/api/profile/v1/contact-Info",
      prodUrl:"customer/api/profile/v1/contact-Info",
      body:{
        customerId: null,
        mobileNo: null,
        emailId: "",
        address:null
      }
    },
    workProfile:{
      devUrl:"customer/api/profile/v1/work-info",
      uatUrl:"customer/api/profile/v1/work-info",
      prodUrl:"customer/api/profile/v1/work-info",
      body:{
        customerId: null,
        employedType:null,
        companyId:null,
        netMonthlyIncome:null,
        bankName:null,
        accountNo:null,
        ifscCode:null
    }
    },
    savePersonalInfo:{
      devUrl:"customer/api/profile/v1/personal-info",
      uatUrl:"customer/api/profile/v1/personal-info",
      prodUrl:"customer/api/profile/v1/personal-info",
      body:{
        customerId: null,
        firstName: null,
        lastName: null,
        gender: null,
        martialStatus: null,
        panNo: null,
        dob:null,
      }
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
