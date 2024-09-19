import Swal from "sweetalert2";

const options = {
    allowOutsideClick : false,
    showCancelButton : true,
    showConfirmButton : true,
    confirmButtonText: 'ตกลง',
    cancelButtonText : 'ยกเลิก',
    confirmButtonColor : '#f15721'
}

export const AlertDiaLog = ({title, text, icon = 'error', onPassed}) => {
    Swal.fire({
        title, text, icon,
        ...options,
    }).then((result) => {
        onPassed(result.isConfirmed);
    })
}