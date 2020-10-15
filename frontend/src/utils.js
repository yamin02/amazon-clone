export const parserequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2] ,
        action: request[3] ,
    }
}

export const rerender= async (comp) => {
    document.getElementById("main-container").innerHTML = await comp.rend() ;
    await comp.after_render();
}
