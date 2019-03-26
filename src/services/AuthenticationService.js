import Api from '@/services/Api';

export default {
  login(params) {
    return Api().get('loginExecute', { params: params });
  },
  logout() {
    return Api().get('mapproxy/sooLogin/logout');
  },
  saveToken(code) {
    return Api().get('mapproxy/sooLogin/saveToken', {
      params: { code }
    });
  },
  getUserInfo() {
    return Api().get('mapproxy/sooLogin/userInfo');
  }
};
