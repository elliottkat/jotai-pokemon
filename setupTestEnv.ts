module.exports = async () => {
    process.env.SDOE_V2_API_URL='http://localhost:8000/api/v2/';
    process.env.SDOE_V2_WS_URL='ws://localhost:8000/';
    process.env.MSGRAPH_USERS_ENDPOINT='https://graph.microsoft.com/v1.0/users';
    process.env.SDOE_V2_UI_PATH='/';
}