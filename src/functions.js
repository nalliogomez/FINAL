import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function show_alert(msj,icon,foco=''){
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:msj,
        icon:icon
    });
}

function onfocus(foco){
    if (foco !== "") {
        document.getElementById(foco).focus();
    }
}