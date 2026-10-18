let currentAccessToken = null
let tokenData 

export default tokenData = {
    setAccessToken(accessToken){
        currentAccessToken = accessToken
    },
    getAccessToken(){
        return currentAccessToken
    },
    async refreshAccessToken(){
        try{
            const res = await fetch("/api/refresh", {
                method: "POST",
                credentials: "include"
            })

            if(res.ok){
                const data = await res.json()
                currentAccessToken = data.accessToken
                return true
            }
        }
        catch(err){
            currentAccessToken = null
            return false
        }
    }
}