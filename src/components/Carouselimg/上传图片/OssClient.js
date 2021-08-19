import axios from 'axios'

export default function () {
  async function uploadAlioss(event, jj) {
    let file;
    if (jj === 1) {
      file = event
    } else {
      file = event.target.files[0];
    }
    let sing = await getOssSign()
    console.log(sing, "=====")
    const formData = new FormData();
    const suffix = get_suffix(file.name);
    const g_object_name = sing.dir + random_string(10) + suffix;
    formData.append("key", g_object_name);
    formData.append("OSSAccessKeyId", sing.accessid);
    formData.append("policy", sing.policy);
    formData.append("signature", sing.signature);
    // 上传成功返回的状态码，不设置则是204
    formData.append("success_action_status", "200"); 
    formData.append("file", file); // 一定在最后
    console.log(sing.host)
    return new Promise(async (resolve, reject) => {
      await axios.post(sing.host, formData)
        .then((res) => {
          console.log(res)
          console.log(sing.host + "/" + g_object_name);
          resolve(sing.host  + g_object_name);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  // authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnNob3AuZWR1d29yay5jblwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYyODMxMjkyOSwiZXhwIjoxNjI4NjcyOTI5LCJuYmYiOjE2MjgzMTI5MjksImp0aSI6IjFwVG9CcFBLZjJHcVM5ajkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vArOf5b_Plds8v91jB11K8jgmR7gbtVzlUMJUPnh8J0
  async function getOssSign() {
    return new Promise(async (resolve) => {
      const token = window.localStorage.getItem('token')
      // config.headers.Authorization = 'Bearer '+token;
      await axios.get(
        'https://api.shop.eduwork.cn/api/auth/oss/token',
        {headers: {
          'Authorization': 'Bearer ' + token,
        
      }}

      ).then((res) => {
        resolve(res.data)
        console.log(resolve(res.data))
      })
    })
  }

  function random_string(len) {
    len = len || 32;
    var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    var maxPos = chars.length;
    var pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  function get_suffix(filename) {
    let pos = filename.lastIndexOf(".");
    let suffix = "";
    if (pos != -1) {
      suffix = filename.substring(pos);
    }
    return suffix;
  }
  return {
    uploadAlioss,
    getOssSign,
    random_string,
    get_suffix
  }
}