import { dashpost } from '../api';
import { getUserinfo } from '../localStorage';



const DashboardScreen = {
    after_render: async () => {

    },
    rend: async () => {
    const user = getUserinfo();
    console.log(user.id);
    const allcodes = await dashpost(user.id);
    console.log(allcodes);
    return `<h1>Here are your all the code</h1>
        ${allcodes.length == 0
        ?'<div>You have bought no codes. <a href="/#/">Go Shopping</a>'
        :allcodes.map((item) =>`${(item.email) 
        ? `<div id = 'dashitem'>
            <h3>${item.email}</h3>
            <h3>${item.password}</h3>
            <h3>${item.profileName}</h3>  
            <h3>${item.profilePin}</h3>
            <h4>This data expires at ${item.expiry}</h4>
            </div>`
        : `${(item.code) 
            ?`<div id='dashitem'><h3>${item.code}</h3>
            <h4>This data will no longer be shown after ${item.expiry}</h4></div>` 
            : "  " }`
        }`).join('\n')
        }`
    }

}
export default DashboardScreen;