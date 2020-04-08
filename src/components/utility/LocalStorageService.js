const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
            _service = this;
            return _service
        }
        return _service
    }
    function _setToken(tokenObj) {
        localStorage.setItem('accessToken', tokenObj.accessToken.jwtToken);
        localStorage.setItem('refreshToken', tokenObj.refreshToken.token);
        localStorage.setItem('idToken', tokenObj.idToken.jwtToken);
    }
    function _getAccessToken() {
        return localStorage.getItem('accessToken');
    }
    function _getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    function _getIdToken() {
        return localStorage.getItem('idToken');
    }
    function _clearToken() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('idToken');
    }
    return {
        getService : _getService,
        setToken : _setToken,
        getAccessToken : _getAccessToken,
        getRefreshToken : _getRefreshToken,
        getIdToken: _getIdToken,
        clearToken : _clearToken
    }
})();
export default LocalStorageService;