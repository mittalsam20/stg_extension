const fetch = require('node-fetch')
const EmailApi = async(Email) => {
    const Key = "ji5gzJYlaRp86krIbRJsRcOHBxnaLzMc";
    const url = `https://ipqualityscore.com/api/json/email/${Key}/${Email}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (data.valid && (data.overall_score > 2) && (data.smtp_score > 1) && !(data.disposable) && data.dns_valid && !(data.honeypot)) {
        console.log("Valid Email");
        console.log(data.sanitized_email);
        return 1;
    } else {
        console.log("Please Enter An Valid Email..!!");
        return 0;
    }
}
EmailApi("mts.gandhidham@gmail.com");