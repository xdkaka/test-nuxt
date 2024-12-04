import { getCaptcha } from "@/api/captcha";
import config from '@/config/config'

declare global {
  interface Window {
    WeiquChangeCaptchaImg: () => void;
  }
}

export async function createCaptchaCode(apiUrl: string = config.DOMAIN_API_URL): Promise<{ captcha_id: string, captcha_value: string }> {  
  const nuxtApp = useNuxtApp()
  const { t } = nuxtApp.$i18n
  try {
    const response = await getCaptcha({});
    const { data = {} } = response || {};
    const { captcha_id = '', image_url = '' } = data || {}

    if (captcha_id === '' || image_url === '') {
      throw new Error(t('huo-qu-yan-zheng-ma-shi-bai'))
    }
    apiUrl = (apiUrl === "DOMAIN_API_URL" ? config.DOMAIN_API_URL : config.RANDOM_API_URL)
    const imgURI = `${apiUrl}/v1${image_url}`

    // Add style to document head
    useHead({
      style: [{ children: '.weiqu-captcha-alert{width: 320px;}' }]
    })

    // Define global function
    window.WeiquChangeCaptchaImg = () => {
      const imgElement = document.getElementById('weiqu_captcha_img_url') as HTMLImageElement
      if (imgElement) {
        imgElement.src = `${imgURI}?reload=true`
      }
    }

    const result = await ElMessageBox.prompt(
      `<img src="${imgURI}" id="weiqu_captcha_img_url"><span id="weiqu_captcha_img_change" onclick="WeiquChangeCaptchaImg()" style="color:#2483ff;cursor: pointer;">${t('huan-yi-ge')}</span>`,
      t('qing-shu-ru-yan-zheng-ma'),
      {
        dangerouslyUseHTMLString: true,
        customClass: 'weiqu-captcha-alert',
        confirmButtonText: t('yan-zheng'),
        showCancelButton: false,
        closeOnClickModal: false
      }
    )

    return { captcha_id, captcha_value: result.value || '' }
  } catch (err) {
    console.error('CaptchaCode Error:', err)
    throw err
  }
}