function checkIsNotNull(content){

  　　return (content && content != null)

　　}

　　//检测输入内容

　　function checkPhoneNum(phoneNum){

  　　console.log(phoneNum)

  　　if (!checkIsNotNull(phoneNum)) {

    　　return false

  　　}

  　　return true

　　}

　　//比较两个内容是否相等

　　function isContentEqual(content_1, content_2){if (!checkIsNotNull(content_1)) { returnfalse }

  　　if (content_1 === content_2) {

    　　return true

  　　}

  　　return false

　　}

　　module.exports = {

  　　checkIsNotNull: checkIsNotNull,

  　　checkPhoneNum: checkPhoneNum,

  　　isContentEqual: isContentEqual

　　}

　　registerWebUtil.js

　　//提交［电话号码］

　　function submitPhoneNum(phoneNum){

  　　//此处调用wx中的网络请求的API，完成电话号码的提交returntrue}

  　　//提交［验证码］

  　　function submitIdentifyCode(identifyCode){//此处调用wx中的网络请求的API，完成短信验证码的提交returntrue}

    　　//提交［密码］,前一步保证两次密码输入相同functionsubmitPassword(password){//此处调用wx中的网络请求的API，完成密码的提交returntrue}

    　　module.exports = {

      　　submitPhoneNum: submitPhoneNum,

      　　submitIdentifyCode: submitIdentifyCode,

      　　submitPassword: submitPassword

    　　}
  }
}