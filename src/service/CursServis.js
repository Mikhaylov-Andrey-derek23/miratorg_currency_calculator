export default class CursServis {
    _apiBase = "https://api.ratesapi.io/api/latest?";

    getResource = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, receved ${res.status}`);
        }
        return await res.json();
    }


    getCurs = async (firstCurrency, secondCurrency) =>{
        const url = `base=${firstCurrency}&symbols=${secondCurrency}`;
        //console.log(url);
        let res = await this.getResource(url);
        res = res.rates[secondCurrency]
        //console.log(res)
        return res
    }
 



}
