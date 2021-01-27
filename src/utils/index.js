export const isLogin=()=>{
    const hihi = document.cookie;
    if(hihi){
        return true
    }
    return false;
}