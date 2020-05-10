let count = 1
export default function originJSONP(option) {
    let body = document.getElementsByTagName('body')[0]
    let script = document.createElement('script')

    let callback = 'jsonp' + count++

    function handleParam(data) {
        let url = ''
        for (let key in data) {
            if(data.hasOwnProperty(key)){
                let value = (data[key] !== undefined? `&${key}=${data[key]}`: '')
                url += value
            }
        }
        return url;
    }

    return new Promise(((resolve, reject) => {
        try{
            window[callback] = function (result) {
                body.removeChild(script)
                resolve(result)
            }

        }catch (e) {
            body.removeChild(script)
            reject(e)
        }
        script.src = option.url + '?callback=' + callback + handleParam(option.data)
        body.appendChild(script)

    }))







}