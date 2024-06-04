import { config } from "../configs";
import Service from "./service";

const Api = {
  login: async (data) => {
    try {
      return await Service.post(`${config.ApiBaseURL}/auth/login`, data);
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    try {
      return await Service.post(`${config.ApiBaseURL}/auth/register`, data);
    } catch (error) {
      throw error;
    }
  },
  sendVerificationEmail: async (data) => {
    try {
      return await Service.post(`${config.ApiBaseURL}/auth/send-email`, data);
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      return await Service.post(`${config.ApiBaseURL}/auth/forget`, data);
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/auth/update-password`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/auth/change-password`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  isSkipped: async (token, data) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/skip`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  emailVerification: async (token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/auth/verify-email`,
        {},
        token
      );
    } catch (error) {
      throw error;
    }
  },
  basicProfile: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/basic-profile`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  updateStartup: async (data, token) => {
    try {
      return await Service.update(
        `${config.ApiBaseURL}/api/update-startup-profile`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  isProfileModalSkipped: async (data, token) => {
    try {
      return await Service.update(
        `${config.ApiBaseURL}/api/profile-modal`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  getRecentProfiles: async (token, currentRole, search, sortby) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/profiles?role=${currentRole}${
          search ? `&search=${search}` : ""
        }${
          sortby && search
            ? `&sortby=${sortby}`
            : sortby && !search
            ? `&sortby=${sortby}`
            : ""
        }`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getIsPasswordUpdated: async (token) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/auth/check-password`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getEmailStatus: async (token) => {
    try {
      return await Service.get(`${config.ApiBaseURL}/auth/check-email`, token);
    } catch (error) {
      throw error;
    }
  },
  getResetPasswordStatus: async (email) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/auth/check-reset-email/${email}`
      );
    } catch (error) {
      throw error;
    }
  },

  getNewsFeed: async (token, currentRole) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/news-feed?role=${currentRole}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  addNewsFeed: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/create-news-feed`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getInvestorProfile: async (token, id, currentRole) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/investor${
          currentRole ? `/${currentRole}` : ""
        }${id ? `/${id}` : ""}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  updateInvestorProfile: async (data, token) => {
    try {
      return await Service.update(
        `${config.ApiBaseURL}/api/investor-profile`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  updateUserSettings: async (data, token) => {
    try {
      return await Service.update(
        `${config.ApiBaseURL}/api/user-settings`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  createInvestment: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/add-investment`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getInvestment: async (token, page, limit, id) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/investments${
          id ? `/${id}` : ""
        }?page=${page}&limit=${limit}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  getAllInvestors: async (token, page, limit) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/investors?page=${page}&limit=${limit}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  getAllStartups: async (token, page, limit) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/startups?page=${page}&limit=${limit}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getAllFollowers: async (token, currentRole, page, limit) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/followers?role=${currentRole}&page=${page}&limit=${limit}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  updateInvestment: async (data, id, token) => {
    try {
      return await Service.update(
        `${config.ApiBaseURL}/api/update-investment/${id}`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  deleteInvestment: async (id, token) => {
    try {
      return await Service.removeWithId(
        `${config.ApiBaseURL}/api/investment/${id}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  addPortfolio: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/add-portfolio`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getStartupProfile: async (token, id, currentRole) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/startup${
          currentRole ? `/${currentRole}` : ""
        }${id ? `/${id}` : ""}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  updateStartupProfile: async (data, token) => {
    try {
      return await Service.update(
        `${config.ApiBaseURL}/api/startup-profile`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  followProfile: async (data, token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/follow`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  getUserSettings: async (token) => {
    try {
      return await Service.get(`${config.ApiBaseURL}/api/user-settings`, token);
    } catch (error) {
      throw error;
    }
  },
  getSingleUserChat: async (token, receiverId, receiverRole, senderRole) => {
    try {
      return await Service.get(
        `${config.ApiBaseURL}/api/chat/${receiverId}/${receiverRole}/${senderRole}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  sendOTP: async (token) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/auth/send-otp`,
        {},
        token
      );
    } catch (error) {
      throw error;
    }
  },
  verifyOTP: async (token, data) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/auth/verify-otp`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  OTPStatus: async (token) => {
    try {
      return await Service.get(`${config.ApiBaseURL}/auth/otp-status`, token);
    } catch (error) {
      throw error;
    }
  },
  checkUserName: async (token, data) => {
    try {
      return await Service.postWithAuthentication(
        `${config.ApiBaseURL}/api/userName`,
        data,
        token
      );
    } catch (error) {
      throw error;
    }
  },
};

export default Api;
